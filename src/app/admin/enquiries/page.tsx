'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare, Package, FlaskConical, Truck, Leaf,
  Search, RefreshCw, CheckCircle2, Clock, Trash2, Eye,
  X, ExternalLink, Mail, Phone, Building, Globe, Filter
} from 'lucide-react';
import { db, CommercialInquiry } from '@/lib/db';
import { useToast } from '@/context/ToastContext';

type TabKey = 'all' | 'quote' | 'sample' | 'export' | 'other';

export default function AdminEnquiriesPage() {
  const { showToast } = useToast();
  const [inquiries, setInquiries] = useState<CommercialInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<CommercialInquiry | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await db.getInquiries();
      setInquiries(data);
    } catch (e) {
      console.error('Failed to load inquiries:', e);
      showToast('Failed to load commercial inquiries.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();

    const handleUpdate = () => {
      fetchInquiries();
    };

    window.addEventListener('venuss-inquiries-updated', handleUpdate);
    return () => {
      window.removeEventListener('venuss-inquiries-updated', handleUpdate);
    };
  }, []);

  const handleStatusChange = async (id: string, newStatus: CommercialInquiry['status']) => {
    try {
      const updated = await db.updateInquiryStatus(id, newStatus);
      if (updated) {
        setInquiries(prev => prev.map(i => i.id === id ? updated : i));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(updated);
        }
        showToast(`Inquiry status updated to ${newStatus}.`, 'success');
      }
    } catch (e) {
      console.error('Failed to update status:', e);
      showToast('Failed to update inquiry status.', 'error');
    }
  };

  const handleDelete = async (id: string, refNo: string) => {
    if (!confirm(`Are you sure you want to delete inquiry #${refNo}?`)) return;

    try {
      const success = await db.deleteInquiry(id);
      if (success) {
        setInquiries(prev => prev.filter(i => i.id !== id));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(null);
        }
        showToast(`Inquiry #${refNo} deleted.`, 'info');
      }
    } catch (e) {
      console.error('Failed to delete inquiry:', e);
      showToast('Failed to delete inquiry.', 'error');
    }
  };

  // Filtered list
  const filtered = inquiries.filter(i => {
    // Tab filter
    if (activeTab === 'quote' && i.inquiry_type !== 'quote') return false;
    if (activeTab === 'sample' && i.inquiry_type !== 'sample') return false;
    if (activeTab === 'export' && i.inquiry_type !== 'export') return false;
    if (activeTab === 'other' && !['custom', 'general'].includes(i.inquiry_type)) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        i.reference_no?.toLowerCase().includes(q) ||
        i.name?.toLowerCase().includes(q) ||
        i.email?.toLowerCase().includes(q) ||
        i.company?.toLowerCase().includes(q) ||
        i.product_name?.toLowerCase().includes(q) ||
        i.destination_country?.toLowerCase().includes(q) ||
        i.message?.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const countQuotes = inquiries.filter(i => i.inquiry_type === 'quote').length;
  const countSamples = inquiries.filter(i => i.inquiry_type === 'sample').length;
  const countExports = inquiries.filter(i => i.inquiry_type === 'export').length;
  const countOthers = inquiries.filter(i => ['custom', 'general'].includes(i.inquiry_type)).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quote': return <Package className="w-3.5 h-3.5 text-amber-600" />;
      case 'sample': return <FlaskConical className="w-3.5 h-3.5 text-blue-600" />;
      case 'export': return <Truck className="w-3.5 h-3.5 text-emerald-600" />;
      case 'custom': return <Leaf className="w-3.5 h-3.5 text-purple-600" />;
      default: return <MessageSquare className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">New Request</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">Under Review</span>;
      case 'quoted':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">Quote Dispatched</span>;
      case 'dispatched':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">Sample Dispatched</span>;
      case 'closed':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Completed / Closed</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4954B]" />
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#173B2B]">
              Commercial Inquiries &amp; Quotations
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage quotation requests, analytical COA dossiers, laboratory evaluation samples, and export orders.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          disabled={loading}
          className="h-10 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Submissions</span>
            <MessageSquare className="w-4 h-4 text-[#173B2B]" />
          </div>
          <div className="text-2xl font-bold font-heading text-[#173B2B]">{inquiries.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">All commercial records</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Quote &amp; COA Requests</span>
            <Package className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-heading text-[#173B2B]">{countQuotes}</div>
          <p className="text-[11px] text-amber-600 font-medium mt-1">Pricing &amp; analytical dossiers</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Sample Orders</span>
            <FlaskConical className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-heading text-[#173B2B]">{countSamples}</div>
          <p className="text-[11px] text-blue-600 font-medium mt-1">Lab evaluation vials</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Export &amp; Bulk Orders</span>
            <Truck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-heading text-[#173B2B]">{countExports}</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Container &amp; freight inquiries</p>
        </div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-100 p-1.5 rounded-2xl">
          {[
            { key: 'all', label: `All (${inquiries.length})` },
            { key: 'quote', label: `Quotes (${countQuotes})` },
            { key: 'sample', label: `Samples (${countSamples})` },
            { key: 'export', label: `Export / Bulk (${countExports})` },
            { key: 'other', label: `General (${countOthers})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-white text-[#173B2B] shadow-xs'
                  : 'text-slate-600 hover:text-[#173B2B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="admin-enquiry-search"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search ref, product, customer…"
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#173B2B] placeholder:text-slate-400 focus:outline-none focus:border-[#173B2B]"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#173B2B] border-t-transparent animate-spin mx-auto mb-3" />
            <p className="text-xs font-medium text-slate-500">Loading commercial submissions…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-heading text-base font-bold text-[#173B2B] mb-1">No Inquiries Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery ? 'No matching submissions found for your search query.' : 'No customer inquiries in this category.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-5">Reference &amp; Date</th>
                  <th className="py-3.5 px-5">Type</th>
                  <th className="py-3.5 px-5">Customer &amp; Company</th>
                  <th className="py-3.5 px-5">Product &amp; Spec</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filtered.map(inquiry => (
                  <tr key={inquiry.id} className="hover:bg-slate-50/60 transition-colors">
                    
                    {/* Ref & Date */}
                    <td className="py-4 px-5">
                      <div className="font-mono font-bold text-xs text-[#173B2B]">
                        #{inquiry.reference_no}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(inquiry.created_at).toLocaleDateString()} {new Date(inquiry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-4 px-5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold capitalize">
                        {getTypeIcon(inquiry.inquiry_type)}
                        <span>{inquiry.inquiry_type}</span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-5">
                      <div className="font-semibold text-[#173B2B]">{inquiry.name}</div>
                      {inquiry.company && (
                        <div className="text-[11px] text-slate-500 font-medium">{inquiry.company}</div>
                      )}
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono">{inquiry.email}</div>
                    </td>

                    {/* Product & Spec */}
                    <td className="py-4 px-5 max-w-xs">
                      <div className="font-semibold text-[#173B2B] truncate">
                        {inquiry.product_name || inquiry.product_category || 'General Extract Inquiry'}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {inquiry.quantity && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            Qty: {inquiry.quantity}
                          </span>
                        )}
                        {inquiry.packaging && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 font-medium">
                            {inquiry.packaging}
                          </span>
                        )}
                        {inquiry.destination_country && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60 font-medium">
                            {inquiry.destination_country}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5">
                      <select
                        value={inquiry.status}
                        onChange={e => handleStatusChange(inquiry.id, e.target.value as CommercialInquiry['status'])}
                        className="text-xs font-semibold py-1 px-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#173B2B] cursor-pointer"
                      >
                        <option value="new">New Request</option>
                        <option value="in_progress">Under Review</option>
                        <option value="quoted">Quote Prepared</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="closed">Closed / Archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          title="View Details"
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry.id, inquiry.reference_no)}
                          title="Delete Record"
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Commercial Inquiry Record
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <h3 className="font-heading text-xl font-extrabold text-[#173B2B]">
                    #{selectedInquiry.reference_no}
                  </h3>
                  {getStatusBadge(selectedInquiry.status)}
                </div>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Contact Person</span>
                <span className="font-semibold text-sm text-[#173B2B]">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Organization</span>
                <span className="font-semibold text-sm text-[#173B2B]">{selectedInquiry.company || 'Not Specified'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Business Email</span>
                <a href={`mailto:${selectedInquiry.email}`} className="font-semibold text-sm text-blue-600 hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Phone / WhatsApp</span>
                <span className="font-semibold text-sm text-[#173B2B]">{selectedInquiry.phone || 'Not Provided'}</span>
              </div>
            </div>

            {/* Specification & Product Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173B2B]">Specification Details</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-[#FAF9F5] p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Product / Extract</span>
                  <span className="font-bold text-[#173B2B]">{selectedInquiry.product_name || 'General Inquiry'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Extraction Category</span>
                  <span className="font-medium text-slate-700">{selectedInquiry.product_category || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Volume / Quantity</span>
                  <span className="font-medium text-slate-700">{selectedInquiry.quantity || '1'} unit(s)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Packaging Format</span>
                  <span className="font-medium text-slate-700">{selectedInquiry.packaging || 'Standard Packaging'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Destination Port/Country</span>
                  <span className="font-medium text-slate-700">{selectedInquiry.destination_country || 'Domestic India'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Submitted Date</span>
                  <span className="font-medium text-slate-700">{new Date(selectedInquiry.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Message / Technical Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173B2B]">Client Requirements &amp; Notes</h4>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Update Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={e => handleStatusChange(selectedInquiry.id, e.target.value as CommercialInquiry['status'])}
                  className="text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#173B2B]"
                >
                  <option value="new">New Request</option>
                  <option value="in_progress">Under Review</option>
                  <option value="quoted">Quote Prepared</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="closed">Closed / Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your enquiry %23${selectedInquiry.reference_no} - Venuss Herbo Aromatics`}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#173B2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#204E39] transition-all inline-flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
