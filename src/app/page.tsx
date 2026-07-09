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
        
        {/* HERO SECTION GRID (Split Main Hero & stacked promo cards) */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT SIDE: Main Hero Slide (2/3 width) */}
            <div className="lg:col-span-8 rounded-3xl bg-[#E3E8DF] p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden shadow-sm border border-slate-200/40 min-h-[480px]">
              {/* Soft leaf background glow overlay */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-700/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/30 rounded-full blur-2xl -ml-16 -mb-16"></div>

              {/* Top content */}
              <div className="relative z-10 space-y-6 max-w-md">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F5]/80 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-primary border border-slate-200/50">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>100% Natural & Safe</span>
                </span>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-primary font-serif">
                  Nourish. Strengthen.<br />
                  <span className="italic font-normal text-primary-light">Shine Naturally</span>
                </h1>
                
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-sm">
                  Premium hair care oils and serums made with pure, cold-pressed ingredients for healthy, beautiful hair.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-md font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/#bestsellers"
                    className="px-6 py-3 bg-white hover:bg-slate-50 text-primary border border-slate-200 rounded-md font-semibold text-xs uppercase tracking-wider transition-all"
                  >
                    Explore Best Sellers
                  </Link>
                </div>
              </div>

              {/* Product bottles absolute placement on large screens */}
              <div className="hidden md:block absolute right-6 bottom-0 w-72 h-80 lg:w-80 lg:h-96">
                <img
                  src="https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400&auto=format&fit=crop"
                  alt="Naturelle Dropper bottles"
                  className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                />
              </div>

              {/* Bottom badging summary */}
              <div className="relative z-10 pt-8 border-t border-slate-300/40 grid grid-cols-3 gap-2 mt-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-primary block">100% Natural</span>
                  <span className="text-[9px] text-slate-500 block font-light">No harmful chemicals</span>
                </div>
                <div className="space-y-1 border-l border-slate-300/40 pl-3">
                  <span className="text-[10px] font-bold text-primary block">Dermatologically Tested</span>
                  <span className="text-[9px] text-slate-500 block font-light">Safe for all hair types</span>
                </div>
                <div className="space-y-1 border-l border-slate-300/40 pl-3">
                  <span className="text-[10px] font-bold text-primary block">Cruelty Free</span>
                  <span className="text-[9px] text-slate-500 block font-light">Not tested on animals</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Two Promo Cards (1/3 width) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Card 1: Rosemary Range */}
              <div className="flex-1 rounded-3xl bg-[#FAF9F5] border border-slate-200/60 p-6 flex items-center justify-between relative overflow-hidden group shadow-sm">
                <div className="space-y-3 z-10 max-w-[60%]">
                  <h3 className="text-base font-extrabold text-primary font-serif leading-snug">
                    Stronger Roots.<br />Longer Hair.
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase">
                    Rosemary Range<br />
                    <span className="text-emerald-700 font-bold">UPTO 20% OFF</span>
                  </p>
                  <Link
                    href="/products?category=rosemary-range"
                    className="inline-block px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-md font-bold text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Shop Rosemary
                  </Link>
                </div>
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative">
                  <img
                    src="https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=300"
                    alt="Rosemary Range"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Card 2: Onion Range */}
              <div className="flex-1 rounded-3xl bg-[#F5F3EC] border border-slate-200/60 p-6 flex items-center justify-between relative overflow-hidden group shadow-sm">
                <div className="space-y-3 z-10 max-w-[60%]">
                  <h3 className="text-base font-extrabold text-primary font-serif leading-snug">
                    Hair Fall Control<br />That Works!
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase">
                    Onion Range<br />
                    <span className="text-emerald-700 font-bold">UPTO 20% OFF</span>
                  </p>
                  <Link
                    href="/products?category=onion-range"
                    className="inline-block px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-md font-bold text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Shop Onion
                  </Link>
                </div>
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative">
                  <img
                    src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=300"
                    alt="Onion Range"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* HORIZONTAL BUBBLE CATEGORIES SCROLL ROW */}
        <section className="py-8 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-none hide-scrollbar justify-between">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className="flex flex-col items-center text-center group flex-shrink-0 min-w-[100px]"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-slate-150 flex items-center justify-center bg-[#FAF9F5] shadow-inner relative group-hover:border-primary/50 transition-all duration-300">
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-primary mt-2 group-hover:text-accent transition-colors">
                    {cat.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-light mt-0.5 line-clamp-1">
                    {cat.description}
                  </span>
                </Link>
              ))}
              
              {/* Extra bubble for 'All Products' */}
              <Link
                href="/products"
                className="flex flex-col items-center text-center group flex-shrink-0 min-w-[100px]"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-slate-150 flex items-center justify-center bg-white shadow-sm relative group-hover:border-primary/50 transition-all duration-300">
                  <span className="text-xl">🌿</span>
                </div>
                <span className="text-[11px] font-bold text-primary mt-2 group-hover:text-accent transition-colors">
                  All Products
                </span>
                <span className="text-[9px] text-slate-400 font-light mt-0.5">
                  View All
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* TABBED BEST SELLERS SECTION (With Right-Side Trust Badges) */}
        <section id="bestsellers" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          
          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200/60 gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-serif flex items-center gap-2">
                <span>Best Sellers</span>
                <span className="text-xl">🌿</span>
              </h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex bg-slate-100 rounded-lg p-1 text-xs">
              <button
                onClick={() => setActiveTab('bestsellers')}
                className={`px-4 py-2 rounded-md font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'bestsellers' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-slate-500 hover:text-primary'
                }`}
              >
                Best Sellers
              </button>
              <button
                onClick={() => setActiveTab('newarrivals')}
                className={`px-4 py-2 rounded-md font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'newarrivals' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-slate-500 hover:text-primary'
                }`}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveTab('trending')}
                className={`px-4 py-2 rounded-md font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'trending' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-slate-500 hover:text-primary'
                }`}
              >
                Trending Now
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
            <div className="lg:col-span-3 rounded-2xl bg-white border border-slate-200/60 p-6 space-y-6 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-lg bg-[#FAF9F5] text-primary border border-slate-150 flex-shrink-0">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Free Shipping</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-1">On orders above ₹999</p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
                <div className="p-2.5 rounded-lg bg-[#FAF9F5] text-primary border border-slate-150 flex-shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Secure Payments</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-1">100% Safe transactions</p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
                <div className="p-2.5 rounded-lg bg-[#FAF9F5] text-primary border border-slate-150 flex-shrink-0">
                  <RotateCcw className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Easy Returns</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-1">Hassle free replacement</p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
                <div className="p-2.5 rounded-lg bg-[#FAF9F5] text-primary border border-slate-150 flex-shrink-0">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Support 24/7</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-1">We are here to help</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DARK GREEN ASSURANCE BANNER */}
        <section className="py-12 bg-primary text-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full border border-white/10">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider">Natural Ingredients</h4>
                <p className="text-[10px] text-slate-300 font-light mt-0.5">Made with the goodness of nature</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full border border-white/10">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider">No Harmful Chemicals</h4>
                <p className="text-[10px] text-slate-300 font-light mt-0.5">Sulfate, Paraben & Silicone Free</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full border border-white/10">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider">Suitable for All Hair</h4>
                <p className="text-[10px] text-slate-300 font-light mt-0.5">Curly, Straight, Wavy blends</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full border border-white/10">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wider">Cruelty Free</h4>
                <p className="text-[10px] text-slate-300 font-light mt-0.5">We love animals. No testing.</p>
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
