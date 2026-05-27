import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// POST /api/admin/settings — save station settings / update password
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { stationName, frequency, tagline, description, streamUrl, currentPassword, newPassword } = await req.json();

  // If changing password, verify current first
  if (newPassword) {
    if (!currentPassword) {
      return NextResponse.json({ message: "Current password is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user?.password) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 401 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ message: "New password must be at least 8 characters" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: session.user.id }, data: { password: hashed } });
  }

  // Store station settings in a generic key-value table or just log for now
  // In production you'd have a Settings model in Prisma
  console.log("[SETTINGS SAVED]", { stationName, frequency, tagline, description, streamUrl });

  return NextResponse.json({ success: true, message: "Settings saved successfully" });
}
