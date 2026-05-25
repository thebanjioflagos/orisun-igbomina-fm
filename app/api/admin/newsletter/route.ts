import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// POST /api/admin/newsletter/send — broadcast newsletter
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { subject, body } = await req.json();
  if (!subject || !body) {
    return NextResponse.json({ message: "Subject and body required" }, { status: 400 });
  }

  const subscribers = await prisma.newsletter.findMany({ where: { active: true } });
  
  // In production, integrate with Resend / Mailchimp here
  // For now we log and simulate success
  console.log(`[NEWSLETTER BROADCAST]`);
  console.log(`Subject: ${subject}`);
  console.log(`Recipients: ${subscribers.length}`);
  console.log(`Body: ${body.substring(0, 100)}...`);

  return NextResponse.json({ 
    success: true, 
    sent: subscribers.length,
    message: `Broadcast queued for ${subscribers.length} subscribers` 
  });
}

// DELETE /api/admin/newsletter?id=xxx — remove subscriber
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Missing id" }, { status: 400 });

  await prisma.newsletter.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
