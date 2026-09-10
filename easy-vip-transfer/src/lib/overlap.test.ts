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
  // Cakisan kayit: Ahmet (d1) + Mercedes (v1)
  const busy: Busy[] = [{
    id: 'a1',
    customerName: 'Yılmaz',
    start: '2026-12-27T10:00:00+03:00',
    end: '2026-12-27T15:00:00+03:00',
    driverId: 'd1',
    vehicleId: 'v1',
  }];

  it('cakisan sey surucuyse surucunun adini yazar', () => {
    const msgs = describeConflicts(busy, {
      driverId: 'd1', driverName: 'Ahmet',
      vehicleId: 'v9', vehicleName: 'Audi',
    });
    expect(msgs).toHaveLength(1);
    expect(msgs[0]).toContain('Ahmet');
    expect(msgs[0]).not.toContain('Audi');
    expect(msgs[0]).toContain('Yılmaz');
  });

  it('cakisan sey aracsa aracin adini yazar, surucunun degil', () => {
    // Mehmet musait, cakisan sey Mercedes. Mesaj Mercedes demeli.
    const msgs = describeConflicts(busy, {
      driverId: 'd9', driverName: 'Mehmet',
      vehicleId: 'v1', vehicleName: 'Mercedes',
    });
    expect(msgs[0]).toContain('Mercedes');
    expect(msgs[0]).not.toContain('Mehmet');
  });

  it('hem surucu hem arac cakisiyorsa ikisini de yazar', () => {
    const msgs = describeConflicts(busy, {
      driverId: 'd1', driverName: 'Ahmet',
      vehicleId: 'v1', vehicleName: 'Mercedes',
    });
    expect(msgs[0]).toContain('Ahmet');
    expect(msgs[0]).toContain('Mercedes');
  });

  it('cakisma yoksa bos dizi doner', () => {
    expect(describeConflicts([], {
      driverId: 'd1', driverName: 'Ahmet',
      vehicleId: 'v1', vehicleName: 'Mercedes',
    })).toEqual([]);
  });
});
