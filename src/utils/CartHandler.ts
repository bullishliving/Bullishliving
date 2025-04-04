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

  setItemQuantity(itemId: string, quantity: number) {    
    const cartItems: CartItem[] = this.getCartItems();
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) return;

    cartItems[itemIndex].quantity = quantity;

    this.setCartItems(cartItems);
  }
}

export  const CartHandler = new CartHandlerService()
