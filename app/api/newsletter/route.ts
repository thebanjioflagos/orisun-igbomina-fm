import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email:  z.string().email(),
  source: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = schema.parse(body);

    // ─────────────────────────────────────────────────────────────────
    // TODO: Connect your preferred email provider here.
    //
    // Option A — Mailchimp:
    //   POST to https://us1.api.mailchimp.com/3.0/lists/{LIST_ID}/members
    //   with Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`
    //
    // Option B — Brevo (formerly Sendinblue):
    //   POST to https://api.brevo.com/v3/contacts
    //   with api-key: process.env.BREVO_API_KEY
    //
    // Option C — Simple email notification via Resend.com:
    //   import { Resend } from "resend";
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({ from: "...", to: "...", subject: "...", html: "..." });
    // ─────────────────────────────────────────────────────────────────

    // For now: log to server so no subscriber is silently lost
    console.log(`[Newsletter] New subscriber: ${email} — source: ${source ?? "footer"}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
