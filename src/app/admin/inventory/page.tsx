'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, ArrowUpRight, Search, Check, Save, ShieldAlert } from 'lucide-react';
import { db } from '@/lib/db';
import { Product, Category } from '@/lib/seedData';

export default function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'low' | 'out'>('all');
  
  // Stock edit states
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [newQty, setNewQty] = useState('');
  const [newThreshold, setNewThreshold] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const prods = await db.getProducts();
    const cats = await db.getCategories();
    setProducts(prods);
    setCategories(cats);
  };

  const handleStartEditing = (prod: Product) => {
    setEditingStockId(prod.id);
    setNewQty(prod.stock_quantity.toString());
    setNewThreshold(prod.low_stock_threshold.toString());
  };

  const handleSaveStock = async (prod: Product) => {
    if (newQty === '' || newThreshold === '') {
      alert("Fields cannot be empty.");
      return;
    }
    
    const updated = {
      ...prod,
      stock_quantity: Number(newQty),
      low_stock_threshold: Number(newThreshold)
    };

    await db.saveProduct(updated);
    setEditingStockId(null);
    loadData();
  };

  // Filter computations
  const outOfStockCount = products.filter(p => p.stock_quantity === 0).length;
  const lowStockCount = products.filter(p => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold).length;

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterType === 'low') {
      return p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold;
    }
    if (filterType === 'out') {
      return p.stock_quantity === 0;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Overview summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total catalog items */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Total SKU Catalog</span>
            <span className="text-xl font-extrabold text-primary block">{products.length} Items</span>
          </div>
        </div>

        {/* Low Stock count */}
        <div 
          onClick={() => setFilterType('low')}
          className={`border p-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
            filterType === 'low' 
              ? 'bg-orange-50 border-orange-200 shadow-sm' 
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Low Stock Warnings</span>
            <span className="text-xl font-extrabold text-orange-600 block">{lowStockCount} Products</span>
          </div>
          <AlertCircle className="w-5 h-5 text-orange-500" />
        </div>

        {/* Out of Stock count */}
        <div 
          onClick={() => setFilterType('out')}
          className={`border p-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
            filterType === 'out' 
              ? 'bg-red-50 border-red-200 shadow-sm' 
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Out Of Stock Alerts</span>
            <span className="text-xl font-extrabold text-red-500 block">{outOfStockCount} Products</span>
          </div>
          <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
        </div>

      </div>

      {/* Table grid filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                filterType === 'all' 
                  ? 'bg-primary border-primary text-white' 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilterType('low')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                filterType === 'low' 
                  ? 'bg-orange-500 border-orange-500 text-white' 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              Low Stock
            </button>
            <button
              onClick={() => setFilterType('out')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                filterType === 'out' 
                  ? 'bg-red-500 border-red-500 text-white' 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              Out of Stock
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search SKU or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Table list */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-light text-slate-500 border-collapse">
            <thead>
              <tr className="border-b border-slate-100 font-semibold text-primary uppercase tracking-wider">
                <th className="py-3 px-3">Product Name</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Stock Count</th>
                <th className="py-3 px-3">Warning Threshold</th>
                <th className="py-3 px-3 text-right">In-Line Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const categoryName = categories.find(c => c.id === p.category_id)?.name || 'Unassigned';
                const isEditing = editingStockId === p.id;
                const isLow = p.stock_quantity <= p.low_stock_threshold;
                
                return (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-3">
                      <p className="font-semibold text-primary">{p.name}</p>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700">{p.sku}</td>
                    <td className="py-3.5 px-3 capitalize">{categoryName}</td>
                    <td className="py-3.5 px-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={newQty}
                          onChange={(e) => setNewQty(e.target.value)}
                          className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 font-semibold">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            p.stock_quantity === 0 ? 'bg-red-500' : isLow ? 'bg-orange-500' : 'bg-emerald-500'
                          }`}></span>
                          <span className={p.stock_quantity === 0 ? 'text-red-500' : isLow ? 'text-orange-500' : 'text-slate-600'}>
                            {p.stock_quantity} units
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={newThreshold}
                          onChange={(e) => setNewThreshold(e.target.value)}
                          className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      ) : (
                        <span className="font-medium text-slate-500">{p.low_stock_threshold} units</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {isEditing ? (
                        <button
                          onClick={() => handleSaveStock(p)}
                          className="px-3.5 py-1.5 bg-primary hover:bg-primary-light text-white rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm"
                        >
                          <Save className="w-3.5 h-3.5 text-accent" />
                          <span>Save</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartEditing(p)}
                          className="px-3.5 py-1.5 border border-slate-200 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors"
                        >
                          Modify
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
