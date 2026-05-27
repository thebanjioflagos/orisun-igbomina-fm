"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import SmoothScroll from "@/components/ui/SmoothScroll";
import OnAirSchedule from "@/components/sections/OnAirSchedule";
import HeritageTimeline from "@/components/sections/HeritageTimeline";
import YouTubeFeed from "@/components/sections/YouTubeFeed";
import SocialPulse from "@/components/sections/SocialPulse";
import NewsShowcase from "@/components/sections/NewsShowcase";
import DailyBriefing from "@/components/sections/DailyBriefing";
import Link from "next/link";
import { Eye, Zap, Radio, ShieldCheck } from "lucide-react";
import { useAudioStore } from "@/lib/audio-store";
import { useJingleStore } from "@/lib/jingle-engine";

const ImmersiveEngine = dynamic(() => import("@/components/3d/ImmersiveEngine"), {
  ssr: false,
});

export default function HomeContent() {
  const isImmersive = useAudioStore((s) => s.isImmersive);
  const isPlaying   = useAudioStore((s) => s.isPlaying);
  const { togglePlay } = useAudioStore((s) => s.actions);
  const playJingle = useJingleStore((s) => s.actions.play);

  const handleListenLive = () => {
    if (!isPlaying) {
      // Play the station ID jingle before the stream starts
      playJingle("stationId");
      setTimeout(() => togglePlay(), 800); // Give the jingle a brief head start
    } else {
      togglePlay();
    }
  };

  return (
    <SmoothScroll>
      <DailyBriefing />
      <main className="relative min-h-screen bg-transparent overflow-hidden">
        {/* Cinematic WebGL Engine (Fixed Background) or fallback Gradient */}
        {isImmersive ? (
          <Suspense fallback={
            <div className="absolute inset-0 bg-orisun-deep flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-orisun-gold/20 border-t-orisun-gold rounded-full animate-spin"></div>
            </div>
          }>
            <ImmersiveEngine />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#250d00] via-[#120500] to-[#0a0200]" />
        )}

        {/* Brand Banner Overlay */}
        <div className="absolute inset-0 z-[5] opacity-10 pointer-events-none">
          <img 
            src="/images/banner.jpg" 
            alt="Orisun Igbomina FM Banner Background" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        {/* Content Overlay */}
        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-24 text-center pointer-events-none">
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
              <span className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase animate-pulse flex items-center gap-1.5 justify-center">
                <span className="w-1.5 h-1.5 bg-orisun-crimson rounded-full" />
                Live Broadcast
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-fraunces text-orisun-ivory leading-[1.08] tracking-tight">
              Orisun <span className="italic text-orisun-gold font-medium">Igbomina</span><br />
              <span className="font-unbounded text-2xl md:text-4xl lg:text-5xl tracking-widest text-orisun-ivory/90 uppercase">102.1 FM</span>
            </h1>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="inline-block mt-4"
            >
               <span className="font-fraunces text-md md:text-xl font-medium tracking-wider text-orisun-gold border-y border-orisun-gold/30 py-2 px-8 uppercase">
                 Originality At Its Peak
               </span>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <button 
                onClick={handleListenLive}
                className="px-8 py-4 bg-orisun-gold text-orisun-deep font-unbounded text-xs font-bold rounded-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-orisun-gold/15"
              >
                {isPlaying ? "PAUSE STREAM" : "LISTEN LIVE"}
              </button>
              <a 
                href="#news-section"
                className="px-8 py-4 border border-orisun-ivory/60 text-orisun-ivory font-unbounded text-xs font-bold rounded-sm transition-all hover:bg-orisun-ivory hover:text-orisun-deep cursor-pointer"
              >
                EXPLORE STORIES
              </a>
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

          <section id="news-section" className="px-8 py-32 border-t border-orisun-gold/10">
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                 <div className="space-y-4">
                   <p className="text-orisun-gold font-unbounded text-xs tracking-[0.3em] uppercase">Latest Updates</p>
                   <h2 className="text-4xl md:text-6xl font-fraunces text-orisun-ivory leading-tight">From <span className="italic text-orisun-gold font-medium">Igbominaland</span></h2>
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

          {/* ── Citizen Journalism CTA ─────────────────────────────────── */}
          <section className="relative px-6 py-28 border-t border-orisun-gold/10 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orisun-crimson/8 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-orisun-gold/50 to-transparent" />

            <div className="max-w-5xl mx-auto text-center relative z-10">
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-orisun-crimson/10 border border-orisun-crimson/25 rounded-full px-4 py-1.5 mb-8"
              >
                <span className="w-2 h-2 bg-orisun-crimson rounded-full animate-pulse" />
                <span className="text-orisun-crimson font-unbounded text-[10px] uppercase tracking-widest">
                  Citizen Journalism
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-fraunces text-5xl md:text-7xl text-orisun-ivory leading-tight mb-6"
              >
                You Are the{" "}
                <span className="italic text-orisun-gold">Reporter</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-orisun-ivory/60 font-dm-sans text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                Witnessed something your community must know? Submit your eye-witness account, photo, or video directly to Orisun Igbomina FM 102.1&apos;s editorial team. Every submission is reviewed within minutes.
              </motion.p>

              {/* 3-step flow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left"
              >
                {[
                  { icon: Eye,        color: "text-orisun-crimson", bg: "bg-orisun-crimson/10 border-orisun-crimson/20", title: "You Witness It",       desc: "Capture the moment — a photo, video, or written account from the scene." },
                  { icon: Zap,        color: "text-orisun-gold",    bg: "bg-orisun-gold/10 border-orisun-gold/20",       title: "We Review It Fast",  desc: "Our editorial team verifies every submission within minutes of receipt." },
                  { icon: Radio,      color: "text-blue-400",       bg: "bg-blue-500/10 border-blue-500/20",             title: "Community Hears It", desc: "Approved reports are published online and may be broadcast on air." },
                ].map(({ icon: Icon, color, bg, title, desc }) => (
                  <div key={title} className={`border rounded-xl p-5 flex items-start gap-4 bg-white/[0.02] ${bg.split(" ")[1]}`}>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${bg}`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div>
                      <p className="font-fraunces text-orisun-ivory font-bold text-sm mb-1">{title}</p>
                      <p className="text-orisun-ivory/50 text-xs font-dm-sans leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link
                  href="/report-news"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-orisun-crimson text-white font-unbounded text-sm rounded-xl hover:bg-orisun-crimson/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orisun-crimson/25"
                >
                  <Eye size={16} />
                  Submit Eye-Witness Report
                </Link>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-orisun-gold/40 text-orisun-gold font-unbounded text-sm rounded-xl hover:bg-orisun-gold/10 transition-all"
                >
                  Read Latest News
                </Link>
              </motion.div>

              {/* Security note */}
              <div className="mt-8 flex items-center justify-center gap-2 text-orisun-ivory/25 text-xs font-dm-sans">
                <ShieldCheck size={13} />
                All submissions are encrypted and handled securely by Orisun Igbomina FM 102.1.
              </div>
            </div>
          </section>
        </div>
      </main>
    </SmoothScroll>
  );
}
