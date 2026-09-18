import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

// page.tsx bir client bilesen oldugu icin metadata veremez; Wix'teki baslik burada korunur.
export const metadata: Metadata = pageMetadata(
  "Hizmetlerimiz -Bodrum Havaalanı Transfer - EasyVipTransfer",
  "Hizmetlerimiz - EasyVipTransfer, Bodrum Transfer, Bodrum Vip Transfer, Bodrum airport transfer, Bodrum havaalanı vip transfer, English speaking drivers",
  '/hizmetlerimiz',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
