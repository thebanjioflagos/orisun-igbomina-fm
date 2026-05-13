"use client";

import { useState, useEffect } from "react";
import { X, Bell } from "lucide-react";

export default function NewsletterPopup() {
  const [show,       setShow]       = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem("orisun_newsletter_seen");
      if (!hasSeen) setShow(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setShow(false);
    localStorage.setItem("orisun_newsletter_seen", "true");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    try {
      await fetch("/api/newsletter", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, source: "popup" }),
      });
      setSubmitted(true);
      setTimeout(close, 2500);
    } catch {
      // Silent — best-effort
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-orisun-deep/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-md bg-orisun-gold p-8 md:p-12 text-orisun-deep space-y-8 shadow-2xl">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 text-orisun-deep/40 hover:text-orisun-deep"
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-orisun-deep rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="text-orisun-gold" size={32} />
            </div>
            <h3 className="text-3xl font-fraunces font-bold italic">E kaabọ! Welcome.</h3>
            <p className="text-orisun-deep/60 font-dm-sans">
              You&apos;re now connected to the Orisun community.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-orisun-deep rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="text-orisun-gold" size={32} />
              </div>
              <h3 className="text-3xl font-fraunces font-bold italic leading-tight">
                Stay Connected to the Source
              </h3>
              <p className="text-orisun-deep/60 font-dm-sans">
                Get breaking news and cultural insights from Ila-Orangun delivered to your inbox.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label htmlFor="popup-email" className="text-[10px] font-unbounded uppercase tracking-widest font-bold">
                  Email Address
                </label>
                <input
                  id="popup-email"
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b-2 border-orisun-deep/20 py-2 outline-none focus:border-orisun-deep font-dm-sans placeholder:text-orisun-deep/30"
                  placeholder="your@email.com"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-orisun-deep text-orisun-gold font-unbounded font-bold text-xs tracking-widest disabled:opacity-60 transition-opacity"
              >
                {submitting ? "SUBSCRIBING..." : "SUBSCRIBE NOW"}
              </button>
            </form>

            <p className="text-[10px] text-center font-dm-sans opacity-40">
              We respect your privacy. No spam — just heritage.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
