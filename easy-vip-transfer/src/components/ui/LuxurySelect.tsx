'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { createPortal } from 'react-dom';

type Option = {
  value: string;
  label: string;
};

export const LuxurySelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Seçiniz',
  icon: Icon,
}: {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
  icon?: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handler = (e: MouseEvent | Event) => {
      const target = (e.target || e.currentTarget) as Node;
      if (e.type === 'scroll') {
        if (popupRef.current && popupRef.current.contains(target)) return;
        setIsOpen(false);
        return;
      }
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        popupRef.current && !popupRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler as any);
    window.addEventListener('scroll', handler as any, true);
    return () => {
      document.removeEventListener('mousedown', handler as any);
      window.removeEventListener('scroll', handler as any, true);
    };
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popupH = Math.min(options.length * 48 + 16, 250);
      const showAbove = window.innerHeight - rect.bottom < popupH + 20;
      setPopupStyle({
        position: 'fixed',
        left: rect.left,
        ...(showAbove ? { bottom: window.innerHeight - rect.top + 8 } : { top: rect.bottom + 8 }),
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen, options.length]);

  const selected = options.find(o => o.value === value);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(p => !p)}
        className="w-full h-full min-h-[56px] flex flex-col justify-center px-4 py-3 hover:bg-white/[0.03] transition-colors focus:outline-none text-left rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E5D3B3]/30 group"
      >
        {label && (
          <span className="flex items-center gap-2 text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-zinc-400 mb-1">
            {Icon && <Icon className="w-3.5 h-3.5" />} {label}
          </span>
        )}
        <div className="flex items-center justify-between">
          <span className={`text-[14px] truncate ${selected ? 'text-white font-medium' : 'text-zinc-500 font-light'}`}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} group-hover:text-white`} />
        </div>
      </button>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              style={popupStyle}
              className="bg-[#111] border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              <div className="max-h-[250px] overflow-y-auto subtle-scrollbar py-2 overscroll-contain">
                {options.map((opt) => {
                  const isSel = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => { onChange(opt.value); setIsOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors text-left ${
                        isSel ? 'bg-white/5 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {opt.label}
                      {isSel && <Check className="w-4 h-4 text-[#E5D3B3]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
