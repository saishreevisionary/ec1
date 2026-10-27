'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  ShieldCheck, 
  FlaskConical, 
  Globe2, 
  ArrowRight 
} from 'lucide-react';

export default function BotanicalBrandStory() {
  return (
    <section id="botanical-brand-story" className="relative py-16 sm:py-24 bg-[#EAE7DC]/60 border-t border-[#2E5E3E]/12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2E5E3E]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#D4954B]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Brand Narrative Grid: Left Copy & Right Botanical Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          
          {/* Left Column: Brand Story Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] text-xs uppercase font-bold tracking-wider text-[#173B2B] border border-[#173B2B]/20 shadow-2xs">
              <Sprout className="w-3.5 h-3.5 text-[#D4954B]" />
              <span>ESTABLISHED 1986 &bull; SIVAKASI & MALABAR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#173B2B] font-heading tracking-tight leading-[1.15]">
              Nature, Extracted with Precision
            </h2>

            <p className="font-heading italic text-lg sm:text-xl md:text-2xl text-[#C78738] font-bold">
              &ldquo;Honoring the volatile soul of Indian flora through science-led distillation.&rdquo;
            </p>

            <div className="space-y-4 text-base sm:text-[17.5px] text-[#1E3E2B] font-normal leading-relaxed">
              <p>
                Venuss Herbo Aromatics is an Indian manufacturer and international supplier of pure botanical ingredients. Operating from South India&apos;s fertile spice and floral corridors, we specialize in six core product categories: <strong className="font-bold text-[#173B2B]">Essential Oils</strong>, <strong className="font-bold text-[#173B2B]">Spice Oils</strong>, <strong className="font-bold text-[#173B2B]">Spice Oleoresins</strong>, <strong className="font-bold text-[#173B2B]">Floral Concretes</strong>, <strong className="font-bold text-[#173B2B]">Floral Absolutes</strong>, and <strong className="font-bold text-[#173B2B]">Sterilized Spice Powders</strong>.
              </p>
              <p>
                We serve global B2B clients in the Flavor, Fragrance, Food, Personal Care, and Aromatherapy industries. Combining generational agricultural sourcing with low-temperature steam distillation and vacuum extraction, we ensure every batch preserves the unadulterated volatile profile of the natural botanical.
              </p>
            </div>

            {/* Compact Inline Certification Trust Indicator */}
            <div className="pt-1 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#173B2B]/10 border border-[#173B2B]/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4.5 h-4.5 text-[#173B2B]" />
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13.5px]">
                <span className="font-bold text-[#173B2B]">ISO 9001 &amp; HACCP Certified</span>
                <span className="text-[#173B2B]/30 hidden sm:inline">&bull;</span>
                <span className="text-[#4A5D50] font-medium">Exporting to 40+ countries &bull; GC-MS batch COAs</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-full font-bold text-[14.5px] sm:text-[15px] uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-md cursor-pointer"
              >
                <span>Read Company Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white hover:bg-[#FAF9F5] text-[#173B2B] border border-[#173B2B]/25 rounded-full font-bold text-[14.5px] sm:text-[15px] uppercase tracking-wider transition-all duration-200 hover:border-[#D4954B] shadow-2xs cursor-pointer"
              >
                Explore Products
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Botanical Visual */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#173B2B]/20 bg-white p-2">
              <div className="relative h-[340px] sm:h-[400px] w-full rounded-2xl overflow-hidden">
                <img
                  src="/images/editorial/curated-botanical-duo.jpg"
                  alt="Venuss Botanical Heritage Distillation"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/images/botanical-hero.jpg';
                  }}
                />
                
                {/* Gradient vignette with clear typography positioning */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#132A1C]/90 via-[#132A1C]/30 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F2C94C]">
                    Analytical Purity Standard
                  </span>
                  <h4 className="text-lg sm:text-xl font-heading font-bold text-white leading-snug">
                    GC-MS Verified Monoterpene Spectra
                  </h4>
                  <p className="text-[12.5px] text-emerald-100 font-normal mt-0.5">
                    Uncut, unadulterated &amp; 100% steam distilled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Botanical Excellence Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-8 border-t border-[#173B2B]/12">
          
          {/* Pillar 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#173B2B]/15 shadow-2xs space-y-2 hover:border-[#D4954B]/35 transition-colors h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE7DC] text-[#173B2B] flex items-center justify-center border border-[#173B2B]/15 mb-3">
                <FlaskConical className="w-5 h-5 text-[#173B2B]" />
              </div>
              <h3 className="font-heading font-bold text-[16.5px] text-[#173B2B] mb-1.5">
                Steam Distilled
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#3D5244] font-normal leading-relaxed">
                Unadulterated low-temperature extraction preserving volatile aromatic monoterpenes and bioactives.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#173B2B]/15 shadow-2xs space-y-2 hover:border-[#D4954B]/35 transition-colors h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE7DC] text-[#173B2B] flex items-center justify-center border border-[#173B2B]/15 mb-3">
                <Sprout className="w-5 h-5 text-[#173B2B]" />
              </div>
              <h3 className="font-heading font-bold text-[16.5px] text-[#173B2B] mb-1.5">
                Grower Traceability
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#3D5244] font-normal leading-relaxed">
                Ethically sourced direct from generational grower collectives across Malabar, Wayanad, and Tamil Nadu.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#173B2B]/15 shadow-2xs space-y-2 hover:border-[#D4954B]/35 transition-colors h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE7DC] text-[#173B2B] flex items-center justify-center border border-[#173B2B]/15 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#173B2B]" />
              </div>
              <h3 className="font-heading font-bold text-[16.5px] text-[#173B2B] mb-1.5">
                GC-MS Analytical Rigor
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#3D5244] font-normal leading-relaxed">
                Every single batch analytically profiled in our in-house laboratories. ISO 9001:2015, HACCP &amp; FSSAI certified.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#173B2B]/15 shadow-2xs space-y-2 hover:border-[#D4954B]/35 transition-colors h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE7DC] text-[#173B2B] flex items-center justify-center border border-[#173B2B]/15 mb-3">
                <Globe2 className="w-5 h-5 text-[#173B2B]" />
              </div>
              <h3 className="font-heading font-bold text-[16.5px] text-[#173B2B] mb-1.5">
                Global Export Grade
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#3D5244] font-normal leading-relaxed">
                Trusted by international flavor, fragrance, and cosmetic houses across 40+ countries worldwide.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
