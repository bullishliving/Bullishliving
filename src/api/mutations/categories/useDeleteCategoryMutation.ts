import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../supabaseService';


export default function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryId: string) => {
      try {
        await Api.deleteCategory(categoryId);
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
