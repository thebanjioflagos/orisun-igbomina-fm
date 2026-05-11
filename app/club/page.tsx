"use client";

import { useState } from "react";
import { Check, Star, Trophy, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  { icon: Star, title: "VIP Dedications", desc: "Priority song dedications and shout-outs during live shows." },
  { icon: Trophy, title: "Exclusive Contests", desc: "Member-only giveaways, concert tickets, and backstage passes." },
  { icon: Users, title: "Digital Community", desc: "Access to our private WhatsApp & Discord groups." },
  { icon: Heart, title: "Heritage Support", desc: "Your dues directly fund our Igbomina language preservation projects." }
];

export default function ClubPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-orisun-deep pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-fraunces text-orisun-gold italic mb-6">Orisun Inner Circle</h1>
          <p className="text-xl font-dm-sans text-orisun-ivory/60 max-w-2xl mx-auto">
            Become a patron of Igbomina culture. Join the club that powers the source.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Benefits */}
          <div className="space-y-12">
            <h2 className="text-4xl font-fraunces text-orisun-ivory italic border-b border-orisun-gold/20 pb-4">Member Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="space-y-4 p-6 border border-orisun-gold/10 bg-orisun-gold/5 hover:border-orisun-gold transition-colors group">
                  <div className="w-12 h-12 bg-orisun-gold flex items-center justify-center rounded-sm group-hover:scale-110 transition-transform">
                    <benefit.icon className="text-orisun-deep" size={24} />
                  </div>
                  <h3 className="text-xl font-fraunces text-orisun-ivory">{benefit.title}</h3>
                  <p className="text-orisun-ivory/60 text-sm font-dm-sans leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-orisun-gold p-12 text-orisun-deep relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orisun-deep/10 -rotate-45 translate-x-16 -translate-y-16" />
            
            {!isSubmitted ? (
              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                <div className="space-y-2">
                  <h3 className="text-3xl font-fraunces font-bold italic">Join the Club</h3>
                  <p className="text-orisun-deep/60 font-dm-sans font-bold">₦5,000 / Month PATRONAGE</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-unbounded uppercase tracking-widest font-bold">Full Name</label>
                    <input type="text" required className="w-full bg-transparent border-b-2 border-orisun-deep/20 py-2 outline-none focus:border-orisun-deep font-dm-sans" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-unbounded uppercase tracking-widest font-bold">Email Address</label>
                    <input type="email" required className="w-full bg-transparent border-b-2 border-orisun-deep/20 py-2 outline-none focus:border-orisun-deep font-dm-sans" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-unbounded uppercase tracking-widest font-bold">WhatsApp Number</label>
                    <input type="tel" required className="w-full bg-transparent border-b-2 border-orisun-deep/20 py-2 outline-none focus:border-orisun-deep font-dm-sans" />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-orisun-deep text-orisun-gold font-unbounded font-bold text-sm tracking-widest hover:scale-[1.02] transition-transform"
                >
                  BECOME A PATRON
                </button>
                <p className="text-[10px] text-center font-dm-sans opacity-60">
                  By joining, you agree to our terms of patronage and community guidelines.
                </p>
              </form>
            ) : (
              <div className="text-center py-12 space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-orisun-deep rounded-full flex items-center justify-center mx-auto">
                  <Check size={48} className="text-orisun-gold" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-fraunces italic font-bold">E seun, Patron!</h3>
                  <p className="text-lg font-dm-sans">
                    Welcome to the Inner Circle. Check your WhatsApp for an invitation to our private forum.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 border-2 border-orisun-deep font-unbounded text-[10px] tracking-widest font-bold uppercase"
                >
                  BACK TO SITE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
