import { describe, it, expect } from 'vitest';
import { dayBounds, placeInDay, assignLanes, monthGrid } from './schedule';

describe('dayBounds', () => {
  it('Istanbul gece yarisini UTC olarak dogru verir', () => {
    const { start, end } = dayBounds('2026-12-27');
    expect(start.toISOString()).toBe('2026-12-26T21:00:00.000Z');
    expect(end.toISOString()).toBe('2026-12-27T21:00:00.000Z');
  });
});

describe('placeInDay', () => {
  const gun = dayBounds('2026-12-27');

  it('gun icindeki isi saatine gore konumlar', () => {
    const b = placeInDay('2026-12-27T10:00:00+03:00', '2026-12-27T15:00:00+03:00', gun)!;
    expect(b.leftPct).toBeCloseTo((10 / 24) * 100);
    expect(b.widthPct).toBeCloseTo((5 / 24) * 100);
    expect(b.continuesBefore).toBe(false);
    expect(b.continuesAfter).toBe(false);
  });

  it('cok gunlu isi gunun sinirlarinda kirpar ve devam isaretler', () => {
    const b = placeInDay('2026-12-26T20:00:00+03:00', '2026-12-28T08:00:00+03:00', gun)!;
    expect(b.leftPct).toBe(0);
    expect(b.widthPct).toBeCloseTo(100);
    expect(b.continuesBefore).toBe(true);
    expect(b.continuesAfter).toBe(true);
  });

  it('gune degmeyen is icin null doner', () => {
    expect(placeInDay('2026-12-28T10:00:00+03:00', '2026-12-28T12:00:00+03:00', gun)).toBeNull();
  });

  it('tam gece yarisinda biten onceki gun isi bu gune girmez', () => {
    expect(placeInDay('2026-12-26T22:00:00+03:00', '2026-12-27T00:00:00+03:00', gun)).toBeNull();
  });
});

describe('assignLanes', () => {
  it('ust uste binen isleri ayri seritlere koyar ve cakisma isaretler', () => {
    const r = assignLanes([
      { id: 'a', start: '2026-12-27T10:00:00+03:00', end: '2026-12-27T15:00:00+03:00' },
      { id: 'b', start: '2026-12-27T12:00:00+03:00', end: '2026-12-27T14:00:00+03:00' },
    ]);
    expect(r.laneCount).toBe(2);
    expect(r.lane.get('a')).not.toBe(r.lane.get('b'));
    expect(r.conflicting.has('a')).toBe(true);
    expect(r.conflicting.has('b')).toBe(true);
  });

  it('bitisik isleri ayni seritte tutar ve cakisma saymaz', () => {
    const r = assignLanes([
      { id: 'a', start: '2026-12-27T10:00:00+03:00', end: '2026-12-27T15:00:00+03:00' },
      { id: 'b', start: '2026-12-27T15:00:00+03:00', end: '2026-12-27T18:00:00+03:00' },
    ]);
    expect(r.laneCount).toBe(1);
    expect(r.conflicting.size).toBe(0);
  });

  it('bos satir tek serit yuksekligi alir', () => {
    expect(assignLanes([]).laneCount).toBe(1);
  });
});

describe('monthGrid', () => {
  it('pazartesi baslangicli izgarada ayin ilk gununden onceki bos hucreleri sayar', () => {
    expect(monthGrid(2026, 8)).toEqual({ leadingBlanks: 1, days: 30 });  // Eylul 2026: 1'i Salı
    expect(monthGrid(2026, 10)).toEqual({ leadingBlanks: 6, days: 30 }); // Kasim 2026: 1'i Pazar
    expect(monthGrid(2027, 1)).toEqual({ leadingBlanks: 0, days: 28 });  // Subat 2027: 1'i Pazartesi
  });

  it('artik yilda subati 29 gun sayar', () => {
    expect(monthGrid(2028, 1).days).toBe(29);
  });
});
