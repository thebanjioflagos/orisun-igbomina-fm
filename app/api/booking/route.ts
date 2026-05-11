import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { securityLogger } from '@/lib/security-logger';

// ============================================================
// SECURITY: Rate limiting via in-memory store
// ============================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;         // Max 5 bookings attempts per minute
const RATE_LIMIT_WINDOW = 60_000; // 1-minute window

function getRealIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
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
// VALIDATION SCHEMA
// ============================================================
const BookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .regex(/^[\p{L}\s\-'.]+$/u, 'Name contains invalid characters'),
  email: z.string().email('Invalid email address').max(254),
  businessName: z
    .string()
    .min(2, 'Business name must be at least 2 characters')
    .max(200, 'Business name too long'),
  packageId: z.enum(['bronze', 'silver', 'gold'], {
    errorMap: () => ({ message: 'Invalid package selected' }),
  }),
  paystackReference: z.string().min(1, 'Payment reference is required'),
});

const VALID_PACKAGES = {
  bronze: 50_000,
  silver: 150_000,
  gold:   500_000,
} as const;

// ============================================================
// PAYSTACK VERIFICATION
// ============================================================
async function verifyPaystackPayment(reference: string, expectedAmountKobo: number) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) throw new Error('Paystack secret key not configured');

  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    // Enforce timeout to prevent hanging
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new Error(`Paystack verification request failed: ${res.status}`);
  }

  const data = await res.json();

  if (!data.status || data.data?.status !== 'success') {
    throw new Error('Payment not successful');
  }

  // CRITICAL: Verify amount server-side to prevent price tampering
  if (data.data.amount !== expectedAmountKobo) {
    throw new Error(`Amount mismatch: expected ${expectedAmountKobo}, got ${data.data.amount}`);
  }

  return data.data;
}

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
        eventType: 'RATE_LIMIT_EXCEEDED',
        severity: 'WARNING',
        endpoint: '/api/booking',
      });
      return NextResponse.json(
        { error: 'Too many booking attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // 1. Validate input
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { name, email, businessName, packageId, paystackReference } = parsed.data;
    const expectedAmountKobo = VALID_PACKAGES[packageId] * 100;

    // 2. Verify payment with Paystack (server-side — cannot be spoofed by client)
    let paymentData: any;
    try {
      paymentData = await verifyPaystackPayment(paystackReference, expectedAmountKobo);
    } catch (err: any) {
      securityLogger.log({
        sourceIp: ip,
        eventType: 'PAYMENT_VERIFICATION_FAILURE',
        severity: 'CRITICAL',
        endpoint: '/api/booking',
        metadata: { 
          reference: paystackReference, 
          packageId, 
          error: err.message 
        }
      });
      console.error('[Booking] Paystack verification failed:', err.message);
      return NextResponse.json(
        { error: 'Payment verification failed. Please contact support.' },
        { status: 402 }
      );
    }

    // 3. TODO: Persist booking to database (e.g., Supabase, MongoDB) here
    // db.bookings.create({ name, email, businessName, packageId, paystackRef: paystackReference })

    // 4. TODO: Send confirmation email via Resend/Nodemailer here

    console.info('[Booking] New booking confirmed:', {
      packageId,
      email: email.replace(/(?<=.{2}).(?=.*@)/g, '*'), // partially masked for log safety
      reference: paystackReference,
    });

    return NextResponse.json({ success: true, message: 'Booking confirmed' }, { status: 201 });

  } catch (error) {
    console.error('[Booking API Error]', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
