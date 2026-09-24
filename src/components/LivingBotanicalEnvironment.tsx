'use client';

import React, { useEffect, useRef, useState } from "react";

export type EnvironmentVariant =
  | "hero"
  | "essential-oils"
  | "spice"
  | "floral"
  | "quality"
  | "business"
  | "story";

interface LivingBotanicalEnvironmentProps {
  variant?: EnvironmentVariant;
  intensity?: "whisper" | "subtle" | "gentle";
  className?: string;
  enableMouseBreeze?: boolean;
}

export default function LivingBotanicalEnvironment({
  variant = "hero",
  intensity = "subtle",
  className = "",
  enableMouseBreeze = true,
}: LivingBotanicalEnvironmentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // 1. Scroll-Based Viewport Awareness: Pauses animations when off-screen, resumes when on-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.05, rootMargin: "80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Parallax Scroll Reaction
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Mouse Proximity Natural Breeze: Plants flex away gently from nearby cursor motion
  useEffect(() => {
    if (!enableMouseBreeze) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Left plant anchor: roughly (x: 80, y: rect.height - 180)
        const leftPlantX = 80;
        const leftPlantY = rect.height - 180;
        const distLeft = Math.hypot(mouseX - leftPlantX, mouseY - leftPlantY);

        if (distLeft < 360) {
          const factor = 1 - distLeft / 360;
          const deflect = (mouseX > leftPlantX ? -1 : 1) * factor * 3.5;
          container.style.setProperty("--air-disturb-left", `${deflect.toFixed(2)}deg`);
        } else {
          container.style.setProperty("--air-disturb-left", "0deg");
        }

        // Right flower anchor: roughly (x: rect.width - 120, y: rect.height - 160)
        const rightPlantX = rect.width - 120;
        const rightPlantY = rect.height - 160;
        const distRight = Math.hypot(mouseX - rightPlantX, mouseY - rightPlantY);

        if (distRight < 380) {
          const factor = 1 - distRight / 380;
          const deflect = (mouseX > rightPlantX ? -1 : 1) * factor * 3.2;
          container.style.setProperty("--air-disturb-right", `${deflect.toFixed(2)}deg`);
        } else {
          container.style.setProperty("--air-disturb-right", "0deg");
        }

        // Smooth decay when mouse pauses
        if (decayTimeoutRef.current) clearTimeout(decayTimeoutRef.current);
        decayTimeoutRef.current = setTimeout(() => {
          container.style.setProperty("--air-disturb-left", "0deg");
          container.style.setProperty("--air-disturb-right", "0deg");
        }, 700);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (decayTimeoutRef.current) clearTimeout(decayTimeoutRef.current);
    };
  }, [enableMouseBreeze]);

  return (
    <div
      ref={containerRef}
      className={`living-env living-env--${variant} living-env--intensity-${intensity} ${
        isInView ? "is-in-view" : "is-paused"
      } ${className}`}
      aria-hidden="true"
    >
      {/* ===================================================================
          1. HERO VARIANT: REALISTIC LIVING BOTANICAL ENVIRONMENT
          Left: Organic curved branch foliage with independent leaves.
          Right: Connected plant organism with blooming botanical damask rose.
          Foreground: Occasional detached drifting petals.
          =================================================================== */}
      {variant === "hero" && (
        <>
          {/* Depth Layer 1: Background Soft Bokeh Foliage Silhouette */}
          <div className="env-depth env-depth--bg">
            <div 
              className="absolute -top-12 -left-12 w-64 h-80 opacity-15 pointer-events-none filter blur-sm transform -rotate-12"
              style={{
                backgroundImage: "url('/images/botanical/branch-foliage.png')",
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                transform: `translateY(${scrollY * -0.04}px) rotate(-12deg)`,
              }}
            />
            <div 
              className="absolute -top-8 -right-12 w-72 h-88 opacity-12 pointer-events-none filter blur-[3px] transform scale-x-[-1] rotate-6"
              style={{
                backgroundImage: "url('/images/botanical/branch-foliage.png')",
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                transform: `translateY(${scrollY * -0.05}px) scaleX(-1) rotate(6deg)`,
              }}
            />
          </div>

          {/* Depth Layer 2: Midground Living Connected Plants */}
          
          {/* --- LEFT HERO PLANT: CONNECTED CURVED STEM WITH INDEPENDENT SWAYING LEAVES --- */}
          <div 
            className="real-plant-anchor real-plant-anchor--hero-left"
            style={{
              transform: `translateY(${scrollY * -0.09}px)`,
            }}
          >
            {/* The Main Stem Container: Swings as one connected organism */}
            <div className="plant-organism plant-organism--left-stem">
              
              {/* Natural Curved Branch Base Image */}
              <div className="plant-stem-graphic">
                <img
                  src="/images/botanical/branch-foliage.png"
                  alt=""
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(23,63,44,0.12)]"
                />
              </div>

              {/* Independent Leaf Overlays (attached to nodes, waving with varying wind frequencies) */}
              {/* Leaf Node 1: Lower leaf sway */}
              <div className="leaf-overlay-node leaf-overlay-node--1">
                <div className="leaf-motion-inner leaf-motion-inner--1" />
              </div>

              {/* Leaf Node 2: Mid leaf sway */}
              <div className="leaf-overlay-node leaf-overlay-node--2">
                <div className="leaf-motion-inner leaf-motion-inner--2" />
              </div>

              {/* Leaf Node 3: Apex tender leaves sway */}
              <div className="leaf-overlay-node leaf-overlay-node--3">
                <div className="leaf-motion-inner leaf-motion-inner--3" />
              </div>
            </div>
          </div>

          {/* --- RIGHT HERO PLANT: CONNECTED LIVING BOTANICAL FLOWER WITH REAL BLOOM SEQUENCE --- */}
          <div 
            className="real-plant-anchor real-plant-anchor--hero-right"
            style={{
              transform: `translateY(${scrollY * -0.08}px)`,
            }}
          >
            {/* Connected Plant Organism: Stem, Nodes, Leaves, and Flower move together */}
            <div className="plant-organism plant-organism--right-flower">
              
              {/* Organic Curved Green Stem Vector Base with Natural Nodes */}
              <svg 
                className="flower-stem-curved-svg" 
                viewBox="0 0 240 380" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="organicStemGrad" x1="0%" y1="100%" x2="40%" y2="0%">
                    <stop offset="0%" stopColor="#1B422B" />
                    <stop offset="50%" stopColor="#2E5E3E" />
                    <stop offset="100%" stopColor="#4A845C" />
                  </linearGradient>
                </defs>

                {/* Main Curved Stem Line Rooted at Bottom (180, 380) curving up to Flower Apex (115, 95) */}
                <path
                  d="M 175 380 C 185 305, 140 220, 125 150 C 120 128, 116 112, 115 95"
                  stroke="url(#organicStemGrad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />

                {/* Calyx & Sepals Supporting Flower Base at (115, 95) */}
                <path
                  d="M 110 96 C 104 100, 96 95, 92 86 C 100 89, 108 92, 112 95 Z"
                  fill="#2E5E3E"
                  stroke="#1B422B"
                  strokeWidth="0.8"
                />
                <path
                  d="M 120 96 C 126 100, 134 95, 138 86 C 130 89, 122 92, 118 95 Z"
                  fill="#2E5E3E"
                  stroke="#1B422B"
                  strokeWidth="0.8"
                />
                <path
                  d="M 115 95 C 112 87, 115 82, 116 82 C 117 82, 120 87, 117 95 Z"
                  fill="#3B744F"
                />
              </svg>

              {/* Side Stem Leaf 1: Attached to lower stem at (165, 275) */}
              <div className="stem-attached-leaf stem-attached-leaf--1">
                <img
                  src="/images/botanical/branch-foliage.png"
                  alt=""
                  className="w-24 h-24 object-contain filter drop-shadow-sm opacity-90 transform -rotate-45"
                />
              </div>

              {/* Side Stem Leaf 2: Attached to mid stem at (132, 185) */}
              <div className="stem-attached-leaf stem-attached-leaf--2">
                <img
                  src="/images/botanical/branch-foliage.png"
                  alt=""
                  className="w-20 h-20 object-contain filter drop-shadow-sm opacity-90 transform scale-x-[-1] rotate-12"
                />
              </div>

              {/* === THE BLOOMING FLOWER ANATOMY (Located at Stem Apex) === */}
              <div className="flower-bloom-head">
                
                {/* 1. CLOSED ROSEBUD (Phase 1: 0s–7s) */}
                <div className="flower-phase-bud">
                  <img
                    src="/images/botanical/flower-bud.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* 2. PETAL-BY-PETAL BLOOMING SEQUENCE (Phase 2 & 3: 7s–16s) */}
                <div className="flower-phase-petals-unfolding">
                  
                  {/* Outer Petal 1 (Top-Left): Opens First */}
                  <div className="unfolding-petal unfolding-petal--1">
                    <img
                      src="/images/botanical/petal-outer-1.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Outer Petal 2 (Top-Right): Opens Second */}
                  <div className="unfolding-petal unfolding-petal--2">
                    <img
                      src="/images/botanical/petal-outer-2.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Outer Petal 3 (Bottom-Left): Opens Third */}
                  <div className="unfolding-petal unfolding-petal--3">
                    <img
                      src="/images/botanical/petal-outer-3.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Outer Petal 4 (Bottom-Right): Opens Fourth */}
                  <div className="unfolding-petal unfolding-petal--4">
                    <img
                      src="/images/botanical/petal-outer-4.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Inner Petal Uncurling */}
                  <div className="unfolding-petal unfolding-petal--center">
                    <img
                      src="/images/botanical/petal-center-unfold.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Golden Stamen Center Uncovered */}
                  <div className="unfolding-stamen-center">
                    <img
                      src="/images/botanical/bloom-layer-stamen.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* 3. FULL GLORIOUS DAMASK ROSE BLOOM (Phase 4: 15s–22s) */}
                <div className="flower-phase-full-bloom">
                  <img
                    src="/images/botanical/flower-full.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Depth Layer 3: Foreground Occasional Natural Petal Drift */}
          <div className="env-depth env-depth--fg pointer-events-none">
            {/* Occasional Drifting Petal 1 */}
            <div className="drifting-petal-item drifting-petal-item--1">
              <img
                src="/images/botanical/petal-outer-1.png"
                alt=""
                className="w-8 h-8 object-contain filter drop-shadow-xs transform rotate-12"
              />
            </div>

            {/* Occasional Drifting Petal 2 (Staggered timing & alternate path) */}
            <div className="drifting-petal-item drifting-petal-item--2">
              <img
                src="/images/botanical/petal-outer-3.png"
                alt=""
                className="w-7 h-7 object-contain filter drop-shadow-xs transform -rotate-45"
              />
            </div>
          </div>
        </>
      )}

      {/* ===================================================================
          2. CATEGORY VARIANT: SUBTLE GROUNDED BOTANICAL VINE ALONG LEFT EDGE
          =================================================================== */}
      {variant === "essential-oils" && (
        <div className="real-plant-anchor real-plant-anchor--category">
          <div className="plant-organism plant-organism--category-vine">
            <img
              src="/images/botanical/branch-foliage.png"
              alt=""
              className="w-48 h-36 object-contain opacity-75 filter drop-shadow-xs transform -rotate-75 origin-bottom-left"
            />
          </div>
        </div>
      )}

      {/* ===================================================================
          3. SPICE VARIANT: CASCADING BOTANICAL FOLIAGE IN OUTER GUTTER
          Positioned completely outside product cards along the right gutter.
          =================================================================== */}
      {variant === "spice" && (
        <div className="real-plant-anchor real-plant-anchor--spice-gutter">
          <div className="plant-organism plant-organism--spice-cascade">
            <img
              src="/images/botanical/branch-foliage.png"
              alt=""
              className="w-56 h-72 object-contain opacity-70 filter drop-shadow-sm transform scale-x-[-1] rotate-12"
            />
            {/* Single delicate drifting petal outside card bounds */}
            <div className="drifting-petal-item drifting-petal-item--spice">
              <img
                src="/images/botanical/petal-outer-2.png"
                alt=""
                className="w-6 h-6 object-contain opacity-65"
              />
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          4. QUALITY & STORY ACCENTS (Minimal archival botanical watermarks)
          =================================================================== */}
      {variant === "quality" && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none w-48 h-48">
          <img
            src="/images/botanical/branch-foliage.png"
            alt=""
            className="w-full h-full object-contain filter blur-[0.5px]"
          />
        </div>
      )}

      {variant === "story" && (
        <div className="absolute left-2 bottom-0 opacity-12 pointer-events-none w-56 h-48">
          <img
            src="/images/botanical/branch-foliage.png"
            alt=""
            className="w-full h-full object-contain transform -rotate-12"
          />
        </div>
      )}
    </div>
  );
}
