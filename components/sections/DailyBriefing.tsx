"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Sparkles, AlertTriangle, Radio } from "lucide-react";

interface NewsData {
  headline:      string;
  summary_points: string[];
  sign_off:       string;
}

export default function DailyBriefing() {
  const [news,    setNews]    = useState<NewsData | null>(null);
  const [isOpen,  setIsOpen]  = useState(true);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news-anchor");
        if (!res.ok) throw new Error("API error");
        const data: NewsData = await res.json();
        setNews(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  // Don't render if closed, or if there's nothing to show (no data AND no error)
  if (!isOpen) return null;
  if (!loading && !news && !error) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed bottom-24 right-6 z-40 w-full max-w-sm"
      >
        <div className="bg-orisun-deep/90 backdrop-blur-xl border border-orisun-gold/30 p-6 rounded-sm shadow-2xl relative overflow-hidden">
          {/* Animated pulse */}
          <div className="absolute inset-0 bg-orisun-gold/5 animate-pulse pointer-events-none" />

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-orisun-ivory/40 hover:text-orisun-gold transition-colors z-10"
            aria-label="Close briefing"
          >
            <X size={16} />
          </button>

          <div className="relative space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 text-orisun-gold">
              <Sparkles size={14} />
              <span className="text-[10px] font-unbounded font-bold tracking-widest uppercase">AI Daily Briefing</span>
            </div>

            {/* Loading skeleton */}
            {loading && (
              <div className="space-y-3 py-4">
                <div className="h-6 bg-orisun-gold/20 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-orisun-gold/10 rounded animate-pulse w-full" />
                <div className="h-4 bg-orisun-gold/10 rounded animate-pulse w-5/6" />
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="py-4 space-y-3">
                <div className="flex items-center gap-2 text-orisun-ivory/60">
                  <AlertTriangle size={16} className="text-orisun-gold flex-shrink-0" />
                  <p className="text-xs font-dm-sans text-orisun-ivory/60 leading-relaxed">
                    Today&apos;s briefing is being prepared. Check back shortly.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Radio size={14} className="text-orisun-gold" />
                  <span className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase">
                    Orisun Igbomina FM 102.1 — On Air
                  </span>
                </div>
              </div>
            )}

            {/* News content */}
            {!loading && !error && news && (
              <>
                <h3 className="text-xl font-fraunces text-orisun-ivory italic leading-tight">
                  {news.headline}
                </h3>

                <ul className="space-y-3">
                  {news.summary_points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="text-xs font-dm-sans text-orisun-ivory/70 flex gap-3 leading-relaxed"
                    >
                      <ChevronRight size={12} className="text-orisun-gold flex-shrink-0 mt-0.5" />
                      {point}
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-orisun-gold/10">
                  <p className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase italic">
                    {news.sign_off}
                  </p>
                </div>

                <button className="w-full py-3 mt-2 bg-orisun-gold text-orisun-deep font-unbounded text-[9px] font-bold tracking-widest hover:bg-white transition-colors">
                  LISTEN TO AUDIO VERSION
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
