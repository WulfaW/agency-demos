import React from 'react';
import Navbar from '@/components/Navbar';
import FaqAndFooter from '@/components/FaqAndFooter';

export default function Sartlar() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 relative">
      <Navbar />
      <div className="pt-40 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[#E5D3B3] mb-8">İptal ve İade Şartları</h1>
        <div className="prose prose-invert prose-zinc max-w-none font-sans font-light text-sm text-zinc-300 space-y-6">
          <p>
            Müşteri memnuniyetini ön planda tutan iptal politikamız aşağıdaki gibidir:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Transfer saatine <strong>12 saat</strong> kalana kadar yapılan iptallerde %100 kesintisiz iade yapılır.</li>
            <li>Transfer saatine 12 ile 4 saat kala yapılan iptallerde %50 kesinti uygulanır.</li>
            <li>Son 4 saat içinde yapılan iptallerde ücret iadesi yapılmaz. (Uçuş rötarları hariçtir)</li>
          </ul>
          <h3 className="text-white text-lg mt-8 mb-4">Uçuş Rötarları</h3>
          <p>
            BJV uçuşlarınız operasyon ekibimiz tarafından canlı radarla takip edilir. 
            Uçuşun rötar yapması durumunda şoförümüz bekleme yapmaya devam eder, bu durum için ekstra ücret veya iptal işlemi uygulanmaz.
          </p>
        </div>
      </div>
      <FaqAndFooter />
    </main>
  );
}
