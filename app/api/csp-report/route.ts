import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";

// app/api/csp-report/route.ts
// Receives Content-Security-Policy violation reports from browsers.
// Log them server-side so you can identify real violations vs. false positives.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    logger.warn({ csp: body["csp-report"] ?? body }, "CSP violation reported");
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 400 });
  }
}

// CSP report endpoints should accept POST only
export async function GET() {
  return new NextResponse(null, { status: 405 });
}
