import { createClient } from '@supabase/supabase-js';
import { PRODUCTS, CATEGORIES, Product, Category } from './seedData';
export type { Product, Category };
import { hashPassword, verifyPassword } from './authCrypto';

// Supabase config (optional fallbacks)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Detect if real Supabase configuration exists
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && supabaseUrl !== 'placeholder';
};

export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export interface CommercialInquiry {
  id: string;
  reference_no: string;
  inquiry_type: 'quote' | 'sample' | 'export' | 'custom' | 'general';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product_id?: string;
  product_name?: string;
  product_category?: string;
  quantity?: number;
  packaging?: string;
  destination_country?: string;
  message: string;
  status: 'new' | 'in_progress' | 'quoted' | 'dispatched' | 'closed';
  user_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  product_id: string;
  product_name: string;
  user_name: string;
  user_email: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  created_at: string;
}

// Local Storage keys
const KEYS = {
  PRODUCTS: 'lendorastore_products',
  CATEGORIES: 'lendorastore_categories',
  CART: 'lendorastore_cart',
  WISHLIST: 'lendorastore_wishlist',
  ORDERS: 'lendorastore_orders',
  INVOICES: 'lendorastore_invoices',
  SETTINGS: 'lendorastore_settings',
  USERS: 'lendorastore_users',
  SESSION: 'lendorastore_session',
  REVIEWS: 'lendorastore_reviews',
  ADDRESSES: 'lendorastore_addresses',
  INQUIRIES: 'venuss_contact_submissions',
};

/**
 * Safe Category Reconciliation:
 * Reconciles persisted categories with official seed categories.
 * Preserves administrator custom categories and updates, while ensuring all 6 official
 * categories are present with verified IDs, slugs, and names.
 */
export const reconcileCategories = (
  persisted: Category[] | null | undefined,
  officialCategories: Category[]
): Category[] => {
  if (!Array.isArray(persisted) || persisted.length === 0) {
    return officialCategories.map(c => ({ ...c, is_active: c.is_active !== false }));
  }

  const result: Category[] = [...persisted];
  const existingIds = new Set(result.map(c => c.id));
  const existingSlugs = new Set(result.map(c => c.slug));

  for (const official of officialCategories) {
    if (!existingIds.has(official.id) && !existingSlugs.has(official.slug)) {
      result.push({ ...official, is_active: official.is_active !== false });
      existingIds.add(official.id);
      existingSlugs.add(official.slug);
    } else {
      const idx = result.findIndex(c => c.id === official.id || c.slug === official.slug);
      if (idx !== -1) {
        result[idx] = {
          ...official,
          ...result[idx],
          name: result[idx].name || official.name,
          slug: result[idx].slug || official.slug,
          description: result[idx].description !== undefined ? result[idx].description : official.description,
          image_url: result[idx].image_url || official.image_url,
          is_active: result[idx].is_active !== undefined ? result[idx].is_active : (official.is_active !== false),
          sort_order: result[idx].sort_order ?? official.sort_order ?? idx + 1
        };
      }
    }
  }

  return result.sort((a, b) => (a.sort_order ?? a.id) - (b.sort_order ?? b.id));
};

/**
 * Safe Product Reconciliation:
 * Reconciles persisted products in storage with official seed products.
 * 1. Preserves all administrator edits (price, stock, title, description, custom fields, etc.).
 * 2. Preserves newly created products (UUIDs or non-seed IDs/slugs).
 * 3. Restores missing official products without duplicates.
 * 4. Backfills missing canonical botanical fields on older seed records without overwriting edited values.
 * 5. Does not assign arbitrary botanical defaults to unknown products.
 * 6. Validates category references against verified categories.
 */
export const reconcileProducts = (
  persisted: Product[] | null | undefined,
  officialSeed: Product[],
  categories: Category[]
): Product[] => {
  if (!Array.isArray(persisted) || persisted.length === 0) {
    return [...officialSeed];
  }

  const validCategoryIds = new Set(categories.map(c => c.id));
  const accountedSeedSlugs = new Set<string>();
  const accountedSeedIds = new Set<string>();

  // 1. Process persisted products
  const reconciledList: Product[] = persisted.map(item => {
    // Attempt stable match: first by ID, then by validated slug
    const seedMatch = officialSeed.find(
      s => (item.id && s.id === item.id) || (item.slug && s.slug === item.slug)
    );

    if (seedMatch) {
      accountedSeedIds.add(seedMatch.id);
      accountedSeedSlugs.add(seedMatch.slug);

      // Official product: merge base seed attributes with admin-persisted modifications.
      // Persisted values override seed values (preserving admin edits).
      const merged: Product = {
        ...seedMatch, // Base canonical attributes (botanical_name, specs, etc.)
        ...item,      // Administrator edits (price, stock, description, image, etc.)
        id: item.id || seedMatch.id,
        slug: item.slug || seedMatch.slug,
        // Safely merge specs dictionary without clobbering edited specs
        specs: {
          ...(seedMatch.specs || {}),
          ...(item.specs || {}),
        },
        // Packaging options: preserve item's packaging if present, else seed
        packaging_options: (item.packaging_options && item.packaging_options.length > 0)
          ? item.packaging_options
          : seedMatch.packaging_options,
      };

      // Validate category reference against verified category records
      if (!validCategoryIds.has(merged.category_id)) {
        merged.category_id = seedMatch.category_id;
      }

      return merged;
    }

    // Administrator-created product (not present in official seed):
    // Preserve its fields as-is without assigning arbitrary botanical defaults.
    const customProduct: Product = { ...item };
    if (!validCategoryIds.has(customProduct.category_id)) {
      customProduct.category_id = categories[0]?.id || 1;
    }

    return customProduct;
  });

  // 2. Restore any missing official seed products without duplicates
  for (const seed of officialSeed) {
    if (!accountedSeedIds.has(seed.id) && !accountedSeedSlugs.has(seed.slug)) {
      reconciledList.push({ ...seed });
      accountedSeedIds.add(seed.id);
      accountedSeedSlugs.add(seed.slug);
    }
  }

  return reconciledList;
};

