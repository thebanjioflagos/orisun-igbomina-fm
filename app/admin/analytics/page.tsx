import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import AnalyticsChart from "@/components/admin/AnalyticsChart";
import { Headphones, Globe, Clock, ArrowUpRight } from "lucide-react";

export default async function AnalyticsManager() {
  await requireRole("admin");
  
  return (
    <div className="flex-1">
      <AdminTopBar 
        title="Analytics & Insights" 
        subtitle="Platform performance and audience metrics" 
      />
      
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6 relative overflow-hidden">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-sm bg-orisun-gold/10 flex items-center justify-center">
                <Headphones size={18} className="text-orisun-gold" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-unbounded font-bold px-2 py-1 rounded-sm text-green-400 bg-green-500/10">
                <ArrowUpRight size={10} /> 12.5%
              </div>
            </div>
            <p className="text-3xl font-fraunces text-orisun-ivory font-bold mt-4">24.5K</p>
            <p className="text-orisun-ivory/50 text-xs font-dm-sans mt-1">Weekly Listeners</p>
          </div>
          
          <div className="bg-white/[0.02] border border-blue-500/10 rounded-sm p-6 relative overflow-hidden">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-sm bg-blue-500/10 flex items-center justify-center">
                <Globe size={18} className="text-blue-400" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-unbounded font-bold px-2 py-1 rounded-sm text-green-400 bg-green-500/10">
                <ArrowUpRight size={10} /> 8.2%
              </div>
            </div>
            <p className="text-3xl font-fraunces text-orisun-ivory font-bold mt-4">128.2K</p>
            <p className="text-orisun-ivory/50 text-xs font-dm-sans mt-1">Page Views</p>
          </div>
          
          <div className="bg-white/[0.02] border border-green-500/10 rounded-sm p-6 relative overflow-hidden">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-sm bg-green-500/10 flex items-center justify-center">
                <Clock size={18} className="text-green-400" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-unbounded font-bold px-2 py-1 rounded-sm text-orisun-crimson bg-orisun-crimson/10">
                <ArrowUpRight size={10} className="rotate-90" /> 2.1%
              </div>
            </div>
            <p className="text-3xl font-fraunces text-orisun-ivory font-bold mt-4">42m 15s</p>
            <p className="text-orisun-ivory/50 text-xs font-dm-sans mt-1">Avg. Listening Time</p>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-fraunces text-xl text-orisun-ivory">Audience Growth</h3>
              <p className="text-sm text-orisun-ivory/50 font-dm-sans">Listeners and page views over the last 7 days</p>
            </div>
            <select className="bg-black/50 border border-orisun-gold/20 text-xs text-orisun-ivory rounded px-3 py-1.5 outline-none font-dm-sans">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          
          <AnalyticsChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6">
            <h3 className="font-fraunces text-xl text-orisun-ivory mb-4">Top Performing Articles</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-fraunces text-orisun-ivory/90 text-sm">The History of Ila-Orangun</h4>
                    <p className="text-xs text-orisun-ivory/50 font-dm-sans mt-1">By Admin User • 2 days ago</p>
                  </div>
                  <div className="text-right">
                    <p className="font-unbounded font-bold text-sm text-orisun-gold">1,24{i}</p>
                    <p className="text-[10px] text-orisun-ivory/40 uppercase tracking-widest font-unbounded">Views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6">
            <h3 className="font-fraunces text-xl text-orisun-ivory mb-4">Listener Demographics</h3>
            <div className="flex h-48 items-center justify-center border-2 border-dashed border-white/5 rounded">
              <p className="text-orisun-ivory/40 text-sm font-dm-sans">Demographics map/chart will appear here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
