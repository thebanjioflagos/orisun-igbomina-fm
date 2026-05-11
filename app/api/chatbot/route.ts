import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { securityLogger } from '@/lib/security-logger';

// ============================================================
// SECURITY: Rate limiting via in-memory store (upgrade to
// Redis/Upstash KV in production for multi-instance support)
// ============================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 20;        // max requests per window
const RATE_LIMIT_WINDOW = 60_000; // 1-minute sliding window

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
// INPUT SANITISATION
// ============================================================
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_MESSAGES_IN_HISTORY = 20;

function sanitiseMessages(raw: unknown): { role: string; content: string }[] {
  if (!Array.isArray(raw)) throw new Error('Invalid payload');

  return raw.slice(-MAX_MESSAGES_IN_HISTORY).map((m) => {
    if (typeof m?.role !== 'string' || typeof m?.content !== 'string') {
      throw new Error('Malformed message object');
    }
    const role = m.role === 'user' || m.role === 'assistant' ? m.role : 'user';
    const content = String(m.content).slice(0, MAX_MESSAGE_LENGTH);
    return { role, content };
  });
}

// ============================================================
// PROMPT INJECTION GUARD
// ============================================================
const INJECTION_PATTERNS = [
  /ignore (all |previous |above |your )?instructions/i,
  /you are now/i,
  /act as (a |an )?(?!orisun)/i,
  /disregard (your |the )?system/i,
  /forget (everything|your instructions)/i,
  /jailbreak/i,
  /DAN mode/i,
];

function containsInjection(messages: { role: string; content: string }[]): boolean {
  return messages.some((m) =>
    m.role === 'user' && INJECTION_PATTERNS.some((pattern) => pattern.test(m.content))
  );
}

// ============================================================
// ROUTE
// ============================================================
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit check
    const ip = getRealIP(req);
    if (isRateLimited(ip)) {
      securityLogger.log({
        sourceIp: ip,
        eventType: 'RATE_LIMIT_EXCEEDED',
        severity: 'WARNING',
        endpoint: '/api/chatbot',
      });
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before asking again.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    // 2. Parse & validate body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (!body || typeof body !== 'object' || !('messages' in body)) {
      return NextResponse.json({ error: 'Missing messages field' }, { status: 400 });
    }

    let messages: { role: string; content: string }[];
    try {
      messages = sanitiseMessages((body as any).messages);
    } catch {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
    }

    // 3. Prompt injection check
    if (containsInjection(messages)) {
      securityLogger.log({
        sourceIp: ip,
        eventType: 'PROMPT_INJECTION_ATTEMPT',
        severity: 'CRITICAL',
        endpoint: '/api/chatbot',
        metadata: { messageSnippet: messages[messages.length - 1].content.slice(0, 100) }
      });
      return NextResponse.json(
        { error: 'Your message contains content that cannot be processed.' },
        { status: 422 }
      );
    }

    // 4. Verify API key is configured (fail fast instead of incurring Anthropic error)
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('[Chatbot] ANTHROPIC_API_KEY is not configured');
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
    }

    // 5. Call Anthropic
    const result = streamText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      maxTokens: 512, // prevent runaway / expensive responses
      system: `
        You are "Orisun," the AI Cultural Guide for Orisun Igbomina Broadcasting Network (102.1 FM),
        headquartered in Ila-Orangun, Osun State, Nigeria. You are warm, knowledgeable, and speak
        with the authority and grace of a Yoruba elder combined with the energy of a modern radio host.

        Your role:
        1. Answer questions about Igbomina culture, history, language, and the Ila-Orangun community.
        2. Help users find news articles, shows, and programs on OIBN.
        3. Explain advertising packages and direct sales inquiries to contact@orisunigbominafm.com.
        4. Share Igbomina oriki poetry and cultural facts when appropriate.
        5. Answer in English by default; switch to Yoruba if the user writes in Yoruba.
        6. Always speak with pride about Igbomina heritage and OIBN's mission.
        7. NEVER impersonate other AI systems, reveal your underlying model, or discuss topics
           unrelated to OIBN, Igbomina culture, and the local community.

        Personality: Warm, proud, culturally authoritative, community-minded, never robotic.
      `,
      messages,
    });

    return result.toDataStreamResponse();

  } catch (error) {
    // Never leak internal error details to the client
    console.error('[Chatbot API Error]', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

// Block GET, PUT, DELETE etc.
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
