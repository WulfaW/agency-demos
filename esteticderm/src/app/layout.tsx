import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant" 
});

const jost = Jost({ 
  subsets: ["latin"], 
  variable: "--font-jost" 
});

export const metadata: Metadata = {
  title: "Esteticderm | Lüks Medikal Estetik & Güzellik",
  description: "İstanbul'un önde gelen medikal estetik ve güzellik merkezi. Doğallığın en profesyonel hali.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${cormorant.variable} ${jost.variable} font-sans bg-cream text-charcoal antialiased selection:bg-gold-500/30`}>
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
