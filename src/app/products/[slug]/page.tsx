'use client';

import React, { useState, useEffect } from 'react';
import { useRouter as useNextRouter, useParams as useNextParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Heart, 
  ShoppingBag, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Check, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  FlaskConical, 
  FileText, 
  Sparkles, 
  Package, 
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { db } from '@/lib/db';
import { Product, Category, CATEGORIES } from '@/lib/seedData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

export default function ProductDetailsPage() {
  const params = useNextParams();
  const router = useNextRouter();
  const slug = params.slug as string;

  const { addToCart, openCartDrawer } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  // Component states
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [qty, setQty] = useState<number>(1);
  const [selectedPackaging, setSelectedPackaging] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true);
      try {
        const [prod, allCats, allProducts] = await Promise.all([
          db.getProductBySlug(slug),
          db.getCategories(),
          db.getProducts()
        ]);

        if (allCats && allCats.length > 0) {
          setCategories(allCats);
        }

        if (prod) {
          setProduct(prod);
          if (prod.packaging_options && prod.packaging_options.length > 0) {
            setSelectedPackaging(prod.packaging_options[0]);
          }
          
          // Fetch related products (same category, exclude current)
          const related = allProducts
            .filter(p => p.category_id === prod.category_id && p.id !== prod.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProductDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F4EA] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-[#173B2B]/20 border-t-[#173B2B] rounded-full animate-spin" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#173B2B]">
              Loading Botanical Monograph...
            </span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F4EA] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-[#DCE5D5] flex items-center justify-center mx-auto mb-4 border border-[#173B2B]/15 text-[#173B2B]">
            <Leaf className="w-8 h-8 opacity-80" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#173B2B] mb-2">Botanical Product Not Found</h1>
          <p className="text-sm text-[#5A6E60] font-light max-w-md mx-auto mb-8">
            The botanical extract or ingredient specification you requested is not available in the current catalog.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#173B2B] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#204a37] transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Product Catalogue</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const category = categories.find(c => c.id === product.category_id);
  const isFavorite = isInWishlist(product.id);
  const isOutOfStock = product.stock_quantity <= 0;

  // Determine appropriate transparent packshot bottle based on range
  const bottlePackshotUrl = (
    product.product_range === 'Absolutes'
      ? '/images/packshots/venuss-absolute-packshot.png'
      : product.product_range === 'Specialities'
      ? '/images/packshots/venuss-speciality-packshot.png'
      : '/images/packshots/venuss-essential-oil-packshot.png'
  );

  const rawBotanicalImage = product.image_url || '/images/products/lavender-oil.jpg';

  const handleQtyChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      setQty(prev => Math.min(prev + 1, product.stock_quantity));
    } else {
      setQty(prev => Math.max(prev - 1, 1));
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    addToCart(product, qty, selectedPackaging);
    setIsAddedSuccess(true);
    showToast(`Added ${qty} × "${product.name}" (${selectedPackaging || 'Unit'}) to cart`);
    
    setTimeout(() => {
      setIsAddedSuccess(false);
      openCartDrawer();
    }, 450);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div className="relative min-h-screen bg-[#F7F4EA] text-[#2D3748] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* =========================================================
            BREADCRUMB & BACK ACTION
           ========================================================= */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#173B2B]/10 mb-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[13.5px] font-medium text-[#48634F]">
            <Link href="/" className="hover:text-[#173B2B] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#728B79]" />
            <Link href="/products" className="hover:text-[#173B2B] transition-colors">Shop</Link>
            {category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#728B79]" />
                <Link href={`/products?category=${category.slug}`} className="hover:text-[#173B2B] transition-colors">
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-[#728B79]" />
            <span className="text-[#173B2B] font-bold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#173B2B] hover:text-[#2E5E3E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>

        {/* =========================================================
            PRODUCT HERO SECTION (2-Layer Stage + B2B Commercial Data)
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* LEFT COLUMN: E-Robertet Two-Layer Image Showcase Stage */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[540px] rounded-3xl bg-white/90 border border-[#173B2B]/12 shadow-sm p-6 sm:p-8 flex items-center justify-center overflow-hidden">
              
              {/* Layer 1 — Circular Botanical Source Plant Background (Significantly Clearer & Visible) */}
              <div className="w-72 h-72 sm:w-84 sm:h-84 md:w-92 md:h-92 rounded-full overflow-hidden shadow-inner border-2 border-[#173B2B]/10 bg-[#DCE5D5] flex items-center justify-center select-none transition-transform duration-700 hover:scale-[1.02]">
                <img
                  src={rawBotanicalImage}
                  alt={`${product.name} botanical source`}
                  className="w-full h-full object-cover object-center filter saturate-[1.05]"
                />
              </div>

              {/* Layer 2 — Foreground Amber Apothecary Bottle Packshot with Soft Contact Shadow */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <div className="relative flex flex-col items-center transform transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src={bottlePackshotUrl}
                    alt={`${product.name} pure amber packshot`}
                    className="h-64 sm:h-72 md:h-76 w-auto object-contain drop-shadow-[0_12px_24px_rgba(20,40,30,0.22)]"
                  />
                  {/* Soft Grounded Contact Shadow */}
                  <div 
                    className="w-36 sm:w-42 md:w-46 h-3 bg-black/25 rounded-full blur-[4.5px] -mt-1.5 opacity-85"
                    aria-hidden="true" 
                  />
                </div>
              </div>

              {/* Top Right: Certified Organic Seal (if applicable) */}
              {product.is_organic && (
                <div className="absolute top-5 right-5 z-20 pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-[#173B2B] text-white flex flex-col items-center justify-center shadow-md border-2 border-white">
                    <span className="text-[7px] font-black uppercase tracking-tight leading-none">ORGANIC</span>
                    <span className="text-[6px] font-semibold uppercase tracking-widest leading-none mt-0.5 text-[#DCE5D5]">CERTIFIED</span>
                  </div>
                </div>
              )}

              {/* Restrained Jasmine Badge (Only if Jasmine) */}
              {product.name.toLowerCase().includes('jasmine') && (
                <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173B2B]/90 text-white text-xs font-bold tracking-wider backdrop-blur-xs border border-white/20 shadow-xs">
                    <Leaf className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>Madurai Jasmine</span>
                  </span>
                </div>
              )}

              {/* Top Left: SKU Pill */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-3.5 py-1 bg-[#173B2B]/8 text-[#173B2B] border border-[#173B2B]/20 rounded-full text-xs font-mono font-bold tracking-wider uppercase">
                  {product.sku}
                </span>
              </div>
            </div>

            {/* Quality Seals Row under Product Image */}
            <div className="w-full max-w-[520px] mt-4 grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#173B2B]/10 flex flex-col items-center justify-center gap-1 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-[#173B2B]" />
                <span className="text-xs font-bold text-[#173B2B] uppercase tracking-wider">GC-MS Tested</span>
              </div>
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#173B2B]/10 flex flex-col items-center justify-center gap-1 shadow-2xs">
                <Award className="w-5 h-5 text-[#173B2B]" />
                <span className="text-xs font-bold text-[#173B2B] uppercase tracking-wider">ISO & HACCP</span>
              </div>
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#173B2B]/10 flex flex-col items-center justify-center gap-1 shadow-2xs">
                <Truck className="w-5 h-5 text-[#173B2B]" />
                <span className="text-xs font-bold text-[#173B2B] uppercase tracking-wider">Global Export</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Information & Commercial Enquiry */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Range & Category Eyebrow */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-[#173B2B] text-white text-xs font-bold uppercase tracking-wider">
                  {category ? category.name : product.product_range}
                </span>
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-[#DCE5D5] text-[#173B2B] text-xs font-bold uppercase tracking-wider border border-[#173B2B]/15">
                    {product.badge}
                  </span>
                )}
                <span className="text-[13.5px] text-[#4A5D50] font-medium ml-auto">
                  Origin: <strong className="text-[#173B2B] font-bold">{product.country || 'India'}</strong>
                </span>
              </div>

              {/* Product Title (font-heading, ~42-46px) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#173B2B] tracking-tight leading-[1.15]">
                {product.name}
              </h1>

              {/* Botanical Latin Name */}
              {product.botanical_name && (
                <p className="text-lg sm:text-xl font-heading font-bold italic text-[#C78738]">
                  {product.botanical_name}
                  {product.cas_number && (
                    <span className="not-italic text-[13px] text-[#4A5D50] font-sans font-semibold ml-2">
                      (CAS: {product.cas_number})
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Product Overview Summary */}
            <p className="text-base sm:text-[17.5px] text-[#243B2C] font-normal leading-relaxed">
              {product.description}
            </p>

            {/* Botanical Specification Attribute Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-white/80 rounded-2xl border border-[#173B2B]/15 text-[13.5px]">
              <div>
                <span className="text-xs text-[#5F7C5D] uppercase font-bold tracking-wider block mb-0.5">Extraction</span>
                <span className="font-bold text-[#173B2B]">{product.extraction_method || 'Steam Distillation'}</span>
              </div>
              <div>
                <span className="text-xs text-[#5F7C5D] uppercase font-bold tracking-wider block mb-0.5">Olfactory Family</span>
                <span className="font-bold text-[#173B2B]">{product.olfactory_family || 'Spicy'}</span>
              </div>
              <div>
                <span className="text-xs text-[#5F7C5D] uppercase font-bold tracking-wider block mb-0.5">Applications</span>
                <span className="font-bold text-[#173B2B]">
                  {product.applications && product.applications.length > 0 ? product.applications.join(', ') : 'Fragrance'}
                </span>
              </div>
            </div>

            {/* Commercial Packaging Options */}
            {product.packaging_options && product.packaging_options.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-[14px] font-bold text-[#173B2B] uppercase tracking-wider block">
                  Export Packaging Formats
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.packaging_options.map((pkg, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackaging(pkg)}
                      className={`px-4 py-2 rounded-xl text-[13.5px] sm:text-[14px] font-bold border transition-all cursor-pointer ${
                        selectedPackaging === pkg
                          ? 'bg-[#173B2B] text-white border-[#173B2B] shadow-2xs'
                          : 'bg-white text-[#173B2B] border-[#173B2B]/20 hover:border-[#173B2B]/50'
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Commercial Pricing Card */}
            <div className="p-6 bg-white rounded-2xl border border-[#173B2B]/15 shadow-xs space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <span className="text-[13px] text-[#4A5D50] font-medium block">Standard Bulk Unit</span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-heading font-extrabold text-[#173B2B]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.original_price && (
                      <span className="text-base text-slate-400 line-through">
                        ₹{product.original_price.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-sm text-[#4A5D50] font-semibold">
                      / {selectedPackaging || 'Unit'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5D5]/80 text-[#173B2B] text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>In Stock for Export</span>
                  </span>
                </div>
              </div>

              {/* Quantity selector & B2B Commercial Actions */}
              <div className="space-y-3.5 pt-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#173B2B]/20 rounded-xl bg-[#FAF9F5] p-1 shrink-0 h-12 justify-between sm:justify-start">
                    <button
                      id="product-qty-dec"
                      type="button"
                      onClick={() => handleQtyChange('dec')}
                      disabled={qty <= 1}
                      className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-white text-[#173B2B] disabled:opacity-30 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span id="product-qty-val" className="px-4 text-[15px] font-bold text-[#173B2B] select-none min-w-[36px] text-center">
                      {qty}
                    </span>
                    <button
                      id="product-qty-inc"
                      type="button"
                      onClick={() => handleQtyChange('inc')}
                      disabled={qty >= product.stock_quantity}
                      className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-white text-[#173B2B] disabled:opacity-30 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Primary Action: Request Commercial Quote & COA */}
                  <Link
                    id="product-request-quote-btn"
                    href={`/contact?product=${encodeURIComponent(product.name)}&id=${encodeURIComponent(product.id)}&type=quote&pkg=${encodeURIComponent(selectedPackaging)}&qty=${qty}`}
                    className="flex-1 h-12 px-6 bg-[#173B2B] hover:bg-[#204a37] text-white rounded-xl text-[14px] sm:text-[14.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer text-center"
                  >
                    <MessageSquare className="w-4.5 h-4.5 text-[#DCE5D5]" />
                    <span>Request Quote &amp; COA</span>
                  </Link>

                  {/* Direct Add to Cart */}
                  <button
                    id="product-add-to-cart-btn"
                    type="button"
                    onClick={handleAddToCart}
                    className="h-12 px-5 border border-[#173B2B]/25 hover:border-[#173B2B] bg-white text-[#173B2B] rounded-xl text-[13.5px] sm:text-[14px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {isAddedSuccess ? (
                      <>
                        <Check className="w-4.5 h-4.5 text-emerald-600" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4.5 h-4.5 text-[#2E5E3E]" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist */}
                  <button
                    id="product-wishlist-btn"
                    type="button"
                    onClick={handleWishlistClick}
                    className={`h-12 w-12 rounded-xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                      isFavorite
                        ? 'bg-rose-50 border-rose-300 text-rose-600'
                        : 'bg-white border-[#173B2B]/20 text-[#173B2B] hover:bg-[#FAF9F5]'
                    }`}
                    aria-label="Save to Wishlist"
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>

                {/* Secondary Row: Sample Order & Bulk / Export Enquiry Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <Link
                    id="product-sample-order-btn"
                    href={`/contact?product=${encodeURIComponent(product.name)}&id=${encodeURIComponent(product.id)}&type=sample&pkg=${encodeURIComponent(selectedPackaging)}&qty=${qty}`}
                    className="h-11 px-4 rounded-xl border border-[#173B2B]/25 bg-white hover:bg-slate-50 text-[#173B2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer text-center"
                  >
                    <FlaskConical className="w-4 h-4 text-[#D4954B]" />
                    <span>Sample Order (Lab Vial)</span>
                  </Link>

                  <Link
                    id="product-bulk-order-btn"
                    href={`/contact?product=${encodeURIComponent(product.name)}&id=${encodeURIComponent(product.id)}&type=export&pkg=${encodeURIComponent(selectedPackaging)}&qty=${qty}`}
                    className="h-11 px-4 rounded-xl border border-[#173B2B]/25 bg-white hover:bg-slate-50 text-[#173B2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer text-center"
                  >
                    <Truck className="w-4 h-4 text-[#2E5E3E]" />
                    <span>Export / Bulk Order Enquiry</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================
            TECHNICAL SPECIFICATIONS MONOGRAPH (Verified Specs Table)
           ========================================================= */}
        <section className="mb-16 border-t border-[#173B2B]/12 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Botanical Monograph Description */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DCE5D5]/80 text-xs uppercase font-bold tracking-wider text-[#173B2B]">
                <FileText className="w-3.5 h-3.5" />
                <span>Analytical Monograph</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-extrabold text-[#173B2B] tracking-tight">
                Botanical Origin & Extraction Precision
              </h2>

              <p className="text-base sm:text-[17px] text-[#243B2C] font-normal leading-relaxed">
                Venuss Herbo Aromatics manufactures {product.name} through validated industrial processes governed by strict pharmacopeia standards. From raw material intake inspection to analytical Gas Chromatography-Mass Spectrometry (GC-MS) verification, each lot is documented with a dedicated Certificate of Analysis (COA) and Material Safety Data Sheet (MSDS).
              </p>

              <div className="p-5 bg-white/90 rounded-2xl border border-[#173B2B]/15 space-y-2.5 shadow-2xs">
                <span className="text-[14.5px] font-bold text-[#173B2B] uppercase tracking-wider block">
                  Quality & Regulatory Compliance
                </span>
                <p className="text-[14px] text-[#3D5244] font-normal leading-relaxed">
                  Manufactured under ISO 9001:2015 and HACCP quality management systems. FSSAI licensed for food and flavoring safety. 100% natural and steam sterilized without toxic Ethylene Oxide (ETO) or radiation exposure.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}&type=quote`}
                  className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-[#173B2B] hover:text-[#2E5E3E] transition-colors"
                >
                  <span>Request Full Batch Technical Dossier / COA</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Specifications Table */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl border border-[#173B2B]/15 shadow-2xs overflow-hidden">
                <div className="px-5 py-4 bg-[#F5F2E9] border-b border-[#173B2B]/10">
                  <h3 className="font-heading font-extrabold text-[16px] text-[#173B2B]">
                    Technical Data Sheet (TDS)
                  </h3>
                </div>

                <table className="w-full text-left">
                  <tbody>
                    {Object.entries(product.specs || {}).map(([key, value], idx) => (
                      <tr 
                        key={idx}
                        className={`border-b border-[#173B2B]/8 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F5]'}`}
                      >
                        <td className="px-5 py-3.5 font-bold text-[#173B2B] text-[14px] w-2/5">
                          {key}
                        </td>
                        <td className="px-5 py-3.5 text-[#243B2C] font-mono text-[13px] font-medium w-3/5">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            RELATED BOTANICAL INGREDIENTS
           ========================================================= */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-[#173B2B]/12 pt-12 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#48634F] uppercase tracking-wider block mb-1">
                  Complementary Extracts
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#173B2B]">
                  Related {category ? category.name : 'Botanicals'}
                </h2>
              </div>

              <Link
                href={`/products?category=${category ? category.slug : ''}`}
                className="text-[14px] font-bold text-[#173B2B] uppercase tracking-wider hover:text-[#2E5E3E] transition-colors"
              >
                View Category
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
