"use client";

import { Zap, Phone, Mail, MapPin, ArrowUp, ShoppingBag, Target, Search, Video, Bot } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0e0e0d] border-t border-white/[0.06] pt-16 pb-12 text-neutral-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#ff5b00] flex items-center justify-center text-white font-bold">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                JET<span className="text-[#ff5b00]">DIGITAL</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Jet Digital, e-ticaret ve dijital pazarlamada yenilikçi çözümler sunan, resmi İkas & Meta & Google Premier partner ajansıdır. Markanızı dijital dünyada rekor satışlara ulaştırıyoruz.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-neutral-300">
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px]">
                ÖDÜLLÜ İKAS İŞ ORTAĞI
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px]">
                META & GOOGLE PARTNER
              </span>
            </div>
          </div>

          {/* Hizmetlerimiz */}
          <div>
            <div className="text-xs font-mono uppercase text-white font-semibold tracking-wider mb-4">
              Hizmetlerimiz
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#services" className="hover:text-white transition-colors">İkas E-Ticaret Paketleri</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Shopify Mağaza Kurulumu</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Meta ADS (Instagram/FB)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Google ADS & PMax</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">TikTok ADS & Viral Video</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Otonom AI & Özel Yazılım</a></li>
            </ul>
          </div>

          {/* Araçlar */}
          <div>
            <div className="text-xs font-mono uppercase text-white font-semibold tracking-wider mb-4">
              Ücretsiz Araçlar
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#tools" className="hover:text-white transition-colors">Pazaryeri Komisyon Hesapla</a></li>
              <li><a href="#tools" className="hover:text-white transition-colors">Meta / Google ROAS Simülatörü</a></li>
              <li><a href="#tools" className="hover:text-white transition-colors">Trendyol & Hepsiburada Kar Hesabı</a></li>
              <li><a href="#tools" className="hover:text-white transition-colors">KDV & Desi Hesaplama</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Sıkça Sorulan Sorular (SSS)</a></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <div className="text-xs font-mono uppercase text-white font-semibold tracking-wider mb-4">
              İletişim & Randevu
            </div>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li className="flex items-center gap-2 text-white">
                <Phone className="w-3.5 h-3.5 text-[#ff5b00]" />
                <span>+90 (850) 885 00 00</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ff5b00]" />
                <span>info@jetdigital.co</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ff5b00] shrink-0 mt-0.5" />
                <span>Maslak No:1 Plaza, Sarıyer / İstanbul</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Jet Digital Technology & Marketing. Tüm hakları saklıdır.
          </div>

          <div className="flex items-center gap-4">
            <span>İKAS & SHOPIFY CERTIFIED AGENCY</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Yukarı Kaydır"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
