"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Video, VideoOff } from "lucide-react";
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
  const [visualRadio, setVisualRadio] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowPlayer(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showPlayer) return null;

  return (
    <div className={cn(
      "fixed left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700 flex flex-col items-center gap-4",
      visualRadio ? "bottom-[10vh] max-w-4xl" : "bottom-6"
    )}>
      {visualRadio && (
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-orisun-gold/40 shadow-2xl shadow-orisun-gold/20">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/live_stream?channel=UCYOURCHANNELID" 
            title="Orisun Igbomina FM Live Studio" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="w-full bg-orisun-deep/95 backdrop-blur-xl border border-orisun-gold/30 rounded-full p-2 flex items-center gap-4 shadow-2xl shadow-orisun-gold/10">

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
              {isPlaying ? "Now Playing" : "Orisun Igbomina FM 102.1"}
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
            onClick={() => setVisualRadio(!visualRadio)}
            aria-label={visualRadio ? "Disable Visual Radio" : "Enable Visual Radio"}
            className={cn(
              "transition-colors",
              visualRadio ? "text-orisun-gold" : "text-orisun-ivory/60 hover:text-orisun-gold"
            )}
          >
            {visualRadio ? <Video size={18} /> : <VideoOff size={18} />}
          </button>
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
