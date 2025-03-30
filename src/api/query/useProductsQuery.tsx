import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Api } from '../supabaseService';
import Product from '@/types/Product';

type ProductData = {
  data: Product[];
  count?: number;
};

export default function useProductQuery(page: number, limit: number, total: number,  searchQuery?: string, searchColumn?: string) {
  const queryKey = ['products', page, limit, total, searchQuery, searchColumn];
  const queryClient = useQueryClient();
  
  const maxPage = Math.ceil(total / limit);
const safePage = Math.min(page, maxPage);

const start = (safePage - 1) * limit;
const end = Math.min(start + limit - 1, total - 1)
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
    console.log(productId);
    
    return cachedProductsData.data.find(({ id }) => id === productId);
  }

  function reloadQuery() {
    return queryClient.invalidateQueries({ queryKey: ['products'] });
  }

  return { query, getProduct, reloadQuery };
}
