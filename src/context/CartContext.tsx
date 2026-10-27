'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/seedData';

export interface CartItem {
  key?: string;
  product_id: string;
  name: string;
  price: number;
  gst_rate: number;
  quantity: number;
  packaging?: string;
  image_url: string;
  product: Product;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, packaging?: string) => void;
  removeFromCart: (keyOrProductId: string) => void;
  updateQuantity: (keyOrProductId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  // Load cart from localStorage on mount & listen to updates
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadCart = () => {
        const storedCart = localStorage.getItem('lendorastore_cart_list') || localStorage.getItem('lendorastore_cart');
        if (storedCart) {
          try {
            const parsed = JSON.parse(storedCart);
            const normalized = parsed.map((item: any) => ({
              ...item,
              key: item.key || `${item.product_id}_${item.packaging || ''}`
            }));
            setCart(normalized);
          } catch (e) {
            console.warn('Failed to parse cart storage:', e);
          }
        } else {
          setCart([]);
        }
      };

      loadCart();
      setIsLoaded(true);

      window.addEventListener('storage', loadCart);
      window.addEventListener('venuss-cart-updated', loadCart);
      return () => {
        window.removeEventListener('storage', loadCart);
        window.removeEventListener('venuss-cart-updated', loadCart);
      };
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      const serialized = JSON.stringify(cart);
      localStorage.setItem('lendorastore_cart_list', serialized);
      localStorage.setItem('lendorastore_cart', serialized);
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, quantity = 1, packaging?: string) => {
    const selectedPkg = packaging || (product.packaging_options && product.packaging_options[0]) || '';
    const itemKey = `${product.id}_${selectedPkg}`;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => (item.key === itemKey) || (item.product_id === product.id && (item.packaging || '') === selectedPkg));
      
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        const newQty = newCart[existingIdx].quantity + quantity;
        
        // Cap quantity at available stock, minimum 1
        newCart[existingIdx].quantity = Math.max(1, Math.min(newQty, product.stock_quantity));
        newCart[existingIdx].packaging = selectedPkg;
        newCart[existingIdx].key = itemKey;
        return newCart;
      } else {
        // Add new item, clamp initial quantity to stock (minimum 1)
        const finalQty = Math.max(1, Math.min(quantity, product.stock_quantity));
        if (product.stock_quantity <= 0) return prevCart; // Don't add out of stock
        
        return [
          ...prevCart,
          {
            key: itemKey,
            product_id: product.id,
            name: product.name,
            price: product.price,
            gst_rate: product.gst_rate || 18,
            quantity: finalQty,
            packaging: selectedPkg,
            image_url: product.image_url || '',
            product
          }
        ];
      }
    });
  };

  const removeFromCart = (keyOrProductId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.key !== keyOrProductId && item.product_id !== keyOrProductId));
  };

  const updateQuantity = (keyOrProductId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(keyOrProductId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.key === keyOrProductId || item.product_id === keyOrProductId) {
          const maxStock = item.product.stock_quantity;
          return { ...item, quantity: Math.max(1, Math.min(quantity, maxStock)) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lendorastore_cart');
      localStorage.removeItem('lendorastore_cart_list');
    }
  };

  // Calculations
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const gstAmount = cart.reduce((total, item) => {
    const rate = item.gst_rate || 18;
    return total + (item.price * item.quantity * (rate / 100));
  }, 0);

  const grandTotal = subtotal + gstAmount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal: Math.round(subtotal * 100) / 100,
        gstAmount: Math.round(gstAmount * 100) / 100,
        grandTotal: Math.round(grandTotal * 100) / 100,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        isLoaded
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
