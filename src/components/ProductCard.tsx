'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Leaf } from 'lucide-react';
import { Product } from '@/lib/seedData';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const router = useRouter();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const isOutOfStock = product.stock_quantity <= 0;
  const isOrganic = Boolean(product.is_organic);

  // Botanical technical details
  const botanicalName = product.botanical_name || product.specs?.['Botanical Name'] || '';
  const casNumber = product.cas_number || product.specs?.['CAS Number'] || product.specs?.['CAS'] || '';
  const country = product.country || product.specs?.['Country'] || 'India';

  // Category eyebrow label
  const rangeLabel = (
    product.product_range?.toUpperCase() ||
    (product.category_id === 5 ? 'FLORAL ABSOLUTES' :
     product.category_id === 4 ? 'FLORAL CONCRETES' :
     product.category_id === 3 ? 'SPICE OLEORESINS' :
     product.category_id === 6 ? 'SPICE POWDERS' : 'ESSENTIAL OILS')
  );

  // Determine appropriate transparent packshot bottle based on range
  const bottlePackshotUrl = (
    product.product_range === 'Absolutes'
      ? '/images/packshots/venuss-absolute-packshot.png'
      : product.product_range === 'Specialities'
      ? '/images/packshots/venuss-speciality-packshot.png'
      : '/images/packshots/venuss-essential-oil-packshot.png'
  );

  // Ensure botanical source image does not use a composite stage crop
  const rawBotanicalImage = (
    (product.image_url && !product.image_url.includes('/showcase/'))
      ? product.image_url
      : (product.images && product.images.find(img => !img.includes('/showcase/'))) || '/images/products/lavender-oil.jpg'
  );

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isFavorite && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('wishlist-item-fly', {
          detail: {
            imageUrl: bottlePackshotUrl,
            startX: e.clientX,
            startY: e.clientY
          }
        })
      );
    }
    toggleWishlist(product);
  };

  // ─────────────────────────────────────────────────────────────
  // REUSABLE 2-LAYER PRODUCT STAGE
  // Layer 1: Circular botanical raw material photograph behind
  // Layer 2: Foreground prominent product bottle with contact shadow
  // ─────────────────────────────────────────────────────────────
  const renderProductStage = (isListView = false) => (
    <div className={`relative ${isListView ? 'w-full sm:w-48 h-48 shrink-0' : 'w-full aspect-[1.12/1] sm:aspect-[1.14/1]'} bg-[#FAF9F5] flex items-center justify-center overflow-hidden p-2 select-none`}>
      <Link 
        href={`/products/${product.slug}`}
        className="w-full h-full flex items-center justify-center relative group/stage"
        tabIndex={-1}
      >
        {/* =======================================================
            LAYER 1 — BOTANICAL SOURCE PLANT (Enlarged Clear Backdrop)
            Visibly expands behind the amber bottle on both sides
            ======================================================= */}
        <div className={`${isListView ? 'w-32 h-32' : 'w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48'} rounded-full overflow-hidden shadow-inner border border-[#173B2B]/12 bg-[#DCE5D5] flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]`}>
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-[#DCE5D5] text-[#173B2B]">
              <Leaf className="w-8 h-8 opacity-60" />
            </div>
          ) : (
            <img
              src={rawBotanicalImage}
              alt={`${product.name} botanical source`}
              className="w-full h-full object-cover object-center filter saturate-[1.05]"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* =======================================================
            LAYER 2 — FOREGROUND AMBER BOTTLE & CONTACT SHADOW
            Standing prominently in front with controlled natural overlap
            ======================================================= */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          {/* Subtle Hover Lift */}
          <div className="relative flex flex-col items-center transform transition-transform duration-300 ease-out group-hover:-translate-y-1">
            <img
              src={bottlePackshotUrl}
              alt={`${product.name} luxury amber apothecary bottle`}
              className={`${isListView ? 'h-32 sm:h-34' : 'h-36 sm:h-40 md:h-42'} w-auto object-contain drop-shadow-[0_8px_16px_rgba(20,40,30,0.20)]`}
              loading="lazy"
            />
            {/* Soft Elliptical Grounded Contact Shadow */}
            <div 
              className={`${isListView ? 'w-20' : 'w-22 sm:w-26 md:w-28'} h-2.5 bg-black/25 rounded-full blur-[3.5px] -mt-1 opacity-85`}
              aria-hidden="true" 
            />
          </div>
        </div>

        {/* =======================================================
            LAYER 3 — ORGANIC CERTIFIED BADGE (If applicable)
            Positioned in top-left to avoid conflict with top-right wishlist heart
            ======================================================= */}
        {isOrganic && (
          <div 
            className="absolute left-3.5 top-3.5 sm:left-4 sm:top-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#173B2B] text-white flex flex-col items-center justify-center shadow-xs border-2 border-white pointer-events-none text-center select-none"
            title="Verified Organic Certified"
          >
            <span className="text-[6px] sm:text-[6.5px] font-extrabold uppercase tracking-tight leading-none text-white">ORGANIC</span>
            <span className="text-[4.5px] sm:text-[5px] font-bold uppercase tracking-widest text-[#DCE5D5] leading-none mt-0.5">CERTIFIED</span>
          </div>
        )}

        {/* =======================================================
            LAYER 4 — RESTRAINED JASMINE ACCENT (Only for Jasmine items)
            ======================================================= */}
        {product.name.toLowerCase().includes('jasmine') && (
          <div className="absolute left-3.5 bottom-3.5 z-20 pointer-events-none opacity-90">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#173B2B]/90 text-white text-[9.5px] font-bold tracking-wider backdrop-blur-xs border border-white/20 shadow-2xs">
              <Leaf className="w-2.5 h-2.5 text-[#A3E635]" />
              <span>Madurai Jasmine</span>
            </span>
          </div>
        )}
      </Link>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // LIST VIEW VARIANT
  // ─────────────────────────────────────────────────────────────
  if (viewMode === 'list') {
    return (
      <article className="group relative bg-white hover:bg-[#FDFCF9] rounded-2xl flex flex-col sm:flex-row overflow-hidden border border-[#173B2B]/10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_24px_rgba(23,59,43,0.07)] transition-all duration-300 p-4 gap-5 items-center">
        {/* Dedicated 2-Layer Stage */}
        {renderProductStage(true)}

        {/* Content Body */}
        <div className="flex flex-col flex-1 min-w-0 w-full py-1">
          <div className="text-xs tracking-wider font-bold text-[#2E5E3E] uppercase mb-1">
            {rangeLabel}
          </div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-heading text-xl sm:text-[22px] font-bold text-[#173B2B] hover:text-[#25523D] transition-colors leading-snug mb-1.5">
              {product.name}
            </h3>
          </Link>
          <div className="text-[14px] text-[#4A5D50] font-medium mb-1">
            Origin: <span className="text-[#173B2B] font-semibold">{country}</span>
          </div>
          <div className="text-[14px] text-[#1E3E2B] font-medium mb-2.5 truncate">
            {botanicalName && <span className="italic mr-2 font-serif text-[#173B2B]">{botanicalName}</span>}
            {casNumber && <span className="text-[#4A5D50]">CAS: <span className="text-[#173B2B] font-mono text-[13px] font-semibold">{casNumber}</span></span>}
          </div>
          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-emerald-700 mb-3.5">
            <span className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-rose-500' : 'bg-emerald-600'}`} />
            <span>{isOutOfStock ? 'Out of stock' : 'In stock for export'}</span>
          </div>

          <div className="flex items-center gap-3 mt-auto">
            <Link
              href={`/products/${product.slug}`}
              className="h-11 px-6 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-[14.5px] font-bold tracking-wide flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              View Details
            </Link>
            <button
              type="button"
              onClick={handleWishlistClick}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isFavorite ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-[#173B2B]/20 hover:bg-[#F7F4EA] text-[#173B2B]'
              }`}
              title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
              aria-label={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`w-4.5 h-4.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-[#173B2B]'}`} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT GRID VIEW VARIANT (Matches E-Robertet Reference Card)
  // ─────────────────────────────────────────────────────────────
  return (
    <article className="group relative bg-white hover:bg-[#FDFCF9] rounded-2xl flex flex-col h-full overflow-hidden border border-[#173B2B]/12 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(23,59,43,0.09)] hover:border-[#173B2B]/25 transition-all duration-300 ease-out">
      
      {/* Top-Right Accessible Wishlist Button */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full border border-[#173B2B]/15 bg-white/95 hover:bg-white flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
        title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
        aria-label={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
      </button>

      {/* 1. DEDICATED 2-LAYER IMAGE STAGE */}
      {renderProductStage(false)}

      {/* 2. PRODUCT INFORMATION HIERARCHY */}
      <div className="p-4 sm:p-5 pt-3 flex flex-col flex-1 bg-white">
        
        {/* Product Range Eyebrow */}
        <div className="text-xs tracking-wider font-bold text-[#2E5E3E] uppercase mb-1">
          {rangeLabel}
        </div>

        {/* Product Name (19–20px bold font-heading with natural wrapping) */}
        <Link href={`/products/${product.slug}`} className="block group/title">
          <h3 className="font-heading text-[19px] sm:text-[20px] font-bold text-[#173B2B] group-hover/title:text-[#25523D] transition-colors leading-[1.25] min-h-[3.15rem] mb-1.5 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Country of Origin */}
        <div className="text-[13.5px] text-[#4A5D50] font-medium mb-1">
          Origin: <span className="text-[#173B2B] font-semibold">{country}</span>
        </div>

        {/* Botanical Name & CAS Number */}
        <div className="text-[13.5px] text-[#1E3E2B] font-medium mb-2.5 truncate">
          {botanicalName && <span className="italic mr-2 font-serif text-[#173B2B]">{botanicalName}</span>}
          {casNumber && (
            <span className="text-[#4A5D50]">
              CAS: <span className="text-[#173B2B] font-mono text-[12.5px] font-semibold">{casNumber}</span>
            </span>
          )}
        </div>

        {/* Stock Status Indicator */}
        <div className="flex items-center gap-2 text-[13px] font-semibold text-emerald-700 mb-4">
          <span className={`w-2 h-2 rounded-full shrink-0 ${isOutOfStock ? 'bg-rose-500' : 'bg-emerald-600'}`} />
          <span>{isOutOfStock ? 'Out of stock' : 'In stock for export'}</span>
        </div>

        {/* 3. ACTIONS ROW: [ View Details ] [ ♡ ] */}
        <div className="mt-auto pt-1 flex items-center gap-2 w-full">
          {/* Prominent View Details Button */}
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 h-11 px-4 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-[14.5px] sm:text-[15px] font-bold tracking-wider flex items-center justify-center transition-all shadow-xs hover:shadow-md text-center active:scale-[0.98] cursor-pointer"
          >
            View Details
          </Link>

          {/* Dedicated Wishlist Action Button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs ${
              isFavorite
                ? 'border-rose-200 bg-rose-50 text-rose-600'
                : 'border-[#173B2B]/20 hover:bg-[#F7F4EA] text-[#173B2B]'
            }`}
            title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            aria-label={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`w-4.5 h-4.5 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-[#173B2B]'}`} />
          </button>
        </div>

      </div>
    </article>
  );
};

export default ProductCard;
