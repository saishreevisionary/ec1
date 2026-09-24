'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Package, FolderTree, ShoppingCart, 
  AlertTriangle, Receipt, Users, Settings, LogOut, 
  Store, Menu, X, ShieldAlert, Star
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import HairOilLoader from '@/components/HairOilLoader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAdmin, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Allow /admin/login to render its own full-page UI without sidebar or admin guards
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <HairOilLoader size="lg" />
      </div>
    );
  }

  // Security Check: Block if not admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-6 text-center">
        <div className="p-4 bg-red-500/10 text-red-400 rounded-2xl w-fit mb-5 border border-red-500/20 shadow-xl">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
          Admin Access Required
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-light mt-2 max-w-sm leading-relaxed">
          The administrative control panel is restricted to authorized store operators. Please sign in with an administrator account.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href={`/admin/login?from=${encodeURIComponent(pathname)}`}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-500 hover:to-teal-600 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/40 transition-all"
          >
            Sign In to Admin Console
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-slate-800 text-slate-400 bg-slate-900/60 hover:bg-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  const navLinks = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Inventory', href: '/admin/inventory', icon: AlertTriangle },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Invoices', href: '/admin/invoices', icon: Receipt },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row w-full font-sans">
      
      {/* MOBILE BAR */}
      <div className="lg:hidden flex items-center justify-between bg-[#132A1C] text-white px-5 py-4 w-full shadow-md z-30">
        <Link href="/admin" className="text-sm font-serif font-bold tracking-wider flex items-center gap-2">
          <span className="w-2 h-5 bg-[#D4954B] rounded-full inline-block"></span>
          <span>VENUSS <span className="font-sans font-light text-emerald-300 text-xs">Admin</span></span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 hover:bg-white/10 rounded-lg"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION (Desktop & Drawer Mobile) */}
      <aside className={`fixed inset-y-0 left-0 bg-[#132A1C] text-white w-64 p-6 flex flex-col z-40 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:h-screen ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand Header */}
        <div className="mb-8 hidden lg:flex items-center justify-between">
          <Link href="/admin" className="text-base font-serif font-bold tracking-wider text-white flex items-center gap-2">
            <span className="w-2 h-5 bg-[#D4954B] rounded-full inline-block"></span>
            <span>VENUSS <span className="font-sans text-xs font-semibold text-emerald-400 uppercase tracking-widest block">Executive Console</span></span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 flex-1 overflow-y-auto pr-1 hide-scrollbar">
          {navLinks.map((link) => {
            const LinkIcon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-accent text-white shadow-md shadow-accent/15'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LinkIcon className="w-4.5 h-4.5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate leading-none">{user.name}</p>
              <span className="text-[9px] text-slate-400 truncate block w-32">{user.email}</span>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Store className="w-4 h-4" />
            <span>Customer Store</span>
          </Link>

          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Panel</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen bg-slate-50">
        
        {/* Top Header Workspace (Desktop) */}
        <header className="hidden lg:flex items-center justify-between bg-white border-b border-slate-200/60 px-8 py-5">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workspace</span>
            <h2 className="text-sm font-bold text-primary capitalize mt-0.5">
              {pathname === '/admin' ? 'Dashboard Overview' : pathname.split('/').pop()?.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-500">{user.name} | Administrator</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
        </header>

        {/* Dynamic child view injection */}
        <main className="p-5 sm:p-8 flex-grow">
          {children}
        </main>
      </div>

      {/* Backdrop overlay for Mobile Drawer */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
