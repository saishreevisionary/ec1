'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  User, ShoppingBag, MapPin, Heart, Edit2, CheckCircle2, 
  ChevronRight, Lock, Eye, EyeOff, ShieldCheck, FileText, 
  Package, LogOut, Plus, Trash2, ArrowRight, AlertCircle, Sparkles, Clock, Check,
  Receipt, Printer, X
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { db, isSupabaseConfigured } from '@/lib/db';

type TabKey = 'profile' | 'enquiries' | 'orders' | 'addresses' | 'wishlist';

function CustomerAccountInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login, register, resetPassword, logout, isLoading } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<TabKey>('profile');

  // Sign in / Register inline state if unauthenticated
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [authTermsAccepted, setAuthTermsAccepted] = useState(false);
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Profile data
  const [profileName, setProfileName] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Password update
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Customer data lists
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any | null>(null);

  // Address modal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrPincode, setAddrPincode] = useState('');

  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get('tab') as TabKey;
    if (tab && ['profile', 'enquiries', 'orders', 'addresses', 'wishlist'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Load customer data when authenticated
  useEffect(() => {
    if (user) {
      setProfileName(user.name);
      loadCustomerData();
    }
  }, [user]);

  const loadCustomerData = async () => {
    if (!user) return;
    try {
      // 1. Enquiries / Quote Requests
      const userEnquiries = await db.getInquiries(user.id, user.email);
      setEnquiries(userEnquiries);

      // 2. Orders
      const userOrders = await db.getOrders(user.id);
      setOrders(userOrders);

      // 3. Addresses
      const userAddresses = await db.getAddresses(user.id);
      setAddresses(userAddresses);
    } catch (e) {
      console.error('Failed to load customer data:', e);
    }
  };

  // Inline sign-in handler
  const handleInlineSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Please enter both email address and password.');
      return;
    }

    setAuthSubmitting(true);
    const res = await login(authEmail.trim(), authPassword.trim(), 'customer');
    setAuthSubmitting(false);

    if (!res.success) {
      setAuthError(res.error || 'Authentication failed. Please verify credentials.');
    } else {
      showToast('Welcome back to your customer account!', 'success');
    }
  };

  // Inline registration handler
  const handleInlineRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!authName.trim()) {
      setAuthError('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authEmail.trim())) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (authPassword.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }
    if (authPassword !== authConfirmPassword) {
      setAuthError('Passwords do not match. Please re-enter.');
      return;
    }
    if (!authTermsAccepted) {
      setAuthError('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    setAuthSubmitting(true);
    const res = await register(authEmail.trim(), authName.trim(), authPassword.trim());
    setAuthSubmitting(false);

    if (!res.success) {
      setAuthError(res.error || 'Registration failed. Please try again.');
    } else {
      showToast('Account created successfully! Welcome to Venuss.', 'success');
    }
  };

  // Save profile name
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profileName.trim()) return;

    setUpdatingProfile(true);
    try {
      await db.updateUserProfile(user.id, { name: profileName.trim() });
      setIsEditingProfile(false);
      showToast('Profile specifications updated successfully!', 'success');
    } catch (err: any) {
      showToast('Failed to update profile: ' + (err?.message || 'Error'), 'error');
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setIsChangingPassword(true);
    const res = await resetPassword(user!.email, newPassword);
    setIsChangingPassword(false);

    if (res.success) {
      setPasswordMsg({ type: 'success', text: 'Password successfully updated!' });
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setPasswordMsg({ type: '', text: '' }), 5000);
    } else {
      setPasswordMsg({ type: 'error', text: res.error || 'Failed to update password.' });
    }
  };

  // Add Address
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newAddr = {
      name: addrName.trim(),
      phone: addrPhone.trim(),
      street_address: addrStreet.trim(),
      city: addrCity.trim(),
      pincode: addrPincode.trim(),
      is_default: addresses.length === 0,
    };

    const saved = await db.saveAddress(user.id, newAddr);
    setAddresses(prev => [...prev, saved]);
    setIsAddressModalOpen(false);
    setAddrName('');
    setAddrPhone('');
    setAddrStreet('');
    setAddrCity('');
    setAddrPincode('');
    showToast('Delivery address saved successfully!', 'success');
  };

  // Delete Address
  const handleDeleteAddress = async (addrId: string) => {
    if (!user) return;
    await db.deleteAddress(user.id, addrId);
    setAddresses(prev => prev.filter(a => a.id !== addrId));
    showToast('Address removed.', 'info');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="w-9 h-9 border-2 border-[#173B2B]/20 border-t-[#173B2B] rounded-full animate-spin" />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // UNAUTHENTICATED STATE: CUSTOMER SIGN-IN / REGISTRATION PORTAL
  // ─────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col font-sans">
        <Navbar />

        <main className="flex-1 max-w-lg mx-auto px-4 py-12 sm:py-16 w-full animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#173B2B] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
              <User className="w-7 h-7 text-[#DCE5D5]" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#173B2B] tracking-tight">
              Customer Account Portal
            </h1>
            <p className="text-sm text-[#4A5D50] mt-1.5 font-medium">
              Access your commercial inquiries, TDS specs, orders, and saved botanicals
            </p>

            {/* Dev Mode Notification */}
            {!isSupabaseConfigured() && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4954B]/10 border border-[#D4954B]/30 rounded-full text-[11px] font-semibold text-[#8B5E2B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4954B]" />
                <span>Simulated Secure Authentication (SHA-256 Vault)</span>
              </div>
            )}
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-3xl border border-[#173B2B]/12 p-6 sm:p-8 shadow-sm">
            {/* Tabs toggle */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setAuthError(''); }}
                className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  authMode === 'signin'
                    ? 'bg-white text-[#173B2B] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setAuthError(''); }}
                className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  authMode === 'register'
                    ? 'bg-white text-[#173B2B] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
            </div>

            {authError && (
              <div className="p-3.5 mb-5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-700 font-medium">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {authMode === 'signin' ? (
              <form onSubmit={handleInlineSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#173B2B] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] font-medium"
                    placeholder="customer@domain.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#173B2B] uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => showToast('In development mode, you may reset password or register a new account.', 'info')}
                      className="text-[11px] font-semibold text-[#D4954B] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showAuthPassword ? 'text' : 'password'}
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full h-11 pl-3.5 pr-10 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] font-medium"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAuthPassword(!showAuthPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    >
                      {showAuthPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full h-12 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-sm font-bold tracking-wide transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {authSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleInlineRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#173B2B] uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] font-medium"
                    placeholder="e.g. Dr. Aravind Swamy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B2B] uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] font-medium"
                    placeholder="aravind@formulations.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B2B] uppercase tracking-wider mb-1.5">
                    Password (min 6 characters) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] font-medium"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B2B] uppercase tracking-wider mb-1.5">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={authConfirmPassword}
                    onChange={(e) => setAuthConfirmPassword(e.target.value)}
                    className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] font-medium"
                    placeholder="••••••••"
                  />
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer pt-1 select-none">
                  <input
                    type="checkbox"
                    checked={authTermsAccepted}
                    onChange={(e) => setAuthTermsAccepted(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#173B2B] focus:ring-[#173B2B] mt-0.5 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-normal">
                    I agree to the <Link href="/contact" className="text-[#173B2B] font-bold underline">Terms of Service</Link> and <Link href="/contact" className="text-[#173B2B] font-bold underline">Privacy Policy</Link> for commercial customer access.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full h-12 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-sm font-bold tracking-wide transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {authSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // AUTHENTICATED STATE: FULL CUSTOMER ACCOUNT PORTAL
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full animate-fade-in">
        
        {/* Customer Header Banner */}
        <div className="bg-white rounded-3xl border border-[#173B2B]/12 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 shadow-xs">
          <div className="flex items-center gap-4.5">
            <div className="w-16 h-16 rounded-full bg-[#173B2B] text-white flex items-center justify-center text-xl font-heading font-extrabold shadow-sm border-2 border-white shrink-0">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#173B2B]">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#173B2B]/10 text-[#173B2B] border border-[#173B2B]/20">
                  {user.role === 'admin' ? 'Store Administrator' : 'Verified Customer'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="h-10 px-4 bg-[#132A1C] hover:bg-[#1a3825] text-[#D4954B] border border-[#D4954B]/30 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs"
              >
                <span>Admin Console</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}

            <button
              type="button"
              onClick={async () => {
                await logout();
                showToast('Signed out successfully.', 'info');
                router.push('/');
              }}
              className="h-10 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#173B2B]/15 pb-2 mb-8 overflow-x-auto">
          {[
            { key: 'profile', label: 'Profile & Security', icon: User },
            { key: 'enquiries', label: `My Enquiries (${enquiries.length})`, icon: FileText },
            { key: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { key: 'wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: Heart },
            { key: 'addresses', label: `Addresses (${addresses.length})`, icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveTab(tab.key as TabKey);
                  router.replace(`/account?tab=${tab.key}`);
                }}
                className={`h-11 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#173B2B] text-white shadow-xs'
                    : 'text-[#4A5D50] hover:text-[#173B2B] hover:bg-white/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#DCE5D5]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =======================================================
            TAB 1: PROFILE & SECURITY SPECIFICATIONS
            ======================================================= */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Info */}
            <div className="bg-white rounded-3xl border border-[#173B2B]/12 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-heading text-lg font-bold text-[#173B2B]">
                  Customer Profile
                </h3>
                {!isEditingProfile && (
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#173B2B] hover:text-[#25523D] cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Name</span>
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173B2B] uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#173B2B] font-medium"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={updatingProfile}
                      className="h-10 px-5 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsEditingProfile(false); setProfileName(user.name); }}
                      className="h-10 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Name</span>
                    <p className="text-base font-semibold text-[#173B2B]">{user.name}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
                    <p className="text-base font-semibold text-[#173B2B]">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Role</span>
                    <p className="text-sm font-semibold capitalize text-[#2E5E3E]">{user.role}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Registered Since</span>
                    <p className="text-sm font-medium text-slate-600">
                      {new Date(user.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Password Change */}
            <div className="bg-white rounded-3xl border border-[#173B2B]/12 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-[#173B2B]">
                  Security &amp; Password
                </h3>
                <Lock className="w-4 h-4 text-slate-400" />
              </div>

              {passwordMsg.text && (
                <div className={`p-3 rounded-xl text-xs font-medium ${
                  passwordMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {passwordMsg.text}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#173B2B] uppercase tracking-wider mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-11 pl-3.5 pr-10 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#173B2B] font-medium"
                      placeholder="Minimum 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B2B] uppercase tracking-wider mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#173B2B] font-medium"
                    placeholder="Repeat new password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="h-11 px-6 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  {isChangingPassword ? 'Updating…' : 'Update Password'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =======================================================
            TAB 2: MY ENQUIRIES & COMMERCIAL QUOTE REQUESTS
            ======================================================= */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#173B2B]">
                  Commercial Inquiries &amp; Quotation Requests
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Track bulk pricing, custom extraction requests, and regulatory COA enquiries
                </p>
              </div>
              <Link
                href="/contact?type=quote"
                className="h-10 px-4 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-xs shrink-0 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Request New Quote</span>
              </Link>
            </div>

            {enquiries.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#173B2B]/12 p-10 sm:p-14 text-center shadow-xs">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-heading text-base sm:text-lg font-bold text-[#173B2B] mb-1">
                  No Active Quotation Requests
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  You haven't requested commercial quotes yet. Need custom formulations, bulk barrel pricing, or COA documentation for your lab?
                </p>
                <Link
                  href="/contact?type=quote"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                >
                  <span>Submit Commercial Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[#173B2B] uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-md">
                          {enq.inquiry_type || 'Quote'}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          {enq.status === 'new' ? 'Under Regulatory Review' : 'Quote Prepared'}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(enq.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-heading text-base font-bold text-[#173B2B] pt-1">
                        {enq.product_name ? `Product: ${enq.product_name}` : `Category: ${enq.product_category || 'Botanical Extracts'}`}
                      </h4>
                      {enq.company && (
                        <p className="text-xs text-slate-500 font-medium">Company: {enq.company}</p>
                      )}
                      <p className="text-xs text-slate-600 line-clamp-2 pt-1 font-normal bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        "{enq.message}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            TAB 3: MY ORDERS
            ======================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-[#173B2B]">
                Order History &amp; Logistics
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Review commercial dispatch status, customs tracking, and GST tax invoices
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#173B2B]/12 p-10 sm:p-14 text-center shadow-xs">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-heading text-base sm:text-lg font-bold text-[#173B2B] mb-1">
                  No Past Orders Found
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  Your account currently has no completed commercial orders. Explore our catalogue to sample verified botanical extracts.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                >
                  <span>Explore Botanical Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {orders.map((order) => {
                  const itemsCount = (order.order_items?.length ?? order.items?.length) || 1;
                  const total = Number(order.grand_total ?? order.total_amount ?? 0);
                  const isVerified = order.payment_verified || ['confirmed', 'shipped', 'delivered'].includes(order.status);
                  const isCancelled = order.status === 'cancelled';

                  return (
                    <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#173B2B]">
                            Order #{order.id ? order.id.slice(0, 8).toUpperCase() : 'UNKNOWN'}
                          </span>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md capitalize ${
                            isVerified 
                              ? 'text-emerald-700 bg-emerald-50' 
                              : isCancelled 
                              ? 'text-red-700 bg-red-50' 
                              : 'text-amber-700 bg-amber-50'
                          }`}>
                            {isVerified 
                              ? (order.status === 'delivered' ? 'Delivered' : order.status === 'shipped' ? 'Shipped' : 'Confirmed') 
                              : isCancelled 
                              ? 'Cancelled' 
                              : 'Payment Verification Pending'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent'} • {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                        </p>
                        <p className="text-sm font-bold text-[#173B2B]">
                          Total: ₹{total.toLocaleString('en-IN')}
                        </p>
                        {order.tracking_number && (
                          <p className="text-xs text-purple-700 font-medium">
                            Courier Dispatch: {order.courier_name || 'Delhivery'} — Tracking #{order.tracking_number}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="px-3.5 py-1.5 border border-[#173B2B]/20 hover:border-[#173B2B] text-[#173B2B] hover:bg-[#173B2B]/5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>View Tax Invoice</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            TAB 4: SAVED WISHLIST BOTANICALS
            ======================================================= */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#173B2B]">
                  Saved Botanical Extracts
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Products bookmarked for future lab testing, formulation quotes, and bulk procurement
                </p>
              </div>
              <Link
                href="/wishlist"
                className="text-xs font-bold text-[#173B2B] hover:underline"
              >
                View Full Wishlist Page →
              </Link>
            </div>

            {wishlist.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#173B2B]/12 p-10 sm:p-14 text-center shadow-xs">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-heading text-base sm:text-lg font-bold text-[#173B2B] mb-1">
                  Your Wishlist is Empty
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  Click the heart icon on any botanical extract in the catalogue to save it to your customer account for rapid quotation.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                >
                  <span>Browse Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {wishlist.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-[#2E5E3E] uppercase tracking-wider mb-1">
                        {prod.product_range || 'Essential Oil'}
                      </div>
                      <Link href={`/products/${prod.slug}`}>
                        <h4 className="font-heading text-base font-bold text-[#173B2B] hover:text-[#25523D] transition-colors leading-snug line-clamp-1">
                          {prod.name}
                        </h4>
                      </Link>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-3">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <Link
                        href={`/products/${prod.slug}`}
                        className="flex-1 h-9 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-lg text-xs font-bold flex items-center justify-center transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(prod.id)}
                        className="w-9 h-9 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-400 hover:text-rose-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            TAB 5: DELIVERY ADDRESSES
            ======================================================= */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#173B2B]">
                  Delivery &amp; Billing Addresses
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Manage commercial facilities, lab locations, and billing destinations
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
                className="h-10 px-4 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#173B2B]/12 p-10 sm:p-14 text-center shadow-xs">
                <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-heading text-base sm:text-lg font-bold text-[#173B2B] mb-1">
                  No Saved Delivery Addresses
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  Add commercial delivery addresses to speed up sample dispatches and barrel order checkout.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Address</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {addresses.map((addr) => (
                  <div key={addr.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading text-sm font-bold text-[#173B2B]">{addr.name}</span>
                        {addr.is_default && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {addr.street_address}<br />
                        {addr.city}, {addr.pincode}
                      </p>
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        Phone: {addr.phone}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      <Footer />

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-slide-up">
            <h3 className="font-heading text-lg font-bold text-[#173B2B] mb-4">
              Add New Commercial Address
            </h3>
            <form onSubmit={handleAddAddress} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#173B2B] mb-1">Contact Name / Facility</label>
                <input
                  type="text"
                  required
                  value={addrName}
                  onChange={(e) => setAddrName(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-xl text-sm"
                  placeholder="e.g. Bangalore R&D Facility"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#173B2B] mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={addrPhone}
                  onChange={(e) => setAddrPhone(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-xl text-sm"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#173B2B] mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-xl text-sm"
                  placeholder="Plot 42, Industrial Estate"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#173B2B] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-300 rounded-xl text-sm"
                    placeholder="Bangalore"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#173B2B] mb-1">PIN / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={addrPincode}
                    onChange={(e) => setAddrPincode(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-300 rounded-xl text-sm"
                    placeholder="560001"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="h-10 px-4 border border-slate-200 rounded-xl text-xs font-bold uppercase text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#173B2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAX INVOICE MODAL FOR CUSTOMER */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedInvoiceOrder(null)}></div>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative z-10 shadow-2xl border border-slate-200 animate-slide-up flex flex-col">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-6 print:hidden">
              <h3 className="text-sm font-bold text-[#173B2B] uppercase tracking-widest">Official Tax Invoice</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="p-2 border border-slate-200 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-grow p-4 bg-white border border-slate-100 rounded-xl print:border-none print:p-0">
              <div className="flex justify-between items-start border-b border-slate-200 pb-6 gap-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[#173B2B] font-serif">VENUSS HERBO AROMATICS</h2>
                  <p className="text-xs text-slate-400 font-light mt-1">sales@venuss.co.in | +91 94432 12345</p>
                  <p className="text-[11px] text-slate-400 font-light">Tamil Nadu, India - 638111</p>
                </div>
                <div className="text-right">
                  <h3 className="text-base font-bold uppercase tracking-wide text-[#173B2B]">GST TAX INVOICE</h3>
                  <p className="text-xs font-mono font-bold text-[#173B2B] mt-1">
                    Order #{selectedInvoiceOrder.id ? selectedInvoiceOrder.id.slice(0, 8).toUpperCase() : 'UNKNOWN'}
                  </p>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Date: {selectedInvoiceOrder.created_at ? new Date(selectedInvoiceOrder.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent'}
                  </p>
                  <p className={`text-xs font-medium ${
                    selectedInvoiceOrder.payment_verified || ['confirmed', 'shipped', 'delivered'].includes(selectedInvoiceOrder.status)
                      ? 'text-emerald-600'
                      : selectedInvoiceOrder.status === 'cancelled'
                      ? 'text-red-600'
                      : 'text-amber-600'
                  }`}>
                    Status: {
                      selectedInvoiceOrder.payment_verified || ['confirmed', 'shipped', 'delivered'].includes(selectedInvoiceOrder.status)
                        ? 'Paid & Verified (UPI QR)'
                        : selectedInvoiceOrder.status === 'cancelled'
                        ? 'Cancelled'
                        : 'Payment Verification Pending'
                    }
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs font-light">
                <div>
                  <h4 className="font-bold text-[#173B2B] uppercase tracking-wider mb-2">Billed To:</h4>
                  <p className="font-semibold text-[#173B2B]">{selectedInvoiceOrder.shipping_name}</p>
                  <p className="text-slate-500 mt-0.5">{selectedInvoiceOrder.shipping_address}</p>
                  <p className="text-slate-500">{selectedInvoiceOrder.shipping_city} - {selectedInvoiceOrder.shipping_pincode}</p>
                  <p className="text-slate-400 mt-1">Phone: {selectedInvoiceOrder.shipping_phone}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#173B2B] uppercase tracking-wider mb-2">Merchant Registration:</h4>
                  <p className="font-semibold text-[#173B2B]">Venuss Herbo Aromatics Pvt Ltd</p>
                  <p className="text-slate-500 mt-0.5">GSTIN: <span className="font-semibold text-slate-700">33AAAAA1234A1Z5</span></p>
                  <p className="text-slate-500">Direct UPI Settlement</p>
                </div>
              </div>

              <div className="py-6 border-b border-slate-200">
                <table className="w-full border-collapse text-left text-xs font-light text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-200 pb-2">
                      <th className="font-bold text-[#173B2B] uppercase tracking-wider pb-3 w-1/2">Product Description</th>
                      <th className="font-bold text-[#173B2B] uppercase tracking-wider pb-3 text-center">Qty</th>
                      <th className="font-bold text-[#173B2B] uppercase tracking-wider pb-3 text-right">Unit Price</th>
                      <th className="font-bold text-[#173B2B] uppercase tracking-wider pb-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedInvoiceOrder.order_items || selectedInvoiceOrder.items || []).map((item: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-3 font-semibold text-[#173B2B]">{item.products?.name || item.product?.name || 'Botanical Extract'}</td>
                        <td className="py-3 text-center">{item.quantity}</td>
                        <td className="py-3 text-right">₹{item.price_at_purchase ?? item.price}</td>
                        <td className="py-3 text-right font-semibold text-[#173B2B]">₹{(item.price_at_purchase ?? item.price) * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-6 text-xs font-light text-slate-500">
                <div className="w-60 space-y-2">
                  <div className="flex justify-between">
                    <span>Taxable Subtotal</span>
                    <span className="font-semibold text-[#173B2B]">₹{selectedInvoiceOrder.subtotal ?? (Number(selectedInvoiceOrder.grand_total ?? selectedInvoiceOrder.total_amount ?? 0) * 0.82).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IGST Tax</span>
                    <span className="font-semibold text-[#173B2B]">₹{selectedInvoiceOrder.gst_amount ?? (Number(selectedInvoiceOrder.grand_total ?? selectedInvoiceOrder.total_amount ?? 0) * 0.18).toFixed(0)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-[#173B2B]">
                    <span>Grand Total</span>
                    <span>₹{Number(selectedInvoiceOrder.grand_total ?? selectedInvoiceOrder.total_amount ?? 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomerAccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="w-9 h-9 border-2 border-[#173B2B]/20 border-t-[#173B2B] rounded-full animate-spin" />
      </div>
    }>
      <CustomerAccountInner />
    </Suspense>
  );
}
