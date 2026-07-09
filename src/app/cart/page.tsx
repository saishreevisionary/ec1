'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, gstAmount, grandTotal, totalItems } = useCart();

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
          /* Empty State */
          <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-3xl max-w-xl mx-auto my-8 px-6">
            <span className="inline-block p-4 rounded-full bg-white border border-slate-100 shadow-sm text-slate-400 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </span>
            <h3 className="text-lg font-bold text-primary">Your Cart is Empty</h3>
            <p className="text-sm text-slate-400 font-light mt-1.5 max-w-sm mx-auto">
              Before you can check out, you must add some premium items to your shopping cart.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary text-white hover:bg-primary-light rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm active:scale-95"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200/50 p-6 rounded-2xl space-y-6">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200/60 pb-3">
                Order Summary
              </h3>

              <div className="space-y-3.5 text-xs font-light text-slate-500">
                <div className="flex justify-between">
                  <span>Cart Items Subtotal</span>
                  <span className="font-semibold text-primary">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Amount (18%)</span>
                  <span className="font-semibold text-primary">₹{gstAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-semibold text-emerald-600 uppercase tracking-wider text-[10px]">Free</span>
                </div>
                
                <div className="border-t border-slate-200/60 pt-4 flex justify-between text-sm font-extrabold text-primary">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Security message */}
              <div className="p-3.5 bg-white border border-slate-200/60 rounded-xl flex gap-2.5 items-start">
                <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                  GST invoices are automatically generated upon order confirmation and are available for download in your dashboard profile.
                </p>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-accent/15 active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link
                  href="/products"
                  className="w-full py-3 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center transition-colors"
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
