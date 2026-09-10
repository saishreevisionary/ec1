'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Check, Star, Zap } from 'lucide-react';
import { Product } from '@/lib/seedData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);
  const cartItem = cart.find(item => item.product_id === product.id);
  const inCartQty = cartItem?.quantity || 0;
  const isOutOfStock = product.stock_quantity <= 0;

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

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="group relative premium-card rounded-2xl flex flex-col overflow-hidden h-full">
      {/* Product Image and Badges */}
      <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col">
        <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          
          {/* Badge Layouts */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-[#2E5E3E] text-white text-[9px] font-bold tracking-wider uppercase py-0.5 px-2 rounded-sm shadow-sm">
                {product.badge}
              </span>
            </div>
          )}
          {product.discount && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-pink-100 text-pink-700 text-[9px] font-bold tracking-wider uppercase py-0.5 px-2 rounded-sm shadow-sm">
                {product.discount}
              </span>
            </div>
          )}

          {/* Out of Stock banner overlay */}
          {isOutOfStock ? (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-white text-primary text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded-full shadow-sm">
                Out of Stock
              </span>
            </div>
          ) : product.stock_quantity <= product.low_stock_threshold ? (
            <div className="absolute bottom-3 left-3">
              <span className="bg-orange-500 text-white text-[8px] font-bold tracking-wider uppercase py-0.5 px-2 rounded-full shadow-sm animate-pulse">
                Only {product.stock_quantity} left
              </span>
            </div>
          ) : null}
        </div>

        {/* Product Info details */}
        <div className="p-4 flex flex-col flex-1">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {product.category_id === 1 ? 'Essential Oils' :
             product.category_id === 2 ? 'Spice Oils' :
             product.category_id === 3 ? 'Spice Oleoresins' :
             product.category_id === 4 ? 'Floral Concretes' :
             product.category_id === 5 ? 'Floral Absolutes' :
             product.category_id === 6 ? 'Spice Powders' : 'Extracts'}
          </span>
          <h3 className="text-xs sm:text-sm font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-1">
            {product.name}
          </h3>

          {/* Stars Review Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-light mb-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < (product.rating || 5) ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              <span>({product.reviews_count || 48})</span>
            </div>
          )}
          
          {/* Price details with slashed original */}
          <div className="mt-auto pt-2 flex flex-col gap-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-extrabold text-[#2E5E3E]">
                ₹{product.price}
              </span>
              {product.original_price && (
                <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                  ₹{product.original_price}
                </span>
              )}
            </div>
            <span className="text-[8px] sm:text-[9px] text-slate-400 font-light">
              +18% GST (₹{Math.round(product.price * 0.18)})
            </span>
          </div>
        </div>
      </Link>

      {/* Action Button Row with ADD TO CART + BUY NOW + WISHLIST */}
      <div className="px-4 pb-4 pt-0 mt-auto flex gap-1.5 w-full">
        {isOutOfStock ? (
          <button
            disabled
            className="flex-grow py-2 bg-slate-100 text-slate-400 cursor-not-allowed rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
          >
            Sold Out
          </button>
        ) : (
          <>
            <button
              onClick={handleAddToCartClick}
              className="flex-1 py-2 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-xs active:scale-[0.98]"
              title="Add to Cart"
            >
              {inCartQty > 0 ? (
                <>
                  <Check className="w-3 h-3 text-[#D4954B]" />
                  <span>Added ({inCartQty})</span>
                </>
              ) : (
                <span>Add Cart</span>
              )}
            </button>

            <button
              onClick={handleBuyNowClick}
              className="flex-1 py-2 bg-[#D48B38] hover:bg-[#BF7A2C] text-white rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-xs active:scale-[0.98]"
              title="Buy Now (Direct Checkout)"
            >
              <span>Buy Now</span>
            </button>
          </>
        )}

        <button
          onClick={handleWishlistClick}
          className={`p-2 rounded-lg border text-slate-500 hover:text-red-500 active:scale-95 transition-all flex items-center justify-center ${
            isFavorite ? 'border-red-200 bg-red-50 text-red-500' : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
          title="Toggle Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-500' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
