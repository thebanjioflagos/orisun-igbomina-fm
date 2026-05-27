import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import PlaylistManagerClient from "@/components/admin/PlaylistManagerClient";

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
        <PlaylistManagerClient initialTracks={tracks} />
      </main>
    </div>
  );
}
