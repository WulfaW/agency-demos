import { ArrowUpRight, MessageCircle, Mail, MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";

export default function IletisimPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      <header className="space-y-4 max-w-2xl">
        <div className="text-xs font-mono tracking-widest uppercase text-[#C5A880]">BAŞLAMAYA HAZIR MISINIZ?</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Doğrudan Masaya Oturalım.
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          Form doldurup günlerce cevap beklemek yok. İster doğrudan kurucu ortağımızla WhatsApp'tan yazışın, ister 15 dakikalık ücretsiz dijital keşif randevusu oluşturun.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Direct Actions & Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Card */}
          <div className="glass-panel rounded-3xl p-8 border border-emerald-500/30 subtle-glow space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase">EN HIZLI KANAL</div>
                <h2 className="text-xl font-bold text-white">VIP WhatsApp Hattı</h2>
              </div>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Mevcut web sitenizin linkini bize WhatsApp'tan atın; 1 saat içinde zayıf yönlerini ve potansiyelini özetleyen ses kaydı ve önizleme sunalım.
            </p>
            <a
              href="https://wa.me/905305673991?text=Merhaba,%20Wulfa%20Digital%20ile%20projemiz%20hakkinda%20gorusmek%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-full bg-emerald-500 text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-lg"
            >
              <span>WhatsApp'tan Hemen Yazın</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Direct Details */}
          <div className="glass-panel rounded-3xl p-8 space-y-4 border border-white/10 text-xs text-neutral-400">
            <div className="flex items-center gap-3 text-neutral-300">
              <Mail className="w-4 h-4 text-[#C5A880]" />
              <span>contact@wulfa.digital</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-300">
              <Clock className="w-4 h-4 text-[#C5A880]" />
              <span>Yanıt Süresi: &lt; 2 Saat (Çalışma günlerinde)</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-300">
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              <span>Levent, İstanbul • Yalıkavak, Bodrum</span>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Brief / Discovery Form */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-10 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2">15 Dakikalık Keşif Talebi</h2>
          <p className="text-neutral-400 text-xs mb-8">
            Aşağıdaki 3 bilgiyi girin, projenize özel hazırlık yaparak randevuyu başlatalım.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase mb-2">Adınız & Şirketiniz</label>
              <input
                type="text"
                placeholder="Örn: Mehmet Yılmaz • VIP Turizm A.Ş."
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase mb-2">Mevcut Web Siteniz veya Instagram</label>
              <input
                type="text"
                placeholder="Örn: www.firmaniz.com veya @firmaniz"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase mb-2">Telefon / WhatsApp Numaranız</label>
              <input
                type="tel"
                placeholder="+90 5XX XXX XX XX"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase mb-2">Hedeflenen Bütçe Aralığı</label>
              <div className="grid grid-cols-3 gap-2">
                <button type="button" className="py-2.5 px-3 rounded-lg border border-white/10 bg-white/5 text-xs text-neutral-300 hover:border-[#C5A880] focus:border-[#C5A880] transition-colors">
                  40K - 80K ₺
                </button>
                <button type="button" className="py-2.5 px-3 rounded-lg border border-[#C5A880] bg-[#C5A880]/10 text-xs text-[#C5A880] font-semibold">
                  80K - 150K ₺
                </button>
                <button type="button" className="py-2.5 px-3 rounded-lg border border-white/10 bg-white/5 text-xs text-neutral-300 hover:border-[#C5A880] focus:border-[#C5A880] transition-colors">
                  150K+ ₺ (VIP)
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all shadow-xl"
            >
              <span>Keşif Randevusu Talebini Gönder</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}