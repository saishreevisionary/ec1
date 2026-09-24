import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Venuss Herbo Aromatics',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2E5E3E]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#D4954B]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Botanical motif */}
      <div className="text-7xl mb-6 animate-bounce" style={{ animationDuration: '3s' }}>🌿</div>

      {/* 404 number */}
      <div className="relative mb-4">
        <span className="text-[120px] sm:text-[160px] font-extrabold font-serif leading-none text-[#2E5E3E]/10 select-none absolute inset-0 flex items-center justify-center">
          404
        </span>
        <span className="relative text-[80px] sm:text-[100px] font-extrabold font-serif leading-none text-[#2E5E3E]">
          404
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#2E5E3E] mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-[#3A372E]/70 font-light max-w-md leading-relaxed mb-10">
        Like a rare botanical extract, this page couldn't be located. It may have moved, or the URL may be incorrect.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="px-8 py-3.5 bg-[#2E5E3E] hover:bg-[#1F452C] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          Return to Homepage
        </Link>
        <Link
          href="/products"
          className="px-8 py-3.5 border-2 border-[#2E5E3E] text-[#2E5E3E] hover:bg-[#2E5E3E] hover:text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all"
        >
          Browse Products
        </Link>
        <Link
          href="/contact"
          className="px-8 py-3.5 border border-[#D4954B] text-[#D4954B] hover:bg-[#D4954B] hover:text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all"
        >
          Contact Support
        </Link>
      </div>

      {/* Popular links */}
      <div className="mt-14 border-t border-[#2E5E3E]/10 pt-8 w-full max-w-md">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2E5E3E]/50 mb-4">Popular Destinations</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: 'Essential Oils', href: '/products?category=essential-oils' },
            { label: 'Spice Oleoresins', href: '/products?category=spice-oleoresins' },
            { label: 'Floral Absolutes', href: '/products?category=floral-absolutes' },
            { label: 'My Dashboard', href: '/dashboard' },
            { label: 'My Cart', href: '/cart' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-1.5 bg-white border border-[#2E5E3E]/20 text-[#2E5E3E] rounded-full text-[11px] font-medium hover:border-[#2E5E3E] hover:bg-[#2E5E3E]/5 transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
