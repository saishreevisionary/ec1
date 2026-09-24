'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Shield, 
  ArrowRight, 
  Mail, 
  Star, 
  Lock, 
  RotateCcw, 
  Headphones, 
  Check, 
  Award,
  ChevronRight,
  Heart
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/SkeletonCard';
import GlobalLiveBackground from '@/components/hero/GlobalLiveBackground';
import ProductBotanicalFrame from '@/components/ProductBotanicalFrame';
import NewsletterBotanicalFrame from '@/components/NewsletterBotanicalFrame';
import TrustValueCard from '@/components/TrustValueCard';
import BrandIntro from '@/components/BrandIntro';
import { db } from '@/lib/db';
import { Product, Category, CATEGORIES } from '@/lib/seedData';
import { useToast } from '@/context/ToastContext';

export default function HomePage() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'newarrivals' | 'trending'>('bestsellers');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const loadHomeData = async () => {
      setIsLoadingProducts(true);
      // Load categories
      const cats = await db.getCategories();
      setCategories(cats.length > 0 ? cats : CATEGORIES);

      // Load products
      const prods = await db.getProducts();
      setAllProducts(prods);
      setIsLoadingProducts(false);
    };

    loadHomeData();
  }, []);

  // Filter products based on tabs
  const getTabProducts = () => {
    if (allProducts.length === 0) return [];
    
    if (activeTab === 'bestsellers') {
      // Return first 6 featured items
      return allProducts.slice(0, 6);
    } else if (activeTab === 'newarrivals') {
      // Return new arrivals (items with 'New' badge or slice index 10-16)
      const news = allProducts.filter(p => p.badge === 'New');
      return news.length > 0 ? news.slice(0, 6) : allProducts.slice(10, 16);
    } else {
      // Return trending items (slice index 20-26)
      return allProducts.slice(20, 26);
    }
  };

  const displayedProducts = getTabProducts();

  return (
    <div className="homepage-shell relative min-h-screen isolation-isolate overflow-x-hidden">
      {/* CINEMATIC BRAND INTRO OVERLAY (Plays once per browser session) */}
      <BrandIntro />

      {/* GLOBAL FULL-PAGE LIVE BOTANICAL BACKGROUND */}
      <GlobalLiveBackground />

      <div className="homepage-content relative z-[10]">
        <Navbar />

        <main className="flex-grow animate-fade-in">
          {/* HERO SECTION GRID */}
          <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-[1]">
              
              {/* LEFT SIDE: Main Hero Slide */}
              <div className="lg:col-span-8 p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl bg-[#E4ECE5]/75 backdrop-blur-md shadow-sm border border-[#2E5E3E]/15 min-h-[480px]">
                <div className="hero-content grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] gap-7 lg:gap-8 xl:gap-10 items-center w-full">
                
                {/* Left Column: hero-copy */}
                <div className="hero-copy relative z-[3] flex flex-col justify-between space-y-5 sm:space-y-6 max-w-[570px]">
                  {/* Eyebrow badge */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2E9]/95 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#2E5E3E] border border-[#2E5E3E]/20 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4954B]" />
                      <span>Est. 1986 — Global Spice & Botanical Extracts</span>
                    </span>
                  </div>
                  
                  {/* Heading & Tagline */}
                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-[#173F2C] font-serif max-w-[540px]">
                      VENUSS HERBO AROMATICS
                    </h1>
                    <p className="italic font-serif text-lg sm:text-xl md:text-2xl text-[#C7904A] font-normal leading-snug">
                      "Nature, Extracted with Precision"
                    </p>
                  </div>
                  
                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#234E3A]/90 font-light leading-relaxed max-w-[500px]">
                    India's premier manufacturer and exporter of Essential Oils, Spice Oleoresins, Floral Absolutes, Floral Concretes, and Sterilized Spice Powders for global Flavor, Fragrance, Food, and Personal Care industries.
                  </p>

                  {/* CTA Buttons */}
                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <Link
                      href="/products"
                      className="px-6 py-3 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>EXPLORE CATALOG</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="px-6 py-3 bg-[#D48B38] hover:bg-[#BF7A2C] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-95 shadow-sm cursor-pointer"
                    >
                      REQUEST A QUOTE
                    </Link>
                  </div>

                  {/* Desktop Trust Indicators (rendered inside left column on lg+ screens) */}
                  <div className="hidden lg:grid pt-6 border-t border-[#2E5E3E]/20 grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <span className="text-[10px] xl:text-[11px] font-bold text-[#173F2C] block uppercase">100% Pure Extracts</span>
                      <span className="text-[9px] text-[#234E3A]/80 block font-light leading-tight">Steam distilled & supercritical</span>
                    </div>
                    <div className="space-y-1 border-l border-[#2E5E3E]/20 pl-2.5 xl:pl-3">
                      <span className="text-[10px] xl:text-[11px] font-bold text-[#173F2C] block uppercase">Global Exporter</span>
                      <span className="text-[9px] text-[#234E3A]/80 block font-light leading-tight">Supplying 40+ countries</span>
                    </div>
                    <div className="space-y-1 border-l border-[#2E5E3E]/20 pl-2.5 xl:pl-3">
                      <span className="text-[10px] xl:text-[11px] font-bold text-[#173F2C] block uppercase">Quality Certified</span>
                      <span className="text-[9px] text-[#234E3A]/80 block font-light leading-tight">ISO, HACCP & FSSAI certified</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: hero-visual */}
                <div className="hero-visual relative z-[2] w-full flex flex-col items-center justify-center">
                  <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none h-[250px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[410px] max-h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#2E5E3E]/20 bg-[#FAF9F5]/40 group">
                    <img
                      src="/images/botanical-hero.jpg"
                      alt="Venuss Botanical Dropper Bottle & Herbal Extracts"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Subtle gradient overlay at bottom of card */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#132A1C]/85 via-[#132A1C]/30 to-transparent p-3.5 sm:p-4 pt-10 flex flex-col justify-end">
                      <span className="text-[10.5px] sm:text-[11px] font-bold text-white tracking-wider uppercase drop-shadow-xs">
                        Pure Steam Distillation
                      </span>
                      <span className="text-[9px] text-emerald-200/90 font-light drop-shadow-xs">
                        Malabar Cardamom & Botanical Elixirs
                      </span>
                    </div>

                    {/* Floating Product Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#2E5E3E]/20 shadow-xs flex items-center gap-1.5 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D48B38] animate-pulse" />
                      <span className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider text-[#173F2C]">
                        100% Organic Extract
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile / Tablet Trust Indicators (renders below visual on screens < lg) */}
                <div className="lg:hidden col-span-1 pt-5 border-t border-[#2E5E3E]/20 grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#173F2C] block uppercase">100% Pure Extracts</span>
                    <span className="text-[8.5px] text-[#234E3A]/80 block font-light leading-tight">Steam distilled</span>
                  </div>
                  <div className="space-y-1 border-l border-[#2E5E3E]/20 pl-2">
                    <span className="text-[10px] font-bold text-[#173F2C] block uppercase">Global Exporter</span>
                    <span className="text-[8.5px] text-[#234E3A]/80 block font-light leading-tight">40+ countries</span>
                  </div>
                  <div className="space-y-1 border-l border-[#2E5E3E]/20 pl-2">
                    <span className="text-[10px] font-bold text-[#173F2C] block uppercase">Quality Certified</span>
                    <span className="text-[8.5px] text-[#234E3A]/80 block font-light leading-tight">ISO & HACCP</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE: Two Promo Cards */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Card 1: Spice Oleoresins */}
              <div className="flex-1 rounded-3xl bg-[#F5F2E9]/80 backdrop-blur-sm border border-[#2E5E3E]/15 p-6 flex items-center justify-between relative overflow-hidden group shadow-sm transition-all duration-200 hover:scale-[1.01] hover:border-[#D4954B]/40 hover:shadow-md">
                <div className="space-y-3 z-10 max-w-[60%]">
                  <h3 className="text-base font-extrabold text-[#2E5E3E] font-serif leading-snug">
                    Spice Oleoresins & Extracts
                  </h3>
                  <p className="text-[11px] text-[#D4954B] font-bold tracking-wider uppercase">
                    Black Pepper, Cardamom, Capsicum
                  </p>
                  <Link
                    href="/products?category=spice-oleoresins"
                    className="inline-block px-4 py-2 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-full font-bold text-[10px] uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-sm"
                  >
                    View Oleoresins
                  </Link>
                </div>
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative">
                  <img
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300"
                    alt="Spice Oleoresins"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Card 2: Floral Absolutes */}
              <div className="flex-1 rounded-3xl bg-[#EBE7DC]/80 backdrop-blur-sm border border-[#2E5E3E]/15 p-6 flex items-center justify-between relative overflow-hidden group shadow-sm transition-all duration-200 hover:scale-[1.01] hover:border-[#D4954B]/40 hover:shadow-md">
                <div className="space-y-3 z-10 max-w-[60%]">
                  <h3 className="text-base font-extrabold text-[#2E5E3E] font-serif leading-snug">
                    Floral Concretes & Absolutes
                  </h3>
                  <p className="text-[11px] text-[#D4954B] font-bold tracking-wider uppercase">
                    Jasmine, Rose & Tuberose
                  </p>
                  <Link
                    href="/products?category=floral-absolutes"
                    className="inline-block px-4 py-2 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-full font-bold text-[10px] uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-sm"
                  >
                    View Fine Florals
                  </Link>
                </div>
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative">
                  <img
                    src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=300"
                    alt="Floral Absolutes"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* HORIZONTAL BUBBLE CATEGORIES SCROLL ROW */}
        <section className="relative py-8 bg-[#FAF9F5]/70 backdrop-blur-md border-y border-[#2E5E3E]/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
            <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-none hide-scrollbar justify-between">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className="flex flex-col items-center text-center group flex-shrink-0 min-w-[110px]"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-[#2E5E3E]/20 flex items-center justify-center bg-[#F5F2E9] shadow-inner relative group-hover:border-[#D4954B] transition-all duration-300">
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (cat.slug === 'spice-powders' || cat.id === 6) {
                          target.src = '/images/spice-powders.jpg';
                        } else {
                          target.src = '/images/botanical-hero.jpg';
                        }
                      }}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#2E5E3E] mt-2 group-hover:text-[#D4954B] transition-colors uppercase">
                    {cat.name}
                  </span>
                  <span className="text-[9px] text-slate-500 font-light mt-0.5 line-clamp-1">
                    {cat.description}
                  </span>
                </Link>
              ))}
              
              {/* Extra bubble for 'All Products' */}
              <Link
                href="/products"
                className="flex flex-col items-center text-center group flex-shrink-0 min-w-[110px]"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-[#285338]/20 flex items-center justify-center bg-[#285338] shadow-sm relative group-hover:border-[#C88432] transition-all duration-300">
                  <span className="text-xl text-white">🌿</span>
                </div>
                <span className="text-[11px] font-bold text-[#285338] mt-2 group-hover:text-[#C88432] transition-colors uppercase">
                  All Catalog
                </span>
                <span className="text-[9px] text-slate-500 font-light mt-0.5">
                  View 200+ Products
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* TABBED BEST SELLERS SECTION */}
        <section id="bestsellers" className="relative py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 overflow-visible">
          {/* Art-Directed Editorial Botanical Frame around Product Grid */}
          <ProductBotanicalFrame />
          
          {/* Header & Tabs */}
          <div className="relative z-[10] flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#285338]/15 gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#285338] tracking-tight font-serif flex items-center gap-2">
                <span>Featured Botanical Products</span>
                <span className="text-xl">🌿</span>
              </h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex bg-[#EAE7DC] rounded-full p-1 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('bestsellers')}
                className={`px-5 py-2 rounded-full transition-all ${
                  activeTab === 'bestsellers' 
                    ? 'bg-[#285338] text-white shadow-sm' 
                    : 'text-[#1F2D24]/70 hover:text-[#285338]'
                }`}
              >
                Top Extracts
              </button>
              <button
                onClick={() => setActiveTab('newarrivals')}
                className={`px-5 py-2 rounded-full transition-all ${
                  activeTab === 'newarrivals' 
                    ? 'bg-[#285338] text-white shadow-sm' 
                    : 'text-[#1F2D24]/70 hover:text-[#285338]'
                }`}
              >
                New Batches
              </button>
              <button
                onClick={() => setActiveTab('trending')}
                className={`px-5 py-2 rounded-full transition-all ${
                  activeTab === 'trending' 
                    ? 'bg-[#285338] text-white shadow-sm' 
                    : 'text-[#1F2D24]/70 hover:text-[#285338]'
                }`}
              >
                Export Select
              </button>
            </div>
          </div>

          <div className="relative z-[10] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Product Grid (3/4 width) */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {isLoadingProducts ? (
                <ProductGridSkeleton count={6} />
              ) : (
                displayedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))
              )}
            </div>

            {/* Right Col: Trust Badges (1/4 width) */}
            <div className="lg:col-span-3 lg:sticky lg:top-24">
              <TrustValueCard />
            </div>
          </div>
        </section>

        {/* DARK FOREST GREEN CORPORATE ASSURANCE BANNER */}
        <section className="relative py-12 bg-[#285338] text-white w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-[1]">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full border border-white/10">
                <Award className="w-6 h-6 text-[#C88432]" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-wider uppercase">100% Pure Extracts</h4>
                <p className="text-[10px] text-emerald-100/80 font-light mt-0.5">Unadulterated botanical oils</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full border border-white/10">
                <Shield className="w-6 h-6 text-[#C88432]" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-wider uppercase">Steam Sterilized</h4>
                <p className="text-[10px] text-emerald-100/80 font-light mt-0.5">Zero ETO chemical treatments</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full border border-white/10">
                <Sparkles className="w-6 h-6 text-[#C88432]" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-wider uppercase">Custom Formulations</h4>
                <p className="text-[10px] text-emerald-100/80 font-light mt-0.5">Tailored active specs for clients</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full border border-white/10">
                <ShieldCheck className="w-6 h-6 text-[#C88432]" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-wider uppercase">Export Certified</h4>
                <p className="text-[10px] text-emerald-100/80 font-light mt-0.5">Full regulatory documentation</p>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="relative py-20 max-w-4xl mx-auto px-4 text-center overflow-visible">
          {/* Dedicated Botanical Margins for Newsletter Section */}
          <NewsletterBotanicalFrame />

          <div className="bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm z-[10]">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent opacity-10 rounded-full blur-2xl"></div>

            <div className="relative z-10 space-y-4">
              <div className="mx-auto p-3 bg-[#FAF9F5] rounded-full w-fit border border-slate-150">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-serif tracking-tight">Stay Curated</h2>
              <p className="text-sm text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                Subscribe to receive early access to new batches, science essays, and private collections. No spam, ever.
              </p>
              <form onSubmit={(e) => { 
                e.preventDefault();
                if (newsletterEmail.trim()) {
                  // Store subscription
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
                  className="flex-grow px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400 text-primary font-light"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-[0.98]"
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
