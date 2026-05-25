import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { securityLogger } from "@/lib/security-logger";

// ============================================================
// SECURITY: Sliding-window rate limiting (IP-based)
// ============================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;          // Max 5 contact form submissions per minute
const RATE_LIMIT_WINDOW = 60_000;  // 1-minute window

function getRealIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  record.count++;
  if (record.count > RATE_LIMIT_MAX) return true;

  return false;
}

// ============================================================
// INPUT VALIDATION SCHEMA
// ============================================================
const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(150, "Name is too long")
    .regex(/^[\p{L}\s\-'.]+$/u, "Name contains invalid characters"),
  email: z.string().email("Invalid email address").max(254),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(300, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(5_000, "Message is too long"),
});

// ============================================================
// ROUTE
// ============================================================
export async function POST(req: NextRequest) {
  try {
    // 0. Rate limit check
    const ip = getRealIP(req);
    if (isRateLimited(ip)) {
      securityLogger.log({
        sourceIp: ip,
        eventType: "RATE_LIMIT_EXCEEDED",
        severity: "WARNING",
        endpoint: "/api/contact",
      });
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    // 1. Parse body safely
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // 2. Validate input
    const result = schema.safeParse(body);

    if (!result.success) {
      securityLogger.log({
        sourceIp: ip,
        eventType: "VALIDATION_ERROR",
        severity: "INFO",
        endpoint: "/api/contact",
        metadata: { errors: result.error.flatten().fieldErrors },
      });
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    // TODO: Integrate with Resend, Sendgrid, or Mailchimp to actually send the email.
    // For now, we simulate a successful submission.
    console.log("Contact form submission received:", result.data);

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
