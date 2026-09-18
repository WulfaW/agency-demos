import type { Metadata } from 'next';

/**
 * Canli alan adinin www'li hali. Wix www'siz adresi buraya yonlendiriyor;
 * canonical'lar ve sitemap bununla birebir uyusmali, yoksa Google celiskili sinyal alir.
 */
export const SITE_URL = 'https://www.easyviptransfer.com';

/**
 * Arama motorlarina acik mi? Varsayilan KAPALI.
 *
 * Demo (vercel.app) musterinin Wix sitesiyle birebir ayni bolge icerigini tasiyor.
 * Indekslenirse lansmandan once musterinin mevcut siralamasiyla yarisir.
 *
 * LANSMANDA Vercel'de NEXT_PUBLIC_SITE_INDEXABLE=true yapilmali.
 * Yapilmazsa canli site Google'a kapali kalir ve siralama kaybolur.
 */
export const INDEXABLE = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true';

/** Sayfaya ozel baslik, aciklama, canonical ve Open Graph. Canonical yolu metadataBase (SITE_URL) ile birlesir. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, locale: 'tr_TR', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}
