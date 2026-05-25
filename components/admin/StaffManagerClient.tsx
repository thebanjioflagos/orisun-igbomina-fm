"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Mail, UserX, ChevronDown, Loader2, UserPlus } from "lucide-react";
import { format } from "date-fns";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

interface StaffManagerClientProps {
  staff: User[];
  currentUserId: string;
}

export default function StaffManagerClient({ staff: initial, currentUserId }: StaffManagerClientProps) {
  const router = useRouter();
  const [staff, setStaff] = useState(initial);
  const [loading, setLoading] = useState<string | null>(null);
  const [changingRole, setChangingRole] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("correspondent");
  const [invitePassword, setInvitePassword] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState("");

  async function changeRole(id: string, role: string) {
    setLoading(`${id}-role`);
    try {
      const res = await fetch(`/api/admin/staff/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      setStaff((prev) => prev.map((u) => (u.id === id ? { ...u, role: role.toUpperCase() } : u)));
      setChangingRole(null);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to update role.");
    } finally {
      setLoading(null);
    }
  }

  async function removeStaff(id: string, name: string) {
    if (!confirm(`Remove ${name} from the team? This action cannot be undone.`)) return;
    setLoading(`${id}-delete`);
    try {
      const res = await fetch(`/api/admin/staff/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      setStaff((prev) => prev.filter((u) => u.id !== id));
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to remove staff member.");
    } finally {
      setLoading(null);
    }
  }

  async function inviteStaff(e: React.FormEvent) {
    e.preventDefault();
    setInviteLoading(true);
    setInviteError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inviteName, email: inviteEmail, password: invitePassword, role: inviteRole }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create account.");
      }
      const newUser = await res.json();
      setStaff((prev) => [newUser, ...prev]);
      setShowInviteModal(false);
      setInviteEmail("");
      setInviteName("");
      setInvitePassword("");
      setInviteRole("correspondent");
    } catch (e: unknown) {
      setInviteError(e instanceof Error ? e.message : "Failed to create account.");
    } finally {
      setInviteLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-orisun-ivory/60 font-dm-sans">
          Total Staff Members: <strong className="text-orisun-ivory">{staff.length}</strong>
        </p>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 bg-orisun-gold text-orisun-deep px-4 py-2 rounded font-unbounded text-sm hover:bg-orisun-gold/90 transition-colors"
        >
          <UserPlus size={16} />
          Invite Staff
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((user) => (
          <div
            key={user.id}
            className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6 relative group overflow-hidden transition-all hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-sm bg-orisun-gold/10 border border-orisun-gold/20 flex items-center justify-center font-unbounded text-orisun-gold font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className={`px-2 py-1 rounded text-[9px] font-unbounded uppercase font-bold tracking-widest flex items-center gap-1 ${
                user.role === "ADMIN" ? "bg-orisun-gold/20 text-orisun-gold border border-orisun-gold/30" :
                user.role === "PRESENTER" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                "bg-green-500/20 text-green-400 border border-green-500/30"
              }`}>
                {user.role === "ADMIN" && <Shield size={10} />}
                {user.role}
              </span>
            </div>

            <h4 className="font-fraunces text-xl text-orisun-ivory mb-1">{user.name}</h4>
            <div className="flex items-center gap-2 text-sm text-orisun-ivory/60 font-dm-sans mb-4">
              <Mail size={14} />
              <span className="truncate">{user.email}</span>
            </div>
            <p className="text-xs text-orisun-ivory/40 font-dm-sans mb-6">
              Joined: {format(new Date(user.createdAt), "MMMM d, yyyy")}
            </p>

            {user.id !== currentUserId && (
              <div className="pt-4 border-t border-white/5 flex gap-2">
                {changingRole === user.id ? (
                  <div className="flex-1 flex gap-1">
                    {["admin", "presenter", "correspondent"].map((r) => (
                      <button
                        key={r}
                        onClick={() => changeRole(user.id, r)}
                        disabled={!!loading}
                        className="flex-1 py-1.5 text-[9px] font-unbounded uppercase rounded border border-orisun-gold/30 text-orisun-gold hover:bg-orisun-gold/10 transition-colors disabled:opacity-50"
                      >
                        {loading === `${user.id}-role` ? <Loader2 size={12} className="animate-spin mx-auto" /> : r.slice(0, 4)}
                      </button>
                    ))}
                    <button
                      onClick={() => setChangingRole(null)}
                      className="px-2 py-1.5 text-[9px] font-unbounded text-orisun-ivory/40 hover:text-orisun-ivory"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setChangingRole(user.id)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-white/5 hover:bg-white/10 text-orisun-ivory text-xs font-unbounded rounded border border-white/10 transition-colors"
                    >
                      Change Role <ChevronDown size={12} />
                    </button>
                    <button
                      onClick={() => removeStaff(user.id, user.name)}
                      disabled={!!loading}
                      className="px-3 py-2 bg-orisun-crimson/10 hover:bg-orisun-crimson/20 text-orisun-crimson text-xs font-unbounded rounded border border-orisun-crimson/20 transition-colors disabled:opacity-50"
                      title="Remove staff member"
                    >
                      {loading === `${user.id}-delete` ? <Loader2 size={14} className="animate-spin" /> : <UserX size={14} />}
                    </button>
                  </>
                )}
              </div>
            )}

            {user.id === currentUserId && (
              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] font-unbounded text-orisun-gold/60 uppercase tracking-widest">You</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0800] border border-orisun-gold/20 rounded-sm p-8 w-full max-w-md">
            <h2 className="font-fraunces text-2xl text-orisun-ivory mb-2">Invite Staff Member</h2>
            <p className="text-orisun-ivory/50 text-sm font-dm-sans mb-6">Create a new account for your team.</p>

            <form onSubmit={inviteStaff} className="space-y-4">
              <div>
                <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-dm-sans text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors"
                  placeholder="Adebayo Ogundimu"
                />
              </div>
              <div>
                <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-dm-sans text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors"
                  placeholder="adebayo@orisunfm.com"
                />
              </div>
              <div>
                <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Temporary Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={invitePassword}
                  onChange={(e) => setInvitePassword(e.target.value)}
                  className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-dm-sans text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors"
                  placeholder="Min 8 characters"
                />
              </div>
              <div>
                <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-dm-sans text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors"
                >
                  <option value="correspondent">Correspondent</option>
                  <option value="presenter">Presenter</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {inviteError && (
                <p className="text-orisun-crimson text-sm font-dm-sans bg-orisun-crimson/10 border border-orisun-crimson/20 rounded px-3 py-2">
                  {inviteError}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-2.5 bg-white/5 text-orisun-ivory/70 text-sm font-unbounded rounded border border-white/10 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inviteLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orisun-gold text-orisun-deep text-sm font-unbounded rounded hover:bg-orisun-gold/90 transition-colors disabled:opacity-60"
                >
                  {inviteLoading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
                  {inviteLoading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
