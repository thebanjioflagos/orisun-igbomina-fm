"use client";

import { useState, useEffect } from "react";
import { Activity, Database, HardDrive, Cpu, Clock, Server, AlertTriangle, ShieldAlert, RefreshCw } from "lucide-react";

interface SystemStats {
  os: { platform: string; release: string; arch: string; uptime: number };
  memory: { total: number; used: number; percent: string; processRss: number };
  database: { status: string; latencyMs: number };
  process: { uptime: number; nodeVersion: string };
}

export default function SystemDashboardClient({ currentEmail }: { currentEmail: string }) {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false); // Mock for now
  
  const isSuperuser = currentEmail === "techlead@orisunigbominafm.com";

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/system");
      if (!res.ok) throw new Error("Failed to fetch system stats");
      const data = await res.json();
      setStats(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d > 0 ? d + "d " : ""}${h}h ${m}m`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Superuser Warning */}
      {isSuperuser && (
        <div className="bg-orisun-gold/10 border border-orisun-gold/30 rounded p-4 flex items-start gap-4">
          <ShieldAlert className="text-orisun-gold flex-shrink-0 mt-0.5" size={24} />
          <div>
            <h3 className="text-orisun-gold font-unbounded text-sm mb-1 uppercase tracking-widest">Tech Lead Access Granted</h3>
            <p className="text-orisun-ivory/70 text-sm font-dm-sans">
              You are viewing the system dashboard with elevated privileges. Changes made here can directly impact production stability.
            </p>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <h2 className="font-fraunces text-2xl text-orisun-ivory">Real-Time Diagnostics</h2>
        <button 
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-orisun-ivory text-sm font-dm-sans rounded border border-white/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error ? (
        <div className="bg-orisun-crimson/10 border border-orisun-crimson/20 text-orisun-crimson p-4 rounded text-sm font-dm-sans">
          {error}
        </div>
      ) : !stats ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="animate-spin text-orisun-gold" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Node/Server Card */}
          <div className="bg-white/[0.02] border border-white/10 rounded p-5 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Server size={64} />
            </div>
            <div className="flex items-center gap-2 text-orisun-ivory/60 mb-3">
              <Server size={16} />
              <h3 className="font-unbounded text-[10px] uppercase tracking-widest">Node Server</h3>
            </div>
            <div className="space-y-2 font-dm-sans text-sm">
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">Status</span>
                <span className="text-green-400 font-bold">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">Uptime</span>
                <span className="text-orisun-ivory">{formatUptime(stats.process.uptime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">Version</span>
                <span className="text-orisun-ivory">{stats.process.nodeVersion}</span>
              </div>
            </div>
          </div>

          {/* Database Card */}
          <div className="bg-white/[0.02] border border-white/10 rounded p-5 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Database size={64} />
            </div>
            <div className="flex items-center gap-2 text-orisun-ivory/60 mb-3">
              <Database size={16} />
              <h3 className="font-unbounded text-[10px] uppercase tracking-widest">Supabase DB</h3>
            </div>
            <div className="space-y-2 font-dm-sans text-sm">
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">Status</span>
                <span className={stats.database.status === "Connected" ? "text-green-400 font-bold" : "text-orisun-crimson font-bold"}>
                  {stats.database.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">Latency</span>
                <span className="text-orisun-ivory">{stats.database.latencyMs}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">Pooler</span>
                <span className="text-orisun-ivory">Direct (5432)</span>
              </div>
            </div>
          </div>

          {/* Memory Card */}
          <div className="bg-white/[0.02] border border-white/10 rounded p-5 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Cpu size={64} />
            </div>
            <div className="flex items-center gap-2 text-orisun-ivory/60 mb-3">
              <Cpu size={16} />
              <h3 className="font-unbounded text-[10px] uppercase tracking-widest">Memory Usage</h3>
            </div>
            <div className="space-y-2 font-dm-sans text-sm">
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">App Usage</span>
                <span className="text-orisun-ivory">{stats.memory.processRss} MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">System Load</span>
                <span className={parseFloat(stats.memory.percent) > 85 ? "text-orisun-crimson" : "text-orisun-ivory"}>
                  {stats.memory.percent}%
                </span>
              </div>
              <div className="w-full bg-black/40 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${parseFloat(stats.memory.percent) > 85 ? "bg-orisun-crimson" : "bg-orisun-gold"}`}
                  style={{ width: `${stats.memory.percent}%` }}
                />
              </div>
            </div>
          </div>

          {/* OS Host Card */}
          <div className="bg-white/[0.02] border border-white/10 rounded p-5 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <HardDrive size={64} />
            </div>
            <div className="flex items-center gap-2 text-orisun-ivory/60 mb-3">
              <HardDrive size={16} />
              <h3 className="font-unbounded text-[10px] uppercase tracking-widest">Host System</h3>
            </div>
            <div className="space-y-2 font-dm-sans text-sm">
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">Platform</span>
                <span className="text-orisun-ivory uppercase">{stats.os.platform} ({stats.os.arch})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">Release</span>
                <span className="text-orisun-ivory truncate max-w-[100px] text-right">{stats.os.release}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orisun-ivory/50">Host Uptime</span>
                <span className="text-orisun-ivory">{formatUptime(stats.os.uptime)}</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tech Lead Only Tools */}
      {isSuperuser && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 border-t border-white/5 pt-8">
          
          <div className="bg-white/[0.02] border border-orisun-crimson/20 rounded p-6">
            <h3 className="font-fraunces text-xl text-orisun-crimson flex items-center gap-2 mb-2">
              <AlertTriangle size={20} />
              Emergency Maintenance
            </h3>
            <p className="text-orisun-ivory/60 text-sm font-dm-sans mb-6">
              Enable maintenance mode to temporarily block public access to the platform. Only authenticated Admins will be able to access the site.
            </p>
            <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-white/5">
              <div>
                <p className="text-orisun-ivory font-bold text-sm">Maintenance Mode</p>
                <p className="text-orisun-ivory/50 text-xs">Currently {maintenanceMode ? "Enabled" : "Disabled"}</p>
              </div>
              <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`px-4 py-2 rounded font-unbounded text-xs uppercase tracking-widest transition-colors ${
                  maintenanceMode 
                    ? "bg-orisun-crimson text-white hover:bg-red-600" 
                    : "bg-white/10 text-orisun-ivory hover:bg-white/20"
                }`}
              >
                {maintenanceMode ? "Disable" : "Enable"}
              </button>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded p-6">
            <h3 className="font-fraunces text-xl text-orisun-ivory flex items-center gap-2 mb-2">
              <Database size={20} className="text-orisun-gold" />
              Database Operations
            </h3>
            <p className="text-orisun-ivory/60 text-sm font-dm-sans mb-6">
              Perform manual cleanups of expired sessions and unapproved anonymous data to optimize database performance.
            </p>
            <div className="space-y-3">
              <button className="w-full flex justify-between items-center p-3 bg-black/40 hover:bg-white/5 border border-white/5 rounded transition-colors text-left group">
                <div>
                  <p className="text-orisun-ivory text-sm font-dm-sans">Clear Old Error Logs</p>
                  <p className="text-orisun-ivory/40 text-xs mt-0.5">Removes logs older than 30 days</p>
                </div>
                <Activity size={16} className="text-orisun-ivory/30 group-hover:text-orisun-gold transition-colors" />
              </button>
              <button className="w-full flex justify-between items-center p-3 bg-black/40 hover:bg-white/5 border border-white/5 rounded transition-colors text-left group">
                <div>
                  <p className="text-orisun-ivory text-sm font-dm-sans">Optimize DB Indexes</p>
                  <p className="text-orisun-ivory/40 text-xs mt-0.5">Runs VACUUM ANALYZE (PostgreSQL)</p>
                </div>
                <Activity size={16} className="text-orisun-ivory/30 group-hover:text-orisun-gold transition-colors" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
