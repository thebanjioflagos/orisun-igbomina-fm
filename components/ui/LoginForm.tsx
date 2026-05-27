"use client";

// components/ui/LoginForm.tsx
// A proper admin login form — credentials are sent via POST to NextAuth,
// never stored in the UI or exposed in client-side code.

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useJingleStore } from "@/lib/jingle-engine";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const playJingle = useJingleStore((s) => s.actions.play);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const email    = (data.get("email") as string).trim();
    const password = data.get("password") as string;

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // handle redirect ourselves
    });

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      // Play admin welcome jingle then navigate
      playJingle("adminWelcome");
      setTimeout(() => router.replace("/admin"), 600);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="login-form"
      noValidate
      aria-label="Admin sign-in form"
    >
      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="form-input"
          placeholder="admin@orisunigbominafm.com"
          aria-describedby={error ? "form-error" : undefined}
        />
      </div>

      <div className="form-field">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            className="form-input pr-10 w-full"
            placeholder="••••••••"
            aria-describedby={error ? "form-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-orisun-ivory/50 hover:text-orisun-gold transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {error && (
        <p id="form-error" role="alert" className="form-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
        aria-busy={loading}
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
