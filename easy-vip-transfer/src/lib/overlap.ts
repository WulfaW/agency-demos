export type Busy = {
  id: string;
  customerName: string;
  start: string;
  end: string;
  driverId: string | null;
  vehicleId: string | null;
};

/** [start, end) yarı açık aralık — bitişik işler çakışmaz. */
export function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd);
}

const fmt = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
  timeZone: 'Europe/Istanbul',
});

/** Formda o an secili olan surucu/arac. Hangisinin cakistigini belirlemek icin id'ler sart. */
export type Secilen = {
  driverId: string | null;
  driverName: string | null;
  vehicleId: string | null;
  vehicleName: string | null;
};

/**
 * Cakisan her kayit icin bir mesaj uretir ve GERCEKTEN carpisan kaynagi adlandirir.
 * Sadece "kaydin surucusu var mi" diye bakmak yanlis isim yazdirir: Mehmet+Mercedes
 * girildiginde Mercedes doluysa mesaj "Mehmet dolu" der ve operator yanlis alani duzeltir.
 */
export function describeConflicts(busy: Busy[], secilen: Secilen): string[] {
  return busy.map((b) => {
    const carpisan: string[] = [];
    if (secilen.driverId && b.driverId === secilen.driverId && secilen.driverName) {
      carpisan.push(secilen.driverName);
    }
    if (secilen.vehicleId && b.vehicleId === secilen.vehicleId && secilen.vehicleName) {
      carpisan.push(secilen.vehicleName);
    }
    const kim = carpisan.length > 0 ? carpisan.join(' ve ') : 'Kayıt';
    return `${kim} ${fmt.format(new Date(b.start))} – ${fmt.format(new Date(b.end))} arasında dolu (müşteri: ${b.customerName}).`;
  });
}
