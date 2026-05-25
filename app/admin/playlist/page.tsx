import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import { Music, Upload, Play, Trash2, Clock } from "lucide-react";

export default async function PlaylistManager() {
  await requireRole("admin", "presenter");

  // Placeholder data — replace with real DB query once AudioFile uploads are wired up
  const tracks = [
    { id: "1", title: "Igbomina Anthem",    duration: "3:45", uploadedBy: "Admin" },
    { id: "2", title: "Morning Drive Jingle", duration: "0:30", uploadedBy: "OAP Presenter" },
    { id: "3", title: "Station ID Bumper",    duration: "0:10", uploadedBy: "Admin" },
  ];

  return (
    <div className="flex-1">
      <AdminTopBar
        title="Playlist Manager"
        subtitle="Manage station jingles, IDs, and music library"
      />

      <main className="p-6">
        {/* Upload zone */}
        <div className="w-full border-2 border-dashed border-orisun-gold/20 rounded-sm bg-white/[0.01] flex flex-col items-center justify-center py-10 mb-8 hover:border-orisun-gold/40 hover:bg-white/[0.03] transition-all cursor-pointer group">
          <div className="w-14 h-14 bg-orisun-gold/10 rounded-sm flex items-center justify-center mb-4 group-hover:bg-orisun-gold/20 transition-colors">
            <Upload size={24} className="text-orisun-gold" />
          </div>
          <p className="font-fraunces text-orisun-ivory text-lg mb-1">Upload Audio Files</p>
          <p className="text-orisun-ivory/40 text-sm font-dm-sans">MP3, WAV, AAC — max 50 MB per file</p>
        </div>

        {/* Track list */}
        <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-fraunces text-orisun-ivory text-lg">Audio Library</h3>
            <span className="text-xs text-orisun-ivory/40 font-dm-sans">{tracks.length} files</span>
          </div>
          <ul className="divide-y divide-white/5">
            {tracks.map((track, i) => (
              <li key={track.id} className="flex items-center gap-5 px-6 py-4 hover:bg-white/[0.03] transition-colors group">
                <span className="text-orisun-ivory/20 text-xs font-mono w-4">{i + 1}</span>
                <div className="w-8 h-8 bg-orisun-gold/10 rounded flex items-center justify-center flex-shrink-0">
                  <Music size={14} className="text-orisun-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-fraunces text-orisun-ivory truncate">{track.title}</p>
                  <p className="text-xs text-orisun-ivory/50 font-dm-sans mt-0.5">Uploaded by {track.uploadedBy}</p>
                </div>
                <div className="flex items-center gap-1 text-orisun-ivory/40 text-xs font-mono">
                  <Clock size={12} />
                  {track.duration}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 bg-orisun-gold/10 hover:bg-orisun-gold/20 rounded flex items-center justify-center text-orisun-gold transition-colors">
                    <Play size={14} />
                  </button>
                  <button className="w-8 h-8 bg-orisun-crimson/10 hover:bg-orisun-crimson/20 rounded flex items-center justify-center text-orisun-crimson transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
