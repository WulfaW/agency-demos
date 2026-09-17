'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { istanbulToday, monthGrid } from '@/lib/schedule';

const WEEKDAYS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
const fmtMonth = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const pad = (n: number) => String(n).padStart(2, '0');
const viewOf = (date: string) => ({ y: Number(date.slice(0, 4)), m: Number(date.slice(5, 7)) - 1 });

/** Tarihe tiklayinca acilan ay izgarasi: oklarla aylar arasi atlanir, gune tek tikla gidilir. */
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
    if (!open) setView(viewOf(value)); // her acilista secili gunun ayindan basla
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
      <button
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="min-w-[13rem] flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg font-serif text-lg text-foreground capitalize hover:bg-white/[0.04]"
      >
        <CalendarDays className="w-4 h-4 text-accent" />
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Tarih seç"
          className="absolute z-30 top-full mt-2 left-1/2 -translate-x-1/2 w-72 rounded-2xl border border-border bg-background p-4 shadow-[0_24px_60px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => shiftMonth(-1)} aria-label="Önceki ay" className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/[0.05]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-foreground capitalize">{fmtMonth.format(new Date(Date.UTC(view.y, view.m, 1)))}</span>
            <button onClick={() => shiftMonth(1)} aria-label="Sonraki ay" className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/[0.05]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map((w) => (
              <div key={w} className="text-center text-[11px] text-muted py-1">{w}</div>
            ))}
          </div>

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
                  className={`h-9 rounded-lg text-[13px] ${
                    isSelected ? 'bg-accent text-background font-semibold'
                    : isToday ? 'text-accent ring-1 ring-accent/50 hover:bg-white/[0.05]'
                    : 'text-foreground hover:bg-white/[0.06]'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => pick(today)}
            className="mt-3 w-full py-1.5 rounded-lg border border-border text-xs text-muted hover:text-foreground"
          >
            Bugüne dön
          </button>
        </div>
      )}
    </div>
  );
}
