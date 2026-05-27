import type { NextConfig } from "next";

// ─── Content Security Policy ──────────────────────────────────────────────────
// All sources explicitly whitelisted. No wildcards.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline'
    https://js.paystack.co
    https://www.youtube.com
    https://s.ytimg.com
    https://www.googletagmanager.com;
  script-src-elem 'self' 'unsafe-inline'
    https://js.paystack.co
    https://www.googletagmanager.com
    https://s.ytimg.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https: https://i.ytimg.com;
  media-src 'self' blob: https: data:;
  connect-src 'self'
    https://api.anthropic.com
    https://api.paystack.co
    https://checkout.paystack.com
    https://vitals.vercel-insights.com
    https://www.googletagmanager.com
    https://raw.githack.com
    https://cdn.jsdelivr.net;
  frame-src
    https://checkout.paystack.com
    https://www.youtube.com
    https://www.facebook.com
    https://web.facebook.com;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
  report-uri /api/csp-report;
`.replace(/\n\s+/g, " ").trim();

// ─── Security Headers ─────────────────────────────────────────────────────────
const securityHeaders = [
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer control
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // HSTS — 2 years, include subdomains, preload
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Feature / Permissions policy — only what the site needs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(self), geolocation=(), payment=(self https://checkout.paystack.com)",
  },
  // XSS protection for legacy browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Prevent browser from guessing cross-origin isolation
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // CSP — active enforcement
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        // Filter out any header whose value is empty (e.g. no-op headers)
        headers: securityHeaders.filter((h) => h.value !== ""),
      },
    ];
  },

  // Trusted image domains
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },

  // Production base URL for metadata (OG / Twitter images)
  // Falls back to localhost for local dev — set NEXT_PUBLIC_SITE_URL in Vercel
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://orisun-igbomina-fm.vercel.app",
  },

  // Never expose source maps in production
  productionBrowserSourceMaps: false,

  // TypeScript errors must fail the build
  typescript: { ignoreBuildErrors: false },

  // Turbopack workspace root
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
