import Link from 'next/link';
import { REGIONS } from '@/data/regions';

/**
 * Tum bolge sayfalarina ic baglanti. Sunucu bileseni: 53 bolgenin verisi tarayiciya gitmez,
 * yalnizca baglantilarin HTML'i gider. Baglanti metni sayfanin H1'i ("Yalikavak Transfer"),
 * yani anahtar kelimeyi tasiyor.
 */
export default function RegionIndex() {
  const sorted = [...REGIONS].sort((a, b) => a.heading.localeCompare(b.heading, 'tr'));

  return (
    <section aria-labelledby="tum-bolgeler" className="max-w-6xl mx-auto px-6 py-20">
      <h2 id="tum-bolgeler" className="text-3xl font-serif text-foreground mb-2">Tüm Transfer Bölgelerimiz</h2>
      <p className="text-muted text-sm mb-10">Milas-Bodrum Havalimanı'ndan ve Bodrum'dan {sorted.length} bölgeye VIP transfer.</p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
        {sorted.map((r) => (
          <li key={r.slug}>
            <Link href={`/bolgelerimiz/${r.slug}`} className="text-sm text-muted hover:text-accent transition-colors">
              {r.heading}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
