'use client';

import React from 'react';

interface CatalogBotanicalFrameProps {
  className?: string;
}

export default function CatalogBotanicalFrame({ className = '' }: CatalogBotanicalFrameProps) {
  return (
    <div
      className={`catalog-botanical-frame absolute inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* =====================================================================
          BASE WARM IVORY & SUBTLE SAGE AMBIENCE (#F7F4EA & #DCE5D5)
          ===================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#F7F4EA]">
        {/* Soft Muted Sage Atmospheric Vignette in Outer Corners */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 40% 35% at 0% 10%, rgba(220, 229, 213, 0.70) 0%, transparent 70%),
              radial-gradient(ellipse 40% 35% at 100% 30%, rgba(220, 229, 213, 0.65) 0%, transparent 70%),
              radial-gradient(ellipse 35% 35% at 0% 85%, rgba(220, 229, 213, 0.50) 0%, transparent 70%),
              radial-gradient(ellipse 35% 35% at 100% 90%, rgba(220, 229, 213, 0.50) 0%, transparent 70%)
            `,
          }}
        />
      </div>

      {/* =====================================================================
          SUBTLE OUTER MARGIN BOTANICAL BRANCHES
          Docked to the viewport edge only on wide displays (>= 1536px)
          so they never encroach on the 1440px catalogue layout.
          ===================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden 2xl:block overflow-hidden">
        {/* Top-Left Outer Edge Branch */}
        <div className="absolute top-8 -left-6 w-36 h-48 opacity-35 filter blur-[0.4px]">
          <img
            src="/images/botanical/branch-foliage.png"
            alt=""
            className="w-full h-full object-contain rotate-12"
          />
        </div>

        {/* Top-Right Outer Edge White Floral Branch */}
        <div className="absolute top-12 -right-8 w-40 h-52 opacity-35 filter blur-[0.4px]">
          <img
            src="/images/botanical/white-branch.png"
            alt=""
            className="w-full h-full object-contain -scale-x-100 -rotate-12"
          />
        </div>

        {/* Lower Left Outer Margin Foliage */}
        <div className="absolute bottom-16 -left-8 w-36 h-44 opacity-30 filter blur-[0.5px]">
          <img
            src="/images/botanical/branch-foliage.png"
            alt=""
            className="w-full h-full object-contain -rotate-45"
          />
        </div>

        {/* Lower Right Outer Margin Floral Accent */}
        <div className="absolute bottom-20 -right-8 w-36 h-44 opacity-30 filter blur-[0.5px]">
          <img
            src="/images/botanical/white-branch.png"
            alt=""
            className="w-full h-full object-contain -scale-x-100 rotate-12"
          />
        </div>
      </div>
    </div>
  );
}
