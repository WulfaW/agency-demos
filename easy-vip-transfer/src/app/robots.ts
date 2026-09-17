import type { MetadataRoute } from 'next';
import { INDEXABLE, SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // Demo arama motorlarina tamamen kapali (bkz. lib/site.ts).
  if (!INDEXABLE) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/'] },
      // Yapay zeka aramalari (AGENTS.md 5.4): acikca izin ver.
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot'],
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
