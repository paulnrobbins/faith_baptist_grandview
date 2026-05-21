'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState, lerp, easeOutExpo } from '@/lib/scrollState';
import { StickFigure } from './StickFigure';

/**
 * Faith Baptist Grandview — procedural country church model.
 *
 * SCROLL-DRIVEN ARCHITECTURE (per scroll choreography):
 *   - Approach (early scroll) → camera moves toward closed doors
 *   - Doors crack open in the hero scroll range
 *   - Camera passes THROUGH the doors and proceeds down the aisle
 *   - Camera arrives at the pulpit with stick figures in pews,
 *     a stick-figure pastor behind the pulpit
 *
 * The building is built as a HOLLOW SHELL so the camera can fly
 * inside. The interior has pews, an aisle, and a pulpit at the back.
 *
 * Anchoring: building floor at y≈0.3, doors centered at z=+2.5,
 * pulpit at z=-2.1. Camera travels along z-axis.
 */

const COLORS = {
  wallWhite:   '#F4F0E8',   // Exterior + interior cream
  wallInside:  '#EFE7D6',   // Slightly warmer for interior
  trimWhite:   '#FAF7F0',
  roofGray:    '#2D2F2A',
  woodWarm:    '#C9A36B',
  woodMedium:  '#9A7548',
  woodDark:    '#704A2B',
  woodPew:     '#5A3A20',
  ground:      '#383530',
  doorInner:   '#E89A4D',   // Warm spill from interior
  pulpitWood:  '#4A2F18',
};

interface ChurchModelProps {
  lowDetail?: boolean;
}

