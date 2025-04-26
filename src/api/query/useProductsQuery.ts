import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Api } from '../supabaseService';
import Product from '@/types/Product';
import { SupabaseTables } from '@/types/enums/SupabaseTables';

type ProductData = {
  data: Product[];
  count?: number;
};

export default function useProductsQuery(props: {
  page: number;
  table: SupabaseTables,
  limit: number;
  total: number;
  searchQuery?: string;
  searchColumn?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryIds?: number[];
  filters?: { column: string; value: any }[];
}) {
  const {
    limit,
    table,
    page,
    total,
    searchColumn,
    searchQuery,
    categoryIds,
    minPrice,
    maxPrice,
    filters
  } = props;

  const queryKey = [
    'products',
    page,
    limit,
    total,
    searchQuery,
    searchColumn,
    categoryIds,
    minPrice,
    maxPrice,
    filters,
  ];
  const queryClient = useQueryClient();

  const maxPage = Math.ceil(total / limit);
  const safePage = Math.min(page, maxPage);

  const start = (safePage - 1) * limit;
  const end = Math.min(start + limit - 1, total - 1);
  
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const data = await Api.getProducts(
          limit,
          table,
          start,
          end,
          searchQuery,
          searchColumn,
          minPrice,
          maxPrice,
          categoryIds,
          filters
        );
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

  function reloadQuery() {
    return queryClient.invalidateQueries({ queryKey: ['products'] });
  }

  return { query, getProduct, reloadQuery };
}
