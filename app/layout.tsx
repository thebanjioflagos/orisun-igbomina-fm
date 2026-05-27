import type { Metadata } from "next";
import { Fraunces, Unbounded, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces     = Fraunces({ subsets: ["latin"], variable: "--font-fraunces",      display: "swap" });
const unbounded    = Unbounded({ subsets: ["latin"], variable: "--font-unbounded",     display: "swap" });
const dmSans       = DM_Sans({ subsets: ["latin"],  variable: "--font-dm-sans",       display: "swap" });
const jetbrainsMono= JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://orisun-igbomina-fm.vercel.app"),
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

import AudioEngine          from "@/components/audio/AudioEngine";
import JingleProvider       from "@/components/audio/JingleProvider";
import GlobalUIWrapper      from "@/components/ui/GlobalUIWrapper";
import PageTransition       from "@/components/ui/PageTransition";
import ErrorBoundary        from "@/components/ui/ErrorBoundary";
import WhatsAppButton       from "@/components/ui/WhatsAppButton";
import ComfortModeProvider  from "@/components/ui/ComfortModeProvider";
import HolidayThemeEngine   from "@/components/ui/HolidayThemeEngine";
import { GoogleTagManager } from '@next/third-parties/google';

import AuthProvider from "@/app/providers/AuthProvider";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';
  return (
    <html lang="en-NG">
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <GoogleTagManager gtmId={gtmId} />
      <body
        className={`${fraunces.variable} ${unbounded.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <AuthProvider>
          <ErrorBoundary>
            <HolidayThemeEngine />
            <ComfortModeProvider />
            <AudioEngine />
            <JingleProvider />
            <PageTransition>
              {children}
            </PageTransition>
            <GlobalUIWrapper />
          </ErrorBoundary>
        </AuthProvider>
      </body>
    </html>
  );
}
