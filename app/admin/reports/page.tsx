import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";
import ReportsModeratorClient from "@/components/admin/ReportsModeratorClient";

export default async function AdminReportsPage() {
  await requireRole("admin", "presenter");

  const reports = await prisma.eyeWitnessReport.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1">
      <AdminTopBar
        title="Eye-Witness Reports"
        subtitle="Review and publish citizen journalism submissions"
      />
      <main className="p-6">
        <ReportsModeratorClient reports={reports} />
      </main>
    </div>
  );
}
