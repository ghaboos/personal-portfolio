import type { Metadata } from "next";
import "./globals.css";
import "./dashboard.css";

export const metadata: Metadata = { title:"Danial — Creative Developer", description:"Personal portfolio of Danial — projects, skills, creative work and experiments." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
