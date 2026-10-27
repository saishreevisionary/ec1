'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  ShoppingCart, 
  ArrowRight,
  Check,
  Award
} from 'lucide-react';
import { Product, Category, CATEGORIES } from '@/lib/seedData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface FeaturedProductsSectionProps {
  products: Product[];
  categories?: Category[];
}

// 8 flagship botanical products representing all categories with authentic packaging images
const FLAGSHIP_PRODUCT_SLUGS = [
  'jasmine-sambac-absolute',
  'cardamom-oil',
  'jasmine-grandiflorum-absolute',
  'palmarosa-oil',
  'ginger-oil',
  'cardamom-oleoresin',
  'jasmine-sambac-concrete',
  'turmeric-oleoresin',
  'cardamom-powder',
  'davana-oil'
];

export default function FeaturedProductsSection({ 
  products = [], 
  categories = CATEGORIES 
}: FeaturedProductsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Filter or prioritize the flagship products with verified studio packaging photography
  const featuredList = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    
    // Pick matched flagships first
    const matched: Product[] = [];
    FLAGSHIP_PRODUCT_SLUGS.forEach(slug => {
      const p = products.find(prod => prod.slug === slug);
      if (p && !matched.some(m => m.id === p.id)) {
        matched.push(p);
      }
    });

    // If less than 8, fill with top rated active products
    if (matched.length < 8) {
      products.forEach(p => {
        if (!matched.some(m => m.id === p.id) && matched.length < 8) {
          matched.push(p);
        }
      });
    }

    return matched;
  }, [products]);

  // Update scroll arrow state
  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [featuredList]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // Scroll by width of one card + gap or roughly 300-340px
    const cardWidth = el.querySelector<HTMLElement>('.product-showcase-card')?.offsetWidth || 300;
    const scrollAmount = (cardWidth + 20) * (window.innerWidth >= 1024 ? 2 : 1);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const getCategoryName = (categoryId: number) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Botanical Extract';
  };

  return (
    <section id="featured-products" className="relative py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Botanical Ambient Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#2E5E3E]/4 via-[#D4954B]/5 to-[#2E5E3E]/4 blur-3xl pointer-events-none rounded-full" />

      {/* Showcase Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 border-b border-[#173B2B]/12 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAE7DC] text-xs uppercase font-bold tracking-wider text-[#173B2B] border border-[#173B2B]/20 shadow-2xs mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4954B]" />
            <span>OUR BOTANICAL COLLECTION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#173B2B] tracking-tight font-heading">
            Featured Products
          </h2>
          <p className="text-base sm:text-[17px] text-[#243B2C] font-normal mt-1.5 max-w-xl leading-relaxed">
            Handcrafted, steam-distilled, and analytical-grade botanical extracts for global perfumery, cosmetic, and flavor formulation.
          </p>
        </div>

        {/* Carousel Arrow Controls (Desktop & Mobile) */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            id="featured-prev-btn" aria-label="Previous featured products"
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer ${
              canScrollLeft
                ? 'bg-white hover:bg-[#173B2B] text-[#173B2B] hover:text-white border-[#173B2B]/20 shadow-xs hover:shadow-md active:scale-95'
                : 'bg-white/40 text-slate-300 border-slate-200/50 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            id="featured-next-btn" aria-label="Next featured products"
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer ${
              canScrollRight
                ? 'bg-white hover:bg-[#173B2B] text-[#173B2B] hover:text-white border-[#173B2B]/20 shadow-xs hover:shadow-md active:scale-95'
                : 'bg-white/40 text-slate-300 border-slate-200/50 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track: 4 Cards on Desktop (>=1024px) / 2 on Tablet / 1 on Mobile */}
      <div 
        ref={scrollContainerRef}
        id="featured-carousel-container"
        className="relative z-10 flex gap-5 overflow-x-auto pb-6 pt-1 scrollbar-none hide-scrollbar snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {featuredList.map((product) => {
          const isFavorite = isInWishlist(product.id);
          const cartItem = cart.find(item => item.product_id === product.id);
          const inCartQty = cartItem?.quantity || 0;
          const isOutOfStock = product.stock_quantity <= 0;
          const categoryName = getCategoryName(product.category_id);
          const botanicalName = product.specs?.['Botanical Name'] || 'Pure Botanical Extract';

          const bottlePackshotUrl = (
            product.product_range === 'Absolutes'
              ? '/images/packshots/venuss-absolute-packshot.png'
              : product.product_range === 'Specialities'
              ? '/images/packshots/venuss-speciality-packshot.png'
              : '/images/packshots/venuss-essential-oil-packshot.png'
          );

          const rawBotanicalImage = (
            (product.image_url && !product.image_url.includes('/showcase/'))
              ? product.image_url
              : (product.images && product.images.find(img => !img.includes('/showcase/'))) || '/images/products/lavender-oil.jpg'
          );

          return (
            <div
              key={product.id}
              className="product-showcase-card group flex-shrink-0 w-[285px] sm:w-[300px] md:w-[320px] lg:w-[calc(25%-15px)] snap-start bg-[#FAF9F5] border border-[#173B2B]/15 hover:border-[#D4954B]/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* 1. E-ROBERET 2-LAYER BOTANICAL SHOWCASE STAGE */}
              <div className="relative aspect-[1.12/1] w-full overflow-hidden bg-[#FAF9F5] flex items-center justify-center p-3">
                <Link href={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center relative group/stage">
                  {/* Layer 1: Circular botanical photograph */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-inner border border-[#173B2B]/10 bg-[#DCE5D5] flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={rawBotanicalImage}
                      alt={`${product.name} botanical source`}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = '/images/botanical-hero.jpg';
                      }}
                    />
                  </div>

                  {/* Layer 2: Foreground prominent product bottle & grounded contact shadow */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <div className="relative flex flex-col items-center transform transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
                      <img
                        src={bottlePackshotUrl}
                        alt={`${product.name} luxury apothecary bottle`}
                        className="h-36 sm:h-40 w-auto object-contain drop-shadow-[0_6px_14px_rgba(20,40,30,0.18)]"
                        loading="lazy"
                      />
                      <div 
                        className="w-20 sm:w-22 h-2.5 bg-black/25 rounded-full blur-[3.5px] -mt-1.5 opacity-90"
                        aria-hidden="true" 
                      />
                    </div>
                  </div>
                </Link>

                {/* Top-Left Purity Badge */}
                <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#173B2B]/90 backdrop-blur-xs text-[10px] font-extrabold uppercase tracking-wider text-white shadow-2xs">
                    <Award className="w-3 h-3 text-[#E8A555]" />
                    <span>{product.badge || '100% Pure'}</span>
                  </span>
                </div>

                {/* Top-Right Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`absolute top-2.5 right-2.5 z-20 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isFavorite
                      ? 'border-rose-200 bg-rose-50 text-rose-600 shadow-xs'
                      : 'border-[#173B2B]/15 bg-white/90 hover:bg-white text-[#173B2B] hover:text-rose-600 shadow-2xs'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* 2. PRODUCT EDITORIAL & COMMERCE BODY */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  {/* Category Tag & Botanical Taxon */}
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <span className="text-xs font-bold tracking-wider text-[#C7782A] uppercase truncate">
                      {categoryName}
                    </span>
                    <span className="text-[12.5px] font-medium text-[#4A5D50] italic truncate">
                      {botanicalName}
                    </span>
                  </div>

                  {/* Product Title (19-20px font-heading) */}
                  <h3 className="font-heading font-bold text-[19px] sm:text-[20px] text-[#173B2B] leading-[1.25] line-clamp-2 min-h-[3rem] group-hover:text-[#D4954B] transition-colors">
                    <Link href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>

                  {/* Short Description */}
                  <p className="text-[13.5px] sm:text-[14px] text-[#3D5244] font-normal leading-relaxed line-clamp-2 mt-2 min-h-[40px]">
                    {product.description}
                  </p>
                </div>

                {/* 3. COMMERCE FOOTER: PRICE & ACTIONS */}
                <div className="mt-4 pt-3 border-t border-[#173B2B]/10 space-y-3">
                  {/* Price Display */}
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-xl sm:text-2xl font-extrabold text-[#173B2B]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.original_price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{product.original_price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] font-bold text-emerald-800 bg-[#E8EEE5] px-2.5 py-0.5 rounded-full">
                      In Stock
                    </span>
                  </div>

                  {/* Primary Action Button: VIEW DETAILS + Quick Add */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 h-11 px-4 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-[14px] sm:text-[14.5px] font-bold uppercase tracking-wider text-center transition-all duration-200 shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!isOutOfStock) {
                          addToCart(product, 1);
                        }
                      }}
                      disabled={isOutOfStock}
                      title={inCartQty > 0 ? `In Cart (${inCartQty})` : 'Add to cart'}
                      className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        inCartQty > 0
                          ? 'bg-[#173B2B] text-[#F2C94C] border-[#173B2B]'
                          : 'bg-white hover:bg-[#FAF8F0] border-[#173B2B]/20 text-[#173B2B] shadow-2xs hover:border-[#173B2B]/40'
                      }`}
                    >
                      {inCartQty > 0 ? (
                        <Check className="w-4.5 h-4.5 stroke-[2.5]" />
                      ) : (
                        <ShoppingCart className="w-4.5 h-4.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* VIEW ALL CTA BUTTON (Prominently positioned after product showcase) */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-6 sm:pt-8 text-center">
        <Link
          id="featured-view-all-btn"
          href="/products"
          className="inline-flex items-center gap-2.5 px-9 sm:px-11 py-4 rounded-full bg-[#173B2B] hover:bg-[#204E39] text-white font-bold text-[14.5px] sm:text-[15px] uppercase tracking-wider shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-[#D4954B]/30 cursor-pointer group"
        >
          <span>VIEW ALL PRODUCTS</span>
          <ArrowRight className="w-4 h-4 text-[#D4954B] transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
        <p className="text-sm sm:text-[15px] text-[#3D5244] font-normal mt-3 max-w-md">
          Explore our complete catalog of {products.length > 0 ? products.length : 'all'} pure essential oils, absolutes, concretes &amp; standardized spice extracts.
        </p>
      </div>
    </section>
  );
}
