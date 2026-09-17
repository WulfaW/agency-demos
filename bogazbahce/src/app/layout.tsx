import type { Metadata } from "next";
import { Lora, Lato } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boğaz Bahçe | Lüks Etkinlik ve Kır Düğünü Mekanı",
  description: "İstanbul Sarıyer'de boğaz manzaralı prestijli etkinlik ve kır düğünü mekanı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${lora.variable} ${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-luxury-bg text-luxury-text">
        {children}
      </body>
    </html>
  );
}
