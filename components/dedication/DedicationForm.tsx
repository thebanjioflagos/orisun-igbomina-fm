"use client";

import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { Heart, Music, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PaystackResponse {
  reference: string;
}

export default function DedicationForm() {
  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    recipientName: "",
    message: "",
    songRequest: "",
    type: "General Shoutout"
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const amount = 1000 * 100; // ₦1,000 in kobo

  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email || "listener@orisunigbominafm.com",
    amount: amount,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
  };

  const initializePayment = usePaystackPayment(config as Parameters<typeof usePaystackPayment>[0]);

  const onSuccess = async (reference: PaystackResponse) => {
    setLoading(true);
    try {
      const res = await fetch("/api/dedication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: reference.reference, ...formData })
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Payment verified, but failed to save dedication. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred saving your dedication.");
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    console.log("Paystack dialog closed");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.email || !formData.message) {
      alert("Please fill out the required fields.");
      return;
    }
    initializePayment({ onSuccess, onClose });
  };

  return (
    <main className="min-h-screen bg-orisun-deep pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10 space-y-12">
        <header className="text-center space-y-4">
           <Heart className="text-orisun-gold mx-auto" size={48} />
           <h1 className="text-5xl md:text-7xl font-fraunces text-orisun-ivory italic">Send a Shoutout</h1>
           <p className="text-orisun-ivory/60 font-dm-sans text-lg">
             Celebrate your loved ones live on air! Just ₦1,000 to get your dedication read by our OAPs.
           </p>
        </header>

        {success ? (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} 
             animate={{ opacity: 1, scale: 1 }} 
             className="bg-orisun-gold/10 border border-orisun-gold p-8 text-center space-y-6"
           >
             <CheckCircle className="text-orisun-gold mx-auto" size={64} />
             <h2 className="text-3xl font-fraunces text-orisun-ivory">Dedication Sent!</h2>
             <p className="text-orisun-ivory/70 font-dm-sans">
               Your payment was successful and your dedication has been queued for the next available show. Keep listening to 102.1 FM!
             </p>
             <button 
               onClick={() => {
                 setSuccess(false);
                 setFormData({ senderName: "", email: "", recipientName: "", message: "", songRequest: "", type: "General Shoutout" });
               }}
               className="px-8 py-3 bg-orisun-gold text-orisun-deep font-unbounded text-sm font-bold mt-4"
             >
               Send Another
             </button>
           </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-orisun-deep/80 backdrop-blur-md border border-orisun-gold/20 p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase">Your Name *</label>
                <input 
                  required
                  type="text" 
                  value={formData.senderName}
                  onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                  className="w-full bg-transparent border-b border-orisun-gold/30 text-orisun-ivory py-2 focus:outline-none focus:border-orisun-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase">Your Email *</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-orisun-gold/30 text-orisun-ivory py-2 focus:outline-none focus:border-orisun-gold transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase">Type of Shoutout</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-orisun-deep border-b border-orisun-gold/30 text-orisun-ivory py-2 focus:outline-none focus:border-orisun-gold transition-colors"
                >
                  <option>General Shoutout</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Obituary / Remembrance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase">Recipient Name</label>
                <input 
                  type="text" 
                  value={formData.recipientName}
                  onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                  className="w-full bg-transparent border-b border-orisun-gold/30 text-orisun-ivory py-2 focus:outline-none focus:border-orisun-gold transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase">Your Message *</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-transparent border-b border-orisun-gold/30 text-orisun-ivory py-2 focus:outline-none focus:border-orisun-gold transition-colors resize-none"
                placeholder="What would you like the OAP to read out?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase flex items-center gap-2">
                <Music size={14} /> Song Request (Optional)
              </label>
              <input 
                type="text" 
                value={formData.songRequest}
                onChange={(e) => setFormData({...formData, songRequest: e.target.value})}
                className="w-full bg-transparent border-b border-orisun-gold/30 text-orisun-ivory py-2 focus:outline-none focus:border-orisun-gold transition-colors"
                placeholder="E.g., King Sunny Ade - Ja Funmi"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-orisun-gold text-orisun-deep font-unbounded text-sm font-bold tracking-widest hover:bg-white transition-all flex justify-center items-center gap-2 mt-8 disabled:opacity-50"
            >
              {loading ? "PROCESSING..." : "PAY ₦1,000 TO SEND"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
