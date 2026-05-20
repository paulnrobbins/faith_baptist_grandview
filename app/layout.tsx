import type { Metadata, Viewport } from 'next';
import { Fraunces } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Providers } from '@/components/layout/Providers';
import { Nav } from '@/components/layout/Nav';
import { meta, church } from '@/lib/content';
import './globals.css';

/* ============================================================
   FONTS — locked per Phase 1 brief §4
   Fraunces (display) via next/font/google
   Geist + Geist Mono (body + caption) via the official `geist`
   package (Vercel-published, self-hosted — more reliable than
   the Google Fonts CDN, which has periodic 404s for Geist).
   All SIL OFL, free for production use.
   ============================================================ */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK'],
});

/* ============================================================
   METADATA — SEO + social sharing
   ============================================================ */
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  metadataBase: new URL(meta.canonical),
  alternates: {
    canonical: meta.canonical,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.canonical,
    siteName: 'Faith Baptist Church',
    images: [{ url: meta.ogImage, width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180' },
  },
  robots: { index: true, follow: true },
  authors: [{ name: 'Faith Baptist Church' }],
  category: 'religion',
};

export const viewport: Viewport = {
  themeColor: '#E8E4DC',
  width: 'device-width',
  initialScale: 1,
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org Church entity — gives Google rich knowledge of who/where/when.
  const churchSchema = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: church.name,
    description: meta.description,
    url: meta.canonical,
    telephone: church.contact.phone,
    email: church.contact.email,
    image: `${meta.canonical}${meta.ogImage}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: church.address.street,
      addressLocality: church.address.city,
      addressRegion: church.address.state,
      postalCode: church.address.zip,
      addressCountry: 'US',
    },
    sameAs: [church.contact.facebook],
    openingHoursSpecification: church.serviceTimes.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.day,
      opens: s.time.includes('a.m.')
        ? s.time.replace(/\D/g, '').padStart(4, '0').replace(/(\d\d)(\d\d)/, '$1:$2')
        : `${parseInt(s.time) + 12}:00`,
      name: s.label,
    })),
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }}
        />
      </head>
      <body className="grain-overlay font-body antialiased">
        {/* Skip-to-content link — keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-fg focus:text-bg focus:px-4 focus:py-2 focus:rounded-full focus:caption-mono focus:no-underline"
        >
          Skip to content
        </a>

        {/* Without JS, GSAP can't run, so the opacity-0 starting states
            would persist and hide content. This noscript stylesheet
            forces all scroll-revealed elements visible. */}
        <noscript>
          <style>{`
            [data-anim],
            [data-s2], [data-s3], [data-s4], [data-s5], [data-s6],
            [data-ministry-photo], [data-ministry-text] {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
