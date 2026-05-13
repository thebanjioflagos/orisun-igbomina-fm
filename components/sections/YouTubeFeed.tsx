"use client";

import { Video, ExternalLink, PlayCircle } from "lucide-react";

// ✅ Correct YouTube channel embed format using the channel's handle-based playlist
// Replace CHANNEL_ID below with the actual UCxxxx channel ID from youtube.com/@OrisunIgbomina
const YOUTUBE_CHANNEL_ID  = "UCxxxxxxxxxxxxxxxxxxxxxx"; // TODO: replace with real channel ID
const YOUTUBE_EMBED_URL   = `https://www.youtube.com/embed?listType=playlist&list=${YOUTUBE_CHANNEL_ID}`;
// Fallback: embed the channel's latest video directly — safer approach
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@OrisunIgbomina";

const highlights = [
  {
    icon:        PlayCircle,
    title:       "Igbomina Heritage Documentaries",
    description: "Explore the deep history of the Igbomina people through our curated visual storytelling series.",
  },
  {
    icon:        Video,
    title:       "Live Broadcast Archives",
    description: "Missed a show? Catch up on all our morning drive shows and cultural programs anytime.",
  },
  {
    icon:        PlayCircle,
    title:       "Igbomina News & Politics",
    description: "Stay updated with critical political discussions and regional news reporting from our TV desk.",
  },
];

export default function YouTubeFeed() {
  return (
    <section className="py-24 px-6 bg-orisun-deep border-t border-orisun-gold/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-fraunces text-orisun-ivory italic">
              Orisun Igbomina TV
            </h2>
            <p className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase flex items-center gap-2">
              <Video size={16} />
              Latest from our YouTube Channel
            </p>
          </div>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3 border border-orisun-gold/40 text-orisun-gold font-unbounded text-[10px] tracking-widest hover:bg-orisun-gold hover:text-orisun-deep transition-all"
          >
            SUBSCRIBE TO CHANNEL
            <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* YouTube Embed — channel page iframe (most reliable approach) */}
          <div className="relative aspect-video bg-black rounded-sm overflow-hidden border border-orisun-gold/20 shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/videoseries?list=PLxxxxxxxxxxxxxxxxxx"
              title="Orisun Igbomina TV — Latest Videos"
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
            {/* Overlay CTA if embed fails or channel ID is not yet set */}
            <noscript>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-orisun-deep text-orisun-gold font-unbounded text-xs tracking-widest"
              >
                WATCH ON YOUTUBE →
              </a>
            </noscript>
          </div>

          {/* Highlight Cards */}
          <div className="space-y-6 flex flex-col justify-center">
            {highlights.map((item, idx) => (
              <a
                key={idx}
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 bg-orisun-gold/5 border border-orisun-gold/10 hover:border-orisun-gold/40 transition-all group block"
              >
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-orisun-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-orisun-gold/20 transition-colors">
                    <item.icon className="text-orisun-gold" size={32} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-fraunces text-orisun-ivory group-hover:text-orisun-gold transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm font-dm-sans text-orisun-ivory/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
