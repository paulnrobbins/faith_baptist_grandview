import Link from 'next/link';
import type { Metadata } from 'next';
import { beliefs, church, meta } from '@/lib/content';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: `Statement of Faith | ${church.name}`,
  description:
    'The doctrinal statement of Faith Baptist Church, Grandview, TN. Nine articles of belief grounded in Scripture, taught and lived by the congregation.',
  alternates: { canonical: `${meta.canonical}/statement-of-faith` },
  openGraph: {
    title: `Statement of Faith | ${church.name}`,
    description: 'The nine articles of belief that shape Faith Baptist Church, Grandview, TN.',
    url: `${meta.canonical}/statement-of-faith`,
    siteName: church.name,
  },
};

export default function StatementOfFaithPage() {
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

          {/* Page header */}
          <header className="grid md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-24">
            <div className="md:col-span-7 flex flex-col gap-6">
              <span className="caption-mono text-accent">
                What we believe · Faith Baptist Church
              </span>
              <h1 className="font-display text-display-xl text-fg leading-[0.9]">
                Statement<br />of Faith
              </h1>
            </div>
            <p className="md:col-span-5 md:pt-3 font-body text-lead text-fg-muted leading-[1.55]">
              {beliefs.preamble}
            </p>
          </header>

          {/* 9 articles — open by default since this is the dedicated page */}
          <div className="flex flex-col gap-12 md:gap-16">
            {beliefs.articles.map((article) => (
              <article
                key={article.heading}
                className="grid md:grid-cols-12 gap-6 md:gap-10 hairline-top pt-8 md:pt-10"
              >
                {/* Numeral + heading column */}
                <div className="md:col-span-4 flex items-start">
                  <h2 className="font-display text-display-sm md:text-display-md text-fg leading-[1.0]">
                    {article.heading}
                  </h2>
                </div>

                {/* Body + scripture column */}
                <div className="md:col-span-8 flex flex-col gap-4">
                  <p className="font-body text-lead text-fg leading-[1.55] max-w-[58ch]">
                    {article.body}
                  </p>
                  <span className="caption-mono text-fg-muted mt-1">
                    {article.scripture}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Closing CTAs */}
          <div className="mt-20 md:mt-28 hairline-top pt-10 md:pt-12 grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 flex flex-col gap-4">
              <span className="caption-mono text-fg-muted">Questions about what we believe?</span>
              <p className="font-display text-display-sm text-fg leading-[1.1] max-w-[28ch]">
                We&rsquo;d be honored to talk through any of it with you in person.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-3 md:pt-3">
              <Link
                href="/about-us"
                className="caption-mono text-accent hairline-bottom self-start pb-1 hover:opacity-80 transition-opacity"
              >
                About Faith Baptist →
              </Link>
              <Link
                href="/#visit"
                className="caption-mono text-fg hairline-bottom self-start pb-1 hover:text-accent transition-colors"
              >
                Plan a visit →
              </Link>
              <a
                href={`mailto:${church.contact.email}`}
                className="caption-mono text-fg hairline-bottom self-start pb-1 hover:text-accent transition-colors break-all"
              >
                {church.contact.email}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
