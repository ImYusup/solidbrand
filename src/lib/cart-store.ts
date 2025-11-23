// src/lib/cart-store.ts
import { create } from "zustand";

export type CartItem = {
  productId: string;
  variantId?: string;        
  title: string;
  price: number;
  quantity: number;
  image?: string;
  color?: string;
  weight: number;
};

type CartState = {
  items: CartItem[];
  showCart: boolean;
  setShowCart: (visible: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void; // FIX: PAKE 2 PARAM
  clearCart: () => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  showCart: false,

  setShowCart: (visible: boolean) => set({ showCart: visible }),

  addItem: (item: CartItem) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId && i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
          showCart: true,
        };
      }

      return { items: [...state.items, item], showCart: true };
    }),

  // FIXED: HAPUS PAKE productId + variantId (bisa undefined)
  removeItem: (productId: string, variantId?: string) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.productId === productId && i.variantId === variantId)
      ),
    })),

  clearCart: () => set({ items: [] }),
}));