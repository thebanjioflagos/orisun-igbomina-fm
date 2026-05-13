"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Clock, User } from "lucide-react";
import Link from "next/link";

interface Show {
  startHour: number;
  endHour:   number;
  title:     string;
  presenter: string;
  category:  string;
}

const schedule: Show[] = [
  { startHour:  6, endHour: 10, title: "Morning Drive Show",      presenter: "Oloye Banji Agboola", category: "Entertainment" },
  { startHour: 10, endHour: 12, title: "Igbomina Cultural Hour",  presenter: "Mama Heritage",        category: "Culture"       },
  { startHour: 12, endHour: 14, title: "Community News Update",   presenter: "Bayo Newsman",         category: "News"          },
  { startHour: 14, endHour: 16, title: "Inner Circle Melodies",   presenter: "DJ Orisun",            category: "Music"         },
  { startHour: 16, endHour: 18, title: "Ila-Orangun Marketplace", presenter: "Sisi Ooja",            category: "Business"      },
  { startHour: 20, endHour: 22, title: "Legends & Folklore",      presenter: "Baba Itan",            category: "Education"     },
];

function formatHour(h: number) {
  return `${String(h).padStart(2, "0")}:00`;
}

function getActiveIndex(hour: number): number {
  // Find which show is currently on air
  const idx = schedule.findIndex((s) => hour >= s.startHour && hour < s.endHour);
  if (idx !== -1) return idx;
  // Outside all show hours → find the upcoming show
  const next = schedule.findIndex((s) => s.startHour > hour);
  return next !== -1 ? next : 0;
}

export default function OnAirSchedule() {
  // Compute active show from real time — memoised for the render cycle
  const activeIndex = useMemo(() => {
    const now = new Date();
    return getActiveIndex(now.getHours());
  }, []);

  return (
    <section className="bg-orisun-deep py-24 px-6 border-t border-orisun-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-fraunces text-orisun-ivory mb-4">On Air Schedule</h2>
            <p className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase">Never Miss a Moment</p>
          </div>
          <Link
            href="/programs"
            className="px-6 py-3 border border-orisun-gold/40 text-orisun-gold font-unbounded text-[10px] tracking-widest hover:bg-orisun-gold hover:text-orisun-deep transition-all"
          >
            VIEW FULL PROGRAMME
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {schedule.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={idx}
                className={cn(
                  "relative p-8 border transition-all duration-500 group",
                  isActive
                    ? "bg-orisun-gold border-orisun-gold shadow-2xl shadow-orisun-gold/20 scale-[1.02] z-10"
                    : "bg-orisun-deep border-orisun-gold/20 hover:border-orisun-gold/60"
                )}
              >
                {/* Live Now badge — only when truly on-air */}
                {isActive && (
                  <div className="absolute -top-3 left-8 px-3 py-1 bg-orisun-crimson text-white font-unbounded text-[8px] font-bold tracking-tighter uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Live Now
                  </div>
                )}

                <div className="flex items-center gap-2 mb-6">
                  <Clock size={14} className={isActive ? "text-orisun-deep" : "text-orisun-gold"} />
                  <span className={cn(
                    "font-mono text-xs tracking-widest",
                    isActive ? "text-orisun-deep/80" : "text-orisun-gold/60"
                  )}>
                    {formatHour(item.startHour)} – {formatHour(item.endHour)}
                  </span>
                </div>

                <h3 className={cn("text-2xl font-fraunces mb-4", isActive ? "text-orisun-deep" : "text-orisun-ivory")}>
                  {item.title}
                </h3>

                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border",
                    isActive ? "border-orisun-deep/20 bg-orisun-deep/10" : "border-orisun-gold/20 bg-orisun-gold/5"
                  )}>
                    <User size={18} className={isActive ? "text-orisun-deep" : "text-orisun-gold"} />
                  </div>
                  <div>
                    <p className={cn(
                      "text-[10px] font-unbounded uppercase tracking-tighter",
                      isActive ? "text-orisun-deep/60" : "text-orisun-gold/40"
                    )}>Presenter</p>
                    <p className={cn("font-dm-sans font-bold", isActive ? "text-orisun-deep" : "text-orisun-ivory")}>
                      {item.presenter}
                    </p>
                  </div>
                </div>

                <div className={cn("mt-8 pt-8 border-t", isActive ? "border-orisun-deep/10" : "border-orisun-gold/10")}>
                  <span className={cn(
                    "px-3 py-1 text-[10px] font-unbounded tracking-widest uppercase",
                    isActive ? "bg-orisun-deep text-orisun-gold" : "bg-orisun-gold/10 text-orisun-gold"
                  )}>
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
