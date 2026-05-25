"use client";

import { motion } from "framer-motion";
import { Search, FileText, Share2, Calendar, Download, Clock } from "lucide-react";

const archivedShows = [
  {
    title: "Morning Dew: The History of the Orangun Lineage",
    date: "May 10, 2026",
    summary: "A deep dive into the 12th-century migration patterns that led to the founding of Ila-Orangun.",
    category: "Culture",
    duration: "45:00",
    size: "42 MB",
    id: "pod-101"
  },
  {
    title: "Igbomina Voice: Agricultural Reforms in Osun",
    date: "May 08, 2026",
    summary: "Automated transcription of the interview with the Commissioner of Agriculture regarding new rice hub projects.",
    category: "News",
    duration: "1:20:00",
    size: "85 MB",
    id: "pod-102"
  }
];

export default function ArchivePage() {
  const handleDownload = (id: string) => {
    alert(`Downloading podcast ${id}... Ensure you are on Wi-Fi!`);
  };
  return (
    <main className="min-h-screen bg-orisun-deep pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-4">
          <h1 className="text-6xl font-fraunces text-orisun-ivory italic">Smart Archive</h1>
          <p className="text-orisun-ivory/60 font-dm-sans">
            AI-powered transcriptions and summaries of our best broadcasts. Searchable and preserved for the next generation.
          </p>
          <div className="flex bg-orisun-gold/5 border border-orisun-gold/20 p-4 rounded-sm">
            <Search className="text-orisun-gold mr-4" />
            <input 
              type="text" 
              placeholder="Search history, programs, or dates..." 
              className="bg-transparent border-none outline-none text-orisun-ivory w-full placeholder:text-orisun-ivory/20"
            />
          </div>
        </header>

        <div className="space-y-8">
          {archivedShows.map((show, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 border border-orisun-gold/10 hover:border-orisun-gold/40 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase">
                  {show.category}
                </span>
                <div className="flex items-center gap-2 text-orisun-ivory/40 text-[10px]">
                  <Calendar size={12} /> {show.date}
                </div>
              </div>
              <h3 className="text-3xl font-fraunces text-orisun-ivory group-hover:text-orisun-gold transition-colors mb-4 italic">
                {show.title}
              </h3>
              <p className="text-orisun-ivory/60 font-dm-sans leading-relaxed mb-6">
                {show.summary}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex gap-6">
                  <button className="flex items-center gap-2 text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase">
                    <FileText size={14} /> TRANSCRIPT
                  </button>
                  <button className="flex items-center gap-2 text-orisun-ivory/40 hover:text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase transition-colors">
                    <Share2 size={14} /> SHARE
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-orisun-ivory/40 font-dm-sans text-xs">
                    <Clock size={12} /> {show.duration}
                  </span>
                  <button 
                    onClick={() => handleDownload(show.id)}
                    className="flex items-center gap-2 px-4 py-2 border border-orisun-gold text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase hover:bg-orisun-gold hover:text-orisun-deep transition-all"
                  >
                    <Download size={14} /> {show.size}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
