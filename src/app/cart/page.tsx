'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShoppingCart, ShieldCheck, Leaf, Tag, Truck, Sparkles, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, gstAmount, grandTotal, totalItems } = useCart();
  const { showToast } = useToast();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const FREE_SHIPPING_THRESHOLD = 999;
  const effectiveTotal = Math.max(0, grandTotal - discountAmount);
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - effectiveTotal);
  const progressPercent = Math.min(100, Math.round((effectiveTotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'BOTANICAL10' || code === 'HERBO10') {
      const discount = Math.round(subtotal * 0.10);
      setDiscountAmount(discount);
      setAppliedPromo(code);
      showToast(`🎉 Promo code "${code}" applied! 10% discount added.`);
    } else if (code === 'WELCOME50') {
      const discount = 50;
      setDiscountAmount(discount);
      setAppliedPromo(code);
      showToast(`🎉 Promo code "${code}" applied! ₹50 off.`);
    } else {
      showToast('Invalid promo code. Try "BOTANICAL10" for 10% off.');
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-light mb-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-normal">Cart</span>
        </div>

        <div className="border-b border-slate-100 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">Shopping Cart</h1>
          <p className="text-xs text-slate-500 font-light mt-1">
            You have {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart.
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty State with custom botanical leaf-falling animation */
          <div className="text-center py-16 bg-[#FAF9F5]/40 border border-slate-200/80 rounded-3xl max-w-xl mx-auto my-8 px-6 relative overflow-hidden shadow-sm flex flex-col items-center justify-center min-h-[380px]">
            <style>{`
              @keyframes leaf-flutter {
                0% { transform: translateY(-50px) translateX(0) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                40% { transform: translateY(0px) translateX(-20px) rotate(-45deg); }
                70% { transform: translateY(45px) translateX(15px) rotate(45deg); }
                82% { transform: translateY(72px) translateX(0px) rotate(10deg); opacity: 1; }
                95%, 100% { transform: translateY(72px) translateX(0px) rotate(0deg); opacity: 0; }
              }
              @keyframes trolley-roll {
                0%, 78% { transform: scale(1) translateX(0) rotate(0deg); }
                82% { transform: scale3d(1.1, 0.84, 1) translateX(8px) rotate(4deg); }
                85% { transform: scale3d(0.92, 1.08, 1) translateX(-5px) rotate(-3deg); }
                88% { transform: scale3d(1.04, 0.96, 1) translateX(2px) rotate(1deg); }
                94%, 100% { transform: scale(1) translateX(0) rotate(0deg); }
              }
              @keyframes ring-expand {
                0%, 78% { transform: scale(0.5); opacity: 0; }
                82% { opacity: 0.6; }
                95%, 100% { transform: scale(1.6); opacity: 0; }
              }
              @keyframes float-gentle {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-6px); }
              }
              .animate-leaf {
                animation: leaf-flutter 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
              }
              .animate-trolley {
                animation: trolley-roll 5s ease-in-out infinite;
              }
              .animate-ripple {
                animation: ring-expand 5s ease-out infinite;
                border: 1px solid rgba(181, 140, 84, 0.4);
              }
              .animate-float-bag {
                animation: float-gentle 4s ease-in-out infinite;
              }
            `}</style>

            {/* Animation Scene */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-6 select-none">
              
              {/* Leaf falling from top */}
              <div className="absolute top-0 w-8 h-8 text-[#b58c54] animate-leaf z-20 pointer-events-none">
                <Leaf className="w-full h-full fill-accent/10" />
              </div>

              {/* Ripple expanding on impact */}
              <div className="absolute w-16 h-16 rounded-full animate-ripple z-0 pointer-events-none" style={{ top: '68px' }}></div>

              {/* Floating & Bouncing Shopping Cart Container */}
              <div className="animate-float-bag z-10">
                <div className="animate-trolley p-4 rounded-full bg-white border border-slate-200/80 shadow-md text-primary flex items-center justify-center relative w-18 h-18">
                  <ShoppingCart className="w-8 h-8 text-primary" />
                </div>
              </div>

            </div>

            <h3 className="text-xl font-serif font-bold text-primary tracking-tight">Your Cart is Empty</h3>
            <p className="text-xs text-slate-400 font-light mt-2 max-w-xs mx-auto leading-relaxed">
              Before you can check out, you must add some premium botanical items to your shopping cart.
            </p>
            <Link
              href="/products"
              className="group mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-[#20352c] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        ) : (
          /* Cart Layout (Left: Items List, Right: Order Summary Card) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => {
                const maxStock = item.product.stock_quantity;
                return (
                  <div 
                    key={item.product_id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white border border-slate-200/80 rounded-2xl gap-4 hover:border-slate-350 transition-all"
                  >
                    {/* Product Details info */}
                    <div className="flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                          {item.product.category_id === 1 ? 'Oils' :
                           item.product.category_id === 2 ? 'Serums' :
                           item.product.category_id === 3 ? 'Mists' :
                           item.product.category_id === 4 ? 'Scalp Therapy' : 'Sets'}
                        </span>
                        <Link 
                          href={`/products/${item.product.slug}`}
                          className="text-sm font-semibold text-primary hover:text-accent transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <span className="text-[10px] text-slate-400 font-light block mt-0.5">
                          Base Price: ₹{item.price} each (18% GST)
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Pricing details */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-white">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-500"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3.5 text-xs font-semibold text-primary select-none">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          disabled={item.quantity >= maxStock}
                          className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-500 disabled:opacity-30"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right min-w-[70px]">
                        <span className="text-sm font-extrabold text-primary block">
                          ₹{item.price * item.quantity}
                        </span>
                        <span className="text-[9px] text-slate-400 font-light block">
                          +₹{Math.round(item.price * item.quantity * 0.18)} GST
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-colors border border-transparent hover:border-red-100"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Col: Summary card */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 p-6 rounded-3xl space-y-6 shadow-sm">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-100 pb-3 font-serif">
                Order Summary
              </h3>

              {/* Free Shipping Progress Meter */}
              <div className="p-4 bg-[#E8EFE9] rounded-2xl space-y-2 border border-[#2E5E3E]/15">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#173F2C] flex items-center gap-1.5 text-[11px]">
                    <Truck className="w-3.5 h-3.5 text-[#2E5E3E]" />
                    {amountNeeded === 0 ? (
                      <span className="text-emerald-700 font-bold">Free Express Delivery Unlocked!</span>
                    ) : (
                      <span>Add <strong className="text-[#D48B38]">₹{amountNeeded}</strong> more for Free Shipping</span>
                    )}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/80 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#2E5E3E] to-[#D4954B] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#2E5E3E]" />
                  <span>Promotional Voucher</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. BOTANICAL10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#2E5E3E]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Promo "{appliedPromo}" active (-₹{discountAmount})</span>
                  </p>
                )}
              </form>

              {/* Cost Calculations */}
              <div className="space-y-3 text-xs font-light text-slate-500 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span>Cart Items Subtotal</span>
                  <span className="font-semibold text-primary">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Amount (18%)</span>
                  <span className="font-semibold text-primary">₹{gstAmount}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Voucher Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Dispatch</span>
                  <span className="font-semibold text-emerald-700 uppercase tracking-wider text-[10px]">
                    {amountNeeded === 0 ? 'Free' : 'Calculated at checkout'}
                  </span>
                </div>
                
                <div className="border-t border-slate-200/60 pt-3 flex justify-between text-sm font-extrabold text-primary">
                  <span>Grand Total</span>
                  <span className="text-base text-[#2E5E3E]">₹{effectiveTotal}</span>
                </div>
              </div>

              {/* Security message */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl flex gap-2.5 items-start">
                <ShieldCheck className="w-4 h-4 text-[#2E5E3E] flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                  GST invoices are automatically generated upon order confirmation and are available for download in your customer dashboard.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  className="w-full py-3.5 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link
                  href="/products"
                  className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
