"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useAdminStore } from "@/lib/admin-store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Newspaper,
  Heart,
  Users,
  Calendar,
  Music,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  Radio,
  ShoppingBag,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  Eye,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: string[];
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard",      href: "/admin",              icon: LayoutDashboard, roles: ["admin", "presenter", "correspondent"] },
  { label: "News & Articles",href: "/admin/news",         icon: Newspaper,       roles: ["admin", "presenter", "correspondent"] },
  { label: "Eye-Witness",    href: "/admin/reports",      icon: Eye,             roles: ["admin", "presenter"] },
  { label: "Dedications",    href: "/admin/dedications",  icon: Heart,           roles: ["admin", "presenter"] },
  { label: "Schedule",       href: "/admin/schedule",     icon: Calendar,        roles: ["admin", "presenter"] },
  { label: "Playlist",       href: "/admin/playlist",     icon: Music,           roles: ["admin", "presenter"] },
  { label: "Ad Bookings",    href: "/admin/bookings",     icon: ShoppingBag,     roles: ["admin"] },
  { label: "Newsletter",     href: "/admin/newsletter",   icon: Mail,            roles: ["admin"] },
  { label: "Analytics",      href: "/admin/analytics",    icon: BarChart3,       roles: ["admin"] },
  { label: "Staff",          href: "/admin/staff",        icon: Users,           roles: ["admin"] },
  { label: "Settings",       href: "/admin/settings",     icon: Settings,        roles: ["admin"] },
];

interface SidebarProps {
  pendingReports?: number;
}

export default function AdminSidebar({ pendingReports = 0 }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role ?? "correspondent";
  const { isSidebarOpen, toggleSidebar, theme, toggleTheme } = useAdminStore();
  const isDark = theme === "dark";

  const visibleItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className={cn(
      "sticky left-0 top-0 h-screen border-r flex flex-col z-40 transition-all duration-300 flex-shrink-0",
      isSidebarOpen ? "w-64" : "w-20",
      isDark ? "bg-[#0f0800] border-orisun-gold/10" : "bg-white border-gray-200"
    )}>
      {/* Toggle & Logo */}
      <div className={cn("p-4 border-b flex items-center justify-between", isDark ? "border-orisun-gold/10" : "border-gray-200")}>
        <Link href="/admin" className={cn("flex items-center gap-3 group overflow-hidden", !isSidebarOpen && "hidden")}>
          <div className={cn("w-10 h-10 rounded-sm border flex items-center justify-center flex-shrink-0", 
            isDark ? "bg-orisun-gold/10 border-orisun-gold/30" : "bg-gray-100 border-gray-200"
          )}>
            <Radio size={18} className="text-orisun-gold" />
          </div>
          <div className="min-w-0">
            <p className={cn("font-fraunces font-bold text-sm leading-none truncate", isDark ? "text-orisun-ivory" : "text-gray-900")}>ORISUN FM</p>
            <p className="font-unbounded text-[8px] text-orisun-gold uppercase tracking-widest mt-0.5 truncate">Admin Panel</p>
          </div>
        </Link>
        <button onClick={toggleSidebar} className={cn("p-2 rounded mx-auto transition-colors", 
          isDark ? "hover:bg-white/5 text-orisun-ivory/60" : "hover:bg-gray-100 text-gray-500"
        )}>
          <Menu size={20} />
        </button>
      </div>

      {/* Role Badge */}
      {isSidebarOpen && (
        <div className={cn("px-6 py-3 border-b", isDark ? "border-orisun-gold/10" : "border-gray-200")}>
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded text-[9px] font-unbounded uppercase tracking-widest font-bold border",
            role === "admin"         && (isDark ? "bg-orisun-gold/20 text-orisun-gold border-orisun-gold/30" : "bg-orange-100 text-orange-700 border-orange-200"),
            role === "presenter"     && (isDark ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-blue-100 text-blue-700 border-blue-200"),
            role === "correspondent" && (isDark ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-green-100 text-green-700 border-green-200"),
          )}>
            {role}
          </span>
          <p className={cn("text-[10px] font-dm-sans mt-1 truncate", isDark ? "text-orisun-ivory/50" : "text-gray-500")}>{session?.user?.name}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 overflow-x-hidden">
        <ul className="space-y-1">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-sm text-sm font-dm-sans transition-all group relative",
                    isActive
                      ? (isDark ? "bg-orisun-gold/15 text-orisun-gold border border-orisun-gold/20" : "bg-orange-50 text-orange-700 border border-orange-200")
                      : (isDark ? "text-orisun-ivory/60 hover:text-orisun-ivory hover:bg-white/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"),
                    isSidebarOpen ? "gap-3" : "justify-center"
                  )}
                  title={!isSidebarOpen ? item.label : undefined}
                >
                  <item.icon size={16} className={cn(
                    isActive ? (isDark ? "text-orisun-gold" : "text-orange-600") : (isDark ? "text-orisun-ivory/40 group-hover:text-orisun-ivory/70" : "text-gray-400 group-hover:text-gray-600")
                  )} />
                  {isSidebarOpen && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {isActive && <ChevronRight size={12} className={cn("flex-shrink-0", isDark ? "text-orisun-gold/50" : "text-orange-400")} />}
                      {/* Static badge from nav item config */}
                      {item.badge && (
                        <span className="bg-orisun-crimson text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                          {item.badge}
                        </span>
                      )}
                      {/* Dynamic pending reports badge */}
                      {item.href === "/admin/reports" && pendingReports > 0 && (
                        <span className="bg-orisun-crimson text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 animate-pulse">
                          {pendingReports > 99 ? "99+" : pendingReports}
                        </span>
                      )}
                    </>
                  )}
                  {/* Collapsed sidebar: show dot indicator for pending reports */}
                  {!isSidebarOpen && item.href === "/admin/reports" && pendingReports > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-orisun-crimson rounded-full animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / Controls */}
      <div className={cn("p-4 border-t flex flex-col gap-2", isDark ? "border-orisun-gold/10" : "border-gray-200")}>
        <button
          onClick={toggleTheme}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all text-sm font-dm-sans group",
            isDark ? "text-orisun-ivory/50 hover:text-orisun-gold hover:bg-orisun-gold/5" : "text-gray-600 hover:text-orange-600 hover:bg-orange-50",
            !isSidebarOpen && "justify-center"
          )}
          title={!isSidebarOpen ? "Toggle Theme" : undefined}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          {isSidebarOpen && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all text-sm font-dm-sans group",
            isDark ? "text-orisun-ivory/50 hover:text-orisun-crimson hover:bg-orisun-crimson/5" : "text-gray-600 hover:text-red-600 hover:bg-red-50",
            !isSidebarOpen && "justify-center"
          )}
          title={!isSidebarOpen ? "Sign Out" : undefined}
        >
          <LogOut size={16} />
          {isSidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
