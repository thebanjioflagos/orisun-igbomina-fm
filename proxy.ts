import logger from "@/lib/logger";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// ─── Rate Limiting (in-memory, per-IP) ───────────────────────────────────────
// NOTE: For multi-instance production, swap ipMap for an Upstash/Redis store.
const RATE_LIMIT = 60;         // max requests per window
const WINDOW_MS  = 60 * 1000; // 1 minute window
const ipMap      = new Map<string, { count: number; start: number }>();

// ─── Routes requiring a valid JWT session (public API) ────────────────────────
const PROTECTED_ROUTES = ["/api/newsletter", "/api/dedication", "/api/contact"];

// ─── Routes that are exempt from rate limiting ────────────────────────────────
const RATE_LIMIT_EXEMPT = ["/api/auth"];

// ─── Admin RBAC: routes only accessible by ADMIN role ────────────────────────
const ADMIN_ONLY_PATHS = [
  "/admin/staff",
  "/admin/analytics",
  "/admin/newsletter",
  "/admin/settings",
  "/admin/bookings",
];

// ─── Admin RBAC: routes accessible by ADMIN or PRESENTER ─────────────────────
const PRESENTER_PATHS = [
  "/admin/schedule",
  "/admin/playlist",
  "/admin/dedications",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ── 1. Admin portal RBAC ────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req:    request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Not authenticated at all → go to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = String(token.role ?? "");

    // Admin-only pages
    if (ADMIN_ONLY_PATHS.some((p) => pathname.startsWith(p))) {
      if (role !== "admin") {
        logger.warn({ role, pathname }, "Forbidden admin-only access attempt");
        return NextResponse.redirect(new URL("/admin?error=forbidden", request.url));
      }
    }

    // Presenter + Admin pages
    if (PRESENTER_PATHS.some((p) => pathname.startsWith(p))) {
      if (!["admin", "presenter"].includes(role)) {
        logger.warn({ role, pathname }, "Forbidden presenter access attempt");
        return NextResponse.redirect(new URL("/admin?error=forbidden", request.url));
      }
    }

    return NextResponse.next();
  }

  // ── 2. Rate limiting for API routes ─────────────────────────────────────────
  const isExempt = RATE_LIMIT_EXEMPT.some((r) => pathname.startsWith(r));

  if (!isExempt) {
    const ip  = request.headers.get("x-forwarded-for")?.split(",")[0].trim()
                ?? "unknown";
    const now   = Date.now();
    const entry = ipMap.get(ip);

    if (!entry) {
      ipMap.set(ip, { count: 1, start: now });
    } else if (now - entry.start > WINDOW_MS) {
      entry.count = 1;
      entry.start = now;
    } else if (entry.count >= RATE_LIMIT) {
      logger.warn({ ip, pathname }, "Rate limit exceeded");
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    } else {
      entry.count += 1;
    }
  }

  // ── 3. Protect specific API routes with JWT check ───────────────────────────
  if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    const token = await getToken({
      req:    request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      logger.warn({ pathname }, "Unauthorized access attempt blocked");
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized. Please sign in." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/newsletter/:path*",
    "/api/dedication/:path*",
    "/api/contact/:path*"
  ],
};
