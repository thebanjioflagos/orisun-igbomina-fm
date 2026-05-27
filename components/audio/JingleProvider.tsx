"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { preloadAllJingles, useJingleStore } from "@/lib/jingle-engine";

/**
 * JingleProvider — invisible component that:
 *  1. Preloads all 8 jingles on mount
 *  2. Plays a welcome jingle on first visit
 *  3. Plays a subtle transition jingle on page navigation
 */
export default function JingleProvider() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const hasPlayedWelcome = useRef(false);
  const { play } = useJingleStore((s) => s.actions);
  const sfxEnabled = useJingleStore((s) => s.sfxEnabled);

  // Preload all jingles on first mount
  useEffect(() => {
    preloadAllJingles();
  }, []);

  // Welcome jingle — plays once per session on home page
  useEffect(() => {
    if (hasPlayedWelcome.current) return;
    if (pathname === "/" && sfxEnabled) {
      // Small delay so the page has time to render
      const timer = setTimeout(() => {
        play("welcome");
        hasPlayedWelcome.current = true;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [pathname, sfxEnabled, play]);

  // Page transition jingles
  const lastTransitionPlay = useRef<number>(0);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    if (!sfxEnabled) { prevPath.current = pathname; return; }

    // Skip admin pages and login
    if (pathname?.startsWith("/admin") || pathname === "/login") {
      prevPath.current = pathname;
      return;
    }

    const now = Date.now();
    // Throttle transition jingles to once every 3 minutes
    if (now - lastTransitionPlay.current > 180000) {
      // Alternate between two transition jingles for variety
      const isEven = pathname.length % 2 === 0;
      play(isEven ? "transition1" : "transition2");
      lastTransitionPlay.current = now;
    }

    prevPath.current = pathname;
  }, [pathname, sfxEnabled, play]);

  return null; // Invisible component
}
