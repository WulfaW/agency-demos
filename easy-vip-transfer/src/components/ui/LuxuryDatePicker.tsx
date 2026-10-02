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

  return (
    <div className="relative w-full h-full">
      {/* Visual Button (looks like PillSelect) */}
      <div className="w-full h-full flex flex-col justify-center px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-2xl transition-colors pointer-events-none">
        <span className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-zinc-400 mb-1">{label}</span>
        <span className={`text-[15px] truncate ${displayValue ? 'text-white font-medium' : 'text-zinc-500 font-light'}`}>
          {displayValue || 'Tarih & Saat Seçin'}
        </span>
      </div>

      {/* Invisible Native Input Overlay */}
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ colorScheme: 'dark' }}
      />
    </div>
  );
};
