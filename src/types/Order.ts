import CartItem from "./CartItem";

export default interface Order {
  customer: string;
  email: string;
  phone: string;
  state: string;
  city: string | null;
  postal_code: string | null;
  address: string;
  apartment: string | null;
  items: CartItem[];
  paystack_reference: string;
  is_payment_verified: boolean
  amount: number;
  delivery_fee: number;
  discount_code?: string | null
}
