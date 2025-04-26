import { useEffect } from 'react';
import useObjectState from '@/hooks/useObjectState';
import { initialProductState } from '@/Store/ProductStore';
import { useSetProductStore } from '@/Store/ProductStore';
import Product from '@/types/Product';
import ProductRequest from '@/types/ProductRequest';

export function useSetProductForm() {
  const {
    activeProduct,
  } = useSetProductStore();

  const formData = useObjectState<ProductRequest | Product>(
    activeProduct || initialProductState
  );

  useEffect(() => {
    if (activeProduct) {
      formData.setValue(activeProduct);
    } else {
      formData.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProduct]);

  return formData;
}
