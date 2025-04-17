import { useQuery } from '@tanstack/react-query';

import { Api } from '../supabaseService';

export default function useSearchProductsQuery(searchQuery: string) {
  const queryKey = ['searchedProducts', searchQuery]

  const query = useQuery({
    queryKey,
    queryFn: () => Api.searchProducts(searchQuery),
    placeholderData: (prevData) => prevData,
  })

  return { query }
}
