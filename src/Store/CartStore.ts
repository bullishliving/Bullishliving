import { create } from 'zustand';
import CartItem from '@/types/CartItem';
import { CartHandler } from '@/utils/CartHandler';

type CartState = {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  refreshCartItems: () => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void
};

export const useCartStore = create<CartState>((set, ) => ({
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),
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
  }
}));

