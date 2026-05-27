import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type Role = "admin" | "presenter" | "correspondent";

interface AuthenticatedSession {
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
}

/**
 * Server-side helper: get the current session or redirect to /login.
 * Call inside Server Components and Route Handlers.
 */
export async function getAuthSession(): Promise<AuthenticatedSession> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }
  return session as AuthenticatedSession;
}

/**
 * Server-side helper: require a minimum role.
 * Redirects to /admin with an error if the role is insufficient.
 */
export async function requireRole(...roles: Role[]): Promise<AuthenticatedSession> {
  const session = await getAuthSession();
  const normalizedRole = session.user.role?.toLowerCase() as Role;
  if (!roles.includes(normalizedRole)) {
    redirect("/admin?error=forbidden");
  }
  return session;
}

/** Convenience helpers */
export const requireAdmin        = () => requireRole("admin");
export const requirePresenter    = () => requireRole("admin", "presenter");
export const requireCorrespondent = () => requireRole("admin", "presenter", "correspondent");
