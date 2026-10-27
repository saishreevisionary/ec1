'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ShopEditorialSectionsProps {
  onSelectCategory?: (slug: string) => void;
  onSearchQuery?: (q: string) => void;
}

export const CATEGORY_TILES = [
  {
    title: 'SINGLE ESSENTIAL OILS',
    slug: 'essential-oils',
    query: 'Single Pure',
    image: '/images/editorial/tile-single-oil.jpg',
    description: '100% steam distilled single plant essences',
  },
  {
    title: 'ORGANIC ESSENTIAL OILS',
    slug: 'essential-oils',
    query: 'Organic',
    image: '/images/editorial/tile-organic-oil.jpg',
    description: 'Certified organic wild-harvested botanicals',
  },
  {
    title: 'BLEND ESSENTIAL OILS',
    slug: 'essential-oils',
    query: 'Blend',
    image: '/images/editorial/tile-blend-oil.jpg',
    description: 'Masterfully formulated therapeutic synergy blends',
  },
  {
    title: 'CARRIER OILS',
    slug: 'spice-oils',
    query: 'Pure Carrier',
    image: '/images/editorial/tile-carrier-oil.jpg',
    description: 'Cold-pressed virgin plant carrier oils',
  },
  {
    title: 'MASSAGE OILS',
    slug: 'spice-oils',
    query: 'Massage Oil',
    image: '/images/editorial/tile-massage-oil.jpg',
    description: 'Deeply rejuvenating herbal massage infusions',
  },
  {
    title: 'SERUMS',
    slug: 'floral-absolutes',
    query: 'Serum',
    image: '/images/editorial/tile-serum.jpg',
    description: 'Potent botanical botanical nectar & active elixirs',
  },
  {
    title: 'HYDROSOLS',
    slug: 'floral-concretes',
    query: 'Hydrosol Floral Water',
    image: '/images/editorial/tile-hydrosol.jpg',
    description: 'Pure floral waters from artisan distillation',
  },
  {
    title: 'ROLL-ONS',
    slug: 'spice-powders',
    query: 'Roll-on',
    image: '/images/editorial/tile-rollon.jpg',
    description: 'Pocket-sized pulse point aromatherapy roll-ons',
  },
];

