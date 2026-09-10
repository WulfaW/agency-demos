"use client";

import { motion } from "framer-motion";
import { Sparkles, ExternalLink, ArrowUpRight, Check, Gauge, Shield, Cpu, Zap, Car, Search } from "lucide-react";

interface ShowcaseProps {
  onOpenContact: () => void;
}

export default function Showcase({ onOpenContact }: ShowcaseProps) {
  return (
    <section id="showcase" className="py-24 relative bg-[#070709] border-t border-b border-white/[0.06]">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-3">
            <Sparkles className="w-3 h-3" />
            <span>[ SELECTED CLIENT CASES & SHOWCASE ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Sıradanlıktan uzak, gerçek işletmelere milyonluk değer katan projelerimiz.
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl text-base">
            Her pikselinde lüks tüketici psikolojisi, her satır kodunda ise kurumsal hız ve güvenlik barındırıyoruz.
          </p>
        </div>

        {/* Featured Case 1: Easy VIP Transfer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl glass-panel p-8 md:p-12 mb-12 relative overflow-hidden border border-white/10 group hover:border-white/20 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold">
                    FLAGSHIP PROJECT
                  </span>
                  <span className="text-neutral-500 font-mono text-xs">VIP Turizm & Transfer</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Easy VIP Transfer
                </h3>
                <p className="text-neutral-400 mt-4 text-sm sm:text-base leading-relaxed">
                  Bodrum, Antalya ve İstanbul havalimanları için geliştirilmiş, ultra-lüks VIP şoförlü araç rezervasyon ve filo operasyon yönetim platformu.
                </p>

                {/* Case Metrics */}
                <div className="grid grid-cols-3 gap-4 mt-8 py-6 border-y border-white/[0.08]">
                  <div>
                    <div className="font-mono text-2xl font-bold text-white">0.7s</div>
                    <div className="text-xs text-neutral-400 mt-1">Yükleme Hızı</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold text-emerald-400">100%</div>
                    <div className="text-xs text-neutral-400 mt-1">Otomatik Dispeç</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold text-cyan-400">4 Dil</div>
                    <div className="text-xs text-neutral-400 mt-1">Dinamik Kur</div>
                  </div>
                </div>

                {/* Architecture Highlights */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Next.js 15", "Supabase RLS", "Leaflet Canlı Harita", "WhatsApp Operatör Botu", "Apple Pay / Stripe"].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2"
                >
                  <span>Benzer Bir Proje Başlat</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Mockup / Visual Card */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl bg-[#09090b] border border-white/10 p-5 shadow-2xl overflow-hidden relative">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-xs font-mono text-neutral-400 ml-2">easyviptransfer.com // live-engine</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ONLINE DISPATCH
                  </span>
                </div>

                {/* Mock UI elements */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Mercedes-Benz Maybach VIP Edition</div>
                        <div className="text-[11px] text-neutral-400">Milas Bodrum Havalimanı (BJV) → Mandarin Oriental</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs font-bold text-emerald-400">€140.00</div>
                      <div className="text-[10px] text-neutral-500">Otomatik Teyit</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Gauge className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Canlı Uçuş Telemetrisi (TK2514)</div>
                        <div className="text-[11px] text-neutral-400">Tahmini iniş: 14:25 | Kapı Karşılama: Aktif</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">ON TIME</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Case 2: Autonomous Lead Hunter & CRM Engine */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl glass-panel p-8 md:p-12 relative overflow-hidden border border-white/10 group hover:border-white/20 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
                    INTERNAL AI PRODUCT
                  </span>
                  <span className="text-neutral-500 font-mono text-xs">Otonom Lead Scraper & CRM</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Autonomous Lead Hunter
                </h3>
                <p className="text-neutral-400 mt-4 text-sm sm:text-base leading-relaxed">
                  Hedef sektör ve lokasyondaki binlerce potansiyel kurumsal müşteriyi Google Haritalar üzerinden otonom tarayan, doğrulayan ve Notion CRM tablosuna işleyen AI motorumuz.
                </p>

                {/* Case Metrics */}
                <div className="grid grid-cols-3 gap-4 mt-8 py-6 border-y border-white/[0.08]">
                  <div>
                    <div className="font-mono text-2xl font-bold text-white">1000+</div>
                    <div className="text-xs text-neutral-400 mt-1">Haftalık Lead Taraması</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold text-emerald-400">98%</div>
                    <div className="text-xs text-neutral-400 mt-1">Doğrulanmış Telefon</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold text-purple-400">0 sn</div>
                    <div className="text-xs text-neutral-400 mt-1">Manuel Veri Girişi</div>
                  </div>
                </div>

                {/* Architecture Highlights */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Apify Actor Engine", "Notion API", "Linear Sync", "Python Data Pipeline", "WhatsApp Webhook"].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2"
                >
                  <span>Sektörünüz İçin AI Avcısı Kurun</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Mockup / Visual Card */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl bg-[#09090b] border border-white/10 p-5 shadow-2xl font-mono text-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Search className="w-3.5 h-3.5 text-emerald-400" />
                    <span>hunt_leads.py &quot;Göcek Yat Kiralama&quot;</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    COMPLETED (10/10)
                  </span>
                </div>

                <div className="space-y-2 text-neutral-400">
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-white font-semibold flex justify-between">
                      <span>Blue Voyage Luxury Yacht</span>
                      <span className="text-emerald-400 text-[11px]">+90 532 900 ****</span>
                    </div>
                    <div className="text-neutral-500 text-[11px] mt-1">Notion CRM Sync: Row #128 Added | Status: New Prospect</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-white font-semibold flex justify-between">
                      <span>Aegean Private Gulets</span>
                      <span className="text-emerald-400 text-[11px]">+90 533 450 ****</span>
                    </div>
                    <div className="text-neutral-500 text-[11px] mt-1">Notion CRM Sync: Row #129 Added | Status: New Prospect</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
