'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLowEndDevice } from '@/hooks/useLowEndDevice';
import { useResponsive } from '@/hooks/useResponsive';
import { ChurchModel } from './ChurchModel';
import { Lighting } from './Lighting';
import { SceneCamera } from './SceneCamera';
import { Mist } from './Mist';

/**
 * Fixed full-viewport R3F canvas — the 3D layer behind all content.
 * Phase 3: mounts the country church, dawn lighting, scroll camera,
 *          and ambient mist.
 *
 * Falls back to a static dawn-gradient on:
 *   • prefers-reduced-motion
 *   • low-end devices (slow CPU, low memory, 2G/3G network, Save-Data)
 *
 * Faith Baptist Test: the static fallback is fully readable and
 * passes the "grandma's iPad" requirement.
 */
export function CanvasRoot() {
  const reducedMotion = useReducedMotion();
  const lowEnd = useLowEndDevice();
  const { isMobile } = useResponsive();
  const useStatic = reducedMotion || lowEnd;

  if (useStatic) {
    return <StaticFallback />;
  }

  // Mobile tunes for the 80% audience: fewer mist particles,
  // smaller shadow maps, lower DPR ceiling.
  const dprMax = isMobile ? 1.5 : 2;
  const mistCount = isMobile ? 70 : 140;
  const lowDetail = isMobile;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none canvas-fade-in"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, dprMax]}
        shadows={!isMobile}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        camera={{ position: [0, 1.8, 12], fov: 38, near: 0.1, far: 60 }}
        onCreated={({ scene }) => {
          // Atmospheric depth — fog matches the bg color so the
          // horizon dissolves into the page background.
          scene.fog = new THREE.FogExp2('#E8E4DC', 0.045);
          scene.background = null;
        }}
      >
        <Suspense fallback={null}>
          <Lighting lowDetail={lowDetail} />
          <SceneCamera />

          {/* Ground plane — receives shadows, gives the church
              something to sit on. Color matches bg for seamless blend. */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial color="#DCD7CB" roughness={1} />
          </mesh>

          <ChurchModel lowDetail={lowDetail} />
          <Mist count={mistCount} disabled={isMobile && lowEnd} />
        </Suspense>
      </Canvas>
    </div>
  );
}

/**
 * Static visual fallback — radial dawn glow on the fog-white bg.
 * No WebGL load. Reads correctly on every device down to feature phones.
 */
function StaticFallback() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(120% 70% at 50% 110%, rgba(160, 52, 30, 0.10) 0%, transparent 55%), ' +
          'radial-gradient(80% 60% at 50% 30%, rgba(255, 204, 149, 0.18) 0%, transparent 60%), ' +
          'linear-gradient(180deg, #E8E4DC 0%, #DDD8CD 100%)',
      }}
    />
  );
}
