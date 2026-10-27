'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Edit2, Trash2, Search, X, FolderKanban, Check, Info, Upload } from 'lucide-react';
import { db } from '@/lib/db';
import { Product, Category } from '@/lib/seedData';
import { useToast } from '@/context/ToastContext';

export default function AdminProductManagement() {
  const { showToast } = useToast();
  // DB States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  
  // Dialog/Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Form Fields - Standard Core
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [stockQty, setStockQty] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [galleryList, setGalleryList] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  // Form Fields - Botanical Specifications & Metadata
  const [productRange, setProductRange] = useState<string>('');
  const [botanicalName, setBotanicalName] = useState<string>('');
  const [casNumber, setCasNumber] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [olfactoryFamily, setOlfactoryFamily] = useState<string>('');
  const [applications, setApplications] = useState<string[]>([]);
  const [isOrganic, setIsOrganic] = useState<boolean>(false);
  const [packagingOptions, setPackagingOptions] = useState<string>('');
  const [status, setStatus] = useState<'active' | 'draft'>('active');

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryList(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setGalleryList(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };
    window.addEventListener('venuss-categories-updated', handleUpdate);
    return () => {
      window.removeEventListener('venuss-categories-updated', handleUpdate);
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const prods = await db.getProducts();
      const cats = await db.getCategories();
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error('Failed to load admin products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setSku(`PRO-${Math.floor(100 + Math.random() * 900)}`);
    setStockQty('50');
    setCategoryId(categories[0]?.id.toString() || '1');
    setImageUrl('');
    setGalleryList([]);
    setDescription('');

    // Reset botanical metadata without forcing arbitrary defaults
    setProductRange('');
    setBotanicalName('');
    setCasNumber('');
    setCountry('');
    setOlfactoryFamily('');
    setApplications([]);
    setIsOrganic(false);
    setPackagingOptions('');
    setStatus('active');

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
    setGalleryList(prod.images || []);
    setDescription(prod.description);

    // Populate botanical metadata from existing product
    setProductRange(prod.product_range || '');
    setBotanicalName(prod.botanical_name || prod.specs?.['Botanical Name'] || '');
    setCasNumber(prod.cas_number || prod.specs?.['CAS Number'] || '');
    setCountry(prod.country || prod.specs?.['Origin'] || '');
    setOlfactoryFamily(prod.olfactory_family || '');
    setApplications(prod.applications || []);
    setIsOrganic(Boolean(prod.is_organic));
    setPackagingOptions(prod.packaging_options ? prod.packaging_options.join(', ') : '');
    setStatus(prod.status || ((prod as any).is_active === false || (prod as any).is_published === false ? 'draft' : 'active'));

    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !sku || !stockQty || !categoryId || !imageUrl) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const images = [...galleryList];
    if (imageUrl && !images.includes(imageUrl)) {
      images.unshift(imageUrl);
    }

    const parsedPackaging = packagingOptions
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

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
      status,
      is_active: status === 'active',
      is_published: status === 'active',
      // Preserve and update botanical specifications without arbitrary defaults
      ...(productRange ? { product_range: productRange as any } : (editingProduct?.product_range ? { product_range: editingProduct.product_range } : {})),
      ...(botanicalName.trim() ? { botanical_name: botanicalName.trim() } : (editingProduct?.botanical_name ? { botanical_name: editingProduct.botanical_name } : {})),
      ...(casNumber.trim() ? { cas_number: casNumber.trim() } : (editingProduct?.cas_number ? { cas_number: editingProduct.cas_number } : {})),
      ...(country.trim() ? { country: country.trim() } : (editingProduct?.country ? { country: editingProduct.country } : {})),
      ...(olfactoryFamily ? { olfactory_family: olfactoryFamily as any } : (editingProduct?.olfactory_family ? { olfactory_family: editingProduct.olfactory_family } : {})),
      ...(applications.length > 0 ? { applications } : (editingProduct?.applications ? { applications: editingProduct.applications } : {})),
      is_organic: isOrganic,
      ...(parsedPackaging.length > 0 ? { packaging_options: parsedPackaging } : (editingProduct?.packaging_options ? { packaging_options: editingProduct.packaging_options } : {})),
      specs: {
        ...(editingProduct?.specs || {}),
        ...(botanicalName.trim() ? { 'Botanical Name': botanicalName.trim() } : {}),
        ...(casNumber.trim() ? { 'CAS Number': casNumber.trim() } : {}),
        ...(country.trim() ? { 'Origin': country.trim() } : {}),
      }
    };

    if (editingProduct) {
      payload.id = editingProduct.id;
    }

    await db.saveProduct(payload);
    setIsModalOpen(false);
    loadData();
    showToast(editingProduct ? "Product updated successfully!" : "Product added successfully!");
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
          id="admin-new-product-btn"
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md hover:shadow-accent/10 active:scale-95 flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Product</span>
        </button>

      </div>

      {/* Product Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-medium">Loading catalog products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
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
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-primary truncate">{p.name}</p>
                              {p.status === 'draft' || (p as any).is_published === false || (p as any).is_active === false ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                                  Draft
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Active
                                </span>
                              )}
                            </div>
                            <span className="text-[9px] font-medium text-slate-400 truncate block">Slug: {p.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-700">{p.sku}</td>
                      <td className="py-3.5 px-3 capitalize">{categoryName}</td>
                      <td className="py-3.5 px-3 font-bold text-primary">₹{p.price}</td>
                      <td className="py-3.5 px-3">18% (₹{Math.round(p.price * 0.18)})</td>
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
                            data-action="edit-product"
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 hover:bg-slate-50 border border-transparent hover:border-slate-100 text-slate-500 hover:text-primary rounded-lg transition-colors cursor-pointer"
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
      {isMounted && isModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />
          
          {/* Modal Container */}
          <div id="admin-product-modal" className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col relative z-10 shadow-2xl border border-slate-200 overflow-hidden animate-slide-up">
            
            {/* 1. STICKY MODAL HEADER */}
            <div className="px-6 sm:px-8 py-5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div>
                <h3 
                  className="text-2xl font-bold text-[#173B2B] font-heading tracking-tight"
                  style={{ fontSize: '24px', fontWeight: 700 }}
                >
                  {editingProduct ? 'Edit Product Specifications' : 'Create New Botanical Product'}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-slate-500 font-medium mt-0.5">
                  {editingProduct ? 'Update catalogue specifications, pricing, and botanical metadata' : 'Add a verified commercial botanical extract to the master catalogue'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-transparent hover:border-slate-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. FORM WITH SCROLLABLE BODY & STICKY FOOTER */}
            <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              
              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
                
                {/* SECTION 1: CORE PRODUCT DETAILS */}
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        Product Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] placeholder:text-slate-400 font-medium transition-colors"
                        placeholder="e.g. Rosemary Essential Oil"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        SKU Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] font-mono text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] placeholder:text-slate-400 font-medium transition-colors"
                        placeholder="e.g. VEN-102"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        Base Price (₹) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] placeholder:text-slate-400 font-medium transition-colors"
                        placeholder="499"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        Stock Quantity <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={stockQty}
                        onChange={(e) => setStockQty(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] placeholder:text-slate-400 font-medium transition-colors"
                        placeholder="50"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        Department Category <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="admin-product-category-select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] bg-white font-medium transition-colors"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name} {c.is_active === false ? '(Inactive)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        Catalogue Status <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="admin-product-status-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'active' | 'draft')}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] bg-white font-medium transition-colors"
                      >
                        <option value="active">Active (Visible)</option>
                        <option value="draft">Draft (Unpublished)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: PRODUCT IMAGERY */}
                <div className="space-y-5 pt-2 border-t border-slate-150">
                  <div>
                    <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                      Primary Display Image <span className="text-rose-500">*</span>
                    </label>
                    <div className="space-y-3">
                      {/* Upload Dropzone */}
                      <div className="border-2 border-dashed border-slate-300 hover:border-[#173B2B]/40 rounded-2xl p-4 sm:p-5 bg-slate-50/70 hover:bg-slate-50 flex flex-col items-center justify-center text-center cursor-pointer relative transition-all group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#173B2B] transition-colors mb-1.5" />
                        <span className="text-[13px] sm:text-[14px] font-bold text-[#173B2B]">
                          Click to select primary product image
                        </span>
                        <span className="text-[12px] text-slate-500 mt-0.5">
                          Supports PNG, JPG, or WebP (transparent packshots recommended)
                        </span>
                      </div>

                      {/* Manual URL Input */}
                      <input
                        type="text"
                        required
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] placeholder:text-slate-400 font-medium transition-colors"
                        placeholder="Or paste direct image URL (e.g. /images/products/cardamom-oil.jpg)..."
                      />

                      {/* Preview Thumbnail */}
                      {imageUrl && (
                        <div className="flex items-center gap-3.5 p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                          <img 
                            src={imageUrl} 
                            alt="Product preview" 
                            className="w-14 h-14 object-contain rounded-lg border border-slate-200 bg-slate-50 flex-shrink-0 p-1" 
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                              Primary Image Loaded
                            </p>
                            <p className="text-[12px] sm:text-[13px] text-slate-600 font-mono truncate mt-0.5">
                              {imageUrl.startsWith('data:') ? 'Base64 Encoded Image Data' : imageUrl}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gallery Images */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide">
                        Product Gallery Images (Optional)
                      </label>
                      <span className="text-[12px] text-slate-500 font-medium">Multiple photos for product page</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-slate-300 hover:border-[#173B2B]/40 rounded-2xl p-4 bg-slate-50/70 hover:bg-slate-50 flex flex-col items-center justify-center text-center cursor-pointer relative transition-all group">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleGalleryUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#173B2B] transition-colors mb-1" />
                        <span className="text-[13px] sm:text-[14px] font-bold text-[#173B2B]">
                          Upload Multiple Gallery Photos
                        </span>
                        <span className="text-[12px] text-slate-500 mt-0.5">
                          Select multiple files to display in product carousel
                        </span>
                      </div>

                      {galleryList.length > 0 && (
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 p-3.5 bg-white border border-slate-200 rounded-xl">
                          {galleryList.map((img, idx) => (
                            <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 shadow-2xs bg-slate-50">
                              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(idx)}
                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity shadow-sm active:scale-95 cursor-pointer"
                                aria-label="Remove image"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 3: BOTANICAL & CATALOG SPECIFICATIONS */}
                <div className="bg-[#FAF9F5] p-5 sm:p-6 rounded-2xl border border-[#173B2B]/15 space-y-5 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#173B2B]/10 gap-1">
                    <div className="flex items-center gap-2">
                      <FolderKanban className="w-5 h-5 text-[#D4954B] shrink-0" />
                      <h4 
                        className="text-base font-bold text-[#173B2B] font-heading tracking-tight"
                        style={{ fontSize: '16px', fontWeight: 700 }}
                      >
                        Botanical &amp; Catalog Specifications
                      </h4>
                    </div>
                    <span className="text-[12px] sm:text-[13px] text-slate-500 font-medium">
                      Powers catalogue filters, TDS sheets, and certificates
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        Product Range
                      </label>
                      <select
                        value={productRange}
                        onChange={(e) => setProductRange(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] bg-white font-medium"
                      >
                        <option value="">Unassigned (Optional)</option>
                        <option value="Essential Oils">Essential Oils</option>
                        <option value="Absolutes">Absolutes</option>
                        <option value="Floral Concretes">Floral Concretes</option>
                        <option value="Specialities">Specialities</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        Olfactory Family
                      </label>
                      <select
                        value={olfactoryFamily}
                        onChange={(e) => setOlfactoryFamily(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] bg-white font-medium"
                      >
                        <option value="">Unassigned (Optional)</option>
                        <option value="Floral">Floral</option>
                        <option value="Citrus">Citrus</option>
                        <option value="Woody">Woody</option>
                        <option value="Spicy">Spicy</option>
                        <option value="Fresh / Green">Fresh / Green</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        Botanical Latin Name
                      </label>
                      <input
                        type="text"
                        value={botanicalName}
                        onChange={(e) => setBotanicalName(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] bg-white placeholder:text-slate-400 font-medium"
                        placeholder="e.g. Jasminum sambac, Piper nigrum"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        CAS Registry Number
                      </label>
                      <input
                        type="text"
                        value={casNumber}
                        onChange={(e) => setCasNumber(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] bg-white placeholder:text-slate-400 font-medium"
                        placeholder="e.g. 8022-96-6"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        Country of Origin
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] bg-white placeholder:text-slate-400 font-medium"
                        placeholder="e.g. India, France, Madagascar"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                        Export Packaging Options
                      </label>
                      <input
                        type="text"
                        value={packagingOptions}
                        onChange={(e) => setPackagingOptions(e.target.value)}
                        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] bg-white placeholder:text-slate-400 font-medium"
                        placeholder="e.g. 1 kg Bottle, 5 kg Canister, 25 kg Drum"
                      />
                    </div>
                  </div>

                  {/* Checkboxes Row */}
                  <div className="pt-3 border-t border-[#173B2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <span className="text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide">
                        Applications:
                      </span>
                      <label className="flex items-center gap-2.5 cursor-pointer py-1 select-none">
                        <input
                          type="checkbox"
                          checked={applications.includes('Fragrance')}
                          onChange={(e) => {
                            setApplications(prev => 
                              e.target.checked ? [...prev, 'Fragrance'] : prev.filter(a => a !== 'Fragrance')
                            );
                          }}
                          className="w-5 h-5 rounded border-slate-300 text-[#173B2B] focus:ring-[#173B2B] cursor-pointer"
                        />
                        <span className="text-[14px] sm:text-[15px] text-slate-700 font-semibold">Fragrance</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer py-1 select-none">
                        <input
                          type="checkbox"
                          checked={applications.includes('Aromatherapy')}
                          onChange={(e) => {
                            setApplications(prev => 
                              e.target.checked ? [...prev, 'Aromatherapy'] : prev.filter(a => a !== 'Aromatherapy')
                            );
                          }}
                          className="w-5 h-5 rounded border-slate-300 text-[#173B2B] focus:ring-[#173B2B] cursor-pointer"
                        />
                        <span className="text-[14px] sm:text-[15px] text-slate-700 font-semibold">Aromatherapy</span>
                      </label>
                    </div>

                    <label className="flex items-center gap-2.5 cursor-pointer py-1 select-none sm:ml-auto">
                      <input
                        type="checkbox"
                        checked={isOrganic}
                        onChange={(e) => setIsOrganic(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-[#173B2B] focus:ring-[#173B2B] cursor-pointer"
                      />
                      <span className="text-[14px] sm:text-[15px] font-bold text-[#173B2B]">
                        Certified Organic (100% Pure)
                      </span>
                    </label>
                  </div>
                </div>

                {/* SECTION 4: PRODUCT DESCRIPTION */}
                <div className="space-y-2">
                  <label className="block text-[13px] sm:text-[14px] font-bold text-[#173B2B] tracking-wide mb-1.5">
                    Product Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-3 border border-slate-300 rounded-xl text-[15px] sm:text-[16px] text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] placeholder:text-slate-400 font-normal leading-relaxed h-28 resize-y transition-colors"
                    placeholder="Describe the botanical extract's aromatic profile, purity benchmarks, and technical overview..."
                  />
                </div>

              </div>

              {/* 3. STICKY MODAL FOOTER */}
              <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-11 px-5 border border-slate-300 hover:bg-white text-slate-700 rounded-xl text-[14px] sm:text-[15px] font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 px-6 bg-[#173B2B] hover:bg-[#204E39] text-white rounded-xl text-[14px] sm:text-[15px] font-bold tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4.5 h-4.5" />
                  <span>{editingProduct ? 'Update Product' : 'Save Botanical Product'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
