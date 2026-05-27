"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Holiday = {
  name: string;
  themeClass: string;
  message: string;
  isActive: (date: Date) => boolean;
};

// Define Nigerian and Global Holidays
const holidays: Holiday[] = [
  {
    name: "Sallah",
    themeClass: "theme-sallah",
    message: "🌙 Eid Mubarak! Sallah celebration is in the air. Barka Da Sallah from Orisun Igbomina FM!",
    isActive: (date) => {
      // Approximation for 2026 Sallah (May 26 - May 28)
      const month = date.getMonth(); // 0-indexed, so May is 4
      const day = date.getDate();
      return month === 4 && day >= 26 && day <= 28;
    },
  },
  {
    name: "Independence Day",
    themeClass: "theme-independence",
    message: "🇳🇬 Happy Independence Day Nigeria! Celebrating our heritage with Orisun Igbomina FM.",
    isActive: (date) => date.getMonth() === 9 && date.getDate() === 1, // Oct 1
  },
  {
    name: "Christmas",
    themeClass: "theme-christmas",
    message: "🎄 Merry Christmas! Wishing you joy and peace this festive season.",
    isActive: (date) => date.getMonth() === 11 && date.getDate() >= 24 && date.getDate() <= 26, // Dec 24-26
  },
  {
    name: "New Year",
    themeClass: "theme-newyear",
    message: "🎆 Happy New Year! Welcome to a new dawn with Orisun Igbomina FM.",
    isActive: (date) => (date.getMonth() === 11 && date.getDate() === 31) || (date.getMonth() === 0 && date.getDate() <= 2), // Dec 31 - Jan 2
  }
];

export default function HolidayThemeEngine() {
  const [activeHoliday, setActiveHoliday] = useState<Holiday | null>(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const today = new Date();
    
    // Find active holiday
    const currentHoliday = holidays.find(h => h.isActive(today));
    
    if (currentHoliday) {
      setActiveHoliday(currentHoliday);
      // Apply holiday theme to document body
      document.body.classList.add(currentHoliday.themeClass);
    }

    return () => {
      if (currentHoliday) {
        document.body.classList.remove(currentHoliday.themeClass);
      }
    };
  }, []);

  if (!activeHoliday) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-0 left-0 w-full z-[100] ${
            activeHoliday.name === 'Sallah' ? 'bg-emerald-900 border-b border-emerald-500/30 text-orisun-ivory' :
            activeHoliday.name === 'Independence Day' ? 'bg-green-700 border-b border-green-500/50 text-white' :
            activeHoliday.name === 'Christmas' ? 'bg-red-800 border-b border-red-500/30 text-white' :
            'bg-orisun-gold text-orisun-deep'
          } px-4 py-2 flex justify-between items-center shadow-lg backdrop-blur-md bg-opacity-95`}
        >
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 font-unbounded text-[10px] md:text-xs font-semibold tracking-wider uppercase">
            <span>{activeHoliday.message}</span>
            <span className="hidden md:inline-block w-px h-3 bg-white/30"></span>
            <span className="text-[8px] md:text-[9px] bg-white/10 px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1">
              Sponsored by <strong className="text-yellow-400">MTN Nigeria</strong>
            </span>
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="text-white/70 hover:text-white px-2 font-bold transition-colors text-lg"
            aria-label="Close holiday banner"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
