import { overlaps } from './overlap';

const HOUR_MS = 3_600_000;
const DAY_MS = 24 * HOUR_MS;

/** Postgres tstzrange metnini ("[a,b)") baslangic ve bitis ISO'larina ayirir. */
export function parseRange(during: string): { start: string; end: string } {
  const [s, e] = String(during).replace(/^[[(]|[)\]]$/g, '').split(',');
  return { start: s.replace(/"/g, ''), end: e.replace(/"/g, '') };
}

/**
 * Istanbul'daki takvim gununun [00:00, ertesi 00:00) araligi.
 * ponytail: Turkiye 2016'dan beri kalici UTC+3, yaz saati yok; bu yuzden +03:00 sabit.
 * Baska saat dilimindeki bir musteriye hizmet verilirse Intl ile hesaplanmali.
 */
export function dayBounds(date: string): { start: Date; end: Date } {
  const start = new Date(`${date}T00:00:00+03:00`);
  return { start, end: new Date(start.getTime() + DAY_MS) };
}

export type Placement = {
  leftPct: number;
  widthPct: number;
  continuesBefore: boolean;
  continuesAfter: boolean;
};

/** Isi gunun sinirlarina kirpip yuzde olarak konumlar. Gune degmiyorsa null. */
export function placeInDay(start: string, end: string, day: { start: Date; end: Date }): Placement | null {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  const ds = day.start.getTime();
  const de = day.end.getTime();
  if (!(s < de && ds < e)) return null; // [s,e) ile [ds,de) kesismiyor
  const cs = Math.max(s, ds);
  const ce = Math.min(e, de);
  return {
    leftPct: ((cs - ds) / DAY_MS) * 100,
    widthPct: ((ce - cs) / DAY_MS) * 100,
    continuesBefore: s < ds,
    continuesAfter: e > de,
  };
}

/**
 * Ayni satirdaki isleri ust uste binmeyecek seritlere dagitir: baslangica gore
 * siralar, her isi son bitisi bu isin baslangicini gecmeyen ilk seride koyar.
 * Bitisik isler (15:00 biter, 15:00 baslar) ayni seride kalir ve cakisma sayilmaz.
 */
export function assignLanes<T extends { id: string; start: string; end: string }>(
  jobs: T[]
): { lane: Map<string, number>; laneCount: number; conflicting: Set<string> } {
  const sorted = [...jobs].sort((a, b) => +new Date(a.start) - +new Date(b.start));
  const laneEnds: number[] = [];
  const lane = new Map<string, number>();

  for (const job of sorted) {
    const begin = +new Date(job.start);
    let i = laneEnds.findIndex((laneEnd) => laneEnd <= begin);
    if (i === -1) {
      i = laneEnds.length;
      laneEnds.push(0);
    }
    laneEnds[i] = +new Date(job.end);
    lane.set(job.id, i);
  }

  const conflicting = new Set<string>();
  for (const a of jobs) {
    for (const b of jobs) {
      if (a.id !== b.id && overlaps(a.start, a.end, b.start, b.end)) conflicting.add(a.id);
    }
  }

  return { lane, laneCount: Math.max(1, laneEnds.length), conflicting };
}

/** Istanbul'da bugunun tarihi, YYYY-MM-DD. */
export function istanbulToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul' }).format(new Date());
}

/**
 * Pazartesi ile baslayan ay izgarasi (Turkiye'de hafta pazartesi baslar).
 * month 0 tabanli. UTC ile hesaplanir ki tarayicinin saat dilimi gunu kaydirmasin.
 */
export function monthGrid(year: number, month: number): { leadingBlanks: number; days: number } {
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay(); // 0 = Pazar
  return {
    leadingBlanks: (firstWeekday + 6) % 7,
    days: new Date(Date.UTC(year, month + 1, 0)).getUTCDate(),
  };
}
