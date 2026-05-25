import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import NewsEditorFormClient from "@/components/admin/NewsEditorFormClient";

export default async function NewArticlePage() {
  await requireRole("admin", "presenter", "correspondent");
  
  return (
    <div className="flex-1 flex flex-col">
      <AdminTopBar 
        title="News & Articles" 
        subtitle="Write a new article" 
      />
      <div className="flex-1 overflow-y-auto">
        <NewsEditorFormClient />
      </div>
    </div>
  );
}
