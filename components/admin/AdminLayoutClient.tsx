"use client";

import { useAdminStore } from "@/lib/admin-store";
import AdminSidebar from "@/components/admin/Sidebar";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  pendingReports?: number;
}

export default function AdminLayoutClient({ children, pendingReports = 0 }: Props) {
  const { theme } = useAdminStore();
  const isDark = theme === "dark";

  return (
    <div className={cn(
      "min-h-screen flex relative transition-colors duration-300",
      isDark ? "bg-[#0c0700] text-orisun-ivory" : "bg-gray-50 text-gray-900 admin-light"
    )}>
      <AdminSidebar pendingReports={pendingReports} />
      {/* Main content area */}
      <div
        className="flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300"
      >
        {children}
      </div>
    </div>
  );
}
