import { useQuery } from '@tanstack/react-query';
import { Api } from '../supabaseService';

export default function useOutOfStockProductsQuery() {
  const queryKey = ['oosProducts'];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const outOfStockProducts = await Api.getOutOfStockProducts();
        return {outOfStockProducts}
      } catch (error) {
        throw error
      }
    }
  })

  return { query };
}
