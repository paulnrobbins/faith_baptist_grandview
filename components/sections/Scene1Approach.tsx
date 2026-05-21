'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { scene1, church } from '@/lib/content';
import { gsap } from '@/lib/gsap';

/**
 * Scene 1 — Approach (Hero)
 *
 * Phase 3: loaded-entrance choreography. The 3D church renders behind
 * (via CanvasRoot) approaching the camera position [0, 1.8, 12].
 *
 * Content choreography (runs once on mount):
 *   0.0s  caption fades in
 *   0.2s  headline reveals line-by-line (stagger from below)
 *   1.4s  CTAs slide up
 *   1.8s  service-times pill fades in
 *   2.0s  sign-photo detail card fades in (desktop only)
 *
 * Mobile (80% of traffic) gets the same choreography but slightly
 * tighter timing. prefers-reduced-motion collapses to a 1-frame fade.
 */
export function Scene1Approach() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('[data-anim]', { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('[data-anim="caption"]',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.1,
      )
      .fromTo('[data-anim="headline-line"]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 },
        0.25,
      )
      .fromTo('[data-anim="cta"]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
        1.3,
      )
      .fromTo('[data-anim="pill"]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.6,
      )
      .fromTo('[data-anim="detail-card"]',
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.1 },
        1.9,
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Split the headline so each word can stagger in independently.
  const headlineWords = scene1.headline.split(' ');

  return (
    <section
      ref={rootRef}
      id="top"
      data-scene="1"
      className="relative min-h-[100svh] flex flex-col justify-end pb-10 md:pb-16 pt-24 md:pt-28"
    >
      {/* Atmospheric sign-and-cross detail card — desktop only, top-right.
          Adds editorial-photography credibility without competing with 3D. */}
      <figure
        data-anim="detail-card"
        className="hidden lg:flex absolute top-32 right-8 xl:right-12 w-[180px] xl:w-[210px] flex-col gap-2 opacity-0"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-bg-elevated">
          <Image
            src={scene1.signPhoto}
            alt="Faith Baptist sign with cross"
            fill
            sizes="210px"
            className="object-cover"
            priority={false}
          />
        </div>
      </figure>

      <div className="container-editorial flex flex-col gap-8 md:gap-10">
        {/* Headline — words stagger in from below for the loaded-entrance moment */}
        <h1 className="font-display text-display-xl text-fg max-w-[15ch] leading-[0.95]">
          <span className="inline-flex flex-wrap gap-x-[0.25em] gap-y-2">
            {headlineWords.map((word, i) => (
              <span
                key={i}
                data-anim="headline-line"
                className="inline-block opacity-0 will-change-transform"
              >
                {word.toLowerCase() === scene1.emphasisWord.toLowerCase() ? (
                  <span className="font-display-italic text-accent">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </span>
        </h1>

        {/* CTAs + service-times pill row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <a
              data-anim="cta"
              href={scene1.ctaPrimary.href}
              className="group inline-flex items-center gap-2 bg-fg text-bg px-5 py-3 rounded-full caption-mono opacity-0 hover:bg-accent transition-colors duration-300 ease-editorial"
            >
              {scene1.ctaPrimary.label}
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              data-anim="cta"
              href={scene1.ctaSecondary.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 caption-mono text-fg hairline-bottom pb-1 opacity-0 hover:text-accent transition-colors duration-300"
            >
              {scene1.ctaSecondary.label}
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          </div>

          {/* Service-times pill — Faith Baptist Test: 5-second findability */}
          <div
            data-anim="pill"
            className="inline-flex flex-col gap-1 bg-bg-elevated/85 backdrop-blur-sm px-4 py-3 rounded-2xl self-start md:self-end opacity-0 hairline-y"
          >
            <span className="caption-mono text-fg-muted">Sunday Services</span>
            <div className="flex flex-col gap-0.5 font-mono text-small text-fg">
              {church.serviceTimesHero.map((s) => (
                <span key={s.time}>
                  {s.time} <span className="text-fg-muted">{s.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
