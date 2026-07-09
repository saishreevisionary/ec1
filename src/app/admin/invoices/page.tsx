'use client';

import React, { useState, useEffect } from 'react';
import { Search, Receipt, Printer, X, Eye } from 'lucide-react';
import { db } from '@/lib/db';

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInvoice, setActiveInvoice] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    const list = await db.getInvoices();
    setInvoices(list);
    setLoading(false);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesNumber = inv.invoice_number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCustomer = inv.orders?.shipping_name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    return matchesNumber || matchesCustomer;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Search Filter */}
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search by invoice number or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        {filteredInvoices.length === 0 ? (
          <div className="text-center py-12">
            <Receipt className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-xs text-slate-400 font-light">No invoice records logged.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-light text-slate-500 border-collapse">
              <thead>
                <tr className="border-b border-slate-100 font-semibold text-primary uppercase tracking-wider">
                  <th className="py-3 px-3">Invoice Code</th>
                  <th className="py-3 px-3">Order Connection</th>
                  <th className="py-3 px-3">Billing Name</th>
                  <th className="py-3 px-3">Subtotal</th>
                  <th className="py-3 px-3">Grand Total</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => {
                  const order = inv.orders;
                  if (!order) return null;
                  return (
                    <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-3 font-semibold text-primary">{inv.invoice_number.toUpperCase()}</td>
                      <td className="py-3.5 px-3 font-medium text-slate-500">Order #{order.id.substring(0, 8).toUpperCase()}</td>
                      <td className="py-3.5 px-3 font-semibold text-primary">{order.shipping_name}</td>
                      <td className="py-3.5 px-3 font-medium text-slate-600">${order.subtotal}</td>
                      <td className="py-3.5 px-3 font-extrabold text-primary">${order.grand_total}</td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setActiveInvoice(inv)}
                          className="px-3.5 py-1.5 border border-slate-200 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Tax Invoice</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TAX INVOICE PRINT PREVIEW MODAL */}
      {activeInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActiveInvoice(null)}></div>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative z-10 shadow-2xl border border-slate-200 animate-slide-up flex flex-col">
            
            {/* Modal Controls */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-6 print:hidden">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Store Invoice View</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-primary text-white hover:bg-primary-light rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print invoice</span>
                </button>
                <button
                  onClick={() => setActiveInvoice(null)}
                  className="p-2 border border-slate-200 text-slate-400 hover:text-slate-600 rounded-xl"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Print Content Layout */}
            <div className="flex-grow p-4 bg-white border border-slate-100 rounded-xl print:border-none print:p-0">
              
              {/* Header block */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-6 gap-6">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-primary">LendoraStore</h2>
                  <p className="text-xs text-slate-400 font-light mt-1">One Infinite Loop, Cupertino, CA 95014</p>
                  <p className="text-xs text-slate-400 font-light">experience@lendorastore.com | +1 (800) 854-8290</p>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold uppercase tracking-wide text-primary">GST TAX INVOICE</h3>
                  <p className="text-xs font-semibold text-primary mt-1">Invoice #{activeInvoice.invoice_number.toUpperCase()}</p>
                  <p className="text-xs text-slate-400 font-light mt-0.5">Date: {new Date(activeInvoice.created_at).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-400 font-light">Status: Paid (UPI QR-Verify)</p>
                </div>
              </div>

              {/* Addresses block */}
              <div className="grid grid-cols-2 gap-8 py-6 border-b border-slate-200 text-xs font-light">
                <div>
                  <h4 className="font-bold text-primary uppercase tracking-wider mb-2">Billed To:</h4>
                  <p className="font-semibold text-primary">{activeInvoice.orders.shipping_name}</p>
                  <p className="text-slate-500 mt-1">{activeInvoice.orders.shipping_address}</p>
                  <p className="text-slate-500">{activeInvoice.orders.shipping_city} - {activeInvoice.orders.shipping_pincode}</p>
                  <p className="text-slate-400 mt-1">Phone: {activeInvoice.orders.shipping_phone}</p>
                </div>
                <div>
                  <h4 className="font-bold text-primary uppercase tracking-wider mb-2">Merchant Registration:</h4>
                  <p className="font-semibold text-primary">LendoraStore Premium Ltd</p>
                  <p className="text-slate-500 mt-1">GSTIN: <span className="font-semibold text-slate-700">07AAAAA1111A1Z1</span></p>
                  <p className="text-slate-500">Corporate Office: Cupertino CA, USA</p>
                  <p className="text-slate-400 mt-1">Transaction Ref: Direct UPI Settlement</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="py-6 border-b border-slate-200">
                <table className="w-full border-collapse text-left text-xs font-light text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-200 pb-2">
                      <th className="font-bold text-primary uppercase tracking-wider pb-3 w-1/2">Product Description</th>
                      <th className="font-bold text-primary uppercase tracking-wider pb-3 text-center">Qty</th>
                      <th className="font-bold text-primary uppercase tracking-wider pb-3 text-right">Unit Price</th>
                      <th className="font-bold text-primary uppercase tracking-wider pb-3 text-right">GST Rate</th>
                      <th className="font-bold text-primary uppercase tracking-wider pb-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeInvoice.orders.order_items?.map((item: any, idx: number) => {
                      const rate = item.gst_rate_at_purchase || 18;
                      const lineBase = item.price_at_purchase * item.quantity;
                      return (
                        <tr key={idx} className="border-b border-slate-100">
                          <td className="py-3.5 font-semibold text-primary">{item.products?.name || 'Curated Product'}</td>
                          <td className="py-3.5 text-center">{item.quantity}</td>
                          <td className="py-3.5 text-right">${item.price_at_purchase}</td>
                          <td className="py-3.5 text-right">{rate}%</td>
                          <td className="py-3.5 text-right font-semibold text-primary">${lineBase}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Summary columns */}
              <div className="flex justify-end pt-6 text-xs font-light text-slate-500">
                <div className="w-64 space-y-2.5">
                  <div className="flex justify-between">
                    <span>Taxable Subtotal</span>
                    <span className="font-semibold text-primary">${activeInvoice.orders.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IGST Tax (18%)</span>
                    <span className="font-semibold text-primary">${activeInvoice.orders.gst_amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expedited Freight</span>
                    <span className="font-semibold text-emerald-600 text-[10px] tracking-wider uppercase">Free</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3.5 flex justify-between text-sm font-extrabold text-primary">
                    <span>Grand Total Paid</span>
                    <span>${activeInvoice.orders.grand_total}</span>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center text-[10px] text-slate-400 font-light border-t border-slate-100 pt-4 leading-relaxed">
                This is a computer-generated GST Tax Invoice. No signature required. Thank you for scanning & shopping with LendoraStore.
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
