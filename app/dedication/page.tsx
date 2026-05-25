"use client";

import dynamic from "next/dynamic";

const DedicationForm = dynamic(() => import("@/components/dedication/DedicationForm"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen bg-orisun-deep pt-32 pb-24 px-6 flex items-center justify-center">
      <div className="text-orisun-gold font-unbounded text-sm animate-pulse uppercase tracking-widest">
        Loading Dedication Form...
      </div>
    </main>
  ),
});

export default function DedicationPage() {
  return <DedicationForm />;
}

