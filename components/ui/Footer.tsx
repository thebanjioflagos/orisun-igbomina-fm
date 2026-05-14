"use client";

import Link from "next/link";
import { Video, Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const footerLinks = [
  { label: "About Us",          href: "/about"     },
  { label: "Our Programs",      href: "/programs"  },
  { label: "Culture & Heritage",href: "/culture"   },
  { label: "Latest News",       href: "/news"      },
  { label: "Contact Us",        href: "/contact"   },
];

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
            &ldquo;Originality At Its Peak&rdquo;
          </p>
          {/* Social Links */}
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

        {/* Quick Links — all wired to real pages */}
        <div>
          <h4 className="font-unbounded text-xs tracking-widest text-orisun-gold uppercase mb-8">Navigation</h4>
          <ul className="space-y-4">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-orisun-ivory/60 hover:text-orisun-gold transition-colors font-dm-sans"
                >
                  {link.label}
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
              <span>Broadcasting House,<br />Ila-Orangun, Osun State,<br />Nigeria</span>
            </li>
            <li className="flex gap-4 text-orisun-ivory/60 font-dm-sans">
              <Phone className="text-orisun-gold flex-shrink-0" size={20} />
              {/* Placeholder — replace with real number before go-live */}
              <a href="tel:+23408001021" className="hover:text-orisun-gold transition-colors">
                +234 (0) 800 102 1021
              </a>
            </li>
            <li className="flex gap-4 text-orisun-ivory/60 font-dm-sans">
              <Mail className="text-orisun-gold flex-shrink-0" size={20} />
              <a href="mailto:info@orisunigbominafm.com" className="hover:text-orisun-gold transition-colors">
                info@orisunigbominafm.com
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter — wired to API */}
        <div>
          <h4 className="font-unbounded text-xs tracking-widest text-orisun-gold uppercase mb-8">Newsletter</h4>
          <p className="text-orisun-ivory/60 text-sm mb-6 font-dm-sans">
            Get the latest stories and cultural updates delivered to your inbox.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form  = e.currentTarget as HTMLFormElement;
              const email = (form.elements.namedItem("email") as HTMLInputElement).value;
              try {
                await fetch("/api/newsletter", {
                  method:  "POST",
                  headers: { "Content-Type": "application/json" },
                  body:    JSON.stringify({ email }),
                });
                form.reset();
              } catch {/* silent — server handles logging */}
            }}
          >
            <div className="flex border-b border-orisun-gold/40 py-2">
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="bg-transparent border-none outline-none text-orisun-ivory w-full placeholder:text-orisun-ivory/20 font-dm-sans"
              />
              <button type="submit" className="text-orisun-gold font-unbounded text-[10px] tracking-widest hover:text-orisun-ivory transition-colors">
                JOIN
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-12 border-t border-orisun-gold/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="text-orisun-ivory/40 text-[10px] font-unbounded tracking-widest uppercase">
            © {new Date().getFullYear()} Orisun Igbomina Broadcasting Network (OIBN). All rights reserved.
          </p>
          <p className="text-orisun-gold/60 text-[8px] font-unbounded tracking-[0.3em] uppercase">
            Engineered by <span className="text-orisun-gold font-bold">THE BIGBANG COMPANY</span>
          </p>
        </div>
        <div className="flex gap-8">
          <Link href="/privacy" className="text-orisun-ivory/40 text-[10px] font-unbounded tracking-widest hover:text-orisun-gold uppercase transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-orisun-ivory/40 text-[10px] font-unbounded tracking-widest hover:text-orisun-gold uppercase transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
