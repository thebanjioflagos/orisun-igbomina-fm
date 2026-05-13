import type { Metadata } from "next";
import { Fraunces, Unbounded, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const fraunces     = Fraunces({ subsets: ["latin"], variable: "--font-fraunces",      display: "swap" });
const unbounded    = Unbounded({ subsets: ["latin"], variable: "--font-unbounded",     display: "swap" });
const dmSans       = DM_Sans({ subsets: ["latin"],  variable: "--font-dm-sans",       display: "swap" });
const jetbrainsMono= JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  title:       "Orisun Igbomina FM 102.1 — Ila-Orangun, Osun State",
  description: "Sharing Stories, Celebrating Culture, Empowering Communities. The authoritative voice of the Igbomina people.",
  keywords:    "Orisun Igbomina FM, 102.1 FM Ila-Orangun, Igbomina radio, Osun State news, Igbomina culture, Yoruba radio Nigeria",
  manifest:    "/manifest.json",
  authors:     [{ name: "Orisun Igbomina Broadcasting Network" }],
  openGraph: {
    title:       "Orisun Igbomina FM 102.1 — The Heart of Igbominaland",
    description: "Broadcasting culture and excellence from Ila-Orangun to the world.",
    url:         "https://orisunigbominafm.com",
    siteName:    "Orisun Igbomina FM",
    images: [
      { url: "/images/banner.jpg", width: 1200, height: 630, alt: "Orisun Igbomina FM Studio" },
    ],
    locale: "en_NG",
    type:   "website",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Orisun Igbomina FM 102.1",
    description: "The authoritative voice of the Igbomina people.",
    images:      ["/images/banner.jpg"],
  },
  icons: { apple: "/images/logo.jpg" },
};

// JSON-LD — RadioStation structured data for Google search rich results
const jsonLd = {
  "@context":    "https://schema.org",
  "@type":       "RadioStation",
  name:          "Orisun Igbomina FM",
  alternateName: "OIBN 102.1 FM",
  url:           "https://orisunigbominafm.com",
  logo:          "https://orisunigbominafm.com/images/logo.jpg",
  image:         "https://orisunigbominafm.com/images/banner.jpg",
  description:   "The authoritative voice of the Igbomina people. Broadcasting culture and excellence from Ila-Orangun, Osun State.",
  broadcastFrequency: {
    "@type":              "BroadcastFrequencySpecification",
    broadcastFrequencyValue: "102.1",
    broadcastSignalModulation: "FM",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name:    "Ila-Orangun, Osun State, Nigeria",
  },
  contactPoint: {
    "@type":       "ContactPoint",
    contactType:   "customer service",
    email:         "info@orisunigbominafm.com",
    areaServed:    "NG",
    availableLanguage: ["English", "Yoruba"],
  },
  sameAs: [
    "https://www.facebook.com/OrisunIgbominaFm/",
    "https://www.youtube.com/@OrisunIgbomina",
  ],
};

import Navbar          from "@/components/ui/Navbar";
import AudioPlayer     from "@/components/audio/AudioPlayer";
import AudioEngine     from "@/components/audio/AudioEngine";
import Footer          from "@/components/ui/Footer";
import ChatWidget      from "@/components/ai/ChatWidget";
import NewsletterPopup from "@/components/engagement/NewsletterPopup";
import PageTransition  from "@/components/ui/PageTransition";
import ErrorBoundary   from "@/components/ui/ErrorBoundary";
import WhatsAppButton  from "@/components/ui/WhatsAppButton";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG">
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
          <WhatsAppButton />
          <ChatWidget />
          <NewsletterPopup />
        </ErrorBoundary>

        {/* Vercel Analytics — lightweight, no cookie banner needed */}
        <Script
          src="https://va.vercel-scripts.com/v1/analytics.js"
          strategy="afterInteractive"
          data-endpoint="/api/_vercel/analytics"
        />
      </body>
    </html>
  );
}
