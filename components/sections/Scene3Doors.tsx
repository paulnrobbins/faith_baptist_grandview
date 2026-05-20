'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { scene3 } from '@/lib/content';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Scene 3 — The Doors Open (Pastor Justin Dannel's testimony)
 *
 * THE signature trust-earning moment of the site. Justin's story
 * (meth addiction → repentance → evangelism) earns its own scene
 * with editorial dignity. Layout choices honor the testimony:
 *
 *   01 → Massive "03" numeral as section marker
 *        (hybridizing Option C brutalist into Option B documentary)
 *   02 → Framing line: "The man who preaches here..."
 *   03 → Headshot photo with editorial frame treatment
 *   04 → Pastor name + role
 *   05 → Testimony paragraph 1 (the THEN: addiction, jail, homeless)
 *   06 → Pull-quote: "Jesus called me to repentance." — the pivot
 *   07 → Testimony paragraph 2 (the SURRENDER)
 *   08 → Secondary photo: Justin with open Bible (the NOW)
 *   09 → Testimony paragraph 3 (the EVANGELIST calling)
 *   10 → Mark 5:19 scripture quote in full — the verse he's living
 *
 * Scroll choreography is synchronized with the 3D door-opening
 * animation. As doors crack (scroll ~0.45), the pull-quote hits.
 * As doors swing fully open (scroll ~0.58), the scripture quote
 * is fully revealed. Each piece earns its own moment.
 */