// Initialize localStorage DB safely
const initLocalDb = () => {
  if (typeof window === 'undefined') return;

  // 1. Reconcile categories safely
  const rawCats = localStorage.getItem(KEYS.CATEGORIES);
  let parsedCats: Category[] | null = null;
  if (rawCats) {
    try {
      parsedCats = JSON.parse(rawCats);
    } catch {
      parsedCats = null;
    }
  }
  const verifiedCats = reconcileCategories(parsedCats, CATEGORIES);
  localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(verifiedCats));

  // 2. Reconcile products safely
  const rawProds = localStorage.getItem(KEYS.PRODUCTS);
  let parsedProds: Product[] | null = null;
  if (rawProds) {
    try {
      parsedProds = JSON.parse(rawProds);
    } catch {
      parsedProds = null;
    }
  }
  const reconciledProds = reconcileProducts(parsedProds, PRODUCTS, verifiedCats);
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(reconciledProds));

  // 3. Mark catalog version marker
  const DB_CATALOG_VERSION = 'v14_reconciled_botanicals';
  localStorage.setItem('venuss_catalog_version', DB_CATALOG_VERSION);
  if (!localStorage.getItem(KEYS.SETTINGS)) {
    const defaultSettings = [
      { key: 'gst_settings', value: { rate: 18, enabled: true } },
      { key: 'qr_settings', value: { company_name: "Venuss Herbo Aromatics Ltd", upi_id: "venussherbo@upi", instructions: "Please open any UPI enabled payment app (Google Pay, PhonePe, Paytm, or your banking application). Scan the QR code, verify the amount matches your order grand total, and submit the payment. After completion, take a screenshot of the successful transaction and upload it below to verify your order." } },
      { key: 'contact_settings', value: { email: "sales@venuss.co.in", phone: "+91 94432 12345", address: "Venuss Herbo Aromatics, Tamil Nadu, India" } },
      { key: 'logo_settings', value: { text: "VENUSS HERBO AROMATICS", url: "" } },
      { key: 'banner_settings', value: { title: "Pure Essential Oils & Herbal Extracts", subtitle: "Meticulously extracted from nature for wellness, aromatherapy, and industrial applications.", cta_text: "Shop the Collection", bg_gradient: "from-emerald-900 via-teal-950 to-slate-900" } }
    ];
    defaultSettings.forEach(s => {
      localStorage.setItem(`${KEYS.SETTINGS}_${s.key}`, JSON.stringify(s.value));
    });
  }
  if (!localStorage.getItem(KEYS.USERS)) {
    // Default admin user
    const defaultUsers = [
      { id: 'admin-uuid', email: 'admin@venuss.co.in', name: 'Alexander Wright', role: 'admin', created_at: new Date().toISOString() },
      { id: 'customer-uuid', email: 'customer@venuss.co.in', name: 'Sarah Connor', role: 'customer', created_at: new Date().toISOString() }
    ];
    localStorage.setItem(KEYS.USERS, JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem(KEYS.REVIEWS)) {
    const sampleReviews: Review[] = [
      {
        id: 'rev-1',
        product_id: '1',
        product_name: 'Betel Leaf Oil',
        user_name: 'Ananya Sharma',
        user_email: 'ananya@example.com',
        rating: 5,
        title: 'Exceptional Purity and Aroma',
        comment: 'The scent of this Betel Leaf Oil is incredibly rich and authentic. High essential oil concentration makes it a standout product in my collection!',
        status: 'approved',
        created_at: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 'rev-2',
        product_id: '1',
        product_name: 'Betel Leaf Oil',
        user_name: 'Rajesh K.',
        user_email: 'rajesh@example.com',
        rating: 5,
        title: 'Top Quality Herbal Essential Oil',
        comment: 'Very pleased with the packaging and purity. Venuss Herbo Aromatics delivers as always!',
        status: 'approved',
        created_at: new Date(Date.now() - 86400000 * 7).toISOString()
      },
      {
        id: 'rev-3',
        product_id: '2',
        product_name: 'Cardamom Essential Oil',
        user_name: 'Priya Nair',
        user_email: 'priya@example.com',
        rating: 4,
        title: 'Soothing and Refreshing',
        comment: 'Wonderful aroma, perfect for aromatherapy. Would recommend bottled seal improvement.',
        status: 'approved',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString()
      },
      {
        id: 'rev-4',
        product_id: '1',
        product_name: 'Betel Leaf Oil',
        user_name: 'Vikram Singh',
        user_email: 'vikram@example.com',
        rating: 4,
        title: 'Good product overall',
        comment: 'Prompt delivery and authentic scent.',
        status: 'pending',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ];
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(sampleReviews));
  }
};

