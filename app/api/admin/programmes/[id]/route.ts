import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user || !["admin", "presenter"].includes(session.user.role?.toLowerCase())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await prisma.programme.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting programme:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
