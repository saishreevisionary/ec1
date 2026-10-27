'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Mail, User, Phone, MessageSquare, Send, CheckCircle2,
  MapPin, Leaf, FlaskConical, Package, Truck, ChevronDown,
  Globe, AlertCircle, ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { db, CommercialInquiry, Product } from '@/lib/db';

type InquiryType = 'general' | 'quote' | 'sample' | 'export' | 'custom';

const INQUIRY_TYPES: { value: InquiryType; label: string; icon: React.ReactNode; badge: string }[] = [
  { value: 'quote', label: 'Request a Quote & COA', icon: <Package className="w-4 h-4" />, badge: 'Quotation Desk' },
  { value: 'sample', label: 'Sample Order (Lab Evaluation)', icon: <FlaskConical className="w-4 h-4" />, badge: 'QC Sample Desk' },
  { value: 'export', label: 'Export / Bulk Order', icon: <Truck className="w-4 h-4" />, badge: 'Global Logistics' },
  { value: 'custom', label: 'Custom Formulation', icon: <Leaf className="w-4 h-4" />, badge: 'R&D Extraction' },
  { value: 'general', label: 'General Inquiry', icon: <MessageSquare className="w-4 h-4" />, badge: 'Commercial Desk' },
];

const PRODUCT_CATEGORIES = [
  'Essential Oils',
  'Spice Oils',
  'Spice Oleoresins',
  'Floral Concretes',
  'Floral Absolutes',
  'Spice Powders',
  'Custom Formulations',
  'Other',
];

function ContactContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { user } = useAuth();

  const productParam = searchParams.get('product') || '';
  const idParam = searchParams.get('id') || '';
  const typeParam = searchParams.get('type') as InquiryType | null;
  const pkgParam = searchParams.get('pkg') || '';
  const qtyParam = searchParams.get('qty');

  const [inquiryType, setInquiryType] = useState<InquiryType>(typeParam || 'quote');
  const [name, setName] = useState(user?.name || '');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [productId, setProductId] = useState(idParam);
  const [productName, setProductName] = useState(productParam);
  const [productCategory, setProductCategory] = useState('');
  const [quantity, setQuantity] = useState<number>(qtyParam ? Math.max(1, parseInt(qtyParam, 10) || 1) : 1);
  const [packaging, setPackaging] = useState(pkgParam);
  const [destinationCountry, setDestinationCountry] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<CommercialInquiry | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync auth user details if available
  useEffect(() => {
    if (user) {
      if (!name) setName(user.name);
      if (!email) setEmail(user.email);
    }
  }, [user]);

  // Lookup and verify product from database
  useEffect(() => {
    let isMounted = true;

    async function loadAndVerifyProduct() {
      if (typeParam && ['general', 'quote', 'sample', 'export', 'custom'].includes(typeParam)) {
        setInquiryType(typeParam);
      }

      if (pkgParam) {
        setPackaging(pkgParam);
      }

      if (qtyParam) {
        const parsed = parseInt(qtyParam, 10);
        if (!isNaN(parsed) && parsed > 0) {
          setQuantity(parsed);
        }
      }

      let matchedProduct: Product | null = null;

      try {
        const products = await db.getProducts();
        if (idParam) {
          matchedProduct = products.find(p => p.id === idParam) || null;
        }
        if (!matchedProduct && productParam) {
          const lowerParam = productParam.toLowerCase().trim();
          matchedProduct = products.find(p => 
            p.name.toLowerCase() === lowerParam || 
            p.slug.toLowerCase() === lowerParam ||
            p.botanical_name?.toLowerCase() === lowerParam
          ) || null;
        }
      } catch (e) {
        console.error('Failed to verify product for enquiry:', e);
      }

      if (!isMounted) return;

      const effectiveName = matchedProduct ? matchedProduct.name : productParam;
      const effectiveId = matchedProduct ? matchedProduct.id : idParam;
      let effectiveCategory = '';

      if (matchedProduct) {
        try {
          const categories = await db.getCategories();
          const cat = categories.find(c => c.id === matchedProduct?.category_id);
          effectiveCategory = cat ? cat.name : (matchedProduct.product_range || '');
        } catch {
          effectiveCategory = matchedProduct.product_range || '';
        }
      }

      setProductName(effectiveName);
      setProductId(effectiveId);

      if (effectiveCategory) {
        setProductCategory(effectiveCategory);
      } else if (effectiveName) {
        // Fallback category heuristic if not in database
        const lower = effectiveName.toLowerCase();
        if (lower.includes('absolute')) setProductCategory('Floral Absolutes');
        else if (lower.includes('concrete')) setProductCategory('Floral Concretes');
        else if (lower.includes('oleoresin')) setProductCategory('Spice Oleoresins');
        else if (lower.includes('powder')) setProductCategory('Spice Powders');
        else if (lower.includes('oil')) {
          if (['cardamom', 'cumin', 'ginger', 'basil', 'nutmeg', 'mace', 'curry', 'celery', 'onion'].some(k => lower.includes(k))) {
            setProductCategory('Spice Oils');
          } else {
            setProductCategory('Essential Oils');
          }
        }
      }

      // Generate intelligent initial message based on enquiry purpose
      const activeType = typeParam || inquiryType;
      const effectiveQty = qtyParam ? parseInt(qtyParam, 10) : 1;
      const effectivePkg = pkgParam || (matchedProduct?.packaging_options?.[0] || 'Standard packaging');

      if (effectiveName) {
        if (activeType === 'quote') {
          setMessage(
            `Quotation & Technical COA request for ${effectiveName}.\n` +
            `Requested Quantity: ${effectiveQty} unit(s).\n` +
            `Packaging Format: ${effectivePkg}.\n` +
            `Please provide current FOB/CIF pricing schedule, lead time, and recent GC-MS certificate of analysis batch report.`
          );
        } else if (activeType === 'sample') {
          setMessage(
            `Laboratory Evaluation Sample Request for ${effectiveName}.\n` +
            `Sample Format: ${effectivePkg || 'Lab Evaluation Vial (10ml - 100ml)'}.\n` +
            `Requested Quantity: ${effectiveQty} evaluation unit(s).\n` +
            `Intended Application: Quality assurance and analytical testing before commercial order. Please provide dispatch timeline and courier handling instructions.`
          );
        } else if (activeType === 'export') {
          setMessage(
            `Commercial Bulk Export Order Enquiry for ${effectiveName}.\n` +
            `Target Quantity: ${effectiveQty} container(s) / bulk unit(s).\n` +
            `Container Specification: ${effectivePkg || '25kg HDPE Carboys / 180kg Steel Drums'}.\n` +
            `Please provide export CIF pricing, container load capacity, and required customs/phytosanitary documentation.`
          );
        }
      }
    }

    loadAndVerifyProduct();

    return () => {
      isMounted = false;
    };
  }, [productParam, idParam, typeParam, pkgParam, qtyParam]);

  const handleInquiryTypeChange = (newType: InquiryType) => {
    setInquiryType(newType);

    // If message is empty or standard template, update message for new type
    if (productName) {
      if (newType === 'quote') {
        setMessage(
          `Quotation & Technical COA request for ${productName}.\n` +
          `Requested Quantity: ${quantity} unit(s).\n` +
          `Packaging Format: ${packaging || 'Standard packaging'}.\n` +
          `Please provide current FOB/CIF pricing schedule, lead time, and recent GC-MS certificate of analysis batch report.`
        );
      } else if (newType === 'sample') {
        setMessage(
          `Laboratory Evaluation Sample Request for ${productName}.\n` +
          `Sample Format: ${packaging || 'Lab Evaluation Vial (10ml - 100ml)'}.\n` +
          `Requested Quantity: ${quantity} evaluation unit(s).\n` +
          `Intended Application: Quality assurance and analytical testing before commercial order. Please provide dispatch timeline and courier handling instructions.`
        );
      } else if (newType === 'export') {
        setMessage(
          `Commercial Bulk Export Order Enquiry for ${productName}.\n` +
          `Target Quantity: ${quantity} container(s) / bulk unit(s).\n` +
          `Container Specification: ${packaging || '25kg HDPE Carboys / 180kg Steel Drums'}.\n` +
          `Destination Country: ${destinationCountry || '[Destination Country]'}.\n` +
          `Please provide export CIF pricing, container load capacity, and required customs/phytosanitary documentation.`
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      const err = 'Full name is required.';
      setErrorMessage(err);
      showToast(err, 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      const err = 'Please enter a valid business email address.';
      setErrorMessage(err);
      showToast(err, 'error');
      return;
    }

    if (!message.trim()) {
      const err = 'Enquiry specifications and message are required.';
      setErrorMessage(err);
      showToast(err, 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const saved = await db.saveInquiry({
        inquiry_type: inquiryType,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        product_id: productId || undefined,
        product_name: productName || undefined,
        product_category: productCategory || undefined,
        quantity: quantity || 1,
        packaging: packaging.trim() || undefined,
        destination_country: destinationCountry.trim() || undefined,
        message: message.trim(),
        user_id: user?.id,
      });

      setSubmittedInquiry(saved);
      showToast(`Inquiry #${saved.reference_no} received successfully!`, 'success');
    } catch (err: any) {
      console.error('Failed to submit commercial inquiry:', err);
      const msg = err?.message || 'Failed to submit inquiry. Please try again.';
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // SUCCESS CONFIRMATION VIEW
  // ─────────────────────────────────────────────────────────────
  if (submittedInquiry) {
    return (
      <main className="min-h-screen bg-[#FAF9F5] flex items-center justify-center px-4 py-20 font-sans">
        <div className="max-w-2xl w-full bg-white border border-[#2E5E3E]/20 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
          <div className="w-20 h-20 rounded-full bg-[#173B2B]/10 flex items-center justify-center mx-auto mb-6 border border-[#173B2B]/20">
            <CheckCircle2 className="w-10 h-10 text-[#173B2B]" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#173B2B]/10 text-[#173B2B] mb-3">
            {submittedInquiry.inquiry_type.toUpperCase()} ENQUIRY RECORD CREATED
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#173B2B] mb-3">
            Thank You, {submittedInquiry.name.split(' ')[0]}!
          </h1>

          <p className="text-base sm:text-[16.5px] text-[#243B2C] font-normal leading-relaxed mb-6">
            Your inquiry for{' '}
            <strong className="text-[#173B2B] font-bold">
              {submittedInquiry.product_name || submittedInquiry.product_category || 'Botanical Extracts'}
            </strong>{' '}
            has been successfully registered in our commercial desk and database.
          </p>

          {/* Reference & Specification Summary Card */}
          <div className="bg-[#FAF9F5] border border-[#2E5E3E]/15 rounded-2xl p-5 mb-8 text-left space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Reference</span>
              <span id="submitted-reference-no" className="font-mono font-bold text-base text-[#173B2B]">
                #{submittedInquiry.reference_no}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#243B2C]">
              <div>
                <span className="font-bold text-slate-500 block uppercase">Product / Extract</span>
                <span className="font-semibold text-sm text-[#173B2B]">{submittedInquiry.product_name || 'General Inquiry'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block uppercase">Enquiry Purpose</span>
                <span className="font-semibold capitalize text-sm text-[#173B2B]">{submittedInquiry.inquiry_type} Request</span>
              </div>
              {submittedInquiry.quantity && (
                <div>
                  <span className="font-bold text-slate-500 block uppercase">Requested Quantity</span>
                  <span className="font-semibold text-sm text-[#173B2B]">{submittedInquiry.quantity} unit(s)</span>
                </div>
              )}
              {submittedInquiry.packaging && (
                <div>
                  <span className="font-bold text-slate-500 block uppercase">Packaging Format</span>
                  <span className="font-semibold text-sm text-[#173B2B]">{submittedInquiry.packaging}</span>
                </div>
              )}
              {submittedInquiry.destination_country && (
                <div>
                  <span className="font-bold text-slate-500 block uppercase">Destination Port / Country</span>
                  <span className="font-semibold text-sm text-[#173B2B]">{submittedInquiry.destination_country}</span>
                </div>
              )}
              <div>
                <span className="font-bold text-slate-500 block uppercase">Contact Email</span>
                <span className="font-semibold text-sm text-[#173B2B]">{submittedInquiry.email}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-[11.5px] text-slate-500">
              * A member of our technical sales and regulatory documentation team will review your batch specifications and respond within <strong className="text-[#173B2B]">24 business hours</strong>.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            {user ? (
              <Link
                href="/account?tab=enquiries"
                className="px-6 py-3.5 bg-[#173B2B] text-white rounded-full font-bold text-[13.5px] uppercase tracking-wider hover:bg-[#233F2E] transition-all shadow-md inline-flex items-center justify-center gap-1.5"
              >
                <span>View In My Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/products"
                className="px-6 py-3.5 bg-[#173B2B] text-white rounded-full font-bold text-[13.5px] uppercase tracking-wider hover:bg-[#233F2E] transition-all shadow-md inline-flex items-center justify-center gap-1.5"
              >
                <span>Browse Product Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <button
              onClick={() => {
                setSubmittedInquiry(null);
                setMessage('');
              }}
              className="px-6 py-3.5 border-2 border-[#173B2B] text-[#173B2B] rounded-full font-bold text-[13.5px] uppercase tracking-wider hover:bg-[#173B2B]/5 transition-all cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // MAIN INQUIRY FORM VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <main className="bg-[#FAF9F5] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative bg-[#173B2B] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#122A1E] via-[#173B2B] to-[#2E5E3E] opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D48B38]/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-4 text-[13.5px] text-[#D8EADB] font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-semibold">Contact &amp; Commercial Enquiries</span>
          </div>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-xs sm:text-[13px] uppercase font-bold tracking-wider text-[#E8A555] border border-white/10 mb-4">
              <Leaf className="w-3.5 h-3.5" />
              DIRECT MANUFACTURER &amp; EXPORT DESK
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold leading-[1.15] mb-4 text-white">
              Request a Quote, Sample, or<br />
              <span className="text-[#E8A555] italic font-heading font-normal">Technical Dossier</span>
            </h1>
            <p className="text-base sm:text-[17.5px] text-[#D8EADB] font-normal leading-relaxed max-w-xl">
              Whether you need commercial pricing schedules, lab-grade evaluation samples, export bulk containers, or batch analytical certificates — our distillation desk is ready to support your formulation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT: Contact & Facility Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#173B2B] mb-5">
                Distillery &amp; Registered Facility
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#173B2B]/8 border border-[#173B2B]/15 flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-[#173B2B]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#173B2B] mb-0.5">Commercial Sales Desk</p>
                    <a href="mailto:sales@venuss.co.in" className="text-[15.5px] text-[#243B2C] hover:text-[#173B2B] transition-colors font-medium">
                      sales@venuss.co.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#173B2B]/8 border border-[#173B2B]/15 flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#173B2B]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#173B2B] mb-0.5">Direct Line / WhatsApp</p>
                    <a href="tel:+914563244154" className="text-[15.5px] text-[#243B2C] hover:text-[#173B2B] transition-colors font-medium block">
                      +91 4563 244154
                    </a>
                    <a href="tel:+917708001856" className="text-[14px] text-[#3D5244] hover:text-[#173B2B] transition-colors font-medium block mt-0.5">
                      +91 7708 001856
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#173B2B]/8 border border-[#173B2B]/15 flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#173B2B]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#173B2B] mb-0.5">Extraction &amp; Works</p>
                    <p className="text-[14.5px] text-[#243B2C] font-normal leading-relaxed">
                      Venuss Herbo Aromatics Pvt Ltd<br />
                      No. 2C, Muhavoor Road, Seithur,<br />
                      Rajapalayam Taluk, Virudhunagar District,<br />
                      Tamil Nadu, India &mdash; 626121
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 bg-white border border-[#2E5E3E]/15 rounded-2xl shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B2B] mb-3">Operating Hours (IST)</h3>
              <div className="space-y-2 text-[14px] text-[#243B2C]">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday &ndash; Saturday</span>
                  <span className="font-bold text-[#173B2B]">9:00 AM &ndash; 6:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday</span>
                  <span className="text-[#5A6E60] font-medium">Closed (Distillation runs 24/7)</span>
                </div>
              </div>
            </div>

            {/* Analytical Certifications */}
            <div className="p-6 bg-[#173B2B] text-white rounded-2xl border border-[#2E5E3E]/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#E8A555] mb-3">Batch Quality Compliance</h3>
              <div className="grid grid-cols-2 gap-2.5 text-[13px] sm:text-[13.5px] text-[#D8EADB] font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E8A555]" />
                  <span>ISO 9001:2015</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E8A555]" />
                  <span>HACCP Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E8A555]" />
                  <span>FSSAI Licensed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E8A555]" />
                  <span>GC-MS Profiling</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Enquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#2E5E3E]/15 rounded-3xl p-6 sm:p-10 shadow-xs">
              
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C78738] block mb-1">
                  B2B COMMERCIAL &amp; TECHNICAL ENQUIRY
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#173B2B]">
                  Send Your Specification Request
                </h2>

                {/* Preselected Product Banner */}
                {productName && (
                  <div id="contact-selected-product-banner" className="mt-3 flex flex-wrap items-center gap-2 p-3.5 bg-[#FAF8F0] border border-[#2E5E3E]/20 rounded-xl text-[13.5px] text-[#173B2B]">
                    <span>Inquiring about:</span>
                    <strong className="text-[#173B2B] font-bold text-base">{productName}</strong>
                    {productCategory && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#173B2B]/10 text-[#173B2B]">
                        {productCategory}
                      </span>
                    )}
                    {packaging && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#D48B38]/15 text-[#8A5112]">
                        Pkg: {packaging}
                      </span>
                    )}
                    {quantity > 1 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
                        Qty: {quantity}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Inquiry Purpose Selector */}
              <div className="mb-6">
                <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-2.5">
                  Enquiry Purpose <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {INQUIRY_TYPES.map((type) => (
                    <button
                      key={type.value}
                      id={`inquiry-type-${type.value}`}
                      type="button"
                      onClick={() => handleInquiryTypeChange(type.value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] sm:text-[13.5px] font-bold border transition-all cursor-pointer ${
                        inquiryType === type.value
                          ? 'bg-[#173B2B] text-white border-[#173B2B] shadow-2xs'
                          : 'bg-white text-[#173B2B] border-[#2E5E3E]/25 hover:border-[#173B2B]'
                      }`}
                    >
                      {type.icon}
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error banner */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6E60]" />
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Dr. / Mr. / Ms. Full Name"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl text-[14.5px] text-[#173B2B] placeholder:text-[#5A6E60]/80 font-normal focus:outline-none focus:ring-2 focus:ring-[#173B2B] focus:border-[#173B2B] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                      Company / Organization Name
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder="e.g. Fragrance / Flavor House / FMCG"
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl text-[14.5px] text-[#173B2B] placeholder:text-[#5A6E60]/80 font-normal focus:outline-none focus:ring-2 focus:ring-[#173B2B] focus:border-[#173B2B] transition-all"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                      Business Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6E60]" />
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="purchasing@company.com"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl text-[14.5px] text-[#173B2B] placeholder:text-[#5A6E60]/80 font-normal focus:outline-none focus:ring-2 focus:ring-[#173B2B] focus:border-[#173B2B] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6E60]" />
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl text-[14.5px] text-[#173B2B] placeholder:text-[#5A6E60]/80 font-normal focus:outline-none focus:ring-2 focus:ring-[#173B2B] focus:border-[#173B2B] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Category + Packaging Specification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                      Extraction Category
                    </label>
                    <div className="relative">
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6E60] pointer-events-none" />
                      <select
                        id="contact-product-category"
                        value={productCategory}
                        onChange={e => setProductCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl text-[14.5px] text-[#173B2B] font-normal focus:outline-none focus:ring-2 focus:ring-[#173B2B] focus:border-[#173B2B] transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select an extraction family…</option>
                        {PRODUCT_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                      Packaging / Container Format
                    </label>
                    <input
                      id="contact-packaging"
                      type="text"
                      value={packaging}
                      onChange={e => setPackaging(e.target.value)}
                      placeholder="e.g. 5kg canister / 25kg carboy / 180kg drum"
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl text-[14.5px] text-[#173B2B] placeholder:text-[#5A6E60]/80 font-normal focus:outline-none focus:ring-2 focus:ring-[#173B2B] focus:border-[#173B2B] transition-all"
                    />
                  </div>
                </div>

                {/* Quantity + Export Destination (Conditional on Export / Bulk Order) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                      Estimated Volume / Quantity
                    </label>
                    <input
                      id="contact-quantity"
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      placeholder="1"
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl text-[14.5px] text-[#173B2B] font-normal focus:outline-none focus:ring-2 focus:ring-[#173B2B] focus:border-[#173B2B] transition-all"
                    />
                  </div>

                  {inquiryType === 'export' ? (
                    <div>
                      <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                        Destination Country / Port <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6E60]" />
                        <input
                          id="contact-destination-country"
                          type="text"
                          required
                          value={destinationCountry}
                          onChange={e => setDestinationCountry(e.target.value)}
                          placeholder="e.g. United States, Germany, UAE, Japan"
                          className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl text-[14.5px] text-[#173B2B] placeholder:text-[#5A6E60]/80 font-normal focus:outline-none focus:ring-2 focus:ring-[#173B2B] focus:border-[#173B2B] transition-all"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                        Delivery State / City
                      </label>
                      <input
                        id="contact-destination-general"
                        type="text"
                        value={destinationCountry}
                        onChange={e => setDestinationCountry(e.target.value)}
                        placeholder="e.g. Mumbai, New Delhi, Bengaluru"
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl text-[14.5px] text-[#173B2B] placeholder:text-[#5A6E60]/80 font-normal focus:outline-none focus:ring-2 focus:ring-[#173B2B] focus:border-[#173B2B] transition-all"
                      />
                    </div>
                  )}
                </div>

                {/* Specification Details & Enquiry Message */}
                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                    Specification Details &amp; Technical Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Specify batch requirements, target density, optical rotation, certificate of analysis (COA) requests, or custom bottling needs."
                    required
                    className="w-full px-4 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl text-[14.5px] text-[#173B2B] placeholder:text-[#5A6E60]/80 font-normal focus:outline-none focus:ring-2 focus:ring-[#173B2B] focus:border-[#173B2B] transition-all resize-none leading-relaxed"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#173B2B] hover:bg-[#233F2E] text-white rounded-xl text-[15px] sm:text-[15.5px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting 
                      ? 'Registering Enquiry in Database…' 
                      : inquiryType === 'quote' 
                        ? 'Submit Quote & COA Request'
                        : inquiryType === 'sample'
                          ? 'Submit Sample Evaluation Request'
                          : inquiryType === 'export'
                            ? 'Submit Export Bulk Enquiry'
                            : 'Submit Commercial Inquiry'
                    }
                  </span>
                </button>
              </form>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#173B2B] border-t-transparent animate-spin" />
        </div>
      }>
        <ContactContent />
      </Suspense>
      <Footer />
    </>
  );
}
