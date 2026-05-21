import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { mission, values, beliefs, church, meta, scene3 } from '@/lib/content';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: `About | ${church.name}`,
  description:
    'About Faith Baptist Church, Grandview, TN — our mission, our values, and what we believe. Pastor Justin Dannel preaches the gospel that delivered him from 18 years of meth addiction.',
  alternates: { canonical: `${meta.canonical}/about-us` },
  openGraph: {
    title: `About | ${church.name}`,
    description:
      'A small country church in Grandview, Tennessee. Our mission, our values, and what we believe.',
    url: `${meta.canonical}/about-us`,
    siteName: church.name,
  },
};

export default function AboutPage() {
  return (
    <>
      <main className="relative bg-bg pt-32 md:pt-40 pb-[var(--space-section)]">
        <div className="container-editorial">
          {/* Back link */}
          <Link
            href="/"
            className="caption-mono text-fg-muted hairline-bottom self-start pb-1 inline-flex items-center gap-2 hover:text-accent transition-colors mb-12 md:mb-16"
          >
            ← Back to home
          </Link>

          {/* HEADER — Mission as the page hero */}
          <header className="grid md:grid-cols-12 gap-8 md:gap-12 mb-20 md:mb-28">
            <div className="md:col-span-7 flex flex-col gap-6">
              <span className="caption-mono text-accent">About Faith Baptist Church</span>
              <h1 className="font-display text-display-xl text-fg leading-[0.9]">
                {mission.headline}
              </h1>
            </div>
            <p className="md:col-span-5 md:pt-3 font-body text-lead text-fg-muted leading-[1.55]">
              {mission.body}
            </p>
          </header>

          {/* PASTOR INTRO — brief, links to Scene 3 testimony */}
          <section className="grid md:grid-cols-12 gap-10 md:gap-12 hairline-y py-12 md:py-16 mb-20 md:mb-28 items-start">
            <figure className="md:col-span-4 flex flex-col gap-3">
              <div className="relative w-full aspect-[4/5] bg-bg-elevated overflow-hidden hairline-y">
                <Image
                  src={scene3.pastor.photo}
                  alt={scene3.pastor.photoCaption}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover scale-105"
                />
              </div>
              <figcaption className="caption-mono text-fg-muted">
                {scene3.pastor.photoCaption}
              </figcaption>
            </figure>
            <div className="md:col-span-8 flex flex-col gap-5">
              <span className="caption-mono text-fg-muted">Our pastor</span>
              <h2 className="font-display text-display-md text-fg leading-[0.95]">
                {scene3.pastor.name}
              </h2>
              <p className="font-body text-lead text-fg leading-[1.55] max-w-[58ch]">
                {scene3.pastor.testimony[0]} {scene3.pastor.testimony[1]}
              </p>
              <Link
                href="/#pastor"
                className="caption-mono text-accent hairline-bottom self-start pb-1 mt-2 hover:opacity-80 transition-opacity"
              >
                Read the full testimony →
              </Link>
            </div>
          </section>

          {/* VALUES — 8 items in editorial grid */}
          <section className="mb-20 md:mb-28">
            <div className="flex flex-col gap-4 max-w-[44ch] mb-12 md:mb-16">
              <span className="caption-mono text-accent">Our values</span>
              <h2 className="font-display text-display-lg text-fg leading-[0.95]">
                What we hold to.
              </h2>
              <p className="font-body text-body text-fg-muted mt-2 leading-[1.6]">
                {values.preamble}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {values.items.map((v) => (
                <article
                  key={v.name}
                  className="flex flex-col gap-3 hairline-top pt-6"
                >
                  <h3 className="font-display text-display-sm text-fg leading-[1.1]">
                    {v.name}
                  </h3>
                  <p className="font-body text-body text-fg-muted leading-[1.55]">
                    {v.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* BELIEFS PREVIEW — link to full statement-of-faith page */}
          <section className="hairline-y py-12 md:py-16 grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-7 flex flex-col gap-4">
              <h2 className="font-display text-display-md text-fg leading-[1.0]">
                Nine articles, grounded in Scripture.
              </h2>
              <p className="font-body text-body text-fg-muted mt-1 leading-[1.6] max-w-[52ch]">
                {beliefs.preamble}
              </p>
            </div>
            <ul className="md:col-span-5 flex flex-col gap-3 md:pt-3">
              {beliefs.articles.map((article) => (
                <li
                  key={article.heading}
                >
                  <span className="font-display text-lead text-fg leading-[1.25]">
                    {article.heading}
                  </span>
                </li>
              ))}
              <Link
                href="/statement-of-faith"
                className="caption-mono text-accent hairline-bottom self-start pb-1 mt-4 hover:opacity-80 transition-opacity"
              >
                Read the full Statement of Faith →
              </Link>
            </ul>
          </section>

          {/* Contact CTA at bottom */}
          <section className="mt-20 md:mt-28 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="font-display text-display-sm text-fg leading-[1.1] max-w-[28ch]">
              Come see for yourself.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#visit"
                className="inline-flex items-center gap-2 bg-fg text-bg px-5 py-3 rounded-full caption-mono hover:bg-accent transition-colors duration-300"
              >
                Plan Your Visit
                <span aria-hidden>→</span>
              </Link>
              <a
                href={church.contact.phoneHref}
                className="inline-flex items-center gap-2 caption-mono text-fg hairline-bottom pb-1 hover:text-accent transition-colors"
              >
                {church.contact.phone}
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
