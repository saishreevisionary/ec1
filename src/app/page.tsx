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
import { db } from '@/lib/db';
import { Product, Category, CATEGORIES } from '@/lib/seedData';

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'newarrivals' | 'trending'>('bestsellers');

  useEffect(() => {
    const loadHomeData = async () => {
      // Load categories
      const cats = await db.getCategories();
      setCategories(cats.length > 0 ? cats : CATEGORIES);

      // Load products
      const prods = await db.getProducts();
      setAllProducts(prods);
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
    <>
      <Navbar />

      <main className="flex-grow animate-fade-in bg-[#FAF9F5]">
        {/* HERO SECTION GRID */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT SIDE: Main Hero Slide */}
            <div className="lg:col-span-8 rounded-3xl bg-[#E4ECE5] p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden shadow-sm border border-[#2E5E3E]/10 min-h-[480px]">
              {/* Soft background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#2E5E3E]/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/40 rounded-full blur-2xl -ml-16 -mb-16"></div>

              {/* Top content */}
              <div className="relative z-10 space-y-6 max-w-lg">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2E9]/95 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#2E5E3E] border border-[#2E5E3E]/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4954B]" />
                  <span>Est. 1986 — Global Spice & Botanical Extracts</span>
                </span>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-[#2E5E3E] font-serif">
                  VENUSS HERBO AROMATICS<br />
                  <span className="italic font-serif font-normal text-[#D4954B]">"Nature, Extracted with Precision"</span>
                </h1>
                
                <p className="text-xs sm:text-sm text-[#3A372E]/90 font-light leading-relaxed max-w-md">
                  India's premier manufacturer and exporter of Essential Oils, Spice Oleoresins, Floral Absolutes, Floral Concretes, and Sterilized Spice Powders for global Flavor, Fragrance, Food, and Personal Care industries.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="px-6 py-3 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
                  >
                    <span>EXPLORE CATALOG</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-[#D48B38] hover:bg-[#BF7A2C] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    REQUEST A QUOTE
                  </Link>
                </div>
              </div>

              {/* Botanical extraction visual */}
              <div className="hidden md:block absolute right-6 bottom-0 w-72 h-80 lg:w-80 lg:h-96">
                <img
                  src="https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400&auto=format&fit=crop"
                  alt="Venuss Herbo Botanical Extract"
                  className="w-full h-full object-contain object-bottom drop-shadow-2xl opacity-90"
                />
              </div>

              {/* Bottom badging summary */}
              <div className="relative z-10 pt-8 border-t border-[#2E5E3E]/20 grid grid-cols-3 gap-2 mt-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#2E5E3E] block uppercase">100% Pure Extracts</span>
                  <span className="text-[9px] text-[#3A372E]/70 block font-light">Steam distilled & supercritical</span>
                </div>
                <div className="space-y-1 border-l border-[#2E5E3E]/20 pl-3">
                  <span className="text-[10px] font-bold text-[#2E5E3E] block uppercase">Global Exporter</span>
                  <span className="text-[9px] text-[#3A372E]/70 block font-light">Supplying 40+ countries</span>
                </div>
                <div className="space-y-1 border-l border-[#2E5E3E]/20 pl-3">
                  <span className="text-[10px] font-bold text-[#2E5E3E] block uppercase">Quality Certified</span>
                  <span className="text-[9px] text-[#3A372E]/70 block font-light">ISO, HACCP & FSSAI certified</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Two Promo Cards */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Card 1: Spice Oleoresins */}
              <div className="flex-1 rounded-3xl bg-[#F5F2E9] border border-[#2E5E3E]/15 p-6 flex items-center justify-between relative overflow-hidden group shadow-sm">
                <div className="space-y-3 z-10 max-w-[60%]">
                  <h3 className="text-base font-extrabold text-[#2E5E3E] font-serif leading-snug">
                    Spice Oleoresins & Extracts
                  </h3>
                  <p className="text-[11px] text-[#D4954B] font-bold tracking-wider uppercase">
                    Black Pepper, Cardamom, Capsicum
                  </p>
                  <Link
                    href="/products?category=spice-oleoresins"
                    className="inline-block px-4 py-2 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-full font-bold text-[10px] uppercase tracking-wider transition-colors shadow-sm"
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
              <div className="flex-1 rounded-3xl bg-[#EBE7DC] border border-[#2E5E3E]/15 p-6 flex items-center justify-between relative overflow-hidden group shadow-sm">
                <div className="space-y-3 z-10 max-w-[60%]">
                  <h3 className="text-base font-extrabold text-[#2E5E3E] font-serif leading-snug">
                    Floral Concretes & Absolutes
                  </h3>
                  <p className="text-[11px] text-[#D4954B] font-bold tracking-wider uppercase">
                    Jasmine, Rose & Tuberose
                  </p>
                  <Link
                    href="/products?category=floral-absolutes"
                    className="inline-block px-4 py-2 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-full font-bold text-[10px] uppercase tracking-wider transition-colors shadow-sm"
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
        <section className="py-8 bg-white border-y border-[#2E5E3E]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full group-hover:scale-110 transition-transform duration-500"
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
        <section id="bestsellers" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          
          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#285338]/15 gap-4">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Product Grid (3/4 width) */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>

            {/* Right Col: Trust Badges (1/4 width) */}
            <div className="lg:col-span-3 rounded-2xl bg-white border border-[#285338]/15 p-6 space-y-6 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-lg bg-[#FAF8F2] text-[#285338] border border-[#285338]/10 flex-shrink-0">
                  <Award className="w-5 h-5 text-[#285338]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#285338] uppercase tracking-wider">Est. 1986</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-1">40+ years extraction expertise</p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
                <div className="p-2.5 rounded-lg bg-[#FAF8F2] text-[#285338] border border-[#285338]/10 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#285338]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#285338] uppercase tracking-wider">ISO & HACCP Certified</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-1">Rigorous quality control lab</p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
                <div className="p-2.5 rounded-lg bg-[#FAF8F2] text-[#285338] border border-[#285338]/10 flex-shrink-0">
                  <Truck className="w-5 h-5 text-[#285338]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#285338] uppercase tracking-wider">Global Logistics</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-1">Worldwide air & sea freight</p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
                <div className="p-2.5 rounded-lg bg-[#FAF8F2] text-[#285338] border border-[#285338]/10 flex-shrink-0">
                  <Headphones className="w-5 h-5 text-[#285338]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#285338] uppercase tracking-wider">Direct Sales Support</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-1">Custom quotes & COA certificates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DARK FOREST GREEN CORPORATE ASSURANCE BANNER */}
        <section className="py-12 bg-[#285338] text-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <section className="py-20 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent opacity-10 rounded-full blur-2xl"></div>

            <div className="relative z-10 space-y-4">
              <div className="mx-auto p-3 bg-[#FAF9F5] rounded-full w-fit border border-slate-150">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-serif tracking-tight">Stay Curated</h2>
              <p className="text-sm text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                Subscribe to receive early access to new batches, science essays, and private collections. No spam, ever.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed! Thank you."); }} className="pt-4 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
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
    </>
  );
}
