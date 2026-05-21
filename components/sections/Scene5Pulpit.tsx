'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { scene5 } from '@/lib/content';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Scene 5 — At the Pulpit (Ministries + Sermons)
 *
 * Phase 4b polish. The "Justin at pulpit" atmosphere photo establishes
 * the spiritual center; the three ministry cards radiate out from it.
 * Each ministry gets the editorial frame treatment it deserves:
 *   01 → Youth Bible Quizzing
 *   02 → Special Sportsman of Rhea County
 *   03 → Homeless Outreach
 *
 * Each card alternates left/right photo placement for editorial
 * rhythm. Scroll-staggered reveals fire as each card enters viewport.
 * Sermon archive CTA closes the scene with full editorial weight.
 */
export function Scene5Pulpit() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Top-of-scene reveals
      const topReveals = [
        { sel: '[data-s5="numeral"]',    start: 'top 85%', end: 'top 60%' },
        { sel: '[data-s5="caption"]',    start: 'top 80%', end: 'top 55%' },
        { sel: '[data-s5="atmosphere"]', start: 'top 75%', end: 'top 40%' },
        { sel: '[data-s5="headline"]',   start: 'top 70%', end: 'top 40%' },
        { sel: '[data-s5="intro"]',      start: 'top 65%', end: 'top 35%' },
      ];
      topReveals.forEach(({ sel, start, end }) => {
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
              start, end,
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      // Atmosphere photo subtle parallax
      gsap.to('[data-s5="atmosphere"] img', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-s5="atmosphere"]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Each ministry card reveals independently as it enters viewport
      const cards = document.querySelectorAll<HTMLElement>('[data-ministry-card]');
      cards.forEach((card) => {
        // Photo slide + parallax
        const photo = card.querySelector<HTMLElement>('[data-ministry-photo]');
        const photoImg = card.querySelector<HTMLImageElement>('[data-ministry-photo] img');
        const text = card.querySelector<HTMLElement>('[data-ministry-text]');

        if (photo && text) {
          // Photo slides up + fades in
          gsap.fromTo(
            photo,
            { opacity: 0, y: 40, scale: 0.97 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 40%',
                toggleActions: 'play none none reverse',
              },
            },
          );
          // Text reveals slightly after, line by line
          gsap.fromTo(
            text.querySelectorAll('[data-card-line]'),
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                end: 'top 35%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
        // Subtle parallax on ministry photos
        if (photoImg) {
          gsap.to(photoImg, {
            yPercent: -5,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          });
        }
      });

      // Sermon CTA reveal
      gsap.fromTo(
        '[data-s5="sermon-cta"]',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-s5="sermon-cta"]',
            start: 'top 85%',
            end: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="ministries"
      data-scene="5"
      className="relative py-[var(--space-section)] bg-bg overflow-hidden"
    >
      <div className="container-editorial">
        {/* ATMOSPHERE PHOTO + HEADLINE — 5/7 editorial split */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start mb-20 md:mb-28">
          <figure
            data-s5="atmosphere"
            className="opacity-0 md:col-span-5 flex flex-col gap-3"
          >
            <div className="relative w-full aspect-[3/4] bg-bg-elevated overflow-hidden hairline-y">
              <Image
                src={scene5.atmospherePhoto}
                alt={scene5.atmospherePhotoCaption}
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover will-change-transform scale-105"
              />
            </div>
          </figure>

          <div className="md:col-span-7 flex flex-col gap-6 md:pt-4">
            <h2
              data-s5="headline"
              className="opacity-0 font-display text-display-lg text-fg leading-[0.95]"
            >
              {scene5.headline}
            </h2>
            <p
              data-s5="intro"
              className="opacity-0 font-body text-lead text-fg-muted leading-[1.55] max-w-[48ch]"
            >
              {scene5.intro}
            </p>
          </div>
        </div>

        {/* MINISTRY CARDS — alternating left/right, each with scroll reveal */}
        <div className="flex flex-col gap-24 md:gap-32">
          {scene5.ministries.map((m, index) => {
            const isOdd = index % 2 === 1;
            return (
              <article
                key={m.slug}
                data-ministry-card
                className="grid md:grid-cols-12 gap-10 md:gap-14 items-start"
              >
                <figure
                  data-ministry-photo
                  className={`md:col-span-6 ${isOdd ? 'md:order-2' : ''}`}
                >
                  <div className="relative w-full aspect-[4/5] md:aspect-[4/5] bg-bg-elevated overflow-hidden hairline-y">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover will-change-transform scale-105"
                    />
                  </div>
                </figure>

                <div
                  data-ministry-text
                  className={`md:col-span-6 flex flex-col gap-6 md:pt-2 ${isOdd ? 'md:order-1' : ''}`}
                >
                  <h3
                    data-card-line
                    className="font-display text-display-md text-fg leading-[1.0]"
                  >
                    {m.name}
                  </h3>

                  <p
                    data-card-line
                    className="font-display-italic text-lead text-accent leading-[1.3] max-w-[42ch]"
                  >
                    {m.tagline}
                  </p>

                  <div className="flex flex-col gap-4 mt-2">
                    {m.body.map((para, i) => (
                      <p
                        key={i}
                        data-card-line
                        className="font-body text-body text-fg leading-[1.65] max-w-[58ch]"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* SERMON ARCHIVE CTA — editorial close-out */}
        <div
          data-s5="sermon-cta"
          className="opacity-0 mt-24 md:mt-32 hairline-y py-10 md:py-12 grid md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-8 flex flex-col gap-3">
            <span className="caption-mono text-fg-muted">Sermon Archive</span>
            <p className="font-display text-display-md text-fg leading-[1.05]">
              Every sermon, ready when you are.
            </p>
            <p className="font-body text-body text-fg-muted max-w-[52ch] mt-2">
              Faith Baptist livestreams and archives every Sunday and Wednesday service on Facebook. Watch back what you missed, or send a friend.
            </p>
          </div>
          <a
            href={scene5.sermonArchive.href}
            target="_blank"
            rel="noreferrer"
            className="md:col-span-4 group inline-flex items-center justify-between gap-4 bg-fg text-bg px-6 py-5 rounded-2xl hover:bg-accent transition-colors duration-300"
          >
            <span className="flex flex-col gap-1">
              <span className="caption-mono opacity-70">Watch on Facebook</span>
              <span className="font-display text-display-sm leading-none">
                Sermons →
              </span>
            </span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-2xl"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
