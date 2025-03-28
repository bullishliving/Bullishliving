import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Api } from '../supabaseService';
import Product from '@/types/Product';

type ProductData = {
  data: Product[];
  count?: number;
};

export default function useProductQuery(page: number, limit: number, searchQuery?: string, searchColumn?: string) {
  const queryKey = ['products', page, limit, searchQuery, searchColumn];
  const queryClient = useQueryClient();
  
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const data = await Api.getProducts(limit, start, end, searchQuery, searchColumn);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    placeholderData: (previousData) => previousData,
  });

  const cachedProductsData = queryClient.getQueryData<ProductData>([
    'products',
  ]);

  function getProduct(productId: number) {
    if (!cachedProductsData) return;
    return cachedProductsData.data.find(({ id }) => id === productId);
  }

  return { query, getProduct };
}
