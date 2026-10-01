'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, MapPin, CheckCircle2 } from 'lucide-react';

export function DemoToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show toast after 6 seconds of page load for demo magic
    const timer = setTimeout(() => {
      setShow(true);
      // Auto hide after 8 seconds
      setTimeout(() => setShow(false), 8000);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-6 right-6 z-[9999] bg-[#0a0a0a] border border-[#E5D3B3]/30 rounded-2xl p-4 shadow-[0_20px_60px_rgba(229,211,179,0.15)] flex gap-4 items-start max-w-sm"
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-amber-500" />
            </div>
            <span className="absolute top-0 right-0 w-3 h-3 bg-amber-500 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              Yaklaşan Görev Uyarısı <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-widest">Sistem</span>
            </h4>
            <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
              Ahmet Yılmaz (Mercedes Vito) adlı sürücünün transferine 45 dakika kaldı. Sürücüye otomatik hatırlatma SMS'i gönderildi.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-amber-500/70">
              <MapPin className="w-3 h-3" /> Yalıkavak Marina → BJV
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
