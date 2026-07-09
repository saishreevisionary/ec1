'use client';

import React, { useState, useEffect } from 'react';
import { Search, Users, Mail, Phone, Calendar, DollarSign, ShoppingCart } from 'lucide-react';
import { db } from '@/lib/db';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    setLoading(true);
    const custs = await db.getCustomers();
    const ords = await db.getOrders();
    setCustomers(custs);
    setOrders(ords);
    setLoading(false);
  };

  // Helper to calculate statistics per customer
  const getCustomerStats = (userId: string) => {
    const customerOrders = orders.filter(o => o.user_id === userId && o.status !== 'cancelled');
    const totalSpent = customerOrders.reduce((sum, o) => sum + Number(o.grand_total), 0);
    return {
      orderCount: customerOrders.length,
      totalSpent: Math.round(totalSpent)
    };
  };

  const filteredCustomers = customers.filter(c => {
    const nameMatch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || emailMatch;
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
      
      {/* Filters & Action Bar */}
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-xs text-slate-400 font-light">No customers found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-light text-slate-500 border-collapse">
              <thead>
                <tr className="border-b border-slate-100 font-semibold text-primary uppercase tracking-wider">
                  <th className="py-3 px-3">Customer Profile</th>
                  <th className="py-3 px-3">Date Registered</th>
                  <th className="py-3 px-3 text-center">Orders Placed</th>
                  <th className="py-3 px-3 text-right">LTV Volume</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((cust) => {
                  const stats = getCustomerStats(cust.id);
                  return (
                    <tr key={cust.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      
                      {/* Name & avatar details */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/5 text-primary flex items-center justify-center font-bold rounded-full border border-primary/5 shadow-sm text-xs">
                            {cust.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-primary">{cust.name}</p>
                            <span className="text-[10px] text-slate-400 font-light block mt-0.5">{cust.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Created date */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(cust.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>

                      {/* Orders count */}
                      <td className="py-3.5 px-3 text-center">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-semibold text-primary">
                          <ShoppingCart className="w-3 h-3 text-slate-400" />
                          <span>{stats.orderCount} orders</span>
                        </div>
                      </td>

                      {/* LTV */}
                      <td className="py-3.5 px-3 text-right font-extrabold text-primary">
                        ${stats.totalSpent}
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
