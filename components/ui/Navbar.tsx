"use client";

import { useState, useEffect, useRef } from "react";
import AuthButton from "@/components/ui/AuthButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Play, Pause, Sun, Moon, Layers, Volume2, VolumeX } from "lucide-react";
import { useAudioStore } from "@/lib/audio-store";
import { useJingleStore } from "@/lib/jingle-engine";

const navLinks = [
  { name: "Home",         href: "/" },
  { name: "News",         href: "/news" },
  { name: "Programs",     href: "/programs" },
  { name: "TV",           href: "/tv" },
  { name: "Shop",         href: "/shop" },
  { name: "Dedicate",     href: "/dedication" },
  { name: "Culture",      href: "/culture" },
  { name: "Inner Circle", href: "/club" },
  { name: "Advertise",    href: "/advertise" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]             = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible]               = useState(true);
  const pathname = usePathname();

  const isImmersive    = useAudioStore((s) => s.isImmersive);
  const isComfortMode  = useAudioStore((s) => s.isComfortMode);
  const isLightTheme   = useAudioStore((s) => s.isLightTheme);
  const isPlaying      = useAudioStore((s) => s.isPlaying);
  const { togglePlay, toggleImmersive, toggleComfortMode, toggleLightTheme } = useAudioStore((s) => s.actions);

  const sfxEnabled = useJingleStore((s) => s.sfxEnabled);
  const toggleSfx = useJingleStore((s) => s.actions.toggleSfx);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const lastScrollY = useRef(0);

  // Scroll logic for shadow and hide-on-scroll-down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Shadow background trigger
      setIsScrolled(currentScrollY > 50);

      // Collapsible logic
      if (currentScrollY <= 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Spacer to prevent overlap with page content */}
      <div className="h-[90px] w-full" aria-hidden="true" />
      
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500 mx-auto w-[96%] max-w-7xl",
          isScrolled
            ? "top-4 bg-black/50 backdrop-blur-xl py-3 px-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl"
            : "top-4 bg-black/30 backdrop-blur-md py-4 px-6 border border-white/5 rounded-2xl",
          isVisible ? "translate-y-0" : "-translate-y-[150%]"
        )}
      >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-12 h-12 overflow-hidden rounded-sm bg-orisun-ivory/5 p-1 border border-orisun-gold/20 transition-transform group-hover:scale-105">
            <img src="/images/logo.jpg" alt="Orisun FM Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-fraunces text-xl font-bold leading-none text-orisun-ivory">ORISUN</span>
            <span className="font-unbounded text-[9px] tracking-[0.2em] text-orisun-gold uppercase">Igbomina 102.1 FM</span>
          </div>
        </Link>

        {/* ── Desktop Nav Links ─────────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-dm-sans text-sm font-medium transition-colors tracking-wide uppercase relative whitespace-nowrap",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orisun-gold rounded-sm",
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

        {/* ── Desktop Right: Listen Live + Auth ────────────────────── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* ── Display Controls: 3D + Comfort + Theme ──────────────── */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-orisun-gold/20 bg-orisun-gold/5">
            {/* 3D View toggle */}
            <button
              type="button"
              onClick={toggleImmersive}
              aria-label={isImmersive ? "Disable 3D view" : "Enable 3D view"}
              title={isImmersive ? "3D view ON" : "3D view OFF"}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-unbounded font-bold uppercase tracking-widest transition-all cursor-pointer",
                isImmersive
                  ? "bg-orisun-gold text-orisun-deep"
                  : "text-orisun-gold/50 hover:text-orisun-gold"
              )}
            >
              <Layers size={11} />
              3D
            </button>

            <div className="w-px h-4 bg-orisun-gold/20" />

            {/* SFX toggle */}
            <button
              type="button"
              onClick={toggleSfx}
              aria-label={sfxEnabled ? "Mute sound effects" : "Enable sound effects"}
              title={sfxEnabled ? "SFX ON" : "SFX OFF"}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-unbounded font-bold uppercase tracking-widest transition-all cursor-pointer",
                sfxEnabled
                  ? "bg-orisun-gold text-orisun-deep"
                  : "text-orisun-gold/50 hover:text-orisun-gold"
              )}
            >
              {sfxEnabled ? <Volume2 size={11} /> : <VolumeX size={11} />}
              SFX
            </button>

            <div className="w-px h-4 bg-orisun-gold/20" />

            {/* Comfort Mode toggle */}
            <button
              type="button"
              onClick={toggleComfortMode}
              aria-label={isComfortMode ? "Disable comfort mode" : "Enable comfort mode"}
              title={isComfortMode ? "Comfort mode ON" : "Comfort mode OFF"}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-unbounded font-bold uppercase tracking-widest transition-all cursor-pointer",
                isComfortMode
                  ? "bg-orisun-gold text-orisun-deep"
                  : "text-orisun-gold/50 hover:text-orisun-gold"
              )}
            >
              <Sun size={11} />
              Ease
            </button>

            <div className="w-px h-4 bg-orisun-gold/20" />

            {/* Light Theme toggle */}
            <button
              type="button"
              onClick={toggleLightTheme}
              aria-label={isLightTheme ? "Switch to dark theme" : "Switch to light theme"}
              title={isLightTheme ? "Light theme ON" : "Dark theme ON"}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-unbounded font-bold uppercase tracking-widest transition-all cursor-pointer",
                isLightTheme
                  ? "bg-orisun-gold text-orisun-deep"
                  : "text-orisun-gold/50 hover:text-orisun-gold"
              )}
            >
              {isLightTheme ? <Moon size={11} /> : <Sun size={11} />}
              {isLightTheme ? "DARK" : "LIGHT"}
            </button>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause live stream" : "Listen live"}
            className={cn(
              "flex items-center gap-2 px-4 py-2 font-unbounded text-xs font-bold rounded-sm transition-all cursor-pointer",
              isPlaying
                ? "bg-orisun-gold text-orisun-deep"
                : "bg-orisun-gold/10 border border-orisun-gold text-orisun-gold hover:bg-orisun-gold hover:text-orisun-deep"
            )}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orisun-crimson opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orisun-crimson" />
            </span>
            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            {isPlaying ? "ON AIR" : "LISTEN LIVE"}
          </button>

          {/* Admin Auth Button */}
          <AuthButton />
        </div>

        {/* ── Mobile: Listen Live + Hamburger ──────────────────────── */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause live stream" : "Listen live"}
            className="flex items-center gap-1 px-3 py-1.5 font-unbounded text-[10px] font-bold rounded-sm border border-orisun-gold text-orisun-gold"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orisun-crimson opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orisun-crimson" />
            </span>
            {isPlaying ? "ON AIR" : "LIVE"}
          </button>

          <button
            type="button"
            className="text-orisun-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orisun-gold rounded-sm p-1"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Overlay ───────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-[68px] bg-orisun-deep z-40 flex flex-col items-center justify-center gap-6 p-8 lg:hidden"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-2xl font-fraunces transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orisun-gold rounded-sm",
                  isActive ? "text-orisun-gold" : "text-orisun-ivory hover:text-orisun-gold"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile Display Controls ─ 3D + Comfort Mode + Theme */}
          <div className="w-full max-w-[280px] flex flex-col gap-2">
            {/* 3D View */}
            <div className="flex items-center justify-between px-4 py-2.5 border border-orisun-gold/20 bg-orisun-gold/5 rounded-sm">
              <div className="flex items-center gap-2">
                <Layers size={13} className="text-orisun-gold" />
                <span className="text-[10px] font-unbounded text-orisun-gold uppercase tracking-widest font-bold">
                  Immersive 3D
                </span>
              </div>
              <button
                type="button"
                onClick={toggleImmersive}
                aria-label={isImmersive ? "Disable 3D" : "Enable 3D"}
                className={cn(
                  "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orisun-gold",
                  isImmersive ? "bg-orisun-gold" : "bg-white/10"
                )}
              >
                <span className={cn(
                  "inline-block h-3 w-3 transform rounded-full bg-orisun-deep transition-transform duration-300",
                  isImmersive ? "translate-x-5" : "translate-x-1"
                )} />
              </button>
            </div>

            {/* Mobile SFX Toggle */}
            <div className="flex items-center justify-between px-4 py-2.5 border border-orisun-gold/20 bg-orisun-gold/5 rounded-sm">
              <div className="flex items-center gap-2">
                {sfxEnabled ? <Volume2 size={13} className="text-orisun-gold" /> : <VolumeX size={13} className="text-orisun-gold" />}
                <span className="text-[10px] font-unbounded text-orisun-gold uppercase tracking-widest font-bold">
                  Sound Effects
                </span>
              </div>
              <button
                type="button"
                onClick={toggleSfx}
                aria-label={sfxEnabled ? "Disable SFX" : "Enable SFX"}
                className={cn(
                  "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orisun-gold",
                  sfxEnabled ? "bg-orisun-gold" : "bg-white/10"
                )}
              >
                <span className={cn(
                  "inline-block h-3 w-3 transform rounded-full bg-orisun-deep transition-transform duration-300",
                  sfxEnabled ? "translate-x-5" : "translate-x-1"
                )} />
              </button>
            </div>

            {/* Comfort Mode */}
            <div className="flex items-center justify-between px-4 py-2.5 border border-orisun-gold/20 bg-orisun-gold/5 rounded-sm">
              <div className="flex items-center gap-2">
                <Sun size={13} className="text-orisun-gold" />
                <span className="text-[10px] font-unbounded text-orisun-gold uppercase tracking-widest font-bold">
                  Comfort Mode
                </span>
              </div>
              <button
                type="button"
                onClick={toggleComfortMode}
                aria-label={isComfortMode ? "Disable comfort mode" : "Enable comfort mode"}
                className={cn(
                  "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orisun-gold",
                  isComfortMode ? "bg-orisun-gold" : "bg-white/10"
                )}
              >
                <span className={cn(
                  "inline-block h-3 w-3 transform rounded-full bg-orisun-deep transition-transform duration-300",
                  isComfortMode ? "translate-x-5" : "translate-x-1"
                )} />
              </button>
            </div>

            {/* Light Theme */}
            <div className="flex items-center justify-between px-4 py-2.5 border border-orisun-gold/20 bg-orisun-gold/5 rounded-sm">
              <div className="flex items-center gap-2">
                {isLightTheme ? <Moon size={13} className="text-orisun-gold" /> : <Sun size={13} className="text-orisun-gold" />}
                <span className="text-[10px] font-unbounded text-orisun-gold uppercase tracking-widest font-bold">
                  Light Theme
                </span>
              </div>
              <button
                type="button"
                onClick={toggleLightTheme}
                aria-label={isLightTheme ? "Disable Light Theme" : "Enable Light Theme"}
                className={cn(
                  "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orisun-gold",
                  isLightTheme ? "bg-orisun-gold" : "bg-white/10"
                )}
              >
                <span className={cn(
                  "inline-block h-3 w-3 transform rounded-full bg-orisun-deep transition-transform duration-300",
                  isLightTheme ? "translate-x-5" : "translate-x-1"
                )} />
              </button>
            </div>
          </div>

          {/* Mobile Auth Button */}
          <div className="mt-2">
            <AuthButton />
          </div>

          {/* Mobile Listen Live (full-width) */}
          <button
            type="button"
            onClick={() => { togglePlay(); setIsMobileMenuOpen(false); }}
            aria-label={isPlaying ? "Pause live stream" : "Listen live"}
            className="w-full py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold flex items-center justify-center gap-3 rounded-sm"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orisun-crimson opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orisun-crimson" />
            </span>
            {isPlaying ? "PAUSE STREAM" : "LISTEN LIVE"}
          </button>
        </div>
      )}
    </nav>
    </>
  );
}
