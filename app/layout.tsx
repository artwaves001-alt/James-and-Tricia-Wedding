import type { Metadata, Viewport } from "next";
import { Great_Vibes, Cormorant_Garamond, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const script = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-script" });
const cormorant = Cormorant_Garamond({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-cormorant" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "James & Tricia — January 8, 2027",
  description: "You are invited to the wedding of James Matthew Chua and Tricia Lhyn Sanchez.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FFF9F0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${script.variable} ${cormorant.variable} ${playfair.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
