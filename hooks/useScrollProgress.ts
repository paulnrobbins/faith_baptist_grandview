'use client';

import { useEffect, useState } from 'react';

/**
 * Returns scroll progress through the document as 0..1.
 * Useful for synchronizing UI elements with the 3D scroll score.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0);
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute, { passive: true });
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  return progress;
}