// Call immediately in client
if (typeof window !== 'undefined') {
  initLocalDb();
}

// ----------------- DATABASE UTILITIES -----------------

// Helper to get from localstorage safely
const getLocal = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : defaultValue;
};

// Helper to set localstorage safely
const setLocal = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const db = {
  // --- CATEGORIES ---
  async getCategories(activeOnly: boolean = false): Promise<Category[]> {
    let cats: Category[];
    if (supabase) {
      const { data, error } = await supabase.from('categories').select('*').order('id');
      if (!error && data) {
        cats = data;
      } else {
        cats = getLocal<Category[]>(KEYS.CATEGORIES, CATEGORIES);
      }
    } else {
      cats = getLocal<Category[]>(KEYS.CATEGORIES, CATEGORIES);
    }

    const processed = cats.map(c => {
      if (c.slug === 'spice-powders' || c.id === 6 || c.image_url?.includes('photo-1615396879814')) {
        return { ...c, image_url: '/images/spice-powders.jpg' };
      }
      return c;
    });

    if (activeOnly) {
      return processed.filter(c => c.is_active !== false);
    }
    return processed;
  },

  async getCategoryCounts(visibleOnly: boolean = false): Promise<Record<number, number>> {
    const products = await this.getProducts();
    const counts: Record<number, number> = {};
    for (const p of products) {
      if (visibleOnly) {
        if (p.status === 'draft' || (p as any).is_active === false || (p as any).is_published === false) {
          continue;
        }
      }
      if (p.category_id !== undefined && p.category_id !== null) {
        const catId = Number(p.category_id);
        counts[catId] = (counts[catId] || 0) + 1;
      }
    }
    return counts;
  },

  async saveCategory(category: Partial<Category>): Promise<Category> {
    const trimmedName = category.name?.trim();
    if (!trimmedName) {
      throw new Error('Category name is required and cannot be empty.');
    }

    // Auto-generate or sanitize slug
    let rawSlug = category.slug?.trim() || trimmedName;
    const cleanSlug = rawSlug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!cleanSlug) {
      throw new Error('A valid, non-empty URL slug is required.');
    }

    const categories = getLocal<Category[]>(KEYS.CATEGORIES, CATEGORIES);

    // Duplicate Name & Slug Check (exclude current category if editing)
    const duplicateName = categories.find(
      c => (category.id === undefined || Number(c.id) !== Number(category.id)) && c.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicateName) {
      throw new Error(`A category with the name "${trimmedName}" already exists.`);
    }

    const duplicateSlug = categories.find(
      c => (category.id === undefined || Number(c.id) !== Number(category.id)) && c.slug.trim().toLowerCase() === cleanSlug
    );
    if (duplicateSlug) {
      throw new Error(`The URL slug "${cleanSlug}" is already in use by category "${duplicateSlug.name}".`);
    }

    const categoryData: Category = {
      id: category.id || (categories.length > 0 ? Math.max(...categories.map(c => Number(c.id))) + 1 : 1),
      name: trimmedName,
      slug: cleanSlug,
      description: category.description?.trim() || '',
      image_url: category.image_url || '/images/botanical-hero.jpg',
      is_active: category.is_active !== undefined ? Boolean(category.is_active) : true,
      sort_order: category.sort_order ?? (category.id || categories.length + 1),
      created_at: category.created_at || new Date().toISOString()
    };

    if (supabase) {
      const { data, error } = await supabase.from('categories').upsert(categoryData).select().single();
      if (error) {
        console.warn("[DB_SAVE_CATEGORY_ERROR] categories table upsert error:", error);
      }
      if (!error && data) {
        // update local cache as well
        const idx = categories.findIndex(c => Number(c.id) === Number(data.id));
        if (idx !== -1) {
          categories[idx] = data;
        } else {
          categories.push(data);
        }
        setLocal(KEYS.CATEGORIES, categories);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('venuss-categories-updated', { detail: { action: 'save', category: data } }));
        }
        return data;
      }
    }

    // Local Storage persistence
    if (category.id) {
      const idx = categories.findIndex(c => Number(c.id) === Number(category.id));
      if (idx !== -1) {
        categories[idx] = { ...categories[idx], ...categoryData };
      } else {
        categories.push(categoryData);
      }
    } else {
      categories.push(categoryData);
    }
    setLocal(KEYS.CATEGORIES, categories);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('venuss-categories-updated', { detail: { action: 'save', category: categoryData } }));
    }

    return categoryData;
  },

  async deleteCategory(id: number): Promise<boolean> {
    // 1. Safe deletion guard: check if any products are assigned to this category
    const products = await this.getProducts();
    const assignedProducts = products.filter(p => Number(p.category_id) === Number(id));
    if (assignedProducts.length > 0) {
      const cats = getLocal<Category[]>(KEYS.CATEGORIES, CATEGORIES);
      const catName = cats.find(c => Number(c.id) === Number(id))?.name || `ID ${id}`;
      throw new Error(
        `Cannot delete category "${catName}" because it contains ${assignedProducts.length} assigned product(s) (such as "${assignedProducts[0].name}"). Reassign or remove these products first, or deactivate the category instead.`
      );
    }

    if (supabase) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) {
        console.warn("[DB_DELETE_CATEGORY_ERROR] categories table delete error:", error);
      }
    }

    const categories = getLocal<Category[]>(KEYS.CATEGORIES, CATEGORIES);
    const filtered = categories.filter(c => Number(c.id) !== Number(id));
    setLocal(KEYS.CATEGORIES, filtered);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('venuss-categories-updated', { detail: { action: 'delete', id } }));
    }

    return true;
  },

  // --- PRODUCTS ---
  async getProducts(): Promise<Product[]> {
    if (supabase) {
      const { data, error } = await supabase.from('products').select('*, product_images(*)').order('created_at', { ascending: false });
      if (!error && data) {
        return data.map((item: any) => {
          const images = item.product_images?.length 
            ? item.product_images.sort((a: any, b: any) => a.display_order - b.display_order).map((img: any) => img.image_url)
            : [item.image_url];
          const seedMatch = PRODUCTS.find(sp => sp.id === item.id || sp.slug === item.slug);
          return {
            ...seedMatch,
            ...item,
            images,
          };
        });
      }
    }
    const localProds = getLocal<Product[]>(KEYS.PRODUCTS, []);
    const localCats = getLocal<Category[]>(KEYS.CATEGORIES, CATEGORIES);
    const verifiedCats = reconcileCategories(localCats, CATEGORIES);
    const reconciled = reconcileProducts(localProds, PRODUCTS, verifiedCats);

    // If local storage did not have products or was missing items, persist reconciled state safely
    if (typeof window !== 'undefined' && (!localProds || localProds.length !== reconciled.length)) {
      setLocal(KEYS.PRODUCTS, reconciled);
      setLocal(KEYS.CATEGORIES, verifiedCats);
    }

    return reconciled;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (supabase) {
      const { data, error } = await supabase.from('products').select('*, product_images(*)').eq('slug', slug).single();
      if (!error && data) {
        const images = data.product_images?.length 
          ? data.product_images.sort((a: any, b: any) => a.display_order - b.display_order).map((img: any) => img.image_url)
          : [data.image_url];
        return { ...data, images };
      }
    }
    const products = await this.getProducts();
    return products.find(p => p.slug === slug) || null;
  },

  async saveProduct(product: Partial<Product>): Promise<Product> {
    if (supabase) {
      // 1. Separate images and specs which do not exist on public.products table
      const { images, specs, ...dbProduct } = product as any;

      // 2. Perform the upsert to public.products table
      const { data, error } = await supabase.from('products').upsert(dbProduct).select().single();
      
      if (error) {
        console.log("[DB_SAVE_PRODUCT_ERROR] products table upsert error:", error);
      }

      if (!error && data) {
        // 3. Sync product gallery images if specified
        if (images && Array.isArray(images)) {
          // Clear current product images
          const { error: deleteError } = await supabase.from('product_images').delete().eq('product_id', data.id);
          if (deleteError) {
            console.log("[DB_SAVE_PRODUCT_ERROR] deleting old product images error:", deleteError);
          }

          // Insert new image records
          if (images.length > 0) {
            const imageRows = images.map((url: string, index: number) => ({
              product_id: data.id,
              image_url: url,
              display_order: index
            }));
            const { error: insertError } = await supabase.from('product_images').insert(imageRows);
            if (insertError) {
              console.log("[DB_SAVE_PRODUCT_ERROR] inserting new product images error:", insertError);
            }
          }
        }

        // Return the combined product structure
        return { ...data, images: images || [data.image_url] };
      }
    }
    const products = await this.getProducts();
    let savedProduct: Product;
    if (product.id) {
      const idx = products.findIndex(p => p.id === product.id);
      if (idx !== -1) {
        savedProduct = { ...products[idx], ...product } as Product;
        products[idx] = savedProduct;
      } else {
        savedProduct = {
          ...product,
          id: product.id,
          created_at: product.created_at || new Date().toISOString(),
          images: product.images || [product.image_url || ''],
          specs: product.specs || {}
        } as Product;
        products.push(savedProduct);
      }
    } else {
      savedProduct = {
        ...product,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        images: product.images || [product.image_url || ''],
        specs: product.specs || {}
      } as Product;
      products.push(savedProduct);
    }
    setLocal(KEYS.PRODUCTS, products);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('venuss-products-updated', { detail: { action: 'save', product: savedProduct } }));
      window.dispatchEvent(new CustomEvent('venuss-categories-updated', { detail: { action: 'product-update', product: savedProduct } }));
    }

    return savedProduct;
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    }
    const products = await this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    setLocal(KEYS.PRODUCTS, filtered);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('venuss-products-updated', { detail: { action: 'delete', id } }));
      window.dispatchEvent(new CustomEvent('venuss-categories-updated', { detail: { action: 'product-delete', id } }));
    }

    return true;
  },

  // --- SETTINGS ---
  async getSetting<T>(key: string, defaultValue: T): Promise<T> {
    if (supabase) {
      const { data, error } = await supabase.from('settings').select('value').eq('key', key).single();
      if (!error && data) return data.value as T;
    }
    return getLocal<T>(`${KEYS.SETTINGS}_${key}`, defaultValue);
  },

  async saveSetting<T>(key: string, value: T): Promise<void> {
    if (supabase) {
      await supabase.from('settings').upsert({ key, value, updated_at: new Date().toISOString() });
    }
    setLocal(`${KEYS.SETTINGS}_${key}`, value);
  },

  // --- ORDERS ---
  async getOrders(userId?: string): Promise<any[]> {
    if (supabase) {
      let query = supabase.from('orders').select('*, order_items(*, products(*))').order('created_at', { ascending: false });
      if (userId) {
        query = query.eq('user_id', userId);
      }
      const { data, error } = await query;
      if (!error && data) return data;
    }
    const orders = getLocal<any[]>(KEYS.ORDERS, []);
    const allOrders = (Array.isArray(orders) && orders.length > 0) ? orders : getLocal<any[]>('venuss_orders', []);
    if (userId) {
      return allOrders.filter(o => o.user_id === userId);
    }
    return allOrders;
  },

  async getOrderById(id: string): Promise<any | null> {
    if (supabase) {
      const { data, error } = await supabase.from('orders').select('*, order_items(*, products(*))').eq('id', id).single();
      if (!error && data) return data;
    }
    const orders = getLocal<any[]>(KEYS.ORDERS, []);
    return orders.find(o => o.id === id) || null;
  },

  async createOrder(orderData: any, items: any[]): Promise<any> {
    const orderId = crypto.randomUUID();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const products = await this.getProducts();

    // Server-side verification of items, prices, and packaging
    const newItems = items.map(item => {
      const prod = products.find(p => p.id === item.product_id);
      const verifiedPrice = prod ? prod.price : (Number(item.price) || 0);
      const verifiedGstRate = prod?.gst_rate || 18;
      const verifiedQty = Math.max(1, Number(item.quantity) || 1);

      return {
        id: crypto.randomUUID(),
        order_id: orderId,
        product_id: item.product_id,
        packaging: item.packaging || '',
        quantity: verifiedQty,
        price_at_purchase: verifiedPrice,
        gst_rate_at_purchase: verifiedGstRate,
        products: prod || item.product,
        created_at: new Date().toISOString()
      };
    });

    const computedSubtotal = newItems.reduce((sum, item) => sum + (item.price_at_purchase * item.quantity), 0);
    const computedGst = Math.round(newItems.reduce((sum, item) => sum + (item.price_at_purchase * item.quantity * (item.gst_rate_at_purchase / 100)), 0));
    const computedGrandTotal = computedSubtotal + computedGst;

    const newOrder = {
      ...orderData,
      id: orderId,
      subtotal: computedSubtotal,
      gst_amount: computedGst,
      grand_total: computedGrandTotal,
      status: 'pending',
      created_at: new Date().toISOString(),
      order_items: newItems
    };

    // Deduct stocks
    const storedProducts = getLocal<Product[]>(KEYS.PRODUCTS, PRODUCTS);
    newItems.forEach(item => {
      const prod = storedProducts.find(p => p.id === item.product_id);
      if (prod) {
        prod.stock_quantity = Math.max(0, prod.stock_quantity - item.quantity);
      }
    });
    setLocal(KEYS.PRODUCTS, storedProducts);

    // Save order
    const orders = getLocal<any[]>(KEYS.ORDERS, []);
    orders.unshift(newOrder);
    setLocal(KEYS.ORDERS, orders);
    setLocal('venuss_orders', orders);

    // Generate Invoice
    const newInvoice = {
      id: crypto.randomUUID(),
      order_id: orderId,
      invoice_number: invoiceNumber,
      pdf_url: '',
      created_at: new Date().toISOString()
    };
    const invoices = getLocal<any[]>(KEYS.INVOICES, []);
    invoices.unshift(newInvoice);
    setLocal(KEYS.INVOICES, invoices);

    if (supabase) {
      // Async insert into supabase if online
      try {
        const { data: ord } = await supabase.from('orders').insert({
          id: orderId,
          user_id: newOrder.user_id,
          status: newOrder.status,
          subtotal: newOrder.subtotal,
          gst_amount: newOrder.gst_amount,
          grand_total: newOrder.grand_total,
          shipping_name: newOrder.shipping_name,
          shipping_phone: newOrder.shipping_phone,
          shipping_address: newOrder.shipping_address,
          shipping_city: newOrder.shipping_city,
          shipping_pincode: newOrder.shipping_pincode,
          payment_method: newOrder.payment_method,
          payment_screenshot_url: newOrder.payment_screenshot_url
        }).select().single();

        if (ord) {
          await supabase.from('order_items').insert(
            newItems.map(ni => ({
              order_id: orderId,
              product_id: ni.product_id,
              quantity: ni.quantity,
              price_at_purchase: ni.price_at_purchase,
              gst_rate_at_purchase: ni.gst_rate_at_purchase
            }))
          );
          await supabase.from('invoices').insert({
            order_id: orderId,
            invoice_number: invoiceNumber
          });
        }
      } catch (err) {
        console.warn("Supabase upload failed, stored locally", err);
      }
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('venuss-orders-updated', { detail: { action: 'create', order: newOrder } }));
    }

    return newOrder;
  },

  async updateOrderStatus(id: string, status: string, extraData?: { tracking_number?: string; courier_name?: string; cancellation_reason?: string; payment_verified?: boolean }): Promise<any> {
    const updatePayload: any = { status, ...(extraData || {}) };
    if (supabase) {
      const { data, error } = await supabase.from('orders').update(updatePayload).eq('id', id).select().single();
      if (!error && data) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('venuss-orders-updated', { detail: { action: 'update', order: data } }));
        }
        return data;
      }
    }
    const orders = getLocal<any[]>(KEYS.ORDERS, []);
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      orders[idx] = { ...orders[idx], ...updatePayload };
      setLocal(KEYS.ORDERS, orders);
      setLocal('venuss_orders', orders);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('venuss-orders-updated', { detail: { action: 'update', order: orders[idx] } }));
      }
      return orders[idx];
    }
    return null;
  },

  // --- INVOICES ---
  async getInvoices(): Promise<any[]> {
    if (supabase) {
      const { data, error } = await supabase.from('invoices').select('*, orders(*)').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    const invoices = getLocal<any[]>(KEYS.INVOICES, []);
    const rawOrders = getLocal<any[]>(KEYS.ORDERS, []);
    const orders = (Array.isArray(rawOrders) && rawOrders.length > 0) ? rawOrders : getLocal<any[]>('venuss_orders', []);
    
    // Stitch orders
    return invoices.map(inv => ({
      ...inv,
      orders: orders.find(o => o.id === inv.order_id)
    }));
  },

  // --- CUSTOMERS ---
  async getCustomers(): Promise<any[]> {
    if (supabase) {
      const { data, error } = await supabase.from('users').select('*').eq('role', 'customer');
      if (error) {
        console.error("db.getCustomers Query Error:", error);
      }
      if (!error && data) return data;
    }
    const users = getLocal<any[]>(KEYS.USERS, []);
    return users.filter(u => u.role === 'customer');
  },

  // --- AUTH SESSION / MOCK AUTH ---
  getCurrentSession(): any | null {
    return getLocal<any | null>(KEYS.SESSION, null);
  },

  syncSessionCookies(user: any | null): void {
    if (typeof document === 'undefined') return;
    if (user) {
      document.cookie = `venuss_role=${user.role}; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `venuss_session=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=604800; SameSite=Lax`;
    } else {
      document.cookie = `venuss_role=; path=/; max-age=0; SameSite=Lax`;
      document.cookie = `venuss_session=; path=/; max-age=0; SameSite=Lax`;
    }
  },

  async login(email: string, password?: string, role?: 'admin' | 'customer'): Promise<{ success: boolean; user?: any; error?: string }> {
    const users = getLocal<any[]>(KEYS.USERS, []);
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // Check password if user has passwordHash and password is provided
    if (user && user.passwordHash) {
      if (!password) {
        return { success: false, error: 'Password is required to sign in.' };
      }
      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return { success: false, error: 'Invalid email or password. Please verify your credentials.' };
      }
    } else if (user && password && !user.passwordHash) {
      // Backfill hash if user existed without hash (e.g. legacy local record)
      user.passwordHash = await hashPassword(password);
      const idx = users.findIndex(u => u.id === user.id);
      if (idx !== -1) users[idx] = user;
      setLocal(KEYS.USERS, users);
    }

    if (!user) {
      // If user doesn't exist and password was provided (and not explicitly logging in as admin seed)
      const isAdminEmail = (
        email.toLowerCase() === 'admin@venuss.co.in' || 
        email.toLowerCase() === 'admin@lendorastore.com'
      );
      
      if (!isAdminEmail && password) {
        return { success: false, error: 'No account found with this email. Please check your spelling or register.' };
      }

      const determinedRole = role || (isAdminEmail ? 'admin' : 'customer');
      user = {
        id: determinedRole === 'admin' ? 'admin-uuid' : crypto.randomUUID(),
        email: email,
        name: email.split('@')[0].toUpperCase(),
        role: determinedRole,
        passwordHash: password ? await hashPassword(password) : undefined,
        created_at: new Date().toISOString()
      };
      users.push(user);
      setLocal(KEYS.USERS, users);
    }
    
    // Safety check: Never allow normal customer login to elevate to admin
    if (user.role === 'admin' && !role && email.toLowerCase() !== 'admin@venuss.co.in' && email.toLowerCase() !== 'admin@lendorastore.com') {
      user.role = 'customer';
    }

    setLocal(KEYS.SESSION, user);
    this.syncSessionCookies(user);
    return { success: true, user };
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(KEYS.SESSION);
    }
    this.syncSessionCookies(null);
  },

  async register(email: string, name: string, password?: string): Promise<{ success: boolean; user?: any; error?: string }> {
    const users = getLocal<any[]>(KEYS.USERS, []);
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'An account with this email address already exists. Please sign in instead.' };
    }

    const passwordHash = password ? await hashPassword(password) : undefined;

    const newUser = {
      id: crypto.randomUUID(),
      email: email.trim(),
      name: name.trim(),
      role: 'customer' as const,
      passwordHash,
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    setLocal(KEYS.USERS, users);
    setLocal(KEYS.SESSION, newUser);
    this.syncSessionCookies(newUser);
    return { success: true, user: newUser };
  },

  async resetPassword(email: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    const users = getLocal<any[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) {
      return { success: false, error: 'No account found with this email address.' };
    }
    const passwordHash = await hashPassword(newPassword);
    users[idx].passwordHash = passwordHash;
    setLocal(KEYS.USERS, users);

    const session = getLocal<any>(KEYS.SESSION, null);
    if (session && session.email.toLowerCase() === email.toLowerCase()) {
      session.passwordHash = passwordHash;
      setLocal(KEYS.SESSION, session);
    }
    return { success: true };
  },

  async switchRole(targetRole: 'admin' | 'customer'): Promise<any> {
    const targetEmail = targetRole === 'admin' ? 'admin@venuss.co.in' : 'customer@venuss.co.in';
    const res = await this.login(targetEmail, undefined, targetRole);
    return res.user;
  },

  // --- COMMERCIAL INQUIRIES & QUOTE REQUESTS ---
  async getInquiries(userId?: string, email?: string): Promise<CommercialInquiry[]> {
    const submissions = getLocal<CommercialInquiry[]>(KEYS.INQUIRIES, []);
    if (!userId && !email) return submissions;
    return submissions.filter(s => {
      const matchEmail = email && s.email && s.email.toLowerCase() === email.toLowerCase();
      const matchUser = userId && s.user_id && s.user_id === userId;
      return matchEmail || matchUser;
    });
  },

  async getInquiryById(id: string): Promise<CommercialInquiry | null> {
    const submissions = getLocal<CommercialInquiry[]>(KEYS.INQUIRIES, []);
    return submissions.find(s => s.id === id) || null;
  },

  async saveInquiry(inquiry: Partial<CommercialInquiry>): Promise<CommercialInquiry> {
    const trimmedName = inquiry.name?.trim();
    if (!trimmedName) {
      throw new Error('Please provide your name or business representative name.');
    }

    const trimmedEmail = inquiry.email?.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      throw new Error('Please provide a valid business email address.');
    }

    const trimmedMessage = inquiry.message?.trim();
    if (!trimmedMessage) {
      throw new Error('Please provide your requirements or enquiry message.');
    }

    const inqType = inquiry.inquiry_type || 'quote';
    const currentYear = new Date().getFullYear();
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = (
      inqType === 'quote' ? 'QUO' :
      inqType === 'sample' ? 'SMP' :
      inqType === 'export' ? 'EXP' :
      inqType === 'custom' ? 'CUS' : 'ENQ'
    );
    const generatedRef = inquiry.reference_no || `${prefix}-${currentYear}-${randSuffix}`;

    const submissions = getLocal<CommercialInquiry[]>(KEYS.INQUIRIES, []);
    const newInquiry: CommercialInquiry = {
      id: inquiry.id || crypto.randomUUID(),
      reference_no: generatedRef,
      inquiry_type: inqType,
      name: trimmedName,
      email: trimmedEmail,
      phone: inquiry.phone?.trim() || '',
      company: inquiry.company?.trim() || '',
      product_id: inquiry.product_id,
      product_name: inquiry.product_name?.trim(),
      product_category: inquiry.product_category?.trim(),
      quantity: typeof inquiry.quantity === 'number' ? inquiry.quantity : 1,
      packaging: inquiry.packaging?.trim() || '',
      destination_country: inquiry.destination_country?.trim() || '',
      message: trimmedMessage,
      status: inquiry.status || 'new',
      user_id: inquiry.user_id,
      created_at: inquiry.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    submissions.unshift(newInquiry);
    setLocal(KEYS.INQUIRIES, submissions);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('venuss-inquiries-updated', { detail: { action: 'save', inquiry: newInquiry } }));
    }

    return newInquiry;
  },

  async updateInquiryStatus(id: string, status: CommercialInquiry['status']): Promise<CommercialInquiry | null> {
    const submissions = getLocal<CommercialInquiry[]>(KEYS.INQUIRIES, []);
    const idx = submissions.findIndex(s => s.id === id);
    if (idx !== -1) {
      submissions[idx] = {
        ...submissions[idx],
        status,
        updated_at: new Date().toISOString()
      };
      setLocal(KEYS.INQUIRIES, submissions);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('venuss-inquiries-updated', { detail: { action: 'update', inquiry: submissions[idx] } }));
      }
      return submissions[idx];
    }
    return null;
  },

  async deleteInquiry(id: string): Promise<boolean> {
    const submissions = getLocal<CommercialInquiry[]>(KEYS.INQUIRIES, []);
    const filtered = submissions.filter(s => s.id !== id);
    setLocal(KEYS.INQUIRIES, filtered);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('venuss-inquiries-updated', { detail: { action: 'delete', id } }));
    }
    return true;
  },

  // --- REVIEWS ---
  async getReviews(productId?: string, statusFilter?: string): Promise<Review[]> {
    if (supabase) {
      let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (productId) {
        query = query.eq('product_id', productId);
      }
      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      const { data, error } = await query;
      if (!error && data) return data as Review[];
    }
    let reviews = getLocal<Review[]>(KEYS.REVIEWS, []);
    if (productId) {
      reviews = reviews.filter(r => r.product_id === productId);
    }
    if (statusFilter && statusFilter !== 'all') {
      reviews = reviews.filter(r => r.status === statusFilter);
    }
    return reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async saveReview(review: Omit<Review, 'id' | 'created_at' | 'status'> & { id?: string; status?: 'approved' | 'pending' | 'rejected' }): Promise<Review> {
    const newReview: Review = {
      id: review.id || crypto.randomUUID(),
      product_id: review.product_id,
      product_name: review.product_name,
      user_name: review.user_name,
      user_email: review.user_email,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      status: review.status || 'approved',
      created_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        const { data, error } = await supabase.from('reviews').upsert(newReview).select().single();
        if (!error && data) return data as Review;
      } catch (err) {
        console.warn("Supabase save review failed, using local", err);
      }
    }

    const reviews = getLocal<Review[]>(KEYS.REVIEWS, []);
    const idx = reviews.findIndex(r => r.id === newReview.id);
    if (idx !== -1) {
      reviews[idx] = newReview;
    } else {
      reviews.unshift(newReview);
    }
    setLocal(KEYS.REVIEWS, reviews);
    return newReview;
  },

  async updateReviewStatus(id: string, status: 'approved' | 'pending' | 'rejected'): Promise<Review | null> {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('reviews').update({ status }).eq('id', id).select().single();
        if (!error && data) return data as Review;
      } catch (err) {
        console.warn("Supabase update review status failed, fallback to local", err);
      }
    }
    const reviews = getLocal<Review[]>(KEYS.REVIEWS, []);
    const idx = reviews.findIndex(r => r.id === id);
    if (idx !== -1) {
      reviews[idx].status = status;
      setLocal(KEYS.REVIEWS, reviews);
      return reviews[idx];
    }
    return null;
  },

  async deleteReview(id: string): Promise<boolean> {
    if (supabase) {
      try {
        const { error } = await supabase.from('reviews').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn("Supabase delete review failed, fallback to local", err);
      }
    }
    const reviews = getLocal<Review[]>(KEYS.REVIEWS, []);
    const filtered = reviews.filter(r => r.id !== id);
    setLocal(KEYS.REVIEWS, filtered);
    return true;
  },

  // --- ADDRESSES ---
  async getAddresses(userId: string): Promise<any[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', userId)
          .order('is_default', { ascending: false });
        if (!error && data) return data;
      } catch (err) {
        console.warn('[db.getAddresses] Supabase error, falling back to local', err);
      }
    }
    return getLocal<any[]>(`${KEYS.ADDRESSES}_${userId}`, []);
  },

  async saveAddress(userId: string, address: any): Promise<any> {
    const isNew = !address.id;
    const addr = {
      ...address,
      id: address.id || crypto.randomUUID(),
      user_id: userId,
      created_at: address.created_at || new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('addresses')
          .upsert(addr)
          .select()
          .single();
        if (!error && data) {
          // Also update local cache
          const addresses = getLocal<any[]>(`${KEYS.ADDRESSES}_${userId}`, []);
          const idx = addresses.findIndex(a => a.id === data.id);
          if (idx !== -1) addresses[idx] = data;
          else addresses.push(data);
          setLocal(`${KEYS.ADDRESSES}_${userId}`, addresses);
          return data;
        }
      } catch (err) {
        console.warn('[db.saveAddress] Supabase error, falling back to local', err);
      }
    }

    // Local fallback
    const addresses = getLocal<any[]>(`${KEYS.ADDRESSES}_${userId}`, []);
    const idx = addresses.findIndex(a => a.id === addr.id);
    if (idx !== -1) {
      addresses[idx] = addr;
    } else {
      addresses.push(addr);
    }
    setLocal(`${KEYS.ADDRESSES}_${userId}`, addresses);
    return addr;
  },

  async deleteAddress(userId: string, addressId: string): Promise<boolean> {
    if (supabase) {
      try {
        const { error } = await supabase.from('addresses').delete().eq('id', addressId);
        if (!error) {
          const addresses = getLocal<any[]>(`${KEYS.ADDRESSES}_${userId}`, []);
          setLocal(`${KEYS.ADDRESSES}_${userId}`, addresses.filter(a => a.id !== addressId));
          return true;
        }
      } catch (err) {
        console.warn('[db.deleteAddress] Supabase error, falling back to local', err);
      }
    }
    const addresses = getLocal<any[]>(`${KEYS.ADDRESSES}_${userId}`, []);
    setLocal(`${KEYS.ADDRESSES}_${userId}`, addresses.filter(a => a.id !== addressId));
    return true;
  },

  // --- USER PROFILE ---
  async updateUserProfile(userId: string, updates: { name?: string; email?: string }): Promise<any> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .update(updates)
          .eq('id', userId)
          .select()
          .single();
        if (!error && data) {
          // Update local session
          const session = getLocal<any>(KEYS.SESSION, null);
          if (session && session.id === userId) {
            const updated = { ...session, ...updates };
            setLocal(KEYS.SESSION, updated);
            this.syncSessionCookies(updated);
          }
          return data;
        }
      } catch (err) {
        console.warn('[db.updateUserProfile] Supabase error, falling back to local', err);
      }
    }
    // Local fallback
    const users = getLocal<any[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      setLocal(KEYS.USERS, users);
    }
    const session = getLocal<any>(KEYS.SESSION, null);
    if (session && session.id === userId) {
      const updated = { ...session, ...updates };
      setLocal(KEYS.SESSION, updated);
      this.syncSessionCookies(updated);
      return updated;
    }
    return users[idx] || null;
  },
};

