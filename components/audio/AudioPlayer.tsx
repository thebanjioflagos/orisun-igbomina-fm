"use client";

import { useState, useEffect, useMemo } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioStore } from "@/lib/audio-store";
import Link from "next/link";

// Pre-compute stable bar heights once — avoids Math.random() in render & hydration mismatch
const BAR_HEIGHTS = [40, 70, 55, 90, 35, 80, 60, 45, 75, 50, 85, 65];

export default function AudioPlayer() {
  const isPlaying    = useAudioStore((s) => s.isPlaying);
  const isMuted      = useAudioStore((s) => s.isMuted);
  const currentTrack = useAudioStore((s) => s.currentTrack);
  const { togglePlay, toggleMute } = useAudioStore((s) => s.actions);

  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowPlayer(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showPlayer) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-orisun-deep/95 backdrop-blur-xl border border-orisun-gold/30 rounded-full p-2 flex items-center gap-4 shadow-2xl shadow-orisun-gold/10">

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause stream" : "Play stream"}
          className="w-12 h-12 flex-shrink-0 bg-orisun-gold rounded-full flex items-center justify-center text-orisun-deep transition-transform hover:scale-110 active:scale-95"
        >
          {isPlaying
            ? <Pause size={18} fill="currentColor" />
            : <Play  size={18} fill="currentColor" className="ml-0.5" />
          }
        </button>

        {/* Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orisun-crimson rounded-full animate-pulse flex-shrink-0" />
            <p className="text-[10px] font-unbounded text-orisun-gold uppercase tracking-widest truncate">
              {isPlaying ? "Now Playing" : "Orisun FM 102.1"}
            </p>
          </div>
          <p className="text-sm font-fraunces text-orisun-ivory truncate">
            {isPlaying ? `${currentTrack.title} — ${currentTrack.presenter}` : "Press play to start the stream"}
          </p>
        </div>

        {/* Audio Visualizer — stable pre-computed heights */}
        <div className="hidden sm:flex items-end gap-[2px] h-6 px-4">
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className={cn(
                "w-[2px] bg-orisun-gold/60 rounded-full transition-all duration-300",
                isPlaying ? "opacity-100" : "opacity-30"
              )}
              style={{
                height: isPlaying ? `${h}%` : "4px",
                animationDelay: `${i * 0.07}s`,
                animation: isPlaying ? `pulse ${0.6 + i * 0.05}s ease-in-out infinite alternate` : "none",
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 pr-4">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="text-orisun-ivory/60 hover:text-orisun-gold transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <Link
            href="/listen"
            aria-label="Open full player"
            className="hidden sm:block text-orisun-ivory/60 hover:text-orisun-gold transition-colors"
          >
            <Maximize2 size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
