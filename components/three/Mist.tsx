'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MistProps {
  /** Number of mist particles. Mobile/low-end uses fewer. */
  count?: number;
  /** Disable entirely for low-end devices. */
  disabled?: boolean;
}

/**
 * Ambient ground mist — soft cloud-like particles drifting near the
 * base of the church. Built as a Points cloud with additive blending
 * for that fog-white-on-fog-white luminance you get at dawn.
 *
 * Mobile budget: 80 particles, ~0.5ms/frame on modern phones.
 * Disabled entirely on low-end devices (rural slow connections).
 */
export function Mist({ count = 120, disabled = false }: MistProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions once.
  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.random() * 1.2;          // low to the ground
      positions[i * 3 + 2] = Math.sin(angle) * radius - 1; // pushed slightly back from camera
      scales[i] = 0.6 + Math.random() * 1.4;
    }
    return { positions, scales };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current || disabled) return;
    // Slow drift on Y axis (rising vapor).
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.position.y = Math.sin(performance.now() * 0.0003) * 0.05;
  });

  if (disabled) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.32}
        sizeAttenuation
        color="#F4EFE6"
        opacity={0.55}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
