import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Easy VIP Transfer | Bodrum Luxury Chauffeur & Airport Transfer',
  description: 'Milas-Bodrum Havalimanı (BJV), Yalıkavak Marina, Mandarin Oriental ve Amanruya için 7/24 Mercedes-Maybach ve VIP Vito transfer hizmeti. Sabit fiyat garantisi.',
  keywords: ['Bodrum VIP Transfer', 'Bodrum Havalimanı Transfer', 'Milas Bodrum BJV VIP Transfer', 'Yalıkavak Marina Transfer', 'Mandarin Oriental Bodrum Transfer', 'Amanruya Transfer', 'Bodrum Maybach Kiralama', 'Şoförlü VIP Araç Bodrum'],
  authors: [{ name: 'Easy VIP Transfer' }],
  openGraph: {
    title: 'Easy VIP Transfer | Bodrum First Class Chauffeur',
    description: 'Milas-Bodrum Havalimanı (BJV) & Yalıkavak Marina için 7/24 Mercedes Maybach & VIP Vito transferi.',
    url: 'https://easyviptransfer.com',
    siteName: 'Easy VIP Transfer Bodrum',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Mercedes-Maybach VIP Transfer Bodrum',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy VIP Transfer | Bodrum First Class Chauffeur',
    description: 'Bodrum ve Ege koylarında 7/24 kesintisiz Maybach ve VIP Vito transferi.',
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'],
  },
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`scroll-smooth ${playfair.variable} ${montserrat.variable} bg-[#030303] text-zinc-200 antialiased`}>
      <body className="bg-[#030303] min-h-screen flex flex-col font-sans selection:bg-white selection:text-black relative">
        {/* Global Cinematic Noise Overlay */}
        <div 
          className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04] mix-blend-difference"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
