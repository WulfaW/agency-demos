"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, CheckCircle2, MessageSquare, PhoneCall, Calendar, ShieldCheck, ArrowUpRight } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: string;
  initialMessage?: string;
}

export default function ContactModal({ isOpen, onClose, mode = "general", initialMessage = "" }: ContactModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("İkas E-Ticaret Paketleri");
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
          industry: serviceType,
          message: message || initialMessage || `${serviceType} için talep oluşturuldu.`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gönderim başarısız oldu.");
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
      `Merhaba Jet Digital ekibi, ${serviceType} hizmetiniz hakkında hızlı görüşme yapmak istiyorum. ${message || initialMessage}`
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
            className="relative w-full max-w-lg rounded-3xl bg-[#181817] border border-white/10 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5b00]/[0.08] rounded-full blur-3xl pointer-events-none" />

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
                <h3 className="text-2xl font-bold text-white mb-2">Talebiniz Alındı!</h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-sm">
                  Uzman e-ticaret ve pazarlama danışmanımız en geç 15 dakika içerisinde sizinle iletişime geçecektir.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#ff5b00] text-white font-semibold text-xs shadow-lg"
                >
                  Tamam
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ff5b00]/15 border border-[#ff5b00]/30 text-[10px] font-mono uppercase tracking-widest text-[#ff7a00] mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>
                      {mode === "call"
                        ? "HIZLI GERİ ARAMA"
                        : mode === "appointment"
                        ? "ONLİNE STRATEJİ RANDEVUSU"
                        : "ÜCRETSİZ TEKLİF & DANIŞMANLIK"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {mode === "call"
                      ? "Sizi Hemen Arayalım"
                      : "İşletmenizi Zirveye Taşıyalım"}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Formu iletin veya WhatsApp üzerinden anında uzmanımıza bağlanın.
                  </p>
                </div>

                {/* WhatsApp Direct Jump */}
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full mb-5 p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs font-semibold">Anında WhatsApp ile İletişime Geç</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-4 my-3">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">veya teklif formu</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Ad Soyad / Firma Adı
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Örn: Mehmet Yılmaz (York Butik)"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#ff5b00]/60"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Telefon Numarası
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+90 532 ..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#ff5b00]/60"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        E-Posta (İsteğe Bağlı)
                      </label>
                      <input
                        type="email"
                        placeholder="adiniz@sirket.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#ff5b00]/60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      İlgilendiğiniz Hizmet
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#20201e] border border-white/10 text-white text-xs focus:outline-none focus:border-[#ff5b00]/60"
                    >
                      <option value="İkas E-Ticaret Paketleri">İkas E-Ticaret Anahtar Teslim Paketleri</option>
                      <option value="Meta Ads (Instagram & FB)">Meta ADS (Instagram & Facebook Reklamları)</option>
                      <option value="Google Ads & Performance Max">Google ADS & Performance Max Yönetimi</option>
                      <option value="TikTok Ads & Viral Kreatif">TikTok ADS & Video Prodüksiyon</option>
                      <option value="Shopify Global E-Ticaret">Shopify Global E-Ticaret Mağazası</option>
                      <option value="Otonom AI & Özel Yazılım">Otonom AI & Özel Web / Rezervasyon Yazılımı</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Notunuz veya Aylık Hedefiniz
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Mevcut cironuz, satış hedefiniz veya sormak istedikleriniz..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#ff5b00]/60"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#ff5b00] hover:bg-[#e04f00] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,91,0,0.4)] disabled:opacity-50"
                  >
                    {loading ? (
                      <span>İletiliyor...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Ücretsiz Danışmanlık Talebini Gönder</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 pt-1">
                    <ShieldCheck className="w-3 h-3 text-[#ff5b00]" />
                    <span>Bilgileriniz %100 güvende tutulur ve üçüncü taraflarla paylaşılmaz.</span>
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
