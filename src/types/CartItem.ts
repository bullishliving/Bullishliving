export default interface CartItem {
  id: string;
  product_id: number;
  product_image: string;
  product_name: string;
  product_price: number;
  product_discounted_price: number | null;
  quantity: number;
  variant_type: string | null;
  variant_value: string | null
}
