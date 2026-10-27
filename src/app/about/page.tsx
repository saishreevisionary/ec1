'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  FlaskConical, 
  ShieldCheck, 
  Microscope, 
  Globe2, 
  Leaf, 
  Users2, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Droplet, 
  Factory,
  Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col font-sans text-[#173B2B]">
      <Navbar />

      <main className="flex-grow">
        {/* ====================================================
            PAGE HEADER & HERO
           ==================================================== */}
        <section className="relative bg-[#173B2B] text-white py-16 sm:py-24 overflow-hidden">
          {/* Subtle botanical ambient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#D48B38]/15 via-[#2E5E3E]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#2E5E3E]/30 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[13.5px] text-[#D8EADB] mb-5 tracking-wide font-medium">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="opacity-50">/</span>
              <span className="text-white font-semibold">About Venuss</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#E8A555] border border-white/10">
                <Leaf className="w-3.5 h-3.5" />
                <span>ESTABLISHED 1986 &bull; TAMIL NADU, INDIA</span>
              </span>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-white leading-[1.15]">
                Nature, Extracted with Precision
              </h1>

              <p className="text-base sm:text-[17.5px] text-[#D8EADB] font-normal leading-relaxed max-w-2xl">
                Venuss Herbo Aromatics is an Indian manufacturer and international supplier of 100% natural botanical ingredients, essential oils, spice oils, spice oleoresins, floral concretes, floral absolutes, and sterilized spice powders.
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================
            QUICK ANCHOR NAVIGATION BAR
           ==================================================== */}
        <div className="sticky top-18 z-30 bg-[#F5F2E9]/95 backdrop-blur-md border-b border-[#2E5E3E]/12 py-3 px-4 shadow-2xs">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-none text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#173B2B]">
            <a href="#overview" className="px-3.5 py-1.5 rounded-full hover:bg-[#173B2B] hover:text-white transition-colors shrink-0">Overview</a>
            <a href="#manufacturing" className="px-3.5 py-1.5 rounded-full hover:bg-[#173B2B] hover:text-white transition-colors shrink-0">Manufacturing</a>
            <a href="#quality" className="px-3.5 py-1.5 rounded-full hover:bg-[#173B2B] hover:text-white transition-colors shrink-0">Quality Control</a>
            <a href="#rnd" className="px-3.5 py-1.5 rounded-full hover:bg-[#173B2B] hover:text-white transition-colors shrink-0">R&amp;D</a>
            <a href="#global-business" className="px-3.5 py-1.5 rounded-full hover:bg-[#173B2B] hover:text-white transition-colors shrink-0">Global Business</a>
            <a href="#environmental" className="px-3.5 py-1.5 rounded-full hover:bg-[#173B2B] hover:text-white transition-colors shrink-0">Environment</a>
            <a href="#people-community" className="px-3.5 py-1.5 rounded-full hover:bg-[#173B2B] hover:text-white transition-colors shrink-0">People &amp; Community</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-20 sm:space-y-28">

          {/* ====================================================
              SECTION A: COMPANY OVERVIEW & HERITAGE
             ==================================================== */}
          <section id="overview" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B] border border-[#2E5E3E]/15">
                  <Building2 className="w-3.5 h-3.5 text-[#C78738]" />
                  <span>SECTION A &bull; COMPANY OVERVIEW</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#173B2B] leading-[1.2]">
                  Family-Owned Heritage, Enterprise-Scale Precision
                </h2>

                <p className="font-heading italic font-bold text-lg sm:text-xl text-[#C78738]">
                  &ldquo;Agile decision-making paired with unyielding botanical integrity.&rdquo;
                </p>

                <div className="space-y-4 text-base sm:text-[17px] text-[#243B2C] font-normal leading-[1.65]">
                  <p>
                    Venuss Herbo Aromatics is an Indian manufacturer and bulk exporter of high-grade botanical extracts. Founded as a family-owned enterprise, the company has grown into a trusted supply partner for global flavorists, perfumers, food processors, and healthcare formulators.
                  </p>
                  <p>
                    Our family-owned governance structure affords us a unique competitive advantage: flexible decision-making, deep personal relationships with growers and international buyers, and an unwavering commitment to quality over short-term volume. 
                  </p>
                  <p>
                    Headquartered in Tamil Nadu, India, our manufacturing facility sits proximate to South India&apos;s fertile spice and floral corridors—enabling rapid post-harvest processing of sensitive volatile botanicals.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                    <span className="text-[14.5px] font-bold uppercase tracking-wider text-[#173B2B] block">Direct Sourcing</span>
                    <span className="text-[13.5px] text-[#3D5244] font-medium mt-1 block leading-normal">Direct grower contracts across Southern India</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                    <span className="text-[14.5px] font-bold uppercase tracking-wider text-[#173B2B] block">Pure Botanicals</span>
                    <span className="text-[13.5px] text-[#3D5244] font-medium mt-1 block leading-normal">100% natural single-source botanical extracts</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                    <span className="text-[14.5px] font-bold uppercase tracking-wider text-[#173B2B] block">B2B Customization</span>
                    <span className="text-[13.5px] text-[#3D5244] font-medium mt-1 block leading-normal">Custom active concentrations &amp; packaging</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden border border-[#2E5E3E]/20 bg-white p-2.5 shadow-md">
                  <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden">
                    <img 
                      src="/images/botanical-hero.jpg" 
                      alt="Venuss Herbo Aromatics Botanical Processing"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173B2B]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E8A555]">Registered Facility</span>
                      <h4 className="text-lg font-heading font-bold text-white mt-1">Seithur, Rajapalayam Taluk</h4>
                      <p className="text-[13.5px] text-[#D8EADB] font-medium mt-0.5">Virudhunagar District, Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION B: MANUFACTURING CAPABILITIES
             ==================================================== */}
          <section id="manufacturing" className="scroll-mt-32 pt-10 border-t border-[#2E5E3E]/15">
            <div className="max-w-3xl mb-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B] border border-[#2E5E3E]/15">
                <Factory className="w-3.5 h-3.5 text-[#C78738]" />
                <span>SECTION B &bull; MANUFACTURING CAPABILITIES</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#173B2B] leading-[1.2]">
                Four Validated Production Methodologies
              </h2>
              <p className="text-base sm:text-[17px] text-[#243B2C] font-normal leading-relaxed">
                Our plant operates dedicated industrial lines designed around specific plant tissue requirements, preventing thermal degradation and cross-contamination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Method 1 */}
              <div className="p-6 rounded-2xl bg-white border border-[#2E5E3E]/15 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FAF8F0] border border-[#2E5E3E]/15 flex items-center justify-center text-[#2E5E3E]">
                    <Droplet className="w-5 h-5 text-[#C78738]" />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-[19px] text-[#173B2B]">Steam Distillation</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B]">
                    Essential Oils &amp; Spice Oils
                  </div>
                  <p className="text-[14px] sm:text-[14.5px] text-[#243B2C] font-normal leading-[1.6]">
                    Low-pressure, indirect steam distillation in stainless steel (SS316) stills. Preserves heat-sensitive monoterpenes and volatile aroma top-notes without hydrolytic decomposition.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#2E5E3E]/10 text-[13px] font-semibold text-[#173B2B]">
                  Products: Betel Leaf, Davana, Palmarosa, Cardamom, Basil, Ginger Oils
                </div>
              </div>

              {/* Method 2 */}
              <div className="p-6 rounded-2xl bg-white border border-[#2E5E3E]/15 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FAF8F0] border border-[#2E5E3E]/15 flex items-center justify-center text-[#2E5E3E]">
                    <Layers className="w-5 h-5 text-[#C78738]" />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-[19px] text-[#173B2B]">Solvent Extraction</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B]">
                    Spice Oleoresins
                  </div>
                  <p className="text-[14px] sm:text-[14.5px] text-[#243B2C] font-normal leading-[1.6]">
                    Counter-current percolation using food-grade solvent recovery loops under vacuum. Concentrates both volatile essential oils and non-volatile pungent/coloring principles.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#2E5E3E]/10 text-[13px] font-semibold text-[#173B2B]">
                  Products: Cardamom, Cumin, Celery, Turmeric, Saffron Oleoresins
                </div>
              </div>

              {/* Method 3 */}
              <div className="p-6 rounded-2xl bg-white border border-[#2E5E3E]/15 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FAF8F0] border border-[#2E5E3E]/15 flex items-center justify-center text-[#2E5E3E]">
                    <FlaskConical className="w-5 h-5 text-[#C78738]" />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-[19px] text-[#173B2B]">Multi-Stage Extraction</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B]">
                    Concretes &amp; Absolutes
                  </div>
                  <p className="text-[14px] sm:text-[14.5px] text-[#243B2C] font-normal leading-[1.6]">
                    Primary non-polar solvent washing yielding pure floral concretes, followed by cryogenic ethanol washing and dewaxing to produce alcohol-soluble absolutes for fine perfumery.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#2E5E3E]/10 text-[13px] font-semibold text-[#173B2B]">
                  Products: Jasmine Grandiflorum, Jasmine Sambac, Tuberose Concretes &amp; Absolutes
                </div>
              </div>

              {/* Method 4 */}
              <div className="p-6 rounded-2xl bg-white border border-[#2E5E3E]/15 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FAF8F0] border border-[#2E5E3E]/15 flex items-center justify-center text-[#2E5E3E]">
                    <Building2 className="w-5 h-5 text-[#C78738]" />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-[19px] text-[#173B2B]">Size Reduction &amp; Sterilization</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B]">
                    Spice Powders
                  </div>
                  <p className="text-[14px] sm:text-[14.5px] text-[#243B2C] font-normal leading-[1.6]">
                    Cryogenic micro-milling under inert atmosphere, followed by steam sterilization. Retains natural essential oil content while guaranteeing rigorous microbiological safety without radiation or ETO.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#2E5E3E]/10 text-[13px] font-semibold text-[#173B2B]">
                  Products: Cardamom, Cumin, Saffron, Turmeric Powders (60–100 Mesh)
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION C: QUALITY ASSURANCE
             ==================================================== */}
          <section id="quality" className="scroll-mt-32 pt-10 border-t border-[#2E5E3E]/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="rounded-3xl overflow-hidden border border-[#2E5E3E]/20 bg-white p-2.5 shadow-md">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF9F5]">
                    <img 
                      src="/images/botanical/hero-lab-flask.jpg" 
                      alt="Venuss Analytical Quality Control Laboratory"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = '/images/botanical-hero.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173B2B]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E8A555]">Analytical Facility</span>
                      <h4 className="text-lg font-heading font-bold text-white mt-1">In-House Gas Chromatography Lab</h4>
                      <p className="text-[13.5px] text-[#D8EADB] font-medium mt-0.5">High-Precision GC-MS / FID Peak Profiling</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B] border border-[#2E5E3E]/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C78738]" />
                  <span>SECTION C &bull; QUALITY ASSURANCE</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#173B2B] leading-[1.2]">
                  Analytical Rigour at Every Stage
                </h2>

                <p className="text-base sm:text-[17px] text-[#243B2C] font-normal leading-relaxed">
                  Quality at Venuss is governed by strict incoming raw-material inspection, validated in-process controls, and comprehensive finished-batch release testing conducted by qualified technical personnel.
                </p>

                <div className="space-y-3.5 text-[14px]">
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#2E5E3E]/15">
                    <CheckCircle2 className="w-5 h-5 text-[#173B2B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#173B2B] block font-bold text-[15.5px]">Botanical Raw Material Authentication</strong>
                      <span className="text-[#3D5244] font-normal leading-relaxed">Taxonomic verification, moisture analysis, volatile oil estimation, and foreign matter screening prior to production intake.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#2E5E3E]/15">
                    <CheckCircle2 className="w-5 h-5 text-[#173B2B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#173B2B] block font-bold text-[15.5px]">Physical &amp; Chemical Specification Testing</strong>
                      <span className="text-[#3D5244] font-normal leading-relaxed">Specific gravity, refractive index, optical rotation, residual solvent levels, and acid values measured to pharmacopeial benchmarks.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#2E5E3E]/15">
                    <CheckCircle2 className="w-5 h-5 text-[#173B2B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#173B2B] block font-bold text-[15.5px]">GC-MS Chromatographic Profiling</strong>
                      <span className="text-[#3D5244] font-normal leading-relaxed">Every export batch is accompanied by an authenticated Certificate of Analysis (COA) specifying key marker chemical constituents.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#2E5E3E]/15">
                    <CheckCircle2 className="w-5 h-5 text-[#173B2B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#173B2B] block font-bold text-[15.5px]">Qualified Technical Personnel</strong>
                      <span className="text-[#3D5244] font-normal leading-relaxed">Our laboratory is staffed by postgraduate chemists and extraction engineers trained in phytochemistry and international compliance.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION D: RESEARCH & DEVELOPMENT
             ==================================================== */}
          <section id="rnd" className="scroll-mt-32 pt-10 border-t border-[#2E5E3E]/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B] border border-[#2E5E3E]/15">
                  <Microscope className="w-3.5 h-3.5 text-[#C78738]" />
                  <span>SECTION D &bull; RESEARCH &amp; DEVELOPMENT</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#173B2B] leading-[1.2]">
                  Continuous Technical Improvement &amp; Green Chemistry
                </h2>

                <div className="space-y-4 text-base sm:text-[17px] text-[#243B2C] font-normal leading-[1.65]">
                  <p>
                    Venuss allocates consistent capital reinvestment into applied extraction research. Our R&amp;D mandate focuses on three priorities: increasing volatile compound yields, decreasing energy and solvent footprints, and developing bespoke fractions for proprietary customer formulations.
                  </p>
                  <p>
                    Our technical team collaborates with agricultural research institutions in South India to optimize harvest times and post-harvest drying techniques, ensuring higher essential oil concentration in feedstock before distillation commences.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                    <h4 className="font-heading font-bold text-[16.5px] text-[#173B2B] mb-1.5">Process Optimization</h4>
                    <p className="text-[14px] text-[#3D5244] font-normal leading-relaxed">
                      Customizing distillation vacuum curves and condensation rates to capture top-note ester fractions in Davana and Jasmine.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                    <h4 className="font-heading font-bold text-[16.5px] text-[#173B2B] mb-1.5">Clean Label Standards</h4>
                    <p className="text-[14px] text-[#3D5244] font-normal leading-relaxed">
                      Eliminating toxic solvents and replacing traditional thermal drying with ambient dehumidification for heat-sensitive spice powders.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="p-8 sm:p-10 rounded-3xl bg-[#173B2B] text-white space-y-5 border border-[#2E5E3E]/20 shadow-md">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E8A555]">Innovation Focus</span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-snug">
                    Custom Specification Development for Enterprise Formulators
                  </h3>
                  <p className="text-[14.5px] sm:text-[15px] text-[#D8EADB] font-normal leading-relaxed">
                    Have unique volatile oil thresholds, low-pesticide criteria, or custom color-value demands for spice oleoresins? Our technical team works directly with your R&amp;D department to produce pilot test batches.
                  </p>
                  <Link
                    href="/contact?type=custom"
                    className="inline-flex items-center gap-2 text-[14px] sm:text-[14.5px] font-bold uppercase tracking-wider text-[#E8A555] hover:text-white transition-colors pt-2"
                  >
                    <span>Request Custom R&amp;D Batch</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION E: GLOBAL BUSINESS & IMPORTS
             ==================================================== */}
          <section id="global-business" className="scroll-mt-32 pt-10 border-t border-[#2E5E3E]/15">
            <div className="max-w-3xl mb-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B] border border-[#2E5E3E]/15">
                <Globe2 className="w-3.5 h-3.5 text-[#C78738]" />
                <span>SECTION E &bull; GLOBAL BUSINESS &amp; LOGISTICS</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#173B2B] leading-[1.2]">
                Export Infrastructure Serving International Markets
              </h2>
              <p className="text-base sm:text-[17px] text-[#243B2C] font-normal leading-relaxed">
                Venuss supplies ingredients to institutional clients across Europe, the Americas, Asia-Pacific, and the Middle East, with rigorous compliance documentation supporting every consignment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C78738] block mb-2">Export Packaging</span>
                <h3 className="font-heading font-bold text-lg text-[#173B2B] mb-2">UN-Certified Packaging</h3>
                <p className="text-[14px] text-[#3D5244] font-normal leading-relaxed">
                  Export consignments are packed in epoxy-lined aluminum containers, HDPE drums, or fluorinated carboys sealed under nitrogen blanketing to prevent photo-oxidation and trans-oceanic degradation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C78738] block mb-2">Regulatory Dossiers</span>
                <h3 className="font-heading font-bold text-lg text-[#173B2B] mb-2">Complete Compliance Files</h3>
                <p className="text-[14px] text-[#3D5244] font-normal leading-relaxed">
                  Every commercial shipment includes batch-specific Certificates of Analysis (COA), Safety Data Sheets (SDS), Technical Data Sheets (TDS), Allergen Statements, Non-GMO Declarations, and IFRA compliance statements.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C78738] block mb-2">Inspection Processes</span>
                <h3 className="font-heading font-bold text-lg text-[#173B2B] mb-2">Strict Pre-Shipment Inspection</h3>
                <p className="text-[14px] text-[#3D5244] font-normal leading-relaxed">
                  Cargo undergo internal pre-dispatch inspection protocols and third-party surveyor inspections (SGS / Eurofins upon request) prior to port dispatch from Chennai or Tuticorin ports.
                </p>
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION F: ENVIRONMENTAL RESPONSIBILITY
             ==================================================== */}
          <section id="environmental" className="scroll-mt-32 pt-10 border-t border-[#2E5E3E]/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B] border border-[#2E5E3E]/15">
                  <Leaf className="w-3.5 h-3.5 text-[#C78738]" />
                  <span>SECTION F &bull; ENVIRONMENTAL RESPONSIBILITY</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#173B2B] leading-[1.2]">
                  Sustainable Stewardship of Botanical Resources
                </h2>

                <div className="space-y-4 text-base sm:text-[17px] text-[#243B2C] font-normal leading-[1.65]">
                  <p>
                    Because our business depends directly on the vitality of Indian soils and biodiversity, environmental responsibility is woven into our industrial operations.
                  </p>
                  <p>
                    We actively work to minimize industrial emissions, conserve fresh water through closed-loop condensation circuits, and achieve high solvent recovery efficiencies in all oleoresin and concrete extraction operations.
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C78738]" />
                    <span className="text-[14.5px] sm:text-[15px] text-[#173B2B] font-medium">Closed-loop solvent recovery exceeding 98% efficiency</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C78738]" />
                    <span className="text-[14.5px] sm:text-[15px] text-[#173B2B] font-medium">Spent biomass composting for local soil reconditioning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C78738]" />
                    <span className="text-[14.5px] sm:text-[15px] text-[#173B2B] font-medium">Recirculating cooling towers reducing freshwater intake</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-8 rounded-3xl bg-[#E4ECE5]/80 border border-[#2E5E3E]/15 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#173B2B]">Ecological Policy</span>
                  <h3 className="font-heading font-bold text-xl text-[#173B2B]">Energy &amp; Emissions Management</h3>
                  <p className="text-[14.5px] text-[#243B2C] font-normal leading-relaxed">
                    Our boilers utilize biomass briquettes derived from non-food agricultural waste residues rather than fossil fuels. This carbon-neutral heating strategy lowers net greenhouse emissions while creating secondary income for local farming communities.
                  </p>
                  <div className="pt-2 text-[13.5px] text-[#173B2B] font-bold">
                    Targeting zero liquid discharge (ZLD) through continuous wastewater recycling.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION G: PEOPLE AND COMMUNITY
             ==================================================== */}
          <section id="people-community" className="scroll-mt-32 pt-10 border-t border-[#2E5E3E]/15">
            <div className="max-w-3xl mb-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE7DC] text-xs font-bold uppercase tracking-wider text-[#173B2B] border border-[#2E5E3E]/15">
                <Users2 className="w-3.5 h-3.5 text-[#C78738]" />
                <span>SECTION G &bull; PEOPLE &amp; COMMUNITY</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#173B2B] leading-[1.2]">
                Occupational Health, Safety &amp; Grower Partnerships
              </h2>
              <p className="text-base sm:text-[17px] text-[#243B2C] font-normal leading-relaxed">
                Our workforce and regional agricultural partners are the foundation of Venuss Herbo Aromatics. We maintain rigorous workplace safety standards and fair procurement ethics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                <h3 className="font-heading font-bold text-lg text-[#173B2B] mb-2">Workplace Health &amp; Safety</h3>
                <p className="text-[14px] text-[#3D5244] font-normal leading-relaxed">
                  Regular chemical safety drills, full PPE provisions, continuous atmospheric monitoring in solvent extraction areas, and zero-accident occupational safety targets across plant operations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                <h3 className="font-heading font-bold text-lg text-[#173B2B] mb-2">Contractor &amp; Visitor Safety</h3>
                <p className="text-[14px] text-[#3D5244] font-normal leading-relaxed">
                  Mandatory safety inductions, strict access controls, and transparent risk assessments for all on-site transport contractors, maintenance personnel, and international client audit teams.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#2E5E3E]/15 shadow-2xs">
                <h3 className="font-heading font-bold text-lg text-[#173B2B] mb-2">Grower Community Alliances</h3>
                <p className="text-[14px] text-[#3D5244] font-normal leading-relaxed">
                  Guaranteed off-take agreements, seasonal pre-financing, and technical guidance for smallholder spice and floral cultivators in Tamil Nadu and Kerala to preserve sustainable farming practices.
                </p>
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION H: CALL TO ACTION
             ==================================================== */}
          <section className="pt-8 pb-4">
            <div className="rounded-3xl bg-[#173B2B] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-lg border border-[#2E5E3E]/20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D48B38]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E8A555]">Partner with Venuss</span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                  Discuss Your Botanical Ingredient Requirements
                </h2>
                <p className="text-base sm:text-[17px] text-[#D8EADB] font-normal leading-relaxed">
                  Whether you require commercial container shipments, batch analytical COAs, custom botanical fractions, or pre-shipment evaluation samples, our technical sales team is ready to assist.
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-3.5 bg-[#C78738] hover:bg-[#a86e2a] text-white rounded-full font-bold text-[14.5px] sm:text-[15px] uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-sm cursor-pointer"
                  >
                    Request a Quote or Sample
                  </Link>
                  <Link
                    href="/products"
                    className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-[14.5px] sm:text-[15px] uppercase tracking-wider transition-all duration-200 cursor-pointer"
                  >
                    Explore Products
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
