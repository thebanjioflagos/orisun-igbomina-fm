import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, status, authorId, image } = await req.json();

    if (!title || !content || !authorId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Role check: Correspondents cannot publish directly
    const userRole = session.user.role;
    let finalStatus = status;
    if (userRole === "correspondent" && status === "PUBLISHED") {
      finalStatus = "UNDER_REVIEW"; // Force review for correspondents
    }

    // Generate unique slug
    let baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        image,
        status: finalStatus,
        authorId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
