'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

export default function BrandIntro() {
  const [mounted, setMounted] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isExited, setIsExited] = useState(false);

  // Choreography timeline steps:
  // 0: Soft botanical garden appears with morning sunlight (0.0s)
  // 1: Jasmine bud untwirls and flower blooms, Butterfly 1 enters (0.4s)
  // 2: VENUSS typography reveals in deep forest green (1.0s)
  // 3: HERBO AROMATICS sub-brand appears (1.4s)
  // 4: Brand statement reveals, single petal drifts, Butterfly 2 in midground (1.8s)
  // 5: Butterfly 3 swoops across foreground, initiating seamless dissolve into homepage (2.5s - 3.0s)
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  }, []);

  const handleComplete = useCallback(() => {
    setIsFading(true);
    // Smooth 750ms dissolve into the homepage
    const exitTimer = setTimeout(() => {
      setIsExited(true);
    }, 750);
    timersRef.current.push(exitTimer);
  }, []);

  const handleSkip = useCallback(() => {
    clearAllTimers();
    handleComplete();
  }, [clearAllTimers, handleComplete]);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    // 1. Accessibility: prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReduced = motionQuery.matches;
    setPrefersReducedMotion(isReduced);

    // 2. Testing mode: Allow freeze for inspection via ?freeze=1
    const urlParams = new URLSearchParams(window.location.search);
    const isFrozen = urlParams.has('freeze') || urlParams.has('pause');

    // NOTE FOR TESTING: Per user instructions, we temporarily do NOT check sessionStorage
    // so the intro plays on EVERY refresh of localhost:3000.
    // (After visual approval, sessionStorage guard can be restored).

    if (isReduced) {
      setStep(4);
      if (!isFrozen) {
        const t = setTimeout(() => handleComplete(), 1400);
        timersRef.current.push(t);
      }
      return;
    }

    // 3. Cinematic Choreography Sequence (~3.0s total)
    // 0.4s: Step 1 (White jasmine bloom begins, Butterfly 1 takes flight)
    const t1 = setTimeout(() => setStep(1), 400);

    // 1.0s: Step 2 (VENUSS typography reveal)
    const t2 = setTimeout(() => setStep(2), 1000);

    // 1.4s: Step 3 (HERBO AROMATICS sub-brand reveal)
    const t3 = setTimeout(() => setStep(3), 1400);

    // 1.8s: Step 4 (Brand tagline, single drifting petal, Butterfly 2)
    const t4 = setTimeout(() => setStep(4), 1800);

    // 2.5s: Step 5 (Butterfly 3 foreground guide, smooth transition to homepage)
    const t5 = setTimeout(() => {
      setStep(5);
      if (!isFrozen) {
        // Begin fading at 2.65s, completing dissolve at 3.4s
        const fadeTimer = setTimeout(() => {
          handleComplete();
        }, 150);
        timersRef.current.push(fadeTimer);
      }
    }, 2500);

    timersRef.current.push(t1, t2, t3, t4, t5);

    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers, handleComplete]);

  if (!mounted || isExited) {
    return null;
  }

  return (
    <aside
      aria-label="Venuss Cinematic Botanical Garden Introduction"
      className={`fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden transition-opacity duration-750 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#F5F3EB',
      }}
    >
      {/* =====================================================================
          LAYER 1: CINEMATIC BOTANICAL GARDEN (SOURCE OF TRUTH)
          One continuous photographic botanical garden environment matching
          the reference image: lush white jasmine blossoms and mossy branches on
          top/left, warm morning sunbeams, lush pink camellias on right, and soft
          creamy ivory atmosphere in the clean center.
          ZERO separate bounding boxes. ZERO rectangular tiles.
          ===================================================================== */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none intro-garden-drift"
        style={{
          backgroundImage: "url('/images/botanical/botanical-intro-cinematic.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Volumetric Morning Sunlight Radiance (Upper-Left Sunbeams) */}
      <div 
        className="absolute -top-20 -left-20 w-[800px] h-[800px] pointer-events-none intro-sunbeams"
        style={{
          background: 'radial-gradient(circle at 25% 25%, rgba(255, 252, 238, 0.72) 0%, rgba(255, 243, 205, 0.40) 35%, rgba(240, 235, 215, 0.15) 55%, transparent 75%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Subtle Luminous Center Mist for Optimal Typography Contrast */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 48%, rgba(253, 251, 245, 0.68) 0%, rgba(248, 245, 236, 0.45) 38%, rgba(245, 242, 232, 0.12) 65%, transparent 85%)',
        }}
      />

      {/* =====================================================================
          LAYER 2: LIVING FLORA ANIMATIONS (NO RECTANGLES)
          White jasmine bud untwirls and opens into full flower.
          Overlaid blooming floral accents with circular radial masks so NO
          rectangular boundaries or image tiles can ever appear.
          ===================================================================== */}
      {/* --- Live White Jasmine Blossom Bloom on Top-Left Canopy --- */}
      {step >= 1 && !prefersReducedMotion && (
        <div 
          className="absolute top-[18%] left-[16%] sm:top-[16%] sm:left-[18%] md:top-[17%] md:left-[21%] w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 pointer-events-none z-20"
          style={{
            maskImage: 'radial-gradient(circle at center, black 72%, transparent 98%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 72%, transparent 98%)',
          }}
        >
          {/* Jasmine Bud: untwirls and separates */}
          <div className="absolute inset-0 intro-jasmine-bud flex items-center justify-center">
            <img
              src="/images/botanical/white-jasmine-bud.png"
              alt="Jasmine Bud"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(20,40,25,0.08)] sepia-[0.12] brightness-[1.01]"
              loading="eager"
            />
          </div>

          {/* Jasmine Flower: unfolds petals naturally */}
          <div className="absolute inset-0 intro-jasmine-flower flex items-center justify-center">
            <img
              src="/images/botanical/white-jasmine-flower.png"
              alt="White Jasmine Blossom"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(20,40,25,0.09)] sepia-[0.12] brightness-[1.02]"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* --- Live Soft Pink Blossom Gentle Unfold on Right Floral Canopy --- */}
      {step >= 1 && !prefersReducedMotion && (
        <div 
          className="absolute top-[42%] right-[10%] sm:top-[39%] sm:right-[12%] md:top-[38%] md:right-[13%] w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 pointer-events-none z-20 intro-rose-bloom"
          style={{
            maskImage: 'radial-gradient(circle at center, black 78%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 78%, transparent 100%)',
          }}
        >
          <img
            src="/images/botanical/flower-full.png"
            alt="Pink Camellia Rose"
            className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(20,40,25,0.10)]"
            loading="eager"
          />
        </div>
      )}

      {/* =====================================================================
          LAYER 3: REALISTIC SAFFRON / ORANGE BUTTERFLIES
          Photographic Monarch Butterflies with 3D wing fluttering & natural arcs
          ===================================================================== */}
      {/* Butterfly 1: Swoops toward white jasmine blossoms, lingers, and ascends */}
      {step >= 1 && !prefersReducedMotion && (
        <div className="absolute pointer-events-none z-25 intro-butterfly-1 w-12 sm:w-14 h-12 sm:h-14">
          <div className="intro-butterfly-wings w-full h-full">
            <img
              src="/images/botanical/monarch-butterfly.png"
              alt="Saffron Butterfly"
              className="w-full h-full object-contain filter drop-shadow-[0_6px_14px_rgba(20,40,25,0.22)]"
            />
          </div>
        </div>
      )}

      {/* Butterfly 2: Ambient midground butterfly fluttering gracefully in garden depth */}
      {step >= 4 && !prefersReducedMotion && (
        <div className="absolute pointer-events-none z-15 intro-butterfly-2 w-8 sm:w-9 h-8 sm:h-9">
          <div className="intro-butterfly-wings w-full h-full">
            <img
              src="/images/botanical/monarch-butterfly.png"
              alt="Distant Butterfly"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(20,40,25,0.16)]"
            />
          </div>
        </div>
      )}

      {/* Butterfly 3: Foreground guide crossing the screen to initiate homepage reveal */}
      {step >= 5 && !prefersReducedMotion && (
        <div className="absolute pointer-events-none z-40 intro-butterfly-3 w-16 sm:w-20 h-16 sm:h-20">
          <div className="intro-butterfly-wings w-full h-full">
            <img
              src="/images/botanical/monarch-butterfly.png"
              alt="Foreground Butterfly"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_24px_rgba(20,40,25,0.24)]"
            />
          </div>
        </div>
      )}

      {/* =====================================================================
          LAYER 4: SINGLE FLOATING PINK PETAL
          100% organic 3D airborne petal with zero straight cutoffs or shadows
          ===================================================================== */}
      {step >= 4 && !prefersReducedMotion && (
        <div 
          className="absolute top-[32%] right-[22%] sm:right-[26%] w-7 sm:w-8 pointer-events-none intro-petal-drift z-25"
          style={{
            maskImage: 'radial-gradient(circle at center, black 82%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 82%, transparent 100%)',
          }}
        >
          <img
            src="/images/botanical/falling-petal.png"
            alt="Floating Petal"
            className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(30,45,30,0.10)]"
          />
        </div>
      )}

      {/* =====================================================================
          LAYER 5: CLEAN CENTER BRAND REVEAL
          High-contrast editorial serif typography in deep forest green #102C20
          Sitting directly over the soft botanical atmosphere.
          NO cards, NO white panels, NO glassmorphism containers!
          ===================================================================== */}
      <div className="relative z-30 h-full w-full flex flex-col items-center justify-center px-6 text-center">
        
        {/* Subtle Botanical Leaf Emblem */}
        <div 
          className={`mb-4 sm:mb-5 transition-all duration-700 ease-out ${
            step >= 1 ? 'opacity-85 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2'
          }`}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1A3828]/10 border border-[#1A3828]/20 flex items-center justify-center shadow-xs backdrop-blur-[2px]">
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#1A3828]" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
        </div>

        {/* 1. VENUSS (High-contrast editorial serif in deep forest green #102C20) */}
        <div className="overflow-hidden py-1">
          <h1 
            className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#102C20] transition-all duration-750 ease-out select-none ${
              step >= 2 
                ? 'opacity-100 translate-y-0 tracking-[0.20em] sm:tracking-[0.24em]' 
                : 'opacity-0 translate-y-4 tracking-[0.30em]'
            }`}
            style={{
              textShadow: '0 2px 14px rgba(255, 255, 255, 0.45)',
            }}
          >
            VENUSS
          </h1>
        </div>

        {/* 2. HERBO AROMATICS (Refined uppercase sub-brand) */}
        <div className="overflow-hidden pt-1 pb-2">
          <p 
            className={`font-serif text-xs sm:text-sm md:text-base font-semibold text-[#1A3828] uppercase transition-all duration-750 ease-out select-none ${
              step >= 3 
                ? 'opacity-95 translate-y-0 tracking-[0.36em] sm:tracking-[0.42em]' 
                : 'opacity-0 translate-y-3 tracking-[0.50em]'
            }`}
            style={{
              textShadow: '0 1px 8px rgba(255, 255, 255, 0.35)',
            }}
          >
            HERBO AROMATICS
          </p>
        </div>

        {/* Ornamental Botanical Divider Line */}
        <div 
          className={`my-3 sm:my-4 h-[1px] bg-gradient-to-r from-transparent via-[#1A3828]/35 to-transparent transition-all duration-700 ease-out ${
            step >= 4 ? 'w-28 sm:w-36 opacity-100' : 'w-0 opacity-0'
          }`}
        />

        {/* 3. BRAND STATEMENT (Natural Extracts • Botanical Precision) */}
        <div 
          className={`transition-all duration-600 ease-out ${
            step >= 4 ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.26em] text-[#3D6348] uppercase flex items-center justify-center gap-2.5 select-none">
            <span>Natural Extracts</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B98255] inline-block" />
            <span>Botanical Precision</span>
          </p>
        </div>

      </div>

      {/* =====================================================================
          LAYER 6: SKIP CONTROL (Minimal Bottom-Right Button)
          ===================================================================== */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <button
          type="button"
          onClick={handleSkip}
          className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#2E4F38] hover:text-[#102C20] bg-[#FAF8F2]/80 hover:bg-[#FAF8F2]/95 border border-[#1A3828]/20 hover:border-[#1A3828]/35 backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
          title="Skip Introduction"
        >
          <span>SKIP</span>
          <ArrowRight className="w-3 h-3 text-[#2E4F38] group-hover:text-[#102C20] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </aside>
  );
}
