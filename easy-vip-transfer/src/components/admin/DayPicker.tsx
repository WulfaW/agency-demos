'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { istanbulToday, monthGrid } from '@/lib/schedule';

const WEEKDAYS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
const fmtMonth = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const pad = (n: number) => String(n).padStart(2, '0');
const viewOf = (date: string) => ({ y: Number(date.slice(0, 4)), m: Number(date.slice(5, 7)) - 1 });

export default function DayPicker({
  value, label, onChange,
}: {
  value: string;
  label: string;
  onChange: (date: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => viewOf(value));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open) setView(viewOf(value));
    setOpen((o) => !o);
  };

  const shiftMonth = (n: number) =>
    setView((v) => {
      const d = new Date(Date.UTC(v.y, v.m + n, 1));
      return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
    });

  const pick = (date: string) => {
    onChange(date);
    setOpen(false);
  };

  const { leadingBlanks, days } = monthGrid(view.y, view.m);
  const today = istanbulToday();

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="min-w-[13rem] flex items-center justify-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200"
      >
        <CalendarDays className="w-4 h-4 text-[#E5D3B3]" />
        <span className="font-serif text-base text-white capitalize">{label}</span>
      </button>

      {/* Dropdown Calendar */}
      {open && (
        <div
          role="dialog"
          aria-label="Tarih seç"
          className="absolute z-30 top-full mt-2 left-1/2 -translate-x-1/2 w-72 rounded-3xl border border-white/10 bg-[#0a0a0a] backdrop-blur-2xl p-5 shadow-[0_32px_80px_rgba(0,0,0,0.9)]"
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => shiftMonth(-1)} 
              aria-label="Önceki ay" 
              className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm text-white font-medium capitalize">
              {fmtMonth.format(new Date(Date.UTC(view.y, view.m, 1)))}
            </span>
            <button 
              onClick={() => shiftMonth(1)} 
              aria-label="Sonraki ay" 
              className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS.map((w) => (
              <div key={w} className="text-center text-[10px] text-zinc-600 uppercase tracking-widest py-1">{w}</div>
            ))}
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: leadingBlanks }, (_, i) => <div key={`b${i}`} />)}
            {Array.from({ length: days }, (_, i) => {
              const date = `${view.y}-${pad(view.m + 1)}-${pad(i + 1)}`;
              const isSelected = date === value;
              const isToday = date === today;
              return (
                <button
                  key={date}
                  onClick={() => pick(date)}
                  aria-current={isToday ? 'date' : undefined}
                  aria-pressed={isSelected}
                  className={`h-9 rounded-xl text-[13px] transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#E5D3B3] text-black font-semibold'
                      : isToday
                      ? 'text-[#E5D3B3] ring-1 ring-[#E5D3B3]/40 hover:bg-white/[0.06]'
                      : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Back to Today */}
          <button
            onClick={() => pick(today)}
            className="mt-4 w-full py-2 rounded-xl border border-white/10 text-xs text-zinc-500 hover:text-white hover:border-[#E5D3B3]/30 hover:text-[#E5D3B3] transition-all"
          >
            Bugüne dön
          </button>
        </div>
      )}
    </div>
  );
}
