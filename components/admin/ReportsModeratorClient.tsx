"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Search, CheckCircle, XCircle, FileText, Trash2,
  Loader2, MapPin, Mail, Phone, Eye, ArrowUpRight, Radio, Pin, PinOff
} from "lucide-react";

interface Report {
  id: string;
  reporterName: string;
  reporterEmail: string | null;
  reporterPhone: string | null;
  title: string;
  description: string;
  location: string | null;
  mediaUrl: string | null;
  status: string;
  pinnedToTicker: boolean;
  createdAt: Date;
}

const STATUS_STYLES: Record<string, string> = {
  PENDING:          "bg-orisun-gold/10 text-orisun-gold border-orisun-gold/25",
  APPROVED:         "bg-blue-500/10 text-blue-400 border-blue-500/25",
  CONVERTED_TO_POST:"bg-green-500/10 text-green-400 border-green-500/25",
  REJECTED:         "bg-orisun-crimson/10 text-orisun-crimson border-orisun-crimson/25",
};

export default function ReportsModeratorClient({ reports: initial }: { reports: Report[] }) {
  const [reports, setReports]       = useState(initial);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading]       = useState<string | null>(null);
  const [expanded, setExpanded]     = useState<string | null>(null);

  const filtered = reports.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.reporterName.toLowerCase().includes(search.toLowerCase()) ||
      (r.location ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  async function handleAction(id: string, action: "APPROVED" | "REJECTED" | "CONVERT" | "PIN_TICKER" | "UNPIN_TICKER") {
    setLoading(`${id}-${action}`);
    try {
      const res = await fetch(`/api/admin/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error("Failed");

      if (action === "CONVERT") {
        setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: "CONVERTED_TO_POST" } : r));
      } else if (action === "PIN_TICKER") {
        setReports((prev) => prev.map((r) => r.id === id ? { ...r, pinnedToTicker: true } : r));
      } else if (action === "UNPIN_TICKER") {
        setReports((prev) => prev.map((r) => r.id === id ? { ...r, pinnedToTicker: false } : r));
      } else {
        setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: action } : r));
      }
    } catch {
      alert("Action failed. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete report "${title}"? This cannot be undone.`)) return;
    setLoading(`${id}-delete`);
    try {
      const res = await fetch(`/api/admin/reports/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Delete failed.");
    } finally {
      setLoading(null);
    }
  }

  const pendingCount  = reports.filter((r) => r.status === "PENDING").length;
  const tickerCount   = reports.filter((r) => r.pinnedToTicker).length;

  return (
    <>
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total Reports",  value: reports.length,                                              color: "text-orisun-ivory" },
          { label: "Pending Review", value: pendingCount,                                                color: "text-orisun-gold" },
          { label: "Approved",       value: reports.filter((r) => r.status === "APPROVED").length,       color: "text-blue-400" },
          { label: "Published",      value: reports.filter((r) => r.status === "CONVERTED_TO_POST").length, color: "text-green-400" },
          { label: "Live Ticker",    value: tickerCount,                                                 color: "text-orisun-crimson" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/[0.02] border border-orisun-gold/10 rounded-xl p-4">
            <p className={`font-unbounded text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-orisun-ivory/50 text-xs font-dm-sans mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {pendingCount > 0 && (
        <div className="mb-3 flex items-center gap-3 p-4 bg-orisun-gold/10 border border-orisun-gold/25 rounded-xl">
          <span className="w-2 h-2 bg-orisun-gold rounded-full animate-pulse flex-shrink-0" />
          <p className="text-orisun-gold text-sm font-dm-sans">
            <strong className="font-unbounded">{pendingCount}</strong> report{pendingCount > 1 ? "s" : ""} awaiting editorial review
          </p>
        </div>
      )}
      {tickerCount > 0 && (
        <div className="mb-5 flex items-center gap-3 p-4 bg-orisun-crimson/10 border border-orisun-crimson/25 rounded-xl">
          <Radio size={14} className="text-orisun-crimson animate-pulse flex-shrink-0" />
          <p className="text-orisun-crimson text-sm font-dm-sans">
            <strong className="font-unbounded">{tickerCount}</strong> report{tickerCount > 1 ? "s are" : " is"} currently pinned to the Live Ticker
          </p>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white/5 border border-orisun-gold/10 rounded-lg px-3 py-2 flex-1">
          <Search size={15} className="text-orisun-ivory/30 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by title, reporter, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-orisun-ivory text-sm outline-none placeholder:text-orisun-ivory/30 w-full font-dm-sans"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["ALL", "PENDING", "APPROVED", "CONVERTED_TO_POST", "REJECTED"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-unbounded rounded-lg border transition-colors whitespace-nowrap ${
                statusFilter === s
                  ? "bg-orisun-gold text-orisun-deep border-orisun-gold"
                  : "bg-white/5 text-orisun-ivory/70 border-white/10 hover:bg-white/10"
              }`}
            >
              {s === "CONVERTED_TO_POST" ? "Published" : s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Report cards */}
      <div className="space-y-4">
        {filtered.map((report) => (
          <div
            key={report.id}
            className={`border rounded-xl overflow-hidden transition-all hover:bg-white/[0.035] ${
              report.pinnedToTicker
                ? "bg-orisun-crimson/[0.04] border-orisun-crimson/25"
                : "bg-white/[0.02] border-orisun-gold/10"
            }`}
          >
            {/* Card header */}
            <div className="p-5 flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-unbounded uppercase font-bold border ${STATUS_STYLES[report.status]}`}>
                    {report.status.replace(/_/g, " ")}
                  </span>
                  {report.pinnedToTicker && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-unbounded uppercase font-bold border bg-orisun-crimson/15 text-orisun-crimson border-orisun-crimson/30 animate-pulse">
                      <Radio size={9} /> Live Ticker
                    </span>
                  )}
                  <span className="text-orisun-ivory/30 text-xs font-dm-sans">
                    {format(new Date(report.createdAt), "MMM d, yyyy · h:mm a")}
                  </span>
                </div>

                <h3 className="font-fraunces text-lg text-orisun-ivory leading-snug mb-1 truncate">
                  {report.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-orisun-ivory/50 font-dm-sans">
                  <span className="flex items-center gap-1">
                    <Eye size={11} /> {report.reporterName}
                  </span>
                  {report.reporterEmail && (
                    <span className="flex items-center gap-1">
                      <Mail size={11} /> {report.reporterEmail}
                    </span>
                  )}
                  {report.reporterPhone && (
                    <span className="flex items-center gap-1">
                      <Phone size={11} /> {report.reporterPhone}
                    </span>
                  )}
                  {report.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {report.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                <button
                  onClick={() => setExpanded(expanded === report.id ? null : report.id)}
                  className="px-3 py-1.5 text-xs font-unbounded text-orisun-ivory/60 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {expanded === report.id ? "Collapse" : "Expand"}
                </button>

                {/* Approve / Reject — only for PENDING */}
                {report.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleAction(report.id, "APPROVED")}
                      disabled={!!loading}
                      className="px-3 py-1.5 text-xs font-unbounded text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {loading === `${report.id}-APPROVED` ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(report.id, "REJECTED")}
                      disabled={!!loading}
                      className="px-3 py-1.5 text-xs font-unbounded text-orisun-crimson bg-orisun-crimson/10 border border-orisun-crimson/20 rounded-lg hover:bg-orisun-crimson/20 transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {loading === `${report.id}-REJECTED` ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} />}
                      Reject
                    </button>
                  </>
                )}

                {/* Publish as Article — only for APPROVED */}
                {report.status === "APPROVED" && (
                  <button
                    onClick={() => handleAction(report.id, "CONVERT")}
                    disabled={!!loading}
                    className="px-3 py-1.5 text-xs font-unbounded text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors disabled:opacity-50 flex items-center gap-1"
                  >
                    {loading === `${report.id}-CONVERT` ? <Loader2 size={12} className="animate-spin" /> : <FileText size={12} />}
                    Publish as Article
                  </button>
                )}

                {/* Pin / Unpin Live Ticker — available on APPROVED and CONVERTED_TO_POST */}
                {(report.status === "APPROVED" || report.status === "CONVERTED_TO_POST") && (
                  <button
                    onClick={() => handleAction(report.id, report.pinnedToTicker ? "UNPIN_TICKER" : "PIN_TICKER")}
                    disabled={!!loading}
                    className={`px-3 py-1.5 text-xs font-unbounded rounded-lg border transition-colors disabled:opacity-50 flex items-center gap-1 ${
                      report.pinnedToTicker
                        ? "text-orisun-crimson bg-orisun-crimson/10 border-orisun-crimson/20 hover:bg-orisun-crimson/20"
                        : "text-orisun-ivory/60 bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                    title={report.pinnedToTicker ? "Unpin from Live Ticker" : "Pin to Live Ticker"}
                  >
                    {loading === `${report.id}-PIN_TICKER` || loading === `${report.id}-UNPIN_TICKER`
                      ? <Loader2 size={12} className="animate-spin" />
                      : report.pinnedToTicker ? <PinOff size={12} /> : <Pin size={12} />
                    }
                    {report.pinnedToTicker ? "Unpin" : "Pin Ticker"}
                  </button>
                )}

                <button
                  onClick={() => handleDelete(report.id, report.title)}
                  disabled={!!loading}
                  className="w-8 h-8 text-orisun-ivory/40 hover:text-orisun-crimson bg-white/5 border border-white/10 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  {loading === `${report.id}-delete` ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                </button>
              </div>
            </div>

            {/* Expandable body */}
            {expanded === report.id && (
              <div className="border-t border-white/5 p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2">
                  <p className="text-orisun-ivory/50 text-xs font-unbounded uppercase tracking-widest mb-2">Full Account</p>
                  <p className="text-orisun-ivory/80 text-sm font-dm-sans leading-relaxed whitespace-pre-wrap">
                    {report.description}
                  </p>
                </div>
                {report.mediaUrl && (
                  <div>
                    <p className="text-orisun-ivory/50 text-xs font-unbounded uppercase tracking-widest mb-2">Submitted Media</p>
                    {report.mediaUrl.match(/\.(mp4|webm|mov)$/i) ? (
                      <video src={report.mediaUrl} controls className="w-full rounded-lg max-h-48 object-cover" />
                    ) : (
                      <img src={report.mediaUrl} alt="Report evidence" className="w-full rounded-lg max-h-48 object-cover" />
                    )}
                    <a
                      href={report.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-orisun-gold text-xs font-dm-sans mt-2 hover:underline"
                    >
                      <ArrowUpRight size={12} /> Open full size
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-white/5 rounded-xl">
            <Eye size={32} className="text-orisun-ivory/20 mx-auto mb-3" />
            <p className="text-orisun-ivory/40 font-dm-sans text-sm">
              {search || statusFilter !== "ALL" ? "No reports match your filter." : "No eye-witness reports submitted yet."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
