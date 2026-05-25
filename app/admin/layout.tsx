import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";
import AuthProvider from "@/app/providers/AuthProvider";
import { prisma } from "@/lib/prisma";
import "../admin-light.css";

export const metadata: Metadata = {
  title: { default: "Admin Panel — Orisun FM", template: "%s | Admin — Orisun FM" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  // Fetch pending eyewitness report count for sidebar badge
  let pendingReports = 0;
  try {
    pendingReports = await prisma.eyeWitnessReport.count({ where: { status: "PENDING" } });
  } catch {
    // Non-fatal: badge simply won't show if DB is unreachable
  }

  return (
    <AuthProvider>
      <AdminLayoutClient pendingReports={pendingReports}>
        {children}
      </AdminLayoutClient>
    </AuthProvider>
  );
}
