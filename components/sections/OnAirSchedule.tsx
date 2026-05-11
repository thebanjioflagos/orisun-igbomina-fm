"use client";

import { cn } from "@/lib/utils";
import { Clock, User } from "lucide-react";

const schedule = [
  {
    time: "06:00 - 10:00",
    title: "Morning Drive Show",
    presenter: "Oloye Banji Agboola",
    category: "Entertainment",
    active: true,
  },
  {
    time: "10:00 - 12:00",
    title: "Igbomina Cultural Hour",
    presenter: "Mama Heritage",
    category: "Culture",
    active: false,
  },
  {
    time: "12:00 - 14:00",
    title: "Community News Update",
    presenter: "Bayo Newsman",
    category: "News",
    active: false,
  },
  {
    time: "14:00 - 16:00",
    title: "Inner Circle Melodies",
    presenter: "DJ Orisun",
    category: "Music",
    active: false,
  },
  {
    time: "16:00 - 18:00",
    title: "Ila-Orangun Marketplace",
    presenter: "Sisi Ooja",
    category: "Business",
    active: false,
  },
  {
    time: "20:00 - 22:00",
    title: "Legends & Folklore",
    presenter: "Baba Itan",
    category: "Education",
    active: false,
  }
];

export default function OnAirSchedule() {
  return (
    <section className="bg-orisun-deep py-24 px-6 border-t border-orisun-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-fraunces text-orisun-ivory mb-4">On Air Schedule</h2>
            <p className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase">Never Miss a Moment</p>
          </div>
          <button className="px-6 py-3 border border-orisun-gold/40 text-orisun-gold font-unbounded text-[10px] tracking-widest hover:bg-orisun-gold hover:text-orisun-deep transition-all">
            VIEW FULL PROGRAMME
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "relative p-8 border transition-all duration-500 group",
                item.active 
                  ? "bg-orisun-gold border-orisun-gold shadow-2xl shadow-orisun-gold/20 scale-105 z-10" 
                  : "bg-orisun-deep border-orisun-gold/20 hover:border-orisun-gold/60"
              )}
            >
              {item.active && (
                <div className="absolute -top-3 left-8 px-3 py-1 bg-orisun-crimson text-white font-unbounded text-[8px] font-bold tracking-tighter uppercase">
                  Live Now
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-6">
                <Clock size={14} className={item.active ? "text-orisun-deep" : "text-orisun-gold"} />
                <span className={cn(
                  "font-mono text-xs tracking-widest",
                  item.active ? "text-orisun-deep/80" : "text-orisun-gold/60"
                )}>
                  {item.time}
                </span>
              </div>

              <h3 className={cn(
                "text-2xl font-fraunces mb-4",
                item.active ? "text-orisun-deep" : "text-orisun-ivory"
              )}>
                {item.title}
              </h3>

              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border",
                  item.active ? "border-orisun-deep/20 bg-orisun-deep/10" : "border-orisun-gold/20 bg-orisun-gold/5"
                )}>
                  <User size={18} className={item.active ? "text-orisun-deep" : "text-orisun-gold"} />
                </div>
                <div>
                  <p className={cn(
                    "text-[10px] font-unbounded uppercase tracking-tighter",
                    item.active ? "text-orisun-deep/60" : "text-orisun-gold/40"
                  )}>Presenter</p>
                  <p className={cn(
                    "font-dm-sans font-bold",
                    item.active ? "text-orisun-deep" : "text-orisun-ivory"
                  )}>{item.presenter}</p>
                </div>
              </div>

              <div className={cn(
                "mt-8 pt-8 border-t",
                item.active ? "border-orisun-deep/10" : "border-orisun-gold/10"
              )}>
                <span className={cn(
                  "px-3 py-1 text-[10px] font-unbounded tracking-widest uppercase",
                  item.active ? "bg-orisun-deep text-orisun-gold" : "bg-orisun-gold/10 text-orisun-gold"
                )}>
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
