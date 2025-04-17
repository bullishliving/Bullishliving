'use client'

import CartItem from "@/types/CartItem";

class CartHandlerService {
   getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem('cartItems');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Error parsing cart items from localStorage', err);
      return [];
    }
  }

  private setCartItems(cartItems: CartItem[]) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error setting cart items to localStorage', error);
  }
}

  addItem(item: CartItem) {
    try {
      const cartItems: CartItem[] = this.getCartItems();

      cartItems.push(item);

      this.setCartItems(cartItems);
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  }

  removeCartItem(itemId: string) {
    const cartItems: CartItem[] = this.getCartItems();
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
    }

    this.setCartItems(cartItems);
  }

  clearCart() {
    localStorage.removeItem('cartItems')
  }

  setItemQuantity(itemId: string, quantity: number) {    
    const cartItems: CartItem[] = this.getCartItems();
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) return;

    cartItems[itemIndex].quantity = quantity;

    this.setCartItems(cartItems);
  }

  addBuyNowItem(item: CartItem) {
    try {
      if (typeof window === 'undefined') return;

      localStorage.setItem('butNowItem', JSON.stringify(item));
    } catch (error) {
      console.error('Failed to add buy now item to cart', error);
    }
  }

  getBuyNowItem(): CartItem | null {
    try {
      if (typeof window === 'undefined') return null;

      const storedItem = localStorage.getItem('butNowItem')
      return storedItem ? JSON.parse(storedItem) : null
    } catch (error) {
        console.error('Failed to get buy now item ', error);
        return null
    }
  }

  removeBuyNowItem() {
    try {
      if (typeof window === 'undefined') return;

      localStorage.removeItem('butNowItem')
    } catch (error) {
      console.error('Failed to remove buy now item ', error);
    }
  }
}

export  const CartHandler = new CartHandlerService()
