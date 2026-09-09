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

export function describeConflicts(
  busy: Busy[],
  driverName: string | null,
  vehicleName: string | null
): string[] {
  return busy.map((b) => {
    const who = b.driverId && driverName ? driverName : vehicleName ?? 'Kayıt';
    return `${who} ${fmt.format(new Date(b.start))} – ${fmt.format(new Date(b.end))} arasında dolu (müşteri: ${b.customerName}).`;
  });
}
