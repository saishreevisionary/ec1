'use client';

import React from 'react';
import { Award, ShieldCheck, Truck, Headphones, Leaf } from 'lucide-react';

interface TrustItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    id: 'est-1986',
    title: 'EST. 1986',
    description: '40+ years extraction expertise',
    icon: Award,
  },
  {
    id: 'iso-haccp',
    title: 'ISO & HACCP CERTIFIED',
    description: 'Rigorous quality control lab',
    icon: ShieldCheck,
  },
  {
    id: 'logistics',
    title: 'GLOBAL LOGISTICS',
    description: 'Worldwide air & sea freight',
    icon: Truck,
  },
  {
    id: 'support',
    title: 'DIRECT SALES SUPPORT',
    description: 'Custom quotes & COA certificates',
    icon: Headphones,
  },
];

interface TrustValueCardProps {
  className?: string;
}

export const TrustValueCard: React.FC<TrustValueCardProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] bg-[#FAF8F0]/95 backdrop-blur-xs border border-[rgba(37,73,54,0.12)] p-6 sm:p-7 shadow-[0_4px_24px_rgba(16,44,32,0.04)] hover:shadow-[0_8px_32px_rgba(16,44,32,0.07)] transition-all duration-400 ease-out flex flex-col justify-between ${className}`}
    >
      {/* Decorative Botanical Watermark (Low opacity background detail) */}
      <svg
        className="absolute -bottom-6 -right-6 w-36 h-36 pointer-events-none opacity-[0.045] text-[#254936] select-none"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M50 12 C60 28, 75 32, 88 45 C75 58, 62 70, 50 88 C38 70, 25 58, 12 45 C25 32, 40 28, 50 12 Z" />
        <path d="M50 12 Q 50 50 50 88" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M50 35 Q 65 32 75 38" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M50 50 Q 68 48 78 56" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M50 35 Q 35 32 25 38" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M50 50 Q 32 48 22 56" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>

      {/* 1. Header / Introduction */}
      <div className="relative z-10 mb-5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-5 h-5 rounded-full bg-[#254936]/10 flex items-center justify-center shrink-0">
            <Leaf className="w-3 h-3 text-[#254936] stroke-[2.2]" />
          </div>
          <h3 className="font-serif text-[13.5px] sm:text-[14px] font-bold tracking-[0.14em] uppercase text-[#102C20]">
            Why Venuss
          </h3>
        </div>
        <p className="text-[11.5px] text-[#5F7C5D] font-normal leading-relaxed pl-6.5">
          Built on precision, quality &amp; global trust.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-[rgba(37,73,54,0.10)] mb-3" />

      {/* 2. Four Trust Items (Editorial layout with micro-interactions) */}
      <div className="relative z-10 space-y-1 flex-1 flex flex-col justify-around">
        {TRUST_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <React.Fragment key={item.id}>
              <div className="group/item flex items-start gap-3.5 p-2 rounded-xl transition-all duration-300 ease-out hover:bg-[rgba(37,73,54,0.035)] cursor-default">
                {/* Icon Container: Small rounded-square with subtle ivory/cream surface, thin border & lift */}
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-[rgba(37,73,54,0.12)] flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 ease-out group-hover/item:-translate-y-0.5 group-hover/item:border-[#254936]/30 group-hover/item:bg-[#FAF8F0]">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#254936] transition-transform duration-300 ease-out group-hover/item:scale-105" />
                  {/* Subtle warm gold micro-accent dot on icon container */}
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#B98255]/70 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <h4 className="text-[11.5px] sm:text-xs font-semibold tracking-wider text-[#102C20] uppercase transition-colors duration-300 group-hover/item:text-[#254936] truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10.5px] sm:text-[11px] text-[#5F7C5D] font-normal leading-tight mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Thin separator between items (except last) */}
              {index < TRUST_ITEMS.length - 1 && (
                <div className="w-full border-t border-[rgba(37,73,54,0.07)] my-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-full border-t border-[rgba(37,73,54,0.10)] mt-4 mb-3.5" />

      {/* 3. Premium Brand Signature */}
      <div className="relative z-10 flex items-center justify-center gap-2 text-[9px] sm:text-[9.5px] font-bold tracking-[0.22em] text-[#5F7C5D]/80 uppercase select-none">
        <span>TRUSTED</span>
        <span className="w-1 h-1 rounded-full bg-[#B98255]" />
        <span>PRECISE</span>
        <span className="w-1 h-1 rounded-full bg-[#B98255]" />
        <span>GLOBAL</span>
      </div>
    </div>
  );
};

export default TrustValueCard;
