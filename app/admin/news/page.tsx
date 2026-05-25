import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";
import NewsActionsClient from "@/components/admin/NewsActionsClient";

export default async function NewsManager() {
  const session = await requireRole("admin", "presenter", "correspondent");
  
  // Basic query - in real app, add pagination
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } }
  });

  return (
    <div className="flex-1">
      <AdminTopBar 
        title="News & Articles" 
        subtitle="Manage all website publications" 
      />
      
      <main className="p-6">
        <NewsActionsClient posts={posts} />
      </main>
    </div>
  );
}
