export default interface OutOfStockProduct {
  product_id: number;
  name: string;
  stock: number | null;
  image: string;
  variant_type: string | null;
  variant_value: string | null;
  variant_stock: number | null
}
