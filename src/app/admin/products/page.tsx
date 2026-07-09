'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, FolderKanban, Check, Info } from 'lucide-react';
import { db } from '@/lib/db';
import { Product, Category } from '@/lib/seedData';

export default function AdminProductManagement() {
  // DB States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  
  // Dialog/Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [stockQty, setStockQty] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [galleryUrls, setGalleryUrls] = useState(''); // Textarea split by comma
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const prods = await db.getProducts();
    const cats = await db.getCategories();
    setProducts(prods);
    setCategories(cats);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setSku(`PRO-${Math.floor(100 + Math.random() * 900)}`);
    setStockQty('50');
    setCategoryId(categories[0]?.id.toString() || '1');
    setImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600');
    setGalleryUrls('');
    setDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setPrice(prod.price.toString());
    setSku(prod.sku);
    setStockQty(prod.stock_quantity.toString());
    setCategoryId(prod.category_id.toString());
    setImageUrl(prod.image_url);
    setGalleryUrls(prod.images ? prod.images.join(', ') : '');
    setDescription(prod.description);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !sku || !stockQty || !categoryId || !imageUrl) {
      alert("Please fill in all required fields.");
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const images = galleryUrls.split(',').map(url => url.trim()).filter(url => url !== '');
    if (!images.includes(imageUrl)) {
      images.unshift(imageUrl);
    }

    const payload: Partial<Product> = {
      name,
      slug,
      description,
      price: Number(price),
      sku,
      stock_quantity: Number(stockQty),
      category_id: Number(categoryId),
      image_url: imageUrl,
      images,
      gst_rate: 18,
      status: 'active'
    };

    if (editingProduct) {
      payload.id = editingProduct.id;
    }

    await db.saveProduct(payload);
    setIsModalOpen(false);
    loadData();
    alert(editingProduct ? "Product updated." : "Product added.");
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this premium product from the catalog?")) {
      await db.deleteProduct(id);
      loadData();
    }
  };

  // Filter products dynamically
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCatFilter === 'all' || p.category_id.toString() === selectedCatFilter;
    
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        
        {/* Left Col: Search filters */}
        <div className="flex flex-wrap items-center gap-3 flex-grow max-w-xl w-full">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>

          <div className="border border-slate-200 rounded-xl px-3 py-2 bg-slate-50">
            <select
              value={selectedCatFilter}
              onChange={(e) => setSelectedCatFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-500 border-none focus:outline-none cursor-pointer uppercase tracking-wider"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add CTA */}
        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md hover:shadow-accent/10 active:scale-95 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Product</span>
        </button>

      </div>

      {/* Product Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <FolderKanban className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-xs text-slate-400 font-light">No items found matching the search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-light text-slate-500 border-collapse">
              <thead>
                <tr className="border-b border-slate-100 font-semibold text-primary uppercase tracking-wider">
                  <th className="py-3 px-3">Product Details</th>
                  <th className="py-3 px-3">SKU</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">GST Tax</th>
                  <th className="py-3 px-3">Stock Units</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const categoryName = categories.find(c => c.id === p.category_id)?.name || 'Unassigned';
                  const isLow = p.stock_quantity <= p.low_stock_threshold;
                  return (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3 max-w-sm">
                          <img src={p.image_url} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-slate-100 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-semibold text-primary truncate">{p.name}</p>
                            <span className="text-[9px] font-medium text-slate-400 truncate block">Slug: {p.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-700">{p.sku}</td>
                      <td className="py-3.5 px-3 capitalize">{categoryName}</td>
                      <td className="py-3.5 px-3 font-bold text-primary">${p.price}</td>
                      <td className="py-3.5 px-3">18% (${Math.round(p.price * 0.18)})</td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 font-semibold">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            p.stock_quantity === 0 ? 'bg-red-500' : isLow ? 'bg-orange-500' : 'bg-emerald-500'
                          }`}></span>
                          <span className={p.stock_quantity === 0 ? 'text-red-500' : isLow ? 'text-orange-500' : 'text-slate-600'}>
                            {p.stock_quantity} units
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 hover:bg-slate-50 border border-transparent hover:border-slate-100 text-slate-500 hover:text-primary rounded-lg transition-colors"
                            title="Edit details"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 hover:bg-red-50 border border-transparent hover:border-red-100 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Container */}
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative z-10 shadow-2xl border border-slate-150 animate-slide-up">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-primary mb-4 border-b border-slate-100 pb-2.5">
              {editingProduct ? 'Edit Premium Hardware' : 'Scaffold New Product'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-primary mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Lendora SoundStage Extreme"
                  />
                </div>
                
                <div>
                  <label className="block text-[9px] font-bold uppercase text-primary mb-1">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="ACO-102"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-primary mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="499"
                  />
                </div>
                
                <div>
                  <label className="block text-[9px] font-bold uppercase text-primary mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stockQty}
                    onChange={(e) => setStockQty(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="25"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase text-primary mb-1">Department Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none bg-white font-medium text-slate-600"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-primary mb-1">Primary Display Image URL</label>
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase text-primary mb-1">Gallery Slider Image URLs (Optional, comma-separated)</label>
                <textarea
                  value={galleryUrls}
                  onChange={(e) => setGalleryUrls(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary h-16"
                  placeholder="https://image1.jpg, https://image2.jpg"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase text-primary mb-1">Product Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary h-24"
                  placeholder="Describe the product specifications, material quality, and design overview..."
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Save Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
