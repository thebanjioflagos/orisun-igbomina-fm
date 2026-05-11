import Link from "next/link";
import { Radio, Link as LinkIcon, MessageSquare, Camera, Video, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-orisun-deep border-t border-orisun-gold/20 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-sm bg-orisun-ivory/5 p-1 border border-orisun-gold/20">
              <img src="/images/logo.jpg" alt="Orisun FM Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-fraunces text-2xl font-bold leading-none text-orisun-ivory">ORISUN</span>
              <span className="font-unbounded text-[10px] tracking-widest text-orisun-gold uppercase">Igbomina 102.1 FM</span>
            </div>
          </Link>
          <p className="text-orisun-ivory/60 font-dm-sans leading-relaxed italic border-l-2 border-orisun-yellow pl-4">
            "Originality At Its Peak...."
          </p>
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/OrisunIgbominaFm/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 border border-orisun-gold/20 flex items-center justify-center text-orisun-gold hover:bg-orisun-gold hover:text-orisun-deep transition-all"
              title="Follow us on Facebook"
            >
              <MessageSquare size={18} />
            </a>
            <a 
              href="https://www.youtube.com/@OrisunIgbomina" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 border border-orisun-gold/20 flex items-center justify-center text-orisun-gold hover:bg-orisun-gold hover:text-orisun-deep transition-all"
              title="Subscribe on YouTube"
            >
              <Video size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-unbounded text-xs tracking-widest text-orisun-gold uppercase mb-8">Navigation</h4>
          <ul className="space-y-4">
            {["About Us", "Our Programs", "Culture & Heritage", "Latest News", "Contact"].map((link) => (
              <li key={link}>
                <Link href="#" className="text-orisun-ivory/60 hover:text-orisun-gold transition-colors font-dm-sans">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-unbounded text-xs tracking-widest text-orisun-gold uppercase mb-8">Visit Us</h4>
          <ul className="space-y-6">
            <li className="flex gap-4 text-orisun-ivory/60 font-dm-sans">
              <MapPin className="text-orisun-gold flex-shrink-0" size={20} />
              <span>Ila-Orangun, Osun State,<br />Nigeria</span>
            </li>
            <li className="flex gap-4 text-orisun-ivory/60 font-dm-sans">
              <Phone className="text-orisun-gold flex-shrink-0" size={20} />
              <span>+234 800 ORISUN FM</span>
            </li>
            <li className="flex gap-4 text-orisun-ivory/60 font-dm-sans">
              <Mail className="text-orisun-gold flex-shrink-0" size={20} />
              <span>contact@orisunigbominafm.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-unbounded text-xs tracking-widest text-orisun-gold uppercase mb-8">Newsletter</h4>
          <p className="text-orisun-ivory/60 text-sm mb-6 font-dm-sans">
            Get the latest stories and cultural updates delivered to your inbox.
          </p>
          <div className="flex border-b border-orisun-gold/40 py-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border-none outline-none text-orisun-ivory w-full placeholder:text-orisun-ivory/20 font-dm-sans"
            />
            <button className="text-orisun-gold font-unbounded text-[10px] tracking-widest">JOIN</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-orisun-gold/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-orisun-ivory/40 text-[10px] font-unbounded tracking-widest uppercase">
          © 2026 Orisun Igbomina Broadcasting Network. All rights reserved.
        </p>
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex flex-col items-center md:items-end group cursor-default">
            <p className="text-orisun-gold font-unbounded text-[9px] tracking-[0.4em] uppercase mb-1">Digital Design & Development</p>
            <h4 className="text-white font-unbounded text-lg md:text-xl font-bold tracking-tighter uppercase leading-none">
              THE <span className="text-orisun-gold">BIGBANG</span> COMPANY
            </h4>
          </div>
          <div className="flex gap-8 mt-4">
            <Link href="#" className="text-orisun-ivory/40 text-[10px] font-unbounded tracking-widest hover:text-orisun-gold uppercase transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-orisun-ivory/40 text-[10px] font-unbounded tracking-widest hover:text-orisun-gold uppercase transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
