'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error('[App Error]', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#2E5E3E]/6 rounded-full blur-3xl pointer-events-none" />

      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-6 shadow-sm">
        <AlertTriangle className="w-10 h-10 text-red-400" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#2E5E3E] mb-3">
        Something Went Wrong
      </h1>
      <p className="text-sm text-[#3A372E]/70 font-light max-w-md leading-relaxed mb-2">
        An unexpected error occurred. Our team has been notified. Please try again or return to the homepage.
      </p>
      {error.digest && (
        <p className="text-[10px] text-slate-400 font-mono mb-8">
          Error ID: {error.digest}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={unstable_retry}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-8 py-3.5 border-2 border-[#2E5E3E] text-[#2E5E3E] hover:bg-[#2E5E3E] hover:text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all"
        >
          <Home className="w-3.5 h-3.5" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
