'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { User, ShoppingBag, MapPin, Heart, Edit, Trash2, CheckCircle2, ChevronRight, Printer, RefreshCw, X, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { db } from '@/lib/db';

function UserDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, register } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist'>('orders');

  // DB Data
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);

  // State Updates
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // Address Modal States
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrPincode, setAddrPincode] = useState('');

  // Invoice visual preview
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<any | null>(null);

  // Sync tab from query param
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'profile' || tab === 'orders' || tab === 'addresses' || tab === 'wishlist') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!user) {
      // Create session for testing if not logged in
      const defaultUser = db.getCurrentSession();
      if (!defaultUser) {
        // Redirect to login modal on navbar or create a dummy customer session automatically
        db.login('customer@lendorastore.com', 'customer');
        router.refresh();
      }
    }

    if (user) {
      setProfileName(user.name);
      setProfileEmail(user.email);
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (user) {
      const allOrders = await db.getOrders(user.id);
      setOrders(allOrders);
      
      // Load addresses from localdb
      if (typeof window !== 'undefined') {
        const storedAddr = localStorage.getItem(`lendorastore_addresses_${user.id}`);
        if (storedAddr) {
          setAddresses(JSON.parse(storedAddr));
        } else {
          // Seed a default address
          const defaults = [{
            id: 'addr-default-1',
            name: user.name,
            phone: '+1 (800) 854-8290',
            street_address: 'Apartment 4B, 300 Castro Street',
            city: 'Mountain View',
            pincode: '94041',
            is_default: true
          }];
          localStorage.setItem(`lendorastore_addresses_${user.id}`, JSON.stringify(defaults));
          setAddresses(defaults);
        }
      }
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const updatedUser = { ...user, name: profileName };
      if (typeof window !== 'undefined') {
        localStorage.setItem('lendorastore_session', JSON.stringify(updatedUser));
        
        // Update user in the USERS list
        const users = JSON.parse(localStorage.getItem('lendorastore_users') || '[]');
        const idx = users.findIndex((u: any) => u.id === user.id);
        if (idx !== -1) {
          users[idx].name = profileName;
          localStorage.setItem('lendorastore_users', JSON.stringify(users));
        }
      }
      setIsProfileEditing(false);
      alert('Profile updated successfully.');
      router.refresh();
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newAddr = {
      id: crypto.randomUUID(),
      name: addrName,
      phone: addrPhone,
      street_address: addrStreet,
      city: addrCity,
      pincode: addrPincode,
      is_default: addresses.length === 0
    };

    const list = [...addresses, newAddr];
    setAddresses(list);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`lendorastore_addresses_${user.id}`, JSON.stringify(list));
    }

    setIsAddressModalOpen(false);
    setAddrName('');
    setAddrPhone('');
    setAddrStreet('');
    setAddrCity('');
    setAddrPincode('');
  };

  const handleDeleteAddress = (id: string) => {
    if (!user) return;
    const list = addresses.filter(a => a.id !== id);
    setAddresses(list);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`lendorastore_addresses_${user.id}`, JSON.stringify(list));
    }
  };

  // Get order progress step
  const getProgressStep = (status: string) => {
    const steps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    return steps.indexOf(status.toLowerCase());
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full animate-fade-in">
        
        {/* Profile Card Header */}
        <div className="bg-slate-50 border border-slate-200/50 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4.5">
            <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-full text-2xl font-extrabold shadow-sm border border-slate-200">
              {profileName.substring(0, 2).toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">{profileName}</h1>
              <p className="text-xs text-slate-500 font-light mt-0.5">{profileEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 text-[10px] uppercase font-bold tracking-wider text-primary border border-slate-200 rounded-full bg-white">
              {user?.role || 'Customer'} Account
            </span>
          </div>
        </div>

        {/* Dashboard grid (Tabs Left, Content Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Dashboard Sidebar Tabs */}
          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 bg-slate-50 p-2 rounded-2xl border border-slate-200/40 hide-scrollbar">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 lg:w-full ${
                activeTab === 'orders'
                  ? 'bg-white text-primary shadow-sm border border-slate-150'
                  : 'text-slate-500 hover:text-primary hover:bg-white/40'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Purchase History</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 lg:w-full ${
                activeTab === 'addresses'
                  ? 'bg-white text-primary shadow-sm border border-slate-150'
                  : 'text-slate-500 hover:text-primary hover:bg-white/40'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 lg:w-full ${
                activeTab === 'wishlist'
                  ? 'bg-white text-primary shadow-sm border border-slate-150'
                  : 'text-slate-500 hover:text-primary hover:bg-white/40'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 lg:w-full ${
                activeTab === 'profile'
                  ? 'bg-white text-primary shadow-sm border border-slate-150'
                  : 'text-slate-500 hover:text-primary hover:bg-white/40'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>
          </nav>

          {/* Dashboard Panels */}
          <div className="lg:col-span-3">
            
            {/* TAB 1: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-primary">Your Orders</h2>
                  <button 
                    onClick={loadDashboardData}
                    className="p-2 hover:bg-slate-50 text-slate-400 hover:text-primary rounded-lg border border-slate-100 transition-all flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 border border-slate-200/50 rounded-2xl">
                    <ShoppingBag className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-primary">No orders placed yet</p>
                    <p className="text-xs text-slate-400 font-light mt-1">Explore our collections to make your first purchase.</p>
                    <Link href="/products" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                      Go To Shop
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const step = getProgressStep(order.status);
                      const isCancelled = order.status.toLowerCase() === 'cancelled';
                      return (
                        <div 
                          key={order.id}
                          className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all p-5 sm:p-6 space-y-6"
                        >
                          {/* Order Card Header */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                            <div>
                              <p className="text-xs font-bold text-primary uppercase tracking-wider">Order #{order.id.substring(0, 8)}</p>
                              <p className="text-[10px] text-slate-400 font-light mt-0.5">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                              <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                                isCancelled ? 'bg-red-50 text-red-500 border border-red-100' :
                                order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                'bg-indigo-50 text-primary border border-indigo-100 animate-pulse'
                              }`}>
                                {order.status}
                              </span>
                              
                              <button
                                onClick={() => setActiveInvoiceOrder(order)}
                                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent hover:text-accent-light"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                <span>GST Invoice</span>
                              </button>
                            </div>
                          </div>

                          {/* Order Products */}
                          <div className="space-y-3.5">
                            {order.order_items?.map((item: any, idx: number) => (
                              <div key={idx} className="flex gap-4 items-center justify-between text-xs font-light">
                                <div className="flex gap-3 items-center min-w-0">
                                  <img 
                                    src={item.products?.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200'} 
                                    alt={item.products?.name} 
                                    className="w-11 h-11 object-cover rounded-lg border border-slate-100 flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-semibold text-primary truncate">{item.products?.name || 'Curated Product'}</p>
                                    <p className="text-[10px] text-slate-400 font-light mt-0.5">Qty: {item.quantity} × ₹{item.price_at_purchase}</p>
                                  </div>
                                </div>
                                <span className="font-semibold text-primary">₹{item.price_at_purchase * item.quantity}</span>
                              </div>
                            ))}
                          </div>

                          {/* Timeline Progress Stepper (Skip if cancelled) */}
                          {!isCancelled && (
                            <div className="border-t border-slate-100 pt-6 space-y-4">
                              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Shipment Journey</span>
                              
                              <div className="flex items-center w-full justify-between relative">
                                {/* Connecting line */}
                                <div className="absolute left-3 right-3 top-3 h-0.5 bg-slate-200 -z-0"></div>
                                
                                {['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'].map((st, idx) => {
                                  const isActive = idx <= step;
                                  return (
                                    <div key={idx} className="flex flex-col items-center z-10 select-none">
                                      <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                                        isActive 
                                          ? 'bg-primary border-primary text-white shadow-sm'
                                          : 'bg-white border-slate-200 text-slate-400'
                                      }`}>
                                        {isActive ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                                      </div>
                                      <span className={`text-[9px] font-semibold tracking-wider mt-1.5 uppercase ${
                                        isActive ? 'text-primary' : 'text-slate-400 font-light'
                                      }`}>
                                        {st}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Grand total summaries */}
                          <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-light text-slate-500 gap-2.5">
                            <div>
                              <span>Paid via </span>
                              <span className="font-semibold text-primary uppercase tracking-wide">QR UPI</span>
                              {order.payment_screenshot_url && (
                                <a 
                                  href={order.payment_screenshot_url} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-accent font-semibold ml-2 hover:underline inline-flex items-center gap-0.5"
                                >
                                  <span>View Receipt</span>
                                </a>
                              )}
                            </div>
                            <div className="text-right sm:text-left flex sm:flex-col gap-2 sm:gap-0.5 items-center sm:items-end w-full sm:w-auto justify-between border-t sm:border-t-0 pt-2 sm:pt-0">
                              <span>Grand Total (Inc. GST):</span>
                              <span className="text-base font-extrabold text-primary">₹{order.grand_total}</span>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ADDRESS MANAGER */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-primary">Shipping Addresses</h2>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="px-4 py-2 bg-primary text-white hover:bg-primary-light rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
                  >
                    Add Address
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 border border-slate-200/50 rounded-2xl">
                    <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-primary">No addresses saved</p>
                    <p className="text-xs text-slate-400 font-light mt-1">Please add a shipping address for faster checkouts.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="bg-white border border-slate-200 rounded-2xl p-5 relative premium-card">
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-100 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-primary">{addr.name}</h3>
                            {addr.is_default && (
                              <span className="px-2 py-0.5 text-[8px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 rounded">Default</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-light">{addr.street_address}</p>
                          <p className="text-xs text-slate-500 font-light">{addr.city} - {addr.pincode}</p>
                          <p className="text-xs text-slate-400 font-light pt-1">Phone: {addr.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-primary">Bookmark List</h2>
                </div>
                
                {wishlist.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 border border-slate-200/50 rounded-2xl">
                    <Heart className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-primary">Wishlist is empty</p>
                    <p className="text-xs text-slate-400 font-light mt-1">Browse catalog and save items for later.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-3.5 items-center premium-card relative group">
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-3 right-3 p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors border border-transparent hover:border-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <img src={item.image_url} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-slate-100" />
                        <div>
                          <Link href={`/products/${item.slug}`} className="text-xs font-semibold text-primary group-hover:text-accent truncate line-clamp-1 max-w-[150px]">
                            {item.name}
                          </Link>
                          <p className="text-xs font-extrabold text-primary mt-0.5">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: PROFILE SETTINGS */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-primary">Profile Configuration</h2>
                </div>

                <form onSubmit={handleProfileSave} className="max-w-md bg-white border border-slate-200 p-6 rounded-2xl space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      disabled={!isProfileEditing}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={profileEmail}
                      disabled
                      className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm opacity-60 cursor-not-allowed"
                    />
                    <span className="text-[10px] text-slate-400 font-light block mt-1">To change email details, contact merchant help desk support.</span>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    {isProfileEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsProfileEditing(false)}
                          className="px-4 py-2 border border-slate-200 text-slate-500 rounded-xl text-xs font-semibold uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsProfileEditing(true)}
                        className="px-5 py-2 border border-primary text-primary hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        Edit Details
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>

      </main>

      {/* ADDRESS ADD MODAL */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddressModalOpen(false)}></div>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl border border-slate-150 animate-slide-up">
            <button
              onClick={() => setIsAddressModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-primary mb-4 border-b border-slate-105 pb-2">Add New Address</h3>
            
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase text-primary mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={addrName}
                  onChange={(e) => setAddrName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  placeholder="Sarah Connor"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase text-primary mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={addrPhone}
                  onChange={(e) => setAddrPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  placeholder="+1 (555) 019-8234"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase text-primary mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  placeholder="Apartment 4B, 300 Castro St"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-primary mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    placeholder="Mountain View"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase text-primary mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={addrPincode}
                    onChange={(e) => setAddrPincode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    placeholder="94041"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE GST INVOICE VISUAL PREVIEW MODAL */}
      {activeInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActiveInvoiceOrder(null)}></div>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative z-10 shadow-2xl border border-slate-200 animate-slide-up flex flex-col">
            
            {/* Modal Controls */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-6 print:hidden">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Invoice Preview</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-primary text-white hover:bg-primary-light rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setActiveInvoiceOrder(null)}
                  className="p-2 border border-slate-200 text-slate-400 hover:text-slate-600 rounded-xl"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* INVOICE CONTENT (Styled for Printer layout) */}
            <div className="flex-grow p-4 bg-white border border-slate-100 rounded-xl print:border-none print:p-0">
              
              {/* Header block */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-6 gap-6">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-primary font-serif">NATURELLE</h2>
                  <p className="text-xs text-slate-400 font-light mt-1">botanicals@lendorastore.com | +1 (800) 854-8290</p>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold uppercase tracking-wide text-primary">GST INVOICE</h3>
                  <p className="text-xs font-semibold text-primary mt-1">Invoice #{activeInvoiceOrder.id.substring(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-slate-400 font-light mt-0.5">Date: {new Date(activeInvoiceOrder.created_at).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-400 font-light">Status: Paid (Direct UPI)</p>
                </div>
              </div>

              {/* Billed To / Shipped To block */}
              <div className="grid grid-cols-2 gap-8 py-6 border-b border-slate-200 text-xs font-light">
                <div>
                  <h4 className="font-bold text-primary uppercase tracking-wider mb-2">Billed To:</h4>
                  <p className="font-semibold text-primary">{activeInvoiceOrder.shipping_name}</p>
                  <p className="text-slate-500 mt-1">{activeInvoiceOrder.shipping_address}</p>
                  <p className="text-slate-500">{activeInvoiceOrder.shipping_city} - {activeInvoiceOrder.shipping_pincode}</p>
                  <p className="text-slate-400 mt-1">Phone: {activeInvoiceOrder.shipping_phone}</p>
                </div>
                <div>
                  <h4 className="font-bold text-primary uppercase tracking-wider mb-2">Merchant Registration:</h4>
                  <p className="font-semibold text-primary">NATURELLE HAIR CARE Premium Ltd</p>
                  <p className="text-slate-500 mt-1">GSTIN: <span className="font-semibold text-slate-700">07AAAAA1111A1Z1</span></p>
                  <p className="text-slate-500">Corporate Office: New Delhi, India</p>
                  <p className="text-slate-400 mt-1">Payment Channel: QR Code scan verification</p>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="py-6 border-b border-slate-200">
                <table className="w-full border-collapse text-left text-xs font-light text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-200 pb-2">
                      <th className="font-bold text-primary uppercase tracking-wider pb-3 w-1/2">Product Description</th>
                      <th className="font-bold text-primary uppercase tracking-wider pb-3 text-center">Qty</th>
                      <th className="font-bold text-primary uppercase tracking-wider pb-3 text-right">Unit Base Price</th>
                      <th className="font-bold text-primary uppercase tracking-wider pb-3 text-right">GST Rate</th>
                      <th className="font-bold text-primary uppercase tracking-wider pb-3 text-right">Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeInvoiceOrder.order_items?.map((item: any, idx: number) => {
                      const rate = item.gst_rate_at_purchase || 18;
                      const baseTotal = item.price_at_purchase * item.quantity;
                      return (
                        <tr key={idx} className="border-b border-slate-100">
                          <td className="py-3.5 font-semibold text-primary">{item.products?.name || 'Curated Product'}</td>
                          <td className="py-3.5 text-center">{item.quantity}</td>
                          <td className="py-3.5 text-right">₹{item.price_at_purchase}</td>
                          <td className="py-3.5 text-right">{rate}%</td>
                          <td className="py-3.5 text-right font-semibold text-primary">₹{baseTotal}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Calculation Summary blocks */}
              <div className="flex justify-end pt-6 text-xs font-light text-slate-500">
                <div className="w-64 space-y-2.5">
                  <div className="flex justify-between">
                    <span>Taxable Subtotal</span>
                    <span className="font-semibold text-primary">₹{activeInvoiceOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Integrated GST (IGST 18%)</span>
                    <span className="font-semibold text-primary">₹{activeInvoiceOrder.gst_amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span className="font-semibold text-emerald-600 text-[10px] tracking-wider uppercase">Free</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3.5 flex justify-between text-sm font-extrabold text-primary">
                    <span>Grand Total (Paid)</span>
                    <span>₹{activeInvoiceOrder.grand_total}</span>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center text-[10px] text-slate-400 font-light border-t border-slate-100 pt-4 leading-relaxed">
                This is a computer-generated GST Compliant tax invoice. No signature required. Thank you for scanning & shopping with LendoraStore.
              </div>

            </div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default function UserDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    }>
      <UserDashboardContent />
    </Suspense>
  );
}
