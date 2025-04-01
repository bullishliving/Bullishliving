'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import useObjectState from '@/hooks/useObjectState';
import { ProductVariant } from '@/components/inventory/SetProductVariantForm';
import Category from '@/types/Category';
import Product from '@/types/Product';

export interface ProductType {
  id?: number;
  name: string;
  description: string;
  images: File[] | string[] | null;
  category_id: string;
  price: number;
  discounted_price: number | null;
  stock: number | null;
  variants: ProductVariant[];
  is_out_of_stock: boolean;
  is_featured: boolean;
}

interface FormContextType {
  formData: ReturnType<typeof useObjectState<ProductType | Product>>;
  activeVariant: ProductVariant | null;
  activeProduct: Product | undefined;
  setActiveProduct: (product: Product | undefined) => void;
  setActiveVariant: (variant: ProductVariant) => void;
  activeCategoryId: string | null;
  setActiveCategoryId: (id: string) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
  activeVariantIndex: number | null;
  setActiveVariantIndex: (index: number | null) => void;
  isEdit: boolean;
}

const SetProductContext = createContext<FormContextType | undefined>(undefined);

export const initialProductState = {
  name: '',
  description: '',
  images: null,
  category_id: '',
  price: 0,
  discounted_price: null,
  stock: null,
  variants: [],
  is_out_of_stock: false,
  is_featured: false
};

export function SetProductProvider({
  children,
  defaultProduct,
}: {
  children: ReactNode;
  defaultProduct?: Product;
}) {
  const [activeVariant, setActiveVariant] = useState<ProductVariant | null>(
    null
  );
  const [activeVariantIndex, setActiveVariantIndex] = useState<number | null>(null)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [activeProduct , setActiveProduct] = useState<Product | undefined>(undefined);

  const formData = useObjectState<ProductType | Product>(
    activeProduct || initialProductState
  );

  useEffect(() => {
    if (activeProduct) formData.setValue(activeProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProduct]);

  return (
    <SetProductContext.Provider
      value={{
        formData,
        activeVariant,
        setActiveVariant,
        activeProduct,
        setActiveProduct,
        activeCategoryId,
        setActiveCategoryId,
        selectedCategory,
        setSelectedCategory,
        activeVariantIndex,
        setActiveVariantIndex,
        isEdit: !!defaultProduct
      }}
    >
      {children}
    </SetProductContext.Provider>
  );
}

export function useSetProductContext() {
  const context = useContext(SetProductContext);
  if (!context) {
    throw new Error(
      'useSetProductContext must be used within a SetProductProvider'
    );
  }
  return context;
}
