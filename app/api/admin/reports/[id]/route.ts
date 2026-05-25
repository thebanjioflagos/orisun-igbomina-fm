import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// PATCH /api/admin/reports/[id] — approve, reject, or convert to post
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user || !["admin", "presenter"].includes(session.user.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { action } = await req.json();

  if (!["APPROVED", "REJECTED", "CONVERT", "PIN_TICKER", "UNPIN_TICKER"].includes(action)) {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }

  const report = await prisma.eyeWitnessReport.findUnique({ where: { id } });
  if (!report) {
    return NextResponse.json({ message: "Report not found" }, { status: 404 });
  }

  // Toggle ticker pin
  if (action === "PIN_TICKER" || action === "UNPIN_TICKER") {
    const updated = await prisma.eyeWitnessReport.update({
      where: { id },
      data: { pinnedToTicker: action === "PIN_TICKER" },
    });
    return NextResponse.json(updated);
  }

  // If converting to a news post
  if (action === "CONVERT") {
    let baseSlug = slugify(report.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const post = await prisma.post.create({
      data: {
        title: report.title,
        slug,
        content: `<p><strong>Eye-Witness Report</strong></p><p>${report.description}</p>${
          report.location ? `<p><em>Location: ${report.location}</em></p>` : ""
        }${report.mediaUrl ? `<p><img src="${report.mediaUrl}" alt="Eye-witness media" /></p>` : ""}`,
        status: "UNDER_REVIEW",
        authorId: session.user.id,
      },
    });

    await prisma.eyeWitnessReport.update({
      where: { id },
      data: { status: "CONVERTED_TO_POST" },
    });

    return NextResponse.json({ success: true, post });
  }

  const updated = await prisma.eyeWitnessReport.update({
    where: { id },
    data: { status: action as "APPROVED" | "REJECTED" },
  });

  return NextResponse.json(updated);
}

// DELETE /api/admin/reports/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await prisma.eyeWitnessReport.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
