"use client";

import dynamic from "next/dynamic";
import { Play, Pause, Share2, Info, ListMusic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioStore } from "@/lib/audio-store";

// Dynamically import HeroScene with SSR disabled to prevent Canvas/WebGL loading crashes on the server.
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
});

// Pre-computed stable bar heights for the 40 simulated waveform bars to prevent hydration mismatch errors.
const WAVE_HEIGHTS = [
  55, 90, 35, 80, 60, 45, 75, 50, 85, 65, 30, 95, 40, 85, 70, 50, 90, 60, 40, 70,
  55, 90, 35, 80, 60, 45, 75, 50, 85, 65, 30, 95, 40, 85, 70, 50, 90, 60, 75, 45
];

export default function ListenPage() {
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const isImmersive = useAudioStore((state) => state.isImmersive);
  const currentTrack = useAudioStore((state) => state.currentTrack);
  const { togglePlay } = useAudioStore((state) => state.actions);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-orisun-deep">
      {/* 3D Immersive Background or Fallback Gradient */}
      {isImmersive ? (
        <HeroScene />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#250d00] via-[#120500] to-[#0a0200]" />
      )}

      {/* Glassmorphism Player Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-6 bg-orisun-deep/40 backdrop-blur-sm">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Metadata & Waveform */}
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orisun-crimson rounded-full animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full" />
                <span className="text-[10px] font-unbounded text-white font-bold uppercase tracking-widest">On Air</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-fraunces text-orisun-ivory leading-tight">
                {currentTrack.title}
              </h1>
              <p className="text-orisun-gold font-unbounded text-lg tracking-widest uppercase">
                with {currentTrack.presenter}
              </p>
            </div>

            {/* Simulated Waveform — uses stable pre-computed heights */}
            <div className="flex items-end gap-[4px] h-32 w-full">
              {WAVE_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 bg-orisun-gold/40 rounded-full transition-all duration-300",
                    isPlaying ? "animate-pulse" : "h-2"
                  )}
                  style={{
                    height: isPlaying ? `${h}%` : "8px",
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Controls & Info */}
          <div className="bg-orisun-deep/80 border border-orisun-gold/20 p-12 backdrop-blur-xl rounded-sm space-y-12">
            <div className="flex flex-col items-center text-center space-y-8">
              <button 
                onClick={togglePlay}
                className="w-32 h-32 bg-orisun-gold rounded-full flex items-center justify-center text-orisun-deep transition-all hover:scale-110 active:scale-95 shadow-2xl shadow-orisun-gold/20"
              >
                {isPlaying ? <Pause size={48} fill="currentColor" /> : <Play size={48} fill="currentColor" className="ml-2" />}
              </button>

              <div className="space-y-2">
                <p className="text-orisun-ivory/60 font-dm-sans">Now Streaming 102.1 FM</p>
                <div className="flex items-center gap-4 text-orisun-ivory">
                  <span className="font-mono text-xl">128kbps</span>
                  <div className="w-1 h-1 bg-orisun-gold rounded-full" />
                  <span className="font-mono text-xl">Stereo</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 border border-orisun-gold/10 hover:bg-orisun-gold/5 transition-all">
                <Share2 className="text-orisun-gold" size={20} />
                <span className="text-[8px] font-unbounded text-orisun-gold tracking-widest uppercase">Share</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 border border-orisun-gold/10 hover:bg-orisun-gold/5 transition-all">
                <ListMusic className="text-orisun-gold" size={20} />
                <span className="text-[8px] font-unbounded text-orisun-gold tracking-widest uppercase">Schedule</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 border border-orisun-gold/10 hover:bg-orisun-gold/5 transition-all">
                <Info className="text-orisun-gold" size={20} />
                <span className="text-[8px] font-unbounded text-orisun-gold tracking-widest uppercase">Details</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-0 w-full bg-orisun-gold py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-8">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-orisun-deep font-unbounded text-[10px] font-bold tracking-widest uppercase">
              IGBOMINA NEWS: New Agricultural Hub Commissioned in Ila-Orangun ● 102.1 FM ● THE SOURCE ● THE VOICE
            </span>
          ))}
        </div>
      </div>
      
      {/* Dev Credit */}
      <div className="absolute bottom-12 right-6 z-20 pointer-events-none opacity-40">
        <p className="text-orisun-ivory text-[8px] font-unbounded tracking-widest uppercase text-right">
          Built by <span className="font-bold">THEBIGBANG COMPANY</span>
        </p>
      </div>
    </main>
  );
}
