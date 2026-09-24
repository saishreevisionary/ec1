'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, Eye, X, CheckCircle, Clock, Truck, 
  Ban, Printer, Check, ExternalLink, ShieldCheck, AlertCircle, 
  Send, Package, FileText
} from 'lucide-react';
import { db } from '@/lib/db';
import { useToast } from '@/context/ToastContext';
import { TableSkeleton } from '@/components/SkeletonCard';

export default function AdminOrders() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Expanded details state
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Shipping modal state
  const [shippingModalOrder, setShippingModalOrder] = useState<any | null>(null);
  const [courierName, setCourierName] = useState('Delhivery');
  const [trackingNumber, setTrackingNumber] = useState('');

  // Screenshot preview modal
  const [previewScreenshotUrl, setPreviewScreenshotUrl] = useState<string | null>(null);

  const resolveScreenshot = (urlOrKey: string | null) => {
    if (!urlOrKey) return null;
    if (urlOrKey.startsWith('data:') || urlOrKey.startsWith('http')) return urlOrKey;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(urlOrKey);
      if (stored) return stored;
    }
    return urlOrKey;
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const list = await db.getOrders();
    setOrders(list);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (newStatus === 'shipped') {
      const order = orders.find(o => o.id === id);
      if (order) {
        setShippingModalOrder(order);
        setTrackingNumber(order.tracking_number || `VN-${Math.floor(100000 + Math.random() * 900000)}`);
        return;
      }
    }

    await db.updateOrderStatus(id, newStatus);
    await loadOrders();
    showToast(`Order status updated to: ${newStatus.toUpperCase()}`);
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }));
    }
  };

  const handleConfirmShipping = async () => {
    if (!shippingModalOrder) return;
    await db.updateOrderStatus(shippingModalOrder.id, 'shipped', {
      courier_name: courierName,
      tracking_number: trackingNumber
    });
    setShippingModalOrder(null);
    await loadOrders();
    showToast(`Order dispatched via ${courierName} (Tracking #${trackingNumber})`);
    if (selectedOrder && selectedOrder.id === shippingModalOrder.id) {
      setSelectedOrder((prev: any) => ({
        ...prev,
        status: 'shipped',
        courier_name: courierName,
        tracking_number: trackingNumber
      }));
    }
  };

  const handleApprovePayment = async (id: string) => {
    await db.updateOrderStatus(id, 'confirmed', { payment_verified: true });
    await loadOrders();
    showToast(`Payment approved! Order moved to Confirmed.`);
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev: any) => ({ ...prev, status: 'confirmed', payment_verified: true }));
    }
  };

  const handleRejectPayment = async (id: string) => {
    const reason = prompt('Please enter reason for rejecting payment:');
    if (!reason) return;
    await db.updateOrderStatus(id, 'cancelled', { cancellation_reason: reason });
    await loadOrders();
    showToast(`Payment rejected. Order cancelled.`);
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev: any) => ({ ...prev, status: 'cancelled', cancellation_reason: reason }));
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.shipping_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shipping_phone?.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-600 border border-amber-500/20"><Clock className="w-3 h-3" /> Pending</span>;
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-sky-500/10 text-sky-600 border border-sky-500/20"><ShieldCheck className="w-3 h-3" /> Verified</span>;
      case 'processing':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-indigo-500/10 text-indigo-600 border border-indigo-500/20"><Package className="w-3 h-3" /> Processing</span>;
      case 'shipped':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-purple-500/10 text-purple-600 border border-purple-500/20"><Truck className="w-3 h-3" /> Shipped</span>;
      case 'delivered':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"><CheckCircle className="w-3 h-3" /> Delivered</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-red-500/10 text-red-600 border border-red-500/20"><Ban className="w-3 h-3" /> Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-[#132A1C] tracking-wide">
            Order Pipeline & UPI Verification
          </h1>
          <p className="text-xs text-slate-500 font-light mt-0.5">
            Manage customer orders, verify payment screenshots, and dispatch shipments with live tracking numbers.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={loadOrders} 
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-xs"
          >
            Refresh Pipeline
          </button>
        </div>
      </div>

      {/* Filters & search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-3 flex-grow max-w-xl w-full">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by customer, phone, or Order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#2E5E3E] text-slate-800"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>

          <div className="flex gap-1.5 overflow-x-auto">
            {['all', 'pending', 'confirmed', 'shipped', 'delivered'].map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setStatusFilter(filterKey)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  statusFilter === filterKey
                    ? 'bg-[#132A1C] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {filterKey === 'all' ? 'All' : filterKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        {loading ? (
          <TableSkeleton rows={5} />
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600">No orders found</p>
            <p className="text-xs text-slate-400 font-light mt-1">Try clearing your search query or selecting a different status filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-light text-slate-500 border-collapse">
              <thead>
                <tr className="border-b border-slate-100 font-semibold text-[#132A1C] uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Customer Billing</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Payment Proof</th>
                  <th className="py-3 px-3">Current Status</th>
                  <th className="py-3 px-3">Status Action</th>
                  <th className="py-3 px-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredOrders.map((ord) => {
                  return (
                    <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-[#132A1C]">
                        #{ord.id.substring(0, 8).toUpperCase()}
                      </td>
                      <td className="py-3.5 px-3">
                        {new Date(ord.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3.5 px-3">
                        <div>
                          <p className="font-semibold text-slate-800">{ord.shipping_name}</p>
                          <span className="text-[10px] text-slate-400 block">{ord.shipping_phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-bold text-[#132A1C]">
                        ₹{Number(ord.grand_total).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-3">
                        {ord.payment_screenshot_url ? (
                          <button
                            onClick={() => setPreviewScreenshotUrl(resolveScreenshot(ord.payment_screenshot_url))}
                            className="inline-flex items-center gap-1.5 text-[#D4954B] hover:text-[#b37936] font-semibold underline decoration-dotted text-[11px]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect Proof</span>
                          </button>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">No Upload</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        {getStatusBadge(ord.status)}
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                          className="px-2 py-1 border border-slate-200 bg-white hover:border-[#2E5E3E] rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer text-slate-700 focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1.5 border border-slate-200 hover:border-[#2E5E3E] text-slate-700 hover:text-[#2E5E3E] hover:bg-emerald-50/40 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1 shadow-2xs"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
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

      {/* INSPECT DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 relative z-10 shadow-2xl border border-slate-200 animate-slide-up space-y-5">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center justify-between pr-8">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Details Board</span>
                {getStatusBadge(selectedOrder.status)}
              </div>
              <h3 className="text-base font-bold font-serif text-[#132A1C] mt-0.5">
                Order #{selectedOrder.id.toUpperCase()}
              </h3>
            </div>

            {/* Quick Action Bar for Payment Verification */}
            {selectedOrder.status === 'pending' && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-800">Awaiting Payment Approval</p>
                  <p className="text-[11px] text-amber-700 font-light mt-0.5">Verify UPI screenshot before marking confirmed.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprovePayment(selectedOrder.id)}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleRejectPayment(selectedOrder.id)}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tracking Info if shipped */}
            {selectedOrder.tracking_number && (
              <div className="p-3 bg-purple-50 border border-purple-200/60 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-purple-700 tracking-wider">Courier Dispatch:</span>
                  <p className="font-semibold text-purple-900 mt-0.5">{selectedOrder.courier_name} — Tracking #{selectedOrder.tracking_number}</p>
                </div>
                <Truck className="w-5 h-5 text-purple-600" />
              </div>
            )}

            <div className="border-t border-b border-slate-100 py-3 space-y-2.5">
              <span className="text-[10px] font-bold uppercase text-[#132A1C] tracking-wider block">Purchased Botanical Items</span>
              <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                {selectedOrder.order_items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-800">{item.products?.name || 'Botanical Extract'}</p>
                      <p className="text-[10px] text-slate-400">Qty: {item.quantity} × ₹{item.price_at_purchase} (GST {item.gst_rate_at_purchase || 18}%)</p>
                    </div>
                    <span className="font-semibold text-[#132A1C]">₹{item.price_at_purchase * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
              <div>
                <p className="font-bold text-[#132A1C] uppercase tracking-wider text-[9px] mb-1">Customer & Delivery Details</p>
                <p className="font-semibold text-slate-900">{selectedOrder.shipping_name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{selectedOrder.shipping_address}</p>
                <p className="text-[11px] text-slate-500">{selectedOrder.shipping_city} - {selectedOrder.shipping_pincode}</p>
                <p className="text-[11px] text-slate-500 mt-1">Phone: {selectedOrder.shipping_phone}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-bold text-[#132A1C] uppercase tracking-wider text-[9px] mb-1">Financial Summary</p>
                <div className="flex justify-between text-[11px]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-slate-800">₹{selectedOrder.gst_amount}</span>
                </div>
                <div className="border-t border-slate-100 pt-1 flex justify-between font-bold text-sm text-[#132A1C]">
                  <span>Grand Total</span>
                  <span>₹{selectedOrder.grand_total}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
              {selectedOrder.payment_screenshot_url ? (
                <button
                  onClick={() => setPreviewScreenshotUrl(resolveScreenshot(selectedOrder.payment_screenshot_url))}
                  className="text-xs text-[#D4954B] hover:underline font-semibold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View UPI Payment Proof</span>
                </button>
              ) : <div />}
              
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#132A1C] hover:bg-[#1f3f2b] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISPATCH / SHIPPING MODAL */}
      {shippingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShippingModalOrder(null)}></div>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl border border-slate-200 animate-slide-up space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#2E5E3E]" />
                <h3 className="text-sm font-bold font-serif text-[#132A1C]">Ship Order #{shippingModalOrder.id.substring(0, 8).toUpperCase()}</h3>
              </div>
              <button onClick={() => setShippingModalOrder(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-light">
              Enter the shipment tracking code provided by your courier partner so the customer can track their delivery.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Courier Partner</label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:border-[#2E5E3E]"
                >
                  <option value="Delhivery">Delhivery</option>
                  <option value="Blue Dart">Blue Dart</option>
                  <option value="DTDC">DTDC</option>
                  <option value="India Post (Speed Post)">India Post (Speed Post)</option>
                  <option value="Shiprocket">Shiprocket</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Tracking / AWB Number</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. VN-728190"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono bg-slate-50 focus:outline-none focus:border-[#2E5E3E]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setShippingModalOrder(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmShipping}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Confirm Shipment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCREENSHOT PREVIEW MODAL */}
      {previewScreenshotUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setPreviewScreenshotUrl(null)}></div>
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 relative z-10 shadow-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#132A1C] uppercase tracking-wider">UPI Payment Receipt Proof</span>
              <button onClick={() => setPreviewScreenshotUrl(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-2 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewScreenshotUrl} alt="UPI Payment Receipt" className="max-h-80 w-auto object-contain rounded-lg shadow-xs" />
            </div>
            <div className="text-right">
              <button
                onClick={() => setPreviewScreenshotUrl(null)}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
