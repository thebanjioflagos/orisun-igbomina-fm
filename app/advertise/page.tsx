"use client";

import { useState } from "react";
import { BarChart3, Users, Zap, CheckCircle2, Download, MessageSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AdBookingFormDynamic from "@/components/sections/AdBookingFormDynamic";

// ─── Stats ──────────────────────────────────────────────────────────────────
const stats = [
  { label: "Weekly Listeners",  value: "200,000+", icon: Users     },
  { label: "Broadcast Radius",  value: "50km+",    icon: RadioIcon },
  { label: "Social Followers",  value: "50,000+",  icon: Zap       },
  { label: "Monthly Web Hits",  value: "100,000+", icon: BarChart3 },
];

function RadioIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 20V4"/>
    </svg>
  );
}

// ─── Ad Products ─────────────────────────────────────────────────────────────
const adProducts = [
  {
    title:    "On-Air Radio",
    features: ["15/30/60 sec spots", "Sponsored Shows", "Live Presenter Reads", "Custom Jingles"],
    color:    "bg-orisun-gold",
    href:     "#book",
  },
  {
    title:    "Digital & Social",
    features: ["Website Banner Ads", "Sponsored Articles", "Social Media Takeovers", "Newsletter Feature"],
    color:    "bg-orisun-earth",
    href:     "#book",
  },
  {
    title:    "Community Events",
    features: ["Event Sponsorship", "Live Outside Broadcast", "Branded Activations", "Merchandising"],
    color:    "bg-orisun-adire",
    href:     "#book",
  },
];

// ─── Rate Card Modal ──────────────────────────────────────────────────────────
function RateCardModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-orisun-deep/90 backdrop-blur-md">
      <div className="w-full max-w-md bg-orisun-deep border border-orisun-gold/30 p-10 space-y-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-orisun-ivory/40 hover:text-orisun-gold transition-colors text-xl">✕</button>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-orisun-gold/10 border border-orisun-gold/20 rounded-full flex items-center justify-center mx-auto">
            <Download className="text-orisun-gold" size={28} />
          </div>
          <h3 className="text-3xl font-fraunces text-orisun-ivory italic">Rate Card</h3>
          <p className="text-orisun-ivory/60 font-dm-sans text-sm leading-relaxed">
            Our full rate card is available on request. Contact our advertising team directly and we'll send you the latest rates and media kit within 24 hours.
          </p>
        </div>
        <div className="space-y-4">
          <a
            href="mailto:ads@orisunigbominafm.com?subject=Rate Card Request"
            className="w-full py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-orisun-ivory transition-colors"
          >
            <MessageSquare size={16} /> EMAIL US FOR RATE CARD
          </a>
          <a
            href="https://wa.me/2348001021021?text=Hello%20Orisun%20Igbomina%20FM%20102.1!%20I%27d%20like%20to%20request%20your%20rate%20card."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-orisun-gold/10 border border-orisun-gold/30 text-orisun-gold font-unbounded font-bold text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-orisun-gold/20 transition-colors"
          >
            WHATSAPP US INSTEAD
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdvertisePage() {
  const [showRateCard, setShowRateCard] = useState(false);

  return (
    <main className="min-h-screen bg-orisun-deep pt-24 pb-24">
      {showRateCard && <RateCardModal onClose={() => setShowRateCard(false)} />}

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-orisun-gold font-unbounded text-xs tracking-[0.3em] uppercase">
            Advertise on Orisun Igbomina FM 102.1
          </p>
          <h1 className="text-6xl md:text-8xl font-fraunces text-orisun-ivory italic">Grow Your Voice</h1>
          <p className="text-xl font-dm-sans text-orisun-ivory/60 leading-relaxed">
            Connect your brand to the heart of the Igbomina community. We don&apos;t just broadcast — we influence.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => setShowRateCard(true)}
              className="flex items-center gap-2 px-10 py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold text-xs tracking-widest hover:scale-105 transition-transform"
            >
              <Download size={16} /> REQUEST RATE CARD
            </button>
            <a
              href="#book"
              className="flex items-center gap-2 px-10 py-4 border border-orisun-gold text-orisun-gold font-unbounded font-bold text-xs tracking-widest hover:bg-orisun-gold hover:text-orisun-deep transition-all"
            >
              BOOK NOW <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orisun-gold/5 py-24 px-6 border-y border-orisun-gold/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-4">
              <div className="w-16 h-16 bg-orisun-gold flex items-center justify-center rounded-sm mx-auto">
                <stat.icon className="text-orisun-deep" size={32} />
              </div>
              <p className="text-4xl font-fraunces text-orisun-ivory italic">{stat.value}</p>
              <p className="text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Products */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-fraunces text-orisun-ivory text-center mb-4 italic">Our Ad Solutions</h2>
          <p className="text-center text-orisun-ivory/50 font-dm-sans mb-16 max-w-xl mx-auto">
            From on-air spots to full digital campaigns — we have a package that fits every budget.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adProducts.map((product, idx) => (
              <div key={idx} className="border border-orisun-gold/20 p-8 space-y-8 flex flex-col group hover:border-orisun-gold transition-colors">
                <h3 className="text-3xl font-fraunces text-orisun-gold">{product.title}</h3>
                <ul className="space-y-4 flex-1">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-orisun-ivory/60 font-dm-sans">
                      <CheckCircle2 className="text-orisun-gold flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={product.href}
                  className={cn(
                    "w-full py-4 font-unbounded text-[10px] font-bold tracking-widest text-orisun-deep text-center block hover:opacity-90 transition-opacity",
                    product.color
                  )}
                >
                  INQUIRE NOW
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="py-12 px-6 bg-orisun-gold/5 border-y border-orisun-gold/10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-2xl font-fraunces text-orisun-ivory italic leading-relaxed">
            &ldquo;Advertising on Orisun Igbomina FM 102.1 put my business in front of every household in Ila-Orangun and beyond.
            Within one week of our campaign, our sales doubled.&rdquo;
          </p>
          <p className="text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase">
            — Satisfied Advertiser · Ila-Orangun Business Community
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="px-6 py-24 bg-orisun-deep" id="book">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-fraunces text-orisun-ivory italic">Secure Your Slot</h2>
          <p className="text-orisun-ivory/60 font-dm-sans mt-4">
            Select a package and complete your booking in seconds.
          </p>
        </div>
        <AdBookingFormDynamic />
      </section>
    </main>
  );
}
