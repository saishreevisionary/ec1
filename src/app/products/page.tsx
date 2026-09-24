'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  Grid, 
  Search, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  Check, 
  RotateCcw,
  Tag,
  Layers,
  Leaf,
  FlaskConical,
  Globe,
  LayoutGrid,
  List
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import CatalogBotanicalFrame from '@/components/CatalogBotanicalFrame';
import { ProductGridSkeleton } from '@/components/SkeletonCard';
import { db } from '@/lib/db';
import { Product, Category, PRODUCTS, CATEGORIES } from '@/lib/seedData';

const INITIAL_MAX_PRICE = PRODUCTS.length > 0 ? Math.max(...PRODUCTS.map(p => p.price)) : 3000;

function ProductListingContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  // DB States (Initialized with authentic catalog seed data for instant SSR and hydration)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(INITIAL_MAX_PRICE);
  const [maxBoundary, setMaxBoundary] = useState<number>(INITIAL_MAX_PRICE);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;
  
  // Collapsible Section States
  const [isCollectionsOpen, setIsCollectionsOpen] = useState<boolean>(true);
  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(true);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState<boolean>(true);

  // Mobile Filter Drawer Toggle
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Load Initial Data from persistent DB (syncs client storage if modified)
  useEffect(() => {
    const loadData = async () => {
      const allProducts = await db.getProducts();
      const allCategories = await db.getCategories();
      if (allProducts && allProducts.length > 0) {
        setProducts(allProducts);
        const prices = allProducts.map(p => p.price);
        const highestPrice = Math.max(...prices);
        setMaxBoundary(highestPrice);
      }
      if (allCategories && allCategories.length > 0) {
        setCategories(allCategories);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // Sync initial URL parameters
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchQuery(q);

    const catParam = searchParams.get('category') || '';
    if (catParam) {
      setSelectedCategories([catParam]);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  // Handle Category Quick Nav Pills
  const handleQuickCategory = (slug: string | null) => {
    if (!slug) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => (prev.length === 1 && prev[0] === slug ? [] : [slug]));
    }
  };

  // Handle Category Checkbox Toggles
  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    );
  };

  // Preset Price Filter
  const applyPricePreset = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(maxBoundary);
    setInStockOnly(false);
    setSortBy('newest');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(c => {
      counts[c.slug] = products.filter(p => p.category_id === c.id).length;
    });
    return counts;
  }, [categories, products]);

  // Computed / Filtered Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      );
    }

    // Categories
    if (selectedCategories.length > 0) {
      result = result.filter(p => {
        const cat = categories.find(c => c.id === p.category_id);
        return cat && selectedCategories.includes(cat.slug);
      });
    }

    // Price Bounds
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    // In Stock Only
    if (inStockOnly) {
      result = result.filter(p => p.stock_quantity > 0);
    }

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popular') {
      result.sort((a, b) => ((b.rating || 0) * (b.reviews_count || 1)) - ((a.rating || 0) * (a.reviews_count || 1)));
    }

    return result;
  }, [products, categories, selectedCategories, minPrice, maxPrice, inStockOnly, sortBy, searchQuery]);

  // Reset pagination whenever filters, search, or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, minPrice, maxPrice, inStockOnly, sortBy, searchQuery]);

  // Total pages and paginated slice
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Check if any filter is active
  const hasActiveFilters = 
    selectedCategories.length > 0 || 
    inStockOnly || 
    minPrice > 0 || 
    maxPrice < maxBoundary || 
    Boolean(searchQuery.trim());

  // Sidebar-specific active filter counts
  const isPriceFiltered = minPrice > 0 || maxPrice < maxBoundary;
  const activeSidebarFilterCount = 
    selectedCategories.length + 
    (inStockOnly ? 1 : 0) + 
    (isPriceFiltered ? 1 : 0);

  // Active Category Name for single selection breadcrumb
  const activeSingleCategory = useMemo(() => {
    if (selectedCategories.length === 1) {
      return categories.find(c => c.slug === selectedCategories[0]);
    }
    return null;
  }, [selectedCategories, categories]);

  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-[#2D3748] flex flex-col">
      <Navbar />

      {/* Realistic Botanical Margin Framing (Outer 0–8vw edge anchored, center 100% clean) */}
      <CatalogBotanicalFrame />

      {/* 1. FULL-WIDTH BOTANICAL HERO ENVIRONMENT (450–520px desktop, Seamless Edge-to-Edge) */}
      <section className="relative w-full h-[450px] sm:h-[480px] lg:h-[500px] bg-[#FAF8F0] overflow-hidden flex items-center border-b border-[#254936]/10 select-none">
        {/* Full-width panoramic jasmine environment background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/images/botanical/shop-hero-jasmine-env.jpg" 
            alt="Lush Star Jasmine Botanical Scene" 
            className="w-full h-full object-cover object-right md:object-[center_right]"
          />
          {/* Subtle natural organic feathering into cream on the left and bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F0] via-[#FAF8F0]/80 to-transparent w-full md:w-[62%]" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF8F0] to-transparent" />
        </div>

        {/* Hero Editorial Content Container (Centered to max-w-[1440px] page grid) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl lg:max-w-2xl space-y-4">
            {/* Eyebrow Label with Botanical Amber Dot */}
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#B98255]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B98255]" />
              <span>SHOP OUR RANGE</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#102C20] tracking-tight leading-[1.08]">
              Explore the Collection
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-xs sm:text-[14.5px] text-[#5A6E60] font-light leading-relaxed max-w-lg">
              Discover 100% steam-distilled essential oils, cold-pressed spice extracts, floral concretes, absolutes, and pure botanical ingredients.
            </p>

            {/* 3 Botanical Trust Badges with Soft Cream Translucent Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1.5 text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#102C20] bg-white/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#254936]/15 shadow-2xs">
                <Leaf className="w-3.5 h-3.5 text-[#254936]" />
                168 Botanical Formulations
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#102C20] bg-white/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#254936]/15 shadow-2xs">
                <FlaskConical className="w-3.5 h-3.5 text-[#B98255]" />
                6 Specialized Collections
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#102C20] bg-white/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#254936]/15 shadow-2xs">
                <Globe className="w-3.5 h-3.5 text-[#254936]" />
                Export Grade Quality
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN COMMERCE AREA (Centered Container, Compact Spacing) */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 flex-grow w-full">
        {/* Hidden accessible breadcrumb for SEO / screen readers */}
        <nav aria-label="Breadcrumb" className="sr-only">
          <Link href="/">Home</Link>
          <span>/</span>
          <button onClick={() => handleQuickCategory(null)}>Shop Catalog</button>
          {activeSingleCategory && <span>/ {activeSingleCategory.name}</span>}
        </nav>

        {/* Horizontal Category Navigation Pills (Reference Image Single Row) */}
        <div className="mb-4 flex items-center justify-start lg:justify-center overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => handleQuickCategory(null)}
              className={`group px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                selectedCategories.length === 0
                  ? 'bg-[#102C20] text-[#FAF8F2] shadow-sm border border-[#102C20] -translate-y-0.5'
                  : 'bg-[#FAF8F0] hover:bg-[#EAEFE8] text-[#102C20] border border-[#254936]/18 hover:border-[#254936]/35 hover:-translate-y-0.5 shadow-2xs'
              }`}
            >
              <Leaf className={`w-3 h-3 ${selectedCategories.length === 0 ? 'text-[#85B09A]' : 'text-[#5F7C5D]'}`} />
              <span>All Collections</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                selectedCategories.length === 0 
                  ? 'bg-[#254936] text-[#FAF8F2]' 
                  : 'bg-[#254936]/10 text-[#254936] group-hover:bg-[#254936]/15'
              }`}>
                {products.length}
              </span>
            </button>
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat.slug);
              const count = categoryCounts[cat.slug] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleQuickCategory(cat.slug)}
                  className={`group px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#102C20] text-[#FAF8F2] shadow-sm border border-[#102C20] -translate-y-0.5'
                      : 'bg-[#FAF8F0] hover:bg-[#EAEFE8] text-[#102C20] border border-[#254936]/18 hover:border-[#254936]/35 hover:-translate-y-0.5 shadow-2xs'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                    isSelected 
                      ? 'bg-[#254936] text-[#FAF8F2]' 
                      : 'bg-[#254936]/10 text-[#254936] group-hover:bg-[#254936]/15'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body Layout: Sticky Sidebar (Left) + Products Area (Right) */}
        <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6">
          
          {/* 1. COMPACT STICKY BOTANICAL SIDEBAR (Simultaneous Full Visibility, No Internal Scroll) */}
          <aside className="hidden lg:block w-[255px] xl:w-[265px] shrink-0 bg-[#FAF8F0] border border-[#254936]/12 p-3 rounded-2xl shadow-[0_4px_16px_rgba(16,44,32,0.03)] sticky top-[84px] z-20 space-y-2">
            {/* Filter Header */}
            <div className="flex items-start justify-between pb-2 border-b border-[rgba(37,73,54,0.08)]">
              <div>
                <div className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#102C20]" />
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#102C20]">
                    Filter Collection
                  </h2>
                </div>
                <p className="text-[9.5px] text-[#5F7C5D] font-normal leading-tight mt-0.5">
                  {activeSidebarFilterCount > 0 ? `${activeSidebarFilterCount} ${activeSidebarFilterCount === 1 ? 'filter' : 'filters'} active` : 'Refine your botanical selection'}
                </p>
              </div>

              {/* Clear Header Action */}
              {hasActiveFilters && (
                <button 
                  type="button"
                  onClick={resetFilters}
                  className="text-[10px] font-semibold text-[#102C20] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                  title="Clear all filters"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Active Filter Summary Chips (Dynamically Collapses when None Selected) */}
            {activeSidebarFilterCount > 0 && (
              <div className="pb-2 border-b border-[rgba(37,73,54,0.08)]">
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#5F7C5D] mb-1 flex items-center justify-between">
                  <span>{activeSidebarFilterCount} {activeSidebarFilterCount === 1 ? 'Filter' : 'Filters'} Active</span>
                  <button 
                    type="button" 
                    onClick={resetFilters}
                    className="text-[9px] font-medium text-[#B98255] hover:underline cursor-pointer"
                  >
                    Reset all
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {/* Category Chips */}
                  {selectedCategories.map((slug) => {
                    const cat = categories.find(c => c.slug === slug);
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => handleCategoryToggle(slug)}
                        className="group inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#E8EEE5] text-[#254936] border border-[#254936]/15 hover:bg-[#dfe7dc] transition-all cursor-pointer"
                        title={`Remove ${cat?.name || slug} filter`}
                      >
                        <span className="truncate max-w-[100px]">{cat?.name || slug}</span>
                        <X className="w-2.5 h-2.5 text-[#5F7C5D] group-hover:text-[#254936]" />
                      </button>
                    );
                  })}

                  {/* Price Chip */}
                  {isPriceFiltered && (
                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice(0);
                        setMaxPrice(maxBoundary);
                      }}
                      className="group inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#E8EEE5] text-[#254936] border border-[#254936]/15 hover:bg-[#dfe7dc] transition-all cursor-pointer"
                      title="Reset price range"
                    >
                      <span>₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}</span>
                      <X className="w-2.5 h-2.5 text-[#5F7C5D] group-hover:text-[#254936]" />
                    </button>
                  )}

                  {/* Stock Chip */}
                  {inStockOnly && (
                    <button
                      type="button"
                      onClick={() => setInStockOnly(false)}
                      className="group inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#E8EEE5] text-[#254936] border border-[#254936]/15 hover:bg-[#dfe7dc] transition-all cursor-pointer"
                      title="Remove in-stock filter"
                    >
                      <span>In Stock</span>
                      <X className="w-2.5 h-2.5 text-[#5F7C5D] group-hover:text-[#254936]" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Section 1: Collections (Compact Rows, Simultaneous Baseline Alignment) */}
            <div className="pb-2 border-b border-[rgba(37,73,54,0.08)]">
              <button
                type="button"
                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                className="w-full flex items-center justify-between text-[11px] font-bold text-[#102C20] uppercase tracking-wider py-0.5 select-none hover:text-[#254936] transition-colors cursor-pointer"
                aria-expanded={isCollectionsOpen}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-[#5F7C5D] text-xs">▱</span>
                  <span>Collections</span>
                </span>
                <div className="flex items-center gap-1">
                  {selectedCategories.length > 0 && (
                    <span className="text-[9px] font-bold text-[#102C20] bg-[#E8EEE5] px-1.5 py-0.2 rounded-full">
                      {selectedCategories.length}
                    </span>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 text-[#5F7C5D] transition-transform duration-200 ${isCollectionsOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isCollectionsOpen && (
                <div className="mt-1 space-y-0.5">
                  {categories.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.slug);
                    const count = categoryCounts[cat.slug] || 0;
                    return (
                      <div
                        key={cat.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleCategoryToggle(cat.slug)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleCategoryToggle(cat.slug);
                          }
                        }}
                        className={`w-full flex items-center justify-between py-0.5 px-1.5 rounded-md transition-all duration-150 cursor-pointer group text-left ${
                          isChecked
                            ? 'bg-[#EAEFE8] text-[#102C20]'
                            : 'hover:bg-[#F2F5EF] text-[#2D3748]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          {/* Custom Checkbox */}
                          <div
                            className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center shrink-0 transition-all ${
                              isChecked
                                ? 'bg-[#102C20] border-[#102C20]'
                                : 'bg-white border-[#254936]/30 group-hover:border-[#102C20]'
                            }`}
                          >
                            {isChecked && (
                              <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                            )}
                          </div>
                          <span className={`text-[11px] truncate transition-colors ${
                            isChecked ? 'font-semibold text-[#102C20]' : 'font-normal text-[#2D3748] group-hover:text-[#102C20]'
                          }`}>
                            {cat.name}
                          </span>
                        </div>

                        {/* Category Count Mini Capsule */}
                        <span className={`text-[9px] px-1 py-0.2 rounded-full font-medium transition-colors shrink-0 ml-1 ${
                          isChecked
                            ? 'bg-[#102C20]/12 text-[#102C20] font-bold'
                            : 'bg-[#254936]/8 text-[#5F7C5D]'
                        }`}>
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 2: Price (Vertical Radio Presets + Botanical Slider + Compact Dual Inputs) */}
            <div className="pb-2 border-b border-[rgba(37,73,54,0.08)]">
              <button
                type="button"
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                className="w-full flex items-center justify-between text-[11px] font-bold text-[#102C20] uppercase tracking-wider py-0.5 select-none hover:text-[#254936] transition-colors cursor-pointer"
                aria-expanded={isPriceOpen}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-[#5F7C5D] text-xs">◇</span>
                  <span>Price</span>
                </span>
                <div className="flex items-center gap-1">
                  {isPriceFiltered && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#102C20]" />
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 text-[#5F7C5D] transition-transform duration-200 ${isPriceOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isPriceOpen && (
                <div className="mt-1 space-y-1.5">
                  {/* Vertical Radio Presets (Exact Reference Match) */}
                  <div className="space-y-0.5">
                    {[
                      { label: 'Under ₹500', min: 0, max: 500, active: minPrice === 0 && maxPrice === 500 },
                      { label: '₹500 – ₹1k', min: 500, max: 1000, active: minPrice === 500 && maxPrice === 1000 },
                      { label: '₹1k – ₹2k', min: 1000, max: 2000, active: minPrice === 1000 && maxPrice === 2000 },
                      { label: '₹2k+', min: 2000, max: maxBoundary, active: minPrice === 2000 && maxPrice >= maxBoundary },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          if (preset.active) {
                            setMinPrice(0);
                            setMaxPrice(maxBoundary);
                          } else {
                            applyPricePreset(preset.min, preset.max);
                          }
                        }}
                        className={`w-full flex items-center justify-between py-0.5 px-1.5 rounded-md text-[11px] transition-colors cursor-pointer text-left ${
                          preset.active
                            ? 'bg-[#EAEFE8] text-[#102C20] font-semibold'
                            : 'hover:bg-[#F2F5EF] text-[#2D3748] font-normal'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${
                            preset.active ? 'border-[#102C20] bg-white' : 'border-[#254936]/30 bg-white'
                          }`}>
                            {preset.active && <span className="w-1.5 h-1.5 rounded-full bg-[#102C20]" />}
                          </span>
                          <span>{preset.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Botanical Price Slider */}
                  <div className="pt-0.5">
                    <div className="flex justify-between items-center text-[9px] font-medium text-[#5F7C5D] mb-0.5 select-none">
                      <span>₹0</span>
                      <span className="font-semibold text-[#102C20]">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
                      <span>₹{maxBoundary.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={maxBoundary}
                      step={50}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="botanical-range-slider w-full cursor-pointer h-1"
                      style={{
                        background: `linear-gradient(to right, #102C20 0%, #102C20 ${(maxPrice / (maxBoundary || 1)) * 100}%, #E0E7DE ${(maxPrice / (maxBoundary || 1)) * 100}%, #E0E7DE 100%)`
                      }}
                      aria-label="Filter maximum price"
                    />
                  </div>

                  {/* Compact Dual Number Inputs */}
                  <div className="grid grid-cols-2 gap-1 pt-0.5">
                    <div>
                      <span className="text-[8.5px] font-medium text-[#5F7C5D] uppercase tracking-wider block mb-0.5">
                        Min (₹)
                      </span>
                      <div className="flex items-center bg-white border border-[#254936]/20 rounded-md px-1.5 py-0.5 focus-within:border-[#102C20] transition-all">
                        <span className="text-[10px] text-[#5F7C5D] font-medium mr-1 select-none">₹</span>
                        <input
                          type="number"
                          min={0}
                          max={maxPrice}
                          value={minPrice === 0 ? '' : minPrice}
                          onChange={(e) => {
                            const val = Number(e.target.value) || 0;
                            setMinPrice(Math.max(0, val));
                          }}
                          placeholder="0"
                          className="w-full bg-transparent text-[10.5px] text-[#102C20] font-medium focus:outline-none placeholder:text-[#5F7C5D]/40"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-medium text-[#5F7C5D] uppercase tracking-wider block mb-0.5">
                        Max (₹)
                      </span>
                      <div className="flex items-center bg-white border border-[#254936]/20 rounded-md px-1.5 py-0.5 focus-within:border-[#102C20] transition-all">
                        <span className="text-[10px] text-[#5F7C5D] font-medium mr-1 select-none">₹</span>
                        <input
                          type="number"
                          min={minPrice}
                          max={maxBoundary * 2}
                          value={maxPrice === maxBoundary ? '' : maxPrice}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setMaxPrice(val > 0 ? val : maxBoundary);
                          }}
                          placeholder={String(maxBoundary)}
                          className="w-full bg-transparent text-[10.5px] text-[#102C20] font-medium focus:outline-none placeholder:text-[#5F7C5D]/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Availability (Always Simultaneously Visible) */}
            <div className="pb-1">
              <button
                type="button"
                onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
                className="w-full flex items-center justify-between text-[11px] font-bold text-[#102C20] uppercase tracking-wider py-0.5 select-none hover:text-[#254936] transition-colors cursor-pointer"
                aria-expanded={isAvailabilityOpen}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-[#5F7C5D] text-xs">✓</span>
                  <span>Availability</span>
                </span>
                <div className="flex items-center gap-1">
                  {inStockOnly && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#102C20]" />
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 text-[#5F7C5D] transition-transform duration-200 ${isAvailabilityOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isAvailabilityOpen && (
                <div className="mt-1">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setInStockOnly(!inStockOnly)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setInStockOnly(!inStockOnly);
                      }
                    }}
                    className={`w-full flex items-center justify-between py-0.5 px-1.5 rounded-md transition-all duration-150 cursor-pointer group text-left ${
                      inStockOnly
                        ? 'bg-[#EAEFE8] text-[#102C20]'
                        : 'hover:bg-[#F2F5EF] text-[#2D3748]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div
                        className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center shrink-0 transition-all ${
                          inStockOnly
                            ? 'bg-[#102C20] border-[#102C20]'
                            : 'bg-white border-[#254936]/30 group-hover:border-[#102C20]'
                        }`}
                      >
                        {inStockOnly && (
                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                        )}
                      </div>
                      <span className={`text-[11px] transition-colors ${
                        inStockOnly ? 'font-semibold text-[#102C20]' : 'font-normal text-[#2D3748] group-hover:text-[#102C20]'
                      }`}>
                        In Stock Only
                      </span>
                    </div>
                    <span className="text-[9px] text-[#5F7C5D] font-light">
                      Ready to ship
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Clear All Bar */}
            <div className="pt-1.5 border-t border-[rgba(37,73,54,0.08)] flex justify-center">
              <button
                type="button"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider py-0.5 px-2 rounded-md transition-all duration-150 ${
                  hasActiveFilters
                    ? 'text-[#B98255] hover:text-[#102C20] hover:bg-[#254936]/5 cursor-pointer'
                    : 'text-[#5F7C5D]/40 cursor-not-allowed'
                }`}
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Clear all</span>
              </button>
            </div>

            {/* Botanical Corner Watermark */}
            <div className="absolute bottom-0 right-0 pointer-events-none opacity-[0.03] text-[#254936] select-none overflow-hidden w-16 h-16 flex items-end justify-end">
              <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20,80 Q35,45 80,20 Q65,65 20,80 Z" />
                <path d="M20,80 Q45,55 75,25" />
                <path d="M38,62 Q45,58 52,60" />
                <path d="M50,50 Q58,45 66,48" />
                <path d="M32,70 Q30,62 38,62" />
              </svg>
            </div>
          </aside>

          {/* 2. PRODUCT AREA (Right Column: Toolbar + Grid) */}
          <div className="flex-1 min-w-0">
            {/* Product Toolbar: Placed directly above the product grid, aligned with the product area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-1">
              <p className="text-xs sm:text-[13px] text-[#5A6E60] font-normal">
                Showing <strong className="text-[#102C20] font-semibold">{filteredProducts.length > 0 ? `${(currentPage - 1) * itemsPerPage + 1}–${Math.min(currentPage * itemsPerPage, filteredProducts.length)}` : '0'}</strong> of <strong className="text-[#102C20] font-semibold">{filteredProducts.length}</strong> products
              </p>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Mobile Filter Trigger */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#254936]/20 rounded-xl text-xs font-semibold text-[#102C20] hover:bg-[#FAF8F2] shadow-xs cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#102C20]" />
                  <span>Filters {activeSidebarFilterCount > 0 ? `(${activeSidebarFilterCount})` : ''}</span>
                </button>

                {/* Sort Dropdown */}
                <div className="relative flex items-center bg-white border border-[#254936]/15 rounded-full px-3.5 py-1.5 shadow-xs">
                  <span className="text-xs text-[#5A6E60] mr-1.5 whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-[#102C20] border-none focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                </div>

                {/* Segmented View Switch: Grid / List */}
                <div className="hidden sm:flex items-center bg-white border border-[#254936]/15 rounded-xl p-0.5 shadow-xs">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'grid' ? 'bg-[#102C20] text-white' : 'text-[#5A6E60] hover:text-[#102C20]'
                    }`}
                    title="Grid View"
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'list' ? 'bg-[#102C20] text-white' : 'text-[#5A6E60] hover:text-[#102C20]'
                    }`}
                    title="List View"
                    aria-label="List View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : filteredProducts.length === 0 ? (
              /* Botanical Empty State */
              <div className="text-center py-20 bg-white/80 backdrop-blur-sm border border-dashed border-[#2E5E3E]/20 rounded-3xl max-w-xl mx-auto my-8 px-6 shadow-xs">
                <div className="inline-flex p-4 rounded-full bg-[#FAF8F2] border border-[#2E5E3E]/15 shadow-xs text-[#2E5E3E] mb-4">
                  <Leaf className="w-8 h-8 text-[#2E5E3E]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#173F2C]">No Botanical Extracts Found</h3>
                <p className="text-xs sm:text-sm text-[#5A6E60] font-light mt-2 max-w-md mx-auto leading-relaxed">
                  We couldn't find any items matching your active filter criteria. Try adjusting the category, clearing keyword filters, or resetting the price range.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[#2E5E3E] text-white hover:bg-[#1F452C] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            ) : viewMode === 'list' ? (
              /* Products List View */
              <div className="flex flex-col gap-4">
                {paginatedProducts.map((prod) => (
                  <ProductCard 
                    key={prod.id} 
                    product={prod} 
                    viewMode="list" 
                    onQuickView={(p) => setQuickViewProduct(p)} 
                  />
                ))}
              </div>
            ) : (
              /* Products Grid: Wide Desktop (xl): 4 Columns, Standard Desktop (lg): 3 Columns, Tablet: 2 Columns, Mobile: 1 Column */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {paginatedProducts.map((prod) => (
                  <ProductCard 
                    key={prod.id} 
                    product={prod} 
                    viewMode="grid" 
                    onQuickView={(p) => setQuickViewProduct(p)} 
                  />
                ))}
              </div>
            )}

            {/* Botanical Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 mb-4 flex items-center justify-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#254936]/15 text-[#102C20] hover:bg-[#F7F5EE] disabled:opacity-35 disabled:cursor-not-allowed transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      if (totalPages <= 7) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      return false;
                    })
                    .map((page, index, array) => {
                      const prevPage = array[index - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;
                      return (
                        <React.Fragment key={page}>
                          {showEllipsis && (
                            <span className="px-1 text-xs text-[#5F7C5D]">...</span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentPage(page);
                              window.scrollTo({ top: 380, behavior: 'smooth' });
                            }}
                            className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center justify-center cursor-pointer ${
                              currentPage === page
                                ? 'bg-[#102C20] text-white shadow-xs'
                                : 'bg-white border border-[#254936]/15 text-[#2D3748] hover:bg-[#F7F5EE] hover:border-[#254936]/30'
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#254936]/15 text-[#102C20] hover:bg-[#F7F5EE] disabled:opacity-35 disabled:cursor-not-allowed transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* MOBILE FILTER SIDE DRAWER */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#102C20]/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-sm bg-[#FAF8F0] h-full shadow-2xl flex flex-col animate-fade-in overflow-hidden border-l border-[rgba(37,73,54,0.12)]">
            {/* Header */}
            <div className="p-5 pb-4 border-b border-[rgba(37,73,54,0.10)] bg-[#FAF8F0] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#102C20]">
                    Filter Collection
                  </h2>
                  {activeSidebarFilterCount > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#254936] text-[#FAF8F0] tracking-wider uppercase shadow-xs">
                      {activeSidebarFilterCount} Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#5F7C5D] font-normal leading-tight mt-0.5">
                  Refine your botanical selection
                </p>
              </div>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button 
                    type="button"
                    onClick={resetFilters}
                    className="text-[11px] font-semibold text-[#B98255] hover:text-[#102C20] transition-colors p-1 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1.5 rounded-full text-[#5F7C5D] hover:text-[#102C20] hover:bg-[#254936]/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Active Filter Summary Chips if any */}
              {activeSidebarFilterCount > 0 && (
                <div className="pb-4 border-b border-[rgba(37,73,54,0.10)]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#5F7C5D] mb-2 flex items-center justify-between">
                    <span>{activeSidebarFilterCount} {activeSidebarFilterCount === 1 ? 'Filter' : 'Filters'} Active</span>
                    <button 
                      type="button" 
                      onClick={resetFilters}
                      className="text-[10px] font-medium text-[#B98255] hover:underline cursor-pointer"
                    >
                      Reset all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCategories.map((slug) => {
                      const cat = categories.find(c => c.slug === slug);
                      return (
                        <button
                          key={slug}
                          type="button"
                          onClick={() => handleCategoryToggle(slug)}
                          className="group inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#E8EEE5] text-[#254936] border border-[#254936]/15 hover:bg-[#dfe7dc] transition-all cursor-pointer"
                        >
                          <span className="truncate max-w-[120px]">{cat?.name || slug}</span>
                          <X className="w-3 h-3 text-[#5F7C5D]" />
                        </button>
                      );
                    })}
                    {isPriceFiltered && (
                      <button
                        type="button"
                        onClick={() => {
                          setMinPrice(0);
                          setMaxPrice(maxBoundary);
                        }}
                        className="group inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#E8EEE5] text-[#254936] border border-[#254936]/15 hover:bg-[#dfe7dc] transition-all cursor-pointer"
                      >
                        <span>₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}</span>
                        <X className="w-3 h-3 text-[#5F7C5D]" />
                      </button>
                    )}
                    {inStockOnly && (
                      <button
                        type="button"
                        onClick={() => setInStockOnly(false)}
                        className="group inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#E8EEE5] text-[#254936] border border-[#254936]/15 hover:bg-[#dfe7dc] transition-all cursor-pointer"
                      >
                        <span>In Stock</span>
                        <X className="w-3 h-3 text-[#5F7C5D]" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Collections */}
              <div className="pb-5 border-b border-[rgba(37,73,54,0.10)]">
                <button
                  type="button"
                  onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-[#102C20] uppercase tracking-wider py-1 select-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#5F7C5D] text-xs">▱</span>
                    <span>Collections</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {selectedCategories.length > 0 && (
                      <span className="text-[10px] font-bold text-[#254936] bg-[#E8EEE5] px-1.5 py-0.2 rounded-full">
                        {selectedCategories.length}
                      </span>
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 text-[#5F7C5D] transition-transform duration-200 ${isCollectionsOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isCollectionsOpen && (
                  <div className="mt-3 space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {categories.map((cat) => {
                      const isChecked = selectedCategories.includes(cat.slug);
                      const count = categoryCounts[cat.slug] || 0;
                      return (
                        <div
                          key={cat.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => handleCategoryToggle(cat.slug)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleCategoryToggle(cat.slug);
                            }
                          }}
                          className={`w-full flex items-center justify-between py-2 px-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                            isChecked
                              ? 'bg-[#E8EEE5]/90 border-l-[3px] border-l-[#254936] text-[#102C20]'
                              : 'text-[#2D3748] border-l-[3px] border-l-transparent hover:bg-[#E8EEE5]/50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-4 h-4 rounded-[5px] border flex items-center justify-center shrink-0 transition-all duration-200 ${
                                isChecked
                                  ? 'bg-[#254936] border-[#254936]'
                                  : 'bg-white/95 border-[#254936]/30'
                              }`}
                            >
                              {isChecked && (
                                <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                              )}
                            </div>
                            <span className={`text-xs truncate ${isChecked ? 'font-semibold text-[#102C20]' : 'font-normal text-[#2D3748]'}`}>
                              {cat.name}
                            </span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isChecked ? 'bg-white/85 text-[#254936] font-bold shadow-xs' : 'bg-[rgba(37,73,54,0.07)] text-[#5F7C5D]'
                          }`}>
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="py-5 border-b border-[rgba(37,73,54,0.10)]">
                <button
                  type="button"
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-[#102C20] uppercase tracking-wider py-1 select-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#5F7C5D] text-xs">◇</span>
                    <span>Price Range</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isPriceFiltered && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#254936]" />
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 text-[#5F7C5D] transition-transform duration-200 ${isPriceOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isPriceOpen && (
                  <div className="mt-3.5 space-y-4">
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { label: 'Under ₹500', min: 0, max: 500, active: minPrice === 0 && maxPrice === 500 },
                        { label: '₹500–₹1k', min: 500, max: 1000, active: minPrice === 500 && maxPrice === 1000 },
                        { label: '₹1k–₹2k', min: 1000, max: 2000, active: minPrice === 1000 && maxPrice === 2000 },
                        { label: '₹2k+', min: 2000, max: maxBoundary, active: minPrice === 2000 && maxPrice >= maxBoundary },
                      ].map((chip) => (
                        <button
                          key={chip.label}
                          type="button"
                          onClick={() => {
                            if (chip.active) {
                              setMinPrice(0);
                              setMaxPrice(maxBoundary);
                            } else {
                              applyPricePreset(chip.min, chip.max);
                            }
                          }}
                          className={`px-2.5 py-1.5 text-[11px] rounded-lg text-center transition-all cursor-pointer ${
                            chip.active
                              ? 'bg-[#254936] text-white border border-[#254936] font-semibold'
                              : 'bg-[#F1EEE3]/70 text-[#254936] border border-[#254936]/15 font-medium hover:bg-[#E8EEE5]'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>

                    {/* Slider */}
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-medium text-[#5F7C5D] mb-2 select-none">
                        <span>₹0</span>
                        <span className="font-semibold text-[#102C20]">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
                        <span>₹{maxBoundary.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={maxBoundary}
                        step={50}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="botanical-range-slider"
                        style={{
                          background: `linear-gradient(to right, #254936 0%, #254936 ${(maxPrice / (maxBoundary || 1)) * 100}%, #E0E7DE ${(maxPrice / (maxBoundary || 1)) * 100}%, #E0E7DE 100%)`
                        }}
                      />
                    </div>

                    {/* Dual Inputs */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] font-medium text-[#5F7C5D] uppercase tracking-wider block mb-1">
                          Min (₹)
                        </span>
                        <div className="flex items-center bg-white/90 border border-[#254936]/20 rounded-xl px-2.5 py-1.5 focus-within:border-[#254936] focus-within:ring-1 focus-within:ring-[#254936]/25">
                          <span className="text-xs text-[#5F7C5D] font-medium mr-1">₹</span>
                          <input
                            type="number"
                            min={0}
                            max={maxPrice}
                            value={minPrice === 0 ? '' : minPrice}
                            onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value) || 0))}
                            placeholder="0"
                            className="w-full bg-transparent text-xs text-[#102C20] font-medium focus:outline-none placeholder:text-[#5F7C5D]/40"
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-medium text-[#5F7C5D] uppercase tracking-wider block mb-1">
                          Max (₹)
                        </span>
                        <div className="flex items-center bg-white/90 border border-[#254936]/20 rounded-xl px-2.5 py-1.5 focus-within:border-[#254936] focus-within:ring-1 focus-within:ring-[#254936]/25">
                          <span className="text-xs text-[#5F7C5D] font-medium mr-1">₹</span>
                          <input
                            type="number"
                            min={minPrice}
                            max={maxBoundary * 2}
                            value={maxPrice === maxBoundary ? '' : maxPrice}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setMaxPrice(val > 0 ? val : maxBoundary);
                            }}
                            placeholder={String(maxBoundary)}
                            className="w-full bg-transparent text-xs text-[#102C20] font-medium focus:outline-none placeholder:text-[#5F7C5D]/40"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-[#102C20] uppercase tracking-wider py-1 select-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#5F7C5D] text-xs">✓</span>
                    <span>Availability</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {inStockOnly && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#254936]" />
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 text-[#5F7C5D] transition-transform duration-200 ${isAvailabilityOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isAvailabilityOpen && (
                  <div className="mt-3">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setInStockOnly(!inStockOnly)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setInStockOnly(!inStockOnly);
                        }
                      }}
                      className={`w-full flex items-center justify-between py-2 px-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                        inStockOnly
                          ? 'bg-[#E8EEE5]/90 border-l-[3px] border-l-[#254936] text-[#102C20]'
                          : 'text-[#2D3748] border-l-[3px] border-l-transparent hover:bg-[#E8EEE5]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-4 h-4 rounded-[5px] border flex items-center justify-center shrink-0 transition-all duration-200 ${
                            inStockOnly
                              ? 'bg-[#254936] border-[#254936]'
                              : 'bg-white/95 border-[#254936]/30'
                          }`}
                        >
                          {inStockOnly && (
                            <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                          )}
                        </div>
                        <span className={`text-xs ${inStockOnly ? 'font-semibold text-[#102C20]' : 'font-normal text-[#2D3748]'}`}>
                          In Stock Only
                        </span>
                      </div>
                      <span className="text-[10px] text-[#5F7C5D] font-light">
                        Ready to ship
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions at bottom */}
            <div className="p-4 bg-white/90 border-t border-[rgba(37,73,54,0.10)] grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-3 border border-[#254936]/20 text-[#254936] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF8F0] transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-[#254936] text-white hover:bg-[#102C20] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (Botanical Leaf FAB from Reference) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-12 h-12 rounded-full bg-[#102C20] text-white shadow-[0_4px_16px_rgba(16,44,32,0.30)] hover:bg-[#1A4231] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer border border-[#254936]/30 group"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <Leaf className="w-5 h-5 text-[#FAF8F2] group-hover:rotate-12 transition-transform duration-200" />
        </button>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />

      <Footer />
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2E5E3E]"></div>
      </div>
    }>
      <ProductListingContent />
    </Suspense>
  );
}
