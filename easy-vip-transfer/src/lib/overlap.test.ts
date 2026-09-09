import { describe, it, expect } from 'vitest';
import { overlaps, describeConflicts, type Busy } from './overlap';

describe('overlaps', () => {
  it('ic ice gecen araliklar cakisir', () => {
    expect(overlaps(
      '2026-12-27T10:00:00+03:00', '2026-12-27T15:00:00+03:00',
      '2026-12-27T12:00:00+03:00', '2026-12-27T14:00:00+03:00'
    )).toBe(true);
  });

  it('bitisik araliklar cakismaz', () => {
    expect(overlaps(
      '2026-12-27T10:00:00+03:00', '2026-12-27T15:00:00+03:00',
      '2026-12-27T15:00:00+03:00', '2026-12-27T18:00:00+03:00'
    )).toBe(false);
  });

  it('cok gunluk is ayni gunu kapsayan isle cakisir', () => {
    expect(overlaps(
      '2026-12-27T08:00:00+03:00', '2026-12-29T20:00:00+03:00',
      '2026-12-28T10:00:00+03:00', '2026-12-28T12:00:00+03:00'
    )).toBe(true);
  });
});

describe('describeConflicts', () => {
  const busy: Busy[] = [{
    id: 'a1',
    customerName: 'Yılmaz',
    start: '2026-12-27T10:00:00+03:00',
    end: '2026-12-27T15:00:00+03:00',
    driverId: 'd1',
    vehicleId: 'v1',
  }];

  it('surucu doluysa surucu adiyla mesaj uretir', () => {
    const msgs = describeConflicts(busy, 'Ahmet', null);
    expect(msgs).toHaveLength(1);
    expect(msgs[0]).toContain('Ahmet');
    expect(msgs[0]).toContain('Yılmaz');
  });

  it('cakisma yoksa bos dizi doner', () => {
    expect(describeConflicts([], 'Ahmet', 'Mercedes')).toEqual([]);
  });
});
