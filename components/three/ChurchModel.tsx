'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneProgress, lerp, easeOutExpo } from '@/lib/scrollState';

/* ============================================================
   FAITH BAPTIST CHURCH — procedural 3D model
   ============================================================
   Built from R3F primitives based on the real building photo.
   Key faithful details:
     • White horizontal clapboard siding
     • Pitched main gable roof (dark gray, metal-looking)
     • Front porch with its own smaller gable (the signature
       "double-gable" detail of the actual building)
     • Raw wood posts holding up the porch
     • Lattice railings flanking the porch
     • White double doors that pivot open
     • V-shaped wooden truss in the porch gable peak
     • NO steeple — Faith Baptist doesn't have one. Telling the
       truth about the place matters more than the cliché.

   Polycount target: ~12k mobile / ~30k desktop. Achieved by
   using box/cylinder primitives instead of complex geometry.
   ============================================================ */

// Editorial color palette tuned to the Appalachian Documentary aesthetic.
const COLORS = {
  wallWhite:   '#F0EBE0',   // Slightly warm white — clapboard
  trimWhite:   '#F8F4ED',   // Lighter accent trim
  roofGray:    '#2D2F2A',   // Dark metal roof
  woodWarm:    '#8B6A48',   // Raw cedar posts
  woodDark:    '#5C4530',   // Aged door wood / lattice
  doorInner:   '#F2E7D5',   // Door interior (when light spills out)
  ground:      '#3A352C',   // Earth tone for foundation
} as const;

interface ChurchModelProps {
  /** Disable expensive features for low-end devices. */
  lowDetail?: boolean;
}

