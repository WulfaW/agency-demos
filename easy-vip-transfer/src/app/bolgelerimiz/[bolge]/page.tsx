import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FaqAndFooter from '@/components/FaqAndFooter';
import StickyMobileBar from '@/components/StickyMobileBar';
import { REGIONS, getRegion } from '@/data/regions';
import { SITE_URL } from '@/lib/site';

// Yalnizca tasinan bolgeler; bilinmeyen slug 404 doner.
export const dynamicParams = false;

export function generateStaticParams() {
  return REGIONS.map((r) => ({ bolge: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ bolge: string }> }): Promise<Metadata> {
  const { bolge } = await params;
  const r = getRegion(bolge);
  if (!r) return {};
  const path = `/bolgelerimiz/${r.slug}`;
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: path },
    openGraph: { title: r.title, description: r.description, url: path, locale: 'tr_TR', type: 'website' },
  };
}

export default async function RegionPage({ params }: { params: Promise<{ bolge: string }> }) {
  const { bolge } = await params;
  const r = getRegion(bolge);
  if (!r) notFound();

  const url = `${SITE_URL}/bolgelerimiz/${r.slug}`;

  // SSS gorunen metin ve yapilandirilmis veri AYNI kaynaktan uretilir: sayfada celisen rakam olamaz.
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Bölgelerimiz', item: `${SITE_URL}/bolgelerimiz` },
        { '@type': 'ListItem', position: 3, name: r.name, item: url },
      ],
    },
    ...(r.faq.length > 0
      ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: r.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }]
      : []),
  ];

  return (
    <main className="min-h-screen bg-transparent text-foreground relative pb-16 md:pb-0 pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Navbar />

      <article className="max-w-3xl mx-auto px-6 pt-10">
        <nav aria-label="breadcrumb" className="text-xs text-muted mb-8">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-foreground">Ana Sayfa</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/bolgelerimiz" className="hover:text-foreground">Bölgelerimiz</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{r.name}</li>
          </ol>
        </nav>

        <p className="text-sm tracking-[0.2em] text-accent uppercase mb-3">VIP Transfer</p>
        <h1 className="text-4xl md:text-5xl font-serif mb-12">{r.heading}</h1>

        <div className="space-y-10">
          {r.sections.map((s, i) => (
            <section key={i} className="space-y-4">
              {s.heading && <h2 className="text-2xl font-serif">{s.heading}</h2>}
              {s.paragraphs.map((p, j) => (
                <p key={j} className="text-muted leading-relaxed">{p}</p>
              ))}
            </section>
          ))}
        </div>

        {r.faq.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-serif mb-8">Sıkça Sorulan Sorular</h2>
            <dl className="space-y-6">
              {r.faq.map((f, i) => (
                <div key={i}>
                  <dt className="font-medium mb-2">{f.q}</dt>
                  <dd className="text-muted leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div className="mt-16 mb-24 rounded-3xl border border-border bg-white/[0.02] p-8 text-center">
          <p className="font-serif text-2xl mb-2">{r.name} transferinizi planlayalım</p>
          <p className="text-muted text-sm mb-6">Güzergâhınızı ve tarihinizi seçin, WhatsApp'tan hemen dönüş yapalım.</p>
          <Link href="/#calculator" className="inline-block bg-accent text-background px-8 py-3 rounded-full font-semibold">
            Transfer Talebi Oluştur
          </Link>
        </div>
      </article>

      <FaqAndFooter />
      <StickyMobileBar />
    </main>
  );
}
