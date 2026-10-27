'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Folder, 
  X, 
  Upload, 
  Check, 
  AlertCircle, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Search,
  ExternalLink,
  Layers,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Category, Product } from '@/lib/seedData';
import { useToast } from '@/context/ToastContext';

export default function AdminCategoryManagement() {
  const { showToast } = useToast();
  
  // Data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCounts, setProductCounts] = useState<Record<number, number>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>('');

  // Form Fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isManualSlug, setIsManualSlug] = useState(false);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState<boolean>(true);

  // Safe Deletion Dialog State
  const [deleteDialogCategory, setDeleteDialogCategory] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load Categories & Real Product Counts
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [cats, prods, counts] = await Promise.all([
        db.getCategories(),
        db.getProducts(),
        db.getCategoryCounts()
      ]);
      setCategories(cats);
      setProducts(prods);
      setProductCounts(counts);
    } catch (err) {
      console.error('Failed to load categories data:', err);
      showToast('Failed to load categories from database.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Listen for category updates from anywhere in the app
    const handleUpdate = () => {
      loadData();
    };
    window.addEventListener('venuss-categories-updated', handleUpdate);
    return () => {
      window.removeEventListener('venuss-categories-updated', handleUpdate);
    };
  }, []);

  // Filtered categories
  const displayedCategories = useMemo(() => {
    if (!searchFilter.trim()) return categories;
    const q = searchFilter.toLowerCase().trim();
    return categories.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.slug.toLowerCase().includes(q) || 
      (c.description || '').toLowerCase().includes(q)
    );
  }, [categories, searchFilter]);

  // Handle Name Input -> Auto Slug Generation
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isManualSlug) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(autoSlug);
    }
  };

  // Handle Slug Input
  const handleSlugChange = (val: string) => {
    setIsManualSlug(true);
    const cleaned = val.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSlug(cleaned);
  };

  // Image Upload handler
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

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setIsManualSlug(false);
    setDescription('');
    setImageUrl('');
    setIsActive(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setIsManualSlug(true);
    setDescription(cat.description || '');
    setImageUrl(cat.image_url || '');
    setIsActive(cat.is_active !== false);
    setFormError('');
    setIsModalOpen(true);
  };

  // Quick toggle active / inactive directly from category card
  const handleToggleActive = async (cat: Category) => {
    const updatedStatus = cat.is_active === false ? true : false;
    try {
      await db.saveCategory({
        ...cat,
        is_active: updatedStatus
      });
      showToast(
        updatedStatus 
          ? `Category "${cat.name}" is now active in customer store.` 
          : `Category "${cat.name}" is now deactivated (hidden from store).`
      );
      await loadData();
    } catch (err: any) {
      showToast(err.message || 'Failed to update category status.', 'error');
    }
  };

  // Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setFormError('Please enter a valid category name.');
      return;
    }

    const finalSlug = (slug || trimmedName)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!finalSlug) {
      setFormError('Please provide a valid URL slug.');
      return;
    }

    if (!imageUrl) {
      setFormError('Please upload an image or provide an image URL.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Partial<Category> = {
        name: trimmedName,
        slug: finalSlug,
        description: description.trim(),
        image_url: imageUrl,
        is_active: isActive
      };

      if (editingCategory) {
        payload.id = editingCategory.id;
      }

      await db.saveCategory(payload);
      setIsModalOpen(false);
      showToast(
        editingCategory 
          ? `Category "${trimmedName}" updated successfully!` 
          : `Category "${trimmedName}" created and published!`
      );
      await loadData();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save category. Please check your inputs.');
      showToast(err.message || 'Database error: could not save category.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Safe Deletion Handler
  const handleDeleteClick = (cat: Category) => {
    setDeleteDialogCategory(cat);
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialogCategory) return;
    setIsDeleting(true);
    try {
      await db.deleteCategory(deleteDialogCategory.id);
      showToast(`Category "${deleteDialogCategory.name}" was permanently removed.`);
      setDeleteDialogCategory(null);
      await loadData();
    } catch (err: any) {
      showToast(err.message || 'Cannot delete category.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* =========================================================
          TOP ACTION HEADER
         ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
              Department Management
            </span>
            <span className="text-xs text-slate-400 font-medium">&bull; Single Source of Truth</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#173B2B] font-heading mt-1">
            Catalogue Categories ({categories.length})
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Synchronized in real-time across the customer homepage, product catalogue, and admin product editors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            title="Refresh categories"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-700' : ''}`} />
          </button>

          <button
            id="admin-add-category-btn"
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 bg-[#173B2B] hover:bg-[#204a37] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Category</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          SEARCH & FILTER STRIP
         ========================================================= */}
      <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search categories by name, slug, or keywords..."
            className="w-full pl-9 pr-4 py-1.5 text-xs text-slate-800 rounded-lg border border-transparent focus:border-emerald-600 focus:outline-none placeholder:text-slate-400"
          />
        </div>
        {searchFilter && (
          <button
            onClick={() => setSearchFilter('')}
            className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
          >
            Clear
          </button>
        )}
      </div>

      {/* =========================================================
          CATEGORIES GRID
         ========================================================= */}
      {displayedCategories.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <Folder className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">No categories found</h3>
          <p className="text-xs text-slate-400 mt-1">Try a different search keyword or create a new category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((cat) => {
            const count = productCounts[cat.id] || 0;
            const isCatActive = cat.is_active !== false;

            return (
              <div 
                key={cat.id} 
                data-category-id={cat.id}
                data-category-slug={cat.slug}
                className={`bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col ${
                  isCatActive 
                    ? 'border-slate-200/90 shadow-xs' 
                    : 'border-amber-200/80 bg-slate-50/40 opacity-90'
                }`}
              >
                {/* Header Image with Badges */}
                <div className="h-36 bg-slate-100 relative overflow-hidden group">
                  <img 
                    src={cat.image_url} 
                    alt={cat.name} 
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = cat.slug === 'spice-powders' || cat.id === 6 
                        ? '/images/spice-powders.jpg' 
                        : '/images/products/lavender-oil.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    {/* Active/Inactive Status Badge */}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm backdrop-blur-xs ${
                      isCatActive 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-amber-600 text-white'
                    }`}>
                      {isCatActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{isCatActive ? 'Active' : 'Inactive'}</span>
                    </span>

                    {/* Assigned Products Count Badge */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/95 text-[#173B2B] shadow-sm">
                      <Layers className="w-3 h-3 text-[#D4954B]" />
                      <span>{count} {count === 1 ? 'Product' : 'Products'}</span>
                    </span>
                  </div>

                  {/* Title and ID in bottom corner */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-200 font-bold uppercase tracking-wider block">
                        Category #{cat.id}
                      </span>
                      <h3 className="text-base font-extrabold text-white tracking-wide font-heading capitalize leading-tight drop-shadow-xs">
                        {cat.name}
                      </h3>
                    </div>

                    {isCatActive && (
                      <Link
                        href={`/products?category=${cat.slug}`}
                        target="_blank"
                        title="View live category page in customer store"
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-[#173B2B] transition-all backdrop-blur-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-600">Slug:</span>
                      <span className="text-emerald-800 font-bold">/products?category={cat.slug}</span>
                    </div>
                    
                    <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2">
                      {cat.description || 'No description provided for this department.'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
                    {/* Toggle Active status */}
                    <button
                      type="button"
                      data-action="toggle-active"
                      onClick={() => handleToggleActive(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[10.5px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        isCatActive 
                          ? 'border border-amber-300 text-amber-800 hover:bg-amber-50' 
                          : 'border border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                      }`}
                      title={isCatActive ? "Deactivate to hide from store" : "Activate to show in store"}
                    >
                      {isCatActive ? (
                        <>
                          <EyeOff className="w-3 h-3 text-amber-600" />
                          <span>Deactivate</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3 text-emerald-600" />
                          <span>Activate</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        data-action="edit-category"
                        onClick={() => handleOpenEditModal(cat)}
                        className="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-xl text-[10.5px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3 text-slate-500" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        data-action="delete-category"
                        onClick={() => handleDeleteClick(cat)}
                        className="px-3 py-1.5 border border-rose-200/80 text-rose-600 hover:bg-rose-50 rounded-xl text-[10.5px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================
          CREATE / EDIT CATEGORY MODAL
         ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          />
          
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-7 relative z-10 shadow-2xl border border-slate-200 animate-slide-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              disabled={isSubmitting}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5 pb-3 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                {editingCategory ? 'Update Category' : 'New Department'}
              </span>
              <h3 className="text-lg font-bold text-[#173B2B] font-heading mt-0.5">
                {editingCategory ? `Edit: ${editingCategory.name}` : 'Create New Category'}
              </h3>
            </div>

            {/* Error Banner */}
            {formError && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <p className="font-medium">{formError}</p>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Category Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                  Category Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="category-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] font-medium"
                  placeholder="e.g. Herbal Infusions or Hydrosols"
                />
              </div>

              {/* URL Slug with Auto / Manual option */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173B2B]">
                    URL Slug <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {isManualSlug ? '(Custom slug)' : '(Auto-generated)'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="category-slug-input"
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className="w-full pl-3.5 pr-20 py-2.5 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B]"
                    placeholder="herbal-infusions"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono">
                    .slug
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Preview URL: <span className="font-mono text-emerald-800">/products?category={slug || '...'}</span>
                </p>
              </div>

              {/* Cover Banner Image */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                  Department Cover Image <span className="text-rose-500">*</span>
                </label>
                <div className="space-y-3">
                  {/* File Upload Dropzone */}
                  <div className="border-2 border-dashed border-slate-300 hover:border-emerald-700/60 rounded-xl p-3 bg-slate-50/60 flex flex-col items-center justify-center text-center cursor-pointer relative transition-all group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-emerald-700 transition-colors mb-1" />
                    <span className="text-xs font-bold text-[#173B2B]">Click to select an image from your device</span>
                    <span className="text-[10px] text-slate-400">Supports PNG, JPG, WebP</span>
                  </div>

                  {/* Manual URL Input */}
                  <input
                    id="category-image-url-input"
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B]"
                    placeholder="Or paste image URL (e.g. /images/products/lavender-oil.jpg)"
                  />

                  {/* Preview */}
                  {imageUrl && (
                    <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <img 
                        src={imageUrl} 
                        alt="Preview" 
                        className="w-14 h-14 object-cover rounded-lg border border-slate-300 flex-shrink-0" 
                        onError={(e) => {
                          e.currentTarget.src = '/images/botanical-hero.jpg';
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Image Loaded</p>
                        <p className="text-[11px] text-slate-500 font-mono truncate">{imageUrl.startsWith('data:') ? 'Base64 Encoded Image' : imageUrl}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173B2B] mb-1.5">
                  Short Description
                </label>
                <textarea
                  id="category-desc-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B] h-20"
                  placeholder="Describe the department, botanical purity standards, or manufacturing origin..."
                />
              </div>

              {/* Active / Inactive Status Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 cursor-pointer select-none">
                  <input
                    id="category-active-toggle"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-700 cursor-pointer accent-[#173B2B]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#173B2B] block">
                      Active Status (Customer Visible)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      When checked, this category appears on the homepage and catalogue filters. Uncheck to hide safely.
                    </span>
                  </div>
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 border border-slate-300 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="category-save-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#173B2B] hover:bg-[#204a37] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingCategory ? 'Update Category' : 'Save Category'}</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          SAFE DELETION MODAL (Guard against assigned products)
         ========================================================= */}
      {deleteDialogCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={() => !isDeleting && setDeleteDialogCategory(null)}
          />

          <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-7 relative z-10 shadow-2xl border border-slate-200 animate-slide-up">
            
            {/* Case 1: Unsafe to delete because products are assigned */}
            {(productCounts[deleteDialogCategory.id] || 0) > 0 ? (
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto">
                  <ShieldAlert className="w-6 h-6" />
                </div>

                <div className="text-center space-y-1.5">
                  <h3 className="text-base font-extrabold text-[#173B2B] font-heading">
                    Cannot Delete Category
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Category <strong className="text-[#173B2B]">"{deleteDialogCategory.name}"</strong> has{' '}
                    <strong className="text-amber-700">{productCounts[deleteDialogCategory.id]} assigned product(s)</strong> in your catalog.
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-800 space-y-1">
                  <p className="font-bold">Safe Alternative Available:</p>
                  <p className="text-[11px] text-amber-700 leading-normal">
                    You can <strong>Deactivate</strong> this category. This immediately hides it from customer discovery and catalogue filters while preserving all historical order records and product relationships intact.
                  </p>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleToggleActive(deleteDialogCategory);
                      setDeleteDialogCategory(null);
                    }}
                    className="flex-1 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer text-center"
                  >
                    Deactivate Instead
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteDialogCategory(null)}
                    className="px-4 py-2.5 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Case 2: Safe to delete (0 products assigned) */
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto">
                  <Trash2 className="w-6 h-6" />
                </div>

                <div className="text-center space-y-1.5">
                  <h3 className="text-base font-extrabold text-[#173B2B] font-heading">
                    Confirm Permanent Deletion
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Are you sure you want to delete <strong className="text-[#173B2B]">"{deleteDialogCategory.name}"</strong>?
                  </p>
                  <p className="text-[11px] text-slate-400">
                    This category has 0 assigned products and can be safely deleted. This action cannot be undone.
                  </p>
                </div>

                <div className="pt-3 flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeleteDialogCategory(null)}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    id="confirm-delete-category-btn"
                    type="button"
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
