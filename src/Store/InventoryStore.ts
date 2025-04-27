'use client';

import { create } from 'zustand';
import { ProductVariant } from '@/components/inventory/SetProductVariantForm';
import Category from '@/types/Category';
import Product from '@/types/Product';
import ProductRequest from '@/types/ProductRequest';

export const initialProductState: ProductRequest = {
  name: '',
  description: '',
  images: null,
  category_id: '',
  price: 0,
  stock_left: 0,
  discounted_price: null,
  stock: null,
  variants: [],
  is_out_of_stock: false,
  is_top_product: false,
};

interface SetProductStore {
  activeVariant: ProductVariant | null;
  setActiveVariant: (variant: ProductVariant | null) => void;
  activeVariantIndex: number | null;
  setActiveVariantIndex: (index: number | null) => void;
  activeCategoryId: string | null;
  setActiveCategoryId: (id: string | null) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  activeProduct: Product | undefined;
  setActiveProduct: (product: Product | undefined) => void;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
}

export const useInventoryStore = create<SetProductStore>((set) => ({
  activeVariant: null,
  setActiveVariant: (variant) => set({ activeVariant: variant }),
  activeVariantIndex: null,
  setActiveVariantIndex: (index) => set({ activeVariantIndex: index }),
  activeCategoryId: null,
  setActiveCategoryId: (id) => set({ activeCategoryId: id }),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  activeProduct: undefined,
  setActiveProduct: (product) => set({ activeProduct: product }),
  isEdit: false,
  setIsEdit: (isEdit) => set({ isEdit }),
}));
