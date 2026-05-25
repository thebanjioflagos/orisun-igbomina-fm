"use client";

import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { ArrowRight } from "lucide-react";

interface Product {
  name: string;
  price: string;
}

interface PaystackResponse {
  reference: string;
}

export default function ProductCheckout({ product }: { product: Product }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Convert string price (e.g., "₦45,000") to kobo
  const amountStr = product.price.replace(/[^0-9]/g, "");
  const amount = parseInt(amountStr, 10) * 100;

  const config = {
    reference: (new Date()).getTime().toString(),
    email: email || "customer@orisunigbominafm.com",
    amount: amount,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
  };

  // Type assertion since react-paystack types can sometimes conflict with Next.js 15
  const initializePayment = usePaystackPayment(config as Parameters<typeof usePaystackPayment>[0]);

  const onSuccess = (reference: PaystackResponse) => {
    // In a real app, you would send this reference to your backend to verify
    fetch("/api/shop/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference: reference.reference, product: product.name, name, email })
    }).then(res => res.json()).then(() => {
      alert(`Payment successful! Receipt: ${reference.reference}`);
      setShowForm(false);
    });
  };

  const onClose = () => {
    console.log("Paystack dialog closed");
  };

  if (!showForm) {
    return (
      <button 
        onClick={() => setShowForm(true)}
        className="w-full py-4 border border-orisun-gold/40 text-orisun-gold font-unbounded text-[10px] font-bold tracking-widest hover:bg-orisun-gold hover:text-orisun-deep transition-all flex items-center justify-center gap-2"
      >
        BUY NOW <ArrowRight size={14} />
      </button>
    );
  }

  return (
    <div className="w-full p-4 border border-orisun-gold/20 bg-orisun-deep/80 backdrop-blur-md space-y-4">
      <input 
        type="text" 
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full bg-transparent border-b border-orisun-gold/20 text-orisun-ivory px-2 py-2 text-sm focus:outline-none focus:border-orisun-gold"
      />
      <input 
        type="email" 
        placeholder="Email Address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full bg-transparent border-b border-orisun-gold/20 text-orisun-ivory px-2 py-2 text-sm focus:outline-none focus:border-orisun-gold"
      />
      <div className="flex gap-2">
        <button 
          onClick={() => setShowForm(false)}
          className="flex-1 py-3 border border-orisun-gold/40 text-orisun-gold font-unbounded text-[10px] font-bold tracking-widest"
        >
          CANCEL
        </button>
        <button 
          onClick={() => {
            if(!email || !name) {
              alert("Please enter name and email to proceed");
              return;
            }
            if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.includes('placeholder')) {
               alert("NOTE: Paystack Public Key is missing in .env.local. Payment will fail in production.");
            }
            initializePayment({ onSuccess, onClose });
          }}
          className="flex-1 py-3 bg-orisun-gold text-orisun-deep font-unbounded text-[10px] font-bold tracking-widest"
        >
          PAY {product.price}
        </button>
      </div>
    </div>
  );
}
