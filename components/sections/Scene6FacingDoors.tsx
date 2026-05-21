'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { scene6, church, mission, beliefs } from '@/lib/content';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Scene 6 — Facing the Doors (Contact + Statement of Faith)
 *
 * Phase 4c polish. The closing scene mirrors Scene 1 (where the
 * visitor first saw the 3D church) by showing the real building
 * photographed. The dream becomes the place.
 *
 * Layout sequence:
 *   1. "06" numeral + caption
 *   2. Mark 5:19 sending line — the "go and tell" moment
 *   3. Mission card — "Healing Through God's Love" (church's own words)
 *   4. Building exterior photo — closing the loop visually
 *   5. Contact block (email + phone + address + Facebook + map)
 *   6. Statement of Faith collapsible accordion (9 articles)
 *   7. Link to full /statement-of-faith and /about-us pages
 */
export function Scene6FacingDoors() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const reveals = [
        { sel: '[data-s6="numeral"]', start: 'top 85%', end: 'top 60%' },
        { sel: '[data-s6="caption"]', start: 'top 80%', end: 'top 55%' },
        { sel: '[data-s6="sending"]', start: 'top 75%', end: 'top 45%' },
        { sel: '[data-s6="mission"]', start: 'top 70%', end: 'top 35%' },
        { sel: '[data-s6="photo"]',   start: 'top 65%', end: 'top 30%' },
        { sel: '[data-s6="contact"]', start: 'top 55%', end: 'top 20%' },
        { sel: '[data-s6="beliefs-intro"]', start: 'top 50%', end: 'top 15%' },
      ];
      reveals.forEach(({ sel, start, end }) => {
        gsap.fromTo(
          sel,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rootRef.current,
              start, end,
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      // Photo parallax
      gsap.to('[data-s6="photo"] img', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-s6="photo"]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="contact"
      data-scene="6"
      className="relative py-[var(--space-section)] bg-bg overflow-hidden"
    >
      <div className="container-editorial">
        {/* MARK 5:19 SENDING LINE — the "go and tell" moment, centered editorial */}
        <div
          data-s6="sending"
          className="opacity-0 max-w-[30ch] mx-auto text-center mb-16 md:mb-24 flex flex-col gap-5"
        >
          <p className="font-display-italic text-display-md md:text-display-lg text-fg leading-[1.0]">
            <span aria-hidden className="text-accent">“</span>
            {scene6.sendingLine}
            <span aria-hidden className="text-accent">”</span>
          </p>
          <span className="caption-mono text-accent">
            {scene6.sendingAttribution}
          </span>
        </div>

        {/* MISSION STATEMENT — "Healing Through God's Love" */}
        <div
          data-s6="mission"
          className="opacity-0 grid md:grid-cols-12 gap-8 md:gap-12 items-start hairline-y py-12 md:py-16 mb-16 md:mb-24"
        >
          <div className="md:col-span-5 flex flex-col gap-4">
            <span className="caption-mono text-fg-muted">Why we exist</span>
            <h2 className="font-display text-display-md md:text-display-lg text-fg leading-[0.95]">
              {mission.headline}
            </h2>
          </div>
          <p className="md:col-span-7 md:pt-3 font-body text-lead text-fg leading-[1.55] max-w-[56ch]">
            {mission.body}
          </p>
        </div>

        {/* BUILDING EXTERIOR PHOTO — closes the visual loop from Scene 1 */}
        <figure
          data-s6="photo"
          className="opacity-0 mb-16 md:mb-24 -mx-[var(--space-gutter)] md:mx-0"
        >
          <div className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-bg-elevated hairline-y">
            <Image
              src={scene6.closingPhoto}
              alt={scene6.closingPhotoCaption}
              fill
              sizes="(max-width: 768px) 100vw, 88vw"
              className="object-cover will-change-transform scale-105"
            />
          </div>
          <figcaption className="sr-only">
            {scene6.closingPhotoCaption}
          </figcaption>
        </figure>

        {/* CONTACT BLOCK — email + phone + address + Facebook + Give */}
        <div
          data-s6="contact"
          className="opacity-0 grid md:grid-cols-12 gap-10 md:gap-12 hairline-y py-12 md:py-16 mb-16 md:mb-24"
        >
          <div className="md:col-span-7 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${church.contact.email}`}
                className="font-display text-display-sm text-fg leading-[1.15] hover:text-accent transition-colors break-all"
              >
                {church.contact.email}
              </a>
              <a
                href={church.contact.phoneHref}
                className="font-display text-display-sm text-fg leading-[1.15] hover:text-accent transition-colors"
              >
                {church.contact.phone}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-2">
              <a
                href={church.contact.donate}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-bg px-5 py-3 rounded-full caption-mono hover:bg-fg transition-colors duration-300"
              >
                Give to Faith Baptist
                <span aria-hidden>↗</span>
              </a>
              <a
                href={church.contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="caption-mono text-fg hairline-bottom pb-1 hover:text-accent transition-colors"
              >
                Find us on Facebook ↗
              </a>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-5">
            <address className="not-italic font-display text-display-sm text-fg leading-[1.15]">
              {church.address.street}<br />
              {church.address.city}, {church.address.state} {church.address.zip}
            </address>
            <a
              href={church.address.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="caption-mono text-accent hairline-bottom self-start pb-1 mt-1 hover:opacity-80 transition-opacity"
            >
              Get Directions ↗
            </a>
          </div>
        </div>

        {/* STATEMENT OF FAITH — collapsible accordion, all 9 articles */}
        <div
          data-s6="beliefs-intro"
          className="opacity-0 mb-8 md:mb-10 flex flex-col gap-3 max-w-[44ch]"
        >
          <h3 className="font-display text-display-md text-fg leading-[1.05]">
            Statement of Faith
          </h3>
          <p className="font-body text-body text-fg-muted mt-1 leading-[1.6]">
            {beliefs.preamble}
          </p>
        </div>

        {/* The 9 articles — each is its own collapsible <details> for
            progressive disclosure. Works without JavaScript. */}
        <div className="flex flex-col">
          {beliefs.articles.map((article, i) => (
            <details
              key={article.heading}
              className="group hairline-top py-6 md:py-7"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                <h4 className="font-display text-display-sm text-fg leading-[1.05]">
                  {article.heading}
                </h4>
                <span
                  aria-hidden
                  className="caption-mono text-fg shrink-0 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="pt-6 md:pt-7 flex flex-col gap-3 max-w-[64ch]">
                <p className="font-body text-body text-fg leading-[1.65]">
                  {article.body}
                </p>
                <span className="caption-mono text-fg-muted mt-2">
                  {article.scripture}
                </span>
              </div>
            </details>
          ))}
          <div className="hairline-top pt-8 mt-2 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <a
              href="/statement-of-faith"
              className="caption-mono text-accent hairline-bottom self-start pb-1 hover:opacity-80 transition-opacity"
            >
              Read the full Statement of Faith →
            </a>
            <a
              href="/about-us"
              className="caption-mono text-fg-muted hairline-bottom self-start pb-1 hover:text-accent transition-colors"
            >
              About Faith Baptist ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
