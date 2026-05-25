// app/providers/AuthProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  // You can optionally pass a session prop if you have one pre-fetched server‑side.
  return <SessionProvider>{children}</SessionProvider>;
}
