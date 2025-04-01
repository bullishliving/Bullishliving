import { ProductVariant } from "@/components/inventory/SetProductVariantForm";

export default interface OutOfStockProduct {
  id: number;
  name: string;
  stock: number | null;
  out_of_stock_variants: ProductVariant[] | null;
}
