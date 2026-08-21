import type { Metadata } from "next";
import "./globals.css";
import "./admin/dashboard.css";
import SiteControls from "./components/SiteControls";

export const metadata: Metadata = {
  title: { default: "Danial — Creative Developer", template: "%s — Danial" },
  description: "Danial's personal portfolio — projects, skills, creative work and experiments.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: { title: "Danial — Creative Developer", description: "Projects, creative work and experiments.", type: "website" },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><SiteControls/>{children}</body></html> }
