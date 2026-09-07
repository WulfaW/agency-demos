import React from 'react';
import Navbar from '@/components/Navbar';
import FaqAndFooter from '@/components/FaqAndFooter';

export default function KVKK() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 relative">
      <Navbar />
      <div className="pt-40 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[#E5D3B3] mb-8">KVKK Aydınlatma Metni</h1>
        <div className="prose prose-invert prose-zinc max-w-none font-sans font-light text-sm text-zinc-300 space-y-6">
          <p>
            Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Easy VIP Transfer ("Şirket") olarak, veri sorumlusu sıfatıyla,
            kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında; hukuka ve dürüstlük kurallarına uygun bir şekilde işleyebilecek,
            kaydedebilecek, saklayabilecek, sınıflandırabilecek, güncelleyebilecek ve mevzuatın izin verdiği hallerde üçüncü kişilere açıklayabileceğiz.
          </p>
          <h3 className="text-white text-lg mt-8 mb-4">1. Kişisel Verilerin İşlenme Amacı</h3>
          <p>
            Toplanan kişisel verileriniz (Ad-Soyad, Telefon, E-posta, Lokasyon bilgileri); VIP transfer hizmetlerinin planlanması,
            operasyonel süreçlerin yürütülmesi, müşteri destek hizmetlerinin sağlanması ve faturalandırma süreçleri için işlenmektedir.
          </p>
          {/* Add more generic boilerplate later if needed */}
        </div>
      </div>
      <FaqAndFooter />
    </main>
  );
}
