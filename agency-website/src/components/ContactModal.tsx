"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, CheckCircle2, MessageSquare, PhoneCall, ShieldCheck, ArrowUpRight } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export default function ContactModal({ isOpen, onClose, initialMessage = "" }: ContactModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("VIP Turizm & Transfer");
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          industry,
          message: message || initialMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gönderim başarısız.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Merhaba AURA CORE ekibi, ${industry} sektörü için yapay zeka & web yazılım projemiz hakkında görüşmek istiyoruz. ${message || initialMessage}`
    );
    window.open(`https://wa.me/905320000000?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl rounded-3xl bg-[#0b0b0e] border border-white/10 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.05] rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Talebiniz Alındı</h3>
                <p className="text-sm text-neutral-400 max-w-sm">
                  Proje detaylarınız ve mimari analiz talebiniz CRM sistemimize iletildi. En geç 24 saat içinde dönüş yapacağız.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs"
                >
                  Kapat
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Ücretsiz Strateji & Mimari Görüşmesi</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Projenizi Birlikte Hayata Geçirelim
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Formu doldurun veya anında WhatsApp üzerinden baş mühendisimizle görüşün.
                  </p>
                </div>

                {/* Quick WhatsApp Bar */}
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full mb-6 p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs font-semibold">Anında WhatsApp'tan Yazın</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-4 my-4">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">veya teklif formu</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                {/* Lead Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Ad Soyad / Firma
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Örn: Burak Kaya (Mandarin Transfer)"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-400/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        E-Posta
                      </label>
                      <input
                        type="email"
                        placeholder="adiniz@sirket.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-400/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Telefon / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+90 532 ..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-400/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Sektör & Çözüm İhtiyacı
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121216] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-400/50"
                    >
                      <option value="VIP Turizm & Transfer">VIP Turizm & Transfer Rezervasyon Sistemi</option>
                      <option value="Lüks Gayrimenkul & Villa">Lüks Gayrimenkul & Villa Kiralama</option>
                      <option value="Otonom AI Lead Avcısı">Otonom AI Lead Avcısı & Otomasyon</option>
                      <option value="Özel SaaS & Operasyon Paneli">Özel SaaS & Operasyon Paneli</option>
                      <option value="Diğer">Diğer Yüksek Teknoloji Çözümleri</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Proje Notları / İhtiyaç Özeti
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mevcut darboğazınız veya hayal ettiğiniz özellikler..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-emerald-400/50"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                  >
                    {loading ? (
                      <span>İletiliyor...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Mimari Analiz & Teklif Talebini Gönder</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 pt-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Verileriniz gizlilik sözleşmesi (NDA) altında korunur.</span>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
