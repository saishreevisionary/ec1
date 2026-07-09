'use client';

import React, { useState, useEffect } from 'react';
import { Save, Layout, QrCode, PhoneCall, Percent, Settings, Check } from 'lucide-react';
import { db } from '@/lib/db';

export default function AdminSettings() {
  const [activePanel, setActivePanel] = useState<'banner' | 'qr' | 'contact' | 'general'>('banner');
  const [loading, setLoading] = useState(true);

  // States for forms
  const [banner, setBanner] = useState({
    title: "",
    subtitle: "",
    cta_text: "",
    bg_gradient: ""
  });

  const [qr, setQr] = useState({
    company_name: "",
    upi_id: "",
    instructions: ""
  });

  const [contact, setContact] = useState({
    email: "",
    phone: "",
    address: ""
  });

  const [general, setGeneral] = useState({
    logo_text: "",
    gst_rate: 18,
    gst_enabled: true
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    
    const bannerVal = await db.getSetting('banner_settings', {
      title: "The New Era of Simplicity",
      subtitle: "Meticulously designed tools for premium sound, refined workspaces, and active living.",
      cta_text: "Shop the Collection",
      bg_gradient: "from-slate-900 via-indigo-950 to-slate-900"
    });

    const qrVal = await db.getSetting('qr_settings', {
      company_name: "LendoraStore Premium Ltd",
      upi_id: "lendorastore@upi",
      instructions: "Please open any UPI enabled payment app. Scan the QR code, verify the amount, and submit the payment. Take a screenshot and upload below."
    });

    const contactVal = await db.getSetting('contact_settings', {
      email: "experience@lendorastore.com",
      phone: "+1 (800) 854-8290",
      address: "One Infinite Loop, Cupertino, CA 95014, USA"
    });

    const generalVal = await db.getSetting('general_settings', {
      logo_text: "LendoraStore",
      gst_rate: 18,
      gst_enabled: true
    });

    setBanner(bannerVal);
    setQr(qrVal);
    setContact(contactVal);
    setGeneral(generalVal);
    setLoading(false);
  };

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.saveSetting('banner_settings', banner);
    alert("Store banner settings updated successfully.");
  };

  const handleSaveQr = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.saveSetting('qr_settings', qr);
    alert("UPI QR payment configurations updated successfully.");
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.saveSetting('contact_settings', contact);
    alert("Contact support information updated successfully.");
  };

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.saveSetting('general_settings', general);
    
    // Save logo settings text too
    await db.saveSetting('logo_settings', { text: general.logo_text, url: "" });
    alert("General settings updated successfully.");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start animate-fade-in">
      
      {/* Sidebar Tabs */}
      <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm hide-scrollbar">
        <button
          onClick={() => setActivePanel('banner')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 lg:w-full ${
            activePanel === 'banner'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-500 hover:text-primary hover:bg-slate-50'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Home Banner</span>
        </button>

        <button
          onClick={() => setActivePanel('qr')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 lg:w-full ${
            activePanel === 'qr'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-500 hover:text-primary hover:bg-slate-50'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>UPI QR Settings</span>
        </button>

        <button
          onClick={() => setActivePanel('contact')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 lg:w-full ${
            activePanel === 'contact'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-500 hover:text-primary hover:bg-slate-50'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Contact Info</span>
        </button>

        <button
          onClick={() => setActivePanel('general')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 lg:w-full ${
            activePanel === 'general'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-500 hover:text-primary hover:bg-slate-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Tax & Identity</span>
        </button>
      </nav>

      {/* Main Configurations Container */}
      <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        
        {/* PANEL 1: BANNER SETTINGS */}
        {activePanel === 'banner' && (
          <form onSubmit={handleSaveBanner} className="space-y-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-100 pb-2">Home Hero Banner Content</h3>
            
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Promo Title</label>
              <input
                type="text"
                required
                value={banner.title}
                onChange={(e) => setBanner({ ...banner, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="The New Era of Simplicity"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Promo Subtitle</label>
              <textarea
                required
                value={banner.subtitle}
                onChange={(e) => setBanner({ ...banner, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary h-20"
                placeholder="Describe promo details..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">CTA Button Text</label>
                <input
                  type="text"
                  required
                  value={banner.cta_text}
                  onChange={(e) => setBanner({ ...banner, cta_text: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Shop Now"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Tailwind Gradient Styling</label>
                <input
                  type="text"
                  required
                  value={banner.bg_gradient}
                  onChange={(e) => setBanner({ ...banner, bg_gradient: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="from-slate-900 via-indigo-950 to-slate-900"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save Banner</span>
              </button>
            </div>
          </form>
        )}

        {/* PANEL 2: PAYMENT UPI CONFIGS */}
        {activePanel === 'qr' && (
          <form onSubmit={handleSaveQr} className="space-y-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-100 pb-2">UPI Direct QR Settlement Config</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Recipient Business Name</label>
                <input
                  type="text"
                  required
                  value={qr.company_name}
                  onChange={(e) => setQr({ ...qr, company_name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  placeholder="LendoraStore Premium Ltd"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">UPI Address (VPA)</label>
                <input
                  type="text"
                  required
                  value={qr.upi_id}
                  onChange={(e) => setQr({ ...qr, upi_id: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  placeholder="lendorastore@upi"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Payment Instructions</label>
              <textarea
                required
                value={qr.instructions}
                onChange={(e) => setQr({ ...qr, instructions: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none h-24"
                placeholder="Give step-by-step directions..."
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save Payment Config</span>
              </button>
            </div>
          </form>
        )}

        {/* PANEL 3: CONTACT INFORMATION */}
        {activePanel === 'contact' && (
          <form onSubmit={handleSaveContact} className="space-y-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-100 pb-2">Support Contact Coordinates</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Support Email Desk</label>
                <input
                  type="email"
                  required
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  placeholder="experience@lendorastore.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Support Hotline Phone</label>
                <input
                  type="text"
                  required
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  placeholder="+1 (800) 854-8290"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Store Physical Location</label>
              <textarea
                required
                value={contact.address}
                onChange={(e) => setContact({ ...contact, address: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none h-20"
                placeholder="Corporate headquarters or warehouse pickup location details..."
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save Contact Details</span>
              </button>
            </div>
          </form>
        )}

        {/* PANEL 4: GENERAL & TAX SETTINGS */}
        {activePanel === 'general' && (
          <form onSubmit={handleSaveGeneral} className="space-y-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-slate-100 pb-2">Tax Settings & Storefront Branding</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Store Brand Text (Logo)</label>
                <input
                  type="text"
                  required
                  value={general.logo_text}
                  onChange={(e) => setGeneral({ ...general, logo_text: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  placeholder="LendoraStore"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Standard GST Rate (%)</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  value={general.gst_rate}
                  onChange={(e) => setGeneral({ ...general, gst_rate: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  placeholder="18"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <input
                type="checkbox"
                id="gst_enabled"
                checked={general.gst_enabled}
                onChange={(e) => setGeneral({ ...general, gst_enabled: e.target.checked })}
                className="rounded border-slate-300 text-primary w-4.5 h-4.5 accent-primary cursor-pointer"
              />
              <label htmlFor="gst_enabled" className="text-xs font-semibold text-primary cursor-pointer">Enable GST Calculations on Storefront Checkout & Invoices</label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save General Config</span>
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
}
