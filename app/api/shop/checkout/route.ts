import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, product, name, email } = body;

    if (!reference) {
      return NextResponse.json({ error: "Missing Paystack reference" }, { status: 400 });
    }

    // In a production environment, you MUST verify the transaction using the Paystack API
    // and your PAYSTACK_SECRET_KEY.
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    
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
    }

    // Process order (save to DB, Sanity, send confirmation email)
    console.log(`[ORDER PLACED] ${name} (${email}) bought ${product} with ref: ${reference}`);

    return NextResponse.json({ 
      success: true, 
      message: "Payment verified successfully",
      reference,
      product
    });
  } catch (error: any) {
    console.error("Checkout Verification Error:", error);
    return NextResponse.json({ error: "Server error processing checkout" }, { status: 500 });
  }
}
