'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/seedData';

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  gst_rate: number;
  quantity: number;
  image_url: string;
  product: Product;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('lendorastore_cart_list');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('lendorastore_cart_list', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.product_id === product.id);
      
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        const newQty = newCart[existingIdx].quantity + quantity;
        
        // Cap quantity at available stock
        newCart[existingIdx].quantity = Math.min(newQty, product.stock_quantity);
        return newCart;
      } else {
        // Add new item, clamp initial quantity to stock
        const finalQty = Math.min(quantity, product.stock_quantity);
        if (finalQty <= 0 && product.stock_quantity <= 0) return prevCart; // Don't add out of stock
        
        return [
          ...prevCart,
          {
            product_id: product.id,
            name: product.name,
            price: product.price,
            gst_rate: product.gst_rate || 18,
            quantity: finalQty > 0 ? finalQty : 1,
            image_url: product.image_url || '',
            product
          }
        ];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product_id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product_id === productId) {
          const maxStock = item.product.stock_quantity;
          return { ...item, quantity: Math.min(quantity, maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
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
        grandTotal: Math.round(grandTotal * 100) / 100
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
