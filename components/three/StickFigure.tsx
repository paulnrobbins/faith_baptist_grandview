'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Editorial stick figure — abstract human silhouette built from
 * primitives. Designed to read as "presence" rather than as a
 * character. Used on the porch (2 figures in conversation) and
 * in the church interior (pews + pastor at pulpit).
 *
 * The figure is anchored at its FEET (y=0 is ground), facing +z
 * by default. Rotate the parent <group> to aim it.
 *
 * @param sitting   true = seated proportions (used in pews)
 * @param gesturing true = one arm raised slightly (used in
 *                  conversation poses + pastor preaching)
 * @param shade     'dark' for silhouette, 'medium' for less weight
 */
interface StickFigureProps {
  sitting?: boolean;
  gesturing?: boolean;
  shade?: 'dark' | 'medium';
  position?: [number, number, number];
  rotation?: [number, number, number];
  /** Slight per-figure variance for crowd realism. */
  variance?: number;
}

export function StickFigure({
  sitting = false,
  gesturing = false,
  shade = 'dark',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  variance = 0,
}: StickFigureProps) {
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: shade === 'dark' ? '#1F1E1B' : '#3A3530',
      roughness: 0.95,
      metalness: 0,
    }),
    [shade],
  );

  // Sitting figure is shorter, standing is taller.
  const bodyHeight = sitting ? 0.35 : 0.55;
  const bodyY      = sitting ? 0.45 : 0.75;
  const headY      = sitting ? 0.72 : 1.1;
  // Slight side tilt for variance
  const tilt = variance * 0.04;

  return (
    <group position={position} rotation={rotation}>
      {/* Legs (only visible when standing — sitting hides them in pew) */}
      {!sitting && (
        <>
          <mesh position={[-0.05, 0.22, 0]} material={material} rotation={[0, 0, tilt]}>
            <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
          </mesh>
          <mesh position={[ 0.05, 0.22, 0]} material={material} rotation={[0, 0, -tilt]}>
            <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
          </mesh>
        </>
      )}

      {/* Torso */}
      <mesh position={[0, bodyY, 0]} material={material} rotation={[0, 0, tilt]}>
        <cylinderGeometry args={[0.07, 0.09, bodyHeight, 10]} />
      </mesh>

      {/* Head */}
      <mesh position={[0, headY, 0]} material={material}>
        <sphereGeometry args={[0.085, 12, 10]} />
      </mesh>

      {/* Arms */}
      {/* Left arm — neutral hanging down (or slightly forward if sitting) */}
      <mesh
        position={[-0.11, bodyY - 0.02, sitting ? 0.05 : 0]}
        rotation={[sitting ? Math.PI * 0.15 : 0, 0, tilt + Math.PI * 0.04]}
        material={material}
      >
        <cylinderGeometry args={[0.022, 0.022, 0.38, 8]} />
      </mesh>
      {/* Right arm — raised if gesturing (talking/preaching) */}
      <mesh
        position={[
          gesturing ? 0.18 : 0.11,
          gesturing ? bodyY + 0.18 : bodyY - 0.02,
          sitting ? 0.05 : 0,
        ]}
        rotation={[
          sitting ? Math.PI * 0.15 : 0,
          0,
          gesturing ? Math.PI * 0.35 : -(tilt + Math.PI * 0.04),
        ]}
        material={material}
      >
        <cylinderGeometry args={[0.022, 0.022, 0.38, 8]} />
      </mesh>
    </group>
  );
}
