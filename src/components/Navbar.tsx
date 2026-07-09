'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, LogOut, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const NavbarContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout, login, loginWithGoogle } = useAuth();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginRole, setLoginRole] = useState<'customer' | 'admin'>('customer');
  const [errorMsg, setErrorMsg] = useState('');

  // Sync search input with URL search params
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/products');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMsg('Please enter an email.');
      return;
    }
    login(loginEmail.trim(), loginRole);
    setIsLoginModalOpen(false);
    setLoginEmail('');
    setErrorMsg('');
    router.refresh();
  };

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-primary text-white text-[10px] sm:text-xs py-2 px-4 sm:px-8 flex justify-between items-center tracking-wider font-light">
        <div>Free Shipping on orders above ₹999</div>
        <div className="flex gap-4">
          <Link href="/dashboard" className="hover:text-accent transition-colors">Track Order</Link>
          <span className="opacity-40">|</span>
          <Link href="/products" className="hover:text-accent transition-colors">Help & Support</Link>
        </div>
      </div>

      <header className="sticky top-0 z-50 glassmorphism w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo (Serif Naturelle Style) */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex flex-col items-start leading-none group">
                <span className="text-xl sm:text-2xl font-black tracking-widest text-primary font-serif">NATURELLE</span>
                <span className="text-[9px] font-bold text-accent uppercase tracking-widest mt-0.5">Hair Care</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex space-x-6 text-sm font-medium">
              <Link href="/" className="text-slate-600 hover:text-primary transition-colors">Home</Link>
              <Link href="/products" className="text-slate-600 hover:text-primary transition-colors">Shop</Link>
              <Link href="/products" className="text-slate-600 hover:text-primary transition-colors">Categories</Link>
              <Link href="/#bestsellers" className="text-slate-600 hover:text-primary transition-colors">Best Sellers</Link>
              <Link href="/products" className="text-slate-600 hover:text-primary transition-colors">About Us</Link>
              <Link href="/products" className="text-slate-600 hover:text-primary transition-colors">Contact</Link>
            </nav>

            {/* Search Bar (Rounded-lg, dark green button on right) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-grow max-w-xs xl:max-w-sm relative border border-slate-250 rounded-lg overflow-hidden bg-white shadow-sm">
              <input
                type="text"
                placeholder="Search for hair oils, serums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-xs font-light focus:outline-none placeholder:text-slate-400 text-primary"
              />
              <button type="submit" className="bg-primary hover:bg-primary-light text-white px-3.5 transition-colors flex items-center justify-center">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* User Interaction Actions */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              
              {/* Wishlist Button (Labeled) */}
              <Link href="/wishlist" className="hidden sm:flex items-center gap-1.5 text-slate-600 hover:text-primary transition-colors text-xs font-semibold relative">
                <div className="relative">
                  <Heart className="w-5 h-5 text-primary" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-[9px] font-bold text-white flex items-center justify-center rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span>Wishlist</span>
              </Link>

              {/* My Account (Labeled) */}
              <div className="flex items-center gap-2">
                {user ? (
                  <>
                    <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-1.5 text-slate-600 hover:text-primary transition-colors text-xs font-semibold">
                      <User className="w-5 h-5 text-primary" />
                      <span className="max-w-[70px] truncate">My Account</span>
                    </Link>
                    <button 
                      onClick={() => { logout(); router.push('/'); }} 
                      className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors hidden sm:inline-block"
                      title="Sign Out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsLoginModalOpen(true)} 
                    className="flex items-center gap-1.5 text-slate-600 hover:text-primary transition-colors text-xs font-semibold focus:outline-none"
                  >
                    <User className="w-5 h-5 text-primary" />
                    <span>My Account</span>
                  </button>
                )}
              </div>

              {/* Cart Button (Labeled) */}
              <Link href="/cart" className="flex items-center gap-1.5 text-slate-600 hover:text-primary transition-colors text-xs font-semibold relative">
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-[9px] font-bold text-white flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span>Cart</span>
              </Link>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1 text-slate-600 hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-4 animate-fade-in">
            {/* Search (Mobile) */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </form>
            <div className="flex flex-col space-y-3 font-medium text-slate-700">
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary py-1">Shop All</Link>
              <Link href="/products?category=botanical-oils" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary py-1">Botanical Oils</Link>
              <Link href="/products?category=active-serums" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary py-1">Active Serums</Link>
              <Link href="/products?category=hair-mists" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary py-1">Hair Mists</Link>
              <Link href="/products?category=scalp-therapy" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary py-1">Scalp Therapy</Link>
              <Link href="/products?category=treatment-sets" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary py-1">Treatment Sets</Link>
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
          <div className="bg-[#FAF9F5] rounded-2xl w-full max-w-md p-8 relative z-10 shadow-2xl border border-slate-200/55 animate-slide-up">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-2xl mb-1 block">🌿</span>
              <h2 className="text-2xl font-black text-primary tracking-tight font-serif">Access NATURELLE</h2>
              <p className="text-xs text-slate-400 mt-1">Experience botanical care at its absolute pinnacle</p>
            </div>

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={async () => {
                await loginWithGoogle();
                setIsLoginModalOpen(false);
              }}
              className="w-full py-2.5 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50/80 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-2.5 mb-5 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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

            {/* Separator */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Or credentials login</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLoginRole('customer')}
                    className={`py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      loginRole === 'customer'
                        ? 'border-primary bg-primary text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginRole('admin')}
                    className={`py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      loginRole === 'admin'
                        ? 'border-primary bg-primary text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Administrator
                  </button>
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-accent text-white hover:bg-accent-light rounded-xl text-sm font-semibold shadow-lg hover:shadow-accent/20 active:scale-[0.98] transition-all"
                >
                  Continue
                </button>
              </div>
            </form>

            <div className="mt-6 border-t border-slate-100 pt-4 text-center">
              <p className="text-xs text-slate-400">
                Quick testing tip: Enter <span className="font-semibold text-slate-600">admin@lendorastore.com</span> to test the Admin Panel instantly.
              </p>
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
