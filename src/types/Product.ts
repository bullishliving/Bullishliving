import { ProductType } from '@/app/context/SetProductContext';

export default interface Product extends Omit<ProductType, 'variants'> {
  id: number;
  variants: {
    type: string;
    values: { value: string; stock: number }[];
  }[]
}
