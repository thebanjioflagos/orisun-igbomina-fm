import { Metadata } from "next";
import HomeContent from "./home-content";

export const metadata: Metadata = {
  title: "Orisun Igbomina FM 102.1 — Live Radio from Ila-Orangun",
  description: "Listen to Orisun Igbomina FM 102.1 live. Discover Igbomina news, culture, and heritage from the heart of Osun State.",
  openGraph: {
    title: "Orisun Igbomina FM 102.1 — The Heart of Igbominaland",
    description: "Broadcasting culture and excellence from Ila-Orangun to the world.",
    images: ["/images/banner.jpg"],
  }
};

export default function Home() {
  return <HomeContent />;
}
