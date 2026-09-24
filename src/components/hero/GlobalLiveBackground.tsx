'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function GlobalLiveBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // 2. Parallax scroll tracking
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Subtle Mouse Breeze Reaction
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    rafIdRef.current = requestAnimationFrame(() => {
      const { innerWidth } = window;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Left canopy breeze (top-left region)
      if (mouseX < 460 && mouseY < 650) {
        const factor = 1 - (mouseX / 460);
        const deflect = factor * 2.8;
        container.style.setProperty('--breeze-left', `${deflect.toFixed(2)}deg`);
      } else {
        container.style.setProperty('--breeze-left', '0deg');
      }

      // Right rose canopy breeze (right region)
      const distRight = innerWidth - mouseX;
      if (distRight < 480 && mouseY < 650) {
        const factor = 1 - (distRight / 480);
        const deflect = -factor * 2.6;
        container.style.setProperty('--breeze-right', `${deflect.toFixed(2)}deg`);
      } else {
        container.style.setProperty('--breeze-right', '0deg');
      }

      // Smooth decay back to resting state
      if (decayTimeoutRef.current) clearTimeout(decayTimeoutRef.current);
      decayTimeoutRef.current = setTimeout(() => {
        container.style.setProperty('--breeze-left', '0deg');
        container.style.setProperty('--breeze-right', '0deg');
      }, 800);
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (decayTimeoutRef.current) clearTimeout(decayTimeoutRef.current);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className={`live-botanical-garden absolute inset-0 pointer-events-none overflow-hidden z-0 ${
        prefersReducedMotion ? 'is-reduced-motion' : ''
      }`}
      aria-hidden="true"
    >
      {/* =====================================================================
          LAYER 1 — FAR BACKGROUND (FIXED VIEWPORT)
          Photorealistic blurred garden bokeh + sunlight rays + slow ambient drift
          ===================================================================== */}
      <div 
        className="garden-layer garden-layer--far fixed inset-0 pointer-events-none"
        style={{
          transform: `translateY(${prefersReducedMotion ? 0 : scrollY * -0.03}px)`,
        }}
      >
        {/* Soft morning garden tint */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(234, 243, 233, 0.94) 0%, rgba(246, 244, 234, 0.92) 100%)',
          }}
        />

        {/* Real Lush Garden Bokeh Foliage Layer */}
        <div 
          className="garden-far-bokeh absolute inset-0 opacity-22 mix-blend-multiply filter blur-[2px] scale-105"
          style={{
            backgroundImage: "url('/images/botanical/garden-bokeh-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 15%',
          }}
        />

        {/* Dynamic Warm Sunlight Beams (Radiating from Top-Left Corner) */}
        <div className="garden-sunlight-beam-wrapper absolute -top-16 -left-16 w-[700px] h-[700px] pointer-events-none">
          <div className="garden-sunbeam-core" />
          <div className="garden-sunbeam-rays" />
        </div>

        {/* Subtle Ambient Garden Glow Orbs */}
        <div className="absolute top-[12%] right-[10%] w-[580px] h-[580px] rounded-full blur-[100px] opacity-18 pointer-events-none bg-radial from-[#F9E2AF] via-[#F4D08C]/30 to-transparent garden-light-pulse" />
        <div className="absolute top-[45%] -left-[10%] w-[540px] h-[540px] rounded-full blur-[110px] opacity-15 pointer-events-none bg-radial from-[#2E5E3E] via-[#3D7A56]/25 to-transparent" />
        <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-16 pointer-events-none bg-radial from-[#3A7563] via-[#8FBC8F]/25 to-transparent" />
      </div>

      {/* =====================================================================
          LAYER 2 — MIDGROUND CONTINUOUS LIVING BOTANICAL SYSTEM (FULL PAGE HEIGHT)
          Plants grow naturally from LEFT & RIGHT outer edges down the whole page.
          Believable anatomy: enter from viewport boundaries, stay in gutters outside UI.
          ===================================================================== */}
      <div className="garden-layer garden-layer--mid absolute inset-0 pointer-events-none">
        
        {/* ===================================================================
            SECTION 1: HERO (0px - 850px)
            Lush Flowering Canopies Framing the Hero Slide & Visual
            =================================================================== */}
        {/* --- HERO LEFT CANOPY: Arching White Citrus/Jasmine Branch & Monarch Butterfly --- */}
        <div className="botanical-canopy botanical-canopy--top-left">
          <div className="botanical-branch-organism botanical-branch-organism--white">
            <img
              src="/images/botanical/white-branch.png"
              alt=""
              className="w-full h-full object-contain"
            />
            {/* Monarch Butterfly Resting on Branch near Blossoms */}
            <div className="garden-monarch-butterfly">
              <img
                src="/images/botanical/monarch-butterfly.png"
                alt=""
                className="butterfly-wings"
              />
            </div>
            {/* Secondary Leaf Micro-Sway Overlays */}
            <div className="canopy-leaf-cluster canopy-leaf-cluster--1" />
            <div className="canopy-leaf-cluster canopy-leaf-cluster--2" />
          </div>
        </div>

        {/* --- HERO RIGHT CANOPY: Arching Connected Damask Rose Plant Organism --- */}
        <div className="botanical-canopy botanical-canopy--top-right">
          <div className="botanical-branch-organism botanical-branch-organism--roses">
            
            {/* Continuous Botanical Stem Vector with Living Nodes & Calyx */}
            <svg 
              className="rose-stem-network-svg" 
              viewBox="0 0 380 520" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="roseStemNetworkGrad" x1="90%" y1="0%" x2="20%" y2="100%">
                  <stop offset="0%" stopColor="#1B422B" />
                  <stop offset="35%" stopColor="#2E5E3E" />
                  <stop offset="70%" stopColor="#3E7750" />
                  <stop offset="100%" stopColor="#558C67" />
                </linearGradient>
                <linearGradient id="sepalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4A845C" />
                  <stop offset="100%" stopColor="#224C34" />
                </linearGradient>
              </defs>

              {/* Main Arching Rose Branch from top boundary down through upper & lower nodes */}
              <path
                d="M 350 -10 C 335 45, 290 95, 220 160 C 180 200, 160 250, 195 315 C 220 355, 225 390, 185 460 C 170 485, 155 505, 140 520"
                stroke="url(#roseStemNetworkGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Apex Node Calyx & Green Sepals (Supporting the Upper Living Damask Rose) */}
              <g transform="translate(220, 160)">
                <ellipse cx="0" cy="8" rx="8" ry="6" fill="#2A593A" />
                <path d="M -6 6 C -18 10, -28 3, -34 -12 C -24 -6, -12 -1, -4 4 Z" fill="url(#sepalGrad)" />
                <path d="M 6 6 C 18 10, 28 3, 34 -12 C 24 -6, 12 -1, 4 4 Z" fill="url(#sepalGrad)" />
                <path d="M -2 9 C -10 24, -18 32, -30 38 C -22 28, -12 20, 0 10 Z" fill="url(#sepalGrad)" />
                <path d="M 2 9 C 10 24, 18 32, 30 38 C 22 28, 12 20, 0 10 Z" fill="url(#sepalGrad)" />
                <path d="M 0 10 C 0 28, 4 42, 6 52 C 2 40, -1 26, 0 10 Z" fill="#3D754F" />
              </g>

              {/* Lower Node Calyx & Sepals (Supporting the Secondary Open Rose) */}
              <g transform="translate(210, 360)">
                <ellipse cx="0" cy="6" rx="7" ry="5" fill="#2A593A" />
                <path d="M -5 5 C -15 8, -24 2, -28 -10 C -20 -4, -10 0, -3 3 Z" fill="url(#sepalGrad)" />
                <path d="M 5 5 C 15 8, 24 2, 28 -10 C 20 -4, 10 0, 3 3 Z" fill="url(#sepalGrad)" />
                <path d="M -2 7 C -8 20, -15 26, -24 30 C -18 22, -10 16, 0 8 Z" fill="url(#sepalGrad)" />
              </g>

              {/* Natural Stem Thorns */}
              <path d="M 310 35 L 320 38 L 314 42 Z" fill="#1B422B" />
              <path d="M 268 95 L 278 100 L 271 104 Z" fill="#244E33" />
              <path d="M 175 220 L 165 224 L 172 228 Z" fill="#2E5E3E" />
              <path d="M 180 270 L 170 275 L 178 279 Z" fill="#2E5E3E" />
              <path d="M 205 410 L 214 415 L 208 418 Z" fill="#3A704B" />
            </svg>

            {/* Real Connected Rose Foliage on Nodes */}
            <div className="rose-attached-foliage rose-attached-foliage--top">
              <img
                src="/images/botanical/branch-foliage.png"
                alt=""
                className="w-48 h-48 object-contain transform scale-x-[-1] rotate-25 opacity-90"
              />
            </div>

            <div className="rose-attached-foliage rose-attached-foliage--mid">
              <img
                src="/images/botanical/branch-foliage.png"
                alt=""
                className="w-52 h-52 object-contain transform rotate-[-40deg] opacity-95"
              />
            </div>

            <div className="rose-attached-foliage rose-attached-foliage--bottom">
              <img
                src="/images/botanical/branch-foliage.png"
                alt=""
                className="w-44 h-44 object-contain transform scale-x-[-1] rotate-10 opacity-85"
              />
            </div>

            {/* Upper Rosebud Accent on Petiole */}
            <div className="rose-stem-bud-item rose-stem-bud-item--top">
              <img
                src="/images/botanical/flower-bud.png"
                alt=""
                className="w-14 h-14 object-contain transform -rotate-12"
              />
            </div>

            {/* THE LIVING BLOOMING DAMASK ROSE (At Stem Apex Node (220, 160)) */}
            <div className="living-rose-blooming-unit">
              {/* Stage 1: Closed Rosebud */}
              <div className="bloom-element bloom-element--bud">
                <img
                  src="/images/botanical/flower-bud.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Stage 5: Golden Stamen Core */}
              <div className="bloom-element bloom-element--stamen">
                <img
                  src="/images/botanical/bloom-layer-stamen.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Stage 4: Inner Petals */}
              <div className="bloom-element bloom-element--inner">
                <img
                  src="/images/botanical/bloom-layer-inner.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Stage 4: Mid Petals */}
              <div className="bloom-element bloom-element--mid">
                <img
                  src="/images/botanical/bloom-layer-mid.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Stage 3: Individual Outer Petals Opening Sequentially */}
              <div className="bloom-element bloom-element--petal-top">
                <img
                  src="/images/botanical/bloom-layer-outer-top.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="bloom-element bloom-element--petal-topright">
                <img
                  src="/images/botanical/bloom-layer-outer-topright.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="bloom-element bloom-element--petal-left">
                <img
                  src="/images/botanical/bloom-layer-outer-left.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="bloom-element bloom-element--petal-botright">
                <img
                  src="/images/botanical/bloom-layer-outer-botright.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="bloom-element bloom-element--petal-botleft">
                <img
                  src="/images/botanical/bloom-layer-outer-botleft.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Lower Secondary Rose (Connected at Stem Node (210, 360)) */}
            <div className="living-rose-secondary-bloom">
              <img
                src="/images/botanical/flower-full.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

          </div>
        </div>

        {/* ===================================================================
            SECTION 2: COLLECTION / CATEGORIES TRANSITION (850px - 1450px)
            Single Gentle Trailing Foliage Vine entering from Left Page Edge.
            Right side maintains open negative space for natural asymmetry.
            =================================================================== */}
        <div className="botanical-gutter-flora botanical-gutter-flora--collection-left">
          <div className="botanical-branch-organism botanical-branch-organism--collection-left">
            <svg 
              className="absolute top-0 left-0 w-full h-full pointer-events-none" 
              viewBox="0 0 260 340" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M -10 30 C 40 45, 90 90, 110 160 C 130 230, 95 290, 60 340"
                stroke="#2B5838"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>
            <img
              src="/images/botanical/branch-foliage.png"
              alt=""
              className="w-56 h-64 object-contain opacity-85 transform -rotate-12 translate-x-[-20px] translate-y-[20px]"
            />
          </div>
        </div>

        {/* ===================================================================
            SECTION 3: COLLECTION TO LOWER SECTIONS TRANSITION
            Products section frame is now art-directed & anchored directly
            via ProductBotanicalFrame inside section#bestsellers.
            =================================================================== */}

        {/* ===================================================================
            SECTION 4: LOWER SECTIONS & FOOTER (Document Bottom)
            Grounded Mossy Base hugging bottom-left screen border
            =================================================================== */}
        {/* Bottom Left Corner: Grounded Mossy Foliage Base */}
        <div className="botanical-gutter-flora botanical-gutter-flora--bottom-moss">
          <div className="botanical-branch-organism botanical-branch-organism--bottom-moss">
            <img
              src="/images/botanical/branch-foliage.png"
              alt=""
              className="w-64 h-64 object-contain opacity-85 transform -rotate-45"
            />
          </div>
        </div>

      </div>

      {/* =====================================================================
          LAYER 3 — FOREGROUND AMBIENT DRIFT & DETACHED PETALS (FIXED VIEWPORT)
          Translucent petals drift down across the entire website journey
          ===================================================================== */}
      <div 
        className="garden-layer garden-layer--fore fixed inset-0 pointer-events-none"
        style={{
          transform: `translateY(${prefersReducedMotion ? 0 : scrollY * -0.15}px)`,
        }}
      >
        {/* Occasional Natural Detached Petal 1: Drifts across screen */}
        <div className="falling-petal-event falling-petal-event--1">
          <img
            src="/images/botanical/falling-petal.png"
            alt=""
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Occasional Natural Detached Petal 2: Staggered natural drift */}
        <div className="falling-petal-event falling-petal-event--2">
          <img
            src="/images/botanical/falling-petal.png"
            alt=""
            className="w-8 h-8 object-contain transform rotate-45"
          />
        </div>

        {/* Rare Delicate White Petal: Drifts gently from top-left jasmine */}
        <div className="falling-petal-event falling-petal-event--white">
          <div className="w-5 h-5 rounded-full bg-white/80 filter blur-[0.4px] drop-shadow-xs" />
        </div>

        {/* Subtle Atmospheric Light Dust / Pollen Floating in Sunlight Rays */}
        <div className="garden-sunlight-dust absolute top-[18%] left-[14%] w-2 h-2 rounded-full bg-[#FFF2B2]/60 filter blur-[0.6px] garden-dust-float-1" />
        <div className="garden-sunlight-dust absolute top-[28%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#FFF2B2]/50 filter blur-[0.5px] garden-dust-float-2" />
        <div className="garden-sunlight-dust absolute top-[38%] left-[12%] w-2.5 h-2.5 rounded-full bg-[#FFF2B2]/45 filter blur-[0.8px] garden-dust-float-3" />
      </div>

      {/* Subtle Film Grain (Ties the Garden Atmosphere into Website Texture) */}
      <div 
        className="garden-film-grain fixed inset-0 z-[3] pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
}
