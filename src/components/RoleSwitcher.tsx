'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Shield, User, ArrowLeftRight, ChevronUp, ChevronDown, Check, LogOut, ExternalLink, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RoleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, switchRole, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleSwitch = async (role: 'admin' | 'customer') => {
    await switchRole(role);
    if (role === 'admin' && !pathname.startsWith('/admin')) {
      router.push('/admin');
    } else if (role === 'customer' && pathname.startsWith('/admin')) {
      router.push('/dashboard');
    } else {
      router.refresh();
    }
  };

  const handleLogout = async () => {
    await logout();
    if (pathname.startsWith('/admin')) {
      router.push('/');
    } else {
      router.refresh();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-40 font-sans text-xs select-none scale-90 sm:scale-100 origin-bottom-left">
      {isOpen ? (
        <div className="bg-slate-900/95 text-white border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-xl w-72 animate-fade-in">
          <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-amber-400" />
              <span className="font-bold tracking-wide uppercase text-[11px] text-slate-200">
                Dev Role Switcher
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              title="Minimize"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Current State */}
          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Current Role:</span>
              {user ? (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  isAdmin ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                }`}>
                  {user.role}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-slate-800 text-slate-400">
                  Guest
                </span>
              )}
            </div>
            {user && (
              <div className="mt-1 text-[11px] text-slate-300 truncate">
                {user.name} <span className="text-slate-500">({user.email})</span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-1.5">
            <button
              onClick={() => handleSwitch('admin')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-medium transition-all ${
                isAdmin 
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Persona</span>
              </div>
              {isAdmin && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            <button
              onClick={() => handleSwitch('customer')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-medium transition-all ${
                user?.role === 'customer'
                  ? 'bg-sky-600/20 text-sky-300 border border-sky-500/40' 
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span>Customer Persona</span>
              </div>
              {user?.role === 'customer' && <Check className="w-3.5 h-3.5 text-sky-400" />}
            </button>
          </div>

          {/* Quick Portal Navigation */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
            {isAdmin ? (
              <a href="/admin" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold">
                <span>Go to Admin Panel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <a href="/dashboard" className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold">
                <span>Go to Customer Dashboard</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 text-white border border-slate-700/80 px-3 py-2 rounded-full shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
          title="Role Switcher"
        >
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            isAdmin ? 'bg-emerald-400' : user ? 'bg-sky-400' : 'bg-slate-500'
          }`} />
          <span className="font-bold text-[11px] text-slate-300">
            {isAdmin ? 'Admin Mode' : user ? 'Customer Mode' : 'Guest'}
          </span>
          <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-180 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
}
