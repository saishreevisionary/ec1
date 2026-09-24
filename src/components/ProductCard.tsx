'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Check, Star, ShoppingBag, Leaf, Eye } from 'lucide-react';
import { Product } from '@/lib/seedData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  onQuickView?: (product: Product) => void;
}

interface StageAtmosphere {
  spotlightColor: string;
  ambientColor: string;
  pedestalColor: string;
  botanicalType: 'leaf' | 'spice' | 'seed' | 'flower' | 'petal' | 'herbal';
}

const CATEGORY_STAGES: Record<number, StageAtmosphere> = {
  1: { // ESSENTIAL OILS
    spotlightColor: 'rgba(229, 237, 226, 0.70)',
    ambientColor: '#F6F8F5',
    pedestalColor: 'rgba(165, 195, 160, 0.20)',
    botanicalType: 'leaf',
  },
  2: { // SPICE OILS
    spotlightColor: 'rgba(233, 235, 221, 0.70)',
    ambientColor: '#F7F8F3',
    pedestalColor: 'rgba(185, 195, 155, 0.20)',
    botanicalType: 'spice',
  },
  3: { // SPICE OLEORESINS
    spotlightColor: 'rgba(238, 230, 214, 0.70)',
    ambientColor: '#F8F6F0',
    pedestalColor: 'rgba(200, 185, 155, 0.20)',
    botanicalType: 'seed',
  },
  4: { // FLORAL CONCRETES
    spotlightColor: 'rgba(241, 226, 223, 0.65)',
    ambientColor: '#FAF5F4',
    pedestalColor: 'rgba(205, 175, 170, 0.18)',
    botanicalType: 'flower',
  },
  5: { // FLORAL ABSOLUTES
    spotlightColor: 'rgba(242, 235, 221, 0.70)',
    ambientColor: '#F8F6F0',
    pedestalColor: 'rgba(205, 190, 165, 0.20)',
    botanicalType: 'petal',
  },
  6: { // SPICE POWDERS
    spotlightColor: 'rgba(241, 231, 206, 0.65)',
    ambientColor: '#F9F7EE',
    pedestalColor: 'rgba(205, 190, 150, 0.20)',
    botanicalType: 'herbal',
  },
};

const DEFAULT_STAGE: StageAtmosphere = {
  spotlightColor: 'rgba(242, 237, 225, 0.70)',
  ambientColor: '#F8F6F2',
  pedestalColor: 'rgba(195, 185, 170, 0.18)',
  botanicalType: 'leaf',
};

