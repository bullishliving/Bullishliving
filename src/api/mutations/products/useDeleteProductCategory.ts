import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../supabaseService';

export default function useDeleteProductMutaion() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (productId: number) => {
      try {
        await Api.deleteProduct(productId);
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }); 
    },
  });

  return { mutation };
}
