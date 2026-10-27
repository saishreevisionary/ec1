'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Leaf } from 'lucide-react';

interface ButterflyProps {
  variant: 'swallowtail' | 'monarch';
  size: number;
  flightAnimation: string;
  flightDuration: string;
  delay?: string;
  flapDuration?: string;
  bobDuration?: string;
  filter?: string;
  opacity?: number;
}

/**
 * Photorealistic 3D Animated Live Butterfly
 * Features two independently animated wings with 3D perspective flapping and gliding cycles,
 * a crisp anatomically isolated body with antennae, and curved bezier flight paths with realistic banking.
 */
function LiveButterfly({
  variant,
  size,
  flightAnimation,
  flightDuration,
  delay = '0s',
  flapDuration = '1.85s',
  bobDuration = '1.85s',
  filter,
  opacity = 1,
}: ButterflyProps) {
  const leftWingSrc = `/images/botanical/${variant}-left.png`;
  const rightWingSrc = `/images/botanical/${variant}-right.png`;
  const bodySrc = `/images/botanical/${variant}-body.png`;

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none will-change-transform z-[24]"
      style={{
        animation: `${flightAnimation} ${flightDuration} cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay} both`,
        filter: filter || 'none',
        opacity,
      }}
    >
      {/* Flight pitch & gentle bobbing / gliding wobble */}
      <div
        style={{
          animation: `butterfly-flight-bob ${bobDuration} ease-in-out infinite`,
        }}
      >
        {/* 3D Perspective Container */}
        <div
          className="relative flex items-center justify-center select-none"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            perspective: '700px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Left Wing (Hinged at right boundary 100% 50%) */}
          <div
            className="absolute top-0 right-1/2 h-full pointer-events-none z-10"
            style={{
              width: '50%',
              transformOrigin: '100% 50%',
              transformStyle: 'preserve-3d',
              animation: `butterfly-flap-left ${flapDuration} ease-in-out infinite`,
            }}
          >
            <img
              src={leftWingSrc}
              alt=""
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_4px_12px_rgba(20,40,25,0.4)]"
              style={{ transformOrigin: '100% 50%' }}
            />
          </div>

          {/* Center Body & Antennae (Centered on the hinge axis) */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center justify-center"
            style={{ width: `${Math.round(size * 0.20)}px`, height: '100%' }}
          >
            <img
              src={bodySrc}
              alt=""
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]"
            />
          </div>

          {/* Right Wing (Hinged at left boundary 0% 50%) */}
          <div
            className="absolute top-0 left-1/2 h-full pointer-events-none z-10"
            style={{
              width: '50%',
              transformOrigin: '0% 50%',
              transformStyle: 'preserve-3d',
              animation: `butterfly-flap-right ${flapDuration} ease-in-out infinite`,
            }}
          >
            <img
              src={rightWingSrc}
              alt=""
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_4px_12px_rgba(20,40,25,0.4)]"
              style={{ transformOrigin: '0% 50%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * BrandedSplashScreen Component
 * 
 * Cinematic 9-Panel Botanical Opening Sequence:
 * PANEL 1 (0.0–0.4s): Botanical garden appears with sunlight, copper alembic, archway, and fountain.
 * PANEL 2 (0.4–0.8s): First butterfly (Monarch) enters from left alembic with curved golden sparkle trail.
 * PANEL 3 (0.8–1.6s): More butterflies join from archway, canopy, and fountain, with streaming trails.
 * PANEL 4 (1.6–2.0s): Butterflies fly naturally with independent curved flight paths and occasional gliding.
 * PANEL 5 (2.0–2.4s): Golden sparkle trails converge and gather into a luminous vortex at the center.
 * PANEL 6 (2.4–2.8s): Radiant champagne-gold burst detonates with outward starbursts and glitter.
 * PANEL 7 (2.8–3.0s): Official Venuss logo appears at the center of the burst with backlight halo.
 * PANEL 8 (3.0–3.8s): Brand typography in sequence, leaf divider, tagline, and progressive loading bar.
 * PANEL 9 (3.8–4.5s): Final hold followed by smooth 700ms cinematic dissolve into the approved homepage.
 */
export default function BrandedSplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const dismissSplash = useCallback(() => {
    setIsFadingOut(true);
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('venuss-splash-active');
      }
    }, 700);
    return () => clearTimeout(fadeTimer);
  }, []);

  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('venuss-splash-active');
      }

      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      // Duration: 4800ms matches Panel 9 (Final Hold & Fade at 4.8s)
      const displayDuration = mediaQuery.matches ? 400 : 4800;

      const autoDismissTimer = setTimeout(() => {
        dismissSplash();
      }, displayDuration);

      // Safety timer: ensures splash never remains past 7000ms
      const safetyTimer = setTimeout(() => {
        dismissSplash();
      }, 7000);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          dismissSplash();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(autoDismissTimer);
        clearTimeout(safetyTimer);
        window.removeEventListener('keydown', handleKeyDown);
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('venuss-splash-active');
        }
      };
    } catch {
      setIsVisible(false);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('venuss-splash-active');
      }
    }
  }, [dismissSplash]);

  // Floating jasmine and soft rose petal specs
  const petals = useMemo(() => [
    { id: 1, left: '14%', delay: '0.2s', duration: '7.5s', size: 14, type: 'white' },
    { id: 2, left: '26%', delay: '1.4s', duration: '8.2s', size: 16, type: 'white' },
    { id: 3, left: '46%', delay: '0.8s', duration: '7.8s', size: 15, type: 'pink' },
    { id: 4, left: '68%', delay: '1.8s', duration: '8.8s', size: 16, type: 'pink' },
    { id: 5, left: '84%', delay: '1.0s', duration: '7.9s', size: 14, type: 'white' },
    { id: 6, left: '38%', delay: '2.4s', duration: '8.0s', size: 13, type: 'pink' },
  ], []);

  // Golden Sparkling Particles flowing behind the butterflies along their curved trajectories
  const trailSparkles = useMemo(() => [
    // Trail 1: Butterfly 1 (PANEL 2: Enters from alembic 0.4s -> swoops to 25% left, 24% top)
    { id: 't1_1', left: '5%', top: '48%', size: 16, type: 'star', delay: '0.45s', duration: '1.3s' },
    { id: 't1_2', left: '9%', top: '44%', size: 10, type: 'dot', delay: '0.55s', duration: '1.4s' },
    { id: 't1_3', left: '14%', top: '39%', size: 22, type: 'star', delay: '0.65s', duration: '1.5s' },
    { id: 't1_4', left: '18%', top: '33%', size: 11, type: 'dot', delay: '0.75s', duration: '1.4s' },
    { id: 't1_5', left: '22%', top: '28%', size: 24, type: 'star', delay: '0.85s', duration: '1.6s' },
    { id: 't1_6', left: '26%', top: '24%', size: 12, type: 'dot', delay: '0.98s', duration: '1.4s' },
    { id: 't1_7', left: '29%', top: '22%', size: 18, type: 'star', delay: '1.15s', duration: '1.5s' },

    // Trail 2: Butterfly 2 (PANEL 3: Joins at 0.8s from top-right archway -> swoops down-left)
    { id: 't2_1', left: '98%', top: '18%', size: 16, type: 'star', delay: '0.85s', duration: '1.3s' },
    { id: 't2_2', left: '91%', top: '19%', size: 10, type: 'dot', delay: '0.98s', duration: '1.4s' },
    { id: 't2_3', left: '83%', top: '19%', size: 22, type: 'star', delay: '1.12s', duration: '1.5s' },
    { id: 't2_4', left: '74%', top: '18%', size: 12, type: 'dot', delay: '1.28s', duration: '1.4s' },
    { id: 't2_5', left: '65%', top: '16%', size: 24, type: 'star', delay: '1.45s', duration: '1.6s' },
    { id: 't2_6', left: '56%', top: '13%', size: 13, type: 'dot', delay: '1.62s', duration: '1.4s' },
    { id: 't2_7', left: '50%', top: '12%', size: 20, type: 'star', delay: '1.80s', duration: '1.5s' },

    // Trail 3: Butterfly 3 (PANEL 3: Joins at 0.85s from right archway column -> swoops inward)
    { id: 't3_1', left: '98%', top: '29%', size: 16, type: 'star', delay: '0.90s', duration: '1.3s' },
    { id: 't3_2', left: '92%', top: '31%', size: 10, type: 'dot', delay: '1.05s', duration: '1.4s' },
    { id: 't3_3', left: '87%', top: '32%', size: 22, type: 'star', delay: '1.22s', duration: '1.5s' },
    { id: 't3_4', left: '82%', top: '32%', size: 12, type: 'dot', delay: '1.40s', duration: '1.4s' },
    { id: 't3_5', left: '77%', top: '30%', size: 24, type: 'star', delay: '1.58s', duration: '1.6s' },

    // Trail 4: Butterfly 4 (PANEL 3: Joins at 0.85s from lower right basin -> swoops upward)
    { id: 't4_1', left: '87%', top: '89%', size: 15, type: 'star', delay: '0.90s', duration: '1.3s' },
    { id: 't4_2', left: '83%', top: '80%', size: 10, type: 'dot', delay: '1.05s', duration: '1.4s' },
    { id: 't4_3', left: '79%', top: '71%', size: 20, type: 'star', delay: '1.22s', duration: '1.5s' },
    { id: 't4_4', left: '75%', top: '64%', size: 11, type: 'dot', delay: '1.40s', duration: '1.4s' },
    { id: 't4_5', left: '71%', top: '59%', size: 18, type: 'star', delay: '1.60s', duration: '1.5s' },

    // Trail 5: Butterfly 5 (PANEL 3: Joins at 0.80s near alembic terrace)
    { id: 't5_1', left: '3%', top: '43%', size: 14, type: 'star', delay: '0.85s', duration: '1.3s' },
    { id: 't5_2', left: '8%', top: '44%', size: 10, type: 'dot', delay: '1.02s', duration: '1.4s' },
    { id: 't5_3', left: '13%', top: '46%', size: 20, type: 'star', delay: '1.22s', duration: '1.5s' },
    { id: 't5_4', left: '18%', top: '47%', size: 11, type: 'dot', delay: '1.42s', duration: '1.4s' },

    // PANEL 5: SPARKLES GATHER AT CENTRE (2.0s - 2.4s) - Dense convergence swirl around logo center
    { id: 'cg_1', left: '44%', top: '28%', size: 20, type: 'star', delay: '1.95s', duration: '1.4s' },
    { id: 'cg_2', left: '56%', top: '28%', size: 20, type: 'star', delay: '2.02s', duration: '1.4s' },
    { id: 'cg_3', left: '40%', top: '35%', size: 18, type: 'star', delay: '2.08s', duration: '1.4s' },
    { id: 'cg_4', left: '60%', top: '35%', size: 18, type: 'star', delay: '2.14s', duration: '1.4s' },
    { id: 'cg_5', left: '44%', top: '42%', size: 16, type: 'dot', delay: '2.18s', duration: '1.3s' },
    { id: 'cg_6', left: '56%', top: '42%', size: 16, type: 'dot', delay: '2.22s', duration: '1.3s' },
    { id: 'cg_7', left: '48%', top: '33%', size: 22, type: 'star', delay: '2.26s', duration: '1.4s' },
    { id: 'cg_8', left: '52%', top: '37%', size: 22, type: 'star', delay: '2.30s', duration: '1.4s' },
  ], []);

  // 16 Outward-radiating starbursts that fire from behind the logo during the burst (PANEL 6: 2.4s - 2.8s)
  const burstStars = useMemo(() => [
    { id: 'b1', dx: '0px', dy: '-135px', size: 30, delay: '2.42s' },
    { id: 'b2', dx: '52px', dy: '-122px', size: 24, delay: '2.45s' },
    { id: 'b3', dx: '98px', dy: '-98px', size: 28, delay: '2.44s' },
    { id: 'b4', dx: '125px', dy: '-52px', size: 24, delay: '2.48s' },
    { id: 'b5', dx: '140px', dy: '0px', size: 32, delay: '2.43s' },
    { id: 'b6', dx: '125px', dy: '52px', size: 24, delay: '2.50s' },
    { id: 'b7', dx: '98px', dy: '98px', size: 28, delay: '2.46s' },
    { id: 'b8', dx: '52px', dy: '122px', size: 24, delay: '2.52s' },
    { id: 'b9', dx: '0px', dy: '140px', size: 30, delay: '2.45s' },
    { id: 'b10', dx: '-52px', dy: '122px', size: 24, delay: '2.53s' },
    { id: 'b11', dx: '-98px', dy: '98px', size: 28, delay: '2.47s' },
    { id: 'b12', dx: '-125px', dy: '52px', size: 24, delay: '2.51s' },
    { id: 'b13', dx: '-140px', dy: '0px', size: 32, delay: '2.44s' },
    { id: 'b14', dx: '-125px', dy: '-52px', size: 24, delay: '2.49s' },
    { id: 'b15', dx: '-98px', dy: '-98px', size: 28, delay: '2.46s' },
    { id: 'b16', dx: '-52px', dy: '-122px', size: 24, delay: '2.54s' },
  ], []);

  if (!isVisible) return null;

  return (
    <div
      id="venuss-splash-screen"
      role="dialog"
      aria-modal="true"
      aria-label="Venuss Herbo Aromatics Botanical Experience"
      onClick={dismissSplash}
      className={`fixed inset-0 z-[99999] bg-[#F5F3EB] flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-700 ease-in-out ${
        isFadingOut 
          ? 'opacity-0 pointer-events-none scale-[1.015] filter blur-[2px]' 
          : 'opacity-100 pointer-events-auto scale-100'
      }`}
    >
      {/* =====================================================================
          CINEMATIC STYLES: 9-PANEL STORYBOARD ANIMATIONS
          ===================================================================== */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* 1. Garden Fade-in (PANEL 1: 0.0–0.4s) */
            @keyframes cinematic-garden-enter {
              0% { opacity: 0; transform: scale(1.02); }
              100% { opacity: 1; transform: scale(1); }
            }

            /* 2. 3D Butterfly Wing Flapping with Realistic Gliding (PANEL 2–5) */
            @keyframes butterfly-flap-left {
              0% { transform: rotateY(10deg); }
              6% { transform: rotateY(68deg) rotateZ(-3deg); }
              12% { transform: rotateY(8deg); }
              18% { transform: rotateY(70deg) rotateZ(-3deg); }
              24% { transform: rotateY(12deg); }
              30% { transform: rotateY(65deg) rotateZ(-2deg); }
              /* Gliding Phase: Wings held gracefully open in majestic dihedral V-shape */
              38% { transform: rotateY(24deg) rotateZ(-1deg); }
              46% { transform: rotateY(20deg) rotateZ(-1deg); }
              54% { transform: rotateY(25deg) rotateZ(0deg); }
              /* Flapping burst to bank into turn */
              62% { transform: rotateY(66deg) rotateZ(-2deg); }
              70% { transform: rotateY(10deg); }
              78% { transform: rotateY(62deg) rotateZ(-2deg); }
              /* Gentle hover float */
              86% { transform: rotateY(22deg); }
              94% { transform: rotateY(16deg); }
              100% { transform: rotateY(10deg); }
            }

            @keyframes butterfly-flap-right {
              0% { transform: rotateY(-10deg); }
              6% { transform: rotateY(-68deg) rotateZ(3deg); }
              12% { transform: rotateY(-8deg); }
              18% { transform: rotateY(-70deg) rotateZ(3deg); }
              24% { transform: rotateY(-12deg); }
              30% { transform: rotateY(-65deg) rotateZ(2deg); }
              /* Gliding Phase: Wings held gracefully open in majestic dihedral V-shape */
              38% { transform: rotateY(-24deg) rotateZ(1deg); }
              46% { transform: rotateY(-20deg) rotateZ(1deg); }
              54% { transform: rotateY(-25deg) rotateZ(0deg); }
              /* Flapping burst to bank into turn */
              62% { transform: rotateY(-66deg) rotateZ(2deg); }
              70% { transform: rotateY(-10deg); }
              78% { transform: rotateY(-62deg) rotateZ(2deg); }
              /* Gentle hover float */
              86% { transform: rotateY(-22deg); }
              94% { transform: rotateY(-16deg); }
              100% { transform: rotateY(-10deg); }
            }

            /* Natural flight altitude wobble and bank roll during flap and glide */
            @keyframes butterfly-flight-bob {
              0% { transform: translateY(0px) rotateZ(-1deg); }
              12% { transform: translateY(-8px) rotateZ(2deg); }
              24% { transform: translateY(-2px) rotateZ(-1deg); }
              /* Smooth glide drift with gentle bank angle */
              36% { transform: translateY(-5px) rotateZ(3deg); }
              46% { transform: translateY(-7px) rotateZ(2deg); }
              56% { transform: translateY(-4px) rotateZ(0deg); }
              /* Turn bob */
              68% { transform: translateY(-9px) rotateZ(-2deg); }
              78% { transform: translateY(-2px) rotateZ(1deg); }
              /* Hover float */
              88% { transform: translateY(-5px) rotateZ(1deg); }
              100% { transform: translateY(0px) rotateZ(-1deg); }
            }

            /* 3. Butterfly Flight Trajectories synchronized with Storyboard Panels */
            /* Butterfly 1: First butterfly enters from left alembic (PANEL 2: 0.4s -> 0.8s), hovers in sunbeams */
            @keyframes flight-path-1 {
              0% { transform: translate3d(-6vw, 50vh, 0) rotate(16deg); opacity: 0; }
              8% { opacity: 1; }
              25% { transform: translate3d(10vw, 40vh, 0) rotate(20deg); }
              45% { transform: translate3d(18vw, 30vh, 0) rotate(12deg); }
              65% { transform: translate3d(24vw, 24vh, 0) rotate(6deg); }
              82% { transform: translate3d(27vw, 22vh, 0) rotate(10deg); }
              100% { transform: translate3d(26vw, 23vh, 0) rotate(6deg); opacity: 1; }
            }

            /* Butterfly 2: Enters from top-right archway (PANEL 3: 0.8s -> 1.6s), swoops to upper-center */
            @keyframes flight-path-2 {
              0% { transform: translate3d(102vw, 16vh, 0) rotate(-24deg); opacity: 0; }
              10% { opacity: 1; }
              35% { transform: translate3d(82vw, 18vh, 0) rotate(-16deg); }
              60% { transform: translate3d(64vw, 15vh, 0) rotate(-8deg); }
              82% { transform: translate3d(52vw, 12vh, 0) rotate(2deg); }
              100% { transform: translate3d(49vw, 11vh, 0) rotate(0deg); opacity: 1; }
            }

            /* Butterfly 3: Enters from right archway column (PANEL 3: 0.85s -> 1.6s) */
            @keyframes flight-path-3 {
              0% { transform: translate3d(102vw, 30vh, 0) rotate(-28deg); opacity: 0; }
              10% { opacity: 1; }
              40% { transform: translate3d(90vw, 32vh, 0) rotate(-18deg); }
              68% { transform: translate3d(83vw, 33vh, 0) rotate(-8deg); }
              85% { transform: translate3d(80vw, 31vh, 0) rotate(4deg); }
              100% { transform: translate3d(79vw, 30vh, 0) rotate(2deg); opacity: 1; }
            }

            /* Butterfly 4: Enters from lower right basin (PANEL 3: 0.85s -> 1.6s), rises toward clearing */
            @keyframes flight-path-4 {
              0% { transform: translate3d(88vw, 92vh, 0) rotate(-26deg); opacity: 0; }
              12% { opacity: 1; }
              40% { transform: translate3d(82vw, 76vh, 0) rotate(-20deg); }
              68% { transform: translate3d(76vw, 65vh, 0) rotate(-12deg); }
              85% { transform: translate3d(72vw, 61vh, 0) rotate(6deg); }
              100% { transform: translate3d(72vw, 60vh, 0) rotate(0deg); opacity: 1; }
            }

            /* Butterfly 5: Weaves near copper alembic & stone terrace (PANEL 3: 0.80s) */
            @keyframes flight-path-5 {
              0% { transform: translate3d(-5vw, 42vh, 0) rotate(20deg); opacity: 0; }
              12% { opacity: 1; }
              42% { transform: translate3d(9vw, 44vh, 0) rotate(14deg); }
              70% { transform: translate3d(16vw, 47vh, 0) rotate(6deg); }
              86% { transform: translate3d(19vw, 48vh, 0) rotate(-4deg); }
              100% { transform: translate3d(18vw, 47vh, 0) rotate(2deg); opacity: 1; }
            }

            /* 4. Sparkling Trails & Starlet Twinkles */
            @keyframes sparkle-twinkle {
              0% { opacity: 0; transform: scale(0.15) rotate(0deg); }
              35% { opacity: 1; transform: scale(1.4) rotate(90deg); filter: drop-shadow(0 0 10px #FFE57F); }
              70% { opacity: 0.85; transform: scale(0.95) rotate(140deg); }
              100% { opacity: 0; transform: scale(0.2) rotate(180deg); }
            }

            @keyframes sparkle-dot-pulse {
              0% { opacity: 0; transform: scale(0.2); }
              40% { opacity: 1; transform: scale(1.5); }
              80% { opacity: 0.8; transform: scale(1); }
              100% { opacity: 0; transform: scale(0.2); }
            }

            /* 5. Central Pre-burst Gathering Vortex (PANEL 5: 2.0s–2.4s) */
            @keyframes central-sparkle-vortex {
              0% { opacity: 0; transform: scale(0.25) rotate(0deg); }
              50% { opacity: 0.90; transform: scale(0.85) rotate(180deg); filter: drop-shadow(0 0 30px #FFD700); }
              100% { opacity: 1; transform: scale(1.15) rotate(360deg); filter: drop-shadow(0 0 50px #FFF59D); }
            }

            /* 6. RADIANT GOLDEN BURST BEHIND THE LOGO (PANEL 6: 2.4s–2.8s) */
            @keyframes logo-burst-radiance {
              0% {
                opacity: 0;
                transform: scale(0.15);
              }
              22% {
                opacity: 1;
                transform: scale(1.35);
                filter: drop-shadow(0 0 60px rgba(255, 255, 255, 1)) drop-shadow(0 0 95px rgba(255, 215, 0, 0.95)) drop-shadow(0 0 140px rgba(255, 240, 160, 0.85));
              }
              60% {
                opacity: 0.88;
                transform: scale(1.08);
              }
              100% {
                opacity: 0.72;
                transform: scale(1.0);
                filter: drop-shadow(0 0 35px rgba(255, 215, 0, 0.75)) drop-shadow(0 0 65px rgba(212, 149, 75, 0.45));
              }
            }

            @keyframes starburst-radiate {
              0% {
                opacity: 0;
                transform: translate(0, 0) scale(0.2) rotate(0deg);
              }
              30% {
                opacity: 1;
                transform: translate(var(--dx), var(--dy)) scale(1.45) rotate(90deg);
              }
              72% {
                opacity: 0.85;
                transform: translate(var(--dx), var(--dy)) scale(0.95) rotate(150deg);
              }
              100% {
                opacity: 0;
                transform: translate(calc(var(--dx) * 1.18), calc(var(--dy) * 1.18)) scale(0.15) rotate(180deg);
              }
            }

            @keyframes logo-aura-pulse {
              0%, 100% { opacity: 0.65; transform: scale(0.98); }
              50% { opacity: 0.92; transform: scale(1.05); }
            }

            /* 7. Official Logo Reveal (PANEL 7: 2.8s–3.0s) */
            @keyframes logo-cinematic-reveal {
              0% {
                opacity: 0;
                transform: scale(0.85);
              }
              55% {
                opacity: 0.98;
                transform: scale(1.02);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }

            /* 8. Brand Text Staggered Reveal (PANEL 8: 3.0s–3.8s) */
            @keyframes brand-text-fade-up {
              0% {
                opacity: 0;
                transform: translateY(12px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            /* Loading Bar Fill (PANEL 8: 3.35s -> 4.25s) */
            @keyframes splash-loading-expand {
              0% { transform: scaleX(0); }
              45% { transform: scaleX(0.70); }
              100% { transform: scaleX(1); }
            }

            /* Ambient Sunlight Pulse */
            @keyframes sunbeam-pulse {
              0%, 100% { opacity: 0.50; transform: scale(1); }
              50% { opacity: 0.75; transform: scale(1.03); }
            }

            /* Floating Jasmine & Rose Petal Drift */
            @keyframes petal-drift {
              0% { transform: translate3d(0, -20px, 0) rotate(0deg); opacity: 0; }
              10% { opacity: 0.85; }
              85% { opacity: 0.8; }
              100% { transform: translate3d(120px, 105vh, 0) rotate(420deg); opacity: 0; }
            }
          `,
        }}
      />

      {/* ===================================================================
          PANEL 1: BOTANICAL ESTATE GARDEN BACKDROP PLATE (0.0–0.4s)
          Sunlit morning terrace with antique copper alembic distillation vessel,
          classical stone archway, cypress rolling hills, and stone water basin.
          =================================================================== */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none transform transition-transform duration-1000 scale-[1.01]"
        style={{
          backgroundImage: "url('/images/botanical/botanical-estate-backdrop.jpg')",
          animation: prefersReducedMotion ? 'none' : 'cinematic-garden-enter 0.6s ease-out forwards',
        }}
      />

      {/* Lush Arching White Jasmine Canopy Framing Overlay (Top-Left) */}
      <div className="absolute -top-4 -left-4 w-[280px] sm:w-[360px] md:w-[440px] pointer-events-none z-[10] opacity-90">
        <img
          src="/images/botanical/white-branch.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Soft Pink Damask Rose Blossom Accent (Right Archway) */}
      <div className="absolute top-[34%] right-2 sm:right-6 w-20 sm:w-28 md:w-32 pointer-events-none z-[10] opacity-85">
        <img
          src="/images/botanical/flower-full.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      {/* ===================================================================
          LUMINOUS WARM CREAM-AND-GOLD AMBIENT CLEARING
          Creates an airy, ethereal clearing in the center for the logo & text,
          while preserving the lush garden framing at the edges.
          =================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-[11]"
        style={{
          background: 'radial-gradient(ellipse at 50% 43%, rgba(255, 252, 244, 0.90) 0%, rgba(252, 248, 236, 0.74) 36%, rgba(246, 240, 226, 0.38) 65%, rgba(238, 230, 215, 0.12) 100%)',
        }}
      />

      {/* Top-left Golden Sunbeam Rays Filtering through the Botanical Canopy */}
      <div 
        className="absolute -top-16 -left-16 w-[700px] h-[700px] pointer-events-none opacity-55 z-[12]"
        style={{
          background: 'radial-gradient(circle at 22% 22%, rgba(255, 245, 205, 0.75) 0%, rgba(245, 215, 140, 0.35) 35%, transparent 70%)',
          animation: prefersReducedMotion ? 'none' : 'sunbeam-pulse 6s ease-in-out infinite',
        }}
      />

      {/* ===================================================================
          PANELS 2–5: LUMINOUS GOLDEN SPARKLE TRAILS STREAMING BEHIND BUTTERFLIES
          Bright champagne-gold glitter, glowing orbs, and 4-point starlets
          following each butterfly's actual curved path with additive light blending.
          =================================================================== */}
      {!prefersReducedMotion && (
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none z-[18]" 
          style={{ mixBlendMode: 'screen' }}
          aria-hidden="true"
        >
          {trailSparkles.map((s) => (
            <div
              key={s.id}
              className="absolute pointer-events-none will-change-transform -translate-x-1/2 -translate-y-1/2 opacity-0"
              style={{
                left: s.left,
                top: s.top,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animation: s.type === 'star'
                  ? `sparkle-twinkle ${s.duration} ease-in-out ${s.delay} infinite both`
                  : `sparkle-dot-pulse ${s.duration} ease-in-out ${s.delay} infinite both`,
              }}
            >
              {s.type === 'star' ? (
                <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_12px_#FFD700]">
                  <path
                    d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z"
                    fill="url(#sparkleGoldGradient)"
                  />
                  <circle cx="12" cy="12" r="3.2" fill="#FFFFFF" />
                </svg>
              ) : (
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'radial-gradient(circle, #FFFFFF 20%, #FFE066 65%, #D4954B 100%)',
                    boxShadow: '0 0 10px #FFD700, 0 0 16px rgba(255, 215, 0, 0.8)',
                  }}
                />
              )}
            </div>
          ))}

          {/* Drifting Jasmine & Rose Petals in the Gentle Garden Breeze */}
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute -top-6 pointer-events-none will-change-transform"
              style={{
                left: petal.left,
                width: `${petal.size}px`,
                height: `${petal.size}px`,
                animation: `petal-drift ${petal.duration} cubic-bezier(0.25, 0.46, 0.45, 0.94) ${petal.delay} infinite both`,
              }}
            >
              <img
                src="/images/botanical/falling-petal.png"
                alt=""
                className={`w-full h-full object-contain ${
                  petal.type === 'pink' ? 'opacity-85 filter hue-rotate(-30deg) saturate(1.8)' : 'opacity-90'
                }`}
              />
            </div>
          ))}
        </div>
      )}

      {/* SVG Definitions for Sparkle Gradients */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="sparkleGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9D2" />
            <stop offset="45%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#D4954B" />
          </linearGradient>
        </defs>
      </svg>

      {/* ===================================================================
          PANELS 2–4: PROMINENT LIVE 3D ANIMATED BUTTERFLIES WITH GLIDING
          3 Large prominent butterflies (80–110px) + 2 secondary butterflies (55–75px)
          with high-contrast natural markings, independent 3D wing-flapping + gliding,
          clear body silhouette with antennae, and curved bezier flight paths.
          =================================================================== */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[24]" aria-hidden="true">
          
          {/* Butterfly 1: PROMINENT Amber Monarch (104px) — Enters at 0.4s (PANEL 2) from left alembic */}
          <LiveButterfly
            variant="monarch"
            size={104}
            flightAnimation="flight-path-1"
            flightDuration="4.5s"
            delay="0.40s"
            flapDuration="1.85s"
            bobDuration="1.85s"
            filter="drop-shadow(0 8px 16px rgba(20,40,25,0.45)) drop-shadow(0 0 12px rgba(255,215,0,0.4))"
          />

          {/* Butterfly 2: PROMINENT Golden Swallowtail (96px) — Joins at 0.8s (PANEL 3) from top-right archway */}
          <LiveButterfly
            variant="swallowtail"
            size={96}
            flightAnimation="flight-path-2"
            flightDuration="4.5s"
            delay="0.80s"
            flapDuration="1.95s"
            bobDuration="1.95s"
            filter="drop-shadow(0 8px 16px rgba(20,40,25,0.42)) drop-shadow(0 0 12px rgba(255,215,0,0.35))"
          />

          {/* Butterfly 3: PROMINENT Amber Swallowtail (100px) — Joins at 0.85s (PANEL 3) from right archway */}
          <LiveButterfly
            variant="swallowtail"
            size={100}
            flightAnimation="flight-path-3"
            flightDuration="4.5s"
            delay="0.85s"
            flapDuration="1.80s"
            bobDuration="1.80s"
            filter="sepia(0.18) saturate(1.4) drop-shadow(0 8px 16px rgba(20,40,25,0.45)) drop-shadow(0 0 12px rgba(240,160,45,0.4))"
          />

          {/* Butterfly 4: SECONDARY Saffron Swallowtail (74px) — Joins at 0.85s (PANEL 3) from fountain basin */}
          <LiveButterfly
            variant="swallowtail"
            size={74}
            flightAnimation="flight-path-4"
            flightDuration="4.5s"
            delay="0.85s"
            flapDuration="1.75s"
            bobDuration="1.75s"
            filter="hue-rotate(-10deg) saturate(1.35) drop-shadow(0 6px 14px rgba(20,40,25,0.38)) drop-shadow(0 0 10px rgba(255,180,50,0.35))"
            opacity={0.96}
          />

          {/* Butterfly 5: SECONDARY Ivory/Gold Forager (68px) — Joins at 0.80s (PANEL 3) near left terrace */}
          <LiveButterfly
            variant="swallowtail"
            size={68}
            flightAnimation="flight-path-5"
            flightDuration="4.5s"
            delay="0.80s"
            flapDuration="1.70s"
            bobDuration="1.70s"
            filter="brightness(1.08) drop-shadow(0 6px 14px rgba(20,40,25,0.35)) drop-shadow(0 0 10px rgba(255,245,190,0.4))"
            opacity={0.94}
          />

        </div>
      )}

      {/* Reduced-motion static resting butterflies */}
      {prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[24]" aria-hidden="true">
          <div className="absolute top-[24%] left-[20%] w-24 h-24">
            <img src="/images/botanical/golden-butterfly.png" alt="" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <div className="absolute top-[34%] right-[20%] w-24 h-24">
            <img src="/images/botanical/golden-butterfly.png" alt="" className="w-full h-full object-contain drop-shadow-md" />
          </div>
        </div>
      )}

      {/* ===================================================================
          PANELS 5–9: OFFICIAL LOGO REVEAL & BRAND TEXT IN SEQUENCE
          Panel 5 (2.0–2.4s): Sparkles gather at center
          Panel 6 (2.4–2.8s): Radiant golden burst detonates
          Panel 7 (2.8–3.0s): Real logo reveals in center
          Panel 8 (3.0–3.8s): Brand identity and progressive loading bar
          Panel 9 (3.8–4.5s): Hold & smooth fade to homepage
          =================================================================== */}
      <div 
        className={`relative z-[30] flex flex-col items-center px-6 max-w-lg mx-auto text-center transition-all duration-700 ease-out ${
          isFadingOut ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* RADIANT GOLDEN BURST (PANEL 5 & 6: 2.0s–3.5s) Centered directly behind the Logo Position */}
        {!prefersReducedMotion && (
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[156px] h-[207px] pointer-events-none flex items-center justify-center -z-10 overflow-visible"
            style={{ mixBlendMode: 'screen' }}
            aria-hidden="true"
          >
            {/* Pre-burst Central Gathering Light Core (PANEL 5: 2.0s–2.4s) */}
            <div
              className="absolute w-[180px] h-[180px] rounded-full will-change-transform pointer-events-none opacity-0"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,224,102,0.85) 40%, rgba(212,149,75,0.3) 75%, transparent 100%)',
                animation: 'central-sparkle-vortex 0.45s ease-out 1.95s both',
              }}
            />

            {/* Expanding Champagne-Gold Radial Core (PANEL 6: Detonates at 2.4s) */}
            <div
              className="absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full will-change-transform pointer-events-none opacity-0"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,245,180,0.90) 22%, rgba(255,215,0,0.68) 48%, rgba(212,149,75,0.22) 72%, transparent 100%)',
                animation: 'logo-burst-radiance 1.8s cubic-bezier(0.16, 1, 0.3, 1) 2.40s both',
              }}
            />

            {/* 16 Outward Radiating 4-Point Starbursts firing outward behind the logo (PANEL 6: 2.42s–2.68s) */}
            {burstStars.map((b) => (
              <div
                key={b.id}
                className="absolute pointer-events-none will-change-transform opacity-0"
                style={{
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  // @ts-expect-error CSS custom properties for directional radiation
                  '--dx': b.dx,
                  '--dy': b.dy,
                  animation: `starburst-radiate 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${b.delay} both`,
                }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_14px_#FFD700]">
                  <path
                    d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z"
                    fill="url(#sparkleGoldGradient)"
                  />
                  <circle cx="12" cy="12" r="3.5" fill="#FFFFFF" />
                </svg>
              </div>
            ))}
          </div>
        )}

        {/* PANEL 7: Official Venuss Logo Reveal (2.80s) */}
        <div 
          className="relative mb-3.5 group flex flex-col items-center will-change-transform flex-shrink-0 opacity-0"
          style={{
            animation: prefersReducedMotion ? 'none' : 'logo-cinematic-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.80s both',
          }}
        >
          {/* Restrained Golden Halo settling behind the Logo (PANEL 7: 2.8s onwards) */}
          <div 
            className="absolute -inset-8 rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.55)_0%,_rgba(212,149,75,0.28)_45%,_transparent_75%)] blur-2xl pointer-events-none -z-10"
            style={{
              animation: prefersReducedMotion ? 'none' : 'logo-aura-pulse 3s ease-in-out 2.80s infinite alternate',
            }}
            aria-hidden="true"
          />

          {/* Real Official Venuss Logo Image (765x1015 Aspect Ratio, Preserved Artwork) */}
          <div 
            className="relative rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(23,59,43,0.32),0_0_32px_rgba(255,215,0,0.40)] transition-transform duration-500 ease-out hover:scale-[1.02] flex-shrink-0"
            style={{
              width: '156px',
              height: '207px',
            }}
          >
            <img
              src="/images/brand/venuss-official-logo.png"
              alt="Venuss Herbo Aromatics Official Logo"
              className="w-full h-full object-contain select-none pointer-events-none"
              width={156}
              height={207}
            />
          </div>
        </div>

        {/* PANEL 8: Company Identity & Botanical Typography in Sequence (3.0s–3.8s) */}
        <div className="space-y-1.5 flex flex-col items-center">
          {/* E1. VENUSS HERBO AROMATICS (3.0s) */}
          <h1 
            className="text-xl sm:text-2xl font-bold tracking-[0.20em] text-[#173B2B] font-heading uppercase leading-tight drop-shadow-2xs will-change-transform opacity-0"
            style={{
              animation: prefersReducedMotion ? 'none' : 'brand-text-fade-up 0.6s ease-out 3.00s both',
            }}
          >
            VENUSS HERBO AROMATICS
          </h1>

          {/* E2. PRIVATE LIMITED (3.15s) */}
          <p 
            className="text-[10px] sm:text-[11px] font-bold text-[#2E5E3E] uppercase tracking-[0.28em] will-change-transform opacity-0"
            style={{
              animation: prefersReducedMotion ? 'none' : 'brand-text-fade-up 0.5s ease-out 3.15s both',
            }}
          >
            PRIVATE LIMITED
          </p>

          {/* E3. Botanical Leaf Divider & Tagline (3.30s) */}
          <div 
            className="flex flex-col items-center will-change-transform pt-1 opacity-0"
            style={{
              animation: prefersReducedMotion ? 'none' : 'brand-text-fade-up 0.6s ease-out 3.30s both',
            }}
          >
            {/* Delicate Botanical Leaf Divider */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-10 sm:w-14 bg-gradient-to-r from-transparent via-[#D4954B]/70 to-[#D4954B]" />
              <Leaf className="w-3.5 h-3.5 text-[#173B2B] fill-[#173B2B]/20" />
              <span className="h-[1px] w-10 sm:w-14 bg-gradient-to-l from-transparent via-[#D4954B]/70 to-[#D4954B]" />
            </div>

            <p className="text-[13px] sm:text-[14px] text-[#173B2B] font-serif italic pt-1 drop-shadow-2xs">
              &ldquo;Nature, extracted with precision.&rdquo;&trade;
            </p>
          </div>
        </div>

        {/* E4. Refined Gold & Forest-Green Progressive Loading Bar (3.35s) */}
        <div 
          id="venuss-splash-loading-capsule"
          className="rounded-full overflow-hidden mt-5 relative shadow-[0_0_14px_rgba(255,215,0,0.45)] border border-[#D4954B]/60 will-change-transform opacity-0"
          style={{
            width: '240px',
            height: '6px',
            backgroundColor: 'rgba(23, 59, 43, 0.25)',
            animation: prefersReducedMotion ? 'none' : 'brand-text-fade-up 0.5s ease-out 3.35s both',
          }}
        >
          <div 
            id="venuss-splash-loading-bar"
            className="h-full rounded-full origin-left"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #173B2B 0%, #D4954B 45%, #FFE066 85%, #FFF9D2 100%)',
              boxShadow: '0 0 10px #FFD700',
              animation: prefersReducedMotion ? 'none' : 'splash-loading-expand 0.9s cubic-bezier(0.16, 1, 0.3, 1) 3.35s both',
            }}
          />
        </div>

        {/* E5. Refined Status Caption (3.45s) */}
        <span 
          className="text-[10px] sm:text-[10.5px] text-[#173B2B] font-bold tracking-[0.25em] uppercase mt-2.5 will-change-transform opacity-0"
          style={{
            animation: prefersReducedMotion ? 'none' : 'brand-text-fade-up 0.5s ease-out 3.45s both',
          }}
        >
          CRAFTING NATURE&apos;S FINEST EXTRACTS...
        </span>

        {/* Subtle Dismiss Hint (Accessible for visitors) */}
        <span className="text-[9px] sm:text-[10px] text-[#2E5E3E]/70 tracking-wider uppercase mt-4 hover:text-[#173B2B] transition-colors">
          Click anywhere or press Esc to enter
        </span>
      </div>
    </div>
  );
}
