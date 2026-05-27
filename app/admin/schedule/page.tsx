import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";
import ScheduleManagerClient from "@/components/admin/ScheduleManagerClient";

export default async function ScheduleManager() {
  const session = await requireRole("admin", "presenter");
  
  // Basic query for programmes
  const programmes = await prisma.programme.findMany({
    orderBy: [
      { day: 'asc' },
      { startTime: 'asc' }
    ],
    include: { presenter: { select: { name: true } } }
  });

  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

  return (
    <div className="flex-1">
      <AdminTopBar 
        title="Programme Schedule" 
        subtitle="Manage daily broadcast slots" 
      />
      
      <main className="p-6">
        <ScheduleManagerClient initialProgrammes={programmes} days={days} />
      </main>
    </div>
  );
}
