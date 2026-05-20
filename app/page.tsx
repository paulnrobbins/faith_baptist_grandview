import { CanvasRoot } from '@/components/three/CanvasRoot';
import { Scene1Approach } from '@/components/sections/Scene1Approach';
import { Scene2Promise } from '@/components/sections/Scene2Promise';
import { Scene3Doors } from '@/components/sections/Scene3Doors';
import { Scene4Aisle } from '@/components/sections/Scene4Aisle';
import { Scene5Pulpit } from '@/components/sections/Scene5Pulpit';
import { Scene6FacingDoors } from '@/components/sections/Scene6FacingDoors';
import { Footer } from '@/components/layout/Footer';

/**
 * Home — the entire single-page narrative arc, scenes 1 through 6.
 *
 * CanvasRoot is mounted once at page level and renders behind all
 * sections with pointer-events disabled. Each scene's content sits
 * above it, and Phase 3+ choreography drives the camera through
 * scenes as the user scrolls.
 */
export default function Home() {
  return (
    <>
      <CanvasRoot />

      <main id="main-content" className="relative">
        <Scene1Approach />
        <Scene2Promise />
        <Scene3Doors />
        <Scene4Aisle />
        <Scene5Pulpit />
        <Scene6FacingDoors />
      </main>

      <Footer />
    </>
  );
}
