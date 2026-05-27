"use client";

import { useState } from "react";
import { Music, Upload, Play, Trash2, Clock, Loader2 } from "lucide-react";

export default function PlaylistManagerClient({ initialTracks }: { initialTracks: any[] }) {
  const [tracks, setTracks] = useState(initialTracks);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      // Upload the file
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      
      // Add the new track to the list (In a real app, you'd save this to Prisma AudioFile model)
      const newTrack = {
        id: Date.now().toString(),
        title: file.name,
        duration: "Unknown", // Would need audio context to parse duration
        uploadedBy: "Admin",
        url: data.url
      };
      
      setTracks([newTrack, ...tracks]);
    } catch (err: any) {
      alert("Failed to upload audio: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeTrack = (id: string) => {
    if (confirm("Are you sure you want to remove this audio file?")) {
      setTracks(tracks.filter(t => t.id !== id));
      // Real app: DELETE request to API
    }
  };

  return (
    <>
      {/* Upload zone */}
      <div className="relative w-full border-2 border-dashed border-orisun-gold/20 rounded-sm bg-white/[0.01] flex flex-col items-center justify-center py-10 mb-8 hover:border-orisun-gold/40 hover:bg-white/[0.03] transition-all cursor-pointer group overflow-hidden">
        <div className="w-14 h-14 bg-orisun-gold/10 rounded-sm flex items-center justify-center mb-4 group-hover:bg-orisun-gold/20 transition-colors">
          {uploading ? <Loader2 size={24} className="text-orisun-gold animate-spin" /> : <Upload size={24} className="text-orisun-gold" />}
        </div>
        <p className="font-fraunces text-orisun-ivory text-lg mb-1">
          {uploading ? "Uploading Audio..." : "Upload Audio Files"}
        </p>
        <p className="text-orisun-ivory/40 text-sm font-dm-sans">MP3, WAV, AAC — max 50 MB per file</p>
        
        <input 
          type="file" 
          accept="audio/*" 
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          onChange={handleFileUpload}
          disabled={uploading}
        />
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
                <button 
                  className="w-8 h-8 bg-orisun-gold/10 hover:bg-orisun-gold/20 rounded flex items-center justify-center text-orisun-gold transition-colors"
                  onClick={() => {
                    if (track.url) {
                      const audio = new Audio(track.url);
                      audio.play().catch(() => alert("Could not play audio"));
                    } else {
                      alert("Demo track cannot be played.");
                    }
                  }}
                >
                  <Play size={14} />
                </button>
                <button 
                  onClick={() => removeTrack(track.id)}
                  className="w-8 h-8 bg-orisun-crimson/10 hover:bg-orisun-crimson/20 rounded flex items-center justify-center text-orisun-crimson transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
