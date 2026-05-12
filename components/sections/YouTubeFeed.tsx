"use client";

import { Video, ExternalLink, PlayCircle } from "lucide-react";

export default function YouTubeFeed() {
  return (
    <section className="py-24 px-6 bg-orisun-deep border-t border-orisun-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-fraunces text-orisun-ivory italic">ORISUN IGBOMINA TV HIGHLIGHTS</h2>
            <p className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase flex items-center gap-2">
              <Video size={16} /> Latest from our YouTube Channel
            </p>
          </div>
          <a 
            href="https://www.youtube.com/@OrisunIgbomina" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3 border border-orisun-gold/40 text-orisun-gold font-unbounded text-[10px] tracking-widest hover:bg-orisun-gold hover:text-orisun-deep transition-all"
          >
            SUBSCRIBE TO CHANNEL
            <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Feature: YouTube Embed */}
          <div className="relative aspect-video bg-black rounded-sm overflow-hidden border border-orisun-gold/20 shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed?listType=user_uploads&list=OrisunIgbomina"
              title="Orisun Igbomina YouTube Feed"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Secondary Highlights */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="p-8 bg-orisun-gold/5 border border-orisun-gold/10 hover:border-orisun-gold/30 transition-all group">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-orisun-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="text-orisun-gold" size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-fraunces text-orisun-ivory">Igbomina Heritage Documentaries</h4>
                  <p className="text-sm font-dm-sans text-orisun-ivory/60 leading-relaxed">
                    Explore the deep history of the Igbomina people through our curated visual storytelling series.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-orisun-gold/5 border border-orisun-gold/10 hover:border-orisun-gold/30 transition-all group">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-orisun-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Video className="text-orisun-gold" size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-fraunces text-orisun-ivory">Live Broadcast Archives</h4>
                  <p className="text-sm font-dm-sans text-orisun-ivory/60 leading-relaxed">
                    Missed a show? Catch up on all our morning drive shows and cultural programs anytime.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-orisun-gold/5 border border-orisun-gold/10 hover:border-orisun-gold/30 transition-all group">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-orisun-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="text-orisun-gold" size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-fraunces text-orisun-ivory">Igbomina News & Politics</h4>
                  <p className="text-sm font-dm-sans text-orisun-ivory/60 leading-relaxed">
                    Stay updated with critical political discussions and regional news reporting from our TV desk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
