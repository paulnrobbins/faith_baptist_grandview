'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { scene4, church } from '@/lib/content';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Scene 4 — Down the Aisle (Plan Your Visit)
 *
 * Phase 4b polish. The aisle photo lands first as the visual answer
 * to "what does it look like inside?", then the practical details
 * (service times, address, what-to-expect) hang off it like magazine
 * caption blocks.
 *
 * Scroll choreography:
 *   numeral → caption → photo (parallax) → headline → intro
 *   → service block → address block → first-time cards (staggered)
 *
 * Faith Baptist Test enforced: all 4 services visible at full size,
 * `tel:` and maps links functional, address typographically prominent.
 */
export function Scene4Aisle() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const reveals = [
        { sel: '[data-s4="numeral"]',  start: 'top 85%', end: 'top 60%' },
        { sel: '[data-s4="caption"]',  start: 'top 80%', end: 'top 55%' },
        { sel: '[data-s4="photo"]',    start: 'top 75%', end: 'top 40%' },
        { sel: '[data-s4="headline"]', start: 'top 65%', end: 'top 35%' },
        { sel: '[data-s4="intro"]',    start: 'top 60%', end: 'top 30%' },
        { sel: '[data-s4="services"]', start: 'top 55%', end: 'top 20%' },
        { sel: '[data-s4="address"]',  start: 'top 50%', end: 'top 15%' },
      ];

      reveals.forEach(({ sel, start, end }) => {
        gsap.fromTo(
          sel,
          { opacity: 0, y: 30 },
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

      // First-time cards stagger together as a group
      gsap.fromTo(
        '[data-s4="ft-card"]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-s4="ft-block"]',
            start: 'top 80%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Parallax on the aisle photo — subtle, gives it dimension
      gsap.to('[data-s4="photo"] img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-s4="photo"]',
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
      id="visit"
      data-scene="4"
      className="relative py-[var(--space-section)] bg-bg overflow-hidden"
    >
      <div className="container-editorial">
        {/* MASSIVE "04" NUMERAL — section marker matching Scene 3's "03" */}
        <div
          data-s4="numeral"
          className="opacity-0 flex items-start gap-4 mb-8 md:mb-10"
        >
          <span
            className="font-display text-fg leading-[0.85] tracking-[-0.04em] select-none"
            style={{ fontSize: 'clamp(5rem, 16vw, 12rem)' }}
            aria-hidden
          >
            04
          </span>
          <span
            data-s4="caption"
            className="opacity-0 caption-mono mt-3 md:mt-5 max-w-[14ch]"
          >
            {scene4.caption}
          </span>
        </div>

        {/* AISLE PHOTO — the visual answer to "what's it like inside?" */}
        <figure
          data-s4="photo"
          className="opacity-0 mb-16 md:mb-24 -mx-[var(--space-gutter)] md:mx-0"
        >
          <div className="relative w-full aspect-[3/2] md:aspect-[16/9] overflow-hidden bg-bg-elevated hairline-y">
            <Image
              src={scene4.photo}
              alt={scene4.photoCaption}
              fill
              sizes="(max-width: 768px) 100vw, 88vw"
              className="object-cover will-change-transform scale-105"
              priority={false}
            />
          </div>
          <figcaption className="caption-mono text-fg-muted mt-3 px-[var(--space-gutter)] md:px-0">
            {scene4.photoCaption}
          </figcaption>
        </figure>

        {/* HEADLINE + INTRO */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
          <h2
            data-s4="headline"
            className="opacity-0 md:col-span-7 font-display text-display-lg text-fg leading-[0.95]"
          >
            {scene4.headline}
          </h2>
          <p
            data-s4="intro"
            className="opacity-0 md:col-span-5 font-body text-lead text-fg-muted leading-[1.55] md:pt-3"
          >
            {scene4.intro}
          </p>
        </div>

        {/* SERVICE TIMES + ADDRESS — editorial caption layout */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 hairline-y py-10 md:py-14 mb-16 md:mb-24">
          {/* All 4 services — editorial type stack */}
          <div data-s4="services" className="opacity-0 md:col-span-7 flex flex-col gap-6">
            <span className="caption-mono text-fg-muted">When we gather</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {church.serviceTimes.map((s) => (
                <li key={`${s.day}-${s.time}`} className="flex flex-col gap-1">
                  <span className="caption-mono text-accent">{s.day}</span>
                  <span className="font-display text-display-sm text-fg leading-none">
                    {s.time}
                  </span>
                  <span className="font-body text-small text-fg-muted mt-1">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Address + phone */}
          <div data-s4="address" className="opacity-0 md:col-span-5 flex flex-col gap-6">
            <span className="caption-mono text-fg-muted">Where to find us</span>
            <address className="not-italic font-display text-display-sm text-fg leading-[1.15]">
              {church.address.street}<br />
              {church.address.city}, {church.address.state} {church.address.zip}
            </address>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={church.address.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="caption-mono text-accent hairline-bottom self-start pb-1 hover:opacity-80 transition-opacity"
              >
                Open in Google Maps ↗
              </a>
              <a
                href={church.contact.phoneHref}
                className="font-mono text-small text-fg hover:text-accent transition-colors"
              >
                {church.contact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* WHAT TO EXPECT — 3 editorial cards, scroll-staggered */}
        <div data-s4="ft-block" className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col gap-3 max-w-[44ch]">
            <span className="caption-mono text-accent">Your first Sunday</span>
            <p className="font-display text-display-sm text-fg leading-[1.15]">
              Walking through the door for the first time? Here&rsquo;s what to know.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {scene4.firstTime.map((item, i) => (
              <div
                key={item.title}
                data-s4="ft-card"
                className="opacity-0 flex flex-col gap-3 hairline-top pt-6"
              >
                <span className="caption-mono text-fg-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-display-sm text-fg leading-[1.1]">
                  {item.title}
                </h3>
                <p className="font-body text-body text-fg-muted leading-[1.6]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
