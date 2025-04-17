import { useQuery } from '@tanstack/react-query';
import { Api } from '../supabaseService';

export default function useGetProductQuery(productId: number) {
  const query = useQuery({
    queryKey: ['product', productId], 
    queryFn: () => Api.getProduct(productId),
    enabled: !!productId, 
  });

  return query; 
}
