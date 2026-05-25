"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import AudioPlayer from "@/components/audio/AudioPlayer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ai/ChatWidget";
import NewsletterPopup from "@/components/engagement/NewsletterPopup";

export default function GlobalUIWrapper() {
  const pathname = usePathname();
  
  // Hide global UI on admin panel and login page
  if (pathname?.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return (
    <>
      <Navbar />
      <Footer />
      <AudioPlayer />
      <WhatsAppButton />
      <ChatWidget />
      <NewsletterPopup />
    </>
  );
}
