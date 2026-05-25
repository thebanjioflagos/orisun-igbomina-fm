import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  accent?: "gold" | "crimson" | "blue" | "green";
}

const accentMap = {
  gold:    { bg: "bg-orisun-gold/10",   border: "border-orisun-gold/20",   icon: "text-orisun-gold",   glow: "shadow-orisun-gold/10" },
  crimson: { bg: "bg-orisun-crimson/10", border: "border-orisun-crimson/20", icon: "text-orisun-crimson", glow: "shadow-orisun-crimson/10" },
  blue:    { bg: "bg-blue-500/10",       border: "border-blue-500/20",       icon: "text-blue-400",       glow: "shadow-blue-500/10" },
  green:   { bg: "bg-green-500/10",      border: "border-green-500/20",      icon: "text-green-400",      glow: "shadow-green-500/10" },
};

export default function StatCard({ title, value, icon: Icon, trend, accent = "gold" }: StatCardProps) {
  // eslint-disable-next-line security/detect-object-injection
  const colors = accentMap[accent];
  const isPositive = (trend?.value ?? 0) >= 0;

  return (
    <div className={cn(
      "relative bg-white/[0.03] backdrop-blur border rounded-sm p-6 shadow-lg overflow-hidden transition-all hover:bg-white/[0.05]",
      colors.border,
      colors.glow,
    )}>
      {/* Background gradient */}
      <div className={cn("absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20", colors.bg)} />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center", colors.bg)}>
            <Icon size={18} className={colors.icon} />
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-[10px] font-unbounded font-bold px-2 py-1 rounded-sm",
              isPositive ? "text-green-400 bg-green-500/10" : "text-orisun-crimson bg-orisun-crimson/10"
            )}>
              {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <p className="text-3xl font-fraunces text-orisun-ivory font-bold">{value}</p>
        <p className="text-orisun-ivory/50 text-xs font-dm-sans mt-1">{title}</p>
        {trend && (
          <p className="text-orisun-ivory/30 text-[10px] font-dm-sans mt-1">{trend.label}</p>
        )}
      </div>
    </div>
  );
}
