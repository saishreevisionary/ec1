'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, User, ArrowRight, Leaf, CheckCircle2, AlertCircle, UserPlus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, register, loginWithGoogle, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const redirectTo = searchParams.get('from') || '/dashboard';

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, redirectTo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email.trim(), name.trim());
      setIsSuccess(true);
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          const session = localStorage.getItem('lendorastore_session');
          if (session) {
            router.push(redirectTo);
          }
        }
      }, 600);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    await loginWithGoogle();
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
        <div className="w-8 h-8 border-2 border-[#2E5E3E]/20 border-t-[#2E5E3E] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-16 relative">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#2E5E3E]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-[#D4954B]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">

          {/* Brand mark */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4954B] shadow-lg mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-[#2E5E3E]">Create Account</h1>
            <p className="text-sm text-[#3A372E]/60 font-light mt-1">Join the Venuss community</p>
          </div>

          {/* Card */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">

            {isSuccess ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#2E5E3E]/10 flex items-center justify-center mx-auto mb-4 border border-[#2E5E3E]/20">
                  <CheckCircle2 className="w-7 h-7 text-[#2E5E3E]" />
                </div>
                <h2 className="text-lg font-bold font-serif text-[#2E5E3E] mb-2">Account Created!</h2>
                <p className="text-sm text-slate-500 font-light">Welcome, {name.split(' ')[0]}! Redirecting to your dashboard…</p>
              </div>
            ) : (
              <>
                {/* Google Sign Up */}
                <button
                  id="register-google"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-xl text-sm text-[#3A372E] font-medium hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all mb-5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">or register with email</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                {errorMsg && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl mb-4">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-600 font-light">{errorMsg}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="register-name" className="block text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="register-name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your full name"
                        required
                        autoComplete="name"
                        className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-slate-200 rounded-xl text-sm text-[#2E5E3E] placeholder:text-slate-400 font-light focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="register-email" className="block text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="register-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        autoComplete="email"
                        className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-slate-200 rounded-xl text-sm text-[#2E5E3E] placeholder:text-slate-400 font-light focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E] transition-all"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 font-light">
                      We'll send a magic link to verify your email.
                    </p>
                  </div>

                  <button
                    id="register-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#D4954B] hover:bg-[#BF7A2C] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account…
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Create My Account
                      </>
                    )}
                  </button>
                </form>

                {/* Benefits */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Account Benefits</p>
                  <div className="space-y-1.5">
                    {[
                      'Track your orders in real-time',
                      'Save items to your wishlist',
                      'Manage multiple shipping addresses',
                      'Access your invoice history',
                    ].map(benefit => (
                      <div key={benefit} className="flex items-center gap-2 text-[11px] text-[#3A372E]/70 font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2E5E3E] flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <p className="text-center text-xs text-slate-500 font-light mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-[#2E5E3E] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
        <div className="w-8 h-8 border-2 border-[#2E5E3E]/20 border-t-[#2E5E3E] rounded-full animate-spin" />
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
