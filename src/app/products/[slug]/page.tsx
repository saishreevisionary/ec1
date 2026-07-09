'use client';

import React, { useState, useEffect } from 'react';
import { useRouter as useNextRouter, useParams as useNextParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowLeft, Plus, Minus, Check, Star, ShieldCheck, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { db } from '@/lib/db';
import { Product } from '@/lib/seedData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductDetailsPage() {
  const params = useNextParams();
  const router = useNextRouter();
  const slug = params.slug as string;

  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Component states
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [qty, setQty] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true);
      const prod = await db.getProductBySlug(slug);
      if (prod) {
        setProduct(prod);
        setActiveImage(prod.image_url);
        
        // Fetch related products (same category, exclude current)
        const allProducts = await db.getProducts();
        const related = allProducts
          .filter(p => p.category_id === prod.category_id && p.id !== prod.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setLoading(false);
    };

    if (slug) {
      loadProductDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-primary">Product Not Found</h2>
          <p className="text-sm text-slate-400 font-light mt-1.5">
            The premium hardware you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Back to Catalog
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Cart status helpers
  const isFavorite = isInWishlist(product.id);
  const isOutOfStock = product.stock_quantity <= 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= product.low_stock_threshold;
  
  const handleQtyChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      setQty(prev => Math.min(prev + 1, product.stock_quantity));
    } else {
      setQty(prev => Math.max(prev - 1, 1));
    }
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  const handleWishlistClick = () => {
    toggleWishlist(product);
  };

  const gstAmount = Math.round(product.price * 0.18);
  const totalPriceWithGst = product.price + gstAmount;

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full animate-fade-in">
        {/* Back Link */}
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors uppercase tracking-wider mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Details Layout (Left: Image Gallery, Right: Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* LEFT SIDE: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Large Image Frame */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 relative">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain p-4 transition-all duration-300"
              />
              {isOutOfStock && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="bg-white text-primary text-xs font-bold tracking-widest uppercase py-2 px-6 rounded-full shadow-md">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery (Slider) */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 border-2 transition-all flex-shrink-0 ${
                      activeImage === img ? 'border-primary shadow-sm scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Product Meta & Checkout options */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Category and ratings */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest px-3 py-1 rounded-full bg-accent/10 w-fit inline-block">
                {product.category_id === 1 ? 'Oils' :
                 product.category_id === 2 ? 'Serums' :
                 product.category_id === 3 ? 'Mists' :
                 product.category_id === 4 ? 'Scalp Therapy' : 'Sets'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-1 text-xs text-slate-400 font-light pt-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <span>(4.9 rating based on 84 reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-5 bg-slate-50 border border-slate-200/50 rounded-2xl space-y-2">
              <div className="flex items-baseline gap-3 justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-primary">
                    ₹{product.price}
                  </span>
                  {product.original_price && (
                    <span className="text-lg text-slate-400 line-through">
                      ₹{product.original_price}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 font-light">
                  SKU: {product.sku}
                </span>
              </div>
              <div className="border-t border-slate-200/60 pt-2.5 flex justify-between text-xs text-slate-500 font-light">
                <span>GST Breakdown (18% rate)</span>
                <span className="font-semibold text-primary">₹{gstAmount}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-primary pt-0.5">
                <span>Total (Inc. GST)</span>
                <span>₹{totalPriceWithGst}</span>
              </div>
            </div>

            {/* Stock status indicator */}
            <div className="flex items-center gap-2 text-xs">
              {isOutOfStock ? (
                <div className="flex items-center gap-1.5 text-red-500 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span>Currently Out of Stock</span>
                </div>
              ) : isLowStock ? (
                <div className="flex items-center gap-1.5 text-orange-500 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                  <span>Critical Stock: Only {product.stock_quantity} left</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>In Stock (Ready to dispatch)</span>
                </div>
              )}
            </div>

            {/* Quantity Selector & Wishlist toggle */}
            {!isOutOfStock && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Quantity</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
                    <button
                      onClick={() => handleQtyChange('dec')}
                      disabled={qty <= 1}
                      className="p-2 rounded-lg hover:bg-slate-50 text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 text-sm font-semibold text-primary select-none">{qty}</span>
                    <button
                      onClick={() => handleQtyChange('inc')}
                      disabled={qty >= product.stock_quantity}
                      className="p-2 rounded-lg hover:bg-slate-50 text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 font-light">
                    Max available: {product.stock_quantity} units
                  </span>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {isOutOfStock ? (
                <button
                  disabled
                  className="flex-grow py-4 bg-slate-100 text-slate-400 cursor-not-allowed rounded-xl text-sm font-semibold uppercase tracking-wider text-center"
                >
                  Out of Stock
                </button>
              ) : isAddedSuccess ? (
                <button
                  className="flex-grow py-4 bg-emerald-600 text-white rounded-xl text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10"
                >
                  <Check className="w-4.5 h-4.5 text-accent" />
                  <span>Added to Cart</span>
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-grow py-4 bg-primary hover:bg-primary-light text-white rounded-xl text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span>Add to Cart</span>
                </button>
              )}

              <button
                onClick={handleWishlistClick}
                className={`py-4 px-6 rounded-xl border text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isFavorite 
                    ? 'border-red-200 bg-red-50 text-red-500' 
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4.5 h-4.5 ${isFavorite ? 'fill-red-500' : ''}`} />
                <span>{isFavorite ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-light">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>2 Year Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-light">
                <RefreshCw className="w-4 h-4 text-accent" />
                <span>30-Day Easy Return</span>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTIONS: Description & Spec sheets */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-slate-100 pt-12 mb-16">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold text-primary tracking-tight">Design & Features</h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Every detail is engineered with absolute precision. From structural stability and acoustic isolation to seam details in apparel, each feature undergoes rigorous material validation. Enjoy a product built for longevity, tactile refinement, and aesthetic harmony.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-bold text-primary tracking-tight">Specifications</h2>
            <div className="border border-slate-200/60 rounded-2xl overflow-hidden bg-slate-50/50">
              <table className="w-full border-collapse text-left text-xs font-light text-slate-500">
                <tbody>
                  {Object.entries(product.specs || {}).map(([key, value], idx) => (
                    <tr 
                      key={idx} 
                      className={`border-b border-slate-150 ${idx % 2 === 0 ? 'bg-slate-100/40' : 'bg-transparent'}`}
                    >
                      <td className="px-4 py-3 font-semibold text-primary w-2/5 capitalize">{key}</td>
                      <td className="px-4 py-3 text-slate-600 w-3/5">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-slate-100 pt-16">
            <h2 className="text-2xl font-extrabold text-primary tracking-tight mb-8">Related Hardware</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
