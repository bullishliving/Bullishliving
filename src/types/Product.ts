import { ProductType } from '@/app/context/SetProductContext';

export type Variant =  {
    type: string;
    values: { value: string; stock: number }[];
  }

export default interface Product extends Omit<ProductType, 'variants'> {
  id: number;
  variants: Variant[];
  sold: number;
  revenue: number;
}
