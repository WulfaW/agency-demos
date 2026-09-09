import React from 'react';
import Navbar from '@/components/Navbar';
import BodrumRouteMap from '@/components/BodrumRouteMap';
import LuxuryDestinations from '@/components/LuxuryDestinations';
import FaqAndFooter from '@/components/FaqAndFooter';
import StickyMobileBar from '@/components/StickyMobileBar';

export default function RoutesPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 relative selection:bg-[#E5D3B3] selection:text-black pb-16 md:pb-0 pt-24">
      <Navbar />
      
      <div className="pt-10">
        <div className="text-center mb-8">
          <p className="text-sm font-sans tracking-[0.2em] text-[#E5D3B3] uppercase mb-3">Popüler Rotalar</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">Ege'nin En Seçkin<br/>Destinasyonları</h1>
        </div>
        
        <LuxuryDestinations />
      </div>

      <BodrumRouteMap />

      <FaqAndFooter />
      <StickyMobileBar />
    </main>
  );
}
