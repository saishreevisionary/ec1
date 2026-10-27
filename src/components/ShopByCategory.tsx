'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles,
  Droplet,
  Flame,
  Layers,
  Flower2,
  Boxes,
  CheckCircle2
} from 'lucide-react';
import { Category, CATEGORIES } from '@/lib/seedData';

interface ShopByCategoryProps {
  categories?: Category[];
  productCounts?: Record<number, number>;
}

// 6 Canonical Category Metadata with small botanical icons & thumbnails
const CATEGORY_STRIP_DATA = [
  {
    id: 1,
    name: 'Essential Oils',
    slug: 'essential-oils',
    icon: Droplet,
    thumbnail: '/images/products/lavender-oil.jpg',
    defaultCount: 3,
  },
  {
    id: 2,
    name: 'Spice Oils',
    slug: 'spice-oils',
    icon: Flame,
    thumbnail: '/images/products/ceylon-cinnamon.jpg',
    defaultCount: 9,
  },
  {
    id: 3,
    name: 'Spice Oleoresins',
    slug: 'spice-oleoresins',
    icon: Layers,
    thumbnail: '/images/products/green-cardamom.jpg',
    defaultCount: 5,
  },
  {
    id: 4,
    name: 'Floral Concretes',
    slug: 'floral-concretes',
    icon: Flower2,
    thumbnail: '/images/products/rose-concrete.jpg',
    defaultCount: 3,
  },
  {
    id: 5,
    name: 'Floral Absolutes',
    slug: 'floral-absolutes',
    icon: Sparkles,
    thumbnail: '/images/products/jasmine-sambac.jpg',
    defaultCount: 3,
  },
  {
    id: 6,
    name: 'Spice Powders',
    slug: 'spice-powders',
    icon: Boxes,
    thumbnail: '/images/spice-powders.jpg',
    defaultCount: 4,
  },
];

