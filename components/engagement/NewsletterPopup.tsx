"use client";

import { useState, useEffect } from "react";
import { X, Mail, Bell } from "lucide-react";

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem("orisun_newsletter_seen");
      if (!hasSeen) {
        setShow(true);
      }
    }, 10000); // Show after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setShow(false);
    localStorage.setItem("orisun_newsletter_seen", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-orisun-deep/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-md bg-orisun-gold p-8 md:p-12 text-orisun-deep space-y-8 shadow-2xl">
        <button onClick={close} className="absolute top-4 right-4 text-orisun-deep/40 hover:text-orisun-deep">
          <X size={24} />
        </button>

        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-orisun-deep rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="text-orisun-gold" size={32} />
          </div>
          <h3 className="text-3xl font-fraunces font-bold italic leading-tight">Stay Connected to the Source</h3>
          <p className="text-orisun-deep/60 font-dm-sans">
            Get breaking news and cultural insights delivered to your WhatsApp and Email.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); close(); }}>
          <div className="space-y-1">
            <label className="text-[10px] font-unbounded uppercase tracking-widest font-bold">Email</label>
            <input type="email" required className="w-full bg-transparent border-b-2 border-orisun-deep/20 py-2 outline-none focus:border-orisun-deep font-dm-sans placeholder:text-orisun-deep/20" placeholder="your@email.com" />
          </div>
          <button className="w-full py-4 bg-orisun-deep text-orisun-gold font-unbounded font-bold text-xs tracking-widest">
            SUBSCRIBE NOW
          </button>
        </form>

        <p className="text-[10px] text-center font-dm-sans opacity-40">
          We respect your privacy. No spam, just heritage.
        </p>
      </div>
    </div>
  );
}
