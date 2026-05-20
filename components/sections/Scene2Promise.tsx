'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { scene2 } from '@/lib/content';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Scene 2 — The Promise
 *
 * Phase 3: scroll-scrubbed reveals. The 3D camera dollies forward
 * from [0, 1.7, 9] → [0, 1.5, 4.5] during this section (driven by
 * scrollState, not GSAP — see lib/scrollState.ts and SceneCamera.tsx).
 *
 * Content choreography is scroll-scrubbed:
 *   • Pull-quote reveals line-by-line as the section enters viewport
 *   • Body paragraph fades in slightly after
 *   • Photo card slides in from the right with subtle parallax
 *
 * This keeps the 3D dolly and the typographic reveal moving together
 * — the dolly creates the felt sense of "approaching," and the type
 * reveal sells it as "the promise being spoken to you."
 */
export function Scene2Promise() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      // Skip scroll-scrub on reduced-motion — just show content.
      return;
    }

    const ctx = gsap.context(() => {
      // Pull-quote lines reveal as the user enters the section.
      gsap.fromTo(
        '[data-s2="line"]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Body paragraph fades in just after.
      gsap.fromTo(
        '[data-s2="body"]',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 55%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Photo card — slides in from right with subtle parallax.
      gsap.fromTo(
        '[data-s2="photo"]',
        { opacity: 0, x: 40, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 65%',
            end: 'top 25%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Continuous parallax on the photo while in view.
      gsap.to('[data-s2="photo"] img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  // Split the pull-quote at sentence boundaries for line-by-line reveal.
  const lines = scene2.pullQuote.split(/, (?=[A-Z])|, (?=walks)|, (?=and)/);

  return (
    <section
      ref={rootRef}
      id="promise"
      data-scene="2"
      className="relative py-[var(--space-section)]"
    >
      <div className="container-editorial grid md:grid-cols-12 gap-8 md:gap-10">
        <span className="caption-mono md:col-span-2 md:pt-3">{scene2.caption}</span>

        <div className="md:col-span-7 md:col-start-3 flex flex-col gap-8">
          <blockquote className="font-display-italic text-display-md text-fg leading-[1.05]">
            <span aria-hidden className="text-accent inline-block mr-1">“</span>
            {lines.map((line, i) => (
              <span
                key={i}
                data-s2="line"
                className="inline-block opacity-0 will-change-transform"
              >
                {line}{i < lines.length - 1 ? ', ' : ''}
              </span>
            ))}
            <span aria-hidden className="text-accent inline-block ml-1">”</span>
          </blockquote>

          <p
            data-s2="body"
            className="font-body text-lead text-fg max-w-[55ch] opacity-0"
          >
            {scene2.body}
          </p>

          <span className="caption-mono text-fg-muted">— {scene2.attribution}</span>
        </div>

        {/* Photo card — porch conversation, embodies "we walk together" */}
        <figure
          data-s2="photo"
          className="md:col-span-3 md:col-start-10 mt-4 md:mt-0 flex flex-col gap-3 opacity-0"
        >
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-bg-elevated">
            <Image
              src={scene2.photo}
              alt={scene2.photoCaption}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover will-change-transform"
            />
          </div>
          <figcaption className="caption-mono text-fg-muted leading-snug">
            {scene2.photoCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
