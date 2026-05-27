import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kontrakan Wanasari – Hunian Strategis di Karawang",
  description: "Temukan kontrakan terbaik di Desa Wanasari, Telukjambe Barat, Karawang. Dekat kawasan industri, Stasiun Whoosh, dan Grand Outlet Karawang.",
  keywords: ["kontrakan karawang", "sewa kontrakan wanasari", "hunian karawang", "kontrakan dekat industri karawang"],
  openGraph: {
    title: "Kontrakan Wanasari – Hunian Strategis di Karawang",
    description: "Temukan kontrakan terbaik di Desa Wanasari, Karawang. Dekat kawasan industri dan fasilitas kota.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#FAF7FF]">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
