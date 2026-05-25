import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";
import StaffManagerClient from "@/components/admin/StaffManagerClient";

export default async function StaffManager() {
  const session = await requireRole("admin");
  
  // Basic query
  const staff = await prisma.user.findMany({
    orderBy: { role: "asc" }
  });

  return (
    <div className="flex-1">
      <AdminTopBar 
        title="Staff & Roles" 
        subtitle="Manage broadcasters, editors, and correspondents" 
      />
      
      <main className="p-6">
        <StaffManagerClient staff={staff} currentUserId={session.user.id} />
      </main>
    </div>
  );
}
