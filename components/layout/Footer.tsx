import Link from 'next/link';
import { church } from '@/lib/content';

/**
 * Footer — links to standalone pages, copyright, address strip.
 * Scene 6 carries the full contact treatment; this is the legal tail.
 */
export function Footer() {
  return (
    <footer className="container-editorial hairline-top py-10 md:py-12">
      <div className="grid md:grid-cols-12 gap-8 md:gap-10">
        {/* Wordmark + address */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <span className="font-display text-display-sm text-fg leading-none">
            Faith Baptist
          </span>
          <span className="caption-mono text-fg-muted">{church.city}</span>
          <address className="not-italic font-body text-small text-fg-muted mt-3 leading-[1.6]">
            {church.address.street}<br />
            {church.address.city}, {church.address.state} {church.address.zip}
          </address>
        </div>

        {/* Page links */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="caption-mono text-fg-muted mb-1">Pages</span>
          <Link href="/" className="caption-mono text-fg hover:text-accent transition-colors">Home</Link>
          <Link href="/about-us" className="caption-mono text-fg hover:text-accent transition-colors">About</Link>
          <Link href="/statement-of-faith" className="caption-mono text-fg hover:text-accent transition-colors">Statement of Faith</Link>
        </div>

        {/* Contact links */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <span className="caption-mono text-fg-muted mb-1">Contact</span>
          <a
            href={`mailto:${church.contact.email}`}
            className="caption-mono text-fg hover:text-accent transition-colors break-all"
          >
            {church.contact.email}
          </a>
          <a
            href={church.contact.phoneHref}
            className="caption-mono text-fg hover:text-accent transition-colors"
          >
            {church.contact.phone}
          </a>
          <a
            href={church.contact.donate}
            target="_blank"
            rel="noreferrer"
            className="caption-mono text-accent hover:opacity-80 transition-opacity"
          >
            Give ↗
          </a>
          <a
            href={church.contact.facebook}
            target="_blank"
            rel="noreferrer"
            className="caption-mono text-fg hover:text-accent transition-colors"
          >
            Facebook ↗
          </a>
        </div>
      </div>

      {/* Copyright strip */}
      <div className="hairline-top mt-10 md:mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <span className="caption-mono text-fg-muted">
          © {new Date().getFullYear()} {church.name}. All rights reserved.
        </span>
        <span className="caption-mono text-fg-muted">
          Built with care for the Grandview community
        </span>
      </div>
    </footer>
  );
}
