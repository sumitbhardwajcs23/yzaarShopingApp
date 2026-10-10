'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Coupon, Product, ProductVariant } from '@/lib/types';
import { calculateGST } from '@/lib/utils';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const COUPON_LIST: Record<string, Coupon> = {
  YZAAR10: {
    code: 'YZAAR10',
    discountPercent: 10,
    minOrderValue: 5000,
    description: '10% privilege on orders above ₹5,000',
  },
  ROYAL2000: {
    code: 'ROYAL2000',
    flatDiscount: 2000,
    minOrderValue: 20000,
    description: 'Flat ₹2,000 privilege on orders above ₹20,000',
  },
  FREESHIP: {
    code: 'FREESHIP',
    freeShipping: true,
    minOrderValue: 0,
    description: 'Complimentary white-glove express courier delivery',
  },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('yzaaar_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('yzaaar_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error('Failed to parse cart cache:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('yzaaar_cart', JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem('yzaaar_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('yzaaar_coupon');
      }
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items, appliedCoupon, isInitialized]);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.variantId === variant.id);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(variant.stock, next[existingIndex].quantity + quantity);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty,
        };
        return next;
      }

      const primaryImage = product.images.find((img) => img.isPrimary)?.url || product.images[0]?.url || '';
      const newItem: CartItem = {
        id: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        productId: product.id,
        productSlug: product.slug,
        variantId: variant.id,
        title: product.title,
        size: variant.size,
        color: variant.color,
        price: variant.price,
        quantity: Math.min(quantity, variant.stock),
        image: variant.image || primaryImage,
        maxStock: variant.stock,
      };

      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: Math.min(item.maxStock, quantity),
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const coupon = COUPON_LIST[trimmed];

    if (!coupon) {
      return { success: false, message: 'Invalid or expired privilege coupon.' };
    }

    if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `This privilege code requires a minimum purchase of ₹${coupon.minOrderValue.toLocaleString('en-IN')}.`,
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Privilege code ${coupon.code} activated successfully.` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      discount = Math.min(subtotal, appliedCoupon.flatDiscount);
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const { tax } = calculateGST(taxableAmount, 0.18);

  let shippingFee = 0;
  if (subtotal > 0) {
    if (appliedCoupon?.freeShipping || subtotal >= 5000) {
      shippingFee = 0;
    } else {
      shippingFee = 350;
    }
  }

  const total = taxableAmount + tax + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        tax,
        shippingFee,
        discount,
        total,
        appliedCoupon,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
