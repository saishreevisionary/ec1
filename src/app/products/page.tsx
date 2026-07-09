'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Grid, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { db } from '@/lib/db';
import { Product, Category } from '@/lib/seedData';

function ProductListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // DB States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Mobile Filter Drawer Toggle
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Load Initial Data
  useEffect(() => {
    const loadData = async () => {
      const allProducts = await db.getProducts();
      const allCategories = await db.getCategories();
      setProducts(allProducts);
      setCategories(allCategories);
      
      // Determine max price from seed products to seed the boundary
      if (allProducts.length > 0) {
        const prices = allProducts.map(p => p.price);
        setMaxPrice(Math.max(...prices));
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // Sync URL parameters
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

  // Handle Category Checkbox Toggles
  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(slug)) {
        return prev.filter(c => c !== slug);
      } else {
        return [...prev, slug];
      }
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setMinPrice(0);
    const maxVal = products.length > 0 ? Math.max(...products.map(p => p.price)) : 2000;
    setMaxPrice(maxVal);
    setInStockOnly(false);
    setSortBy('newest');
    setSearchQuery('');
    router.push('/products');
  };

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
    }

    return result;
  }, [products, categories, selectedCategories, minPrice, maxPrice, inStockOnly, sortBy, searchQuery]);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {/* Page Header */}
        <div className="flex flex-col border-b border-slate-100 pb-6 mb-8">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-light mb-2">
            <span>Shop</span>
            <span>/</span>
            <span className="text-primary font-normal">All Collections</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-primary">Store Catalog</h1>
              <p className="text-xs text-slate-500 font-light mt-1">
                Showing {filteredProducts.length} premium hardware {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            
            {/* Quick Actions (Sort / Mobile Filter toggle) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3.5 py-2 bg-white">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-600 uppercase tracking-wider border-none focus:outline-none cursor-pointer"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
          
          {/* 1. SIDEBAR FILTERS (Desktop Only) */}
          <aside className="hidden lg:block space-y-8 bg-slate-50/50 border border-slate-200/40 p-6 rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter By</span>
              </span>
              <button 
                onClick={resetFilters}
                className="text-[10px] font-bold text-accent hover:text-accent-light uppercase tracking-wider"
              >
                Clear All
              </button>
            </div>

            {/* Categories Checklist */}
            <div className="border-t border-slate-200/60 pt-6">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.slug)}
                      onChange={() => handleCategoryToggle(cat.slug)}
                      className="rounded border-slate-300 text-primary focus:ring-primary w-4.5 h-4.5 cursor-pointer accent-primary"
                    />
                    <span className="text-sm font-light text-slate-600 group-hover:text-primary transition-colors capitalize">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Inputs */}
            <div className="border-t border-slate-200/60 pt-6">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Price Range</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-medium text-slate-400">Min (₹)</span>
                  <input
                    type="number"
                    value={minPrice === 0 ? '' : minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-medium text-slate-400">Max (₹)</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    placeholder="2000"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="border-t border-slate-200/60 pt-6">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Status</h3>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4.5 h-4.5 cursor-pointer accent-primary"
                />
                <span className="text-sm font-light text-slate-600">
                  In Stock Only
                </span>
              </label>
            </div>
          </aside>

          {/* 2. PRODUCT GRID (Desktop: 3 Cols, Mobile: 2 Cols) */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-pulse py-12">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-2xl"></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-3xl max-w-xl mx-auto my-8 px-6">
                <span className="inline-block p-4 rounded-full bg-white border border-slate-100 shadow-sm text-slate-400 mb-4">
                  <Grid className="w-8 h-8" />
                </span>
                <h3 className="text-lg font-bold text-primary">No Products Found</h3>
                <p className="text-sm text-slate-400 font-light mt-1.5 max-w-sm mx-auto">
                  We couldn't find any items matching your active filter criteria. Try adjusting the tags or search keywords.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 bg-primary text-white hover:bg-primary-light rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm active:scale-95"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Products Grid */
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE FILTER SIDE DRAWER */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          ></div>

          {/* Drawer Container */}
          <div className="relative w-full max-w-sm bg-white h-full p-6 shadow-2xl flex flex-col animate-fade-in overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <span className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </span>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.slug)}
                      onChange={() => handleCategoryToggle(cat.slug)}
                      className="rounded border-slate-300 text-primary w-4.5 h-4.5 accent-primary"
                    />
                    <span className="text-sm font-light text-slate-600 capitalize">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Bounds */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Price Range</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-medium text-slate-400">Min (₹)</span>
                  <input
                    type="number"
                    value={minPrice === 0 ? '' : minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-medium text-slate-400">Max (₹)</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    placeholder="2000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* In Stock */}
            <div className="mb-8 border-b border-slate-100 pb-6">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Availability</h3>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-slate-300 text-primary w-4.5 h-4.5 accent-primary"
                />
                <span className="text-sm font-light text-slate-600">
                  In Stock Only
                </span>
              </label>
            </div>

            {/* Actions at bottom */}
            <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={resetFilters}
                className="w-full py-3 border border-slate-200 text-slate-500 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-primary text-white hover:bg-primary-light rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    }>
      <ProductListingContent />
    </Suspense>
  );
}
