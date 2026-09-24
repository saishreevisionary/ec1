'use client';

import React, { useState, useEffect } from 'react';
import { useRouter as useNextRouter, useParams as useNextParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowLeft, Plus, Minus, Check, Star, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import HairOilLoader from '@/components/HairOilLoader';
import { db, Review } from '@/lib/db';
import { Product } from '@/lib/seedData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

export default function ProductDetailsPage() {
  const params = useNextParams();
  const router = useNextRouter();
  const slug = params.slug as string;

  const { addToCart, cart, openCartDrawer } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  // Component states
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [qty, setQty] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  // Review states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showWriteReview, setShowWriteReview] = useState<boolean>(false);
  const [newRating, setNewRating] = useState<number>(5);
  const [newHoverRating, setNewHoverRating] = useState<number>(0);
  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [reviewSubmitting, setReviewSubmitting] = useState<boolean>(false);
  const [reviewSubmittedNotice, setReviewSubmittedNotice] = useState<string>('');

  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true);
      const prod = await db.getProductBySlug(slug);
      if (prod) {
        setProduct(prod);
        setActiveImage(prod.image_url);
        
        // Fetch approved reviews for this product
        const prodReviews = await db.getReviews(prod.id, 'approved');
        setReviews(prodReviews);

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
        <HairOilLoader fullPage size="md" />
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-primary font-serif">Botanical Product Not Found</h2>
          <p className="text-sm text-slate-400 font-light mt-1.5">
            The botanical extract or essential oil you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block px-6 py-3 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
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

  const handleAddToCart = (e: React.MouseEvent) => {
    addToCart(product, qty);
    setIsAddedSuccess(true);
    showToast(`Added ${qty} × "${product.name}" to cart`);
    
    // Open the luxury cart drawer
    setTimeout(() => {
      setIsAddedSuccess(false);
      openCartDrawer();
    }, 450);

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

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, qty);
    router.push('/checkout');
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !newName.trim() || !newTitle.trim() || !newComment.trim()) return;

    setReviewSubmitting(true);
    await db.saveReview({
      product_id: product.id,
      product_name: product.name,
      user_name: newName.trim(),
      user_email: newEmail.trim() || 'customer@venuss.co.in',
      rating: newRating,
      title: newTitle.trim(),
      comment: newComment.trim(),
      status: 'approved'
    });

    setReviewSubmitting(false);
    setReviewSubmittedNotice('Thank you! Your review has been published.');
    showToast('Thank you! Your review has been published.');
    setShowWriteReview(false);
    setNewTitle('');
    setNewComment('');

    // Reload reviews
    const prodReviews = await db.getReviews(product.id, 'approved');
    setReviews(prodReviews);

    setTimeout(() => setReviewSubmittedNotice(''), 4000);
  };

  const approvedReviews = reviews;
  const totalReviewsCount = approvedReviews.length;
  const avgRating = totalReviewsCount > 0
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount).toFixed(1)
    : '5.0';

  const getRatingPct = (star: number) => {
    if (totalReviewsCount === 0) return 0;
    const count = approvedReviews.filter((r) => r.rating === star).length;
    return Math.round((count / totalReviewsCount) * 100);
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
              <span className="text-[10px] font-bold text-white uppercase tracking-widest px-3 py-1 rounded-full bg-[#2E5E3E] w-fit inline-block">
                {product.category_id === 1 ? 'Essential Oils' :
                 product.category_id === 2 ? 'Spice Oils' :
                 product.category_id === 3 ? 'Spice Oleoresins' :
                 product.category_id === 4 ? 'Floral Concretes' :
                 product.category_id === 5 ? 'Floral Absolutes' : 'Spice Powders'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight font-serif">
                {product.name}
              </h1>
              <div className="flex items-center gap-1 text-xs text-slate-400 font-light pt-1">
                <div className="flex text-[#D4954B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(Number(avgRating)) ? 'fill-[#D4954B]' : 'text-slate-200'}`} />
                  ))}
                </div>
                <span>({avgRating} rating based on {totalReviewsCount} {totalReviewsCount === 1 ? 'review' : 'reviews'})</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-5 bg-white border border-slate-200/70 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-baseline gap-3 justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#2E5E3E]">
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

            {/* CTA Buttons (ADD TO CART + BUY NOW + WISHLIST) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {isOutOfStock ? (
                <button
                  disabled
                  className="flex-grow py-4 bg-slate-100 text-slate-400 cursor-not-allowed rounded-xl text-sm font-semibold uppercase tracking-wider text-center"
                >
                  Out of Stock
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    {isAddedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-[#D4954B]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3.5 bg-[#D48B38] hover:bg-[#BF7A2C] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    <span>BUY NOW</span>
                  </button>

                  <button
                    onClick={(e) => handleWishlistClick(e)}
                    className={`py-3.5 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isFavorite 
                        ? 'border-red-200 bg-red-50 text-red-500' 
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                    <span className="hidden xl:inline">{isFavorite ? 'Saved' : 'Wishlist'}</span>
                  </button>
                </>
              )}
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-light">
                <ShieldCheck className="w-4 h-4 text-[#D4954B]" />
                <span>100% Pure & GC-MS Tested</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-light">
                <Truck className="w-4 h-4 text-[#2E5E3E]" />
                <span>Ships in 24h from Tamil Nadu</span>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTIONS: Botanical Extraction Details & Spec sheets */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-slate-100 pt-12 mb-16">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold text-primary tracking-tight font-serif">Botanical Extraction & Profile</h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
            <div className="p-4 bg-[#E4ECE5]/50 border border-[#2E5E3E]/15 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-[#173F2C] uppercase tracking-wider block">Authenticity & Quality Monograph</span>
              <p className="text-xs text-[#2E5E3E] font-light leading-relaxed">
                Every single batch is steam-distilled or cold-pressed with supercritical botanical precision. From farm-level cultivation across the Western Ghats to analytical validation via gas chromatography-mass spectrometry (GC-MS), our extracts meet strict international pharmacopeia standards.
              </p>
            </div>
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

        {/* CUSTOMER REVIEWS SECTION */}
        <section className="border-t border-slate-200/80 pt-16 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#2E5E3E] tracking-tight font-serif">Customer Reviews</h2>
              <p className="text-xs text-slate-500 font-light mt-1">Verified buyer experiences & feedback for {product.name}</p>
            </div>
            <button
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="px-6 py-3 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-[#D4954B] fill-[#D4954B]" />
              <span>{showWriteReview ? 'Close Review Form' : 'Write a Review'}</span>
            </button>
          </div>

          {/* Submitted Alert Notice */}
          {reviewSubmittedNotice && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{reviewSubmittedNotice}</span>
            </div>
          )}

          {/* WRITE REVIEW FORM */}
          {showWriteReview && (
            <form onSubmit={handleSubmitReview} className="mb-12 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6 animate-fade-in">
              <h3 className="text-lg font-extrabold text-[#2E5E3E] font-serif">Write Your Review</h3>
              
              {/* Rating Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Your Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setNewHoverRating(star)}
                      onMouseLeave={() => setNewHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (newHoverRating || newRating)
                            ? 'text-[#D4954B] fill-[#D4954B]'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-semibold text-slate-600">{newHoverRating || newRating} out of 5 Stars</span>
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Email</label>
                  <input
                    type="email"
                    placeholder="e.g. ananya@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E]"
                  />
                </div>
              </div>

              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Review Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exceptional Purity & Long-lasting Fragrance"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E]"
                />
              </div>

              {/* Comment Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Review Comment *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your detailed experience with this product..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWriteReview(false)}
                  className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="px-8 py-3 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
                >
                  {reviewSubmitting ? 'Publishing...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}

          {/* REVIEWS OVERVIEW BLOCK (Summary + Bars) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center bg-slate-50/70 border border-slate-200/60 p-6 sm:p-8 rounded-3xl">
            {/* Average Big Display */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-2 border-b lg:border-b-0 lg:border-r border-slate-200/60 pb-6 lg:pb-0 lg:pr-8">
              <div className="text-5xl font-extrabold text-[#2E5E3E] font-serif">{avgRating}</div>
              <div className="flex items-center justify-center lg:justify-start gap-1 text-[#D4954B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(Number(avgRating)) ? 'fill-[#D4954B]' : 'text-slate-200'}`} />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-light">Based on {totalReviewsCount} verified reviews</p>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="lg:col-span-8 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = getRatingPct(star);
                return (
                  <div key={star} className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-slate-600 font-semibold flex items-center gap-1">
                      {star} <Star className="w-3 h-3 text-[#D4954B] fill-[#D4954B]" />
                    </span>
                    <div className="flex-1 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#D4954B] h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="w-10 text-right text-slate-400 font-light text-[11px]">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* REVIEWS LIST */}
          {reviews.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200/60 rounded-3xl">
              <Star className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-700">No customer reviews yet</h3>
              <p className="text-xs text-slate-400 mt-1">Be the first to review {product.name}!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white border border-slate-200/70 p-6 rounded-2xl shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#2E5E3E]/10 text-[#2E5E3E] flex items-center justify-center font-bold text-xs">
                        {rev.user_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#2E5E3E]">{rev.user_name}</span>
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                            Verified Buyer
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-light">
                          {new Date(rev.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    
                    {/* Star Rating */}
                    <div className="flex text-[#D4954B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < rev.rating ? 'fill-[#D4954B]' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </div>

                  {/* Title & Comment */}
                  <h4 className="text-sm font-bold text-slate-900">{rev.title}</h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed whitespace-pre-line">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-slate-100 pt-16">
            <h2 className="text-2xl font-extrabold text-primary tracking-tight mb-8">Related Products</h2>
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
