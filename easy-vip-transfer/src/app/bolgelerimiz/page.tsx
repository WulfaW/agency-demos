import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';
import RoutesPageContent from '@/components/RoutesPageContent';
import RegionIndex from '@/components/RegionIndex';

export const metadata: Metadata = pageMetadata(
  "Bölgelerimiz - Bodrum Havaalanı Transfer - Easyviptransfer",
  "Bölgelerimiz - EasyVipTransfer, Bodrum Transfer, Bodrum Vip Transfer, Bodrum airport transfer, Bodrum havaalanı vip transfer, English speaking drivers",
  '/bolgelerimiz',
);

export default function RoutesPage() {
  return (
    <RoutesPageContent>
      <RegionIndex />
    </RoutesPageContent>
  );
}
