import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const eyewitnessSchema = z.object({
  reporterName: z.string().min(2, "Name is required").max(100),
  reporterEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  reporterPhone: z.string().max(20).optional().or(z.literal("")),
  title: z.string().min(5, "Title must be at least 5 characters").max(150),
  description: z.string().min(10, "Please provide more details").max(5000),
  location: z.string().max(150).optional().or(z.literal("")),
  mediaUrl: z.string().url().optional().or(z.literal("")),
});

// POST /api/eyewitness — Citizen eyewitness report submission
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = eyewitnessSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid submission data", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { reporterName, reporterEmail, reporterPhone, title, description, location, mediaUrl } = result.data;

    const report = await prisma.eyeWitnessReport.create({
      data: {
        reporterName,
        reporterEmail: reporterEmail || null,
        reporterPhone: reporterPhone || null,
        title,
        description,
        location: location || null,
        mediaUrl: mediaUrl || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, report }, { status: 201 });
  } catch (error) {
    console.error("Eyewitness report submission error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
