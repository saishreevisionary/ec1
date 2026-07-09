'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-light mb-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-normal">Wishlist</span>
        </div>

        <div className="border-b border-slate-100 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">Saved Hardware</h1>
          <p className="text-xs text-slate-500 font-light mt-1">
            Review and manage items you've bookmarked for later.
          </p>
        </div>

        {wishlist.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-3xl max-w-xl mx-auto my-8 px-6">
            <span className="inline-block p-4 rounded-full bg-white border border-slate-100 shadow-sm text-slate-400 mb-4">
              <Heart className="w-8 h-8" />
            </span>
            <h3 className="text-lg font-bold text-primary">Your Wishlist is Empty</h3>
            <p className="text-sm text-slate-400 font-light mt-1.5 max-w-sm mx-auto">
              Save your favorite items here to track stock availability, check back for price changes, or quickly purchase them later.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary text-white hover:bg-primary-light rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm active:scale-95"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          /* Wishlist Items List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => {
              const isOutOfStock = product.stock_quantity <= 0;
              return (
                <div 
                  key={product.id} 
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col premium-card relative group"
                >
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full border border-slate-100 transition-colors z-10"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Link href={`/products/${product.slug}`} className="flex gap-4 mb-4 flex-1">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 relative">
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="bg-white text-[8px] font-bold tracking-widest text-primary uppercase py-0.5 px-1.5 rounded">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                        {product.category_id === 1 ? 'Oils' :
                         product.category_id === 2 ? 'Serums' :
                         product.category_id === 3 ? 'Mists' :
                         product.category_id === 4 ? 'Scalp Therapy' : 'Sets'}
                      </span>
                      <h3 className="text-sm font-semibold text-primary group-hover:text-accent transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-sm font-extrabold text-primary">${product.price}</span>
                        <span className="text-[9px] text-slate-400 font-light">+18% GST</span>
                      </div>
                    </div>
                  </Link>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 mt-auto">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center transition-colors"
                    >
                      View Details
                    </Link>
                    
                    {isOutOfStock ? (
                      <button
                        disabled
                        className="w-full py-2 bg-slate-100 text-slate-400 cursor-not-allowed rounded-xl text-[10px] font-bold uppercase tracking-wider text-center"
                      >
                        Sold Out
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="w-full py-2 bg-accent hover:bg-accent-light text-white rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm active:scale-95"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
