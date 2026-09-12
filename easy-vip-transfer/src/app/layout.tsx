import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { PostHogProvider } from '@/components/providers/PostHogProvider';
import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-serif', // Using this variable for headings everywhere
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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
        url: '/images/wix_img_2.jpg',
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
    images: ['/images/wix_img_2.jpg'],
  },
  other: {
    'strix-verification': 'strix-verify-75e0049732f19316eb501ad06eaa0b3b',
  },
};

import StarlightBackground from '@/components/ui/StarlightBackground';
import FloatingChatWidget from '@/components/FloatingChatWidget';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`scroll-smooth ${montserrat.variable} ${inter.variable} bg-[#030303] text-zinc-200 antialiased`}>
      <body className="bg-[#030303] min-h-screen flex flex-col font-sans selection:bg-white selection:text-black relative">
        <ScrollProgress />
        <Preloader />
        <StarlightBackground />
        
        {/* Film grain / noise overlay for texture */}
        <div 
          className="pointer-events-none fixed inset-0 z-[1000] h-full w-full opacity-[0.03] mix-blend-difference"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />
        
        <PostHogProvider>
          <LanguageProvider>
            {children}
            <FloatingChatWidget />
          </LanguageProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
