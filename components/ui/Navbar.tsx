"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Radio, Menu, X, Play } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "News", href: "/news" },
  { name: "Programs", href: "/programs" },
  { name: "TV", href: "/tv" },
  { name: "Shop", href: "/shop" },
  { name: "Culture", href: "/culture" },
  { name: "Inner Circle", href: "/club" },
  { name: "Advertise", href: "/advertise" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-orisun-deep/80 backdrop-blur-md py-3 border-b border-orisun-gold/20" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-sm bg-orisun-ivory/5 p-1 border border-orisun-gold/20 transition-transform group-hover:scale-105">
            <img src="/images/logo.jpg" alt="Orisun FM Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-fraunces text-xl font-bold leading-none text-orisun-ivory">ORISUN</span>
            <span className="font-unbounded text-[9px] tracking-[0.2em] text-orisun-gold uppercase">Igbomina 102.1 FM</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-dm-sans text-sm font-medium text-orisun-ivory/80 hover:text-orisun-gold transition-colors tracking-wide uppercase"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-orisun-crimson text-white font-unbounded text-xs font-bold rounded-sm animate-pulse-slow">
            <Play size={14} fill="currentColor" />
            LISTEN LIVE
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-orisun-ivory"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-orisun-deep z-40 flex flex-col items-center justify-center gap-8 p-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-3xl font-fraunces text-orisun-ivory hover:text-orisun-gold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="mt-8 w-full py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold">
            LISTEN LIVE
          </button>
          <div className="mt-auto pb-8 text-center">
            <p className="text-orisun-gold font-unbounded text-[8px] tracking-[0.4em] uppercase mb-2 opacity-60">Architected by</p>
            <h4 className="text-white font-unbounded text-md font-bold tracking-tighter uppercase">
              THE <span className="text-orisun-gold">BIGBANG</span> COMPANY
            </h4>
          </div>
        </div>
      )}
    </nav>
  );
}
