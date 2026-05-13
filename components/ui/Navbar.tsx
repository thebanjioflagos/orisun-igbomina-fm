"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Play, Pause } from "lucide-react";
import { useAudioStore } from "@/lib/audio-store";

const navLinks = [
  { name: "Home",         href: "/" },
  { name: "News",         href: "/news" },
  { name: "Programs",     href: "/programs" },
  { name: "TV",           href: "/tv" },
  { name: "Shop",         href: "/shop" },
  { name: "Culture",      href: "/culture" },
  { name: "Inner Circle", href: "/club" },
  { name: "Advertise",    href: "/advertise" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isPlaying  = useAudioStore((s) => s.isPlaying);
  const { togglePlay } = useAudioStore((s) => s.actions);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
        isScrolled
          ? "bg-orisun-deep/90 backdrop-blur-md py-3 border-b border-orisun-gold/20"
          : "bg-transparent"
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
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-dm-sans text-sm font-medium transition-colors tracking-wide uppercase relative",
                  isActive
                    ? "text-orisun-gold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-orisun-gold"
                    : "text-orisun-ivory/80 hover:text-orisun-gold"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Listen Live CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={togglePlay}
            className={cn(
              "flex items-center gap-2 px-4 py-2 font-unbounded text-xs font-bold rounded-sm transition-all",
              isPlaying
                ? "bg-orisun-gold text-orisun-deep"
                : "bg-orisun-gold/10 border border-orisun-gold text-orisun-gold hover:bg-orisun-gold hover:text-orisun-deep"
            )}
          >
            {/* Live pulse indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orisun-crimson opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orisun-crimson" />
            </span>
            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            {isPlaying ? "ON AIR" : "LISTEN LIVE"}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-orisun-ivory"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-orisun-deep z-40 flex flex-col items-center justify-center gap-8 p-6 md:hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-3xl font-fraunces transition-colors",
                  isActive ? "text-orisun-gold" : "text-orisun-ivory hover:text-orisun-gold"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile Listen Live */}
          <button
            onClick={() => { togglePlay(); setIsMobileMenuOpen(false); }}
            className="mt-4 w-full py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold flex items-center justify-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orisun-crimson opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orisun-crimson" />
            </span>
            {isPlaying ? "PAUSE STREAM" : "LISTEN LIVE"}
          </button>
        </div>
      )}
    </nav>
  );
}
