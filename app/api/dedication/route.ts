import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, senderName, email, type, recipientName, message, songRequest } = body;

    if (!reference) {
      return NextResponse.json({ error: "Missing Paystack reference" }, { status: 400 });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    
    // Verify the transaction with Paystack if a real key is present
    if (secretKey && !secretKey.includes('placeholder')) {
      const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${secretKey}`
        }
      });
      const verifyData = await verifyResponse.json();
      
      if (!verifyData.status || verifyData.data.status !== "success") {
         return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
      }

      // Optional: Check if amount paid is exactly 100000 kobo (₦1,000)
      if (verifyData.data.amount < 100000) {
         return NextResponse.json({ error: "Insufficient amount paid" }, { status: 400 });
      }
    }

    // TODO: Save this dedication to Sanity CMS or your database
    // For now, we log it to simulate the OAP receiving it in the studio
    console.log(`
      [NEW DEDICATION RECEIVED]
      Type: ${type}
      From: ${senderName} (${email})
      To: ${recipientName || "General"}
      Song Request: ${songRequest || "None"}
      Message: ${message}
      Ref: ${reference}
    `);

    return NextResponse.json({ 
      success: true, 
      message: "Dedication saved successfully"
    });
  } catch (error: any) {
    console.error("Dedication Verification Error:", error);
    return NextResponse.json({ error: "Server error processing dedication" }, { status: 500 });
  }
}
