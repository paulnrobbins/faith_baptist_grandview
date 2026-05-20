'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Idempotent GSAP setup — call once at app boot. */
export function registerGsap() {
  if (typeof window === 'undefined' || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  // Defaults tuned for editorial pacing (slower, gentler).
  gsap.defaults({ ease: 'power2.out', duration: 0.9 });
  registered = true;
}

export { gsap, ScrollTrigger };
