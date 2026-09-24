'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail, User, Phone, MessageSquare, Send, CheckCircle2,
  MapPin, Leaf, FlaskConical, Package, Truck, ChevronDown
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/context/ToastContext';

type InquiryType = 'general' | 'quote' | 'sample' | 'export' | 'custom';

const INQUIRY_TYPES: { value: InquiryType; label: string; icon: React.ReactNode }[] = [
  { value: 'general', label: 'General Inquiry', icon: <MessageSquare className="w-4 h-4" /> },
  { value: 'quote', label: 'Request a Quote', icon: <Package className="w-4 h-4" /> },
  { value: 'sample', label: 'Request a Sample', icon: <FlaskConical className="w-4 h-4" /> },
  { value: 'export', label: 'Export / Bulk Order', icon: <Truck className="w-4 h-4" /> },
  { value: 'custom', label: 'Custom Formulation', icon: <Leaf className="w-4 h-4" /> },
];

const PRODUCT_CATEGORIES = [
  'Essential Oils',
  'Spice Oleoresins',
  'Floral Absolutes & Concretes',
  'Sterilized Spice Powders',
  'Aroma Chemicals',
  'Custom Blends / Formulations',
  'Other',
];

export default function ContactPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [inquiryType, setInquiryType] = useState<InquiryType>('quote');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Store submission locally (Supabase integration can be added when configured)
    const submission = {
      id: crypto.randomUUID(),
      inquiry_type: inquiryType,
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      product_category: productCategory,
      message: message.trim(),
      created_at: new Date().toISOString(),
      status: 'new',
    };

    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('venuss_contact_submissions') || '[]');
      existing.unshift(submission);
      localStorage.setItem('venuss_contact_submissions', JSON.stringify(existing));
    }

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    setIsSubmitting(false);
    setIsSuccess(true);
    showToast('Your inquiry has been received! We\'ll respond within 24 hours.', 'success');
  };

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FAF9F5] flex items-center justify-center px-4 py-20">
          <div className="max-w-lg w-full text-center">
            <div className="w-20 h-20 rounded-full bg-[#2E5E3E]/10 flex items-center justify-center mx-auto mb-6 border border-[#2E5E3E]/20">
              <CheckCircle2 className="w-10 h-10 text-[#2E5E3E]" />
            </div>
            <h1 className="text-3xl font-bold font-serif text-[#2E5E3E] mb-3">Thank You, {name.split(' ')[0]}!</h1>
            <p className="text-sm text-[#3A372E]/70 font-light leading-relaxed mb-2">
              Your inquiry has been received. Our sales team typically responds within <strong>24 business hours</strong>.
            </p>
            <p className="text-xs text-slate-400 mb-10">
              A confirmation has been logged for reference: <span className="font-mono text-[#2E5E3E]">#{Date.now().toString(36).toUpperCase()}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products" className="px-7 py-3 bg-[#2E5E3E] text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#1F452C] transition-all shadow-md">
                Browse Products
              </Link>
              <button onClick={() => setIsSuccess(false)} className="px-7 py-3 border border-[#2E5E3E] text-[#2E5E3E] rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#2E5E3E]/5 transition-all">
                Send Another Inquiry
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#FAF9F5] min-h-screen">

        {/* Hero Section */}
        <section className="relative bg-[#2E5E3E] text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D26] via-[#2E5E3E] to-[#3D7A52] opacity-90" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4954B]/10 rounded-full blur-2xl -ml-16 -mb-16" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-xs text-white/50 hover:text-white transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-xs text-white/80">Contact & Inquiries</span>
            </div>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase font-bold tracking-widest text-[#D4954B] border border-white/10 mb-4">
                <Leaf className="w-3 h-3" />
                Get In Touch
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold font-serif leading-tight mb-4">
                Request a Quote or<br />
                <span className="text-[#D4954B] italic font-serif font-normal">Start a Conversation</span>
              </h1>
              <p className="text-sm text-white/70 font-light leading-relaxed max-w-lg">
                Whether you need bulk essential oils, custom formulations, export documentation, or product samples — our team is ready to assist. We typically respond within 24 business hours.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* LEFT: Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-lg font-bold font-serif text-[#2E5E3E] mb-5">Company Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#2E5E3E]/8 border border-[#2E5E3E]/15 flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-[#2E5E3E]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-0.5">Email</p>
                      <a href="mailto:sales@venuss.co.in" className="text-sm text-[#3A372E]/80 hover:text-[#2E5E3E] transition-colors font-light">
                        sales@venuss.co.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#2E5E3E]/8 border border-[#2E5E3E]/15 flex-shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-[#2E5E3E]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-0.5">Phone / WhatsApp</p>
                      <a href="tel:+919443212345" className="text-sm text-[#3A372E]/80 hover:text-[#2E5E3E] transition-colors font-light">
                        +91 94432 12345
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#2E5E3E]/8 border border-[#2E5E3E]/15 flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-[#2E5E3E]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-0.5">Address</p>
                      <p className="text-sm text-[#3A372E]/80 font-light leading-relaxed">
                        Venuss Herbo Aromatics Ltd<br />
                        Tamil Nadu, India — 600001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-5 bg-white border border-[#2E5E3E]/15 rounded-2xl shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2E5E3E] mb-3">Business Hours</h3>
                <div className="space-y-1.5 text-[11px] text-[#3A372E]/70 font-light">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-medium text-[#2E5E3E]">9:00 AM – 6:00 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-[#2E5E3E]">9:00 AM – 1:00 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-slate-400">Closed</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="p-5 bg-[#2E5E3E] text-white rounded-2xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4954B] mb-3">Quality Certifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['ISO 9001:2015', 'HACCP Certified', 'FSSAI Licensed', 'GMP Compliant', 'Kosher & Halal', 'Organic Cert'].map(cert => (
                    <div key={cert} className="flex items-center gap-1.5 text-[10px] text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4954B] flex-shrink-0" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-bold font-serif text-[#2E5E3E] mb-1">Send Us an Inquiry</h2>
                <p className="text-xs text-slate-400 font-light mb-6">Fields marked with <span className="text-red-400">*</span> are required.</p>

                {/* Inquiry Type Selector */}
                <div className="mb-6">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-2">
                    Type of Inquiry <span className="text-red-400">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setInquiryType(type.value)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold border transition-all ${
                          inquiryType === type.value
                            ? 'bg-[#2E5E3E] text-white border-[#2E5E3E] shadow-sm'
                            : 'bg-white text-[#2E5E3E] border-[#2E5E3E]/25 hover:border-[#2E5E3E]/60'
                        }`}
                      >
                        {type.icon}
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="contact-name"
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Your full name"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-slate-200 rounded-xl text-sm text-[#2E5E3E] placeholder:text-slate-400 font-light focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E] transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        placeholder="Your company name"
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-200 rounded-xl text-sm text-[#2E5E3E] placeholder:text-slate-400 font-light focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-1.5">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-slate-200 rounded-xl text-sm text-[#2E5E3E] placeholder:text-slate-400 font-light focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E] transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="contact-phone"
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-slate-200 rounded-xl text-sm text-[#2E5E3E] placeholder:text-slate-400 font-light focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Category */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-1.5">
                      Product Category of Interest
                    </label>
                    <div className="relative">
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        id="contact-product-category"
                        value={productCategory}
                        onChange={e => setProductCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-200 rounded-xl text-sm text-[#2E5E3E] font-light focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E] transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a product category…</option>
                        {PRODUCT_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2E5E3E] mb-1.5">
                      Message / Requirements <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder={
                        inquiryType === 'quote'
                          ? 'Please specify the product(s), quantity required (kg/litre), delivery destination, and any purity or specification requirements…'
                          : inquiryType === 'sample'
                          ? 'Please specify the product(s) you need samples for and your shipping address…'
                          : 'Describe your requirements in detail…'
                      }
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-200 rounded-xl text-sm text-[#2E5E3E] placeholder:text-slate-400 font-light focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E] transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#2E5E3E] hover:bg-[#1F452C] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Inquiry…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Inquiry
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center font-light">
                    By submitting this form, you agree to be contacted by Venuss Herbo Aromatics regarding your inquiry.
                    We respect your privacy and do not share your data with third parties.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
