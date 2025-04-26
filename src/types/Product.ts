import ProductRequest from './ProductRequest';

export type Variant =  {
    type: string;
    values: { value: string; stock: number }[];
  }

export default interface Product extends Omit<ProductRequest, 'variants'> {
  id: number;
  variants: Variant[];
  sold: number;
  revenue: number;
}
