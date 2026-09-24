'use client';

import React, { useState, useEffect, useRef } from 'react';

interface NewsletterBotanicalFrameProps {
  className?: string;
}

export default function NewsletterBotanicalFrame({ className = '' }: NewsletterBotanicalFrameProps) {
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
      className={`newsletter-botanical-frame absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full pointer-events-none z-[1] overflow-hidden ${
        prefersReducedMotion ? 'is-reduced-motion' : ''
      } ${className}`}
      aria-hidden="true"
    >
      {/* =====================================================================
          LEFT SCREEN MARGIN: DELICATE HERBAL / EUCALYPTUS BRANCH (🌿)
          Anchored strictly to the FAR-LEFT SCREEN BORDER (outer 0–8vw).
          Enters from outside the viewport. Leaves stay far from central card.
          ===================================================================== */}
      <div className="newsletter-margin-branch newsletter-margin-branch--left pointer-events-none">
        <div className="newsletter-margin-organism newsletter-margin-organism--left">
          
          {/* Natural Stem Vector entering from left screen edge */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none" 
            viewBox="0 0 150 300" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="newsLeftStemGrad" x1="0%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#1B4228" />
                <stop offset="50%" stopColor="#2A5C39" />
                <stop offset="100%" stopColor="#437E56" />
              </linearGradient>
            </defs>
            {/* Natural curve entering from outside left viewport */}
            <path
              d="M -20 20 C 35 40, 75 95, 82 165 C 88 215, 68 255, 42 290"
              stroke="url(#newsLeftStemGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.88"
            />
            {/* Delicate lateral shoot */}
            <path d="M 60 95 C 80 85, 95 72, 102 58" stroke="#2A5C39" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
          </svg>

          {/* Connected Green Foliage */}
          <div className="absolute top-[20px] left-[5px] w-[85%] h-[80%] pointer-events-none">
            <img
              src="/images/botanical/branch-foliage.png"
              alt=""
              className="w-full h-full object-contain opacity-80 transform -rotate-20 filter drop-shadow-[0_8px_16px_rgba(20,50,30,0.12)]"
            />
          </div>

        </div>
      </div>

      {/* =====================================================================
          RIGHT SCREEN MARGIN: FLOWERING ROSEBUD ACCENT BRANCH (🌸)
          Anchored strictly to the FAR-RIGHT SCREEN BORDER (outer 0–8vw).
          Enters from outside the viewport. Features small rosebud and leaves.
          ===================================================================== */}
      <div className="newsletter-margin-branch newsletter-margin-branch--right pointer-events-none">
        <div className="newsletter-margin-organism newsletter-margin-organism--right">
          
          {/* Natural Stem Vector entering from right screen edge */}
          <svg 
            className="absolute top-0 right-0 w-full h-full pointer-events-none" 
            viewBox="0 0 160 320" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="newsRightStemGrad" x1="100%" y1="0%" x2="20%" y2="100%">
                <stop offset="0%" stopColor="#1B4228" />
                <stop offset="50%" stopColor="#2A5C39" />
                <stop offset="100%" stopColor="#4D865F" />
              </linearGradient>
            </defs>
            <path
              d="M 180 15 C 130 35, 85 90, 78 160 C 72 215, 92 260, 115 305"
              stroke="url(#newsRightStemGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.88"
            />
            {/* Lateral petiole for bud */}
            <path d="M 95 125 C 75 115, 60 100, 52 85" stroke="#2A5C39" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
          </svg>

          {/* Connected Foliage */}
          <div className="absolute top-[25px] right-[5px] w-[88%] h-[82%] pointer-events-none">
            <img
              src="/images/botanical/branch-foliage.png"
              alt=""
              className="w-full h-full object-contain opacity-85 transform scale-x-[-1] rotate-20 filter drop-shadow-[0_8px_16px_rgba(20,50,30,0.12)]"
            />
          </div>

          {/* Tender Rosebud Accent in Right Margin */}
          <div className="absolute top-[68px] right-[32px] w-[34px] h-[34px] pointer-events-none">
            <img
              src="/images/botanical/flower-bud.png"
              alt=""
              className="w-full h-full object-contain transform rotate-25 filter drop-shadow-[0_4px_12px_rgba(215,90,120,0.25)]"
            />
          </div>

          {/* Delicate Detached Falling Petal in Margin Drift */}
          <div className="newsletter-falling-petal">
            <img
              src="/images/botanical/falling-petal.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

        </div>
      </div>

    </div>
  );
}