export default function ShopEditorialSections({
  onSelectCategory,
  onSearchQuery,
}: ShopEditorialSectionsProps) {
  const handleTileClick = (tile: typeof CATEGORY_TILES[0]) => {
    if (onSelectCategory) {
      onSelectCategory(tile.slug);
    }
    const catalogEl = document.getElementById('catalog-listing-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBundlesClick = () => {
    if (onSearchQuery) {
      onSearchQuery('Bundle');
    }
    const catalogEl = document.getElementById('catalog-listing-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLifestyleClick = (keyword: string) => {
    if (onSearchQuery) {
      onSearchQuery(keyword);
    }
    const catalogEl = document.getElementById('catalog-listing-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full space-y-12 sm:space-y-16 my-8">
      {/* ─────────────────────────────────────────────────────────────
          1. EIGHT-TILE CATEGORY SHOWCASE (Exact Match to Reference 2)
          ───────────────────────────────────────────────────────────── */}
      <section aria-label="Aromatherapy Product Categories" className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
          {CATEGORY_TILES.map((tile) => (
            <button
              key={tile.title}
              type="button"
              onClick={() => handleTileClick(tile)}
              className="group relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#102C20]/5 text-left transition-all duration-300 shadow-[0_4px_14px_rgba(16,44,32,0.06)] hover:shadow-[0_12px_28px_rgba(16,44,32,0.12)] cursor-pointer"
            >
              {/* Background Photography */}
              <img
                src={tile.image}
                alt={tile.title}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Gentle Dark Bottom Gradient for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

              {/* Top-Right Micro Indicator */}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Title matching the Editorial Reference */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 pointer-events-none">
                <h3 className="font-sans text-[11px] sm:text-[12.5px] lg:text-[13.5px] font-bold uppercase tracking-[0.14em] text-white leading-tight drop-shadow-sm">
                  {tile.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CURATED DUO BANNER: "TWO IS BETTER THAN ONE"
          ───────────────────────────────────────────────────────────── */}
      <section 
        aria-label="Curated Botanical Bundles" 
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#254936]/10 shadow-[0_8px_32px_rgba(16,44,32,0.08)] bg-[#282723]"
      >
        <div className="relative aspect-[16/9] sm:aspect-[21/9] md:h-[340px] lg:h-[380px] w-full flex items-center">
          {/* Banner Photography Background */}
          <img
            src="/images/editorial/curated-botanical-duo.jpg"
            alt="Two Curated Botanical Essential Oil Bottles on Minimalist Wood Console"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Dark Overlay for Balanced Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />

          {/* Banner Editorial Typography */}
          <div className="relative z-10 px-6 sm:px-10 md:px-14 lg:px-16 max-w-2xl text-left select-none">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-[#D4AF37] block mb-2">
              SYNERGISTIC BOTANICAL PAIRINGS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal uppercase tracking-[0.18em] text-[#FAF8F0] leading-tight">
              TWO IS BETTER THAN ONE
            </h2>
            <p className="text-xs sm:text-sm text-[#E2DACB] font-light tracking-wide mt-2 sm:mt-3 mb-5 sm:mb-6 max-w-lg leading-relaxed">
              Explore our curated duos for sweeter pampering moments. Masterfully paired to amplify holistic wellness and aroma.
            </p>
            <button
              type="button"
              onClick={handleBundlesClick}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white/60 hover:border-white text-[#FAF8F0] bg-black/25 hover:bg-black/45 backdrop-blur-xs text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
            >
              <span>SHOP BUNDLES</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. EVERYDAY NEEDS BENTO GRID (Exact Match to Reference 2)
          ───────────────────────────────────────────────────────────── */}
      <section aria-label="Everyday Botanical Needs" className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          
          {/* Left Large Bento Card: "MADE FROM NATURE HERSELF FOR YOUR EVERYDAY NEEDS." */}
          <div className="lg:col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex flex-col justify-end p-6 sm:p-8 md:p-10 shadow-[0_6px_24px_rgba(16,44,32,0.06)] group">
            {/* Background Photography (Lush turquoise pool oasis) */}
            <img
              src="/images/editorial/nature-oasis.jpg"
              alt="Lush Tropical Oasis Natural Pool"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
              loading="lazy"
            />
            {/* Dark Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 pointer-events-none" />

            {/* Editorial Content */}
            <div className="relative z-10 max-w-lg text-left select-none">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] font-bold uppercase tracking-tight text-[#FAF8F0] leading-tight drop-shadow-sm">
                MADE FROM NATURE HERSELF FOR YOUR EVERYDAY NEEDS.
              </h2>
              <p className="text-xs sm:text-[13.5px] text-[#FAF8F0]/90 font-light leading-relaxed mt-3 sm:mt-4 max-w-md drop-shadow-sm">
                We believe in making self care and self help accessible to everyone. And building a community fuelled by the knowledge of self help, so we can uplift our everydays.
              </p>
            </div>
          </div>

          {/* Right Bento Column: FOR HAIR, FOR RELAXATION, FOR CLARITY */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
            
            {/* Top Right Card: FOR HAIR */}
            <button
              type="button"
              onClick={() => handleLifestyleClick('Hair')}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden h-[210px] sm:h-[240px] w-full p-5 sm:p-6 flex flex-col justify-end text-left shadow-[0_4px_16px_rgba(16,44,32,0.06)] cursor-pointer"
            >
              <img
                src="/images/editorial/hair-botanical.jpg"
                alt="Radiant healthy botanical hair care"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <span className="font-sans text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-white block">
                  FOR HAIR
                </span>
                <span className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37] mt-1 group-hover:underline">
                  <span>SHOP NOW</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </button>

            {/* Bottom Row: FOR RELAXATION + FOR CLARITY */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[190px] sm:h-[245px]">
              
              {/* Card: FOR RELAXATION */}
              <button
                type="button"
                onClick={() => handleLifestyleClick('Lavender Chamomile Relaxation')}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden h-full w-full p-4 sm:p-5 flex flex-col justify-end text-left shadow-[0_4px_16px_rgba(16,44,32,0.06)] cursor-pointer"
              >
                <img
                  src="/images/editorial/relaxation-botanical.jpg"
                  alt="Peaceful meditation in warm morning light"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <span className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] text-white block leading-tight">
                    FOR RELAXATION
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37] mt-1 group-hover:underline">
                    <span>SHOP NOW</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </button>

              {/* Card: FOR CLARITY */}
              <button
                type="button"
                onClick={() => handleLifestyleClick('Clarity Peppermint Eucalyptus')}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden h-full w-full p-4 sm:p-5 flex flex-col justify-end text-left shadow-[0_4px_16px_rgba(16,44,32,0.06)] cursor-pointer"
              >
                <img
                  src="/images/editorial/clarity-botanical.jpg"
                  alt="Clear mental focus workspace with botanical greenery"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <span className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] text-white block leading-tight">
                    FOR CLARITY
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37] mt-1 group-hover:underline">
                    <span>SHOP NOW</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </button>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