export default function ShopByCategory({ categories = CATEGORIES, productCounts = {} }: ShopByCategoryProps) {
  // Only display active categories in customer store
  const activeCategories = (categories && categories.length > 0 ? categories : CATEGORIES).filter(
    c => c.is_active !== false
  );

  return (
    <section 
      id="explore-by-category-section" 
      aria-label="Explore by Category"
      className="relative py-10 sm:py-14 bg-[#FAF9F5]/70 backdrop-blur-xs border-y border-[#2E5E3E]/10 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-gradient-to-b from-[#D4954B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-t from-[#2E5E3E]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================
            1. SECTION HEADER: "Explore by Category"
           ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 border-b border-[#173B2B]/10 pb-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#EAE7DC]/90 text-[11px] font-extrabold uppercase tracking-wider text-[#173B2B] border border-[#173B2B]/15">
              <Sparkles className="w-3 h-3 text-[#D4954B]" />
              <span>BOTANICAL PORTFOLIO</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#173B2B] font-heading tracking-tight leading-tight">
              Explore by Category
            </h2>

            <p className="text-sm sm:text-base text-[#344C3D] font-normal max-w-xl">
              Find the right botanical ingredient for your application.
            </p>
          </div>

          <Link
            id="view-all-catalogue-link"
            href="/products"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-bold uppercase tracking-wider text-[#173B2B] hover:text-[#D4954B] transition-colors self-start sm:self-end group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173B2B] rounded-md px-1 py-0.5"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4954B] group-hover:text-[#173B2B] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* =========================================================
            2. DYNAMIC CATEGORY NAVIGATION STRIP
            - Responsive dynamic grid wrapping cleanly for any number of active categories
            - Mobile: Touch-friendly horizontal swipe strip with snap
           ========================================================= */}
        <div 
          id="category-navigation-strip" 
          role="navigation"
          aria-label="Product Categories Navigation"
          className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-none hide-scrollbar snap-x snap-mandatory"
        >
          {activeCategories.map((cat) => {
            const count = productCounts[cat.id] !== undefined ? productCounts[cat.id] : 0;
            const thumbnail = cat.image_url || (cat.slug === 'spice-powders' || cat.id === 6 ? '/images/spice-powders.jpg' : '/images/products/lavender-oil.jpg');

            return (
              <Link
                key={cat.id}
                id={`cat-strip-${cat.slug}`}
                href={`/products?category=${cat.slug}`}
                className="group relative flex-shrink-0 w-[180px] sm:w-auto snap-start flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/90 hover:bg-[#173B2B] border border-[#173B2B]/15 hover:border-[#173B2B] shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173B2B] focus-visible:ring-offset-2"
              >
                {/* Botanical Thumbnail Container */}
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 bg-[#FAF8F0] border border-[#173B2B]/12 group-hover:border-white/20 transition-colors">
                  <img
                    src={thumbnail}
                    alt={cat.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/images/products/lavender-oil.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-[#173B2B]/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Category Text & Dynamic Count */}
                <div className="min-w-0 flex-1">
                  <span className="font-heading font-extrabold text-[13.5px] sm:text-[14px] text-[#173B2B] group-hover:text-white transition-colors leading-snug line-clamp-1 block">
                    {cat.name}
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#5A6E60] group-hover:text-[#DCE5D5] transition-colors block mt-0.5">
                    {count} {count === 1 ? 'Extract' : 'Extracts'}
                  </span>
                </div>

                {/* Micro Hover Indicator */}
                <ArrowRight className="w-3.5 h-3.5 text-[#5A6E60] group-hover:text-[#D4954B] opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-0.5 shrink-0 hidden sm:block" />
              </Link>
            );
          })}
        </div>

        {/* =========================================================
            3. WIDE EDITORIAL DISCOVERY BANNER
            "Discover Our Botanical Ingredients"
            - Desktop: 2-column balanced layout with copy/CTA and photography
            - Tablet/Mobile: Stacks cleanly without clipping
           ========================================================= */}
        <div 
          id="editorial-discovery-banner"
          className="mt-8 sm:mt-10 rounded-3xl bg-gradient-to-br from-[#F5F2E9]/95 via-[#FAF9F5]/90 to-[#EAE7DC]/85 backdrop-blur-md border border-[#173B2B]/15 shadow-xs p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden"
        >
          {/* Subtle Decorative Background Grain Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D4954B]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Column: Editorial Copy, Badges & CTA */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[11px] font-extrabold uppercase tracking-wider text-[#173B2B] border border-[#173B2B]/15 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#D4954B]" />
                  <span>PURE BOTANICAL INGREDIENTS</span>
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#173B2B] tracking-tight leading-[1.18]">
                Discover Our Botanical Ingredients
              </h3>

              <p className="text-base sm:text-[17px] text-[#2E4736] font-normal leading-relaxed max-w-xl">
                From aromatic essential oils and concentrated spice extracts to delicate floral ingredients, explore our botanical collection for flavour, fragrance, food and personal-care applications.
              </p>

              {/* Quality Highlights */}
              <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-4 text-[13px] sm:text-[13.5px] text-[#344C3D]">
                <div className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#2E5E3E]" />
                  <span>Steam Distilled &amp; Supercritical</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#2E5E3E]" />
                  <span>Analytical GC-MS Batch Testing</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#2E5E3E]" />
                  <span>Supplying 40+ Countries</span>
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="pt-2 sm:pt-3">
                <Link
                  id="editorial-explore-catalogue-btn"
                  href="/products"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-full font-bold text-[14px] sm:text-[14.5px] uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-95 shadow-xs group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173B2B] focus-visible:ring-offset-2"
                >
                  <span>Explore the Catalogue</span>
                  <ArrowRight className="w-4 h-4 text-[#D4954B] group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Refined Botanical Product Photograph */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-[#173B2B]/15 bg-[#FAF8F0] group">
                <img
                  src="/images/products/green-cardamom.jpg"
                  alt="Venuss Botanical Product Showcase — Cardamom pods and pure botanical amber packaging on natural travertine"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/images/botanical-hero.jpg';
                  }}
                />

                {/* Subtle Inner Highlight Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 opacity-60" />

                {/* Floating Authenticity Tag */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#173B2B]/15 shadow-xs flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D48B38] animate-pulse" />
                    <span className="text-[11.5px] sm:text-[12px] font-bold text-[#173B2B] uppercase tracking-wider">
                      Authentic Indian Botanical Extracts
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#C7782A] uppercase">
                    Since 1986
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
