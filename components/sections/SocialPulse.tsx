"use client";

import { MessageSquare, Users, Heart, Share2 } from "lucide-react";

export default function SocialPulse() {
  return (
    <section className="py-24 px-6 bg-orisun-deep overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orisun-gold/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orisun-gold/10 border border-orisun-gold/20 rounded-full">
              <MessageSquare className="text-orisun-gold" size={16} />
              <span className="text-[10px] font-unbounded text-orisun-gold font-bold uppercase tracking-widest">Community Pulse</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-fraunces text-orisun-ivory leading-tight">
              Join the <span className="italic text-orisun-gold">Igbomina</span> Conversation
            </h2>
            
            <p className="text-xl font-dm-sans text-orisun-ivory/60 leading-relaxed max-w-xl">
              Stay connected with the latest news, cultural discussions, and community events. Our Facebook community is the heart of the OIBN digital family.
            </p>

            <div className="flex flex-wrap gap-12 pt-8">
              <div className="space-y-2">
                <p className="text-4xl font-fraunces text-orisun-ivory">50K+</p>
                <p className="text-[10px] font-unbounded text-orisun-gold uppercase tracking-widest">Active Followers</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-fraunces text-orisun-ivory">100%</p>
                <p className="text-[10px] font-unbounded text-orisun-gold uppercase tracking-widest">Cultural Integrity</p>
              </div>
            </div>

            <div className="pt-8">
              <a 
                href="https://www.facebook.com/OrisunIgbominaFm/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-12 py-5 bg-orisun-gold text-orisun-deep font-unbounded font-bold text-xs tracking-widest hover:scale-105 transition-transform"
              >
                JOIN THE FACEBOOK GROUP
              </a>
            </div>
          </div>

          {/* Social Proof Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="bg-orisun-ivory/5 border border-orisun-gold/10 p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orisun-gold/20 flex items-center justify-center">
                    <Heart className="text-orisun-gold" size={14} />
                  </div>
                  <span className="text-[10px] font-unbounded text-orisun-ivory/40 uppercase">Engagement</span>
                </div>
                <p className="text-sm font-dm-sans text-orisun-ivory/80">&quot;Sharing our stories globally!&quot;</p>
              </div>
              <div className="bg-orisun-gold/10 border border-orisun-gold/30 p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orisun-gold/20 flex items-center justify-center">
                    <Share2 className="text-orisun-gold" size={14} />
                  </div>
                  <span className="text-[10px] font-unbounded text-orisun-gold uppercase">Community</span>
                </div>
                <p className="text-sm font-dm-sans text-orisun-ivory">Real-time updates from Ila-Orangun.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-orisun-gold border border-orisun-gold p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orisun-deep/20 flex items-center justify-center">
                    <Users className="text-orisun-deep" size={14} />
                  </div>
                  <span className="text-[10px] font-unbounded text-orisun-deep/60 uppercase">Growth</span>
                </div>
                <p className="text-sm font-dm-sans text-orisun-deep font-bold">The #1 Choice for Igbomina People.</p>
              </div>
              <div className="bg-orisun-ivory/5 border border-orisun-gold/10 p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orisun-gold/20 flex items-center justify-center">
                    <MessageSquare className="text-orisun-gold" size={14} />
                  </div>
                  <span className="text-[10px] font-unbounded text-orisun-ivory/40 uppercase">Facebook</span>
                </div>
                <p className="text-sm font-dm-sans text-orisun-ivory/80">Daily cultural live streams.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
