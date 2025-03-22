'use client';

import { createContext, useContext, ReactNode } from 'react';
import useObjectState from '@/hooks/useObjectState'; 

interface ProductType {
  name: string;
  images: File[] | null;
  category: string;
  price: string;
  discountedPrice: string;
  stock: string;
}

interface FormContextType {
  formData: ReturnType<typeof useObjectState<ProductType>>;
}

const SetProductContext = createContext<FormContextType | undefined>(undefined);

export function SetProductProvider({
  children,
  defaultProduct,
}: {
  children: ReactNode;
  defaultProduct?: ProductType;
}) {
  const formData = useObjectState<ProductType>(defaultProduct || {
    name: '',
    images: null,
    category: '',
    price: '',
    discountedPrice: '',
    stock: '',
  });

  return (
    <SetProductContext.Provider value={{ formData }}>
      {children}
    </SetProductContext.Provider>
  );
}

export function useSetProductContext() {
  const context = useContext(SetProductContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
