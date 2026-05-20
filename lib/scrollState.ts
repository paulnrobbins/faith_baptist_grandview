/**
 * Module-level scroll state. Read by R3F components inside useFrame
 * without triggering React re-renders (which would tank perf at 60fps).
 *
 * Updated by a single passive scroll listener initialized once in Providers.
 *
 * Lenis subscribes to this too so smooth-scrolled progress is reflected
 * accurately when Lenis is active (and falls back to native scrollY when
 * Lenis is disabled by reduced-motion).
 */

interface ScrollState {
  /** 0..1 — scroll progress through the document. */
  progress: number;
  /** Document scroll position in px (matches window.scrollY when Lenis is off). */
  scrollY: number;
  /** Viewport height, kept in sync for fast lookups inside useFrame. */
  viewport: number;
}

export const scrollState: ScrollState = {
  progress: 0,
  scrollY: 0,
  viewport: typeof window !== 'undefined' ? window.innerHeight : 800,
};

let initialized = false;

/** Initialize the scroll listener exactly once. */
export function initScrollState() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const update = () => {
    const y = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.scrollY = y;
    scrollState.viewport = window.innerHeight;
    scrollState.progress = total > 0 ? Math.min(1, Math.max(0, y / total)) : 0;
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/* ============================================================
   PHASE MAPPING — converts global progress 0..1 to scene-local
   progress for each named beat in the scroll score. Used by
   3D camera + door choreography.
   ============================================================ */
export const SCENE_RANGES = {
  scene1: [0.00, 0.18],   // Approach — hero entrance
  scene2: [0.18, 0.38],   // Promise — dolly forward
  scene3: [0.38, 0.58],   // Doors open — signature moment
  scene4: [0.58, 0.74],   // Aisle — interior camera (Phase 4+)
  scene5: [0.74, 0.92],   // Pulpit — anchor at front (Phase 4+)
  scene6: [0.92, 1.00],   // Facing doors — turn around (Phase 4+)
} as const;

/** Returns 0..1 progress within a named scene (clamped). */
export function sceneProgress(scene: keyof typeof SCENE_RANGES): number {
  const [start, end] = SCENE_RANGES[scene];
  const p = scrollState.progress;
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}

/** Linear interpolate between two values. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Smooth easing — cubic-bezier-style settle for camera motion. */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
