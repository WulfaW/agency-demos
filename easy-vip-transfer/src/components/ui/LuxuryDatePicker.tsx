'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TIME_SLOTS = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
];

export const LuxuryDatePicker = ({
  label,
  value,
  onChange,
  lang,
}: {
  label: string;
  value: string; // Beklenen format: "YYYY-MM-DDTHH:mm"
  onChange: (val: string) => void;
  lang?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [selectedTime, setSelectedTime] = useState<string | null>(() => {
    if (value && value.includes('T')) return value.split('T')[1];
    if (value && value.includes(' ')) return value.split(' ')[1];
    return null;
  });
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | Event) => {
      const target = (e.target || e.currentTarget) as Node;
      if (e.type === 'scroll') {
        if (popupRef.current && popupRef.current.contains(target)) return;
        setIsOpen(false);
        return;
      }
      if (
        ref.current && !ref.current.contains(target) &&
        popupRef.current && !popupRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    window.addEventListener('scroll', handler, true); // capture phase to catch all scrolls
    return () => {
      document.removeEventListener('mousedown', handler);
      // NOT: scroll listener kaldırıldı — mobilde saat listesini kaydırınca picker kapanıyordu
    };
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popupH = 440;
      const showAbove = window.innerHeight - rect.bottom < popupH + 20;
      const isMobile = window.innerWidth < 640;
      const margin = 16;
      const popupW = isMobile ? window.innerWidth - margin * 2 : 560;
      const left = isMobile ? margin : Math.min(rect.left, window.innerWidth - popupW - margin);
      setPopupStyle({
        position: 'fixed',
        left,
        ...(showAbove ? { bottom: window.innerHeight - rect.top + 8 } : { top: rect.bottom + 8 }),
        width: popupW,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let selectedDateStr = '';
  if (value) {
    selectedDateStr = value.includes('T') ? value.split('T')[0] : value.split(' ')[0];
  }
  const selectedDate = selectedDateStr ? new Date(selectedDateStr + 'T00:00:00') : null;

  const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const dayNames = ['Pz', 'Pa', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'];

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (y: number, m: number) => new Date(y, m, 1).getDay();

  const prevMonth = () => setViewDate(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 });
  const nextMonth = () => setViewDate(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 });

  const selectDay = (day: number) => {
    const d = new Date(viewDate.year, viewDate.month, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    onChange(selectedTime ? `${iso}T${selectedTime}` : iso);
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    if (selectedDateStr) onChange(`${selectedDateStr}T${time}`);
  };

  const reset = () => { setSelectedTime(null); onChange(''); };
  const confirm = () => setIsOpen(false);

  const displayValue = (() => {
    if (!selectedDate) return '';
    const dp = `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`;
    return selectedTime ? `${dp}, ${selectedTime}` : dp;
  })();

  const daysInMonth = getDaysInMonth(viewDate.year, viewDate.month);
  const firstDay = getFirstDay(viewDate.year, viewDate.month);

  return (
    <div className="relative w-full h-full" ref={ref}>
      <div ref={triggerRef} className="w-full h-full">

        {/* ── Mobil: Native OS picker (iOS scroll wheel / Android clock) ── */}
        <label className="md:hidden w-full h-full flex flex-col justify-center px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E5D3B3]/30 cursor-pointer transition-colors relative">
          <span className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-zinc-400 mb-1">{label}</span>
          <span className={`text-[15px] truncate ${displayValue ? 'text-white font-medium' : 'text-zinc-500 font-light'}`}>
            {displayValue || 'Tarih & Saat Seçin'}
          </span>
          <input
            type="datetime-local"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            min={new Date().toISOString().slice(0, 16)}
            value={value && value.length >= 16 ? value.slice(0, 16) : ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>

        {/* ── Masaüstü: Özel lüks takvim popup ── */}
        <button
          type="button"
          onClick={() => setIsOpen(p => !p)}
          className="hidden md:flex w-full h-full flex-col justify-center px-4 py-3 hover:bg-white/[0.03] transition-colors focus:outline-none text-left rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E5D3B3]/30"
        >
          <span className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-zinc-400 mb-1">{label}</span>
          <span className={`text-[15px] truncate ${displayValue ? 'text-white font-medium' : 'text-zinc-500 font-light'}`}>
            {displayValue || 'Tarih & Saat Seçin'}
          </span>
        </button>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              style={popupStyle}
              className="bg-[#111] border border-white/10 rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.95)] max-h-[85vh] overflow-y-auto subtle-scrollbar"
            >
              <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
                {/* Calendar */}
                <div className="flex-1 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-serif text-white tracking-widest">
                      {monthNames[viewDate.month]} {viewDate.year}
                    </span>
                    <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 mb-1">
                    {dayNames.map(d => (
                      <div key={d} className="h-8 flex items-center justify-center text-[10px] font-medium text-zinc-600 uppercase tracking-wider">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-y-1">
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const d = new Date(viewDate.year, viewDate.month, day);
                      const isPast = d < today;
                      const isSel = selectedDate?.getDate() === day && selectedDate?.getMonth() === viewDate.month;

                      return (
                        <button
                          key={day}
                          disabled={isPast}
                          onClick={() => selectDay(day)}
                          className={`h-10 flex items-center justify-center text-sm rounded-full transition-all duration-200 mx-1 ${
                            isPast ? 'text-zinc-700 cursor-not-allowed'
                              : isSel ? 'bg-[#E5D3B3] text-black font-bold shadow-[0_0_20px_rgba(229,211,179,0.3)]'
                                : 'text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="w-full sm:w-56 p-5 sm:pl-6 max-h-[340px] overflow-y-auto subtle-scrollbar flex flex-col overscroll-contain">
                  <div className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4 text-center sm:text-left flex-shrink-0">
                    Saat Seçimi
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-2 gap-2 mb-4">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => selectTime(slot)}
                        className={`py-2 rounded-xl text-xs font-mono font-medium border transition-all duration-200 flex-shrink-0 ${
                          selectedTime === slot
                            ? 'bg-[#E5D3B3] border-[#E5D3B3] text-black'
                            : 'text-zinc-400 border-white/[0.08] hover:bg-white/[0.06] hover:text-white hover:border-white/20'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-4 border-t border-white/[0.06]">
                    <p className="text-[10px] font-bold tracking-[0.1em] text-zinc-500 uppercase mb-2 text-center sm:text-left">
                      Özel Saat Girin
                    </p>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="SS:DD (Örn: 14:30)"
                      maxLength={5}
                      className="w-full bg-[#111] border border-white/[0.08] rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#E5D3B3]/50 transition-colors placeholder:text-zinc-700"
                      defaultValue=""
                      onChange={(e) => {
                        let val = e.target.value.replace(/[^\d:]/g, '');
                        // Auto-insert colon after 2 digits
                        if (val.length === 2 && !val.includes(':')) {
                          val += ':';
                          e.target.value = val;
                        }
                        if (val.length > 5) val = val.slice(0, 5);
                        // Validate hour
                        if (val.length >= 2) {
                          const hour = parseInt(val.slice(0, 2));
                          if (hour > 23) val = '23' + val.slice(2);
                        }
                        // Validate minute
                        if (val.length >= 5) {
                          const minute = parseInt(val.slice(3, 5));
                          if (minute > 59) val = val.slice(0, 3) + '59';
                        }
                        e.target.value = val;
                        if (val.length === 5) selectTime(val);
                      }}
                    />
                    <p className="text-[10px] text-zinc-600 mt-1.5 text-center sm:text-left">5 karakter girin (SS:DD) ve otomatik seçilir</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06]">
                <button onClick={reset} className="text-[13px] font-sans text-white underline underline-offset-2 hover:text-zinc-300 transition-colors">
                  Sıfırla
                </button>
                <button
                  onClick={confirm}
                  disabled={!selectedDate || !selectedTime || selectedTime.length < 5}
                  className="px-8 py-2.5 rounded-xl text-[13px] font-sans font-bold tracking-wider transition-all disabled:opacity-25 disabled:cursor-not-allowed bg-[#222] text-white hover:bg-[#333] border border-white/10"
                >
                  Onayla
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
