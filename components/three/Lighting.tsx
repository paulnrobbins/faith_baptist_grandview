'use client';

interface LightingProps {
  lowDetail?: boolean;
}

/**
 * Dawn lighting rig — calibrated for the Appalachian Documentary
 * aesthetic. Warm sunrise key light from camera-right, cool hemisphere
 * fill from above, soft ambient from below.
 *
 * Values tuned for the bg color (#E8E4DC fog-white) so the church
 * reads with depth without going dark or muddy.
 */
export function Lighting({ lowDetail = false }: LightingProps) {
  return (
    <>
      {/* Warm dawn key — comes from camera-right and slightly above */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.5}
        color="#FFCC95"
        castShadow={!lowDetail}
        shadow-mapSize-width={lowDetail ? 512 : 1024}
        shadow-mapSize-height={lowDetail ? 512 : 1024}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0008}
      />

      {/* Cool sky fill — opposite the sun, gives form to shadows */}
      <hemisphereLight
        args={['#FFF0DA', '#4A4538', 0.5]}
      />

      {/* Soft ambient to lift the deepest shadows just enough */}
      <ambientLight intensity={0.18} color="#FFE7C9" />

      {/* Rim light from behind-left — separates church silhouette
          from the fog-white background */}
      {!lowDetail && (
        <directionalLight
          position={[-5, 4, -6]}
          intensity={0.4}
          color="#D9C8B0"
        />
      )}
    </>
  );
}
