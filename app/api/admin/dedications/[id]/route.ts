import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/dedications/[id] — update a dedication status
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user || !["admin", "presenter"].includes(session.user.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { status } = await req.json();
  const validStatuses = ["PENDING", "APPROVED", "READ_ON_AIR", "REJECTED"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  const dedication = await prisma.dedication.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(dedication);
}

// DELETE /api/admin/dedications/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await prisma.dedication.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
