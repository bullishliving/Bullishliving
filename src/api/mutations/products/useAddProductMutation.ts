import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../supabaseService';
import { ProductType } from '@/app/context/SetProductContext';

export default function useAddProductMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async(product: ProductType) => {
      try {
        return await Api.addProduct(product)
      } catch (error) {
        throw error
      }
    }, 
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] }); 
  },
  })

  return { mutation }
}
