'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  SlidersHorizontal, 
  X, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  LayoutGrid,
  List,
  Leaf,
  Filter
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import CatalogBotanicalFrame from '@/components/CatalogBotanicalFrame';
import { db } from '@/lib/db';
import { Product, Category, PRODUCTS, CATEGORIES } from '@/lib/seedData';

const ALL_RANGES = [
  'Essential Oils',
  'Absolutes',
  'Floral Concretes',
  'Specialities'
] as const;

const ALL_APPLICATIONS = [
  'Fragrance',
  'Aromatherapy'
] as const;

const ALL_FAMILIES = [
  'Floral',
  'Citrus',
  'Woody',
  'Spicy',
  'Fresh / Green'
] as const;

function ProductListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Primary Data State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [loading, setLoading] = useState(false);

  // 6 Filter States (Category + 5 Approved Attributes)
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('');
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [isOrganicOnly, setIsOrganicOnly] = useState<boolean>(false);

  // Search & Sorting States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [countrySearch, setCountrySearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 28; // Accommodates all 27 authoritative products with multi-column alignment

  // Collapsible Sidebar Sections
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(true);
  const [isRangeOpen, setIsRangeOpen] = useState<boolean>(true);
  const [isAppOpen, setIsAppOpen] = useState<boolean>(true);
  const [isFamilyOpen, setIsFamilyOpen] = useState<boolean>(true);
  const [isOriginOpen, setIsOriginOpen] = useState<boolean>(true);
  const [isLabelsOpen, setIsLabelsOpen] = useState<boolean>(true);

  // Mobile Drawer & QuickView
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Load from DB (falls back to enriched PRODUCTS & verified CATEGORIES)
  const loadData = async () => {
    try {
      const [dbProducts, dbCats] = await Promise.all([
        db.getProducts(),
        db.getCategories()
      ]);
      if (dbProducts && dbProducts.length > 0) {
        setProducts(dbProducts);
      }
      if (dbCats && dbCats.length > 0) {
        setCategories(dbCats);
      }
    } catch (err) {
      console.error('Failed to load products/categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__db = db;
    }
    loadData();

    // Listen to real-time category updates from admin
    const handleUpdate = () => {
      loadData();
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

  // Sync initial URL search parameters
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchQuery(q);

    const catParam = searchParams.get('category') || '';
    if (catParam) {
      setSelectedCategorySlug(catParam);
    } else {
      setSelectedCategorySlug('');
    }

    const rangeParam = searchParams.get('range') || '';
    if (rangeParam && ALL_RANGES.includes(rangeParam as any)) {
      setSelectedRanges([rangeParam]);
    }

    const appParam = searchParams.get('application') || searchParams.get('app') || '';
    if (appParam) {
      setSelectedApplications([appParam]);
    }
  }, [searchParams]);

  // Customer-visible products (excludes draft, unpublished, inactive)
  const visibleProducts = useMemo(() => {
    return products.filter(p => 
      p.status !== 'draft' && 
      (p as any).is_active !== false && 
      (p as any).is_published !== false
    );
  }, [products]);

  // Distinct country list extracted dynamically from actual visible product dataset
  const availableCountries = useMemo(() => {
    const set = new Set<string>();
    visibleProducts.forEach(p => {
      if (p.country) set.add(p.country);
    });
    return Array.from(set).sort((a, b) => {
      // Prioritize India, France, Indonesia, Madagascar
      if (a === 'India') return -1;
      if (b === 'India') return 1;
      return a.localeCompare(b);
    });
  }, [visibleProducts]);

  // Filtered countries matching the country search bar
  const displayedCountries = useMemo(() => {
    if (!countrySearch.trim()) return availableCountries;
    const q = countrySearch.toLowerCase().trim();
    return availableCountries.filter(c => c.toLowerCase().includes(q));
  }, [availableCountries, countrySearch]);

  // Accurate dynamic counts for sidebar filters
  const filterCounts = useMemo(() => {
    const categoryCounts: Record<number, number> = {};
    categories.forEach(c => {
      categoryCounts[c.id] = visibleProducts.filter(p => Number(p.category_id) === Number(c.id)).length;
    });

    const rangeCounts: Record<string, number> = {};
    ALL_RANGES.forEach(r => {
      rangeCounts[r] = visibleProducts.filter(p => p.product_range === r).length;
    });

    const appCounts: Record<string, number> = {};
    ALL_APPLICATIONS.forEach(a => {
      appCounts[a] = visibleProducts.filter(p => p.applications && p.applications.includes(a)).length;
    });

    const familyCounts: Record<string, number> = {};
    ALL_FAMILIES.forEach(f => {
      familyCounts[f] = visibleProducts.filter(p => p.olfactory_family === f).length;
    });

    const countryCounts: Record<string, number> = {};
    availableCountries.forEach(c => {
      countryCounts[c] = visibleProducts.filter(p => p.country === c).length;
    });

    const organicCount = visibleProducts.filter(p => Boolean(p.is_organic)).length;

    return {
      categoryCounts,
      rangeCounts,
      appCounts,
      familyCounts,
      countryCounts,
      organicCount
    };
  }, [visibleProducts, categories, availableCountries]);

  // Checkbox toggle handlers
  const toggleCategory = (slug: string) => {
    setSelectedCategorySlug(prev => {
      const slugs = prev ? prev.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) : [];
      const lowerSlug = slug.toLowerCase();
      let nextSlugs: string[];
      if (slugs.includes(lowerSlug)) {
        nextSlugs = slugs.filter(s => s !== lowerSlug);
      } else {
        nextSlugs = [...slugs, lowerSlug];
      }
      const newQuery = nextSlugs.join(',');
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (newQuery) {
          url.searchParams.set('category', newQuery);
        } else {
          url.searchParams.delete('category');
        }
        window.history.replaceState(null, '', url.toString());
      }
      return newQuery;
    });
    setCurrentPage(1);
  };

  const toggleRange = (range: string) => {
    setSelectedRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const toggleApplication = (app: string) => {
    setSelectedApplications(prev => 
      prev.includes(app) ? prev.filter(a => a !== app) : [...prev, app]
    );
  };

  const toggleFamily = (family: string) => {
    setSelectedFamilies(prev => 
      prev.includes(family) ? prev.filter(f => f !== family) : [...prev, family]
    );
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  // Clear all filters action
  const clearAllFilters = () => {
    setSelectedCategorySlug('');
    setSelectedRanges([]);
    setSelectedApplications([]);
    setSelectedFamilies([]);
    setSelectedCountries([]);
    setIsOrganicOnly(false);
    setCountrySearch('');
    setSearchQuery('');
    setCurrentPage(1);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('category');
      url.searchParams.delete('range');
      url.searchParams.delete('application');
      url.searchParams.delete('app');
      url.searchParams.delete('q');
      window.history.replaceState(null, '', url.toString());
    }
  };

  // ─────────────────────────────────────────────────────────────
  // COMBINE FILTERS (OR within same group, AND across groups)
  // ─────────────────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = [...visibleProducts];

    // Global search input
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.botanical_name || '').toLowerCase().includes(q) ||
        (p.cas_number || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q)
      );
    }

    // Category Slug (from homepage category navigation or sidebar - matches dynamic categories)
    if (selectedCategorySlug) {
      const slugs = selectedCategorySlug.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const matchedCats = categories.filter(c => slugs.includes(c.slug.toLowerCase()));
      if (matchedCats.length > 0) {
        const catIds = matchedCats.map(c => Number(c.id));
        result = result.filter(p => catIds.includes(Number(p.category_id)));
      }
    }

    // 1. Product Range (OR)
    if (selectedRanges.length > 0) {
      result = result.filter(p => p.product_range && selectedRanges.includes(p.product_range));
    }

    // 2. Applications (OR)
    if (selectedApplications.length > 0) {
      result = result.filter(p => {
        // If Food & Flavour application is selected, match spice oils, oleoresins, powders
        if (selectedApplications.some(a => a.toLowerCase().includes('food') || a.toLowerCase().includes('flavour'))) {
          if ([2, 3, 6].includes(p.category_id)) return true;
        }
        return p.applications && p.applications.some(a => selectedApplications.includes(a));
      });
    }

    // 3. Olfactory Family (OR)
    if (selectedFamilies.length > 0) {
      result = result.filter(p => p.olfactory_family && selectedFamilies.includes(p.olfactory_family));
    }

    // 4. Countries / Origin (OR)
    if (selectedCountries.length > 0) {
      result = result.filter(p => p.country && selectedCountries.includes(p.country));
    }

    // 5. Labels (Organic certified)
    if (isOrganicOnly) {
      result = result.filter(p => Boolean(p.is_organic));
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
    }

    return result;
  }, [visibleProducts, searchQuery, selectedCategorySlug, selectedRanges, selectedApplications, selectedFamilies, selectedCountries, isOrganicOnly, sortBy]);

  // Reset pagination whenever filters or search query change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategorySlug, selectedRanges, selectedApplications, selectedFamilies, selectedCountries, isOrganicOnly, searchQuery, sortBy]);

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const hasActiveFilters = 
    Boolean(selectedCategorySlug) ||
    selectedRanges.length > 0 ||
    selectedApplications.length > 0 ||
    selectedFamilies.length > 0 ||
    selectedCountries.length > 0 ||
    isOrganicOnly ||
    Boolean(searchQuery.trim());

  // Dynamic header title and breadcrumb
  const headerTitle = useMemo(() => {
    if (selectedCategorySlug) {
      const slugs = selectedCategorySlug.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const matchedCats = categories.filter(c => slugs.includes(c.slug.toLowerCase()));
      if (matchedCats.length === 1) return matchedCats[0].name;
      if (matchedCats.length > 1) {
        if (slugs.includes('spice-oils') && slugs.includes('spice-oleoresins')) return 'Spice Oils & Oleoresins';
        if (slugs.includes('floral-concretes') && slugs.includes('floral-absolutes')) return 'Floral Concretes & Absolutes';
        return matchedCats.map(c => c.name).join(' & ');
      }
    }
    if (selectedApplications.length === 1) {
      if (selectedApplications[0].toLowerCase().includes('food') || selectedApplications[0].toLowerCase().includes('flavour')) {
        return 'Food & Flavour Botanicals';
      }
      return `${selectedApplications[0]} Botanicals`;
    }
    if (selectedRanges.length === 1) return selectedRanges[0];
    if (selectedRanges.length > 1) return selectedRanges.join(' & ');
    if (selectedFamilies.length === 1) return `${selectedFamilies[0]} Botanicals`;
    if (selectedCountries.length === 1) return `Botanicals of ${selectedCountries[0]}`;
    return 'Product Catalogue';
  }, [selectedCategorySlug, categories, selectedRanges, selectedFamilies, selectedCountries, selectedApplications]);

  // Dynamic header subtitle
  const headerSubtitle = useMemo(() => {
    if (selectedCategorySlug) {
      const slugs = selectedCategorySlug.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const matchedCats = categories.filter(c => slugs.includes(c.slug.toLowerCase()));
      if (slugs.includes('spice-oils') && slugs.includes('spice-oleoresins')) {
        return 'Steam-distilled spice oils and concentrated flavor oleoresins capturing full aromatic bouquets and active pungency principles.';
      }
      if (slugs.includes('floral-concretes') && slugs.includes('floral-absolutes')) {
        return 'Natural flower wax concretes and precious solvent-extracted floral absolutes isolated from fresh dawn blossoms for fine perfumery.';
      }
      if (selectedCategorySlug === 'floral-absolutes') return 'Precious, solvent-extracted floral absolutes isolated from fresh dawn-harvested blossoms for fine perfumery.';
      if (selectedCategorySlug === 'floral-concretes') return 'Natural flower wax concretes containing volatile absolutes and protective botanical lipids.';
      if (selectedCategorySlug === 'spice-oleoresins') return 'Concentrated flavor resins containing total volatile oils and active pungency principles.';
      if (selectedCategorySlug === 'spice-powders') return 'Sortex-cleaned, cryogenic micro-milled, and continuous-steam sterilized spice powders.';
      if (selectedCategorySlug === 'spice-oils') return 'Steam-distilled aromatic spice oils from high-curcumin and cineolic Indian cultivars.';
      if (selectedCategorySlug === 'essential-oils') return 'Pure essential oils crafted from the finest botanicals, extracted with care to preserve their natural aroma and therapeutic bioactives.';
      if (matchedCats.length === 1 && matchedCats[0].description) {
        return matchedCats[0].description;
      }
    }
    if (selectedApplications.includes('Fragrance')) {
      return 'Exquisite floral absolutes, concretes, and pure aromatics crafted for fine fragrance and luxury perfumery formulations.';
    }
    if (selectedApplications.includes('Aromatherapy')) {
      return 'Pure, therapeutic-grade steam-distilled essential oils and botanical elixirs to support holistic wellness and aromatherapy.';
    }
    if (selectedApplications.some(a => a.toLowerCase().includes('food') || a.toLowerCase().includes('flavour'))) {
      return 'Authentic, sortex-cleaned spice extracts, oleoresins, and sterilized powders manufactured for food, beverage, and confectionery formulations.';
    }
    return 'Pure essential oils, spice oleoresins, floral absolutes, and sterilized powders manufactured with analytical precision.';
  }, [selectedCategorySlug, categories, selectedApplications]);

  return (
    <div className="relative min-h-screen bg-[#F7F4EA] text-[#2D3748] flex flex-col font-sans">
      <Navbar />

      {/* Decorative Botanical Margin Framing */}
      <CatalogBotanicalFrame />

      {/* =========================================================
          1. CATALOGUE HEADER BANNER (Matching Reference Layout)
         ========================================================= */}
      <section className="relative w-full bg-[#F7F4EA] border-b border-[#173B2B]/10 pt-6 pb-6 lg:pb-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_400px] items-center gap-6">
            
            {/* Left Column: Breadcrumb + Title + Subtitle */}
            <div className="space-y-3 max-w-2xl">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[13.5px] font-medium text-[#48634F]">
                <Link href="/" className="hover:text-[#173B2B] transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#728B79]" />
                <span className="text-[#173B2B] font-bold">{headerTitle}</span>
              </nav>

              {/* Main Heading */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#173B2B] tracking-tight leading-[1.15]">
                {headerTitle}
              </h1>

              {/* Editorial Subtitle */}
              <p className="text-base sm:text-[17.5px] text-[#344C3D] font-normal leading-relaxed">
                {headerSubtitle}
              </p>
            </div>

            {/* Right Column: Seamless Botanical Branch with Golden Oil Drop */}
            <div className="hidden md:flex justify-end items-center h-28 lg:h-32 pointer-events-none select-none">
              <img 
                src="/images/botanical/catalogue-header-branch.png" 
                alt="Botanical branch with hanging pure extract droplet"
                className="h-full object-contain object-right"
              />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          2. MAIN CATALOGUE & FILTER AREA
         ========================================================= */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* =========================================================
            TWO-COLUMN DESKTOP LAYOUT (Left Sidebar + Right Product Grid)
           ========================================================= */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          {/* =======================================================
              3. LEFT FILTER SIDEBAR (Desktop)
             ======================================================= */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-[#173B2B]/12 shadow-xs space-y-6">
            
            {/* Sidebar Title & Clear All Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#173B2B]/10">
              <div className="flex items-center gap-2 text-[15.5px] sm:text-[16px] font-extrabold tracking-wider uppercase text-[#173B2B]">
                <SlidersHorizontal className="w-4 h-4 text-[#173B2B]" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-[13.5px] font-bold text-[#1E5034] hover:underline transition-colors cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* GROUP 0: PRODUCT CATEGORIES */}
            <div className="border-b border-[#173B2B]/10 pb-4">
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex items-center justify-between py-1.5 text-[14.5px] sm:text-[15px] font-bold uppercase tracking-wider text-[#173B2B] cursor-pointer hover:text-[#25523D]"
              >
                <span>Category</span>
                {isCategoryOpen ? <ChevronUp className="w-4 h-4 text-[#173B2B]" /> : <ChevronDown className="w-4 h-4 text-[#173B2B]" />}
              </button>

              {isCategoryOpen && (
                <div className="mt-3 space-y-2.5 animate-fade-in max-h-56 overflow-y-auto pr-1">
                  {categories.filter(c => c.is_active !== false).map(cat => {
                    const count = filterCounts.categoryCounts[cat.id] || 0;
                    const activeSlugs = selectedCategorySlug ? selectedCategorySlug.split(',').map(s => s.trim().toLowerCase()) : [];
                    const checked = activeSlugs.includes(cat.slug.toLowerCase());
                    return (
                      <label key={cat.id} className="flex items-center justify-between text-[14px] sm:text-[15px] text-[#243B2C] hover:text-[#173B2B] cursor-pointer select-none">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCategory(cat.slug)}
                            className="w-4 h-4 rounded border-slate-300 text-[#173B2B] focus:ring-[#173B2B] cursor-pointer accent-[#173B2B]"
                          />
                          <span className={checked ? 'font-bold text-[#173B2B]' : 'font-medium'}>{cat.name}</span>
                        </div>
                        <span className="text-[13px] font-semibold text-[#5A6E60]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* GROUP 1: PRODUCT RANGE */}
            <div className="border-b border-[#173B2B]/10 pb-4">
              <button
                type="button"
                onClick={() => setIsRangeOpen(!isRangeOpen)}
                className="w-full flex items-center justify-between py-1.5 text-[14.5px] sm:text-[15px] font-bold uppercase tracking-wider text-[#173B2B] cursor-pointer hover:text-[#25523D]"
              >
                <span>Product Range</span>
                {isRangeOpen ? <ChevronUp className="w-4 h-4 text-[#173B2B]" /> : <ChevronDown className="w-4 h-4 text-[#173B2B]" />}
              </button>

              {isRangeOpen && (
                <div className="mt-3 space-y-2.5 animate-fade-in">
                  {ALL_RANGES.map(range => {
                    const count = filterCounts.rangeCounts[range] || 0;
                    const checked = selectedRanges.includes(range);
                    return (
                      <label key={range} className="flex items-center justify-between text-[14px] sm:text-[15px] text-[#243B2C] hover:text-[#173B2B] cursor-pointer select-none">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleRange(range)}
                            className="w-4 h-4 rounded border-slate-300 text-[#173B2B] focus:ring-[#173B2B] cursor-pointer accent-[#173B2B]"
                          />
                          <span className={checked ? 'font-bold text-[#173B2B]' : 'font-medium'}>{range}</span>
                        </div>
                        <span className="text-[13px] font-semibold text-[#5A6E60]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* GROUP 2: APPLICATIONS */}
            <div className="border-b border-[#173B2B]/10 pb-4">
              <button
                type="button"
                onClick={() => setIsAppOpen(!isAppOpen)}
                className="w-full flex items-center justify-between py-1.5 text-[14.5px] sm:text-[15px] font-bold uppercase tracking-wider text-[#173B2B] cursor-pointer hover:text-[#25523D]"
              >
                <span>Applications</span>
                {isAppOpen ? <ChevronUp className="w-4 h-4 text-[#173B2B]" /> : <ChevronDown className="w-4 h-4 text-[#173B2B]" />}
              </button>

              {isAppOpen && (
                <div className="mt-3 space-y-2.5 animate-fade-in">
                  {ALL_APPLICATIONS.map(app => {
                    const count = filterCounts.appCounts[app] || 0;
                    const checked = selectedApplications.includes(app);
                    return (
                      <label key={app} className="flex items-center justify-between text-[14px] sm:text-[15px] text-[#243B2C] hover:text-[#173B2B] cursor-pointer select-none">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleApplication(app)}
                            className="w-4 h-4 rounded border-slate-300 text-[#173B2B] focus:ring-[#173B2B] cursor-pointer accent-[#173B2B]"
                          />
                          <span className={checked ? 'font-bold text-[#173B2B]' : 'font-medium'}>{app}</span>
                        </div>
                        <span className="text-[13px] font-semibold text-[#5A6E60]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* GROUP 3: OLFACTORY FAMILY */}
            <div className="border-b border-[#173B2B]/10 pb-4">
              <button
                type="button"
                onClick={() => setIsFamilyOpen(!isFamilyOpen)}
                className="w-full flex items-center justify-between py-1.5 text-[14.5px] sm:text-[15px] font-bold uppercase tracking-wider text-[#173B2B] cursor-pointer hover:text-[#25523D]"
              >
                <span>Olfactory Family</span>
                {isFamilyOpen ? <ChevronUp className="w-4 h-4 text-[#173B2B]" /> : <ChevronDown className="w-4 h-4 text-[#173B2B]" />}
              </button>

              {isFamilyOpen && (
                <div className="mt-3 space-y-2.5 animate-fade-in">
                  {ALL_FAMILIES.map(family => {
                    const count = filterCounts.familyCounts[family] || 0;
                    const checked = selectedFamilies.includes(family);
                    return (
                      <label key={family} className="flex items-center justify-between text-[14px] sm:text-[15px] text-[#243B2C] hover:text-[#173B2B] cursor-pointer select-none">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleFamily(family)}
                            className="w-4 h-4 rounded border-slate-300 text-[#173B2B] focus:ring-[#173B2B] cursor-pointer accent-[#173B2B]"
                          />
                          <span className={checked ? 'font-bold text-[#173B2B]' : 'font-medium'}>{family}</span>
                        </div>
                        <span className="text-[13px] font-semibold text-[#5A6E60]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* GROUP 4: COUNTRIES / ORIGIN (With Searchable Filter Input) */}
            <div className="border-b border-[#173B2B]/10 pb-4">
              <button
                type="button"
                onClick={() => setIsOriginOpen(!isOriginOpen)}
                className="w-full flex items-center justify-between py-1.5 text-[14.5px] sm:text-[15px] font-bold uppercase tracking-wider text-[#173B2B] cursor-pointer hover:text-[#25523D]"
              >
                <span>Countries / Origin</span>
                {isOriginOpen ? <ChevronUp className="w-4 h-4 text-[#173B2B]" /> : <ChevronDown className="w-4 h-4 text-[#173B2B]" />}
              </button>

              {isOriginOpen && (
                <div className="mt-3 space-y-2.5 animate-fade-in">
                  {/* Search Country Input Field */}
                  <div className="relative mb-2.5">
                    <input
                      type="text"
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-[#F7F4EA]/90 border border-[#173B2B]/20 rounded-lg text-[13.5px] sm:text-[14px] text-[#173B2B] placeholder:text-[#5A6E60]/80 focus:outline-none focus:border-[#173B2B]"
                    />
                    <Search className="w-3.5 h-3.5 text-[#5A6E60] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    {countrySearch && (
                      <button
                        type="button"
                        onClick={() => setCountrySearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Country Checkboxes */}
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {displayedCountries.map(country => {
                      const count = filterCounts.countryCounts[country] || 0;
                      const checked = selectedCountries.includes(country);
                      return (
                        <label key={country} className="flex items-center justify-between text-[14px] sm:text-[15px] text-[#243B2C] hover:text-[#173B2B] cursor-pointer select-none">
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCountry(country)}
                              className="w-4 h-4 rounded border-slate-300 text-[#173B2B] focus:ring-[#173B2B] cursor-pointer accent-[#173B2B]"
                            />
                            <span className={checked ? 'font-bold text-[#173B2B]' : 'font-medium'}>{country}</span>
                          </div>
                          <span className="text-[13px] font-semibold text-[#5A6E60]">({count})</span>
                        </label>
                      );
                    })}
                    {displayedCountries.length === 0 && (
                      <div className="text-[12.5px] text-[#5A6E60] py-2 text-center">No matching country</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* GROUP 5: LABELS (Organic Certified) */}
            <div className="pb-2">
              <button
                type="button"
                onClick={() => setIsLabelsOpen(!isLabelsOpen)}
                className="w-full flex items-center justify-between py-1.5 text-[14.5px] sm:text-[15px] font-bold uppercase tracking-wider text-[#173B2B] cursor-pointer hover:text-[#25523D]"
              >
                <span>Labels</span>
                {isLabelsOpen ? <ChevronUp className="w-4 h-4 text-[#173B2B]" /> : <ChevronDown className="w-4 h-4 text-[#173B2B]" />}
              </button>

              {isLabelsOpen && (
                <div className="mt-3 space-y-2.5 animate-fade-in">
                  <label className="flex items-center justify-between text-[14px] sm:text-[15px] text-[#243B2C] hover:text-[#173B2B] cursor-pointer select-none">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isOrganicOnly}
                        onChange={(e) => setIsOrganicOnly(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-[#173B2B] focus:ring-[#173B2B] cursor-pointer accent-[#173B2B]"
                      />
                      <span className={isOrganicOnly ? 'font-bold text-[#173B2B]' : 'font-medium'}>Organic certified</span>
                    </div>
                    <span className="text-[13px] font-semibold text-[#5A6E60]">({filterCounts.organicCount})</span>
                  </label>
                </div>
              )}
            </div>

          </aside>

          {/* =======================================================
              4. RIGHT PRODUCT GRID & CONTROLS (Desktop & Mobile)
             ======================================================= */}
          <div className="flex-1 w-full min-w-0">
            {/* Top Control Bar: [Product Count & Filter Trigger] ------- [Sort by] [View Mode] */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#173B2B]/10 mb-5">
              
              {/* Left: Product Count & Mobile Filter Trigger */}
              <div className="flex items-center gap-3">
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-[#173B2B]">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                </span>

                {/* Mobile Filter Sheet Button */}
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#173B2B]/25 bg-white text-[14px] font-bold text-[#173B2B] shadow-2xs hover:bg-[#F2F5EF] cursor-pointer"
                >
                  <Filter className="w-4 h-4 text-[#173B2B]" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="w-4.5 h-4.5 rounded-full bg-[#173B2B] text-white text-[10px] flex items-center justify-center font-bold">
                      {selectedRanges.length + selectedApplications.length + selectedFamilies.length + selectedCountries.length + (isOrganicOnly ? 1 : 0)}
                    </span>
                  )}
                </button>
              </div>

              {/* Right: Sort By Dropdown & Grid/List View Toggles */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-[14px] text-[#344C3D] font-medium whitespace-nowrap">
                    Sort by:
                  </label>
                  <div className="relative">
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-[#173B2B]/20 rounded-lg text-[14px] font-semibold text-[#173B2B] pl-3.5 pr-8 py-2 focus:outline-none focus:border-[#173B2B] shadow-2xs cursor-pointer"
                    >
                      <option value="newest">Newest First</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#173B2B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* View Mode Toggle: Grid & List */}
                <div className="flex items-center bg-[#DCE5D5]/50 p-0.5 rounded-lg border border-[#173B2B]/10">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#173B2B] text-white shadow-2xs'
                        : 'text-[#5A6E60] hover:text-[#173B2B]'
                    }`}
                    title="Grid View"
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-[#173B2B] text-white shadow-2xs'
                        : 'text-[#5A6E60] hover:text-[#173B2B]'
                    }`}
                    title="List View"
                    aria-label="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Active Filter Chips Row */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-5 animate-fade-in">
                <span className="text-[13.5px] text-[#243B2C] font-bold mr-1">Active filters:</span>
                
                {/* Category Chip */}
                {selectedCategorySlug && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#173B2B] text-white rounded-full text-[13px] font-semibold shadow-2xs">
                    <span>
                      Category:{' '}
                      {(() => {
                        const slugs = selectedCategorySlug.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
                        const matchedCats = categories.filter(c => slugs.includes(c.slug.toLowerCase()));
                        if (matchedCats.length === 1) return matchedCats[0].name;
                        if (slugs.includes('spice-oils') && slugs.includes('spice-oleoresins')) return 'Spice Oils & Oleoresins';
                        if (slugs.includes('floral-concretes') && slugs.includes('floral-absolutes')) return 'Floral Concretes & Absolutes';
                        return matchedCats.map(c => c.name).join(', ') || selectedCategorySlug;
                      })()}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => {
                        setSelectedCategorySlug('');
                        if (typeof window !== 'undefined') {
                          const url = new URL(window.location.href);
                          url.searchParams.delete('category');
                          window.history.replaceState(null, '', url.toString());
                        }
                      }} 
                      className="hover:text-[#DCE5D5] cursor-pointer" 
                      aria-label="Remove category filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {/* Ranges */}
                {selectedRanges.map(r => (
                  <span key={r} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#173B2B]/20 rounded-full text-[13px] font-semibold text-[#173B2B] shadow-2xs">
                    <span>{r}</span>
                    <button type="button" onClick={() => toggleRange(r)} className="hover:text-rose-600 cursor-pointer" aria-label={`Remove filter ${r}`}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {/* Applications */}
                {selectedApplications.map(a => (
                  <span key={a} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#173B2B]/20 rounded-full text-[13px] font-semibold text-[#173B2B] shadow-2xs">
                    <span>{a}</span>
                    <button type="button" onClick={() => toggleApplication(a)} className="hover:text-rose-600 cursor-pointer" aria-label={`Remove filter ${a}`}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {/* Families */}
                {selectedFamilies.map(f => (
                  <span key={f} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#173B2B]/20 rounded-full text-[13px] font-semibold text-[#173B2B] shadow-2xs">
                    <span>{f}</span>
                    <button type="button" onClick={() => toggleFamily(f)} className="hover:text-rose-600 cursor-pointer" aria-label={`Remove filter ${f}`}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {/* Countries */}
                {selectedCountries.map(c => (
                  <span key={c} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#173B2B]/20 rounded-full text-[13px] font-semibold text-[#173B2B] shadow-2xs">
                    <span>{c}</span>
                    <button type="button" onClick={() => toggleCountry(c)} className="hover:text-rose-600 cursor-pointer" aria-label={`Remove filter ${c}`}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {/* Organic */}
                {isOrganicOnly && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#173B2B] text-white rounded-full text-[13px] font-semibold shadow-2xs">
                    <span>Organic Certified</span>
                    <button type="button" onClick={() => setIsOrganicOnly(false)} className="hover:text-[#DCE5D5] cursor-pointer" aria-label="Remove organic certified filter">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {/* Search Query */}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F7F4EA] border border-[#173B2B]/25 text-[#173B2B] rounded-full text-[13px] font-semibold shadow-2xs">
                    <span>Keyword: &ldquo;{searchQuery}&rdquo;</span>
                    <button type="button" onClick={() => setSearchQuery('')} className="hover:text-rose-600 cursor-pointer" aria-label="Clear search keyword">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-[13.5px] font-bold text-[#173B2B] hover:underline ml-2 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
            {filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-3xl border border-[#173B2B]/10 p-12 text-center my-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F0] border border-[#173B2B]/15 flex items-center justify-center mx-auto text-[#173B2B]">
                  <Leaf className="w-8 h-8 opacity-70" />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#173B2B]">No matching botanicals found</h3>
                <p className="text-base text-[#344C3D] max-w-md mx-auto leading-relaxed">
                  We could not find any products matching your specific combination of filters. Try clearing some selections or search terms.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-[14.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Product Grid */
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6'
                  : 'space-y-4'
              }>
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}

            {/* =======================================================
                5. PAGINATION (Centered Page Numbers Matching Reference)
               ======================================================= */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-1.5 sm:space-x-2 select-none">
                {/* Previous Page Button */}
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#173B2B] hover:bg-[#DCE5D5]/50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Number Circles */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show pages if within window or first/last
                  const isCurrent = page === currentPage;
                  const isNear = Math.abs(page - currentPage) <= 2;
                  const isFirst = page === 1;
                  const isLast = page === totalPages;

                  if (totalPages > 8 && !isNear && !isFirst && !isLast) {
                    if (page === 2 || page === totalPages - 1) {
                      return <span key={page} className="px-1 text-[#5A6E60] text-[13px] font-semibold">...</span>;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-full text-[14px] transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#173B2B] text-white shadow-xs font-bold'
                          : 'text-[#173B2B] font-semibold hover:bg-[#DCE5D5]/50'
                      }`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next Page Button */}
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#173B2B] hover:bg-[#DCE5D5]/50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* =========================================================
          6. MOBILE FILTER SLIDE-OVER DRAWER
         ========================================================= */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setShowMobileFilters(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-2 font-heading text-xl font-bold text-[#173B2B]">
                <Filter className="w-4 h-4 text-[#173B2B]" />
                <span>Filters</span>
              </div>
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-500 cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5 text-[#173B2B]" />
              </button>
            </div>

            {/* Scrollable Filters Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              
              {/* Product Category */}
              <div className="border-b border-slate-100 pb-4">
                <div className="text-[14px] font-bold uppercase tracking-wider text-[#173B2B] mb-2.5">Category</div>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {categories.filter(c => c.is_active !== false).map(cat => {
                    const count = filterCounts.categoryCounts[cat.id] || 0;
                    const activeSlugs = selectedCategorySlug ? selectedCategorySlug.split(',').map(s => s.trim().toLowerCase()) : [];
                    const checked = activeSlugs.includes(cat.slug.toLowerCase());
                    return (
                      <label key={cat.id} className="flex items-center justify-between text-[14px] text-[#243B2C] font-medium">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCategory(cat.slug)}
                            className="w-4 h-4 rounded text-[#173B2B] accent-[#173B2B]"
                          />
                          <span className={checked ? 'font-bold text-[#173B2B]' : ''}>{cat.name}</span>
                        </div>
                        <span className="text-[13px] font-semibold text-[#5A6E60]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Product Range */}
              <div className="border-b border-slate-100 pb-4">
                <div className="text-[14px] font-bold uppercase tracking-wider text-[#173B2B] mb-2.5">Product Range</div>
                <div className="space-y-2.5">
                  {ALL_RANGES.map(r => (
                    <label key={r} className="flex items-center justify-between text-[14px] text-[#243B2C] font-medium">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedRanges.includes(r)}
                          onChange={() => toggleRange(r)}
                          className="w-4 h-4 rounded text-[#173B2B] accent-[#173B2B]"
                        />
                        <span className={selectedRanges.includes(r) ? 'font-bold text-[#173B2B]' : ''}>{r}</span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#5A6E60]">({filterCounts.rangeCounts[r] || 0})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className="border-b border-slate-100 pb-4">
                <div className="text-[14px] font-bold uppercase tracking-wider text-[#173B2B] mb-2.5">Applications</div>
                <div className="space-y-2.5">
                  {ALL_APPLICATIONS.map(a => (
                    <label key={a} className="flex items-center justify-between text-[14px] text-[#243B2C] font-medium">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedApplications.includes(a)}
                          onChange={() => toggleApplication(a)}
                          className="w-4 h-4 rounded text-[#173B2B] accent-[#173B2B]"
                        />
                        <span className={selectedApplications.includes(a) ? 'font-bold text-[#173B2B]' : ''}>{a}</span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#5A6E60]">({filterCounts.appCounts[a] || 0})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Olfactory Family */}
              <div className="border-b border-slate-100 pb-4">
                <div className="text-[14px] font-bold uppercase tracking-wider text-[#173B2B] mb-2.5">Olfactory Family</div>
                <div className="space-y-2.5">
                  {ALL_FAMILIES.map(f => (
                    <label key={f} className="flex items-center justify-between text-[14px] text-[#243B2C] font-medium">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedFamilies.includes(f)}
                          onChange={() => toggleFamily(f)}
                          className="w-4 h-4 rounded text-[#173B2B] accent-[#173B2B]"
                        />
                        <span className={selectedFamilies.includes(f) ? 'font-bold text-[#173B2B]' : ''}>{f}</span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#5A6E60]">({filterCounts.familyCounts[f] || 0})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Countries */}
              <div className="border-b border-slate-100 pb-4">
                <div className="text-[14px] font-bold uppercase tracking-wider text-[#173B2B] mb-2.5">Countries / Origin</div>
                <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                  {availableCountries.map(c => (
                    <label key={c} className="flex items-center justify-between text-[14px] text-[#243B2C] font-medium">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedCountries.includes(c)}
                          onChange={() => toggleCountry(c)}
                          className="w-4 h-4 rounded text-[#173B2B] accent-[#173B2B]"
                        />
                        <span className={selectedCountries.includes(c) ? 'font-bold text-[#173B2B]' : ''}>{c}</span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#5A6E60]">({filterCounts.countryCounts[c] || 0})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Labels */}
              <div>
                <div className="text-[14px] font-bold uppercase tracking-wider text-[#173B2B] mb-2.5">Labels</div>
                <label className="flex items-center justify-between text-[14px] text-[#243B2C] font-medium">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isOrganicOnly}
                      onChange={(e) => setIsOrganicOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-[#173B2B] accent-[#173B2B]"
                    />
                    <span className={isOrganicOnly ? 'font-bold text-[#173B2B]' : ''}>Organic certified</span>
                  </div>
                  <span className="text-[13px] font-semibold text-[#5A6E60]">({filterCounts.organicCount})</span>
                </label>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3.5 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-[14.5px] font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="w-full py-2.5 bg-transparent text-[#173B2B] text-[13.5px] font-bold hover:underline cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#102C20]" />
      </div>
    }>
      <ProductListingContent />
    </Suspense>
  );
}
