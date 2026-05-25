"use client";

// app/login/page.tsx — Admin login page.
// Uses LoginForm component; no credentials are exposed here.

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "@/components/ui/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If already authenticated, redirect immediately (SPA — no full reload)
  useEffect(() => {
    if (session) router.replace("/admin");
  }, [session, router]);

  if (status === "loading") {
    return (
      <main className="flex items-center justify-center min-h-screen bg-orisun-deep">
        <span className="text-orisun-ivory/60 font-dm-sans text-sm animate-pulse">
          Loading…
        </span>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-orisun-deep px-4">
      <div className="w-full max-w-sm">
        {/* Logo / branding */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block">
            <span className="font-fraunces text-3xl font-bold text-orisun-ivory leading-none">
              ORISUN
            </span>
            <br />
            <span className="font-unbounded text-[9px] tracking-[0.25em] text-orisun-gold uppercase">
              Admin Panel
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="login-card">
          <h1 className="text-xl font-fraunces text-orisun-ivory mb-1">
            Sign in
          </h1>
          <p className="text-sm text-orisun-ivory/50 font-dm-sans mb-8">
            Admin access only. Unauthorised access is prohibited.
          </p>

          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-orisun-ivory/30 font-dm-sans">
          &copy; {new Date().getFullYear()} Orisun Igbomina FM 102.1
        </p>
      </div>
    </main>
  );
}
