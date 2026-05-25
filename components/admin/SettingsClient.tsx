"use client";

import { useState } from "react";
import { Shield, Radio, Globe, Bell, Key, Save, Loader2 } from "lucide-react";

interface SettingsClientProps {
  initialSettings: {
    stationName: string;
    frequency: string;
    tagline: string;
    description: string;
    streamUrl: string;
    onAirBadge: boolean;
    notifyDedication: boolean;
    notifyArticleReview: boolean;
    notifyAdBooking: boolean;
    notifySubscriber: boolean;
  };
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...settings,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save settings");

      setMessage({ type: "success", text: "Configuration saved successfully!" });
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred";
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {message && (
        <div className={`p-4 rounded border text-sm font-dm-sans ${
          message.type === "success" 
            ? "bg-green-500/10 text-green-400 border-green-500/20" 
            : "bg-orisun-crimson/10 text-orisun-crimson border-orisun-crimson/20"
        }`}>
          {message.text}
        </div>
      )}

      {/* Station Identity */}
      <section className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-orisun-gold/10 rounded-sm flex items-center justify-center">
            <Radio size={16} className="text-orisun-gold" />
          </div>
          <h2 className="font-fraunces text-orisun-ivory text-lg font-bold">Station Identity</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Station Name</label>
            <input
              type="text"
              value={settings.stationName}
              onChange={(e) => setSettings({ ...settings, stationName: e.target.value })}
              className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-dm-sans text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Frequency</label>
            <input
              type="text"
              value={settings.frequency}
              onChange={(e) => setSettings({ ...settings, frequency: e.target.value })}
              className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-dm-sans text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-dm-sans text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Station Description</label>
            <textarea
              rows={3}
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-dm-sans text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors resize-none"
            />
          </div>
        </div>
      </section>

      {/* Stream Settings */}
      <section className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-500/10 rounded-sm flex items-center justify-center">
            <Globe size={16} className="text-blue-400" />
          </div>
          <h2 className="font-fraunces text-orisun-ivory text-lg font-bold">Live Stream</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Stream URL</label>
            <input
              type="url"
              value={settings.streamUrl}
              onChange={(e) => setSettings({ ...settings, streamUrl: e.target.value })}
              placeholder="https://stream.orisunfm.com/live"
              className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-mono text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors"
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-black/30 border border-white/5 rounded">
            <div>
              <p className="text-orisun-ivory text-sm font-dm-sans font-medium">Show &quot;On Air&quot; badge</p>
              <p className="text-orisun-ivory/40 text-xs font-dm-sans mt-0.5">Display the live indicator on the homepage when streaming</p>
            </div>
            <div 
              onClick={() => setSettings({ ...settings, onAirBadge: !settings.onAirBadge })}
              className={`w-10 h-6 rounded-full relative cursor-pointer border transition-colors ${
                settings.onAirBadge 
                  ? "bg-orisun-gold/30 border-orisun-gold/40" 
                  : "bg-white/10 border-white/10"
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full shadow transition-all ${
                settings.onAirBadge ? "right-1 bg-orisun-gold" : "left-1 bg-white/30"
              }`} />
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-green-500/10 rounded-sm flex items-center justify-center">
            <Bell size={16} className="text-green-400" />
          </div>
          <h2 className="font-fraunces text-orisun-ivory text-lg font-bold">Notifications</h2>
        </div>
        <div className="space-y-3">
          {[
            { 
              key: "notifyDedication" as const, 
              label: "New dedication submitted", 
              desc: "Alert presenters when a fan submits a dedication" 
            },
            { 
              key: "notifyArticleReview" as const, 
              label: "Article submitted for review", 
              desc: "Alert editors when a correspondent submits a draft" 
            },
            { 
              key: "notifyAdBooking" as const, 
              label: "New ad booking received", 
              desc: "Alert admin when a new advertising request comes in" 
            },
            { 
              key: "notifySubscriber" as const, 
              label: "New newsletter subscriber", 
              desc: "Send daily digest of new email subscribers" 
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-black/30 border border-white/5 rounded">
              <div>
                <p className="text-orisun-ivory text-sm font-dm-sans font-medium">{item.label}</p>
                <p className="text-orisun-ivory/40 text-xs font-dm-sans mt-0.5">{item.desc}</p>
              </div>
              <div 
                onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key] })}
                className={`w-10 h-6 rounded-full relative cursor-pointer border transition-colors ${
                  settings[item.key] 
                    ? "bg-orisun-gold/30 border-orisun-gold/40" 
                    : "bg-white/10 border-white/10"
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full shadow transition-all ${
                  settings[item.key] ? "right-1 bg-orisun-gold" : "left-1 bg-white/30"
                }`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="bg-white/[0.02] border border-orisun-crimson/10 rounded-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-orisun-crimson/10 rounded-sm flex items-center justify-center">
            <Shield size={16} className="text-orisun-crimson" />
          </div>
          <h2 className="font-fraunces text-orisun-ivory text-lg font-bold">Security</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">Current Password</label>
              <input 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-dm-sans text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors" 
              />
            </div>
            <div>
              <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-1.5">New Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-black/50 border border-orisun-gold/20 rounded px-3 py-2.5 text-sm font-dm-sans text-orisun-ivory focus:outline-none focus:border-orisun-gold transition-colors" 
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-orisun-ivory/40 font-dm-sans">
            <Key size={12} />
            Passwords must be at least 8 characters, include uppercase, lowercase and a number.
          </div>
        </div>
      </section>

      {/* Save button */}
      <div className="flex justify-end pb-6">
        <button 
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-orisun-gold text-orisun-deep px-8 py-3 rounded font-unbounded text-sm hover:bg-orisun-gold/90 transition-colors disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {loading ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
