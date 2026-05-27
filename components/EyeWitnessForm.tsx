"use client";

import { useState, useRef } from "react";
import { MapPin, Upload, User, Mail, Phone, FileText, Mic, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { useJingleStore } from "@/lib/jingle-engine";

type FormState = "idle" | "submitting" | "success" | "error";

export default function EyeWitnessForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);
  const playJingle = useJingleStore((s) => s.actions.play);

  const [form, setForm] = useState({
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    title: "",
    description: "",
    location: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxSize = 100 * 1024 * 1024; // 100 MB
    if (file.size > maxSize) {
      setErrorMsg("File size must be under 100 MB.");
      return;
    }
    const allowed = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime", "video/webm"];
    if (!allowed.includes(file.type)) {
      setErrorMsg("Only JPEG, PNG, WebP images or MP4/MOV/WebM videos are allowed.");
      return;
    }
    setErrorMsg("");
    const objectUrl = URL.createObjectURL(file);
    setMediaPreview(objectUrl);
    // For now store locally. In production, upload to signed S3 URL first.
    setMediaUrl(objectUrl);
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((prev) => ({ ...prev, location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}` }));
      },
      () => setErrorMsg("Unable to detect location. Please type it manually.")
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.reporterName.trim() || !form.title.trim() || !form.description.trim()) {
      setErrorMsg("Name, headline, and description are required.");
      return;
    }

    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/eyewitness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mediaUrl: mediaUrl || undefined }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Submission failed");
      }

      setState("success");
      playJingle("reportReceived");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setState("error");
    }
  }

  // ── Success screen ─────────────────────────────────────────
  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="font-fraunces text-3xl font-bold text-orisun-ivory mb-3">Report Submitted!</h2>
        <p className="text-orisun-ivory/60 font-dm-sans max-w-md leading-relaxed mb-8">
          Thank you for being the eyes and ears of your community. Our editorial team will review your report and may publish it on Orisun Igbomina FM 102.1.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setForm({ reporterName: "", reporterEmail: "", reporterPhone: "", title: "", description: "", location: "" });
            setMediaPreview(null);
            setMediaUrl("");
          }}
          className="px-6 py-3 bg-orisun-gold text-orisun-deep font-unbounded text-sm rounded hover:bg-orisun-gold/90 transition-colors"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Error banner */}
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-dm-sans">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{errorMsg}</span>
          <button type="button" onClick={() => setErrorMsg("")} className="ml-auto">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Reporter identity */}
      <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-xl p-6">
        <h3 className="font-fraunces text-orisun-ivory text-lg mb-4 flex items-center gap-2">
          <User size={18} className="text-orisun-gold" /> Your Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-orisun-ivory/50 text-xs font-dm-sans uppercase tracking-widest mb-1.5">
              Full Name <span className="text-orisun-crimson">*</span>
            </label>
            <div className="flex items-center gap-2 bg-black/40 border border-orisun-gold/15 rounded-lg px-3 py-2.5 focus-within:border-orisun-gold transition-colors">
              <User size={14} className="text-orisun-ivory/30 flex-shrink-0" />
              <input
                name="reporterName"
                value={form.reporterName}
                onChange={handleChange}
                placeholder="e.g. Adebayo Johnson"
                required
                className="bg-transparent text-orisun-ivory text-sm outline-none placeholder:text-orisun-ivory/25 w-full font-dm-sans"
              />
            </div>
          </div>
          <div>
            <label className="block text-orisun-ivory/50 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Email (Optional)</label>
            <div className="flex items-center gap-2 bg-black/40 border border-orisun-gold/15 rounded-lg px-3 py-2.5 focus-within:border-orisun-gold transition-colors">
              <Mail size={14} className="text-orisun-ivory/30 flex-shrink-0" />
              <input
                name="reporterEmail"
                type="email"
                value={form.reporterEmail}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-transparent text-orisun-ivory text-sm outline-none placeholder:text-orisun-ivory/25 w-full font-dm-sans"
              />
            </div>
          </div>
          <div>
            <label className="block text-orisun-ivory/50 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Phone (Optional)</label>
            <div className="flex items-center gap-2 bg-black/40 border border-orisun-gold/15 rounded-lg px-3 py-2.5 focus-within:border-orisun-gold transition-colors">
              <Phone size={14} className="text-orisun-ivory/30 flex-shrink-0" />
              <input
                name="reporterPhone"
                value={form.reporterPhone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                className="bg-transparent text-orisun-ivory text-sm outline-none placeholder:text-orisun-ivory/25 w-full font-dm-sans"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Incident details */}
      <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-xl p-6">
        <h3 className="font-fraunces text-orisun-ivory text-lg mb-4 flex items-center gap-2">
          <FileText size={18} className="text-orisun-gold" /> What Happened?
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-orisun-ivory/50 text-xs font-dm-sans uppercase tracking-widest mb-1.5">
              Headline / Title <span className="text-orisun-crimson">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Market fire breaks out in Oro town centre"
              required
              className="w-full bg-black/40 border border-orisun-gold/15 rounded-lg px-4 py-3 text-orisun-ivory text-base font-fraunces outline-none placeholder:text-orisun-ivory/25 focus:border-orisun-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-orisun-ivory/50 text-xs font-dm-sans uppercase tracking-widest mb-1.5">
              Your Full Account <span className="text-orisun-crimson">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              placeholder="Describe what you witnessed in as much detail as possible. Include time, people involved, and what is currently happening..."
              required
              className="w-full bg-black/40 border border-orisun-gold/15 rounded-lg px-4 py-3 text-orisun-ivory text-sm font-dm-sans outline-none placeholder:text-orisun-ivory/25 focus:border-orisun-gold transition-colors resize-none leading-relaxed"
            />
            <p className="text-right text-xs text-orisun-ivory/30 font-dm-sans mt-1">
              {form.description.length}/5000
            </p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-xl p-6">
        <h3 className="font-fraunces text-orisun-ivory text-lg mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-orisun-gold" /> Location (Optional)
        </h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-black/40 border border-orisun-gold/15 rounded-lg px-3 py-2.5 focus-within:border-orisun-gold transition-colors flex-1">
            <MapPin size={14} className="text-orisun-ivory/30 flex-shrink-0" />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Oro Market, Kwara State or GPS coords"
              className="bg-transparent text-orisun-ivory text-sm outline-none placeholder:text-orisun-ivory/25 w-full font-dm-sans"
            />
          </div>
          <button
            type="button"
            onClick={detectLocation}
            className="px-4 py-2.5 bg-orisun-gold/10 border border-orisun-gold/25 text-orisun-gold text-xs font-unbounded rounded-lg hover:bg-orisun-gold/20 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <MapPin size={13} /> Auto-Detect
          </button>
        </div>
      </div>

      {/* Media upload */}
      <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-xl p-6">
        <h3 className="font-fraunces text-orisun-ivory text-lg mb-4 flex items-center gap-2">
          <Upload size={18} className="text-orisun-gold" /> Photo or Video (Optional)
        </h3>

        {mediaPreview ? (
          <div className="relative">
            {mediaPreview.includes("blob") && fileRef.current?.files?.[0]?.type.startsWith("image") ? (
              <img src={mediaPreview} alt="Preview" className="w-full max-h-60 object-cover rounded-lg" />
            ) : (
              <video src={mediaPreview} controls className="w-full max-h-60 rounded-lg" />
            )}
            <button
              type="button"
              onClick={() => { setMediaPreview(null); setMediaUrl(""); if (fileRef.current) fileRef.current.value = ""; }}
              className="absolute top-2 right-2 w-8 h-8 bg-orisun-crimson/80 rounded-full flex items-center justify-center text-white hover:bg-orisun-crimson transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-orisun-gold/20 rounded-xl bg-black/20 flex flex-col items-center justify-center py-10 text-orisun-ivory/40 hover:border-orisun-gold/50 hover:bg-black/30 transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 bg-orisun-gold/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orisun-gold/20 transition-colors">
              <Upload size={24} className="text-orisun-gold" />
            </div>
            <p className="font-fraunces text-orisun-ivory/70 text-base mb-1">Click to upload your evidence</p>
            <p className="text-sm font-dm-sans">JPEG, PNG, MP4, MOV, WebM — Max 100 MB</p>
          </div>
        )}
        <input ref={fileRef} type="file" className="hidden" accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm" onChange={handleFileChange} />
      </div>

      {/* Disclaimer */}
      <div className="bg-orisun-gold/5 border border-orisun-gold/15 rounded-xl p-5 text-orisun-ivory/60 text-sm font-dm-sans leading-relaxed">
        <strong className="text-orisun-gold font-unbounded text-xs tracking-widest block mb-2">EDITORIAL DISCLAIMER</strong>
        By submitting this report, you confirm that the information and media you are sharing is accurate to the best of your knowledge. Orisun Igbomina FM 102.1&apos;s editorial team will review all submissions before publication. False reports may be rejected.
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full py-4 bg-orisun-gold text-orisun-deep font-unbounded text-sm rounded-xl hover:bg-orisun-gold/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-3"
      >
        {state === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting Your Report...
          </>
        ) : (
          <>
            <Mic size={18} />
            Submit Eye-Witness Report
          </>
        )}
      </button>
    </form>
  );
}
