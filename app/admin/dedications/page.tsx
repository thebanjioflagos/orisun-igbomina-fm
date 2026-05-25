import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";
import DedicationActions from "@/components/admin/DedicationActions";

export default async function DedicationsManager() {
  await requireRole("admin", "presenter");
  
  // Basic query
  const dedications = await prisma.dedication.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex-1">
      <AdminTopBar 
        title="Dedications Queue" 
        subtitle="Manage user dedications and requests" 
      />
      
      <main className="p-6">
        <DedicationActions dedications={dedications} />
      </main>
    </div>
  );
}
