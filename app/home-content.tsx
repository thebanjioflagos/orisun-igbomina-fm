"use client";

import { motion } from "framer-motion";
import ImmersiveEngine from "@/components/3d/ImmersiveEngine";
import SmoothScroll from "@/components/ui/SmoothScroll";
import OnAirSchedule from "@/components/sections/OnAirSchedule";
import HeritageTimeline from "@/components/sections/HeritageTimeline";
import YouTubeFeed from "@/components/sections/YouTubeFeed";
import SocialPulse from "@/components/sections/SocialPulse";
import NewsShowcase from "@/components/sections/NewsShowcase";
import DailyBriefing from "@/components/sections/DailyBriefing";

export default function HomeContent() {
  return (
    <SmoothScroll>
      <DailyBriefing />
      <main className="relative min-h-screen bg-transparent overflow-hidden">
        {/* Cinematic WebGL Engine (Fixed Background) */}
        <ImmersiveEngine />

        {/* Brand Banner Overlay */}
        <div className="absolute inset-0 z-5 opacity-20 pointer-events-none">
          <img 
            src="/images/banner.jpg" 
            alt="Orisun FM Banner Background" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        {/* Content Overlay */}
        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl space-y-6 pointer-events-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-block px-4 py-1 border border-orisun-gold rounded-full bg-orisun-gold/10"
            >
              <span className="text-orisun-gold font-unbounded text-sm tracking-widest uppercase animate-pulse">
                ● Live Now
              </span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-fraunces italic text-orisun-ivory leading-tight tracking-tighter">
              Orisun<br />
              Igbomina<br />
              102.1 FM
            </h1>

            <motion.div 
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: -1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-orisun-yellow text-orisun-deep px-6 py-2 rounded-sm inline-block mt-4"
            >
               <span className="font-fraunces text-2xl font-bold">Originality At Its Peak....</span>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <button className="px-8 py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold rounded-sm transition-transform hover:scale-105 active:scale-95">
                LISTEN LIVE
              </button>
              <button className="px-8 py-4 border-2 border-orisun-ivory text-orisun-ivory font-unbounded font-bold rounded-sm transition-all hover:bg-orisun-ivory hover:text-orisun-deep">
                EXPLORE STORIES
              </button>
            </div>
          </motion.div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="font-unbounded text-xs tracking-tighter text-orisun-ivory/40 uppercase">
              Scroll to Explore
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-orisun-gold to-transparent" />
          </div>
        </section>

        {/* Sections below the fold - glassmorphism added */}
        <div className="relative z-10 bg-orisun-deep/70 backdrop-blur-md">
          <OnAirSchedule />

          <section className="px-8 py-32 border-t border-orisun-gold/10">
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                 <div className="space-y-4">
                   <p className="text-orisun-gold font-unbounded text-xs tracking-[0.3em] uppercase">Latest Updates</p>
                   <h2 className="text-5xl md:text-7xl font-fraunces text-orisun-ivory italic">From Igbominaland</h2>
                 </div>
                 <button className="px-6 py-3 border border-orisun-gold/40 text-orisun-gold font-unbounded text-[10px] tracking-widest hover:bg-orisun-gold hover:text-orisun-deep transition-all">
                   VIEW ALL NEWS
                 </button>
               </div>
               <NewsShowcase />
            </div>
          </section>

          <HeritageTimeline />
          <YouTubeFeed />
          <SocialPulse />
        </div>
      </main>
    </SmoothScroll>
  );
}
