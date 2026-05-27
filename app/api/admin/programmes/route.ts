import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["admin", "presenter"].includes(session.user.role?.toLowerCase())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { title, day, startTime, endTime } = await req.json();

    if (!title || !day || !startTime || !endTime) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const programme = await prisma.programme.create({
      data: {
        title,
        day,
        startTime,
        endTime,
      },
      include: { presenter: { select: { name: true } } }
    });

    return NextResponse.json(programme, { status: 201 });
  } catch (error) {
    console.error("Error creating programme:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
