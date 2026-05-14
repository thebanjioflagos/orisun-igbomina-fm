import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.paystack.co https://api.paystack.co https://www.youtube.com https://s.ytimg.com https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https: https://i.ytimg.com;
  media-src 'self' blob: https: https://icecast.radiofrance.fr;
  connect-src 'self' https://api.anthropic.com https://api.paystack.co https://checkout.paystack.com https://icecast.radiofrance.fr https://vitals.vercel-insights.com;
  frame-src https://checkout.paystack.com https://www.youtube.com https://www.facebook.com https://web.facebook.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  // Prevent clickjacking attacks
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent MIME type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Control referrer information
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Force HTTPS for 2 years
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Block access to browser features
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(self), geolocation=(), payment=(self https://checkout.paystack.com)',
  },
  // Content Security Policy
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  // Remove server fingerprinting
  { key: 'X-Powered-By', value: '' },
  // XSS protection for older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders.filter(h => h.value !== ''),
      },
    ];
  },

  // Only allow images from trusted external domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },

  // Disable server-side source maps in production to prevent code exposure
  productionBrowserSourceMaps: false,

  // Ensure TypeScript errors fail the build
  typescript: { ignoreBuildErrors: false },

  // Turbopack workspace root fix
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
