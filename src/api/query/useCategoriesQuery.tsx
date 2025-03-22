import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Api } from '../supabaseService';

export default function  useCategoriesQuery() {

  const queryKey = ['categories'];
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const categories = await Api.getCategories()
        return categories
      } catch (error) {
        return Promise.reject(error)
      }
    }
  });

  return { query }
} 
