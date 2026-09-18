import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

// page.tsx bir client bilesen oldugu icin metadata veremez; Wix'teki baslik burada korunur.
export const metadata: Metadata = pageMetadata(
  "Araçlarımız - Easyviptransfer",
  "Araçlarımız - Bodrum Transfer, Bodrum Vip Transfer, Bodrum Havaalanı transfer, Bodrum Havalimanı transfer, Bodrum Havaalanı vip transfer, English Speaking drivers",
  '/araclarimiz',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
