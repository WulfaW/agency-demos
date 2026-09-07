'use client';

import React from 'react';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { CONTACT_INFO, LOCATIONS } from '@/data/transferData';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#050507] text-zinc-400 text-xs border-t border-white/10 pt-16 pb-24 lg:pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand & Legal Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-[1px]">
                <div className="w-full h-full bg-[#0d0d12] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white">
                EASY <span className="text-amber-400">VIP</span> TRANSFER
              </span>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed">
              Bodrum Milas (BJV) Havalimanı transferleri, lüks şoförlü Maybach araç tahsisi ve tüm Ege VIP turizm ulaşımında 7/24 birinci sınıf konfor.
            </p>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="font-mono text-[11px] text-zinc-300 font-semibold">
                {CONTACT_INFO.companyLegal}
              </div>
              <div className="text-amber-400 font-mono text-[11px]">
                {CONTACT_INFO.tursabNo}
              </div>
            </div>
          </div>

          {/* Quick Routes (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Popüler Bodrum Rotaları
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  BJV Havalimanı ⇄ Yalıkavak Marina VIP
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  BJV Havalimanı ⇄ Göltürkbükü & Maçakızı
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  BJV Havalimanı ⇄ Mandarin Oriental
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  BJV Havalimanı ⇄ Bodrum Merkez & Marina
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  BJV Havalimanı ⇄ Torba, Turgutreis & Bitez
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  Bodrum ⇄ Efes & Pamukkale Günübirlik VIP Tur
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              İletişim & Merkez Ofis
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-zinc-300">{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${CONTACT_INFO.phoneClean}`} className="text-zinc-200 font-semibold hover:text-amber-400">
                  {CONTACT_INFO.phone} / {CONTACT_INFO.landline}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-zinc-300 hover:text-amber-400">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">{CONTACT_INFO.workingHours}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <a
                href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=Merhaba%20Easy%20VIP%20Transfer%2C%20Bodrum%20rezervasyonu%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp VIP Destek</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Easy VIP Transfer ({CONTACT_INFO.companyLegal}). Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-6">
            <span>Gizlilik Politikası</span>
            <span>KVKK Aydınlatma Metni</span>
            <span>Taşıma Sözleşmesi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
