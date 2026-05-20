'use client';

import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

let lenisInstance: Lenis | null = null;

/**
 * Boot Lenis smooth-scroll and bind it to GSAP's ticker so
 * ScrollTrigger updates per-frame in sync with Lenis.
 *
 * Returns a cleanup function for React effects.
 */
export function bootLenis(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Respect reduced-motion: skip Lenis entirely and use native scroll.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    return () => {};
  }

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    // On mobile we still let touch scroll feel native — Lenis adds
    // just a soft easing on the inertia.
  });

  // ScrollTrigger ↔ Lenis bridge.
  lenisInstance.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenisInstance?.destroy();
    lenisInstance = null;
  };
}

/** Programmatic scroll — used by nav links. */
export function scrollTo(
  target: string | number | HTMLElement,
  opts?: { offset?: number; duration?: number },
) {
  lenisInstance?.scrollTo(target, opts);
}
