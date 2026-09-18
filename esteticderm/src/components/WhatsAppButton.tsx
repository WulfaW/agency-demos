"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/905384824585?text=Merhaba,%20randevu%20almak%20istiyorum."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#22bf5b] transition-colors"
      aria-label="WhatsApp ile İletişime Geçin"
    >
      <MessageCircle className="w-8 h-8" />
    </motion.a>
  );
}
