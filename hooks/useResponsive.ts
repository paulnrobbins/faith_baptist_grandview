'use client';

import { useEffect, useState } from 'react';

const MOBILE_MAX = 767;
const TABLET_MAX = 1023;

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export function useResponsive(): { bp: Breakpoint; isMobile: boolean; isTablet: boolean; isDesktop: boolean } {
  // SSR-safe default: assume mobile (80% of Faith Baptist traffic).
  const [bp, setBp] = useState<Breakpoint>('mobile');

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w <= MOBILE_MAX)  setBp('mobile');
      else if (w <= TABLET_MAX) setBp('tablet');
      else setBp('desktop');
    };
    compute();
    window.addEventListener('resize', compute, { passive: true });
    return () => window.removeEventListener('resize', compute);
  }, []);

  return {
    bp,
    isMobile: bp === 'mobile',
    isTablet: bp === 'tablet',
    isDesktop: bp === 'desktop',
  };
}
