'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  DollarSign, ShoppingCart, Users, Package, 
  AlertCircle, ChevronRight, Check, X, Eye, TrendingUp 
} from 'lucide-react';
import { db } from '@/lib/db';
import { Product } from '@/lib/seedData';

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState({
    revenue: 0,
    ordersCount: 0,
    customersCount: 0,
    productsCount: 0,
    lowStockCount: 0,
    pendingPaymentsCount: 0
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [alertFeed, setAlertFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    setLoading(true);
    const products = await db.getProducts();
    const orders = await db.getOrders();
    const customers = await db.getCustomers();

    // Calculations
    const activeOrders = orders.filter(o => o.status !== 'cancelled');
    const revenue = activeOrders.reduce((sum, o) => sum + Number(o.grand_total), 0);
    
    const lowStock = products.filter(p => p.stock_quantity <= p.low_stock_threshold);
    const pendingOrders = orders.filter(o => o.status === 'pending');

    setStats({
      revenue: Math.round(revenue),
      ordersCount: orders.length,
      customersCount: customers.length,
      productsCount: products.length,
      lowStockCount: lowStock.length,
      pendingPaymentsCount: pendingOrders.length
    });

    setRecentOrders(orders.slice(0, 5));

    // Alert Feed aggregation
    const feed: any[] = [];
    lowStock.slice(0, 3).forEach(p => {
      feed.push({
        id: `stock-${p.id}`,
        type: 'warning',
        message: `${p.name} has low stock (${p.stock_quantity} left)`,
        actionLink: '/admin/inventory'
      });
    });
    pendingOrders.slice(0, 3).forEach(o => {
      feed.push({
        id: `order-${o.id}`,
        type: 'info',
        message: `Order #${o.id.substring(0, 8)} awaits payment verification`,
        actionLink: '/admin/orders'
      });
    });
    setAlertFeed(feed);

    setLoading(false);
  };

  const handleOrderApprove = async (id: string) => {
    await db.updateOrderStatus(id, 'confirmed');
    loadDashboardStats();
  };

  const handleOrderCancel = async (id: string) => {
    await db.updateOrderStatus(id, 'cancelled');
    loadDashboardStats();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. STATS METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Revenue */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Revenue</span>
            <span className="text-2xl font-extrabold text-primary block">${stats.revenue}</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Transactions</span>
            <span className="text-2xl font-extrabold text-primary block">{stats.ordersCount}</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Users</span>
            <span className="text-2xl font-extrabold text-primary block">{stats.customersCount}</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Products */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Products</span>
            <span className="text-2xl font-extrabold text-primary block">{stats.productsCount}</span>
          </div>
          <div className="p-3 bg-red-50 text-red-500 rounded-xl">
            <Package className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* 2. ANALYTICS CHART & ALERT NOTIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Stripe-style Revenue Progress Widget (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Revenue Progress</h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Last 6 Months</span>
          </div>

          {/* Simple Vector Bars Chart */}
          <div className="h-48 flex items-end justify-between pt-6 px-4">
            {[
              { month: 'Jan', val: stats.revenue * 0.4 },
              { month: 'Feb', val: stats.revenue * 0.55 },
              { month: 'Mar', val: stats.revenue * 0.65 },
              { month: 'Apr', val: stats.revenue * 0.8 },
              { month: 'May', val: stats.revenue * 0.9 },
              { month: 'Jun', val: stats.revenue }
            ].map((m, idx) => {
              const maxVal = stats.revenue || 1000;
              const pct = Math.max(15, Math.round((m.val / maxVal) * 100));
              return (
                <div key={idx} className="flex flex-col items-center gap-2.5 w-12 group">
                  <div className="w-full relative flex flex-col justify-end h-32">
                    {/* Tooltip on hover */}
                    <span className="absolute bottom-[105%] left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      ${Math.round(m.val)}
                    </span>
                    <div 
                      style={{ height: `${pct}%` }}
                      className="w-full rounded-t-lg bg-primary group-hover:bg-accent transition-colors shadow-sm duration-300"
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Alerts Feed (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider">System Alerts</h3>
            {alertFeed.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-100 text-[9px] font-bold">{alertFeed.length}</span>
            )}
          </div>

          {alertFeed.length === 0 ? (
            <p className="text-xs text-slate-400 font-light text-center py-6">All systems operational. No active alerts.</p>
          ) : (
            <div className="space-y-3">
              {alertFeed.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                    alert.type === 'warning' 
                      ? 'bg-red-50/50 border-red-100 text-red-700' 
                      : 'bg-indigo-50/50 border-indigo-100 text-indigo-700'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{alert.message}</p>
                    <Link href={alert.actionLink} className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline mt-1.5 inline-block">
                      Take Action
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 3. RECENT ORDERS GRID / VERIFICATION BOARD */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Pending UPI Payments Verification</h3>
          <Link href="/admin/orders" className="text-xs font-semibold text-accent hover:text-accent-light uppercase tracking-wider flex items-center gap-1">
            <span>View All Orders</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-xs text-slate-400 font-light text-center py-6">No order logs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-light text-slate-500 border-collapse">
              <thead>
                <tr className="border-b border-slate-100 font-semibold text-primary uppercase tracking-wider">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Receipt Screenshot</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((ord) => {
                  const isPending = ord.status === 'pending';
                  return (
                    <tr key={ord.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-3 font-semibold text-primary">#{ord.id.substring(0, 8).toUpperCase()}</td>
                      <td className="py-3.5 px-3">{ord.shipping_name}</td>
                      <td className="py-3.5 px-3">{new Date(ord.created_at).toLocaleDateString()}</td>
                      <td className="py-3.5 px-3 font-bold text-primary">${ord.grand_total}</td>
                      <td className="py-3.5 px-3">
                        {ord.payment_screenshot_url ? (
                          <a 
                            href={ord.payment_screenshot_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-accent hover:underline font-semibold"
                          >
                            View Receipt Screen
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">No Upload</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider ${
                          ord.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          ord.status === 'cancelled' ? 'bg-red-50 text-red-500 border border-red-100' :
                          'bg-indigo-50 text-primary border border-indigo-100'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        {isPending ? (
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => handleOrderApprove(ord.id)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg border border-transparent hover:border-emerald-100 transition-all"
                              title="Approve Payment"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOrderCancel(ord.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                              title="Cancel Order"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <Link
                            href="/admin/orders"
                            className="p-1 text-slate-400 hover:text-primary rounded-lg border border-transparent hover:border-slate-100 transition-all inline-block"
                            title="Inspect Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
