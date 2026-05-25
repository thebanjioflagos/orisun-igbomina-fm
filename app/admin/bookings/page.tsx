import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Search, DollarSign, Download, CheckCircle, Clock } from "lucide-react";

export default async function AdBookingsManager() {
  await requireRole("admin");
  
  // Basic query
  const bookings = await prisma.adBooking.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminTopBar 
        title="Ad Bookings" 
        subtitle="Manage radio and digital advertising placements" 
      />
      
      <main className="p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-sm bg-orisun-gold/10 flex items-center justify-center">
                <DollarSign size={16} className="text-orisun-gold" />
              </div>
              <p className="text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest">Total Revenue</p>
            </div>
            <p className="font-fraunces text-2xl text-orisun-ivory">₦0.00</p>
          </div>
          <div className="bg-white/[0.02] border border-blue-500/10 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-sm bg-blue-500/10 flex items-center justify-center">
                <Clock size={16} className="text-blue-400" />
              </div>
              <p className="text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest">Pending Verification</p>
            </div>
            <p className="font-fraunces text-2xl text-orisun-ivory">{bookings.filter((b: { status: string }) => b.status === "PENDING").length}</p>
          </div>
          <div className="bg-white/[0.02] border border-green-500/10 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-sm bg-green-500/10 flex items-center justify-center">
                <CheckCircle size={16} className="text-green-400" />
              </div>
              <p className="text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest">Active Ads</p>
            </div>
            <p className="font-fraunces text-2xl text-orisun-ivory">{bookings.filter((b: { status: string }) => b.status === "LIVE").length}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-white/5 border border-orisun-gold/10 rounded-sm px-3 py-2 w-72">
            <Search size={16} className="text-orisun-ivory/30" />
            <input
              type="text"
              placeholder="Search business or reference..."
              className="bg-transparent text-orisun-ivory text-sm outline-none placeholder:text-orisun-ivory/30 w-full"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-orisun-ivory/80 text-xs font-unbounded rounded border border-white/10 hover:bg-white/10 transition-colors">
            <Download size={14} /> Export Report
          </button>
        </div>

        <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm overflow-hidden">
          <table className="w-full text-left text-sm font-dm-sans">
            <thead className="bg-white/5 text-orisun-ivory/70 border-b border-orisun-gold/10">
              <tr>
                <th className="px-6 py-4 font-medium">Business / Contact</th>
                <th className="px-6 py-4 font-medium">Package</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 text-right font-medium">Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orisun-gold/5">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors text-orisun-ivory/80">
                  <td className="px-6 py-4">
                    <p className="font-fraunces text-orisun-ivory">{booking.businessName}</p>
                    <p className="text-xs text-orisun-ivory/50 mt-1">{booking.contactEmail}</p>
                  </td>
                  <td className="px-6 py-4 uppercase text-xs font-unbounded tracking-wider text-orisun-gold">
                    {booking.packageId}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded text-[10px] font-unbounded font-bold uppercase ${
                      booking.status === "LIVE" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                      booking.status === "CONFIRMED" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                      booking.status === "PENDING" ? "bg-orisun-gold/10 text-orisun-gold border border-orisun-gold/20" :
                      "bg-white/10 text-orisun-ivory/60 border border-white/20"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-orisun-ivory/50">
                    {format(booking.createdAt, "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-right text-xs font-mono text-orisun-ivory/30">
                    {booking.paystackReference.substring(0, 8)}...
                  </td>
                </tr>
              ))}
              
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-orisun-ivory/50 border-t border-orisun-gold/5">
                    No ad bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
