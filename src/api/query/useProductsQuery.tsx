import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Api } from '../supabaseService';
import Product from '@/types/Product';

export default function useProductQuery() {
  const queryKey = ['products'];
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const products = await Api.getProducts()
        return products
      } catch (error) {
        return Promise.reject(error);
      }
    }
  })

  const cachedProducts =
    queryClient.getQueryData<Product[]>(['products']) || [];

  function getProduct(productId: number) {
    console.log(cachedProducts);
    
    return cachedProducts.find(({ id }) => id === productId);
  }

  return { query, getProduct };
}
