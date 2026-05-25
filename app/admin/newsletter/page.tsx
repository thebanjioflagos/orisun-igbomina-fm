import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";
import { Send, Users, Activity, ExternalLink } from "lucide-react";

export default async function NewsletterManager() {
  await requireRole("admin");
  
  // Basic query
  const subscribers = await prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" }
  });

  const activeCount = subscribers.filter(s => s.active).length;

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopBar 
        title="Newsletter & Subscribers" 
        subtitle="Manage audience and send campaigns" 
      />
      
      <main className="p-6 flex-1 flex flex-col xl:flex-row gap-6">
        {/* Left Column - Subscriber List */}
        <div className="flex-1 bg-white/[0.02] border border-orisun-gold/10 rounded-sm flex flex-col">
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div>
              <h3 className="font-fraunces text-lg text-orisun-ivory">Subscribers</h3>
              <p className="text-xs text-orisun-ivory/50 font-dm-sans">{activeCount} active / {subscribers.length} total</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-orisun-ivory/80 text-xs font-unbounded rounded border border-white/10 transition-colors">
              <ExternalLink size={14} /> Export CSV
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left text-sm font-dm-sans">
              <thead className="bg-white/5 text-orisun-ivory/70 border-b border-orisun-gold/5 sticky top-0">
                <tr>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subscribers.map(sub => (
                  <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3 text-orisun-ivory/90">{sub.email}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-unbounded font-bold tracking-widest uppercase ${
                        sub.active ? "text-green-400 bg-green-500/10" : "text-orisun-crimson bg-orisun-crimson/10"
                      }`}>
                        {sub.active ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right text-orisun-ivory/50 text-xs">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Right Column - Campaign Sender */}
        <div className="w-full xl:w-[400px] bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6 flex flex-col h-fit sticky top-6">
          <div className="w-12 h-12 bg-orisun-gold/10 rounded-sm border border-orisun-gold/20 flex items-center justify-center mb-4">
            <Send size={20} className="text-orisun-gold" />
          </div>
          
          <h3 className="font-fraunces text-xl text-orisun-ivory mb-2">Send Broadcast</h3>
          <p className="text-sm text-orisun-ivory/60 font-dm-sans mb-6">
            Draft an email campaign to all {activeCount} active subscribers.
          </p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Subject Line</label>
              <input 
                type="text" 
                placeholder="Exciting news from Orisun FM..."
                className="w-full bg-black/50 border border-orisun-gold/20 rounded p-2.5 text-sm font-dm-sans text-orisun-ivory placeholder:text-orisun-ivory/30 focus:outline-none focus:border-orisun-gold transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Message Body</label>
              <textarea 
                rows={8}
                placeholder="Write your email content here..."
                className="w-full bg-black/50 border border-orisun-gold/20 rounded p-2.5 text-sm font-dm-sans text-orisun-ivory placeholder:text-orisun-ivory/30 focus:outline-none focus:border-orisun-gold transition-colors resize-none"
              ></textarea>
            </div>
            
            <button 
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-orisun-gold text-orisun-deep py-3 rounded font-unbounded text-sm hover:bg-orisun-gold/90 transition-colors mt-2"
            >
              <Send size={16} />
              Send to {activeCount} Subscribers
            </button>
            <p className="text-[10px] text-center text-orisun-ivory/40 font-dm-sans mt-3">
              Emails are sent in batches to ensure deliverability.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