export function ChurchModel({ lowDetail = false }: ChurchModelProps) {
  const groupRef       = useRef<THREE.Group>(null);
  const leftDoorRef    = useRef<THREE.Group>(null);
  const rightDoorRef   = useRef<THREE.Group>(null);
  const interiorLight  = useRef<THREE.PointLight>(null);
  const pulpitLight    = useRef<THREE.PointLight>(null);

  /* ============================================================
     SCROLL CHOREOGRAPHY
     Door opening tied to global scroll progress sub-range so it
     happens during the hero/Scene 1, in sync with the camera path
     (defined in SceneCamera.tsx). Interior lights grow as we enter.
     ============================================================ */
  const DOOR_OPEN_RANGE = { start: 0.05, end: 0.11 };
  const INTERIOR_LIGHT_RANGE = { start: 0.08, end: 0.16 };

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollState.progress;

    // Doors swing open between progress 5% → 11%
    const rawDoor = (p - DOOR_OPEN_RANGE.start)
      / (DOOR_OPEN_RANGE.end - DOOR_OPEN_RANGE.start);
    const doorT = easeOutExpo(Math.max(0, Math.min(1, rawDoor)));
    if (leftDoorRef.current && rightDoorRef.current) {
      const angle = lerp(0, 1.55, doorT);
      leftDoorRef.current.rotation.y = angle;
      rightDoorRef.current.rotation.y = -angle;
    }

    // Interior light grows as camera approaches/enters
    const rawLight = (p - INTERIOR_LIGHT_RANGE.start)
      / (INTERIOR_LIGHT_RANGE.end - INTERIOR_LIGHT_RANGE.start);
    const lightT = Math.max(0, Math.min(1, rawLight));
    if (interiorLight.current) {
      interiorLight.current.intensity = lerp(0, 5.5, lightT);
    }
    if (pulpitLight.current) {
      pulpitLight.current.intensity = lerp(0, 3.0, lightT);
    }
  });

  /* ============================================================
     MATERIALS — memoized once
     ============================================================ */
  const wallExtMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.wallWhite, roughness: 0.92, metalness: 0.02, side: THREE.DoubleSide }),
    [],
  );
  const wallIntMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.wallInside, roughness: 0.95, metalness: 0, side: THREE.BackSide }),
    [],
  );
  const trimMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.trimWhite, roughness: 0.85, metalness: 0.02 }),
    [],
  );
  const roofMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.roofGray, roughness: 0.65, metalness: 0.3 }),
    [],
  );
  const woodMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.woodWarm, roughness: 0.92, metalness: 0 }),
    [],
  );
  const woodDarkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.woodDark, roughness: 0.88, metalness: 0 }),
    [],
  );
  const floorMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.woodMedium, roughness: 0.86, metalness: 0 }),
    [],
  );
  const pewMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.woodPew, roughness: 0.85, metalness: 0 }),
    [],
  );
  const pulpitMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: COLORS.pulpitWood, roughness: 0.7, metalness: 0.05 }),
    [],
  );
  const doorInnerMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: COLORS.doorInner,
      roughness: 0.5, metalness: 0,
      emissive: COLORS.doorInner, emissiveIntensity: 0.25,
    }),
    [],
  );

  /* Gable triangle geometries */
  const mainGableGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-3, 0); shape.lineTo(3, 0); shape.lineTo(0, 1.7); shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);
  const porchGableGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2, 0); shape.lineTo(2, 0); shape.lineTo(0, 0.85); shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  /* Pew layout — 5 rows per side */
  const pewRows = [-1.6, -0.8, 0.0, 0.8, 1.6];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ============================================================
          FOUNDATION — subtle dark ground band
          ============================================================ */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[6.4, 0.3, 5.4]} />
        <meshStandardMaterial color={COLORS.ground} roughness={1} />
      </mesh>

      {/* ============================================================
          BUILDING SHELL — hollow walls, not a solid box.
          This lets the camera fly inside.
          Walls have DoubleSide material so they're visible from
          both inside and outside.
          ============================================================ */}
      {/* Left wall */}
      <mesh position={[-3, 1.9, 0]} material={wallExtMat} castShadow receiveShadow>
        <boxGeometry args={[0.1, 3.2, 5]} />
      </mesh>
      {/* Right wall */}
      <mesh position={[3, 1.9, 0]} material={wallExtMat} castShadow receiveShadow>
        <boxGeometry args={[0.1, 3.2, 5]} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 1.9, -2.5]} material={wallExtMat} castShadow receiveShadow>
        <boxGeometry args={[6, 3.2, 0.1]} />
      </mesh>

      {/* Front wall split into 3 parts to leave doorway open
          (left flank, right flank, lintel above the doors) */}
      {/* Left flank */}
      <mesh position={[-2.2, 1.9, 2.5]} material={wallExtMat} castShadow receiveShadow>
        <boxGeometry args={[1.6, 3.2, 0.1]} />
      </mesh>
      {/* Right flank */}
      <mesh position={[2.2, 1.9, 2.5]} material={wallExtMat} castShadow receiveShadow>
        <boxGeometry args={[1.6, 3.2, 0.1]} />
      </mesh>
      {/* Lintel above door (door is 1.1 wide, 1.95 tall, centered at y=1.6) */}
      <mesh position={[0, 3.1, 2.5]} material={wallExtMat} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.8, 0.1]} />
      </mesh>

      {/* Interior floor — wood plank inside the building */}
      <mesh position={[0, 0.31, 0]} receiveShadow material={floorMat}>
        <boxGeometry args={[5.9, 0.02, 4.9]} />
      </mesh>

      {/* Aisle — slightly darker stripe down the center */}
      <mesh position={[0, 0.32, 0]} receiveShadow material={woodDarkMat}>
        <boxGeometry args={[0.9, 0.005, 4.7]} />
      </mesh>

      {/* Ceiling — flat at the top of the walls, dark wood interior */}
      <mesh position={[0, 3.5, 0]} receiveShadow material={woodDarkMat}>
        <boxGeometry args={[5.9, 0.05, 4.9]} />
      </mesh>

      {/* Subtle horizontal clapboard trim — exterior detail */}
      {!lowDetail && [0.9, 1.7, 2.5, 3.3].map((y, i) => (
        <group key={i}>
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
          MAIN ROOF — pitched gable.
          FIX: boxes extended from 3.6 to 4.0 so the slopes overlap
          at the apex (no visible gap from camera angles).
          ============================================================ */}
      <group position={[0, 3.5, 0]}>
        <mesh position={[-1.55, 0.95, 0]} rotation={[0, 0, Math.PI * 0.18]} castShadow material={roofMat}>
          <boxGeometry args={[4.0, 0.1, 5.4]} />
        </mesh>
        <mesh position={[1.55, 0.95, 0]} rotation={[0, 0, -Math.PI * 0.18]} castShadow material={roofMat}>
          <boxGeometry args={[4.0, 0.1, 5.4]} />
        </mesh>
        {/* Gable end fills */}
        <mesh position={[0, 0.85, 2.5]} geometry={mainGableGeom}>
          <meshStandardMaterial color={COLORS.wallWhite} roughness={0.92} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.85, -2.5]} geometry={mainGableGeom} rotation={[0, Math.PI, 0]}>
          <meshStandardMaterial color={COLORS.wallWhite} roughness={0.92} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ============================================================
          FRONT PORCH — double-gable signature detail
          ============================================================ */}
      {/* Porch floor */}
      <mesh position={[0, 0.5, 3]} receiveShadow material={trimMat}>
        <boxGeometry args={[3.6, 0.15, 1.4]} />
      </mesh>
      {/* Porch roof */}
      <group position={[0, 3.0, 3.0]}>
        <mesh position={[-1.05, 0.45, 0]} rotation={[0, 0, Math.PI * 0.2]} castShadow material={roofMat}>
          <boxGeometry args={[2.6, 0.08, 1.6]} />
        </mesh>
        <mesh position={[1.05, 0.45, 0]} rotation={[0, 0, -Math.PI * 0.2]} castShadow material={roofMat}>
          <boxGeometry args={[2.6, 0.08, 1.6]} />
        </mesh>
        <mesh position={[0, 0.4, 0.8]} geometry={porchGableGeom}>
          <meshStandardMaterial color={COLORS.wallWhite} roughness={0.92} side={THREE.DoubleSide} />
        </mesh>
        {!lowDetail && (
          <group>
            <mesh position={[-0.45, 0.25, 0.81]} rotation={[0, 0, -Math.PI * 0.22]} material={woodMat}>
              <boxGeometry args={[0.04, 0.55, 0.02]} />
            </mesh>
            <mesh position={[0.45, 0.25, 0.81]} rotation={[0, 0, Math.PI * 0.22]} material={woodMat}>
              <boxGeometry args={[0.04, 0.55, 0.02]} />
            </mesh>
          </group>
        )}
      </group>

      {/* Porch posts */}
      {[[-1.6, 3.65], [1.6, 3.65], [-1.6, 2.4], [1.6, 2.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.7, z]} castShadow material={woodMat}>
          <cylinderGeometry args={[0.07, 0.08, 2.4, 8]} />
        </mesh>
      ))}

      {/* Lattice railings */}
      {!lowDetail && [-1, 1].map((side) => (
        <group key={side} position={[side * 1.3, 0.85, 3.65]}>
          <mesh material={woodDarkMat}><boxGeometry args={[0.5, 0.04, 0.05]} /></mesh>
          <mesh position={[0, -0.3, 0]} material={woodDarkMat}><boxGeometry args={[0.5, 0.04, 0.05]} /></mesh>
          {[-0.18, -0.06, 0.06, 0.18].map((x) => (
            <mesh key={x} position={[x, -0.15, 0]} material={woodDarkMat}>
              <boxGeometry args={[0.025, 0.32, 0.025]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Steps */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 0.1 + i * 0.11, 3.85 + i * 0.18]} castShadow receiveShadow material={woodDarkMat}>
          <boxGeometry args={[1.4, 0.12, 0.25]} />
        </mesh>
      ))}

      {/* ============================================================
          PORCH STICK FIGURES — two people talking on the porch
          ============================================================ */}
      <StickFigure
        position={[-0.7, 0.58, 3.4]}
        rotation={[0, Math.PI * 0.25, 0]}
        gesturing
        variance={0.5}
      />
      <StickFigure
        position={[0.7, 0.58, 3.5]}
        rotation={[0, -Math.PI * 0.3, 0]}
        variance={-0.3}
      />

      {/* ============================================================
          DOORS — pivot at hinges, swing open during scroll
          ============================================================ */}
      {/* Door frame */}
      <mesh position={[0, 1.6, 2.51]} material={woodDarkMat}>
        <boxGeometry args={[1.15, 1.95, 0.04]} />
      </mesh>
      {/* Interior glow plane behind doors (the warm spill) */}
      <mesh position={[0, 1.6, 2.49]} material={doorInnerMat}>
        <boxGeometry args={[1.0, 1.85, 0.005]} />
      </mesh>

      <group ref={leftDoorRef} position={[-0.5, 1.6, 2.55]}>
        <mesh position={[0.25, 0, 0]} castShadow material={trimMat}>
          <boxGeometry args={[0.5, 1.9, 0.05]} />
        </mesh>
        <mesh position={[0.25, 0.35, 0.026]}>
          <boxGeometry args={[0.36, 0.6, 0.005]} />
          <meshStandardMaterial color="#E5DDD0" roughness={0.85} />
        </mesh>
        <mesh position={[0.25, -0.35, 0.026]}>
          <boxGeometry args={[0.36, 0.6, 0.005]} />
          <meshStandardMaterial color="#E5DDD0" roughness={0.85} />
        </mesh>
      </group>
      <group ref={rightDoorRef} position={[0.5, 1.6, 2.55]}>
        <mesh position={[-0.25, 0, 0]} castShadow material={trimMat}>
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
          INTERIOR: PEWS — 5 rows per side, flanking the aisle
          ============================================================ */}
      {pewRows.map((z) => (
        <group key={`L${z}`}>
          {/* Left pew — bench seat */}
          <mesh position={[-1.5, 0.55, z]} material={pewMat} castShadow>
            <boxGeometry args={[1.8, 0.08, 0.4]} />
          </mesh>
          {/* Left pew back */}
          <mesh position={[-1.5, 0.85, z - 0.18]} material={pewMat} castShadow>
            <boxGeometry args={[1.8, 0.55, 0.06]} />
          </mesh>
          {/* Right pew — bench seat */}
          <mesh position={[1.5, 0.55, z]} material={pewMat} castShadow>
            <boxGeometry args={[1.8, 0.08, 0.4]} />
          </mesh>
          {/* Right pew back */}
          <mesh position={[1.5, 0.85, z - 0.18]} material={pewMat} castShadow>
            <boxGeometry args={[1.8, 0.55, 0.06]} />
          </mesh>
        </group>
      ))}

      {/* ============================================================
          INTERIOR: STICK FIGURES IN PEWS
          (a scattered congregation — not every seat full)
          ============================================================ */}
      {/* Left side congregation */}
      <StickFigure sitting position={[-1.7, 0.0, -1.6]} variance={0.4} />
      <StickFigure sitting position={[-1.2, 0.0, -1.6]} variance={-0.2} />
      <StickFigure sitting position={[-1.9, 0.0, -0.8]} variance={0.1} />
      <StickFigure sitting position={[-1.2, 0.0, 0.0]} variance={-0.4} />
      <StickFigure sitting position={[-1.6, 0.0, 0.8]} variance={0.3} />

      {/* Right side congregation */}
      <StickFigure sitting position={[1.3, 0.0, -1.6]} variance={-0.3} />
      <StickFigure sitting position={[1.8, 0.0, -0.8]} variance={0.2} />
      <StickFigure sitting position={[1.2, 0.0, -0.8]} variance={-0.5} />
      <StickFigure sitting position={[1.6, 0.0, 0.0]} variance={0.1} />
      <StickFigure sitting position={[1.4, 0.0, 0.8]} variance={-0.2} />

      {/* ============================================================
          PULPIT — at the back of the church, on a low platform
          ============================================================ */}
      {/* Platform — slightly raised */}
      <mesh position={[0, 0.45, -2.1]} receiveShadow castShadow material={woodDarkMat}>
        <boxGeometry args={[3.0, 0.25, 0.7]} />
      </mesh>
      {/* Pulpit body */}
      <mesh position={[0, 0.95, -2.2]} castShadow material={pulpitMat}>
        <boxGeometry args={[0.85, 1.0, 0.45]} />
      </mesh>
      {/* Pulpit top slant (where notes rest) */}
      <mesh position={[0, 1.47, -2.15]} rotation={[Math.PI * 0.08, 0, 0]} castShadow material={pulpitMat}>
        <boxGeometry args={[0.95, 0.04, 0.55]} />
      </mesh>
      {/* Cross on back wall above pulpit */}
      <group position={[0, 2.7, -2.45]}>
        <mesh material={woodDarkMat}>
          <boxGeometry args={[0.08, 0.85, 0.05]} />
        </mesh>
        <mesh position={[0, 0.12, 0]} material={woodDarkMat}>
          <boxGeometry args={[0.45, 0.08, 0.05]} />
        </mesh>
      </group>

      {/* ============================================================
          PASTOR — stick figure behind the pulpit, gesturing
          ============================================================ */}
      <StickFigure
        position={[0, 0.58, -2.5]}
        rotation={[0, 0, 0]}
        gesturing
        shade="dark"
      />

      {/* ============================================================
          INTERIOR LIGHTS — warm interior glow + pulpit highlight
          ============================================================ */}
      <pointLight
        ref={interiorLight}
        position={[0, 2.8, 0.5]}
        color="#FFB870"
        intensity={0}
        distance={9}
        decay={1.6}
        castShadow={!lowDetail}
        shadow-mapSize-width={lowDetail ? 256 : 512}
        shadow-mapSize-height={lowDetail ? 256 : 512}
      />
      <pointLight
        ref={pulpitLight}
        position={[0, 2.6, -1.8]}
        color="#FFDFA8"
        intensity={0}
        distance={4.5}
        decay={1.8}
      />

      {/* ============================================================
          SIDE WINDOWS — visible from both inside and outside
          ============================================================ */}
      {!lowDetail && [-1, 1].map((side) => (
        <group key={`win${side}`}>
          {/* Left side */}
          <mesh position={[-3.005, 2.0, side * 1.2]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.8, 1.0, 0.02]} />
            <meshStandardMaterial color="#3A3A3A" roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[-3.001, 2.0, side * 1.2]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.88, 1.08, 0.03]} />
            <meshStandardMaterial color={COLORS.trimWhite} roughness={0.85} />
          </mesh>
          {/* Right side */}
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
    </group>
  );
}
