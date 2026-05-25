import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export async function authorizeCredentials(credentials: Record<string, string> | undefined) {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });
    if (!user) {
      return null;
    }
    const isPasswordValid = await compare(credentials.password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    // Return user details for JWT mapping. Match session field shapes.
    return {
      id:    user.id,
      name:  user.name,
      email: user.email,
      role:  user.role.toLowerCase() as "admin" | "presenter" | "correspondent",
    };
  } catch (error) {
    console.error("Auth Error:", error);
    // If the database connection fails or queries crash, return null
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return authorizeCredentials(credentials);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  // Base URL for callbacks – required in dev
  pages: {
    signIn: "/login",
  },
};

// Single handler compatible with Edge or Node runtime
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Optional: enforce runtime (defaults to nodejs)
export const runtime = "nodejs";
