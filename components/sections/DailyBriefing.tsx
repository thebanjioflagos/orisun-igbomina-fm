"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, ChevronRight, X, Sparkles } from "lucide-react";

interface NewsData {
  headline: string;
  summary_points: string[];
  sign_off: string;
}

export default function DailyBriefing() {
  const [news, setNews] = useState<NewsData | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news-anchor");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error("Failed to load news briefing");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (!isOpen || !news) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed bottom-24 right-6 z-40 w-full max-w-sm"
      >
        <div className="bg-orisun-deep/90 backdrop-blur-xl border border-orisun-gold/30 p-6 rounded-sm shadow-2xl relative overflow-hidden group">
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 bg-orisun-gold/5 animate-pulse" />
          
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-orisun-ivory/40 hover:text-orisun-gold transition-colors"
          >
            <X size={16} />
          </button>

          <div className="relative space-y-4">
            <div className="flex items-center gap-2 text-orisun-gold">
              <Sparkles size={14} className="animate-spin-slow" />
              <span className="text-[10px] font-unbounded font-bold tracking-widest uppercase">AI Daily Briefing</span>
            </div>

            {loading ? (
              <div className="space-y-3 py-4">
                <div className="h-6 bg-orisun-gold/20 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-orisun-gold/10 rounded animate-pulse w-full" />
                <div className="h-4 bg-orisun-gold/10 rounded animate-pulse w-5/6" />
              </div>
            ) : (
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
                      transition={{ delay: i * 0.2 }}
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
