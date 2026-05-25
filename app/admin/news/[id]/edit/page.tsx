import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import NewsEditorFormClient from "@/components/admin/NewsEditorFormClient";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface EditArticlePageProps {
  params: {
    id: string;
  };
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  await requireRole("admin", "presenter", "correspondent");

  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopBar 
        title="News & Articles" 
        subtitle={`Edit: ${post.title}`} 
      />
      <div className="flex-1 overflow-y-auto">
        <NewsEditorFormClient post={post} />
      </div>
    </div>
  );
}
