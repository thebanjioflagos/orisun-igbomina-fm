import Pusher from 'pusher';
import { NextRequest, NextResponse } from "next/server";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "placeholder",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "placeholder",
  secret: process.env.PUSHER_SECRET || "placeholder",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1",
  useTLS: true,
});

export async function POST(req: NextRequest) {
  try {
    const { message, user } = await req.json();
    
    // Check if the keys are actually provided
    if (process.env.PUSHER_APP_ID && !process.env.PUSHER_APP_ID.includes('placeholder')) {
       await pusher.trigger('live-radio-chat', 'new-message', {
         id: Date.now().toString(),
         message,
         user,
         timestamp: new Date().toISOString()
       });
    } else {
       console.log("Pusher keys missing. Simulating broadcast:", { user, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Pusher error", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