export function Scene3Doors() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Each reveal element scrolls in at a different point through
      // the section. The start/end percentages are calibrated so the
      // pull-quote and final scripture land in sync with doors opening.
      const revealSequence = [
        { selector: '[data-s3="numeral"]',      start: 'top 85%', end: 'top 60%' },
        { selector: '[data-s3="framing"]',      start: 'top 75%', end: 'top 50%' },
        { selector: '[data-s3="photo-primary"]',start: 'top 70%', end: 'top 40%' },
        { selector: '[data-s3="identity"]',     start: 'top 65%', end: 'top 35%' },
        { selector: '[data-s3="testimony-1"]',  start: 'top 60%', end: 'top 25%' },
        { selector: '[data-s3="pull-quote"]',   start: 'top 50%', end: 'top 15%' },
        { selector: '[data-s3="testimony-2"]',  start: 'top 40%', end: 'top 5%' },
        { selector: '[data-s3="photo-secondary"]',start: 'top 35%', end: 'top -5%' },
        { selector: '[data-s3="testimony-3"]',  start: 'top 25%', end: 'top -15%' },
        { selector: '[data-s3="scripture"]',    start: 'top 15%', end: 'top -25%' },
      ];

      revealSequence.forEach(({ selector, start, end }) => {
        gsap.fromTo(
          selector,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rootRef.current,
              start,
              end,
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      // Subtle parallax drift on the primary photo — gives the photo
      // a sense of being a moving moment, not a static portrait.
      gsap.to('[data-s3="photo-primary"] img', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
      gsap.to('[data-s3="photo-secondary"] img', {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
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
      id="pastor"
      data-scene="3"
      className="relative py-[var(--space-section)] overflow-hidden"
    >
      {/* Subtle bg gradient — keeps testimony readable while letting
          the 3D door-opening moment glow through behind. Transparent
          at top, soft fog at center where body text lives, transparent
          at bottom for the scripture quote to sit on the canvas. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(232,228,220,0.7) 22%, rgba(232,228,220,0.85) 60%, rgba(232,228,220,0.5) 88%, transparent 100%)',
        }}
      />

      <div className="container-editorial relative">
        {/* MASSIVE "03" NUMERAL — section marker, brutalist-borrowed */}
        <div
          data-s3="numeral"
          className="opacity-0 flex items-start gap-4 mb-8 md:mb-12"
        >
          <span
            className="font-display text-fg leading-[0.85] tracking-[-0.04em] select-none"
            style={{ fontSize: 'clamp(5rem, 16vw, 12rem)' }}
            aria-hidden
          >
            03
          </span>
          <span className="caption-mono mt-3 md:mt-5 max-w-[14ch]">
            {scene3.caption}
          </span>
        </div>

        {/* FRAMING LINE — the establishing shot of the scene */}
        <p
          data-s3="framing"
          className="opacity-0 font-display text-display-sm md:text-display-md text-fg leading-[1.1] max-w-[26ch] md:max-w-[34ch] mb-16 md:mb-24"
        >
          {scene3.framing}
        </p>

        {/* MAIN GRID: photo + identity + testimony */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* PHOTO PRIMARY — headshot, Pattern B (Frame) */}
          <figure
            data-s3="photo-primary"
            className="opacity-0 md:col-span-5 lg:col-span-4 flex flex-col gap-3"
          >
            <div className="relative w-full aspect-[4/5] bg-bg-elevated overflow-hidden hairline-y">
              <Image
                src={scene3.pastor.photo}
                alt={scene3.pastor.photoCaption}
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover will-change-transform scale-105"
                priority={false}
              />
            </div>
            <figcaption className="caption-mono text-fg-muted leading-snug">
              {scene3.pastor.photoCaption}
            </figcaption>
          </figure>

          {/* RIGHT COLUMN: identity + testimony stream */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-10 md:gap-12">
            {/* IDENTITY — name + role */}
            <div data-s3="identity" className="opacity-0 flex flex-col gap-2">
              <span className="caption-mono text-accent">
                {scene3.pastor.role}
              </span>
              <h2 className="font-display text-display-lg text-fg leading-[0.95]">
                {scene3.pastor.name}
              </h2>
            </div>

            {/* TESTIMONY 1 — the THEN */}
            <p
              data-s3="testimony-1"
              className="opacity-0 font-body text-lead text-fg leading-[1.55] max-w-[54ch]"
            >
              {scene3.pastor.testimony[0]}
            </p>

            {/* PULL-QUOTE — the PIVOT */}
            <blockquote
              data-s3="pull-quote"
              className="opacity-0 relative py-6 md:py-8 my-2 md:my-4"
            >
              <span
                aria-hidden
                className="absolute -left-1 md:-left-3 top-0 bottom-0 w-px bg-accent"
              />
              <p className="font-display-italic text-display-md md:text-display-lg text-accent leading-[1.0] max-w-[22ch] pl-6 md:pl-10">
                {scene3.pastor.pullQuote}
              </p>
            </blockquote>

            {/* TESTIMONY 2 — the SURRENDER */}
            <p
              data-s3="testimony-2"
              className="opacity-0 font-body text-lead text-fg leading-[1.55] max-w-[54ch]"
            >
              {scene3.pastor.testimony[1]}
            </p>

            {/* PHOTO SECONDARY + TESTIMONY 3 in mobile-friendly grid */}
            <div className="grid md:grid-cols-7 gap-8 md:gap-10 items-start">
              <figure
                data-s3="photo-secondary"
                className="opacity-0 md:col-span-3 flex flex-col gap-3"
              >
                <div className="relative w-full aspect-[3/4] bg-bg-elevated overflow-hidden hairline-y">
                  <Image
                    src={scene3.pastor.photoSecondary}
                    alt={scene3.pastor.photoSecondaryCaption}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover will-change-transform scale-105"
                  />
                </div>
                <figcaption className="caption-mono text-fg-muted leading-snug">
                  {scene3.pastor.photoSecondaryCaption}
                </figcaption>
              </figure>

              {/* TESTIMONY 3 — the CALLING */}
              <p
                data-s3="testimony-3"
                className="opacity-0 md:col-span-4 font-body text-lead text-fg leading-[1.55]"
              >
                {scene3.pastor.testimony[2]}
              </p>
            </div>
          </div>
        </div>

        {/* SCRIPTURE — Mark 5:19 quoted in full, editorial mono caption */}
        <div
          data-s3="scripture"
          className="opacity-0 mt-20 md:mt-28 hairline-top pt-8 md:pt-10 flex flex-col gap-4 max-w-[68ch]"
        >
          <span className="caption-mono text-accent">
            The verse Justin lives by
          </span>
          <p className="font-display-italic text-display-sm md:text-display-md text-fg leading-[1.1]">
            <span aria-hidden className="text-accent">“</span>
            {scene3.pastor.scriptureQuote}
            <span aria-hidden className="text-accent">”</span>
          </p>
          <span className="caption-mono text-fg-muted">
            {scene3.pastor.scriptureSource}
          </span>
        </div>
      </div>
    </section>
  );
}
