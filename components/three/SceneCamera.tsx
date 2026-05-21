'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState, lerp, easeOutExpo } from '@/lib/scrollState';

/* ============================================================
   SCENE CAMERA — cinematic scroll-driven path:
   exterior → through doors → down the aisle → at the pulpit.

   The full journey happens during Scene 1's scroll range
   (approx progress 0.00 → 0.18). After that, the editorial
   content (Scene 2+) has solid backgrounds covering the canvas.

   Camera position (pos) AND look target (look) are interpolated
   separately so the camera can naturally tilt/aim while moving.
   ============================================================ */

interface Waypoint {
  t: number;
  pos: [number, number, number];
  look: [number, number, number];
}

const WAYPOINTS: Waypoint[] = [
  // 1. Far approach — see the church in dawn fog
  { t: 0.00, pos: [0, 1.8, 12.0], look: [0, 1.6,  0.0] },
  // 2. Closer — porch comes into focus
  { t: 0.04, pos: [0, 1.7,  7.0], look: [0, 1.6,  0.0] },
  // 3. At the porch — doors still closed
  { t: 0.06, pos: [0, 1.6,  4.5], look: [0, 1.6,  1.0] },
  // 4. Doors crack open (door anim fires 0.05 → 0.11)
  { t: 0.10, pos: [0, 1.55, 2.7], look: [0, 1.55, 0.0] },
  // 5. Through the doorway — entering the church
  { t: 0.13, pos: [0, 1.55, 1.4], look: [0, 1.55,-1.5] },
  // 6. Mid-aisle — pews on both sides
  { t: 0.16, pos: [0, 1.55, 0.0], look: [0, 1.55,-2.0] },
  // 7. At the pulpit — final resting position
  { t: 0.20, pos: [0, 1.55,-1.4], look: [0, 1.5, -2.2] },
];

function sampleWaypoints(progress: number) {
  if (progress <= WAYPOINTS[0].t) {
    return { pos: WAYPOINTS[0].pos, look: WAYPOINTS[0].look };
  }
  const last = WAYPOINTS[WAYPOINTS.length - 1];
  if (progress >= last.t) {
    return { pos: last.pos, look: last.look };
  }
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    const a = WAYPOINTS[i];
    const b = WAYPOINTS[i + 1];
    if (progress >= a.t && progress <= b.t) {
      const local = (progress - a.t) / (b.t - a.t);
      const eased = easeOutExpo(local);
      return {
        pos: [
          lerp(a.pos[0],  b.pos[0],  eased),
          lerp(a.pos[1],  b.pos[1],  eased),
          lerp(a.pos[2],  b.pos[2],  eased),
        ] as [number, number, number],
        look: [
          lerp(a.look[0], b.look[0], eased),
          lerp(a.look[1], b.look[1], eased),
          lerp(a.look[2], b.look[2], eased),
        ] as [number, number, number],
      };
    }
  }
  return { pos: last.pos, look: last.look };
}

export function SceneCamera() {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3());
  const lookCurrent = useRef(new THREE.Vector3(0, 1.6, 0));
  const tempVec    = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const { pos, look } = sampleWaypoints(scrollState.progress);

    // Smoothly lerp camera position toward target waypoint each frame.
    // Higher lerpFactor → more responsive; lower → smoother.
    const lerpFactor = Math.min(1, delta * 6);
    tempVec.current.set(pos[0], pos[1], pos[2]);
    camera.position.lerp(tempVec.current, lerpFactor);

    // Lerp the look target too — keeps the camera aim from snapping
    // between waypoints, which would otherwise feel jarring near the
    // doorway when the look-direction pivots inward.
    lookTarget.current.set(look[0], look[1], look[2]);
    lookCurrent.current.lerp(lookTarget.current, lerpFactor);
    camera.lookAt(lookCurrent.current);
  });

  return null;
}
