import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA CORE // Next-Gen AI & High-End Software Engineering",
  description:
    "Ultra-lüks web & mobil sistemler, otonom AI ajanları ve yüksek dönüşümlü kurumsal yazılım mühendisliği.",
  keywords: [
    "AI Agency",
    "Next.js Development",
    "Yapay Zeka Otomasyon",
    "VIP Web Yazılım",
    "SaaS Geliştirme",
    "Autonomous Agents",
  ],
  authors: [{ name: "AURA CORE Agency" }],
  openGraph: {
    title: "AURA CORE // Next-Gen AI & High-End Software Engineering",
    description: "Ultra-lüks web & mobil sistemler ve otonom AI yazılımları.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#050505] text-[#ededed] antialiased selection:bg-white selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
