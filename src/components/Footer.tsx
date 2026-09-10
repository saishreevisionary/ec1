'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#2E5E3E] text-white pt-16 pb-10 w-full mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1: Logo & Company Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#1F452C] border border-[#3E7350] flex items-center justify-center flex-shrink-0 shadow-inner">
                <Leaf className="w-5 h-5 text-[#B5D3BC]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-wider text-white font-serif uppercase">
                  VENUSS HERBO AROMATICS
                </span>
                <span className="text-[10px] font-bold text-[#D4954B] uppercase tracking-widest">
                  PRIVATE LIMITED • EST. 1986
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#B5D3BC] font-light leading-relaxed max-w-lg">
              Natural botanical ingredients, essential oils, spice oils, spice oleoresins, floral absolutes, floral concretes, and spice powders from India, crafted for global Flavor, Fragrance, Food, and Personal Care industries.
            </p>

            {/* Positioning Directive Box */}
            <div className="bg-[#1F452C] border border-[#3E7350]/60 rounded-xl p-4 max-w-md shadow-sm">
              <span className="text-xs font-semibold text-[#D4954B] block mb-1">
                Positioning Directive:
              </span>
              <p className="text-xs text-white font-serif italic tracking-wide">
                "Nature, extracted with precision."
              </p>
            </div>
          </div>

          {/* Column 2: COMPANY (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold text-[#D4954B] uppercase tracking-widest mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-[#B5D3BC] uppercase tracking-wider">
              <li><Link href="/" className="hover:text-white transition-colors">HOME</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">ABOUT</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">PRODUCTS</Link></li>
              <li><Link href="/capabilities" className="hover:text-white transition-colors">CAPABILITIES</Link></li>
              <li><Link href="/rnd" className="hover:text-white transition-colors">RND</Link></li>
              <li><Link href="/quality" className="hover:text-white transition-colors">QUALITY</Link></li>
              <li><Link href="/sustainability" className="hover:text-white transition-colors">SUSTAINABILITY</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">CONTACT</Link></li>
            </ul>
          </div>

          {/* Column 3: PRODUCT CATEGORIES (2.5 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold text-[#D4954B] uppercase tracking-widest mb-4">
              PRODUCT CATEGORIES
            </h3>
            <ul className="space-y-2.5 text-xs font-light text-[#B5D3BC]">
              <li><Link href="/products?category=essential-oils" className="hover:text-white transition-colors">Essential Oils</Link></li>
              <li><Link href="/products?category=spice-oils" className="hover:text-white transition-colors">Spice Oils</Link></li>
              <li><Link href="/products?category=spice-oleoresins" className="hover:text-white transition-colors">Spice Oleoresins</Link></li>
              <li><Link href="/products?category=floral-concretes" className="hover:text-white transition-colors">Floral Concretes</Link></li>
              <li><Link href="/products?category=floral-absolutes" className="hover:text-white transition-colors">Floral Absolutes</Link></li>
              <li><Link href="/products?category=spice-powders" className="hover:text-white transition-colors">Spice Powders</Link></li>
            </ul>
          </div>

          {/* Column 4: REGISTERED FACILITY (2.5 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-[#D4954B] uppercase tracking-widest mb-4">
              REGISTERED FACILITY
            </h3>
            <div className="space-y-3 text-xs font-light text-[#B5D3BC] leading-relaxed">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-[#B5D3BC] flex-shrink-0 mt-0.5" />
                <span>No. 2C, Muhavoor Road, Seithur, Rajapalayam Taluk, Virudhunagar District, Tamil Nadu, India - 626121</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-[#B5D3BC] flex-shrink-0" />
                <span>+91 4563 244154 / +91 7708 001856</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-[#B5D3BC] flex-shrink-0" />
                <a href="mailto:sales@venuss.co.in" className="hover:underline">sales@venuss.co.in</a>
              </div>
              <div className="flex gap-2.5 items-center">
                <Clock className="w-4 h-4 text-[#B5D3BC] flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM IST</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block w-full text-center py-3 px-6 bg-[#D48B38] hover:bg-[#BF7A2C] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                REQUEST DIRECT QUOTE
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-light text-[#94BCA0]">
          <div>
            © 2026 VENUSS HERBO AROMATICS PRIVATE LIMITED. All rights reserved. Incorporated May 22, 1986.
          </div>
          <div className="flex items-center space-x-6 text-[#94BCA0] font-medium">
            <Link href="/quality" className="hover:text-white transition-colors">Quality Systems</Link>
            <Link href="/sustainability" className="hover:text-white transition-colors">Sustainability Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Factory Location</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
