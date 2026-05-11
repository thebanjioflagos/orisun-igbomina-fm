import { Tv, Play, Share2, Info } from "lucide-react";

export default function TVPage() {
  return (
    <main className="min-h-screen bg-orisun-deep pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-fraunces text-orisun-ivory italic">Orisun TV</h1>
            <p className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-orisun-crimson rounded-full animate-pulse" /> Live Broadcast Preview
            </p>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-3 border border-orisun-gold/20 text-orisun-gold font-unbounded text-[10px] tracking-widest">FULLSCREEN</button>
             <button className="px-6 py-3 bg-orisun-gold text-orisun-deep font-unbounded text-[10px] font-bold tracking-widest">SCHEDULE</button>
          </div>
        </header>

        {/* Video Player Placeholder */}
        <div className="relative aspect-video bg-black border border-orisun-gold/20 group overflow-hidden">
          <div className="absolute inset-0 bg-orisun-gold/5 flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-orisun-gold/10 rounded-full flex items-center justify-center mx-auto border border-orisun-gold/20">
                <Tv className="text-orisun-gold" size={48} />
              </div>
              <p className="text-orisun-ivory/40 font-dm-sans text-xl">TV Signal Launching Imminently...</p>
              <button className="px-12 py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold text-xs tracking-widest hover:scale-105 transition-transform">
                GET NOTIFIED
              </button>
            </div>
          </div>
          
          {/* Overlay UI */}
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-orisun-deep to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Play className="text-orisun-gold" fill="currentColor" size={32} />
                <div className="h-1 w-64 bg-orisun-ivory/20 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-orisun-gold" />
                </div>
              </div>
              <div className="flex gap-6">
                <Share2 className="text-orisun-ivory/60 hover:text-orisun-gold cursor-pointer" size={20} />
                <Info className="text-orisun-ivory/60 hover:text-orisun-gold cursor-pointer" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Channel Info */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-fraunces text-orisun-gold italic">Visual Storytelling</h3>
            <p className="text-orisun-ivory/60 font-dm-sans leading-relaxed">
              Experience Igbomina heritage through a cinematic lens. Our TV channel will feature documentaries, live talk shows, and cultural festivals in stunning HD.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-fraunces text-orisun-gold italic">Community Spotlight</h3>
            <p className="text-orisun-ivory/60 font-dm-sans leading-relaxed">
              From the marketplace to the palace, we bring the faces and places of Igbominaland directly to your screens.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-fraunces text-orisun-gold italic">Global Streaming</h3>
            <p className="text-orisun-ivory/60 font-dm-sans leading-relaxed">
              Available soon on YouTube Live, Roku, and our mobile applications. The Source will have no boundaries.
            </p>
          </div>
        </div>
      </div>
      
      {/* Dev Credit */}
      <div className="mt-32 pt-12 border-t border-orisun-gold/10 text-center">
        <p className="text-orisun-gold font-unbounded text-[10px] tracking-[0.4em] uppercase opacity-40 mb-2">Digital Architecture & Experience</p>
        <p className="text-orisun-ivory font-unbounded text-sm font-bold tracking-[0.3em] uppercase">
          THEBIGBANG <span className="text-orisun-gold">COMPANY</span>
        </p>
      </div>
    </main>
  );
}
