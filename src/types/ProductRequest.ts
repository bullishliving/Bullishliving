import { ProductVariant } from "@/components/inventory/SetProductVariantForm";

export default interface ProductRequest {
  id?: number;
  name: string;
  description: string;
  images: File[] | string[] | null;
  category_id: string;
  price: number;
  discounted_price: number | null;
  stock: number | null;
  stock_left: number;
  variants: ProductVariant[];
  is_out_of_stock: boolean;
  is_top_product: boolean;
}
