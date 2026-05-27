import type { Metadata } from "next";
import EyeWitnessForm from "@/components/EyeWitnessForm";
import Link from "next/link";
import { Eye, Radio, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Report Breaking News — Orisun Igbomina FM",
  description:
    "Are you on the scene? Submit your eye-witness video, photo, or account of breaking events to Orisun Igbomina FM 102.1. Your community needs to know.",
};

export default function ReportNewsPage() {
  return (
    <div className="min-h-screen bg-[#080400]">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orisun-deep via-[#1a0c00] to-[#080400] border-b border-orisun-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orisun-crimson/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-orisun-ivory/40 hover:text-orisun-gold text-sm font-dm-sans transition-colors mb-8"
          >
            <Radio size={14} /> Orisun Igbomina FM
          </Link>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-orisun-crimson/15 border border-orisun-crimson/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <Eye size={32} className="text-orisun-crimson" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-orisun-crimson/10 border border-orisun-crimson/25 rounded-full px-3 py-1 text-[10px] font-unbounded text-orisun-crimson uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 bg-orisun-crimson rounded-full animate-pulse" />
                Citizen Journalism
              </div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-orisun-ivory leading-tight mb-3">
                You Are the Reporter
              </h1>
              <p className="text-orisun-ivory/60 font-dm-sans text-lg max-w-2xl leading-relaxed">
                Witnessed something the community needs to know? Submit your eye-witness account, photo, or video directly to Orisun Igbomina FM 102.1&apos;s editorial team. We review every submission.
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {[
              {
                icon: <Eye size={16} />,
                title: "You Witness It",
                desc: "Capture the moment with your phone or describe what you saw",
              },
              {
                icon: <Zap size={16} />,
                title: "We Review It",
                desc: "Our editorial team verifies and screens every submission within minutes",
              },
              {
                icon: <Radio size={16} />,
                title: "Community Hears It",
                desc: "Approved reports are published on our website and broadcast on air",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-orisun-gold/10 rounded-xl p-4 flex items-start gap-3"
              >
                <div className="w-8 h-8 bg-orisun-gold/10 rounded-lg flex items-center justify-center text-orisun-gold flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <p className="font-fraunces text-orisun-ivory text-sm font-bold mb-0.5">{step.title}</p>
                  <p className="text-orisun-ivory/50 text-xs font-dm-sans leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <EyeWitnessForm />

        {/* Security badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-orisun-ivory/30 text-xs font-dm-sans">
          <ShieldCheck size={14} />
          Your submission is encrypted and handled securely by Orisun Igbomina FM 102.1.
        </div>
      </div>
    </div>
  );
}
