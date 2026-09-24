'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, LogOut, Menu, X, ArrowRight, Mail, Lock, Eye, EyeOff, Leaf, CheckCircle2, Beaker, Sun, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const NavbarContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout, login, loginWithGoogle, register } = useAuth();
  const { totalItems, openCartDrawer } = useCart();
  const { wishlist } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Custom states for redesigned premium login/register split-layout UI
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [cartImpact, setCartImpact] = useState(false);
  const [wishlistImpact, setWishlistImpact] = useState(false);

  // Sync search input with URL search params
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const handleCartImpact = () => {
      setCartImpact(true);
      const timer = setTimeout(() => setCartImpact(false), 450);
      return () => clearTimeout(timer);
    };

    window.addEventListener('cart-impact', handleCartImpact);
    return () => window.removeEventListener('cart-impact', handleCartImpact);
  }, []);

  useEffect(() => {
    const handleWishlistImpact = () => {
      setWishlistImpact(true);
      const timer = setTimeout(() => setWishlistImpact(false), 450);
      return () => clearTimeout(timer);
    };

    window.addEventListener('wishlist-impact', handleWishlistImpact);
    return () => window.removeEventListener('wishlist-impact', handleWishlistImpact);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/products');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMsg('Please enter an email.');
      return;
    }
    
    try {
      if (isRegisterMode) {
        if (!fullName.trim()) {
          setErrorMsg('Please enter your name.');
          return;
        }
        await register(loginEmail.trim(), fullName.trim());
      } else {
        await login(loginEmail.trim());
      }
      
      setLoginSuccess(true);
      
      // Delay closing modal to show success visual
      setTimeout(() => {
        setIsLoginModalOpen(false);
        setLoginSuccess(false);
        setLoginEmail('');
        setFullName('');
        setPassword('');
        setErrorMsg('');
        router.refresh();
      }, 4000);
      
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    }
  };

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1F452C] text-[#B5D3BC] text-[10px] sm:text-xs py-2 px-4 sm:px-8 flex justify-between items-center tracking-wider font-light">
        <div>Venuss Herbo Aromatics — Natural Botanical Extracts & Essential Oils</div>
        <div className="flex gap-4">
          <Link href="/contact" className="hover:text-[#D4954B] transition-colors">sales@venuss.co.in</Link>
          <span className="opacity-40">|</span>
          <Link href="/contact" className="hover:text-[#D4954B] transition-colors">+91 4563 244154</Link>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-[#F5F2E9]/98 backdrop-blur-md w-full border-b border-[#2E5E3E]/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-6">
            
            {/* Logo (Venuss Herbo Aromatics Leaf Emblem) */}
            <div className="flex-shrink-0 flex items-center">
              <Link id="tour-logo" href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-full bg-[#2E5E3E] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Leaf className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-base sm:text-lg font-bold tracking-wider text-[#2E5E3E] font-serif uppercase">
                    VENUSS
                  </span>
                  <span className="text-[8px] font-bold text-[#8C8678] uppercase tracking-widest">
                    HERBO AROMATICS
                  </span>
                </div>
              </Link>
            </div>

            {/* Simple Clean Desktop Navigation Links */}
            <nav id="tour-categories" className="hidden md:flex space-x-6 lg:space-x-8 text-xs font-bold tracking-wider uppercase">
              <Link href="/" className="text-[#6B665A] hover:text-[#2E5E3E] transition-colors py-1">Home</Link>
              <Link href="/products" className="text-[#6B665A] hover:text-[#2E5E3E] transition-colors py-1">Shop</Link>
              <Link href="/products" className="text-[#6B665A] hover:text-[#2E5E3E] transition-colors py-1">Categories</Link>
              <Link href="/about" className="text-[#6B665A] hover:text-[#2E5E3E] transition-colors py-1">About</Link>
              <Link href="/about" className="text-[#6B665A] hover:text-[#2E5E3E] transition-colors py-1">Sustainability</Link>
              <Link href="/contact" className="text-[#6B665A] hover:text-[#2E5E3E] transition-colors py-1">Contact</Link>
            </nav>

            {/* Search & Action Icons */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              
              {/* Search Bar matching Reference Image */}
              <form id="tour-search" onSubmit={handleSearchSubmit} className="hidden sm:flex items-center border border-[#254936]/18 rounded-full bg-white shadow-2xs pl-3.5 pr-1 py-1 focus-within:border-[#102C20] transition-colors">
                <input
                  type="text"
                  placeholder="Search products, extracts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 lg:w-48 text-xs font-normal focus:outline-none placeholder:text-[#5F7C5D]/60 text-[#102C20]"
                />
                <button type="submit" className="w-7 h-7 rounded-full bg-[#102C20] hover:bg-[#1E4533] text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow-xs" title="Search">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Wishlist Icon */}
              <Link 
                id="tour-wishlist" 
                href="/wishlist" 
                className="flex items-center text-[#2E5E3E] hover:text-[#D4954B] transition-all relative p-1"
                title="Wishlist"
              >
                <div className="relative">
                  <Heart className={`w-5 h-5 ${wishlistImpact ? 'fill-[#D4954B] text-[#D4954B]' : ''}`} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4954B] text-[9px] font-bold text-white flex items-center justify-center rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </div>
              </Link>

              {/* Account Button & Admin Pill */}
              <div id="tour-account" className="flex items-center gap-2">
                {user && user.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#132A1C] text-[#D4954B] border border-[#D4954B]/30 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-[#1a3825] transition-all shadow-xs"
                    title="Administrative Control Panel"
                  >
                    <Shield className="w-3 h-3 text-[#D4954B]" />
                    <span>Admin Console</span>
                  </Link>
                )}

                {user ? (
                  <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center text-[#2E5E3E] hover:text-[#D4954B] transition-colors p-1" title="Account">
                    <User className="w-5 h-5 text-[#2E5E3E]" />
                  </Link>
                ) : (
                  <button 
                    onClick={() => setIsLoginModalOpen(true)} 
                    className="flex items-center text-[#2E5E3E] hover:text-[#D4954B] transition-colors p-1 focus:outline-none"
                    title="Account"
                  >
                    <User className="w-5 h-5 text-[#2E5E3E]" />
                  </button>
                )}
              </div>

              {/* Cart Button with Slide-out Drawer */}
              <button 
                id="tour-cart" 
                type="button"
                onClick={openCartDrawer} 
                className="flex items-center text-[#2E5E3E] hover:text-[#D4954B] transition-all relative p-1 cursor-pointer"
                title="View Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#2E5E3E]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4954B] text-[9px] font-bold text-white flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
              </button>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1 text-[#2E5E3E] hover:text-[#D4954B] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#2E5E3E]/10 bg-[#F5F2E9]/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-4 animate-fade-in">
            {/* Search (Mobile) */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2E5E3E]/20 rounded-full text-sm focus:outline-none text-[#2E5E3E]"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </form>
            <div className="flex flex-col space-y-2.5 font-bold text-xs uppercase tracking-wider text-[#2E5E3E]">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4954B] py-2 border-b border-slate-200/50">Home</Link>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4954B] py-2 border-b border-slate-200/50">Shop Catalog</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4954B] py-2 border-b border-slate-200/50">About Our Distilleries</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4954B] py-2 border-b border-slate-200/50">Contact & Quotes</Link>
              <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4954B] py-2 border-b border-slate-200/50 flex items-center justify-between">
                <span>Saved Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="px-2 py-0.5 bg-[#D4954B] text-white rounded-full text-[10px]">{wishlist.length}</span>
                )}
              </Link>
              <button 
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCartDrawer();
                }} 
                className="hover:text-[#D4954B] py-2 border-b border-slate-200/50 flex items-center justify-between text-left w-full cursor-pointer uppercase font-bold text-xs"
              >
                <span>Shopping Cart</span>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 bg-[#2E5E3E] text-white rounded-full text-[10px]">{totalItems}</span>
                )}
              </button>

              {/* User Account / Auth Mobile Section */}
              <div className="pt-2 border-t border-[#2E5E3E]/15">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 py-1 text-slate-600 normal-case font-normal text-xs">
                      <User className="w-4 h-4 text-[#2E5E3E]" />
                      <span className="font-semibold text-[#132A1C]">{user.name || user.email}</span>
                    </div>
                    {user.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="flex items-center gap-2 py-1.5 text-[#D4954B] hover:text-[#b37936]"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin Console</span>
                      </Link>
                    )}
                    <Link 
                      href="/dashboard" 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="block py-1 text-[#2E5E3E] hover:text-[#D4954B]"
                    >
                      My Dashboard & Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-1.5 py-1 text-red-600 hover:text-red-700 text-xs font-semibold uppercase tracking-wider"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pt-1">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 bg-[#2E5E3E] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
                    >
                      Sign In / Register
                    </Link>
                    <Link
                      href="/admin/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center py-1 text-[11px] text-slate-500 hover:text-slate-700 normal-case font-light"
                    >
                      Admin Portal Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* LOGIN MODAL */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsLoginModalOpen(false)}></div>
          
          {/* Modal Container */}
          {/* Modal Container */}
          <div className="bg-[#FAF9F5] rounded-3xl w-full max-w-4xl overflow-hidden relative z-10 shadow-2xl border border-slate-200/55 animate-slide-up flex flex-col md:flex-row min-h-[580px]">
            
            {/* Left Side: Brand Visual (Desktop only) */}
            <div className="hidden md:flex md:w-1/2 relative bg-slate-900 overflow-hidden flex-col justify-between p-10 text-white">
              {/* Background Image with botanical bottle */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-luminosity hover:opacity-100 transition-opacity duration-700" 
                style={{ backgroundImage: "url('/login-bg.png')" }}
              ></div>
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-slate-900/40 to-transparent"></div>
              
              <div className="relative z-10">
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-300 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" /> Nourish. Care. Shine.
                </span>
                <h2 className="text-3xl font-serif font-semibold mt-4 leading-tight tracking-tight max-w-xs">
                  Stronger Roots, <br />
                  <span className="text-emerald-300">Beautiful You.</span>
                </h2>
                <p className="text-xs text-slate-300 font-light mt-3 leading-relaxed max-w-xs">
                  Premium hair care solutions made with nature's finest ingredients.
                </p>
              </div>

              {/* Bottom Proposition Columns */}
              <div className="grid grid-cols-3 gap-3 relative z-10 border-t border-white/10 pt-6 mt-8">
                <div className="flex flex-col items-start text-left">
                  <Leaf className="w-5 h-5 text-emerald-300 mb-2" />
                  <span className="text-[10px] font-bold text-white leading-tight">100% Natural</span>
                  <span className="text-[9px] text-slate-300 font-light">Ingredients</span>
                </div>
                <div className="flex flex-col items-start text-left">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 mb-2" />
                  <span className="text-[10px] font-bold text-white leading-tight">Clinically</span>
                  <span className="text-[9px] text-slate-300 font-light">Tested</span>
                </div>
                <div className="flex flex-col items-start text-left">
                  <Beaker className="w-5 h-5 text-emerald-300 mb-2" />
                  <span className="text-[10px] font-bold text-white leading-tight">Safe &</span>
                  <span className="text-[9px] text-slate-300 font-light">Effective</span>
                </div>
              </div>
            </div>

            {/* Right Side: Form Content */}
            <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-between relative bg-white min-h-[580px]">
              {loginSuccess ? (
                /* Success Animation inside the Right Panel (Checkmark & Sparkle Burst) */
                <div className="flex-1 flex flex-col items-center justify-center p-4 text-center select-none my-auto relative overflow-hidden animate-[fade-in-up_0.6s_ease-out_forwards]">
                  <style>{`
                    @keyframes scale-up {
                      0% { transform: scale(0); opacity: 0; }
                      100% { transform: scale(1); opacity: 1; }
                    }
                    @keyframes draw-check {
                      0% { transform: scale(0); opacity: 0; }
                      70% { transform: scale(1.2); opacity: 1; }
                      100% { transform: scale(1); opacity: 1; }
                    }
                    @keyframes fade-in-up {
                      0% { transform: translateY(15px); opacity: 0; }
                      100% { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes ring-out {
                      0% { transform: scale(0.6); opacity: 0.8; }
                      100% { transform: scale(1.4); opacity: 0; border-width: 1px; }
                    }
                    @keyframes particle-burst-1 {
                      0% { transform: translate(0, 0) scale(1); opacity: 1; }
                      100% { transform: translate(-45px, -55px) scale(0.5); opacity: 0; }
                    }
                    @keyframes particle-burst-2 {
                      0% { transform: translate(0, 0) scale(1); opacity: 1; }
                      100% { transform: translate(50px, -40px) scale(0.5); opacity: 0; }
                    }
                    @keyframes particle-burst-3 {
                      0% { transform: translate(0, 0) scale(1); opacity: 1; }
                      100% { transform: translate(-35px, 50px) scale(0.5); opacity: 0; }
                    }
                    @keyframes particle-burst-4 {
                      0% { transform: translate(0, 0) scale(1); opacity: 1; }
                      100% { transform: translate(40px, 55px) scale(0.5); opacity: 0; }
                    }
                    @keyframes shimmer-loader {
                      0% { width: 0%; }
                      100% { width: 100%; }
                    }
                    .success-ring {
                      border: 2px solid rgba(45, 74, 62, 0.25);
                      animation: ring-out 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) 0.3s forwards;
                    }
                  `}</style>
                  
                  <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                    {/* Animated ripple rings */}
                    <div className="absolute inset-0 rounded-full success-ring"></div>
                    <div className="absolute inset-2 rounded-full success-ring" style={{ animationDelay: '0.2s' }}></div>
                    
                    {/* Burst sparkles (gold circles) */}
                    <div className="absolute w-2 h-2 bg-[#b58c54] rounded-full blur-[0.5px]" style={{ animation: 'particle-burst-1 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.5s forwards' }}></div>
                    <div className="absolute w-2.5 h-2.5 bg-[#b58c54] rounded-full blur-[0.5px]" style={{ animation: 'particle-burst-2 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.5s forwards' }}></div>
                    <div className="absolute w-1.5 h-1.5 bg-[#b58c54] rounded-full blur-[0.5px]" style={{ animation: 'particle-burst-3 1.4s cubic-bezier(0.25, 1, 0.5, 1) 0.5s forwards' }}></div>
                    <div className="absolute w-2 h-2 bg-[#b58c54] rounded-full blur-[0.5px]" style={{ animation: 'particle-burst-4 1.3s cubic-bezier(0.25, 1, 0.5, 1) 0.5s forwards' }}></div>

                    {/* Highly-reliable animated checkmark */}
                    <div 
                      className="w-18 h-18 bg-[#2d4a3e] rounded-full flex items-center justify-center shadow-md relative z-10 animate-[scale-up_0.5s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
                    >
                      <CheckCircle2 
                        className="w-10 h-10 text-white animate-[draw-check_0.5s_ease-out_0.4s_forwards]" 
                        style={{ transform: 'scale(0)', opacity: 0 }} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2 max-w-xs">
                    <span 
                      className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase block animate-[fade-in-up_0.5s_ease-out_0.8s_forwards]" 
                      style={{ opacity: 0 }}
                    >
                      🌿 You're In!
                    </span>
                    <h4 
                      className="text-xl font-serif text-primary font-bold animate-[fade-in-up_0.5s_ease-out_1.0s_forwards]" 
                      style={{ opacity: 0 }}
                    >
                      Login Successful!
                    </h4>
                    <p 
                      className="text-xs text-slate-400 font-light leading-relaxed animate-[fade-in-up_0.5s_ease-out_1.2s_forwards]" 
                      style={{ opacity: 0 }}
                    >
                      Let's make your hair goals a reality.
                    </p>
                  </div>

                  {/* Bottom progress bar loader */}
                  <div 
                    className="relative w-28 h-0.5 bg-slate-100 rounded-full overflow-hidden mt-8 animate-[fade-in-up_0.5s_ease-out_1.3s_forwards]" 
                    style={{ opacity: 0 }}
                  >
                    <div 
                      className="absolute inset-y-0 left-0 bg-[#2d4a3e] rounded-full animate-[shimmer-loader_2.5s_linear_forwards]" 
                    ></div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Close Button */}
                  <button
                    onClick={() => setIsLoginModalOpen(false)}
                    className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors z-20"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Theme Toggle Indicator */}
                  <div className="absolute top-5 right-14 print:hidden">
                    <div className="p-2 border border-slate-150 rounded-full text-slate-400 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                      <Sun className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>

                  {/* Form Container */}
                  <div className="my-auto">
                    <div className="mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                        🌿 {isRegisterMode ? 'Welcome' : 'Welcome Back'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-primary tracking-tight font-serif mt-1">
                        {isRegisterMode ? 'Create Account' : 'Welcome Back!'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 font-light">
                        {isRegisterMode ? 'Sign up to start saving your profile' : 'Sign in to continue to your account'}
                      </p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      {isRegisterMode && (
                        <div>
                          <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Your full name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400 bg-slate-50/50"
                              required
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            placeholder="name@example.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400 bg-slate-50/50"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400 bg-slate-50/50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {!isRegisterMode && (
                        <div className="flex justify-end">
                          <button 
                            type="button" 
                            onClick={() => alert("Please use magic links or Google login for secure instant access.")}
                            className="text-[10px] font-bold text-primary hover:underline"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      )}

                      {errorMsg && (
                        <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
                      )}

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="group w-full py-3 bg-[#2d4a3e] hover:bg-[#20352c] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-[#2d4a3e]/15 flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                        >
                          <span>{isRegisterMode ? 'Sign Up' : 'Sign In'}</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                        </button>
                      </div>
                    </form>

                    {/* Separator */}
                    <div className="flex items-center gap-3 my-5">
                      <div className="flex-1 h-px bg-slate-200"></div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
                      <div className="flex-1 h-px bg-slate-200"></div>
                    </div>

                    {/* Social Login Button */}
                    <div className="mb-6">
                      <button
                        type="button"
                        onClick={async () => {
                          await loginWithGoogle();
                          setLoginSuccess(true);
                          setTimeout(() => {
                            setIsLoginModalOpen(false);
                            setLoginSuccess(false);
                            router.push('/dashboard?tab=profile&promptPassword=true');
                          }, 4000);
                        }}
                        className="group w-full py-2.5 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50/70 rounded-xl text-xs font-semibold text-slate-700 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4 flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-300" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span>Continue with Google</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Footer Switcher */}
                  <div className="text-center pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setLoginEmail('customer@venuss.co.in');
                          setPassword('••••••••');
                        }}
                        className="text-[11px] text-emerald-800 hover:text-emerald-950 font-semibold underline decoration-dotted"
                      >
                        ⚡ Fill Demo Customer
                      </button>

                      <Link
                        href="/admin/login"
                        onClick={() => setIsLoginModalOpen(false)}
                        className="text-[11px] text-slate-500 hover:text-slate-800 font-medium inline-flex items-center gap-1"
                      >
                        <span>Admin Console</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsRegisterMode(!isRegisterMode);
                          setErrorMsg('');
                        }}
                        className="text-xs font-semibold text-emerald-800 hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          {isRegisterMode
                            ? 'Already have an account? Sign In'
                            : "Don't have an account? Create one"}
                        </span>
                      </button>
                    </div>
                  </div>

                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Navbar = () => {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 glassmorphism w-full h-16 sm:h-20 flex items-center justify-between px-8 bg-white border-b border-slate-150">
        <div className="font-extrabold text-primary flex items-center gap-1.5 font-serif">
          <span>NATURELLE</span>
        </div>
      </header>
    }>
      <NavbarContent />
    </Suspense>
  );
};

export default Navbar;
