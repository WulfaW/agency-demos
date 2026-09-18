"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AppointmentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-cream rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <button onClick={onClose} className="absolute top-6 right-6 text-charcoal/50 hover:text-charcoal transition-colors">
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-3xl font-serif text-charcoal mb-2">Randevu Oluşturun</h3>
              <p className="text-charcoal/60 mb-8 text-sm">Uzmanlarımızla ücretsiz ön görüşme ve planlama için bilgilerinizi bırakın, sizi hemen arayalım.</p>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); alert("Talebiniz alındı, en kısa sürede dönüş yapılacaktır."); }}>
                <div>
                  <input type="text" placeholder="Adınız Soyadınız" required className="w-full px-5 py-4 bg-white rounded-xl border border-charcoal/10 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-charcoal placeholder-charcoal/40" />
                </div>
                <div>
                  <input type="tel" placeholder="Telefon Numaranız" required className="w-full px-5 py-4 bg-white rounded-xl border border-charcoal/10 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-charcoal placeholder-charcoal/40" />
                </div>
                <div>
                  <select required className="w-full px-5 py-4 bg-white rounded-xl border border-charcoal/10 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-charcoal/70 appearance-none">
                    <option value="" disabled selected>İlgilendiğiniz Hizmet</option>
                    <option value="lazer">Lazer Epilasyon</option>
                    <option value="cilt">Cilt Bakımı (Hydrafacial vb.)</option>
                    <option value="bolgesel">Bölgesel Zayıflama (G5, EMS)</option>
                    <option value="vucut">Vücut Bakımı (Dövme Silme vb.)</option>
                    <option value="diger">Diğer / Bilgi Almak İstiyorum</option>
                  </select>
                </div>
                
                <button type="submit" className="w-full py-4 mt-4 bg-charcoal text-cream font-medium rounded-xl hover:bg-gold-600 transition-colors shadow-lg shadow-charcoal/10">
                  Randevu Talebi Gönder
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
