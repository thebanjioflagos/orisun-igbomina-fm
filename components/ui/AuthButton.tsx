"use client";

// AuthButton — shows Sign In (redirects to /login form) or Sign Out.
// Credentials are NEVER stored here; the login form handles them.

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (session) {
    return (
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-4 py-2 text-sm font-unbounded rounded border border-orisun-gold text-orisun-gold hover:bg-orisun-gold hover:text-orisun-deep transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orisun-gold"
        aria-label="Sign out of admin panel"
      >
        Sign Out
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="px-4 py-2 text-sm font-unbounded rounded bg-orisun-gold text-orisun-deep hover:bg-orisun-gold/80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orisun-gold"
      aria-label="Admin sign in"
    >
      Admin
    </Link>
  );
}
