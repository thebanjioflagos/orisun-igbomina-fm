"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Mic, Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Dedication {
  id: string;
  sender: string;
  message: string;
  songRequest: string | null;
  status: string;
  createdAt: Date;
}

interface DedicationActionsProps {
  dedications: Dedication[];
}

export default function DedicationActions({ dedications: initial }: DedicationActionsProps) {
  const router = useRouter();
  const [dedications, setDedications] = useState(initial);
  const [loading, setLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  async function updateStatus(id: string, status: string) {
    setLoading(`${id}-${status}`);
    try {
      const res = await fetch(`/api/admin/dedications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(await res.text());
      setDedications((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    } catch (e) {
      alert("Failed to update dedication. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  async function deleteDedication(id: string) {
    if (!confirm("Delete this dedication permanently?")) return;
    setLoading(`${id}-delete`);
    try {
      const res = await fetch(`/api/admin/dedications/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setDedications((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      alert("Failed to delete dedication.");
    } finally {
      setLoading(null);
    }
  }

  const filtered = dedications.filter((d) => {
    const matchFilter = filter === "ALL" || d.status === filter;
    const matchSearch =
      d.sender.toLowerCase().includes(search.toLowerCase()) ||
      d.message.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const statuses = ["ALL", "PENDING", "APPROVED", "READ_ON_AIR", "REJECTED"];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white/5 border border-orisun-gold/10 rounded-sm px-3 py-2 w-full sm:w-72">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orisun-ivory/30 flex-shrink-0">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search dedications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-orisun-ivory text-sm outline-none placeholder:text-orisun-ivory/30 w-full"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-unbounded rounded border transition-colors ${
                filter === s
                  ? "bg-orisun-gold text-orisun-deep border-orisun-gold"
                  : "bg-white/5 text-orisun-ivory/80 border-white/10 hover:bg-white/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((dedication) => (
          <div
            key={dedication.id}
            className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-5 flex flex-col md:flex-row gap-6 md:items-center transition-colors hover:bg-white/[0.04]"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded text-[9px] font-unbounded uppercase font-bold tracking-widest ${
                  dedication.status === "PENDING" ? "bg-orisun-gold/20 text-orisun-gold border border-orisun-gold/30" :
                  dedication.status === "APPROVED" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                  dedication.status === "READ_ON_AIR" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                  "bg-orisun-crimson/20 text-orisun-crimson border border-orisun-crimson/30"
                }`}>
                  {dedication.status.replace(/_/g, " ")}
                </span>
                <span className="text-xs text-orisun-ivory/40 font-dm-sans">
                  {format(new Date(dedication.createdAt), "MMM d, h:mm a")}
                </span>
              </div>

              <h4 className="font-fraunces text-lg text-orisun-ivory mb-1">From: {dedication.sender}</h4>
              <p className="text-sm text-orisun-ivory/80 font-dm-sans leading-relaxed line-clamp-3">
                &ldquo;{dedication.message}&rdquo;
              </p>

              {dedication.songRequest && (
                <div className="mt-3 inline-flex items-center gap-2 bg-orisun-gold/5 border border-orisun-gold/20 rounded px-3 py-1.5 text-xs font-dm-sans text-orisun-gold">
                  <Mic size={12} />
                  <strong>Request:</strong> {dedication.songRequest}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 flex-wrap">
              {dedication.status === "PENDING" && (
                <>
                  <button
                    onClick={() => updateStatus(dedication.id, "APPROVED")}
                    disabled={!!loading}
                    className="flex items-center gap-1 px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 rounded transition-colors text-xs font-unbounded disabled:opacity-50"
                  >
                    {loading === `${dedication.id}-APPROVED` ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(dedication.id, "REJECTED")}
                    disabled={!!loading}
                    className="flex items-center gap-1 px-3 py-2 bg-orisun-crimson/10 text-orisun-crimson hover:bg-orisun-crimson/20 border border-orisun-crimson/20 rounded transition-colors text-xs font-unbounded disabled:opacity-50"
                  >
                    {loading === `${dedication.id}-REJECTED` ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                    Reject
                  </button>
                </>
              )}

              {dedication.status === "APPROVED" && (
                <button
                  onClick={() => updateStatus(dedication.id, "READ_ON_AIR")}
                  disabled={!!loading}
                  className="flex items-center gap-1 px-3 py-2 bg-orisun-gold text-orisun-deep hover:bg-orisun-gold/90 rounded transition-colors text-xs font-unbounded disabled:opacity-50"
                >
                  {loading === `${dedication.id}-READ_ON_AIR` ? <Loader2 size={14} className="animate-spin" /> : <Mic size={14} />}
                  Mark Read On-Air
                </button>
              )}

              <button
                onClick={() => deleteDedication(dedication.id)}
                disabled={!!loading}
                className="flex items-center gap-1 px-3 py-2 bg-white/5 text-orisun-ivory/40 hover:text-orisun-crimson hover:bg-orisun-crimson/10 border border-white/10 rounded transition-colors text-xs disabled:opacity-50"
                title="Delete"
              >
                {loading === `${dedication.id}-delete` ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-white/5 rounded-sm">
            <p className="text-orisun-ivory/40 font-dm-sans">No dedications match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
