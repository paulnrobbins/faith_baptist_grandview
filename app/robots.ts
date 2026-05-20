import type { MetadataRoute } from 'next';
import { meta } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${meta.canonical}/sitemap.xml`,
    host: meta.canonical,
  };
}
