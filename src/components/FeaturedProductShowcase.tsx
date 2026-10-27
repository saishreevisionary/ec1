'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Heart, 
  Check, 
  ArrowRight, 
  Star, 
  Leaf, 
  ShieldCheck, 
  Droplet, 
  Sparkles,
  MapPin,
  FlaskConical,
  Award
} from 'lucide-react';
import { Product, PRODUCTS } from '@/lib/seedData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

// 5 Flagship Botanical Showcase Products
const SHOWCASE_SLUGS = [
  'jasmine-sambac-absolute',
  'lavender-essential-oil',
  'ceylon-cinnamon-oil',
  'green-cardamom-powder',
  'rose-concrete',
];

export default function FeaturedProductShowcase() {
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [, startTransition] = useTransition();

  // Find showcase products from the catalog
  const showcaseProducts = SHOWCASE_SLUGS.map(slug => 
    PRODUCTS.find(p => p.slug === slug)
  ).filter((p): p is Product => Boolean(p));

  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = showcaseProducts[activeIndex] || showcaseProducts[0];

  if (!activeProduct) return null;

  const isFavorite = isInWishlist(activeProduct.id);
  const cartItem = cart.find(item => item.product_id === activeProduct.id);
  const inCartQty = cartItem?.quantity || 0;
  const isOutOfStock = activeProduct.stock_quantity <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(activeProduct, 1);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('cart-item-fly', {
          detail: {
            imageUrl: activeProduct.image_url,
            startX: e.clientX,
            startY: e.clientY
          }
        })
      );
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFavorite && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('wishlist-item-fly', {
          detail: {
            imageUrl: activeProduct.image_url,
            startX: e.clientX,
            startY: e.clientY
          }
        })
      );
    }
    toggleWishlist(activeProduct);
  };

  const categoryName = 
    activeProduct.category_id === 1 ? 'Essential Oils' :
    activeProduct.category_id === 2 ? 'Spice Oils' :
    activeProduct.category_id === 3 ? 'Spice Oleoresins' :
    activeProduct.category_id === 4 ? 'Floral Concretes' :
    activeProduct.category_id === 5 ? 'Floral Absolutes' :
    activeProduct.category_id === 6 ? 'Spice Powders' : 'Botanical Extracts';

  return (
    <section className="relative w-full my-8 bg-gradient-to-b from-[#FAF8F2] via-white to-[#FAF8F2] rounded-3xl border border-[#254936]/15 shadow-[0_8px_30px_rgba(16,44,32,0.04)] overflow-hidden">
      {/* Decorative Botanical Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#254936]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#B98255]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-7 lg:p-9">
        {/* Section Header Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#254936]/10 gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#B98255] animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#102C20] uppercase">
              FEATURED BOTANICAL SHOWCASE
            </span>
          </div>
          <span className="text-xs text-[#5F7C5D] font-serif italic">
            Artisan Small-Batch Extraction &bull; Meticulous Purity
          </span>
        </div>

        {/* Hero Grid: Left Composition + Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT: Authentic Studio Packaging Photography on Stone Pedestal */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-2xl overflow-hidden bg-[#F6F4ED] border border-[#254936]/12 shadow-[0_4px_20px_rgba(16,44,32,0.06)] group">
              {/* Studio Spotlight Glow removed to eliminate white shade overlay */}

              {/* Product Packaging Image */}
              <img
                key={activeProduct.id}
                src={activeProduct.image_url}
                alt={activeProduct.name}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {activeProduct.badge && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#102C20] text-white shadow-sm">
                    {activeProduct.badge}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-[#254936] border border-[#254936]/15 shadow-2xs">
                  <Leaf className="w-3 h-3 text-[#254936]" />
                  <span>100% Pure Botanical</span>
                </span>
              </div>

              {/* Botanical Watermark */}
              <div className="absolute bottom-4 right-4 z-10 pointer-events-none opacity-30 text-[#102C20]">
                <Leaf className="w-10 h-10" />
              </div>
            </div>
          </div>

          {/* RIGHT: Product Editorial, Specs & Commerce Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
            {/* Category & Origin Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-[0.18em] text-[#B98255] uppercase">
                {categoryName}
              </span>
              <span className="text-[#254936]/30">&bull;</span>
              <span className="text-[11px] text-[#5F7C5D] font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {activeProduct.specs?.Origin || 'India'}
              </span>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#102C20] leading-tight">
              {activeProduct.name}
            </h2>

            {/* Tagline */}
            {activeProduct.tagline && (
              <p className="text-sm font-serif italic text-[#B98255]">
                "{activeProduct.tagline}"
              </p>
            )}

            {/* Star Rating */}
            <div className="flex items-center gap-2 text-xs text-[#5F7C5D]">
              <div className="flex text-[#D48B38] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.round(activeProduct.rating || 5) ? 'fill-[#D48B38] text-[#D48B38]' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              <span className="font-semibold text-[#102C20]">{activeProduct.rating || 5}.0</span>
              <span>&bull;</span>
              <span className="text-[#727E72]">({activeProduct.reviews_count || 120} verified reviews)</span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-[13.5px] text-[#4A5D50] leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Botanical Specification Cards (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="p-2.5 rounded-xl bg-[#FAF8F0] border border-[#254936]/10">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#727E72] mb-0.5">
                  <FlaskConical className="w-3 h-3 text-[#254936]" />
                  <span>Extraction</span>
                </div>
                <div className="text-[11.5px] font-semibold text-[#102C20] truncate">
                  {activeProduct.specs?.['Extraction Method'] || 'Steam Distillation'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAF8F0] border border-[#254936]/10">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#727E72] mb-0.5">
                  <ShieldCheck className="w-3 h-3 text-[#254936]" />
                  <span>Purity Standard</span>
                </div>
                <div className="text-[11.5px] font-semibold text-[#102C20] truncate">
                  {activeProduct.specs?.Purity || '100% Pure & Undiluted'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAF8F0] border border-[#254936]/10">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#727E72] mb-0.5">
                  <Droplet className="w-3 h-3 text-[#254936]" />
                  <span>Aroma Profile</span>
                </div>
                <div className="text-[11.5px] font-semibold text-[#102C20] truncate">
                  {activeProduct.specs?.['Aroma Profile'] || 'Rich & Authentic'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAF8F0] border border-[#254936]/10">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#727E72] mb-0.5">
                  <Award className="w-3 h-3 text-[#254936]" />
                  <span>Botanical Taxon</span>
                </div>
                <div className="text-[11.5px] font-semibold text-[#102C20] italic truncate">
                  {activeProduct.specs?.['Botanical Name'] || 'Botanical extract'}
                </div>
              </div>
            </div>

            {/* Price Row */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#102C20]">
                ₹{activeProduct.price.toLocaleString('en-IN')}
              </span>
              {activeProduct.original_price && (
                <span className="text-sm text-[#8C9A8E] line-through">
                  ₹{activeProduct.original_price.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-[#2E6B44] font-medium bg-[#E8EEE5] px-2.5 py-0.5 rounded-full">
                Incl. 18% GST &bull; In Stock
              </span>
            </div>

            {/* Commerce CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 sm:flex-initial h-11 px-7 bg-[#102C20] hover:bg-[#1C4532] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer disabled:bg-slate-200 disabled:text-slate-400"
              >
                {inCartQty > 0 ? (
                  <>
                    <Check className="w-4 h-4 text-[#F2C94C] stroke-[2.5]" />
                    <span>Added ({inCartQty})</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isFavorite 
                    ? 'border-rose-200 bg-rose-50 text-rose-600' 
                    : 'border-[#254936]/18 bg-white hover:bg-[#FAF8F0] text-[#102C20]'
                }`}
                title={isFavorite ? "Remove from Wishlist" : "Save to Wishlist"}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <Link
                href={`/products/${activeProduct.slug}`}
                className="h-11 px-5 border border-[#254936]/20 bg-white hover:bg-[#FAF8F0] text-[#102C20] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM: Miniature Switcher Bar */}
        <div className="mt-8 pt-5 border-t border-[#254936]/10">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#727E72] mb-3">
            EXPLORE FLAGSHIP VARIETIES:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {showcaseProducts.map((p, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    startTransition(() => {
                      setActiveIndex(idx);
                    });
                  }}
                  className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#102C20] text-white shadow-xs border border-[#102C20]'
                      : 'bg-white hover:bg-[#FAF8F0] text-[#102C20] border border-[#254936]/12'
                  }`}
                >
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-11 h-11 rounded-lg object-cover shrink-0 border border-[#254936]/10"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold truncate leading-tight">
                      {p.name}
                    </div>
                    <div className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-white/70' : 'text-[#727E72]'}`}>
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
