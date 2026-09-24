'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ProductBotanicalFrameProps {
  className?: string;
}

export default function ProductBotanicalFrame({ className = '' }: ProductBotanicalFrameProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      ref={frameRef}
      className={`product-botanical-frame pointer-events-none ${
        prefersReducedMotion ? 'is-reduced-motion' : ''
      } ${className}`}
      aria-hidden="true"
    >
      {/* =====================================================================
          1. BACKGROUND ATMOSPHERE: VERY SUBTLE DISTANT FOLIAGE
          Muted, blurred atmospheric garden silhouette behind upper heading area.
          Zero contrast or interference with typography.
          ===================================================================== */}
      <div className="product-margin-bg-silhouette absolute top-[-25px] left-[15vw] w-72 h-36 pointer-events-none">
        <div 
          className="w-full h-full opacity-[0.07] filter blur-[5px] transform -rotate-6"
          style={{
            backgroundImage: "url('/images/botanical/branch-foliage.png')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* =====================================================================
          2. PRIMARY BOTANICAL FOCUS: RIGHT SCREEN MARGIN FLOWERING BRANCH (🌸)
          Anchored directly to the FAR-RIGHT SCREEN BORDER (outer 0–8vw).
          Enters from outside the viewport edge. Partially cropped like a camera frame.
          Leaves, buds, and rose bloom stay strictly in the outer margin.
          100% VISIBLE in the right margin, ZERO overlap with product cards.
          ===================================================================== */}
      <div className="product-margin-branch product-margin-branch--right pointer-events-none">
        <div className="product-margin-organism product-margin-organism--right-rose">
          
          {/* Natural Stem Vector entering from right viewport boundary */}
          <svg 
            className="absolute top-0 right-0 w-full h-full pointer-events-none" 
            viewBox="0 0 180 380" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="rightMarginStemGrad" x1="100%" y1="0%" x2="20%" y2="100%">
                <stop offset="0%" stopColor="#1B4228" />
                <stop offset="40%" stopColor="#2A5C39" />
                <stop offset="75%" stopColor="#3E7A52" />
                <stop offset="100%" stopColor="#558F67" />
              </linearGradient>
            </defs>
            {/* Natural curve arching from outside right screen edge down the outer margin */}
            <path
              d="M 195 15 C 150 35, 95 105, 82 185 C 72 245, 98 305, 122 365"
              stroke="url(#rightMarginStemGrad)"
              strokeWidth="3.0"
              strokeLinecap="round"
              opacity="0.92"
            />
            {/* Lateral petiole to upper bud */}
            <path d="M 98 135 C 78 120, 62 105, 54 85" stroke="#2A5C39" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
            {/* Lateral petiole to lower bud */}
            <path d="M 85 205 C 72 220, 60 238, 54 255" stroke="#326B43" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
          </svg>

          {/* Connected Foliage Branch */}
          <div className="absolute top-[25px] right-[5px] w-[86%] h-[80%] pointer-events-none">
            <img
              src="/images/botanical/branch-foliage.png"
              alt=""
              className="w-full h-full object-contain opacity-90 transform scale-x-[-1] rotate-15 filter drop-shadow-[0_8px_18px_rgba(20,50,30,0.14)]"
            />
          </div>

          {/* THE MAIN FOCAL FLOWER: Realistic Open Damask Rose Bloom */}
          <div className="product-focal-flower absolute top-[75px] right-[28px] w-[50px] h-[50px] pointer-events-none">
            {/* Green calyx & sepals anchoring flower to stem */}
            <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 z-0 opacity-85">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 12 12 C 6 16, 2 20, 0 24 C 6 22, 10 18, 12 12 Z" fill="#245133" />
                <path d="M 12 12 C 16 16, 20 20, 24 24 C 18 22, 14 18, 12 12 Z" fill="#2E633F" />
              </svg>
            </div>
            <img
              src="/images/botanical/flower-full.png"
              alt=""
              className="product-focal-flower-bloom relative z-[1] w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(205,80,110,0.28)]"
            />
          </div>

          {/* Tender Rose Bud 1: Upper branch accent */}
          <div className="product-focal-bud-1 absolute top-[24px] right-[56px] w-6 h-6 pointer-events-none">
            <img
              src="/images/botanical/flower-bud.png"
              alt=""
              className="w-full h-full object-contain transform rotate-35 opacity-92 filter drop-shadow-xs"
            />
          </div>

          {/* Tender Rose Bud 2: Lower branch node accent */}
          <div className="product-focal-bud-2 absolute top-[190px] right-[34px] w-4.5 h-4.5 pointer-events-none">
            <img
              src="/images/botanical/flower-bud.png"
              alt=""
              className="w-full h-full object-contain transform -rotate-20 opacity-85 filter drop-shadow-xs"
            />
          </div>

          {/* Occasional Detached Floating Rose Petal in Right Margin Draft */}
          <div className="margin-falling-petal">
            <img
              src="/images/botanical/falling-petal.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

        </div>
      </div>

      {/* =====================================================================
          3. SECONDARY BOTANICAL ACCENT: LEFT SCREEN MARGIN FOLIAGE BRANCH (🌿)
          Anchored directly to the FAR-LEFT SCREEN BORDER (outer 0–8vw).
          Enters from outside the left edge. Stays strictly in outer margin.
          Single organic green foliage branch. Reduced visual weight.
          ZERO flowers on left side for deliberate natural asymmetry.
          100% VISIBLE in the left margin, ZERO overlap with product cards.
          ===================================================================== */}
      <div className="product-margin-branch product-margin-branch--left pointer-events-none">
        <div className="product-margin-organism product-margin-organism--left-foliage">
          
          {/* Natural Stem Vector entering from left viewport boundary */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none" 
            viewBox="0 0 170 350" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="leftMarginStemGrad" x1="0%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#183D24" />
                <stop offset="45%" stopColor="#255534" />
                <stop offset="85%" stopColor="#367049" />
                <stop offset="100%" stopColor="#4A885F" />
              </linearGradient>
            </defs>
            <path
              d="M -15 20 C 35 40, 80 95, 92 170 C 100 215, 78 265, 48 315"
              stroke="url(#leftMarginStemGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.88"
            />
            {/* Small lateral twigs for organic realism */}
            <path d="M 65 95 C 85 85, 102 72, 110 58" stroke="#255534" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
            <path d="M 92 190 C 105 205, 112 222, 115 240" stroke="#316742" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
          </svg>

          {/* Varied Natural Foliage */}
          <div className="absolute top-[20px] left-[8px] w-[85%] h-[78%] pointer-events-none">
            <img
              src="/images/botanical/branch-foliage.png"
              alt=""
              className="w-full h-full object-contain opacity-82 transform -rotate-14 filter drop-shadow-[0_8px_18px_rgba(20,50,30,0.12)]"
            />
          </div>

        </div>
      </div>

      {/* =====================================================================
          4. BOTTOM SCREEN CORNERS: MINIMAL FOREGROUND CONTINUATION
          Anchored to the screen edges at the bottom corners.
          Subtle, reduced scale and opacity. Acts as foreground continuity.
          ===================================================================== */}
      {/* Bottom-Left (🍃): Tender foreground leaf sprig kissing bottom-left edge */}
      <div className="product-margin-branch product-margin-branch--bottom-left pointer-events-none">
        <div className="product-margin-organism product-margin-organism--bottom-left">
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none" 
            viewBox="0 0 110 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M -15 105 C 15 95, 42 75, 52 40"
              stroke="#1C4228"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.75"
            />
          </svg>
          <img
            src="/images/botanical/branch-foliage.png"
            alt=""
            className="w-20 h-24 object-contain opacity-42 transform -rotate-38 translate-x-[-10px] translate-y-[8px] filter blur-[0.5px]"
          />
        </div>
      </div>

      {/* Bottom-Right (🌿): Minimal whisper-soft foliage fragment, asymmetric to left */}
      <div className="product-margin-branch product-margin-branch--bottom-right pointer-events-none">
        <div className="product-margin-organism product-margin-organism--bottom-right">
          <svg 
            className="absolute top-0 right-0 w-full h-full pointer-events-none" 
            viewBox="0 0 95 105" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 105 95 C 75 85, 50 65, 40 35"
              stroke="#224C30"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.68"
            />
          </svg>
          <img
            src="/images/botanical/branch-foliage.png"
            alt=""
            className="w-16 h-20 object-contain opacity-32 transform scale-x-[-1] rotate-28 translate-x-[10px] translate-y-[6px] filter blur-[0.8px]"
          />
        </div>
      </div>

    </div>
  );
}
