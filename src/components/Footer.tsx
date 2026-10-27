'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { db } from '@/lib/db';
import { Category, CATEGORIES } from '@/lib/seedData';

export const Footer = () => {
  const [footerCategories, setFooterCategories] = useState<Category[]>(CATEGORIES);

  useEffect(() => {
    db.getCategories(true).then(cats => {
      if (cats && cats.length > 0) setFooterCategories(cats);
    });

    const handleUpdate = () => {
      db.getCategories(true).then(cats => {
        if (cats && cats.length > 0) setFooterCategories(cats);
      });
    };
    window.addEventListener('venuss-categories-updated', handleUpdate);
    return () => window.removeEventListener('venuss-categories-updated', handleUpdate);
  }, []);

  return (
    <footer className="bg-[#173B2B] text-white pt-16 pb-10 w-full mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1: Logo & Company Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1F452C] border border-[#3E7350] flex items-center justify-center flex-shrink-0 shadow-inner">
                <Leaf className="w-6 h-6 text-[#D8EADB]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white font-heading uppercase">
                  VENUSS HERBO AROMATICS
                </span>
                <span className="text-xs font-bold text-[#E8A555] uppercase tracking-widest">
                  PRIVATE LIMITED • EST. 1986
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-[15.5px] text-[#D0E6D5] font-normal leading-relaxed max-w-lg">
              Natural botanical ingredients, essential oils, spice oils, spice oleoresins, floral absolutes, floral concretes, and spice powders from India, crafted for global Flavor, Fragrance, Food, and Personal Care industries.
            </p>

            {/* Positioning Directive Box */}
            <div className="bg-[#0F281D] border border-[#3E7350]/60 rounded-xl p-4 max-w-md shadow-sm">
              <span className="text-xs font-bold text-[#E8A555] block mb-1 uppercase tracking-wider">
                Positioning Directive:
              </span>
              <p className="text-[14.5px] text-white font-medium italic tracking-wide">
                &ldquo;Nature, extracted with precision.&rdquo;
              </p>
            </div>
          </div>

          {/* Column 2: COMPANY (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-[13.5px] sm:text-[14px] font-bold text-[#E8A555] uppercase tracking-wider mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2.5 text-[14.5px] sm:text-[15px] font-medium text-[#D8EADB]">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Product Catalogue</Link></li>
              <li><Link href="/capabilities" className="hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link href="/rnd" className="hover:text-white transition-colors">R&D & Innovation</Link></li>
              <li><Link href="/quality" className="hover:text-white transition-colors">Quality Control</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: PRODUCT CATEGORIES (2.5 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-[13.5px] sm:text-[14px] font-bold text-[#E8A555] uppercase tracking-wider mb-4">
              PRODUCT CATEGORIES
            </h3>
            <ul className="space-y-2.5 text-[14.5px] sm:text-[15px] font-medium text-[#D8EADB]">
              {footerCategories.slice(0, 8).map(cat => (
                <li key={cat.id}>
                  <Link href={`/products?category=${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: REGISTERED FACILITY (2.5 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[13.5px] sm:text-[14px] font-bold text-[#E8A555] uppercase tracking-wider mb-4">
              REGISTERED FACILITY
            </h3>
            <div className="space-y-3 text-[14px] font-normal text-[#D8EADB] leading-relaxed">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-[#E8A555] flex-shrink-0 mt-1" />
                <span>No. 2C, Muhavoor Road, Seithur, Rajapalayam Taluk, Virudhunagar District, Tamil Nadu, India - 626121</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-[#E8A555] flex-shrink-0" />
                <span>+91 4563 244154 / +91 7708 001856</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-[#E8A555] flex-shrink-0" />
                <a href="mailto:sales@venuss.co.in" className="hover:underline text-white font-medium">sales@venuss.co.in</a>
              </div>
              <div className="flex gap-2.5 items-center">
                <Clock className="w-4 h-4 text-[#E8A555] flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM IST</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block w-full text-center py-3.5 px-6 bg-[#D48B38] hover:bg-[#BF7A2C] text-white rounded-xl text-[14.5px] sm:text-[15px] font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                REQUEST DIRECT QUOTE
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-[13px] font-normal text-[#B8D7C0]">
          <div>
            © 2026 VENUSS HERBO AROMATICS PRIVATE LIMITED. All rights reserved. Incorporated May 22, 1986.
          </div>
          <div className="flex items-center space-x-6 text-[#B8D7C0] font-medium">
            <Link href="/quality" className="hover:text-white transition-colors">Quality Systems</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Factory Location</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
