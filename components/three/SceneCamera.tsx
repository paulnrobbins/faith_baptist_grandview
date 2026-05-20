'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState, lerp, easeOutExpo } from '@/lib/scrollState';

/* ============================================================
   SCENE CAMERA — drives the scroll score from outside the church
   to the threshold (Phases 1–3). Phase 4+ extends inside.

   Camera waypoints (matched to SCENE_RANGES in scrollState):
     progress = 0.00 → at distance, eye-level     [0, 1.8, 12]
     progress = 0.18 → Scene 2 begins              [0, 1.6, 9]
     progress = 0.38 → Scene 3 begins, doors crack [0, 1.4, 4]
     progress = 0.58 → Scene 3 ends, doors open    [0, 1.4, 1.5]
   ============================================================ */

const WAYPOINTS = [
  { t: 0.00, pos: [0, 1.8, 12.0] },
  { t: 0.18, pos: [0, 1.7,  9.0] },
  { t: 0.30, pos: [0, 1.6,  6.5] },
  { t: 0.38, pos: [0, 1.5,  4.5] },
  { t: 0.50, pos: [0, 1.45, 2.8] },
  { t: 0.58, pos: [0, 1.40, 1.5] },
] as const;

function sampleWaypoints(progress: number): [number, number, number] {
  // Clamp to first/last waypoint outside scrubbed range.
  if (progress <= WAYPOINTS[0].t) return [...WAYPOINTS[0].pos] as [number, number, number];
  const last = WAYPOINTS[WAYPOINTS.length - 1];
  if (progress >= last.t) return [...last.pos] as [number, number, number];

  // Find bracketing waypoints and interpolate.
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    const a = WAYPOINTS[i];
    const b = WAYPOINTS[i + 1];
    if (progress >= a.t && progress <= b.t) {
      const local = (progress - a.t) / (b.t - a.t);
      const eased = easeOutExpo(local);
      return [
        lerp(a.pos[0], b.pos[0], eased),
        lerp(a.pos[1], b.pos[1], eased),
        lerp(a.pos[2], b.pos[2], eased),
      ];
    }
  }
  return [...last.pos] as [number, number, number];
}

export function SceneCamera() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 1.6, 0));
  const tempVec = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const [tx, ty, tz] = sampleWaypoints(scrollState.progress);

    // Smoothly lerp camera position toward target waypoint each frame.
    // The delta-based factor keeps motion consistent across framerates.
    const lerpFactor = Math.min(1, delta * 6);
    tempVec.current.set(tx, ty, tz);
    camera.position.lerp(tempVec.current, lerpFactor);

    // Always look toward the doors (slightly above center).
    target.current.set(0, 1.6, 0);
    camera.lookAt(target.current);
  });

  return null;
}
