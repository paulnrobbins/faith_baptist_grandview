'use client';

import { useEffect, useState } from 'react';
import { nav, church } from '@/lib/content';
import { cn } from '@/lib/utils';
import { scrollTo } from '@/lib/lenis';

/**
 * Editorial nav. Minimal by intent — the documentary aesthetic
 * doesn't want loud chrome competing with the 3D and the content.
 *
 * Cross-page-aware: anchors like '/#visit' smooth-scroll via Lenis
 * when already on home, otherwise navigate to home and let the
 * browser handle the hash. Plain '/about-us' style links navigate
 * to the standalone page.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /**
   * Returns true if we handled the click; caller should preventDefault.
   * Returns false to let the browser perform native navigation.
   */
  const handleLink = (href: string, external?: boolean): boolean => {
    if (external) return false;
    const onHome = typeof window !== 'undefined' && window.location.pathname === '/';
    const hashIndex = href.indexOf('#');

    // In-page hash scroll — only when already on home
    if (hashIndex !== -1 && onHome) {
      const hash = href.slice(hashIndex);
      const target = document.querySelector(hash) as HTMLElement | null;
      if (target) {
        scrollTo(target, { offset: -64, duration: 1.4 });
        setOpen(false);
        return true;
      }
    }
    // Otherwise let default navigation happen
    setOpen(false);
    return false;
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial',
        scrolled
          ? 'bg-bg/85 backdrop-blur-md hairline-bottom'
          : 'bg-transparent',
      )}
    >
      <div className="container-editorial flex items-center justify-between py-4 md:py-5">
        {/* Wordmark */}
        <a
          href="/"
          className="font-display text-base md:text-lg tracking-tight leading-none"
          aria-label="Faith Baptist Church, Grandview, TN — home"
        >
          <span className="block leading-none">Faith Baptist</span>
          <span className="caption-mono mt-1 block">{church.city}</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              onClick={(e) => {
                if (handleLink(link.href, link.external)) e.preventDefault();
              }}
              className="caption-mono hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden -mr-2 p-2"
        >
          <div className="relative h-3 w-6">
            <span
              className={cn(
                'absolute left-0 right-0 h-px bg-fg transition-all duration-300 ease-door',
                open ? 'top-1.5 rotate-45' : 'top-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 right-0 h-px bg-fg transition-all duration-300 ease-door',
                open ? 'top-1.5 -rotate-45' : 'top-3',
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-editorial',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
        aria-hidden={!open}
      >
        <nav className="container-editorial flex flex-col gap-6 pb-8 pt-4 hairline-top">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              onClick={(e) => {
                if (handleLink(link.href, link.external)) e.preventDefault();
              }}
              className="font-display text-2xl"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
