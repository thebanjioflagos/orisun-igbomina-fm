import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import StatCard from "@/components/admin/StatCard";
import { Newspaper, Heart, Mail, ShoppingBag, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await requireRole("admin", "presenter", "correspondent");
  const role = session.user.role;

  // Fetch some real stats based on role
  // For now we'll do some basic aggregations
  
  let stats = {
    posts: 0,
    dedications: 0,
    subscribers: 0,
    bookings: 0,
    eyeWitnessPending: 0,
  };

  try {
    const [posts, dedications, subscribers, eyeWitnessPending] = await Promise.all([
      prisma.post.count(),
      prisma.dedication.count({ where: { status: "PENDING" } }),
      prisma.newsletter.count({ where: { active: true } }),
      prisma.eyeWitnessReport.count({ where: { status: "PENDING" } }),
    ]);
    stats = { posts, dedications, subscribers, bookings: 0, eyeWitnessPending };
  } catch (error) {
    console.error("Failed to fetch dashboard stats", error);
  }

  return (
    <div className="flex-1">
      <AdminTopBar 
        title="Dashboard" 
        subtitle={`Welcome back, ${session.user.name}`} 
      />
      
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Articles"
            value={stats.posts}
            icon={Newspaper}
            accent="blue"
            trend={{ value: 12, label: "vs last month" }}
          />
          
          {(role === "admin" || role === "presenter") && (
            <>
              <StatCard
                title="Pending Dedications"
                value={stats.dedications}
                icon={Heart}
                accent="crimson"
              />
              <StatCard
                title="Eye-Witness Pending"
                value={stats.eyeWitnessPending}
                icon={Eye}
                accent="gold"
                trend={stats.eyeWitnessPending > 0 ? { value: stats.eyeWitnessPending, label: "awaiting review" } : undefined}
              />
            </>
          )}

          {role === "admin" && (
            <>
              <StatCard
                title="Active Subscribers"
                value={stats.subscribers}
                icon={Mail}
                accent="green"
                trend={{ value: 5, label: "vs last month" }}
              />
              <StatCard
                title="Ad Bookings"
                value={stats.bookings}
                icon={ShoppingBag}
                accent="gold"
              />
            </>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="col-span-2 bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6">
             <h3 className="font-fraunces text-orisun-ivory text-xl mb-4">Recent Activity</h3>
             <div className="text-orisun-ivory/50 text-sm font-dm-sans py-12 text-center border border-dashed border-orisun-gold/20 rounded">
               Activity feed will appear here
             </div>
           </div>
           
           <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6">
             <h3 className="font-fraunces text-orisun-ivory text-xl mb-4">Quick Actions</h3>
             <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-orisun-gold/10 hover:bg-orisun-gold/20 text-orisun-gold text-sm font-dm-sans rounded transition-colors border border-orisun-gold/20">
                  + Create New Article
                </button>
                {(role === "admin" || role === "presenter") && stats.eyeWitnessPending > 0 && (
                  <Link
                    href="/admin/reports"
                    className="w-full text-left px-4 py-3 bg-orisun-crimson/10 hover:bg-orisun-crimson/20 text-orisun-crimson text-sm font-dm-sans rounded transition-colors border border-orisun-crimson/20 flex items-center gap-2"
                  >
                    <Eye size={14} />
                    Review {stats.eyeWitnessPending} Eye-Witness Report{stats.eyeWitnessPending > 1 ? "s" : ""}
                  </Link>
                )}
                {role === "admin" && (
                  <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 text-orisun-ivory/80 text-sm font-dm-sans rounded transition-colors border border-white/10">
                    + Invite Staff Member
                  </button>
                )}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
