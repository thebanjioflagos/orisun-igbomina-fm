"use client";

import { useState } from "react";
import { Clock, User, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScheduleManagerClient({ initialProgrammes, days }: { initialProgrammes: any[], days: string[] }) {
  const router = useRouter();
  const [programmes, setProgrammes] = useState(initialProgrammes);

  const addProgramme = async () => {
    const title = prompt("Enter Programme Title:");
    if (!title) return;
    
    const dayInput = prompt("Enter Day (e.g. MONDAY, TUESDAY):");
    const day = dayInput?.toUpperCase() || "MONDAY";
    if (!days.includes(day)) return alert("Invalid Day");

    const startTime = prompt("Enter Start Time (e.g. 08:00 AM):") || "08:00 AM";
    const endTime = prompt("Enter End Time (e.g. 10:00 AM):") || "10:00 AM";

    try {
      const res = await fetch("/api/admin/programmes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, day, startTime, endTime })
      });
      if (!res.ok) throw new Error("Failed to add programme");
      
      const newProg = await res.json();
      setProgrammes([...programmes, newProg]);
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const deleteProgramme = async (id: string) => {
    if (!confirm("Delete this programme?")) return;
    try {
      await fetch(`/api/admin/programmes/${id}`, { method: "DELETE" });
      setProgrammes(programmes.filter(p => p.id !== id));
      router.refresh();
    } catch (err: any) {
      alert("Failed to delete programme");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-orisun-ivory/60 font-dm-sans">
          Weekly broadcast programming grid
        </p>
        
        <button onClick={addProgramme} className="flex items-center gap-2 bg-orisun-gold text-orisun-deep px-4 py-2 rounded font-unbounded text-sm hover:bg-orisun-gold/90 transition-colors">
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
                      
                      <button onClick={() => deleteProgramme(prog.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-orisun-crimson uppercase font-unbounded">
                        Delete
                      </button>
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
    </>
  );
}
