import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and make unique
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const filename = `${Date.now()}-${originalName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);
    
    // Return the public URL
    const url = `/uploads/${filename}`;
    
    return NextResponse.json({ url, filename, size: file.size });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Upload failed: " + error.message }, { status: 500 });
  }
}
