'use client';

import React from 'react';

interface SkeletonCardProps {
  variant?: 'product' | 'table-row' | 'stat';
}

export function SkeletonCard({ variant = 'product' }: SkeletonCardProps) {
  if (variant === 'table-row') {
    return (
      <div className="flex items-center gap-4 px-4 py-3 border-b border-slate-100 animate-pulse">
        <div className="w-8 h-4 bg-slate-200 rounded" />
        <div className="flex-1 h-4 bg-slate-200 rounded" />
        <div className="w-24 h-4 bg-slate-200 rounded" />
        <div className="w-16 h-4 bg-slate-200 rounded" />
      </div>
    );
  }

  if (variant === 'stat') {
    return (
      <div className="bg-white border border-slate-200/60 rounded-2xl p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-24 h-3 bg-slate-200 rounded" />
          <div className="w-9 h-9 bg-slate-200 rounded-xl" />
        </div>
        <div className="w-20 h-7 bg-slate-200 rounded mb-2" />
        <div className="w-32 h-3 bg-slate-100 rounded" />
      </div>
    );
  }

  // Default: product card skeleton
  return (
    <div className="bg-[#FAF8F0]/90 rounded-[22px] border border-[rgba(37,73,54,0.10)] overflow-hidden shadow-xs animate-pulse flex flex-col h-full">
      {/* Image placeholder */}
      <div className="w-full aspect-square bg-[#F4F1EA] rounded-t-[21px] relative flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer" />
        <div className="w-16 h-16 rounded-full bg-slate-200/40" />
      </div>

      {/* Content placeholder */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Category Label */}
        <div className="w-24 h-2.5 bg-slate-200/80 rounded-[4px] mb-2" />
        
        {/* Title (fixed 2-line height matching ProductCard) */}
        <div className="h-[2.85rem] sm:h-[3.1rem] space-y-1.5 mb-1.5 flex flex-col justify-start">
          <div className="w-full h-3.5 bg-slate-200/80 rounded" />
          <div className="w-2/3 h-3.5 bg-slate-100 rounded" />
        </div>

        {/* Stars */}
        <div className="w-24 h-3 bg-slate-100 rounded mb-2" />

        {/* Clean Separator */}
        <div className="w-full border-t border-[rgba(37,73,54,0.10)] my-2" />

        {/* Price */}
        <div className="mb-3.5 space-y-1 min-h-[44px] flex flex-col justify-center">
          <div className="w-24 h-5 bg-slate-200/90 rounded" />
          <div className="w-16 h-2 bg-slate-100 rounded" />
        </div>

        {/* Bottom Actions Row (40px height, rounded-xl) */}
        <div className="mt-auto pt-1 flex items-center gap-1.5 w-full">
          <div className="flex-1 h-[40px] bg-slate-200/70 rounded-xl" />
          <div className="flex-1 h-[40px] bg-slate-200/50 rounded-xl" />
          <div className="w-[40px] h-[40px] shrink-0 bg-slate-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant="product" />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-3 bg-slate-200 rounded flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonCard key={i} variant="table-row" />
      ))}
    </div>
  );
}

export default SkeletonCard;
