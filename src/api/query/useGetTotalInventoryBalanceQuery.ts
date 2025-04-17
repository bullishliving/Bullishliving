import { useQuery } from '@tanstack/react-query';
import { Api } from '../supabaseService';

export default function useGetTotalInventoryBalanceQuery () {
  const queryKey = ['totalInventoryBalance'];

  const query = useQuery({
    queryKey,
    queryFn: () => Api.getTotalInventoryBalance(),
  })

  return { query }
}
