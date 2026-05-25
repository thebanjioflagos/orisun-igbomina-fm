import { requireRole } from "@/lib/auth-helpers";
import AdminTopBar from "@/components/admin/TopBar";
import SettingsClient from "@/components/admin/SettingsClient";

export default async function AdminSettings() {
  await requireRole("admin");

  // In a real application, you might load this from a DB table
  const defaultSettings = {
    stationName: "Orisun Igbomina FM",
    frequency: "102.1 FM",
    tagline: "The Voice of Igbomina Land",
    description: "Orisun Igbomina FM is the premier radio station serving the Igbomina community with news, music, and culture.",
    streamUrl: "",
    onAirBadge: true,
    notifyDedication: true,
    notifyArticleReview: true,
    notifyAdBooking: true,
    notifySubscriber: false,
  };

  return (
    <div className="flex-1">
      <AdminTopBar
        title="Station Settings"
        subtitle="Manage global platform configuration"
      />

      <main className="p-6 max-w-4xl">
        <SettingsClient initialSettings={defaultSettings} />
      </main>
    </div>
  );
}
