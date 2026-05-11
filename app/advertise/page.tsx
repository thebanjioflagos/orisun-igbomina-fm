import { BarChart3, Users, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AdBookingForm from "@/components/sections/AdBookingForm";

const stats = [
  { label: "Weekly Listeners", value: "200,000+", icon: Users },
  { label: "Broadcast Radius", value: "50km+", icon: RadioSignal }, // Custom placeholder
  { label: "Social Followers", value: "50,000+", icon: Zap },
  { label: "Monthly Web Hits", value: "100,000+", icon: BarChart3 },
];

function RadioSignal({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      className={className} 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 20V4"/>
    </svg>
  );
}

const adProducts = [
  {
    title: "On-Air Radio",
    features: ["15/30/60 sec spots", "Sponsored Shows", "Live Presenter Reads", "Custom Jingles"],
    color: "bg-orisun-gold"
  },
  {
    title: "Digital & Social",
    features: ["Website Banner Ads", "Sponsored Articles", "Social Media Takeovers", "Newsletter Feature"],
    color: "bg-orisun-earth"
  },
  {
    title: "Community Events",
    features: ["Event Sponsorship", "Live Outside Broadcast", "Branded Activations", "Merchandising"],
    color: "bg-orisun-adire"
  }
];

export default function AdvertisePage() {
  return (
    <main className="min-h-screen bg-orisun-deep pt-24 pb-24">
      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-6xl md:text-8xl font-fraunces text-orisun-ivory italic">Grow Your Voice</h1>
          <p className="text-xl font-dm-sans text-orisun-ivory/60 leading-relaxed">
            Connect your brand to the heart of the Igbomina community. We don't just broadcast; we influence.
          </p>
          <div className="pt-8">
            <button className="px-12 py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold text-xs tracking-widest hover:scale-105 transition-transform">
              DOWNLOAD RATE CARD (PDF)
            </button>
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
          <h2 className="text-4xl md:text-6xl font-fraunces text-orisun-ivory text-center mb-16 italic">Our Ad Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adProducts.map((product, idx) => (
              <div key={idx} className="border border-orisun-gold/20 p-8 space-y-8 flex flex-col group hover:border-orisun-gold transition-colors">
                <h3 className="text-3xl font-fraunces text-orisun-gold">{product.title}</h3>
                <ul className="space-y-4 flex-1">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-orisun-ivory/60 font-dm-sans">
                      <CheckCircle2 className="text-orisun-gold" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={cn(
                  "w-full py-4 font-unbounded text-[10px] font-bold tracking-widest text-orisun-deep",
                  product.color
                )}>
                  INQUIRE NOW
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="px-6 py-24 bg-orisun-deep" id="book">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-fraunces text-orisun-ivory italic">Secure Your Slot</h2>
          <p className="text-orisun-ivory/60 font-dm-sans mt-4">Select a package and complete your booking in seconds.</p>
        </div>
        <AdBookingForm />
      </section>
    </main>
  );
}
