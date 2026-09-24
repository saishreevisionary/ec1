'use client';

import React, { useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Check, Leaf, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '@/lib/seedData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Close on ESC key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isFavorite = isInWishlist(product.id);
  const cartItem = cart.find(item => item.product_id === product.id);
  const inCartQty = cartItem?.quantity || 0;
  const isOutOfStock = product.stock_quantity <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const categoryLabel = 
    product.category_id === 1 ? 'ESSENTIAL OILS' :
    product.category_id === 2 ? 'SPICE OILS' :
    product.category_id === 3 ? 'SPICE OLEORESINS' :
    product.category_id === 4 ? 'FLORAL CONCRETES' :
    product.category_id === 5 ? 'FLORAL ABSOLUTES' :
    product.category_id === 6 ? 'SPICE POWDERS' : 'BOTANICAL EXTRACTS';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#102C20]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-3xl bg-[#FAF8F2] rounded-3xl border border-[#254936]/15 shadow-[0_24px_48px_rgba(16,44,32,0.18)] overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#102C20] border border-[#254936]/15 shadow-xs flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          title="Close"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Product Image */}
        <div className="w-full md:w-1/2 relative bg-[#F5F2EA] min-h-[280px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-[#B98255] text-white text-[10px] font-bold tracking-wider uppercase py-1 px-3 rounded-full shadow-xs">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div>
            {/* Category tag */}
            <div className="flex items-center gap-2 text-[10px] tracking-[0.16em] font-bold text-[#727E72] uppercase mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5F7C5D]" />
              <span>{categoryLabel}</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#102C20] leading-tight mb-1">
              {product.name}
            </h2>

            {/* Tagline */}
            {product.tagline && (
              <p className="text-xs font-serif italic text-[#9C6D38] mb-2.5">
                {product.tagline}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs text-[#5F7C5D] mb-3">
              <div className="flex text-[#D48B38] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D48B38] text-[#D48B38]" />
                ))}
              </div>
              <span className="font-medium text-[#102C20]">({product.reviews_count || 48} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#102C20]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.original_price && (
                <span className="text-sm text-[#727E72] line-through">
                  ₹{product.original_price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#727E72] font-normal mb-3">
              Incl. 18% GST • {isOutOfStock ? <span className="text-rose-600 font-medium">Sold Out</span> : <span className="text-emerald-700 font-medium">In Stock (Ships in 24 hrs)</span>}
            </p>

            {/* Description */}
            <p className="text-xs text-[#5A6E60] font-light leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Specs Table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="bg-white/80 rounded-xl border border-[#254936]/10 p-3 mb-4 space-y-1 text-xs">
                {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-0.5 border-b border-slate-100 last:border-0">
                    <span className="text-[#727E72] font-medium">{key}:</span>
                    <span className="text-[#102C20] font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 h-11 px-4 bg-[#102C20] hover:bg-[#1E4533] disabled:bg-slate-200 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              {inCartQty > 0 ? (
                <>
                  <Check className="w-4 h-4 text-[#F2C94C]" />
                  <span>Added to Cart ({inCartQty})</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleWishlist}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isFavorite 
                  ? 'border-rose-200 bg-rose-50 text-rose-600 shadow-xs' 
                  : 'border-[#254936]/15 bg-white hover:bg-[#F2F5EF] text-[#102C20]'
              }`}
              title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
