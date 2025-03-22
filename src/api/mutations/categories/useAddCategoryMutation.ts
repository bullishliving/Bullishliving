'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../supabaseService';

export default function useAddCategoryMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (category: {
    name: string;
  }) => {
    try {
      await Api.addCategory(category);
      
    } catch (error) {
      return Promise.reject(error);
    }
  },

  onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['categories'] }); 
  },
  
  })

  return { mutation };
}
