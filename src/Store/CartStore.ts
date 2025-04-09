import { create } from 'zustand';
import CartItem from '@/types/CartItem';
import { CartHandler } from '@/utils/CartHandler';

type CartState = {
  cartItems: CartItem[];
  buyNowItem: CartItem | null;
  setCartItems: (items: CartItem[]) => void;
  refreshCartItems: VoidFunction;
  refreshBuyNow: VoidFunction;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void
  clearCart: VoidFunction
  clearBuyNow: VoidFunction
};

export const useCartStore = create<CartState>((set, ) => ({
  cartItems: [],

  buyNowItem: null,

  setCartItems: (items) => set({ cartItems: items }),

  refreshBuyNow: () => {
    if (typeof window !== 'undefined') {
      const item = CartHandler.getBuyNowItem();
      set({ buyNowItem: item });
    }
  },
  
  refreshCartItems: () => {
    if (typeof window !== 'undefined') {
      const items = CartHandler.getCartItems();
      set({ cartItems: items });
    }
  },

  updateQuantity: (itemId, quantity) => {
    CartHandler.setItemQuantity(itemId, quantity);
    const updatedItems = CartHandler.getCartItems(); 
    set({ cartItems: updatedItems });
  },

  removeItem: (itemId) => {
    CartHandler.removeCartItem(itemId)
    const updatedItems = CartHandler.getCartItems();
    set({ cartItems: updatedItems });
  },

  clearCart: () => {
    set({cartItems: []})
  },

  clearBuyNow: () => {
    set({ buyNowItem: null })
  }
}));

