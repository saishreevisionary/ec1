'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Folder, X, Upload } from 'lucide-react';
import { db } from '@/lib/db';
import { Category } from '@/lib/seedData';
import { useToast } from '@/context/ToastContext';

export default function AdminCategoryManagement() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const cats = await db.getCategories();
    setCategories(cats);
  };

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setImageUrl('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setImageUrl(cat.image_url || '');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageUrl) {
      showToast("Please fill in the category name and select/paste an image.", "error");
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload: Partial<Category> = {
      name,
      slug,
      description,
      image_url: imageUrl
    };

    if (editingCategory) {
      payload.id = editingCategory.id;
    }

    await db.saveCategory(payload);
    setIsModalOpen(false);
    loadCategories();
    showToast(editingCategory ? "Category updated successfully!" : "Category added successfully!");
  };

  const handleDeleteCategory = async (id: number) => {
    if (confirm("Are you sure you want to delete this category? Products mapped to this category will become unassigned.")) {
      await db.deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Action Header */}
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Departments Management</span>
          <h2 className="text-sm font-bold text-primary capitalize mt-0.5">Catalog Categories ({categories.length})</h2>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md hover:shadow-accent/10 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col premium-card"
          >
            {/* Header image */}
            <div className="h-32 bg-slate-100 relative">
              <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/40"></div>
              <h3 className="absolute bottom-4 left-4 text-base font-bold text-white tracking-wide capitalize">{cat.name}</h3>
            </div>

            {/* Description details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Slug: {cat.slug}</span>
                <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2">{cat.description || 'No description provided.'}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleOpenEditModal(cat)}
                  className="px-3.5 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="px-3.5 py-1.5 border border-transparent text-red-500 hover:bg-red-50 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ADD / EDIT CATEGORY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl border border-slate-150 animate-slide-up">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-primary mb-4 border-b border-slate-100 pb-2.5">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase text-primary mb-1">Category Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Rosemary Range or Follicle Serums"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase text-primary mb-1">Banner Cover Image</label>
                <div className="space-y-2.5">
                  {/* File Upload Trigger */}
                  <div className="border-2 border-dashed border-slate-200 hover:border-slate-350 rounded-xl p-3 bg-slate-50/50 flex flex-col items-center justify-center text-center cursor-pointer relative transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-[10px] font-bold text-primary">Click to select image file</span>
                    <span className="text-[8px] text-slate-400">Supports PNG, JPG, WebP</span>
                  </div>

                  {/* Manual URL Input */}
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Or paste image URL..."
                  />

                  {/* Upload Image Preview */}
                  {imageUrl && (
                    <div className="flex items-center gap-2.5 p-2 bg-white border border-slate-150 rounded-xl">
                      <img src={imageUrl} alt="Banner preview" className="w-12 h-12 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-wide">Image Loaded</p>
                        <p className="text-[9px] text-slate-400 font-mono truncate">{imageUrl.startsWith('data:') ? 'Base64 Encoded Image Data' : imageUrl}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase text-primary mb-1">Short Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary h-20"
                  placeholder="Describe category contents..."
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-accent hover:bg-accent-light text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Save Category
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
