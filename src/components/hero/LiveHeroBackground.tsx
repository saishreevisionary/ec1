'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface LiveHeroBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function LiveHeroBackground({ children, className = '' }: LiveHeroBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPointerActive, setIsPointerActive] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const pointerPosRef = useRef({ x: 50, y: 50 }); // percentage coords

  // Detect prefers-reduced-motion
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

  // Pointer movement tracking inside hero container with requestAnimationFrame
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only track on fine pointer (mouse / trackpad), not on touch
    if (e.pointerType === 'touch' || prefersReducedMotion) {
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate normalized percentage (0% to 100%)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    pointerPosRef.current = {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };

    if (!isPointerActive) {
      setIsPointerActive(true);
    }

    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.setProperty('--pointer-x', `${pointerPosRef.current.x}%`);
          containerRef.current.style.setProperty('--pointer-y', `${pointerPosRef.current.y}%`);
        }
        rafIdRef.current = null;
      });
    }
  }, [prefersReducedMotion, isPointerActive]);

  const handlePointerLeave = useCallback(() => {
    setIsPointerActive(false);
    if (containerRef.current) {
      containerRef.current.style.setProperty('--pointer-x', '50%');
      containerRef.current.style.setProperty('--pointer-y', '50%');
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const effectivelyPaused = prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={{
        '--pointer-x': '50%',
        '--pointer-y': '50%',
      } as React.CSSProperties}
    >
      {/* ============================================================ */}
      {/* LAYER 1: Base Botanical Gradients & Wave Ribbons */}
      {/* ============================================================ */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          effectivelyPaused ? 'venuss-paused' : ''
        }`}
        aria-hidden="true"
      >
        {/* Foundation: rich deep botanical sage-forest base */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#E3EBE4] via-[#DCE6DE] to-[#D5E1D8]"
        />

        {/* Dynamic Wave 1: Translucent royal-green / forest ribbon */}
        <div 
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] opacity-35 mix-blend-multiply venuss-wave-1 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
          style={{
            background: 'radial-gradient(ellipse at 30% 40%, rgba(35, 78, 58, 0.45) 0%, rgba(23, 63, 44, 0.15) 50%, transparent 75%)',
          }}
        />

        {/* Dynamic Wave 2: Translucent botanical teal / sage ribbon */}
        <div 
          className="absolute -bottom-1/3 -right-1/4 w-[140%] h-[140%] opacity-30 mix-blend-multiply venuss-wave-2 rounded-[60%_40%_30%_70%/50%_60%_40%_50%]"
          style={{
            background: 'radial-gradient(ellipse at 70% 60%, rgba(93, 170, 187, 0.35) 0%, rgba(107, 118, 80, 0.20) 45%, transparent 70%)',
          }}
        />

        {/* Dynamic Wave 3: Subtle soft warm gold / amber undertone */}
        <div 
          className="absolute top-1/4 right-1/4 w-[100%] h-[100%] opacity-20 mix-blend-color-burn venuss-wave-3 rounded-full"
          style={{
            background: 'radial-gradient(circle at 60% 30%, rgba(199, 144, 74, 0.30) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 2: Ambient Organic Light Blobs (Slow Pulse & Drift) */}
      {/* ============================================================ */}
      <div 
        className={`absolute inset-0 pointer-events-none overflow-hidden ${
          effectivelyPaused ? 'venuss-paused' : ''
        }`}
        aria-hidden="true"
      >
        {/* Soft Organic Blob 1 (Deep Forest / Royal Green) */}
        <div 
          className="absolute top-[-10%] right-[5%] w-96 h-96 rounded-full bg-[#234E3A]/20 blur-3xl venuss-blob-1"
        />

        {/* Soft Organic Blob 2 (Botanical Teal / Sage) */}
        <div 
          className="absolute bottom-[-15%] left-[-5%] w-80 h-80 rounded-full bg-[#5DAABB]/18 blur-3xl venuss-blob-2"
        />

        {/* Soft Organic Blob 3 (Warm Ivory / Gold Sheen) */}
        <div 
          className="absolute top-[35%] left-[25%] w-72 h-72 rounded-full bg-[#C7904A]/12 blur-3xl venuss-blob-3 hidden sm:block"
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 3: Subtle Tactile Grain/Noise Texture */}
      {/* ============================================================ */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.032] mix-blend-overlay z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* LAYER 4: Branded Venuss Botanical Leaf Silhouettes & Particles */}
      {/* ============================================================ */}
      <div 
        className={`absolute inset-0 pointer-events-none overflow-hidden z-[2] ${
          effectivelyPaused ? 'venuss-paused' : ''
        }`}
        aria-hidden="true"
      >
        {/* Leaf Silhouette Top Left (Fixed slow swaying) */}
        <svg 
          viewBox="0 0 100 100" 
          className="absolute -top-4 -left-4 w-32 h-32 text-[#234E3A]/12 venuss-leaf-sway-1 hidden sm:block"
          fill="currentColor"
        >
          <path d="M50 5 C25 25 15 55 25 85 C40 85 70 75 85 50 C95 25 75 10 50 5 Z M50 5 C45 40 40 65 25 85" stroke="currentColor" strokeWidth="1.5" fillOpacity="0.6" />
        </svg>

        {/* Leaf Silhouette Bottom Right (Behind product image) */}
        <svg 
          viewBox="0 0 100 100" 
          className="absolute -bottom-6 right-20 w-44 h-44 text-[#6B7650]/10 venuss-leaf-sway-2"
          fill="currentColor"
        >
          <path d="M15 85 C35 70 45 40 35 15 C55 15 75 35 85 60 C90 85 65 90 15 85 Z M15 85 C40 60 55 45 35 15" stroke="currentColor" strokeWidth="1.5" fillOpacity="0.5" />
        </svg>

        {/* Floating Botanical Particle 1 (Gold/Amber pollen) */}
        <div 
          className="absolute top-[22%] left-[18%] w-2 h-2 rounded-full bg-[#C7904A]/30 blur-[0.5px] venuss-particle-1"
        />

        {/* Floating Botanical Particle 2 (Sage droplet) */}
        <div 
          className="absolute top-[65%] left-[12%] w-2.5 h-2.5 rounded-full bg-[#2E5E3E]/20 blur-[0.5px] venuss-particle-2"
        />

        {/* Floating Botanical Particle 3 (Teal extract spark) */}
        <div 
          className="absolute top-[30%] right-[32%] w-1.5 h-1.5 rounded-full bg-[#5DAABB]/35 blur-[0.5px] venuss-particle-3 hidden sm:block"
        />

        {/* Floating Botanical Particle 4 (Warm gold micro-pollen) */}
        <div 
          className="absolute top-[75%] right-[22%] w-2 h-2 rounded-full bg-[#C7904A]/25 blur-[0.5px] venuss-particle-4 hidden md:block"
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 5: Slow Moving Venuss Botanical Leaf (Left to Right) */}
      {/* ============================================================ */}
      <div 
        className={`absolute inset-0 pointer-events-none overflow-hidden z-[2] ${
          effectivelyPaused ? 'venuss-paused' : ''
        }`}
        aria-hidden="true"
      >
        <div className="venuss-traveling-leaf-track">
          <div className="venuss-traveling-leaf-wrapper">
            <svg 
              viewBox="0 0 40 40" 
              className="w-7 h-7 text-[#234E3A]/28 drop-shadow-sm"
              fill="currentColor"
            >
              {/* Detailed organic leaf with central vein & lateral ribs */}
              <path d="M20 3 C10 12 6 24 10 35 C16 35 28 31 34 20 C38 10 30 4 20 3 Z" fillOpacity="0.85" />
              <path d="M20 3 Q 16 18 10 35" stroke="#F7F4EC" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
              <path d="M17 14 Q 12 17 10 20" stroke="#F7F4EC" strokeWidth="0.75" strokeLinecap="round" fill="none" opacity="0.4" />
              <path d="M18 20 Q 23 23 27 24" stroke="#F7F4EC" strokeWidth="0.75" strokeLinecap="round" fill="none" opacity="0.4" />
              <path d="M15 25 Q 11 27 10 30" stroke="#F7F4EC" strokeWidth="0.75" strokeLinecap="round" fill="none" opacity="0.4" />
            </svg>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LAYER 6: Subtle Mouse-Following Glow (Desktop Only) */}
      {/* ============================================================ */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-[3] hidden md:block ${
          isPointerActive && !effectivelyPaused ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle 280px at var(--pointer-x) var(--pointer-y), rgba(93, 170, 187, 0.14) 0%, rgba(199, 144, 74, 0.08) 40%, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* HERO CONTENT: High Contrast, High Legibility, Stacked Above */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
