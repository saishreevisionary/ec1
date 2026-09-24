'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const router = useRouter();
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    gstAmount, 
    grandTotal, 
    totalItems,
    isCartDrawerOpen,
    closeCartDrawer 
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);
  const FREE_SHIPPING_THRESHOLD = 999;
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - grandTotal);
  const progressPercent = Math.min(100, Math.round((grandTotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartDrawerOpen, closeCartDrawer]);

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          ref={drawerRef}
          className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col border-l border-slate-200/80 animate-slide-left relative"
        >
          {/* Header */}
          <div className="p-5 bg-white border-b border-slate-200/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2E5E3E] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold font-serif text-[#132A1C] leading-tight">
                  Your Botanical Cart
                </h2>
                <span className="text-[11px] text-slate-500 font-light">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-5 py-3.5 bg-[#E8EFE9] border-b border-[#2E5E3E]/15">
            <div className="flex items-center justify-between text-xs mb-1.5">
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
            <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#2E5E3E] to-[#D4954B] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-xs">
                  <ShoppingBag className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-base font-bold text-[#132A1C] font-serif">Your cart is empty</h3>
                <p className="text-xs text-slate-400 font-light mt-1 max-w-xs">
                  Explore our pure essential oils, floral absolutes, and spice oleoresins.
                </p>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    router.push('/products');
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const maxStock = item.product.stock_quantity;
                return (
                  <div key={item.product_id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                    {/* Item Thumbnail */}
                    <div className="w-18 h-18 rounded-xl bg-white border border-slate-200 p-1 flex-shrink-0 overflow-hidden relative">
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Item Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCartDrawer}
                          className="text-xs font-bold text-[#132A1C] hover:text-[#D4954B] transition-colors truncate block leading-snug"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        ₹{item.price} each (18% GST)
                      </span>

                      {/* Quantity Selector & Item Total */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="p-1 rounded text-slate-500 hover:bg-slate-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-[#132A1C] select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            disabled={item.quantity >= maxStock}
                            className="p-1 rounded text-slate-500 hover:bg-slate-50 disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#132A1C]">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Actions */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-slate-200/80 space-y-4 shadow-lg">
              {/* Financial breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500 font-light">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-light">
                  <span>GST (18% inclusive)</span>
                  <span className="font-semibold text-slate-800">₹{gstAmount}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-light">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-700">
                    {amountNeeded === 0 ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-bold text-[#132A1C]">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#2E5E3E]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCartDrawer}
                  className="w-full py-3 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCartDrawer}
                  className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold uppercase tracking-wider text-center block transition-colors"
                >
                  View Full Cart & Apply Coupon
                </Link>
              </div>

              {/* Trust Micro-Badge */}
              <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-slate-400 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E5E3E]" />
                <span>100% Secure UPI Settlement · Direct from Distillers</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
