"use client";

import { useSession } from "next-auth/react";
import { Bell, Search } from "lucide-react";
import { useAdminStore } from "@/lib/admin-store";
import { cn } from "@/lib/utils";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function AdminTopBar({ title, subtitle }: TopBarProps) {
  const { data: session } = useSession();
  const { theme } = useAdminStore();
  const isDark = theme === "dark";

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "??";

  return (
    <header className={cn(
      "h-16 backdrop-blur-md border-b flex items-center justify-between px-6 sticky top-0 z-30 transition-colors duration-300",
      isDark ? "bg-[#0f0800]/80 border-orisun-gold/10" : "bg-white/80 border-gray-200"
    )}>
      <div>
        <h1 className={cn("font-fraunces font-bold text-lg leading-none", isDark ? "text-orisun-ivory" : "text-gray-900")}>{title}</h1>
        {subtitle && <p className={cn("text-xs font-dm-sans mt-0.5", isDark ? "text-orisun-ivory/40" : "text-gray-500")}>{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className={cn("hidden md:flex items-center gap-2 border rounded-sm px-3 py-1.5", 
          isDark ? "bg-white/5 border-orisun-gold/10" : "bg-gray-50 border-gray-200"
        )}>
          <Search size={14} className={isDark ? "text-orisun-ivory/30" : "text-gray-400"} />
          <input
            type="text"
            placeholder="Search..."
            className={cn("bg-transparent text-xs font-dm-sans outline-none w-40", 
              isDark ? "text-orisun-ivory/70 placeholder:text-orisun-ivory/25" : "text-gray-700 placeholder:text-gray-400"
            )}
          />
        </div>

        {/* Notifications */}
        <button className={cn("relative w-8 h-8 border rounded-sm flex items-center justify-center transition-colors", 
          isDark ? "bg-white/5 border-orisun-gold/10 text-orisun-ivory/60 hover:text-orisun-gold" : "bg-white border-gray-200 text-gray-500 hover:text-orange-600"
        )}>
          <Bell size={15} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orisun-crimson rounded-full" />
        </button>

        {/* Avatar */}
        <div className={cn("w-8 h-8 border rounded-sm flex items-center justify-center", 
          isDark ? "bg-orisun-gold/20 border-orisun-gold/40" : "bg-orange-100 border-orange-200"
        )}>
          <span className={cn("font-unbounded text-[10px] font-bold", isDark ? "text-orisun-gold" : "text-orange-700")}>{initials}</span>
        </div>
      </div>
    </header>
  );
}
