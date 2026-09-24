'use client';

import React, { useState, useEffect } from 'react';

interface CatalogBotanicalFrameProps {
  className?: string;
}

export default function CatalogBotanicalFrame({ className = '' }: CatalogBotanicalFrameProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
      className={`catalog-botanical-frame absolute inset-0 pointer-events-none z-0 overflow-hidden ${
        prefersReducedMotion ? 'is-reduced-motion' : ''
      } ${className}`}
      aria-hidden="true"
    >
      {/* =====================================================================
          LAYER 0: EDITORIAL BOTANICAL ATMOSPHERE (FIXED VIEWPORT)
          Warm ivory / soft sage / sunlight background with gentle depth of field.
          ===================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Soft Warm Ivory & Natural Sage Base */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #FAF8F2 0%, #F5F7F1 30%, #FAF9F4 65%, #F4F6F0 100%)',
          }}
        />

        {/* Ambient Sage & Warm Sunlight Mists */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 45% at 5% 15%, rgba(200, 224, 206, 0.45) 0%, transparent 65%),
              radial-gradient(ellipse 55% 45% at 95% 45%, rgba(215, 232, 218, 0.40) 0%, transparent 60%),
              radial-gradient(circle at 50% 6%, rgba(255, 250, 235, 0.70) 0%, transparent 55%),
              radial-gradient(circle at 15% 80%, rgba(210, 228, 214, 0.35) 0%, transparent 60%),
              radial-gradient(circle at 85% 90%, rgba(245, 238, 220, 0.40) 0%, transparent 55%)
            `,
          }}
        />

        {/* Realistic Gentle Garden Bokeh (Depth of Field) */}
        <div 
          className="absolute inset-0 opacity-[0.07] mix-blend-multiply filter blur-[3px] scale-105 pointer-events-none"
          style={{
            backgroundImage: "url('/images/botanical/garden-bokeh-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
          }}
        />

        {/* Warm Morning Sunlight Glow Pool (Upper-Left) */}
        <div 
          className="absolute -top-20 -left-20 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255, 248, 225, 0.90) 0%, rgba(248, 238, 205, 0.40) 50%, transparent 75%)',
            filter: 'blur(36px)',
          }}
        />

        {/* Soft Golden Sunlight Pool (Upper-Right) */}
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 65% 35%, rgba(255, 248, 225, 0.75) 0%, rgba(240, 235, 210, 0.30) 45%, transparent 70%)',
            filter: 'blur(36px)',
          }}
        />

        {/* Subtle Ambient Sunlight Motes */}
        {!prefersReducedMotion && (
          <>
            <div className="absolute top-[18%] left-[4%] w-2 h-2 rounded-full bg-[#EADCC2]/50 blur-[1px] animate-mote" style={{ animationDelay: '0s' }} />
            <div className="absolute top-[42%] left-[2%] w-1.5 h-1.5 rounded-full bg-[#E2E8D8]/60 blur-[1px] animate-mote" style={{ animationDelay: '2.5s' }} />
            <div className="absolute top-[28%] right-[4%] w-2 h-2 rounded-full bg-[#EADCC2]/50 blur-[1px] animate-mote" style={{ animationDelay: '4s' }} />
            <div className="absolute top-[65%] right-[3%] w-1.5 h-1.5 rounded-full bg-[#E2E8D8]/60 blur-[1px] animate-mote" style={{ animationDelay: '1.2s' }} />
          </>
        )}
      </div>

      {/* =====================================================================
          LAYER 1: TOP BOTANICAL CANOPY FRAMING
          Soft leaves entering gently at the top corners outside content area.
          ===================================================================== */}
      <div className="fixed top-0 left-0 right-0 h-24 pointer-events-none z-0 hidden md:block">
        {/* Top-Left Foliage Arc */}
        <div className="absolute -top-6 -left-8 w-48 h-32 opacity-75 transition-transform duration-700">
          <img
            src="/images/botanical/branch-foliage.png"
            alt=""
            className="w-full h-full object-contain rotate-[35deg] filter drop-shadow-[0_8px_16px_rgba(20,45,28,0.08)]"
          />
        </div>

        {/* Top-Right Flowering Arc */}
        <div className="absolute -top-8 -right-8 w-48 h-32 opacity-75 transition-transform duration-700">
          <img
            src="/images/botanical/white-branch.png"
            alt=""
            className="w-full h-full object-contain -scale-x-100 -rotate-[30deg] filter drop-shadow-[0_8px_16px_rgba(20,45,28,0.08)]"
          />
        </div>
      </div>

      {/* =====================================================================
          LAYER 2: LEFT EDGE BOTANICAL FRAMING
          Curved photographic branch entering naturally from the left viewport edge,
          accompanied by blooming star jasmine flowers and editorial quotes.
          Anchored outside the 1280px central shop layout.
          ===================================================================== */}
      <div 
        className="fixed left-0 top-0 bottom-0 w-[min(18vw,230px)] pointer-events-none z-0 hidden lg:flex flex-col justify-between py-10 pl-0"
        style={{
          maskImage: 'linear-gradient(to right, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)',
        }}
      >
        {/* Upper Left Curved Branch with Delicate Star Jasmine Flower */}
        <div className="relative w-full h-[360px] transition-transform duration-700">
          <div className="animate-botanical-left w-full h-full relative">
            {/* Photographic flowering branch curving in */}
            <img
              src="/images/botanical/white-branch.png"
              alt=""
              className="absolute -left-10 top-0 w-[230px] h-[340px] object-contain opacity-90 filter drop-shadow-[0_12px_24px_rgba(20,45,28,0.10)]"
            />
            
            {/* Realistic Star Jasmine Flower Accent */}
            <div className="absolute top-[52px] left-[78px] w-[42px] h-[42px] pointer-events-none opacity-95">
              <img
                src="/images/botanical/white-jasmine-flower.png"
                alt=""
                className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(20,40,25,0.15)] sepia-[0.06]"
              />
            </div>

            {/* Jasmine Bud Accent */}
            <div className="absolute top-[135px] left-[55px] w-[18px] h-[38px] pointer-events-none opacity-85 rotate-12">
              <img
                src="/images/botanical/white-jasmine-bud.png"
                alt=""
                className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(20,40,25,0.10)]"
              />
            </div>
          </div>
        </div>

        {/* Editorial Margin Monogram & Botanical Quote */}
        <div className="pl-5 py-2 select-none">
          <div className="w-5 h-[1px] bg-[#9C6D38]/50 mb-2" />
          <p className="font-serif italic text-xs sm:text-[13px] text-[#5F7C5D] leading-snug tracking-wide opacity-85">
            Nature&apos;s<br />
            finest extracts<br />
            for a better tomorrow.
          </p>
        </div>

        {/* Mid-Left Drifting Jasmine Petal */}
        {!prefersReducedMotion && (
          <div className="relative h-24 w-full pl-8 pointer-events-none overflow-hidden">
            <img
              src="/images/botanical/falling-petal.png"
              alt=""
              className="w-5 h-5 object-contain opacity-75 animate-petal-slow"
              style={{ animationDelay: '1s' }}
            />
          </div>
        )}

        {/* Lower Left Foliage Branch */}
        <div className="relative w-full h-[260px]">
          <div className="animate-botanical-left w-full h-full relative" style={{ animationDelay: '3.5s' }}>
            <img
              src="/images/botanical/branch-foliage.png"
              alt=""
              className="absolute -left-12 bottom-2 w-[210px] h-[260px] object-contain opacity-75 filter drop-shadow-[0_10px_20px_rgba(20,45,28,0.08)]"
            />
          </div>
        </div>

        {/* Bottom Left Editorial Text (Matching Reference Image) */}
        <div className="pl-6 pb-6 select-none opacity-80">
          <p className="font-serif italic text-xs sm:text-[13px] text-[#5F7C5D] leading-snug tracking-wide">
            Plants<br />
            People<br />
            A Healthier<br />
            Tomorrow.
          </p>
          <div className="w-6 h-[1px] bg-[#9C6D38]/60 mt-2" />
        </div>
      </div>

      {/* =====================================================================
          LAYER 3: RIGHT EDGE BOTANICAL FRAMING
          Curved leafy branch + floral rose/jasmine blossoms entering from the right edge.
          Anchored outside the 1280px central shop layout.
          ===================================================================== */}
      <div 
        className="fixed right-0 top-0 bottom-0 w-[min(18vw,230px)] pointer-events-none z-0 hidden lg:flex flex-col justify-between py-10 pr-0 items-end"
        style={{
          maskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
        }}
      >
        {/* Top-Right Editorial Text (Matching Reference Section 8) */}
        <div className="pr-6 pt-3 select-none text-right">
          <div className="w-5 h-[1px] bg-[#9C6D38]/50 ml-auto mb-2" />
          <p className="font-serif text-xs sm:text-[13px] text-[#5F7C5D] leading-snug tracking-wide opacity-85">
            Real<br />
            Botanicals<br />
            <span className="font-sans font-bold text-[10px] tracking-wider text-[#9C6D38] uppercase">Real Impact</span>
          </p>
        </div>

        {/* Upper Right Foliage Branch with Rose & Jasmine Blossoms */}
        <div className="relative w-full h-[360px]">
          <div className="animate-botanical-right w-full h-full relative">
            <img
              src="/images/botanical/branch-foliage.png"
              alt=""
              className="absolute -right-12 top-0 w-[230px] h-[340px] -scale-x-100 object-contain opacity-85 filter drop-shadow-[0_12px_24px_rgba(20,45,28,0.10)]"
            />

            {/* Delicate Botanical Rose Blossom Accent */}
            <div className="absolute top-[65px] right-[70px] w-[46px] h-[46px] pointer-events-none opacity-90">
              <img
                src="/images/botanical/flower-full.png"
                alt=""
                className="w-full h-full object-contain filter drop-shadow-[0_6px_14px_rgba(205,80,110,0.20)]"
              />
            </div>

            {/* Jasmine Star Accent on Leaf Branch */}
            <div className="absolute top-[170px] right-[45px] w-[30px] h-[30px] pointer-events-none opacity-85">
              <img
                src="/images/botanical/white-jasmine-flower.png"
                alt=""
                className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(20,40,25,0.12)]"
              />
            </div>
          </div>
        </div>

        {/* Mid-Right Drifting Jasmine Petal */}
        {!prefersReducedMotion && (
          <div className="relative h-24 w-full pr-8 pointer-events-none overflow-hidden flex justify-end">
            <img
              src="/images/botanical/falling-petal.png"
              alt=""
              className="w-4 h-4 object-contain opacity-70 animate-petal-slow -scale-x-100"
              style={{ animationDelay: '3s' }}
            />
          </div>
        )}

        {/* Lower Right Leaf Branch */}
        <div className="relative w-full h-[260px]">
          <div className="animate-botanical-right w-full h-full relative" style={{ animationDelay: '4.5s' }}>
            <img
              src="/images/botanical/white-branch.png"
              alt=""
              className="absolute -right-12 bottom-2 w-[210px] h-[260px] -scale-x-100 object-contain opacity-75 filter drop-shadow-[0_10px_20px_rgba(20,45,28,0.08)]"
            />
          </div>
        </div>

        {/* Lower Right Side Editorial Text (Matching Reference Section 8) */}
        <div className="pr-6 pb-4 select-none text-right opacity-85">
          <p className="font-serif text-xs sm:text-[13px] text-[#5F7C5D] leading-snug tracking-wide">
            From<br />
            Botanicals<br />
            to a<br />
            <span className="italic font-serif text-[#102C20]">Brighter</span><br />
            Tomorrow.
          </p>
          <div className="w-5 h-[1px] bg-[#9C6D38]/50 ml-auto mt-2" />
        </div>
      </div>

      {/* =====================================================================
          LAYER 4: BOTTOM CORNERS LOOSE LEAVES & PETALS
          Resting gently at bottom edge.
          ===================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 h-16 pointer-events-none z-0 hidden sm:block">
        {/* Bottom Left Loose Petal */}
        <div className="absolute bottom-2 left-16 w-8 h-8 opacity-50 rotate-45">
          <img
            src="/images/botanical/falling-petal.png"
            alt=""
            className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(20,45,28,0.08)]"
          />
        </div>

        {/* Bottom Right Loose Petal */}
        <div className="absolute bottom-2 right-16 w-7 h-7 opacity-45 -rotate-12">
          <img
            src="/images/botanical/falling-petal.png"
            alt=""
            className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(20,45,28,0.08)]"
          />
        </div>
      </div>
    </div>
  );
}
