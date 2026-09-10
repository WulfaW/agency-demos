import Link from "next/link";
import { ArrowUpRight, CheckCircle2, XCircle, ShieldCheck, Zap, Layers, Sparkles, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-12 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#C5A880]/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/5 text-xs font-mono text-[#C5A880] mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ŞABLON DEĞİL, LÜKS MÜHENDİSLİK</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          Yüksek Cirolu Markalar İçin <span className="gold-gradient-text">Dijital Amiral Gemileri</span> İnşa Ediyoruz.
        </h1>

        <p className="text-neutral-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-10">
          Havalimanı transferinden lüks kliniklere; 15.000 TL'lik yavaş WordPress temalarını değil, 
          Google'da ilk sıraya oturan ve müşteriyi ilk bakışta ikna eden <strong>Next.js</strong> tabanlı özel sistemleri kuruyoruz.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/projeler"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group shadow-xl"
          >
            <span>Seçilmiş Projeleri İncele</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link
            href="/iletisim"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/15 bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <span>15 Dk Keşif Randevusu Al</span>
          </Link>
        </div>

        {/* Live Metric Tickers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-20 pt-10 border-t border-white/10">
          <div className="p-4 text-left glass-panel rounded-2xl">
            <div className="text-2xl font-bold text-white font-mono">&lt; 0.8s</div>
            <div className="text-xs text-neutral-400 mt-1">Yüklenme Hızı</div>
          </div>
          <div className="p-4 text-left glass-panel rounded-2xl">
            <div className="text-2xl font-bold text-[#C5A880] font-mono">100 / 100</div>
            <div className="text-xs text-neutral-400 mt-1">Google PageSpeed</div>
          </div>
          <div className="p-4 text-left glass-panel rounded-2xl">
            <div className="text-2xl font-bold text-white font-mono">%0</div>
            <div className="text-xs text-neutral-400 mt-1">Hazır Şablon Kullanımı</div>
          </div>
          <div className="p-4 text-left glass-panel rounded-2xl">
            <div className="text-2xl font-bold text-emerald-400 font-mono">3D Secure</div>
            <div className="text-xs text-neutral-400 mt-1">Online Rezervasyon & POS</div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED WORK (BENTO GRID) */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-[#C5A880] mb-2">PORTFOLYO VİTRİNİ</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Son Dönem Amiral Projeler</h2>
          </div>
          <Link href="/projeler" className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1">
            <span>Tüm Projeleri Gör (5+)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Showcase: Easy VIP Transfer */}
          <article className="md:col-span-8 glass-panel rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#C5A880]">VIP TRANSFER</span>
                <span className="text-xs text-neutral-500 font-mono">BODRUM & YALIKAVAK</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Easy VIP Transfer</h3>
              <p className="text-neutral-400 text-sm max-w-xl leading-relaxed">
                2016 model eski bir şablondan, canlı harita rota simülatörlü, çok dilli ve Maybach sinematik atmosferli ultra lüks rezervasyon motoruna dönüştürüldü.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs font-mono text-neutral-400">Next.js 15 • Tailwind • Canlı Harita • WhatsApp API</div>
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-[#C5A880] text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-[#d5bc97] transition-all"
              >
                <span>Canlı Demoyu Aç</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>

          {/* Secondary Showcase: Klinik & Sağlık */}
          <article className="md:col-span-4 glass-panel rounded-3xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-sky-400">ESTETİK KLİNİK</span>
              </div>
              <h3 className="text-xl font-bold text-white">Dr. Ferhat Klinik</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Nişantaşı estetik segmenti için tasarlanan, yüksek güvenilirlikli hekim kimliği ve öncesi/sonrası hasta vaka galerisi.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-neutral-500">Hazırlık Aşamasında</span>
            </div>
          </article>
        </div>
      </section>

      {/* 3. ANTI-SLOP MANIFESTO COMPARISON */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono tracking-widest uppercase text-[#C5A880] mb-2">STANDARTLARIMIZ</div>
            <h2 className="text-3xl font-bold text-white">Neden Sıradan Ajanslarla Çalışmıyorsunuz?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bad Agency */}
            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <XCircle className="w-5 h-5" />
                <span>Piyasadaki Tipik 15.000 TL'lik "Ajanslar"</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-400">
                <li className="flex items-start gap-2">❌ 2017'den kalma ağır WordPress teması kurup üstüne logo yapıştırırlar.</li>
                <li className="flex items-start gap-2">❌ Mobilde 5-6 saniyede açılır, reklam verdiğiniz turist beklemeden kaçar.</li>
                <li className="flex items-start gap-2">❌ Rezervasyon almaz; sadece düz iletişim formu koyup "ödeme araçta" derler.</li>
                <li className="flex items-start gap-2">❌ Bir yazı veya fiyat değiştirmek istediğinizde 3 hafta ulaşamazsınız.</li>
              </ul>
            </div>

            {/* Wulfa Standard */}
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Wulfa Digital Mühendislik Standardı</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-300">
                <li className="flex items-start gap-2">✅ Sıfırdan Next.js & Tailwind ile yazılan, mikrosaniyede açılan özel kod.</li>
                <li className="flex items-start gap-2">✅ 95+ PageSpeed skoru ve Google botları için tam yapılandırılmış SEO.</li>
                <li className="flex items-start gap-2">✅ Canlı rota simülasyonu, 3D Secure kapora ve otomatik WhatsApp bildirimleri.</li>
                <li className="flex items-start gap-2">✅ Kendi şifrenizle gireceğiniz, çift tıkla fiyat güncelleyebileceğiniz özel panel.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES OVERVIEW */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-mono tracking-widest uppercase text-[#C5A880] mb-2">MÜHENDİSLİK DİSİPLİNLERİMİZ</div>
          <h2 className="text-3xl font-bold text-white">4 Temel Hizmet Sütunumuz</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#C5A880]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Özel Web Mimarisi</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Kalıp şablon yok. Next.js 15, Vercel ve Supabase altyapısıyla markanıza özel dikilmiş dijital terzilik.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#C5A880]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Işık Hızı & SEO</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Google PageSpeed 95+ garantisi. Arama motorlarında reklam bütçenizi katlayan teknik indeksleme.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Özel Yönetim Paneli</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Sezonluk fiyatları ve araçları ajansa muhtaç olmadan kendiniz güncelleyin, tasarımı asla bozamazsınız.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#C5A880]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">WhatsApp VIP Entegrasyon</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Form doldurmayan elit müşterileri tek tıkla rotası ve araç seçimi hazır WhatsApp mesajına dönüştürün.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FINAL ACTION CTA BANNER */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="glass-panel rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden border border-[#C5A880]/30 subtle-glow">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Markanızın Dijital Vitrinini Beraber İnşa Edelim.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Eski sitenizin neden müşteri kaçırdığını ve yeni nesil bir arayüzle nasıl ciro katlayabileceğinizi 15 dakikalık bir keşif toplantısında konuşalım.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/iletisim"
              className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 group"
            >
              <span>Keşif Randevusu Ayarla</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <a
              href="https://wa.me/905305673991?text=Merhaba,%20Wulfa%20Digital%20ile%20projemiz%20hakkinda%20gorusmek%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-all"
            >
              WhatsApp ile Hızlı Mesaj
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}