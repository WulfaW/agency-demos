import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Wix'te indeksli olup yeni sitede karsiligi farkli adreste olan sayfalar.
  // Kalici yonlendirme (308) Google'in siralama sinyalini yeni adrese tasir.
  async redirects() {
    return [
      { source: '/gizlilik-politikamiz', destination: '/gizlilik', permanent: true },
      { source: '/araclarimiz/mercvit', destination: '/araclarimiz', permanent: true },
      { source: '/events-page', destination: '/', permanent: true },
      // Wix'te bos sayfa (H1, baslik ve metin yok). Uydurma icerik yerine bolge dizinine yonlendirilir;
      // musteriden gercek icerik gelince /bolgelerimiz/guvercinlik-transfer olarak acilabilir.
      { source: '/bolgelerimiz/guvercinlik-transfer', destination: '/bolgelerimiz', permanent: true },
    ];
  },
};

export default nextConfig;
