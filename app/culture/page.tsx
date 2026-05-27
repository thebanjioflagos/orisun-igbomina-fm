import { Metadata } from "next";
import HeritageTimeline from "@/components/sections/HeritageTimeline";
import { BookOpen, Music, Users, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Igbomina Heritage & Culture Hub | Orisun Igbomina FM 102.1",
  description: "Explore the rich history, Oriki, and festivals of the Igbomina people. From the Orangun of Ila to modern traditions.",
};

export default function CulturePage() {
  return (
    <main className="min-h-screen bg-orisun-deep pt-24">
      {/* Hero */}
      <section className="px-6 py-24 text-center border-b border-orisun-gold/10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-fraunces text-orisun-ivory mb-6 italic">Our Heritage</h1>
          <p className="text-xl font-dm-sans text-orisun-ivory/60 leading-relaxed max-w-2xl mx-auto">
            Igbominaland is more than a place; it is a legacy of resilience, culture, and ancient wisdom descending from the Orangun of Ila.
          </p>
        </div>
      </section>

      {/* Heritage Timeline (Reusable) */}
      <HeritageTimeline />

      {/* Featured Sections */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Oriki Archive */}
          <div className="bg-orisun-gold/5 border border-orisun-gold/20 p-12 space-y-6 group hover:bg-orisun-gold/10 transition-all">
            <div className="w-16 h-16 bg-orisun-gold flex items-center justify-center rounded-sm">
              <Music className="text-orisun-deep" size={32} />
            </div>
            <h3 className="text-4xl font-fraunces text-orisun-ivory">Oriki Archive</h3>
            <p className="text-orisun-ivory/60 font-dm-sans leading-relaxed">
              Explore the sacred praise poetry of the Igbomina people. From family lineages to royal tributes, our archive preserves the soul of our identity.
            </p>
            <button className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase border-b border-orisun-gold/40 pb-2 hover:border-orisun-gold transition-all">
              EXPLORE ARCHIVE
            </button>
          </div>

          {/* Isinro Festival */}
          <div className="bg-orisun-earth/5 border border-orisun-earth/20 p-12 space-y-6 group hover:bg-orisun-earth/10 transition-all">
            <div className="w-16 h-16 bg-orisun-earth flex items-center justify-center rounded-sm">
              <Landmark className="text-orisun-ivory" size={32} />
            </div>
            <h3 className="text-4xl font-fraunces text-orisun-ivory">Isinro Festival</h3>
            <p className="text-orisun-ivory/60 font-dm-sans leading-relaxed">
              The heartbeat of Ila-Orangun. Learn about the rituals, the drums, and the unity that defines our most celebrated cultural event.
            </p>
            <button className="text-orisun-earth font-unbounded text-xs tracking-widest uppercase border-b border-orisun-earth/40 pb-2 hover:border-orisun-earth transition-all">
              LEARN MORE
            </button>
          </div>

          {/* Royal Court */}
          <div className="bg-orisun-adire/5 border border-orisun-adire/20 p-12 space-y-6 group hover:bg-orisun-adire/10 transition-all">
            <div className="w-16 h-16 bg-orisun-adire flex items-center justify-center rounded-sm">
              <Users className="text-orisun-ivory" size={32} />
            </div>
            <h3 className="text-4xl font-fraunces text-orisun-ivory">Royal Court</h3>
            <p className="text-orisun-ivory/60 font-dm-sans leading-relaxed">
              Follow the latest from the Palace of the Orangun. Tradition meets modern leadership in the heart of Yorubaland.
            </p>
            <button className="text-orisun-adire font-unbounded text-xs tracking-widest uppercase border-b border-orisun-adire/40 pb-2 hover:border-orisun-adire transition-all">
              ENTER PALACE
            </button>
          </div>

          {/* Language Learning */}
          <div className="bg-orisun-forest/5 border border-orisun-forest/20 p-12 space-y-6 group hover:bg-orisun-forest/10 transition-all">
            <div className="w-16 h-16 bg-orisun-forest flex items-center justify-center rounded-sm">
              <BookOpen className="text-orisun-ivory" size={32} />
            </div>
            <h3 className="text-4xl font-fraunces text-orisun-ivory">Language Corner</h3>
            <p className="text-orisun-ivory/60 font-dm-sans leading-relaxed">
              Preserving the Igbomina dialect. Learn essential phrases, proverbs, and the tonal beauty of our ancestral tongue.
            </p>
            <button className="text-orisun-forest font-unbounded text-xs tracking-widest uppercase border-b border-orisun-forest/40 pb-2 hover:border-orisun-forest transition-all">
              START LEARNING
            </button>
          </div>
        </div>
      </section>

      {/* Diaspora Section */}
      <section className="bg-orisun-deep py-24 px-6 border-t border-orisun-gold/10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-5xl font-fraunces text-orisun-gold italic">Igbomina in Diaspora</h2>
          <p className="text-orisun-ivory/60 text-lg font-dm-sans">
            No matter where you are in the world, the Source remains within you. Join our global community and share your story.
          </p>
          <div className="flex justify-center gap-6">
            <button className="px-12 py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold text-xs tracking-widest">
              JOIN THE GLOBAL CLUB
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
