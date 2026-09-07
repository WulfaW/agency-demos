'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center overflow-hidden"
        >
          {/* Subtle noise background */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-difference" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
          
          <div className="text-center relative z-10">
            {/* Logo Text Reveal */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif text-white tracking-widest uppercase flex items-center justify-center gap-4"
              >
                EASY <span className="text-[#E5D3B3] italic font-light">VIP</span>
              </motion.h1>
            </div>
            
            {/* Minimalist Loading Bar */}
            <div className="w-48 h-[1px] bg-white/10 mx-auto relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#E5D3B3] to-transparent"
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-[9px] text-zinc-500 uppercase tracking-[0.4em] font-mono mt-6"
            >
              Exclusive Transfer Services
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
