'use client';

import React from 'react';

export const LuxuryDatePicker = ({
  label,
  value,
  onChange,
  lang,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  lang?: string;
}) => {
  // Format datetime-local value (YYYY-MM-DDTHH:mm)
  const formatDisplay = (val: string) => {
    if (!val) return '';
    const date = new Date(val);
    if (isNaN(date.getTime())) return '';
    
    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const dp = `${date.getDate()} ${monthNames[date.getMonth()]}`;
    const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    
    return `${dp}, ${time}`;
  };

  const displayValue = formatDisplay(value);

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div 
      className="relative w-full h-full cursor-pointer group"
      onClick={() => {
        try {
          inputRef.current?.showPicker();
        } catch (e) {
          // Fallback for older browsers
          inputRef.current?.focus();
        }
      }}
    >
      {/* Visual Button (looks like PillSelect) */}
      <div className="w-full h-full flex flex-col justify-center px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#E5D3B3]/30 rounded-2xl transition-colors pointer-events-none">
        <span className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-zinc-400 mb-1">{label}</span>
        <span className={`text-[15px] truncate ${displayValue ? 'text-white font-medium' : 'text-zinc-500 font-light'}`}>
          {displayValue || 'Tarih & Saat Seçin'}
        </span>
      </div>

      {/* Invisible Native Input Overlay */}
      <input
        ref={inputRef}
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
        style={{ colorScheme: 'dark' }}
      />
    </div>
  );
};
