import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Hotel Crown Patliputra | Patna — Book Direct",
  description: "Hotel Crown Patliputra — A Unit of RAV Hospitality. Central Patna stay near Bihar Museum, 5km from PAT Airport. Rooms, Spice Restaurant, Rooftop, 20,000 sq ft banquet. 4A Vivekanand Park Rd, Patliputra Colony.",
  openGraph: {
    title: "Hotel Crown Patliputra — Experience Heart of Patna",
    description: "Central Patna stay with banquet grandeur, rooftop views and warm hospitality.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