export function ChurchModel({ lowDetail = false }: ChurchModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const interiorLightRef = useRef<THREE.PointLight>(null);

  /* ============================================================
     SCROLL CHOREOGRAPHY — doors open during Scene 3
     Door rotation:        0%   → closed (0 rad)
                           60%  → cracked (0.3 rad)
                           100% → fully open (1.55 rad ≈ 89°)
     Interior light:       0    → 0 intensity
                           100% → 6 intensity (warm spill)
     ============================================================ */
  useFrame(() => {
    if (!groupRef.current) return;

    const t = easeOutExpo(sceneProgress('scene3'));

    // Doors swing outward — left negative, right positive.
    if (leftDoorRef.current && rightDoorRef.current) {
      const angle = lerp(0, 1.55, t);  // ~89° at full open
      leftDoorRef.current.rotation.y = angle;
      rightDoorRef.current.rotation.y = -angle;
    }

    // Interior light grows as doors open.
    if (interiorLightRef.current) {
      interiorLightRef.current.intensity = lerp(0, 6, t);
    }

    // Gentle ambient breathing on the whole model (very subtle, like
    // morning air shifting). Skip on low-detail.
    if (!lowDetail) {
      const t2 = performance.now() * 0.0003;
      groupRef.current.position.y = Math.sin(t2) * 0.008;
    }
  });

  // Memoize geometries to avoid recreating on every render.
  const wallMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.wallWhite, roughness: 0.92, metalness: 0.02 }),
    [],
  );
  const trimMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.trimWhite, roughness: 0.85, metalness: 0.02 }),
    [],
  );
  const roofMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.roofGray, roughness: 0.65, metalness: 0.3 }),
    [],
  );
  const woodMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.woodWarm, roughness: 0.92, metalness: 0 }),
    [],
  );
  const woodDarkMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.woodDark, roughness: 0.88, metalness: 0 }),
    [],
  );
  const doorInteriorMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: COLORS.doorInner,
      roughness: 0.5,
      metalness: 0,
      emissive: COLORS.doorInner,
      emissiveIntensity: 0.15,
    }),
    [],
  );

  /* Gable triangle geometry — auto-computed normals via ShapeGeometry. */
  const mainGableGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-3, 0);
    shape.lineTo(3, 0);
    shape.lineTo(0, 1.6);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);
  const porchGableGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2, 0);
    shape.lineTo(2, 0);
    shape.lineTo(0, 0.8);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ============================================================
          FOUNDATION (subtle dark band at ground level)
          ============================================================ */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[6.2, 0.3, 5.2]} />
        <meshStandardMaterial color={COLORS.ground} roughness={1} />
      </mesh>

      {/* ============================================================
          MAIN BUILDING — white clapboard rectangle
          ============================================================ */}
      <mesh position={[0, 1.9, 0]} castShadow receiveShadow material={wallMaterial}>
        <boxGeometry args={[6, 3.2, 5]} />
      </mesh>

      {/* Subtle horizontal trim lines to suggest clapboard siding
          (3 thin offsets, scaled for visual interest without poly bloat). */}
      {!lowDetail && [0.9, 1.7, 2.5, 3.3].map((y, i) => (
        <group key={i}>
          {/* Front trim */}
          <mesh position={[0, y, 2.51]}>
            <boxGeometry args={[6.01, 0.015, 0.005]} />
            <meshStandardMaterial color="#D8D2C5" roughness={0.9} />
          </mesh>
          {/* Side trims */}
          <mesh position={[3.01, y, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[5.01, 0.015, 0.005]} />
            <meshStandardMaterial color="#D8D2C5" roughness={0.9} />
          </mesh>
          <mesh position={[-3.01, y, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[5.01, 0.015, 0.005]} />
            <meshStandardMaterial color="#D8D2C5" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* ============================================================
          MAIN ROOF — pitched gable, dark gray metal
          Built from two rotated boxes meeting at apex.
          ============================================================ */}
      <group position={[0, 3.5, 0]}>
        {/* Left slope */}
        <mesh position={[-1.6, 0.9, 0]} rotation={[0, 0, Math.PI * 0.18]} castShadow material={roofMaterial}>
          <boxGeometry args={[3.6, 0.1, 5.4]} />
        </mesh>
        {/* Right slope */}
        <mesh position={[1.6, 0.9, 0]} rotation={[0, 0, -Math.PI * 0.18]} castShadow material={roofMaterial}>
          <boxGeometry args={[3.6, 0.1, 5.4]} />
        </mesh>
        {/* Front gable wall fill */}
        <mesh position={[0, 0.8, 2.5]} geometry={mainGableGeom}>
          <meshStandardMaterial color={COLORS.wallWhite} roughness={0.92} side={THREE.DoubleSide} />
        </mesh>
        {/* Back gable wall fill */}
        <mesh position={[0, 0.8, -2.5]} geometry={mainGableGeom} rotation={[0, Math.PI, 0]}>
          <meshStandardMaterial color={COLORS.wallWhite} roughness={0.92} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ============================================================
          FRONT PORCH — the signature double-gable detail
          A SMALLER pitched roof extending forward of the main building.
          ============================================================ */}
      {/* Porch floor */}
      <mesh position={[0, 0.5, 3]} receiveShadow material={trimMaterial}>
        <boxGeometry args={[3.6, 0.15, 1.4]} />
      </mesh>

      {/* Porch roof — smaller gable peak */}
      <group position={[0, 3.0, 3.0]}>
        <mesh position={[-1.1, 0.45, 0]} rotation={[0, 0, Math.PI * 0.2]} castShadow material={roofMaterial}>
          <boxGeometry args={[2.4, 0.08, 1.6]} />
        </mesh>
        <mesh position={[1.1, 0.45, 0]} rotation={[0, 0, -Math.PI * 0.2]} castShadow material={roofMaterial}>
          <boxGeometry args={[2.4, 0.08, 1.6]} />
        </mesh>
        {/* Porch gable fill (front side — where the V-truss lives) */}
        <mesh position={[0, 0.4, 0.8]} geometry={porchGableGeom}>
          <meshStandardMaterial color={COLORS.wallWhite} roughness={0.92} side={THREE.DoubleSide} />
        </mesh>

        {/* V-shaped wooden truss in the porch gable — Faith Baptist's signature */}
        {!lowDetail && (
          <>
            <mesh position={[-0.45, 0.25, 0.81]} rotation={[0, 0, -Math.PI * 0.22]} material={woodMaterial}>
              <boxGeometry args={[0.7, 0.07, 0.04]} />
            </mesh>
            <mesh position={[0.45, 0.25, 0.81]} rotation={[0, 0, Math.PI * 0.22]} material={woodMaterial}>
              <boxGeometry args={[0.7, 0.07, 0.04]} />
            </mesh>
            <mesh position={[0, 0.15, 0.81]} material={woodMaterial}>
              <boxGeometry args={[0.07, 0.5, 0.04]} />
            </mesh>
          </>
        )}
      </group>

      {/* ============================================================
          PORCH POSTS — raw wood, 4 corners
          ============================================================ */}
      {[[-1.6, 3.65], [1.6, 3.65], [-1.6, 2.4], [1.6, 2.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.7, z]} castShadow material={woodMaterial}>
          <cylinderGeometry args={[0.07, 0.08, 2.4, 8]} />
        </mesh>
      ))}

      {/* ============================================================
          LATTICE RAILINGS — flanking the porch entry
          Simplified as planes with crossed wood members
          ============================================================ */}
      {!lowDetail && [-1, 1].map((side) => (
        <group key={side} position={[side * 1.3, 0.85, 3.65]}>
          {/* Top rail */}
          <mesh material={woodDarkMaterial}>
            <boxGeometry args={[0.5, 0.04, 0.05]} />
          </mesh>
          {/* Bottom rail */}
          <mesh position={[0, -0.3, 0]} material={woodDarkMaterial}>
            <boxGeometry args={[0.5, 0.04, 0.05]} />
          </mesh>
          {/* Vertical pickets */}
          {[-0.18, -0.06, 0.06, 0.18].map((x) => (
            <mesh key={x} position={[x, -0.15, 0]} material={woodDarkMaterial}>
              <boxGeometry args={[0.025, 0.32, 0.025]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ============================================================
          STEPS — wooden, leading up to porch
          ============================================================ */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[0, 0.1 + i * 0.11, 3.85 + i * 0.18]}
          castShadow
          receiveShadow
          material={woodDarkMaterial}
        >
          <boxGeometry args={[1.4, 0.12, 0.25]} />
        </mesh>
      ))}

      {/* ============================================================
          DOORS — pivot groups at hinge positions, doors offset inside
          Left door hinges at x = -0.5 (its left edge)
          Right door hinges at x = +0.5 (its right edge)
          ============================================================ */}
      {/* Door frame (visible behind doors when open) */}
      <mesh position={[0, 1.6, 2.51]} material={woodDarkMaterial}>
        <boxGeometry args={[1.1, 1.95, 0.04]} />
      </mesh>
      {/* Interior glow plane behind doors */}
      <mesh position={[0, 1.6, 2.52]} material={doorInteriorMaterial}>
        <boxGeometry args={[1.0, 1.85, 0.005]} />
      </mesh>

      {/* LEFT DOOR — hinge at x = -0.5 */}
      <group ref={leftDoorRef} position={[-0.5, 1.6, 2.55]}>
        <mesh position={[0.25, 0, 0]} castShadow material={trimMaterial}>
          <boxGeometry args={[0.5, 1.9, 0.05]} />
        </mesh>
        {/* Panel detail */}
        <mesh position={[0.25, 0.35, 0.026]}>
          <boxGeometry args={[0.36, 0.6, 0.005]} />
          <meshStandardMaterial color="#E5DDD0" roughness={0.85} />
        </mesh>
        <mesh position={[0.25, -0.35, 0.026]}>
          <boxGeometry args={[0.36, 0.6, 0.005]} />
          <meshStandardMaterial color="#E5DDD0" roughness={0.85} />
        </mesh>
      </group>

      {/* RIGHT DOOR — hinge at x = +0.5 */}
      <group ref={rightDoorRef} position={[0.5, 1.6, 2.55]}>
        <mesh position={[-0.25, 0, 0]} castShadow material={trimMaterial}>
          <boxGeometry args={[0.5, 1.9, 0.05]} />
        </mesh>
        <mesh position={[-0.25, 0.35, 0.026]}>
          <boxGeometry args={[0.36, 0.6, 0.005]} />
          <meshStandardMaterial color="#E5DDD0" roughness={0.85} />
        </mesh>
        <mesh position={[-0.25, -0.35, 0.026]}>
          <boxGeometry args={[0.36, 0.6, 0.005]} />
          <meshStandardMaterial color="#E5DDD0" roughness={0.85} />
        </mesh>
      </group>

      {/* ============================================================
          INTERIOR LIGHT — point light just inside the doors.
          Grows in intensity as the doors open during Scene 3.
          ============================================================ */}
      <pointLight
        ref={interiorLightRef}
        position={[0, 1.6, 1.2]}
        color="#FFB870"
        intensity={0}
        distance={8}
        decay={1.8}
        castShadow={!lowDetail}
        shadow-mapSize-width={lowDetail ? 256 : 512}
        shadow-mapSize-height={lowDetail ? 256 : 512}
      />

      {/* ============================================================
          SIDE WINDOWS — simple rectangles, dark glass
          (Visible only when camera is at moderate distance)
          ============================================================ */}
      {!lowDetail && (
        <>
          {/* Left side, 2 windows */}
          {[-1, 1].map((side) => (
            <group key={side}>
              <mesh position={[-3.005, 2.0, side * 1.2]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.8, 1.0, 0.02]} />
                <meshStandardMaterial color="#3A3A3A" roughness={0.3} metalness={0.5} />
              </mesh>
              {/* Window trim */}
              <mesh position={[-3.001, 2.0, side * 1.2]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.88, 1.08, 0.03]} />
                <meshStandardMaterial color={COLORS.trimWhite} roughness={0.85} />
              </mesh>
            </group>
          ))}
          {/* Right side, 2 windows */}
          {[-1, 1].map((side) => (
            <group key={`r${side}`}>
              <mesh position={[3.005, 2.0, side * 1.2]} rotation={[0, -Math.PI / 2, 0]}>
                <boxGeometry args={[0.8, 1.0, 0.02]} />
                <meshStandardMaterial color="#3A3A3A" roughness={0.3} metalness={0.5} />
              </mesh>
              <mesh position={[3.001, 2.0, side * 1.2]} rotation={[0, -Math.PI / 2, 0]}>
                <boxGeometry args={[0.88, 1.08, 0.03]} />
                <meshStandardMaterial color={COLORS.trimWhite} roughness={0.85} />
              </mesh>
            </group>
          ))}
        </>
      )}
    </group>
  );
}
