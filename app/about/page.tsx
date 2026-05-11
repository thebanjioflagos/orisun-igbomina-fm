import { Landmark, Users, Radio, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-orisun-deep pt-24 pb-24">
      {/* Brand Hero */}
      <section className="px-6 py-24 border-b border-orisun-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <h1 className="text-6xl md:text-8xl font-fraunces text-orisun-ivory italic">The Wellspring</h1>
            <p className="text-xl font-dm-sans text-orisun-ivory/60 leading-relaxed">
              Orisun Igbomina Broadcasting Network (OIBN) is the definitive voice of the Igbomina people. Founded in Ila-Orangun, our station exists to preserve our ancestral stories while reporting the modern pulse of Osun State and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-4 border border-orisun-gold/20 bg-orisun-gold/5">
                <span className="text-orisun-gold font-unbounded text-2xl font-bold">102.1 FM</span>
                <p className="text-orisun-ivory/40 text-[10px] font-unbounded tracking-widest uppercase mt-2">Primary Signal</p>
              </div>
              <div className="px-6 py-4 border border-orisun-gold/20 bg-orisun-gold/5">
                <span className="text-orisun-gold font-unbounded text-2xl font-bold">Ila-Orangun</span>
                <p className="text-orisun-ivory/40 text-[10px] font-unbounded tracking-widest uppercase mt-2">Headquarters</p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full aspect-square relative">
            <div className="absolute inset-0 bg-orisun-gold/10 border border-orisun-gold/20 -rotate-3" />
            <div className="absolute inset-0 bg-orisun-deep border border-orisun-gold/40 flex items-center justify-center p-12">
               <Radio className="text-orisun-gold w-full h-full opacity-10" />
               <div className="absolute text-center space-y-4">
                 <h2 className="text-4xl font-fraunces text-orisun-gold italic italic">"Sharing Stories,<br />Celebrating Culture"</h2>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 px-6 bg-orisun-gold/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-fraunces text-orisun-ivory mb-16 italic">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-orisun-earth/10 border border-orisun-earth/20 flex items-center justify-center">
              <Users size={64} className="text-orisun-earth/40" />
            </div>
            <div className="space-y-6">
              <h3 className="text-4xl font-fraunces text-orisun-gold">Oloye Banji Agboola</h3>
              <p className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase">Chief Operating Officer</p>
              <p className="text-orisun-ivory/60 font-dm-sans text-lg leading-relaxed">
                As the Otun Oba Asoludero of Kajola-Ajaba Kingdom, Oloye Banji brings a unique blend of royal heritage and modern broadcasting strategy to OIBN. His vision is to bridge the gap between the Igbomina diaspora and their ancestral home.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-orisun-gold/20 flex items-center justify-center text-orisun-gold">
                  <Globe size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <Landmark className="text-orisun-gold" size={32} />
            <h3 className="text-3xl font-fraunces text-orisun-ivory italic">Cultural Authority</h3>
            <p className="text-orisun-ivory/60 font-dm-sans">
              We are the primary custodians of Igbomina oral history, ensuring our dialect and traditions remain vibrant in a digital world.
            </p>
          </div>
          <div className="space-y-6">
            <Users className="text-orisun-gold" size={32} />
            <h3 className="text-3xl font-fraunces text-orisun-ivory italic">Community Power</h3>
            <p className="text-orisun-ivory/60 font-dm-sans">
              OIBN is a platform for the people. We amplify community concerns, celebrate local successes, and empower every citizen.
            </p>
          </div>
          <div className="space-y-6">
            <Radio className="text-orisun-gold" size={32} />
            <h3 className="text-3xl font-fraunces text-orisun-ivory italic">Future Vision</h3>
            <p className="text-orisun-ivory/60 font-dm-sans">
              From 102.1 FM to global digital streaming and imminent TV launch, we are building a multi-platform media empire.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
