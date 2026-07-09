import { createClient } from '@supabase/supabase-js';
import { PRODUCTS, CATEGORIES, Product, Category } from './seedData';

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
  SESSION: 'lendorastore_session'
};

// Initialize localStorage DB if empty
const initLocalDb = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(KEYS.CATEGORIES)) {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(CATEGORIES));
  }
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(PRODUCTS));
  }
  if (!localStorage.getItem(KEYS.SETTINGS)) {
    const defaultSettings = [
      { key: 'gst_settings', value: { rate: 18, enabled: true } },
      { key: 'qr_settings', value: { company_name: "LendoraStore Premium Ltd", upi_id: "lendorastore@upi", instructions: "Please open any UPI enabled payment app (Google Pay, PhonePe, Paytm, or your banking application). Scan the QR code, verify the amount matches your order grand total, and submit the payment. After completion, take a screenshot of the successful transaction and upload it below to verify your order." } },
      { key: 'contact_settings', value: { email: "experience@lendorastore.com", phone: "+1 (800) 854-8290", address: "One Infinite Loop, Cupertino, CA 95014, USA" } },
      { key: 'logo_settings', value: { text: "LendoraStore", url: "" } },
      { key: 'banner_settings', value: { title: "The New Era of Simplicity", subtitle: "Meticulously designed tools for premium sound, refined workspaces, and active living. Built for those who appreciate absolute detail.", cta_text: "Shop the Collection", bg_gradient: "from-slate-900 via-indigo-950 to-slate-900" } }
    ];
    defaultSettings.forEach(s => {
      localStorage.setItem(`${KEYS.SETTINGS}_${s.key}`, JSON.stringify(s.value));
    });
  }
  if (!localStorage.getItem(KEYS.USERS)) {
    // Default admin user
    const defaultUsers = [
      { id: 'admin-uuid', email: 'admin@lendorastore.com', name: 'Alexander Wright', role: 'admin', created_at: new Date().toISOString() },
      { id: 'customer-uuid', email: 'customer@lendorastore.com', name: 'Sarah Connor', role: 'customer', created_at: new Date().toISOString() }
    ];
    localStorage.setItem(KEYS.USERS, JSON.stringify(defaultUsers));
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
  async getCategories(): Promise<Category[]> {
    if (supabase) {
      const { data, error } = await supabase.from('categories').select('*').order('id');
      if (!error && data) return data;
    }
    return getLocal<Category[]>(KEYS.CATEGORIES, CATEGORIES);
  },

  async saveCategory(category: Partial<Category>): Promise<Category> {
    if (supabase) {
      const { data, error } = await supabase.from('categories').upsert(category).select().single();
      if (!error && data) return data;
    }
    const categories = getLocal<Category[]>(KEYS.CATEGORIES, CATEGORIES);
    if (category.id) {
      const idx = categories.findIndex(c => c.id === category.id);
      if (idx !== -1) {
        categories[idx] = { ...categories[idx], ...category } as Category;
      }
    } else {
      const nextId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      const newCat = { ...category, id: nextId, created_at: new Date().toISOString() } as Category;
      categories.push(newCat);
      setLocal(KEYS.CATEGORIES, categories);
      return newCat;
    }
    setLocal(KEYS.CATEGORIES, categories);
    return category as Category;
  },

  async deleteCategory(id: number): Promise<boolean> {
    if (supabase) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (!error) return true;
    }
    const categories = getLocal<Category[]>(KEYS.CATEGORIES, CATEGORIES);
    const filtered = categories.filter(c => c.id !== id);
    setLocal(KEYS.CATEGORIES, filtered);
    return true;
  },

  // --- PRODUCTS ---
  async getProducts(): Promise<Product[]> {
    if (supabase) {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<Product[]>(KEYS.PRODUCTS, PRODUCTS);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (supabase) {
      const { data, error } = await supabase.from('products').select('*, product_images(*)').eq('slug', slug).single();
      if (!error && data) {
        // Map product_images if exists
        const images = data.product_images?.length 
          ? data.product_images.sort((a: any, b: any) => a.display_order - b.display_order).map((img: any) => img.image_url)
          : [data.image_url];
        return { ...data, images };
      }
    }
    const products = getLocal<Product[]>(KEYS.PRODUCTS, PRODUCTS);
    return products.find(p => p.slug === slug) || null;
  },

  async saveProduct(product: Partial<Product>): Promise<Product> {
    if (supabase) {
      const { data, error } = await supabase.from('products').upsert(product).select().single();
      if (!error && data) return data;
    }
    const products = getLocal<Product[]>(KEYS.PRODUCTS, PRODUCTS);
    if (product.id) {
      const idx = products.findIndex(p => p.id === product.id);
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...product } as Product;
      }
    } else {
      const newProd = {
        ...product,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        images: product.images || [product.image_url || ''],
        specs: product.specs || {}
      } as Product;
      products.push(newProd);
      setLocal(KEYS.PRODUCTS, products);
      return newProd;
    }
    setLocal(KEYS.PRODUCTS, products);
    return product as Product;
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    }
    const products = getLocal<Product[]>(KEYS.PRODUCTS, PRODUCTS);
    const filtered = products.filter(p => p.id !== id);
    setLocal(KEYS.PRODUCTS, filtered);
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
    if (userId) {
      return orders.filter(o => o.user_id === userId);
    }
    return orders;
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
    
    const newOrder = {
      ...orderData,
      id: orderId,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    const newItems = items.map(item => ({
      id: crypto.randomUUID(),
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: item.price,
      gst_rate_at_purchase: item.gst_rate || 18,
      products: item.product,
      created_at: new Date().toISOString()
    }));

    newOrder.order_items = newItems;

    // Deduct stocks
    const products = getLocal<Product[]>(KEYS.PRODUCTS, PRODUCTS);
    newItems.forEach(item => {
      const prod = products.find(p => p.id === item.product_id);
      if (prod) {
        prod.stock_quantity = Math.max(0, prod.stock_quantity - item.quantity);
      }
    });
    setLocal(KEYS.PRODUCTS, products);

    // Save order
    const orders = getLocal<any[]>(KEYS.ORDERS, []);
    orders.unshift(newOrder);
    setLocal(KEYS.ORDERS, orders);

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

    return newOrder;
  },

  async updateOrderStatus(id: string, status: string): Promise<any> {
    if (supabase) {
      const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const orders = getLocal<any[]>(KEYS.ORDERS, []);
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      orders[idx].status = status;
      setLocal(KEYS.ORDERS, orders);
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
    const orders = getLocal<any[]>(KEYS.ORDERS, []);
    
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
      if (!error && data) return data;
    }
    const users = getLocal<any[]>(KEYS.USERS, []);
    return users.filter(u => u.role === 'customer');
  },

  // --- AUTH SESSION / MOCK AUTH ---
  getCurrentSession(): any | null {
    return getLocal<any | null>(KEYS.SESSION, null);
  },

  login(email: string, role: 'admin' | 'customer' = 'customer'): any {
    const users = getLocal<any[]>(KEYS.USERS, []);
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      user = {
        id: role === 'admin' ? 'admin-uuid' : crypto.randomUUID(),
        email: email,
        name: email.split('@')[0].toUpperCase(),
        role: role,
        created_at: new Date().toISOString()
      };
      users.push(user);
      setLocal(KEYS.USERS, users);
    }
    
    setLocal(KEYS.SESSION, user);
    return user;
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(KEYS.SESSION);
    }
  },

  register(email: string, name: string): any {
    const users = getLocal<any[]>(KEYS.USERS, []);
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return exists;

    const newUser = {
      id: crypto.randomUUID(),
      email,
      name,
      role: 'customer',
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    setLocal(KEYS.USERS, users);
    setLocal(KEYS.SESSION, newUser);
    return newUser;
  }
};
