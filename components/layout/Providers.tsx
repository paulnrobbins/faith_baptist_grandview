'use client';

import { useEffect, type ReactNode } from 'react';
import { registerGsap } from '@/lib/gsap';
import { bootLenis } from '@/lib/lenis';
import { initScrollState } from '@/lib/scrollState';

/**
 * Client-side providers. Boots:
 *  - GSAP + ScrollTrigger registration
 *  - Lenis smooth scroll bound to GSAP's ticker
 *  - Module-level scroll state singleton (read by R3F useFrame)
 *
 * Wraps the entire app in app/layout.tsx.
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();
    initScrollState();
    const cleanup = bootLenis();
    return cleanup;
  }, []);

  return <>{children}</>;
}
