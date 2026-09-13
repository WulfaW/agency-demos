import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wulfa Digital Studio | Lüks Markalar İçin Dijital Mühendislik",
  description: "Sıradan şablonlar değil; VIP turizm, klinik, mimarlık ve lüks markalar için yüksek dönüşümlü dijital bayrak gemileri inşa ediyoruz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0B0B0C] text-[#EDEDED] flex flex-col antialiased selection:bg-[#C5A880] selection:text-black">
        <Navbar />
        <main className="flex-1 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}