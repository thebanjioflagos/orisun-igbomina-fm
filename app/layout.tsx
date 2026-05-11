import type { Metadata } from "next";
import { Fraunces, Unbounded, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orisun Igbomina FM 102.1 — Ila-Orangun, Osun State",
  description: "Sharing Stories, Celebrating Culture, Empowering Communities. The authoritative voice of the Igbomina people.",
  keywords: "Orisun Igbomina FM, 102.1 FM Ila-Orangun, Igbomina radio, Osun State news, Igbomina culture, Yoruba radio Nigeria",
  manifest: "/manifest.json",
  authors: [{ name: "Orisun Igbomina Broadcasting Network" }],
  openGraph: {
    title: "Orisun Igbomina FM 102.1 — The Heart of Igbominaland",
    description: "Broadcasting culture and excellence from Ila-Orangun to the world.",
    url: "https://orisunigbominafm.com",
    siteName: "Orisun Igbomina FM",
    images: [
      {
        url: "/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Orisun Igbomina FM Studio",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orisun Igbomina FM 102.1",
    description: "The authoritative voice of the Igbomina people.",
    images: ["/images/banner.jpg"],
  },
  icons: {
    apple: "/images/logo.jpg",
  },
};

import Navbar from "@/components/ui/Navbar";
import AudioPlayer from "@/components/audio/AudioPlayer";
import AudioEngine from "@/components/audio/AudioEngine";
import Footer from "@/components/ui/Footer";
import ChatWidget from "@/components/ai/ChatWidget";
import NewsletterPopup from "@/components/engagement/NewsletterPopup";
import PageTransition from "@/components/ui/PageTransition";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${unbounded.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <AudioEngine />
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
          <AudioPlayer />
          <ChatWidget />
          <NewsletterPopup />
        </ErrorBoundary>
      </body>
    </html>
  );
}