const BotanicalSilhouette = ({ type }: { type: 'leaf' | 'spice' | 'seed' | 'flower' | 'petal' | 'herbal' }) => {
  if (type === 'flower' || type === 'petal') {
    return (
      <svg
        className="absolute top-[8%] right-[8%] w-[54%] h-[54%] pointer-events-none opacity-[0.04] text-[#254936] transition-transform duration-700 ease-out group-hover:rotate-3"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M50 18 C56 30, 68 30, 80 28 C72 38, 78 50, 75 62 C64 60, 56 68, 50 78 C44 68, 36 60, 25 62 C22 50, 28 38, 20 28 C32 30, 44 30, 50 18 Z" />
        <circle cx="50" cy="48" r="9" />
      </svg>
    );
  }

  if (type === 'spice' || type === 'seed') {
    return (
      <svg
        className="absolute bottom-[10%] right-[8%] w-[50%] h-[50%] pointer-events-none opacity-[0.04] text-[#254936] transition-transform duration-700 ease-out group-hover:scale-105"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M50 15 C54 28, 54 28, 65 22 C64 34, 64 34, 78 35 C70 43, 70 43, 80 54 C68 56, 68 56, 70 68 C58 64, 58 64, 50 75 C42 64, 42 64, 30 68 C32 56, 32 56, 20 54 C30 43, 30 43, 22 35 C36 34, 36 34, 35 22 C46 28, 46 28, 50 15 Z" />
      </svg>
    );
  }

  return (
    <svg
      className="absolute top-[8%] left-[8%] w-[52%] h-[52%] pointer-events-none opacity-[0.04] text-[#254936] transition-transform duration-700 ease-out group-hover:-rotate-3"
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M25 80 C32 55, 48 35, 75 22 C78 48, 60 68, 35 78 Z" />
      <path d="M25 80 Q 52 48 75 22" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M42 62 Q 54 58 62 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M35 71 Q 44 68 50 63" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid', onQuickView }) => {
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const cartItem = cart.find(item => item.product_id === product.id);
  const inCartQty = cartItem?.quantity || 0;
  const isOutOfStock = product.stock_quantity <= 0;

  const stage = CATEGORY_STAGES[product.category_id] || DEFAULT_STAGE;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isFavorite && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('wishlist-item-fly', {
          detail: {
            imageUrl: product.image_url,
            startX: e.clientX,
            startY: e.clientY
          }
        })
      );
    }
    toggleWishlist(product);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('cart-item-fly', {
          detail: {
            imageUrl: product.image_url,
            startX: e.clientX,
            startY: e.clientY
          }
        })
      );
    }
  };

  const categoryLabel = 
    product.category_id === 1 ? 'ESSENTIAL OILS' :
    product.category_id === 2 ? 'SPICE OILS' :
    product.category_id === 3 ? 'SPICE OLEORESINS' :
    product.category_id === 4 ? 'FLORAL CONCRETES' :
    product.category_id === 5 ? 'FLORAL ABSOLUTES' :
    product.category_id === 6 ? 'SPICE POWDERS' : 'BOTANICAL EXTRACTS';

  // ─────────────────────────────────────────────────────────────
  // LIST VIEW VARIANT (When list toggle is active)
  // ─────────────────────────────────────────────────────────────
  if (viewMode === 'list') {
    return (
      <div className="group relative bg-white hover:bg-[#FAF8F2] rounded-2xl flex flex-col sm:flex-row overflow-hidden border border-[#254936]/10 shadow-[0_2px_12px_rgba(16,44,32,0.03)] hover:shadow-[0_8px_24px_rgba(16,44,32,0.06)] transition-all duration-300 p-4 gap-4 items-center">
        <Link 
          href={`/products/${product.slug}`} 
          className="relative w-full sm:w-44 h-44 shrink-0 rounded-xl overflow-hidden"
          style={{ backgroundColor: stage.ambientColor }}
        >
          {imageError ? (
            <div className="h-full w-full flex items-center justify-center bg-[#F4F1EA]">
              <Leaf className="w-8 h-8 text-[#254936]" />
            </div>
          ) : (
            <img
              src={product.image_url}
              alt={product.name}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          )}
        </Link>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="text-[10px] tracking-[0.14em] font-bold text-[#727E72] uppercase mb-1">
            {categoryLabel}
          </div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-lg font-bold text-[#102C20] hover:text-[#254936] transition-colors mb-0.5">
              {product.name}
            </h3>
          </Link>
          {product.tagline && (
            <p className="text-xs text-[#9C6D38] italic font-serif mb-1.5">
              {product.tagline}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-xs text-[#5F7C5D] mb-2">
            <div className="flex text-[#D48B38] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D48B38] text-[#D48B38]" />
              ))}
            </div>
            <span>({product.reviews_count || 48})</span>
          </div>
          <p className="text-xs text-[#5A6E60] line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex items-center gap-4 mt-auto">
            <div>
              <span className="font-serif text-xl font-bold text-[#102C20]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="block text-[10px] text-[#7A8C80]">
                Incl. GST • {isOutOfStock ? 'Sold Out' : 'In Stock'}
              </span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleAddToCartClick}
                disabled={isOutOfStock}
                className="px-5 py-2.5 bg-[#102C20] hover:bg-[#1C4532] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{inCartQty > 0 ? `Added (${inCartQty})` : 'Add to Cart'}</span>
              </button>
              {onQuickView && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onQuickView(product);
                  }}
                  className="w-10 h-10 rounded-xl border border-[#254936]/15 hover:bg-[#FAF8F0] text-[#102C20] flex items-center justify-center transition-colors cursor-pointer"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleWishlistClick}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                  isFavorite ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-[#254936]/15 hover:bg-[#FAF8F0] text-[#254936]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT GRID VIEW VARIANT (Exact match to Reference Image)
  // ─────────────────────────────────────────────────────────────
  const isBestseller = product.badge?.toUpperCase() === 'BESTSELLER';
  const isNew = product.badge?.toUpperCase() === 'NEW';

  return (
    <div className="group relative bg-white hover:bg-[#FAF8F2] rounded-2xl flex flex-col overflow-hidden h-full border border-[#254936]/12 shadow-[0_4px_16px_rgba(16,44,28,0.03)] hover:shadow-[0_12px_28px_rgba(16,44,28,0.08)] transition-all duration-300 ease-out hover:-translate-y-0.5">
      
      {/* 1. PRODUCT PHOTOGRAPHY STAGE */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#FAF8F2]">
        <Link 
          href={`/products/${product.slug}`} 
          className="block w-full h-full relative"
        >
          {/* Subtle Stage Gradient Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
            style={{
              background: `radial-gradient(ellipse at 50% 60%, ${stage.spotlightColor} 0%, transparent 70%)`,
            }}
          />

          {/* High-Resolution Product Photography */}
          {imageError ? (
            <div className="h-full w-full flex flex-col items-center justify-center bg-[#F4F1EA] p-4 text-center">
              <Leaf className="w-7 h-7 text-[#254936] mb-1.5" />
              <span className="text-xs font-serif text-[#102C20] font-semibold">{product.name}</span>
            </div>
          ) : (
            <img
              src={product.image_url}
              alt={product.name}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              loading="lazy"
            />
          )}
        </Link>

        {/* Top-Left Badge (BESTSELLER / NEW / Custom) */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
            <span className={`text-[9px] font-bold tracking-wider uppercase py-0.5 px-2.5 rounded-full shadow-2xs ${
              isBestseller
                ? 'bg-[#B98255] text-white'
                : isNew
                ? 'bg-[#102C20] text-white'
                : 'bg-[#102C20] text-white'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Top-Right Circular Wishlist Button (Matching Reference Image) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full border shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isFavorite
              ? 'border-rose-200 bg-white text-rose-600'
              : 'border-[#254936]/15 bg-white/95 hover:bg-white text-[#102C20]'
          }`}
          title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 transition-transform duration-200 ${isFavorite ? 'fill-rose-500 text-rose-500 scale-105' : 'text-[#102C20]'}`} />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-[#102C20]/45 backdrop-blur-[2px] flex items-center justify-center z-20 pointer-events-none">
            <span className="bg-white text-[#102C20] text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* 2. PRODUCT DETAILS BODY (Matching Reference Image Hierarchy) */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        
        {/* Category Tag: FLORAL ABSOLUTES / ESSENTIAL OILS */}
        <div className="text-[9.5px] tracking-[0.14em] font-bold text-[#727E72] uppercase mb-1">
          {categoryLabel}
        </div>

        {/* Product Title */}
        <Link href={`/products/${product.slug}`} className="block group/title mb-0.5">
          <h3 className="font-serif text-[15px] sm:text-[15.5px] font-bold text-[#102C20] group-hover/title:text-[#254936] transition-colors leading-tight line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Short Editorial Tagline: Pure. Intense. Timeless. */}
        <p className="text-[11px] text-[#727E72] font-normal line-clamp-1 mb-1.5">
          {product.tagline || product.description}
        </p>

        {/* Rating Stars & Count: ★★★★★ (142) */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#5F7C5D] font-normal mb-2">
          <div className="flex text-[#D48B38] gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.round(product.rating || 5) ? 'fill-[#D48B38] text-[#D48B38]' : 'text-slate-200'}`} 
              />
            ))}
          </div>
          <span className="text-[#727E72] text-[11px]">({product.reviews_count || 48})</span>
        </div>

        {/* Price & Stock info: ₹3,850  ₹4,200 / Incl. GST • In Stock */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-[17px] sm:text-[18px] font-bold text-[#102C20]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.original_price && (
              <span className="text-xs text-[#8C9A8E] line-through">
                ₹{product.original_price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <div className="text-[10px] text-[#727E72] font-normal mt-0.5">
            Incl. GST • {isOutOfStock ? <span className="text-rose-600 font-medium">Out of Stock</span> : 'In Stock'}
          </div>
        </div>

        {/* 3. ACTIONS ROW: [ 🛒 Add to Cart ] [ 👁 ] */}
        <div className="mt-auto pt-1 flex items-center gap-2 w-full">
          {isOutOfStock ? (
            <button
              disabled
              className="flex-grow h-9 bg-slate-100 text-slate-400 cursor-not-allowed rounded-lg text-[11px] font-semibold uppercase tracking-wider"
            >
              Sold Out
            </button>
          ) : (
            <>
              {/* Add to Cart Button (Deep Forest Green #102C20) */}
              <button
                type="button"
                onClick={handleAddToCartClick}
                className="flex-1 h-9 px-3 bg-[#102C20] hover:bg-[#1C4532] text-white rounded-lg text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] shadow-2xs cursor-pointer"
                title="Add to Cart"
              >
                {inCartQty > 0 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#F2C94C] stroke-[2.5]" />
                    <span className="truncate">Added ({inCartQty})</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="truncate">Add to Cart</span>
                  </>
                )}
              </button>

              {/* Quick View Button (Eye Icon) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onQuickView) onQuickView(product);
                }}
                className="w-9 h-9 rounded-lg border border-[#254936]/15 bg-white hover:bg-[#F2F5EF] text-[#102C20] flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-2xs"
                title="Quick View"
                aria-label="Quick View"
              >
                <Eye className="w-4 h-4 text-[#102C20]" />
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
