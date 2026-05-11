import { cn } from "@/lib/utils";
import { Clock, Radio, User, Calendar } from "lucide-react";

const programs = [
  {
    day: "Monday - Friday",
    shows: [
      { time: "05:00", title: "Early Morning Praise", host: "Pastor Kola" },
      { time: "06:00", title: "Morning Drive Show", host: "Oloye Banji" },
      { time: "10:00", title: "Igbomina Heritage", host: "Mama Heritage" },
      { time: "12:00", title: "News at Noon", host: "Bayo Newsman" },
      { time: "14:00", title: "Women's Forum", host: "Dr. Adebayo" },
      { time: "16:00", title: "Youth Vibe", host: "DJ Signal" },
      { time: "19:00", title: "Evening Reflection", host: "Elder Foluso" },
    ]
  },
  {
    day: "Saturday",
    shows: [
      { time: "07:00", title: "Agric Report", host: "Farmer James" },
      { time: "10:00", title: "Sports Round-up", host: "Segun Sports" },
      { time: "12:00", title: "Cultural Legends", host: "Baba Igbomina" },
    ]
  }
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-orisun-deep pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-6xl md:text-8xl font-fraunces text-orisun-ivory mb-6 italic">Show Schedule</h1>
          <p className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase flex items-center gap-2">
            <Radio size={14} className="animate-pulse" /> 102.1 FM Broadcast Guide
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {programs.map((dayGroup, idx) => (
            <div key={idx} className="space-y-8">
              <div className="flex items-center gap-4 border-b border-orisun-gold/20 pb-4">
                <Calendar className="text-orisun-gold" size={24} />
                <h2 className="text-3xl font-fraunces text-orisun-gold uppercase tracking-tighter">{dayGroup.day}</h2>
              </div>

              <div className="space-y-4">
                {dayGroup.shows.map((show, sIdx) => (
                  <div 
                    key={sIdx}
                    className="flex items-center gap-6 p-6 bg-orisun-gold/5 border border-orisun-gold/10 hover:border-orisun-gold/40 transition-all group"
                  >
                    <div className="text-center min-w-[80px]">
                      <div className="flex items-center justify-center gap-1 text-orisun-gold mb-1">
                        <Clock size={12} />
                        <span className="font-mono text-[10px] tracking-widest">{show.time}</span>
                      </div>
                      <div className="text-orisun-ivory font-unbounded text-sm font-bold">GMT+1</div>
                    </div>

                    <div className="h-12 w-px bg-orisun-gold/20" />

                    <div className="flex-1">
                      <h3 className="text-2xl font-fraunces text-orisun-ivory group-hover:text-orisun-gold transition-colors">
                        {show.title}
                      </h3>
                      <div className="flex items-center gap-2 text-orisun-ivory/40 text-xs font-dm-sans mt-1">
                        <User size={14} />
                        <span>with {show.host}</span>
                      </div>
                    </div>

                    <button className="hidden sm:block px-4 py-2 border border-orisun-gold/20 text-orisun-gold font-unbounded text-[8px] tracking-widest hover:bg-orisun-gold hover:text-orisun-deep">
                      DETAILS
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
