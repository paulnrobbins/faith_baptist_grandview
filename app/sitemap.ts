import type { MetadataRoute } from 'next';
import { meta } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: meta.canonical,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${meta.canonical}/about-us`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${meta.canonical}/statement-of-faith`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];
}
