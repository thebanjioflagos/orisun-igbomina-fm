"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioStore } from "@/lib/audio-store";

export default function AudioPlayer() {
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const isMuted = useAudioStore((state) => state.isMuted);
  const currentTrack = useAudioStore((state) => state.currentTrack);
  const { togglePlay, toggleMute } = useAudioStore((state) => state.actions);
  
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowPlayer(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showPlayer) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-orisun-deep/90 backdrop-blur-xl border border-orisun-gold/30 rounded-full p-2 flex items-center gap-4 shadow-2xl shadow-orisun-gold/10">
        {/* Play Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex-shrink-0 bg-orisun-gold rounded-full flex items-center justify-center text-orisun-deep transition-transform hover:scale-110 active:scale-95"
        >
          {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
        </button>

        {/* Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orisun-crimson rounded-full animate-pulse" />
            <p className="text-[10px] font-unbounded text-orisun-gold uppercase tracking-widest truncate">
              Now Playing: {currentTrack.title}
            </p>
          </div>
          <p className="text-sm font-fraunces text-orisun-ivory truncate">
            {currentTrack.presenter}
          </p>
        </div>

        {/* Visualizer Placeholder */}
        <div className="hidden sm:flex items-end gap-[2px] h-6 px-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-[2px] bg-orisun-gold/60 rounded-full transition-all",
                isPlaying ? "animate-bounce" : "h-1"
              )}
              style={{
                height: isPlaying ? `${Math.random() * 100}%` : "4px",
                animationDelay: `${i * 0.1}s`,
                animationDuration: "0.8s",
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 pr-4">
          <button 
            onClick={toggleMute}
            className="text-orisun-ivory/60 hover:text-orisun-gold transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button className="hidden sm:block text-orisun-ivory/60 hover:text-orisun-gold transition-colors">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
