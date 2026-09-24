'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function AdminLoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login, isAdmin, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fromUrl = searchParams.get('from') || '/admin';

  useEffect(() => {
    if (!isLoading && user && isAdmin) {
      router.replace(fromUrl);
    }
  }, [user, isAdmin, isLoading, fromUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter an authorized admin email address.');
      return;
    }

    // Validate admin email
    const isAdminEmail = (
      email.toLowerCase() === 'admin@venuss.co.in' ||
      email.toLowerCase() === 'admin@lendorastore.com' ||
      email.toLowerCase().includes('admin')
    );
    if (!isAdminEmail) {
      setErrorMsg('This email address is not authorized for admin access.');
      return;
    }

    // Password check in local (non-Supabase) mode
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const storedPassword = typeof window !== 'undefined'
        ? localStorage.getItem('venuss_admin_password') || 'admin123'
        : 'admin123';
      if (!password.trim()) {
        setErrorMsg('Please enter your admin password.');
        return;
      }
      if (password !== storedPassword) {
        setErrorMsg('Incorrect password. Please verify your credentials.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), 'admin');
      setIsSuccess(true);
      setTimeout(() => {
        router.push(fromUrl);
        router.refresh();
      }, 900);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication failed. Please verify credentials.');
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@venuss.co.in');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0D1F14] to-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2E5E3E]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#D4954B]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1B3B27] border border-[#3E7451]/50 shadow-lg shadow-emerald-950/60 mb-4 text-[#B5D3BC]">
            <Shield className="w-7 h-7 text-[#D4954B]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-wide">
            VENUSS HERBO AROMATICS
          </h1>
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-1">
            Store Administration Console
          </p>
          <p className="text-xs text-slate-400 mt-2 font-light">
            Restricted access portal for operations, catalog, and order fulfillment.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-7 sm:p-8 shadow-2xl">
          
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isSuccess && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Access granted! Initializing administrative console...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@venuss.co.in"
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Admin Passkey
                </label>
                <span className="text-[11px] text-slate-400 font-light">SSO / Local</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Enter Admin Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <button
              type="button"
              onClick={handleQuickFill}
              className="w-full flex items-center justify-center gap-2 text-xs text-amber-400/90 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 py-2.5 px-3 rounded-xl font-medium transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Demo Admin Credentials (`admin@venuss.co.in`)</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex justify-between items-center text-xs text-slate-400 px-2">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            ← Return to Storefront
          </Link>
          <span>Encrypted Session</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Loading administration console...
      </div>
    }>
      <AdminLoginInner />
    </Suspense>
  );
}
