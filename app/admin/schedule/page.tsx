import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";
import { Calendar, Clock, User, Plus } from "lucide-react";
import Link from "next/link";

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
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-orisun-ivory/60 font-dm-sans">
            Weekly broadcast programming grid
          </p>
          
          <button className="flex items-center gap-2 bg-orisun-gold text-orisun-deep px-4 py-2 rounded font-unbounded text-sm hover:bg-orisun-gold/90 transition-colors">
            <Plus size={16} />
            Add Programme
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {days.map(day => {
            const dayProgrammes = programmes.filter(p => p.day === day);
            
            return (
              <div key={day} className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm overflow-hidden flex flex-col">
                <div className="bg-orisun-gold/10 border-b border-orisun-gold/20 px-4 py-3">
                  <h3 className="font-unbounded font-bold text-orisun-gold text-sm uppercase tracking-widest">{day}</h3>
                </div>
                
                <div className="p-4 flex-1 flex flex-col gap-3">
                  {dayProgrammes.length > 0 ? dayProgrammes.map(prog => (
                    <div key={prog.id} className="bg-black/40 border border-white/5 rounded p-3 hover:border-orisun-gold/30 transition-colors group cursor-pointer relative">
                      {prog.isLive && (
                        <span className="absolute top-3 right-3 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orisun-crimson opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orisun-crimson"></span>
                        </span>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-orisun-ivory/60 font-unbounded mb-1">
                        <Clock size={12} className="text-orisun-gold" />
                        {prog.startTime} - {prog.endTime}
                      </div>
                      <h4 className="font-fraunces text-orisun-ivory font-bold leading-tight mb-2">{prog.title}</h4>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 text-xs text-orisun-ivory/50 font-dm-sans">
                          <User size={12} />
                          {prog.presenter?.name || "Unassigned"}
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-orisun-gold uppercase font-unbounded">
                          Edit
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="flex-1 flex items-center justify-center py-8 border-2 border-dashed border-white/5 rounded">
                      <p className="text-xs text-orisun-ivory/30 font-dm-sans">No programmes scheduled</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
