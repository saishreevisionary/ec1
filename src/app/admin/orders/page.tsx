'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Eye, X, CheckCircle, Clock, Truck, Ban, Printer } from 'lucide-react';
import { db } from '@/lib/db';
import { useToast } from '@/context/ToastContext';

export default function AdminOrders() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Expanded details state
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const list = await db.getOrders();
    setOrders(list);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await db.updateOrderStatus(id, newStatus);
    loadOrders();
    showToast(`Order status updated to: ${newStatus}`);
  };

  // Filter orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.shipping_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Filters & search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 flex-grow max-w-xl w-full">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by customer name or Order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>

          <div className="border border-slate-200 rounded-xl px-3 py-2 bg-slate-50">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-500 border-none focus:outline-none cursor-pointer uppercase tracking-wider"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        {filteredProductsIsEmpty() ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-xs text-slate-400 font-light">No orders logged under these filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-light text-slate-500 border-collapse">
              <thead>
                <tr className="border-b border-slate-100 font-semibold text-primary uppercase tracking-wider">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Customer Billing</th>
                  <th className="py-3 px-3">Amount Due</th>
                  <th className="py-3 px-3">Payment Screen</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((ord) => {
                  return (
                    <tr key={ord.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-3 font-semibold text-primary">#{ord.id.substring(0, 8).toUpperCase()}</td>
                      <td className="py-3.5 px-3">{new Date(ord.created_at).toLocaleDateString()}</td>
                      <td className="py-3.5 px-3">
                        <div>
                          <p className="font-semibold text-primary">{ord.shipping_name}</p>
                          <span className="text-[9px] text-slate-400 block">{ord.shipping_phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-bold text-primary">₹{ord.grand_total}</td>
                      <td className="py-3.5 px-3">
                        {ord.payment_screenshot_url ? (
                          <a 
                            href={ord.payment_screenshot_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-accent hover:underline font-semibold"
                          >
                            View Image Receipt
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">No Upload</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                          className="px-2.5 py-1 border border-slate-200 bg-white rounded-lg text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
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
                          className="px-3.5 py-1.5 border border-slate-200 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
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
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 relative z-10 shadow-2xl border border-slate-150 animate-slide-up space-y-5">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order Details Board</p>
              <h3 className="text-base font-bold text-primary mt-0.5">Order #{selectedOrder.id.toUpperCase()}</h3>
            </div>

            <div className="border-t border-b border-slate-100 py-4 space-y-3.5">
              <span className="text-[10px] font-bold uppercase text-primary tracking-wider block">Cart Line Items</span>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1 hide-scrollbar">
                {selectedOrder.order_items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center justify-between text-xs font-light">
                    <div>
                      <p className="font-semibold text-primary">{item.products?.name || 'Curated Product'}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">Quantity: {item.quantity} × ₹{item.price_at_purchase} (18% GST)</p>
                    </div>
                    <span className="font-semibold text-primary">₹{item.price_at_purchase * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-light text-slate-500">
              <div>
                <p className="font-bold text-primary uppercase tracking-wider text-[9px] mb-1">Shipping Details</p>
                <p className="font-semibold text-primary">{selectedOrder.shipping_name}</p>
                <p className="mt-0.5">{selectedOrder.shipping_address}</p>
                <p>{selectedOrder.shipping_city} - {selectedOrder.shipping_pincode}</p>
                <p className="mt-1">Phone: {selectedOrder.shipping_phone}</p>
              </div>
              <div className="text-right space-y-1.5">
                <p className="font-bold text-primary uppercase tracking-wider text-[9px] mb-1">Financial totals</p>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-primary">₹{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Amount</span>
                  <span className="font-semibold text-primary">₹{selectedOrder.gst_amount}</span>
                </div>
                <div className="border-t border-slate-100 pt-1.5 flex justify-between font-extrabold text-primary">
                  <span>Grand Total</span>
                  <span>₹{selectedOrder.grand_total}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  function filteredProductsIsEmpty() {
    return filteredOrders.length === 0;
  }
}
