import data from './regions.json';

export type Region = {
  slug: string;
  /** Bolge adi, 'transfer' eki olmadan (breadcrumb, CTA). */
  name: string;
  /** Sayfa H1'i: Wix'teki orijinal H1 kelimeleri, Turkce yazimi duzeltilmis. */
  heading: string;
  title: string;
  description: string;
  h1: string;
  sections: { heading: string | null; paragraphs: string[] }[];
  faq: { q: string; a: string }[];
};

/** Wix'teki /bolgelerimiz/* sayfalarindan tasinan icerik. URL'ler birebir korunur. */
export const REGIONS = data as Region[];

export const getRegion = (slug: string) => REGIONS.find((r) => r.slug === slug);
