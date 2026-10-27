'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  Shield, 
  ShieldCheck, 
  Mail,
  Flower2,
  Leaf,
  Flame
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalLiveBackground from '@/components/hero/GlobalLiveBackground';
import ShopByCategory from '@/components/ShopByCategory';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import BotanicalBrandStory from '@/components/BotanicalBrandStory';
import NewsletterBotanicalFrame from '@/components/NewsletterBotanicalFrame';
import { db } from '@/lib/db';
import { Product, Category, CATEGORIES, PRODUCTS } from '@/lib/seedData';
import { useToast } from '@/context/ToastContext';

export default function HomePage() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const loadHomeData = async () => {
      setIsLoading(true);
      try {
        const cats = await db.getCategories();
        if (cats && cats.length > 0) {
          setCategories(cats);
        }

        const prods = await db.getProducts();
        if (prods && prods.length > 0) {
          setAllProducts(prods);
        }
      } catch (err) {
        console.error('Failed to load DB home data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeData();

    const handleUpdate = () => {
      loadHomeData();
    };
    window.addEventListener('venuss-categories-updated', handleUpdate);
    window.addEventListener('venuss-products-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('venuss-categories-updated', handleUpdate);
      window.removeEventListener('venuss-products-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Customer-visible products (excludes draft, unpublished, inactive)
  const visibleProducts = useMemo(() => {
    return allProducts.filter(p => 
      p.status !== 'draft' && 
      (p as any).is_active !== false && 
      (p as any).is_published !== false
    );
  }, [allProducts]);

  // Compute category counts from actual customer-visible product data
  const productCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    visibleProducts.forEach(p => {
      counts[p.category_id] = (counts[p.category_id] || 0) + 1;
    });
    return counts;
  }, [visibleProducts]);

  return (
    <div className="homepage-shell relative min-h-screen isolation-isolate overflow-x-hidden">
      {/* GLOBAL FULL-PAGE LIVE BOTANICAL BACKGROUND */}
      <GlobalLiveBackground />

      <div className="homepage-content relative z-[10]">
        <Navbar />

        <main className="flex-grow animate-fade-in">
          {/* ====================================================
              SECTION 1: WIDE BOTANICAL HERO BANNER & 3 DISCOVERY CARDS
             ==================================================== */}
          <section className="relative px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-10 sm:pb-12 max-w-7xl mx-auto z-[1]">
            
            {/* PART A: WIDE BOTANICAL HERO BANNER */}
            <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#F5F2E9]/95 via-[#FAF9F5]/90 to-[#E5EDE7]/90 backdrop-blur-md shadow-sm border border-[#2E5E3E]/15 overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12 mb-6 sm:mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left Column: Hero Content */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-6 max-w-xl">
                  {/* Eyebrow badge */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] text-xs uppercase font-extrabold tracking-wider text-[#173B2B] border border-[#173B2B]/20 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4954B]" />
                      <span>EST. 1986 &bull; GLOBAL SPICE &amp; BOTANICAL EXTRACTS</span>
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-tight leading-[1.08] text-[#173B2B] font-heading">
                    Nature, Extracted with Precision
                  </h1>

                  {/* Description */}
                  <p className="text-base sm:text-[17.5px] text-[#244030] font-normal leading-relaxed">
                    Premium essential oils, spice extracts, floral absolutes and botanical ingredients for flavour, fragrance, food and personal-care applications.
                  </p>

                  {/* CTA Buttons */}
                  <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3.5">
                    <Link
                      id="hero-explore-catalogue-btn"
                      href="/products"
                      className="px-7 py-3.5 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-full font-bold text-[14px] sm:text-[14.5px] uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center gap-2 shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173B2B] focus-visible:ring-offset-2"
                    >
                      <span>Explore Catalogue</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      id="hero-request-quote-btn"
                      href="/contact"
                      className="px-7 py-3.5 bg-[#FAF9F5] hover:bg-white text-[#173B2B] border border-[#173B2B]/30 hover:border-[#173B2B] rounded-full font-bold text-[14px] sm:text-[14.5px] uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-95 shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173B2B] focus-visible:ring-offset-2"
                    >
                      <span>Request a Quote</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Realistic Botanical Studio Composition */}
                <div className="lg:col-span-5 relative w-full flex justify-center">
                  <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-[#2E5E3E]/15 bg-[#FAF8F0] group">
                    <img
                      src="/images/hero/hero-botanical-composite.jpg"
                      alt="Nature, Extracted with Precision — Amber glass extract bottle with jasmine flowers, lavender, and spices on travertine stone"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = '/images/botanical-hero.jpg';
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* PART B: THREE DISCOVERY CARDS UNDERNEATH */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
              {/* Card 1: Fragrance */}
              <Link
                id="discovery-card-fragrance"
                href="/products?application=Fragrance"
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#17281F] border border-[#173B2B]/40 hover:border-[#D4954B]/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden motion-reduce:transform-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4954B]"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0F1C15]">
                  <img
                    src="/images/hero/discovery-fragrance.jpg"
                    alt="Fragrance — Fine fragrance and perfumery botanical creations"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-106 motion-reduce:transform-none"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/images/products/jasmine-sambac.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17281F] via-transparent to-black/10 opacity-70" />
                </div>
                <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                      <Flower2 className="w-5 h-5 text-[#E5A855] shrink-0" />
                      <h3 className="font-heading font-extrabold text-xl sm:text-[22px] text-white leading-snug group-hover:text-[#E5A855] transition-colors">
                        Fragrance
                      </h3>
                    </div>
                    <p className="text-[13.5px] sm:text-[14px] text-emerald-100/80 font-normal leading-relaxed mb-5">
                      Explore our natural ingredients for fine fragrance and perfumery creations.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[12.5px] sm:text-[13px] font-bold uppercase tracking-wider text-[#E5A855] group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                      <span>Discover Ingredients</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[#E5A855] group-hover:bg-[#E5A855] group-hover:text-[#17281F] transition-all">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Card 2: Aromatherapy */}
              <Link
                id="discovery-card-aromatherapy"
                href="/products?application=Aromatherapy"
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#17281F] border border-[#173B2B]/40 hover:border-[#D4954B]/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden motion-reduce:transform-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4954B]"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0F1C15]">
                  <img
                    src="/images/hero/discovery-aromatherapy.jpg"
                    alt="Aromatherapy — Pure botanical oils and extracts for wellness"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-106 motion-reduce:transform-none"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/images/products/lavender-oil.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17281F] via-transparent to-black/10 opacity-70" />
                </div>
                <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                      <Leaf className="w-5 h-5 text-[#E5A855] shrink-0" />
                      <h3 className="font-heading font-extrabold text-xl sm:text-[22px] text-white leading-snug group-hover:text-[#E5A855] transition-colors">
                        Aromatherapy
                      </h3>
                    </div>
                    <p className="text-[13.5px] sm:text-[14px] text-emerald-100/80 font-normal leading-relaxed mb-5">
                      Pure botanical oils and extracts to support natural wellness and aromatherapy applications.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[12.5px] sm:text-[13px] font-bold uppercase tracking-wider text-[#E5A855] group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                      <span>Discover Ingredients</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[#E5A855] group-hover:bg-[#E5A855] group-hover:text-[#17281F] transition-all">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Card 3: Food & Flavour */}
              <Link
                id="discovery-card-food-flavour"
                href="/products?application=Food+%26+Flavour"
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#17281F] border border-[#173B2B]/40 hover:border-[#D4954B]/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden motion-reduce:transform-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4954B]"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0F1C15]">
                  <img
                    src="/images/hero/discovery-food-flavour.jpg"
                    alt="Food and Flavour — Authentic spice extracts and botanical ingredients"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-106 motion-reduce:transform-none"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/images/spice-powders.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17281F] via-transparent to-black/10 opacity-70" />
                </div>
                <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                      <Flame className="w-5 h-5 text-[#E5A855] shrink-0" />
                      <h3 className="font-heading font-extrabold text-xl sm:text-[22px] text-white leading-snug group-hover:text-[#E5A855] transition-colors">
                        Food &amp; Flavour
                      </h3>
                    </div>
                    <p className="text-[13.5px] sm:text-[14px] text-emerald-100/80 font-normal leading-relaxed mb-5">
                      Authentic spice extracts and botanical ingredients for the food and beverage industry.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[12.5px] sm:text-[13px] font-bold uppercase tracking-wider text-[#E5A855] group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                      <span>Discover Ingredients</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[#E5A855] group-hover:bg-[#E5A855] group-hover:text-[#17281F] transition-all">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

          </section>

          {/* ====================================================
              SECTION 2: COMPACT CATEGORY STRIP & EDITORIAL BANNER
             ==================================================== */}
          <ShopByCategory 
            categories={categories} 
            productCounts={productCounts} 
          />

          {/* ====================================================
              SECTION 3: FEATURED PRODUCTS SHOWCASE + VIEW ALL
             ==================================================== */}
          <FeaturedProductsSection 
            products={visibleProducts} 
            categories={categories} 
          />

          {/* ====================================================
              SECTION 4: COMPANY INTRODUCTION & BRAND STORY
             ==================================================== */}
          <BotanicalBrandStory />

          {/* ====================================================
              SECTION E & F: MANUFACTURING ASSURANCE & ENQUIRY PATHWAY
             ==================================================== */}
          <section className="relative py-12 bg-[#173B2B] text-white w-full overflow-hidden border-t border-[#D4954B]/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-[1]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full border border-white/10 shrink-0">
                  <Award className="w-6 h-6 text-[#E8A555]" />
                </div>
                <div>
                  <h4 className="text-[15.5px] sm:text-[16px] font-bold tracking-wider uppercase text-white font-heading">100% Pure Extracts</h4>
                  <p className="text-[13px] text-emerald-100/90 font-medium mt-0.5">Unadulterated botanical oils</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full border border-white/10 shrink-0">
                  <Shield className="w-6 h-6 text-[#E8A555]" />
                </div>
                <div>
                  <h4 className="text-[15.5px] sm:text-[16px] font-bold tracking-wider uppercase text-white font-heading">Steam Sterilized</h4>
                  <p className="text-[13px] text-emerald-100/90 font-medium mt-0.5">Zero ETO chemical treatments</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full border border-white/10 shrink-0">
                  <Sparkles className="w-6 h-6 text-[#E8A555]" />
                </div>
                <div>
                  <h4 className="text-[15.5px] sm:text-[16px] font-bold tracking-wider uppercase text-white font-heading">Custom Formulations</h4>
                  <p className="text-[13px] text-emerald-100/90 font-medium mt-0.5">Tailored active specs for clients</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full border border-white/10 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#E8A555]" />
                </div>
                <div>
                  <h4 className="text-[15.5px] sm:text-[16px] font-bold tracking-wider uppercase text-white font-heading">Export Certified</h4>
                  <p className="text-[13px] text-emerald-100/90 font-medium mt-0.5">Full regulatory documentation</p>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION F: COMPANY ENQUIRY & B2B QUOTATION PATHWAY
             ==================================================== */}
          <section className="relative py-14 sm:py-20 bg-[#FAF9F5] border-b border-[#173B2B]/12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-[#EBE7DC]/80 border border-[#173B2B]/15 p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#D48B38]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-xs uppercase font-bold tracking-wider text-[#173B2B] border border-[#173B2B]/15 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#D48B38]" />
                      <span>DIRECT MANUFACTURER ACCESS</span>
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold font-heading text-[#173B2B] leading-tight">
                      Request Technical Specifications, COAs or Export Quotations
                    </h2>
                    <p className="text-base sm:text-[17px] text-[#243B2C] font-normal leading-relaxed max-w-2xl">
                      Looking for batch-specific GC-MS profiles, minimum order quantities for bulk packaging (5kg to 200kg drums), or regulatory compliance dossiers? Our technical sales team provides responsive support for global B2B procurement.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Link
                        href="/contact?type=quote"
                        className="px-7 py-3.5 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-full font-bold text-[14.5px] sm:text-[15px] uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-md cursor-pointer"
                      >
                        Request a Quote
                      </Link>
                      <Link
                        href="/about"
                        className="px-7 py-3.5 bg-white hover:bg-[#FAF9F5] text-[#173B2B] border border-[#173B2B]/20 rounded-full font-bold text-[14.5px] sm:text-[15px] uppercase tracking-wider transition-all duration-200 hover:border-[#D4954B] shadow-2xs cursor-pointer"
                      >
                        Company Profile
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-[#173B2B]/15 space-y-3 shadow-2xs">
                    <h3 className="font-heading font-extrabold text-[17px] text-[#173B2B] border-b border-[#173B2B]/10 pb-2.5">
                      Commercial Desk Contact
                    </h3>
                    <div className="space-y-2.5 text-[14px] text-[#243B2C] font-medium leading-relaxed">
                      <div>
                        <span className="font-bold text-[#173B2B] block">Email:</span>
                        <a href="mailto:sales@venuss.co.in" className="hover:text-[#D48B38] transition-colors">sales@venuss.co.in</a>
                      </div>
                      <div>
                        <span className="font-bold text-[#173B2B] block">Phone / WhatsApp:</span>
                        <a href="tel:+914563244154" className="hover:text-[#D48B38] transition-colors">+91 4563 244154 / +91 7708 001856</a>
                      </div>
                      <div>
                        <span className="font-bold text-[#173B2B] block">Facility:</span>
                        <span>Seithur, Rajapalayam, Tamil Nadu, India</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================
              SECTION 6: NEWSLETTER
             ==================================================== */}
          <section className="relative py-20 max-w-4xl mx-auto px-4 text-center overflow-visible">
            <NewsletterBotanicalFrame />

            <div className="bg-white border border-[#173B2B]/15 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm z-[10]">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#D4954B]/10 rounded-full blur-2xl"></div>

              <div className="relative z-10 space-y-4">
                <div className="mx-auto p-3.5 bg-[#FAF9F5] rounded-full w-fit border border-[#173B2B]/15">
                  <Mail className="w-7 h-7 text-[#D4954B]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173B2B] font-heading tracking-tight">Stay Curated</h2>
                <p className="text-base sm:text-[17px] text-[#3D5244] font-normal max-w-md mx-auto leading-relaxed">
                  Subscribe to receive early access to new distillation batches, harvest insights, and technical monographs. No spam, ever.
                </p>
                <form onSubmit={(e) => { 
                  e.preventDefault();
                  if (newsletterEmail.trim()) {
                    if (typeof window !== 'undefined') {
                      const subs = JSON.parse(localStorage.getItem('venuss_newsletter_subscribers') || '[]');
                      const already = subs.some((s: any) => s.email === newsletterEmail.trim());
                      if (!already) {
                        subs.push({ email: newsletterEmail.trim(), subscribed_at: new Date().toISOString() });
                        localStorage.setItem('venuss_newsletter_subscribers', JSON.stringify(subs));
                      }
                    }
                    showToast('Thank you for subscribing! You\'ll receive our botanical updates.', 'success');
                    setNewsletterEmail('');
                  }
                }} className="pt-4 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    className="flex-grow px-4 py-3 bg-white border border-slate-300 rounded-xl text-[15px] focus:outline-none focus:ring-1 focus:ring-[#173B2B] focus:border-[#173B2B] placeholder:text-slate-400 text-[#173B2B] font-medium"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-[14.5px] font-bold uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
}
