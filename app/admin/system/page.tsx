import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import SystemDashboardClient from "@/components/admin/SystemDashboardClient";

export default async function SystemDashboard() {
  // We require admin role, but the component can conditionally show things
  // for the superuser (techlead).
  const session = await requireRole("admin");

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <AdminTopBar 
        title="System Health & Diagnostics" 
        subtitle="Server performance, database metrics, and maintenance controls" 
      />
      <main className="flex-1 overflow-y-auto p-6">
        <SystemDashboardClient currentEmail={session.user.email} />
      </main>
    </div>
  );
}
