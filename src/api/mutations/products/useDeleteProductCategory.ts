import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../supabaseService';
import Product from '@/types/Product';

export default function useDeleteProductMutaion() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (productId: number) => {
      try {
        await Api.deleteProduct(productId);
      } catch (error) {
        throw error
      }
    }
  });

  function removeProduct(productId: number) {
    const cachedProduct = queryClient.getQueryData<Product[]>(['products']) || [];

    const productIndex = cachedProduct.findIndex((product) => product.id === productId);
    if(productIndex !== -1){
      cachedProduct.splice(productIndex, 1)
    }
  }

  return { mutation, removeProduct};
}
