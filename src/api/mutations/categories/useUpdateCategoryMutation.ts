'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../supabaseService';


export default function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (category: {id: string, data: {name: string}}) => {
      try {
        await Api.upadteCategory(category.id, category.data);
      } catch (error) {
        return Promise.reject(error)
      }
    }, 

    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['categories'] }); 
  },
  })

  return {mutation}
}
