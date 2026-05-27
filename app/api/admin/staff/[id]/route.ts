import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/staff/[id] — update role
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  // Prevent self-demotion
  if (id === session.user.id) {
    return NextResponse.json({ message: "Cannot change your own role" }, { status: 400 });
  }

  const { role } = await req.json();
  const validRoles = ["admin", "presenter", "correspondent"];
  if (!validRoles.includes(role)) {
    return NextResponse.json({ message: "Invalid role" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role: role.toUpperCase() },
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json(user);
}

// DELETE /api/admin/staff/[id] — remove staff member
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  if (id === session.user.id) {
    return NextResponse.json({ message: "Cannot delete yourself" }, { status: 400 });
  }

  try {
    // Handle relations first to avoid foreign key constraint errors
    await prisma.$transaction([
      prisma.audioFile.deleteMany({ where: { uploadedBy: id } }),
      prisma.programme.updateMany({ where: { presenterId: id }, data: { presenterId: null } }),
      prisma.post.deleteMany({ where: { authorId: id } }),
      prisma.user.delete({ where: { id } })
    ]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete staff:", error);
    return NextResponse.json({ message: "Failed to delete staff: " + error.message }, { status: 500 });
  }
}
