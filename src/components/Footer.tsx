'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Camera, Briefcase } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 pt-16 pb-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Logo & Intro */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex flex-col items-start leading-none group">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-white font-serif">NATURELLE</span>
              <span className="text-[9px] font-bold text-accent uppercase tracking-widest mt-0.5">Hair Care</span>
            </Link>
            <p className="text-sm text-slate-400 font-light max-w-sm leading-relaxed">
              Meticulously designed elixirs and molecular peptide serums for hair density and scalp health. Scientifically validated, organically sourced.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all" title="Message Center">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all" title="Camera feed">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all" title="Workplace profile">
                <Briefcase className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2.5 text-sm font-light text-slate-400">
              <li>
                <Link href="/products?category=botanical-oils" className="hover:text-white transition-colors">
                  Botanical Oils
                </Link>
              </li>
              <li>
                <Link href="/products?category=active-serums" className="hover:text-white transition-colors">
                  Active Serums
                </Link>
              </li>
              <li>
                <Link href="/products?category=hair-mists" className="hover:text-white transition-colors">
                  Hair Mists
                </Link>
              </li>
              <li>
                <Link href="/products?category=scalp-therapy" className="hover:text-white transition-colors">
                  Scalp Therapy
                </Link>
              </li>
              <li>
                <Link href="/products?category=treatment-sets" className="hover:text-white transition-colors">
                  Treatment Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm font-light text-slate-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2.5 text-sm font-light text-slate-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Experience
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-slate-500">
          <div>
            © {new Date().getFullYear()} NATURELLE HAIR CARE. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Dermatologically tested formulations. Made with organic care.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
