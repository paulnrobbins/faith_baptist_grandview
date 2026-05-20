'use client';

import { useEffect, useState } from 'react';

/**
 * Heuristic detection of low-end devices. Used to drop 3D quality
 * and disable ambient effects on weak hardware.
 *
 * Faith Baptist's audience is 80% mobile and includes rural users
 * on older phones with slow connections — this hook is critical.
 *
 * Triggers low-end mode if ANY of:
 *  - hardwareConcurrency < 4
 *  - deviceMemory < 4
 *  - connection.effectiveType is '2g' or 'slow-2g' or '3g'
 *  - connection.saveData is true
 */
export function useLowEndDevice(): boolean {
  const [lowEnd, setLowEnd] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: {
        effectiveType?: string;
        saveData?: boolean;
        addEventListener?: (e: string, cb: () => void) => void;
        removeEventListener?: (e: string, cb: () => void) => void;
      };
    };

    const detect = () => {
      const cores = nav.hardwareConcurrency ?? 8;
      const mem = nav.deviceMemory ?? 8;
      const eff = nav.connection?.effectiveType ?? '4g';
      const saveData = !!nav.connection?.saveData;
      const slow = eff === '2g' || eff === 'slow-2g' || eff === '3g';
      setLowEnd(cores < 4 || mem < 4 || slow || saveData);
    };

    detect();
    nav.connection?.addEventListener?.('change', detect);
    return () => nav.connection?.removeEventListener?.('change', detect);
  }, []);

  return lowEnd;
}
