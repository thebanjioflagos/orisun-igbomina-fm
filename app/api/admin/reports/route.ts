import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// GET /api/admin/reports — list all eye-witness reports
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !["admin", "presenter", "correspondent"].includes(session.user.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;

  const reports = await prisma.eyeWitnessReport.findMany({
    where: status ? { status: status as any } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reports);
}
