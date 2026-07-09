'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { QrCode, UploadCloud, CheckCircle, ArrowRight, ShieldCheck, CreditCard, Landmark } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/db';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, gstAmount, grandTotal, clearCart } = useCart();
  const { user } = useAuth();

  // Shipping Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // Payment Screenshot State
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Settings
  const [qrSettings, setQrSettings] = useState({
    company_name: "LendoraStore Premium Ltd",
    upi_id: "lendorastore@upi",
    instructions: "Please open any UPI enabled payment app. Scan the QR code, verify the amount matches your order grand total, and submit the payment. Take a screenshot of the successful transaction and upload it below to verify your order."
  });

  // Flow State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  useEffect(() => {
    // If cart is empty and we are not in success state, redirect to products
    if (cart.length === 0 && !isSuccess) {
      router.push('/products');
    }

    // Pre-populate fields if user is logged in
    if (user) {
      setName(user.name || '');
    }

    const loadSettings = async () => {
      const qrs = await db.getSetting('qr_settings', qrSettings);
      setQrSettings(qrs);
    };
    loadSettings();
  }, [cart, user, isSuccess]);

  // Handle Mock Screenshot Upload
  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
      
      // Simulate file upload progress
      setUploadProgress(0);
      const timer = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 20;
        });
      }, 100);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !city || !pincode) {
      alert("Please fill in all shipping details.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const orderData = {
      user_id: user?.id || 'anonymous-customer',
      subtotal,
      gst_amount: gstAmount,
      grand_total: grandTotal,
      shipping_name: name,
      shipping_phone: phone,
      shipping_address: address,
      shipping_city: city,
      shipping_pincode: pincode,
      payment_method: 'qr_code',
      payment_screenshot_url: screenshotPreview || 'mock-screenshot-receipt.png'
    };

    const orderItems = cart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      gst_rate: item.gst_rate,
      product: item.product
    }));

    try {
      const order = await db.createOrder(orderData, orderItems);
      setCreatedOrderId(order.id);
      setIsSuccess(true);
      clearCart();
    } catch (err) {
      alert("Error submitting order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main className="max-w-xl mx-auto px-4 py-20 text-center flex-grow flex flex-col justify-center items-center">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full w-fit mb-6 shadow-sm border border-emerald-100 animate-pulse">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight">Order Confirmed</h2>
          <p className="text-sm text-slate-500 font-light mt-3 max-w-sm leading-relaxed">
            Thank you for purchasing. Your order has been registered under ID <span className="font-semibold text-slate-700">{createdOrderId.substring(0, 8)}</span> and is pending merchant payment verification.
          </p>
          <p className="text-xs text-slate-400 font-light mt-2 max-w-sm">
            We will verify your uploaded payment screenshot and update the order status shortly. You can track this in your dashboard.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <Link
              href="/dashboard?tab=orders"
              className="flex-grow py-3 bg-primary text-white hover:bg-primary-light rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <span>Track Order</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="flex-grow py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center transition-colors"
            >
              Back to Store
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-light mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
          <span>/</span>
          <span className="text-primary font-normal">Checkout</span>
        </div>

        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Shipping Form & QR Payment */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Section 1: Shipping Address */}
            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-5">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">1</span>
                <h2 className="text-base font-bold text-primary">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Apartment, suite, unit, or street details"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New Delhi"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Pincode / Zip Code</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="110001"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: QR Payment Widget */}
            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-6">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">2</span>
                <h2 className="text-base font-bold text-primary">UPI QR Code Payment</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50 p-5 rounded-2xl">
                
                {/* QR Display */}
                <div className="md:col-span-4 flex flex-col items-center bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
                  {/* programmatically rendered vector QR Code */}
                  <div className="w-36 h-36 border border-slate-100 flex items-center justify-center relative">
                    <svg className="w-full h-full text-primary" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                      {/* Outer corner squares */}
                      <rect x="5" y="5" width="25" height="25" strokeWidth="3" rx="2" />
                      <rect x="10" y="10" width="15" height="15" fill="currentColor" opacity="0.1" />
                      
                      <rect x="70" y="5" width="25" height="25" strokeWidth="3" rx="2" />
                      <rect x="75" y="10" width="15" height="15" fill="currentColor" opacity="0.1" />
                      
                      <rect x="5" y="70" width="25" height="25" strokeWidth="3" rx="2" />
                      <rect x="10" y="75" width="15" height="15" fill="currentColor" opacity="0.1" />

                      {/* Random dot patterns representing a real QR */}
                      <path d="M 40 10 L 50 10 M 60 10 L 65 10 M 45 20 L 55 20 M 40 25 L 45 25 M 60 25 L 65 25 M 10 40 L 10 50 M 20 45 L 30 45 M 35 40 L 45 40 M 50 40 L 60 40 M 70 40 L 90 40 M 15 60 L 25 60 M 35 55 L 45 55 M 50 55 L 55 55 M 70 50 L 75 50 M 85 50 L 90 50 M 40 70 L 40 85 M 50 75 L 55 75 M 65 70 L 65 90 M 75 75 L 85 75 M 80 85 L 90 85" strokeWidth="3.5" strokeLinecap="round" />

                      {/* Logo in center */}
                      <rect x="38" y="38" width="24" height="24" rx="4" fill="white" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="50" cy="50" r="6" fill="#FF6B35" />
                    </svg>
                  </div>
                  
                  <span className="text-[10px] font-bold text-primary mt-3 uppercase tracking-wider">
                    {qrSettings.upi_id}
                  </span>
                </div>

                {/* QR Details */}
                <div className="md:col-span-8 space-y-3.5">
                  <div className="flex gap-2 items-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-[9px] uppercase font-bold tracking-wider">UPI Direct</span>
                    <span className="text-xs text-slate-400 font-light">Merchant: {qrSettings.company_name}</span>
                  </div>
                  <h3 className="text-sm font-bold text-primary">Scan to Pay: <span className="text-accent">₹{grandTotal}</span></h3>
                  <p className="text-xs font-light text-slate-500 leading-relaxed">
                    {qrSettings.instructions}
                  </p>
                </div>

              </div>

              {/* Screenshot Uploader */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider">
                  Upload Payment Screenshot (Required)
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-slate-350 rounded-2xl p-6 transition-all bg-slate-50/50 flex flex-col items-center justify-center text-center cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleScreenshotChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  
                  {screenshotPreview ? (
                    <div className="space-y-3">
                      <img src={screenshotPreview} alt="Receipt preview" className="w-16 h-16 object-cover rounded-lg mx-auto border border-slate-200" />
                      <div>
                        <p className="text-xs font-semibold text-primary">{screenshot?.name}</p>
                        <p className="text-[10px] text-slate-400 font-light">{(screenshot?.size || 0) / 1000} KB</p>
                      </div>
                      {uploadProgress < 100 ? (
                        <div className="w-32 bg-slate-200 h-1.5 rounded-full mx-auto overflow-hidden">
                          <div className="bg-primary h-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Upload Complete</span>
                      )}
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-slate-400 mb-2.5" />
                      <p className="text-xs font-semibold text-primary">Click to select receipt file</p>
                      <p className="text-[10px] text-slate-400 font-light mt-1">Supports PNG, JPG, PDF up to 5MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary Card */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200/50 p-6 rounded-2xl space-y-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-200/60 pb-3">
              Items Summary
            </h3>

            {/* List mini products */}
            <div className="max-h-56 overflow-y-auto pr-1 space-y-3 hide-scrollbar">
              {cart.map((item) => (
                <div key={item.product_id} className="flex gap-3 items-center justify-between text-xs">
                  <div className="flex gap-2.5 items-center flex-1 min-w-0">
                    <img src={item.image_url} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-slate-100" />
                    <div className="min-w-0">
                      <p className="font-semibold text-primary truncate">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-light">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-primary text-right">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Pricing details */}
            <div className="border-t border-slate-200/60 pt-4 space-y-3 text-xs font-light text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-primary">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="font-semibold text-primary">₹{gstAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Expedited Shipping</span>
                <span className="font-semibold text-emerald-600 uppercase text-[9px] tracking-wider">Free</span>
              </div>
              <div className="border-t border-slate-200/60 pt-4 flex justify-between text-sm font-extrabold text-primary">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            {/* Guarantee */}
            <div className="p-3.5 bg-white border border-slate-200/60 rounded-xl flex gap-2.5">
              <ShieldCheck className="w-4.5 h-4.5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                By clicking "Place Order", you agree to pay the grand total of ₹{grandTotal} to the merchant. Order status will be updated to "Confirmed" once payment is validated.
              </p>
            </div>

            {/* Order action */}
            <button
              type="submit"
              disabled={isSubmitting || !screenshot}
              className="w-full py-4 bg-accent hover:bg-accent-light text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-accent/10 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </main>

      <Footer />
    </>
  );
}
