import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// PATCH /api/admin/posts/[id] — update post details or status
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user || !["admin", "presenter", "correspondent"].includes(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { title, content, status, image } = body;

    // Fetch existing post to check ownership or roles
    const existing = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true, status: true },
    });

    if (!existing) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Role check: Correspondents can only edit their own drafts/under-review posts
    const userRole = session.user.role;
    if (userRole === "correspondent" && existing.authorId !== session.user.id) {
      return NextResponse.json({ message: "You can only edit your own articles" }, { status: 403 });
    }

    // Validation
    const validStatuses = ["DRAFT", "UNDER_REVIEW", "PUBLISHED"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    // Determine final status
    let finalStatus = status;
    if (userRole === "correspondent" && status === "PUBLISHED") {
      finalStatus = "UNDER_REVIEW"; // Force review for correspondents
    }

    // If title has changed, generate a new unique slug
    let slug = undefined;
    if (title) {
      let baseSlug = slugify(title, { lower: true, strict: true });
      slug = baseSlug;
      let counter = 1;
      while (await prisma.post.findFirst({ where: { slug, id: { not: id } } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title, slug }),
        ...(content && { content }),
        ...(image && { image }),
        ...(finalStatus && { status: finalStatus }),
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/admin/posts/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user || !["admin", "presenter"].includes(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
