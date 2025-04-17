import { useMutation,  useQueryClient} from '@tanstack/react-query';
import { Api } from '../../supabaseService';
import Product from '@/types/Product';

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (product: Product)=> {
      try {
        return await Api.upadteProduct(product);
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }); 
    },
  })

  function setProduct(updatedProduct: Product) {
    queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => {
      if (!oldData) return [updatedProduct];
      
      return oldData.map(product => 
        product.id === updatedProduct.id 
          ? { ...product, ...updatedProduct } 
          : product
      );
    });
  }
  return {mutation, setProduct}
}
