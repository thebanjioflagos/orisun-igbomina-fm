// lib/env.ts — Runtime validation for required environment variables.
// Imported early in server-side code so missing vars crash fast with clear messages.

import { z } from "zod";

const envSchema = z.object({
  // NextAuth requires both of these
  NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters"),

  // Database — required for Prisma & Supabase
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid PostgreSQL connection string"),

  // GTM — optional, public
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
});

// Parse once at module load; throws a descriptive ZodError if anything is missing
export const env = envSchema.parse(process.env);
