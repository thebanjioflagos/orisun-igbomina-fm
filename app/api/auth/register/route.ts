import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// POST /api/auth/register — create a new staff user (admin-initiated)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role?.toLowerCase() !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email and password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }

    const validRoles = ["admin", "presenter", "correspondent"];
    const normalizedRole = (role || "correspondent").toLowerCase();
    if (!validRoles.includes(normalizedRole)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "An account with this email already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: normalizedRole.toUpperCase() as "ADMIN" | "PRESENTER" | "CORRESPONDENT",
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
