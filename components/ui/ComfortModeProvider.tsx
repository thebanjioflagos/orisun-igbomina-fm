"use client";

import { useEffect } from "react";
import { useAudioStore } from "@/lib/audio-store";

/**
 * ComfortModeProvider
 * Mounted once at the root layout. Reads the persisted `isComfortMode` and `isLightTheme`
 * preferences and ensures the classes on <html> stay in sync
 * after Next.js server-side rendering replaces the static shell.
 */
export default function ComfortModeProvider() {
  const isComfortMode = useAudioStore((s) => s.isComfortMode);
  const isLightTheme  = useAudioStore((s) => s.isLightTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("comfort-mode", isComfortMode);
  }, [isComfortMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", isLightTheme);
  }, [isLightTheme]);

  return null; // pure side-effect component
}
