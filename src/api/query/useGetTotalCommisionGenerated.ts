import { useQuery } from '@tanstack/react-query';
import { Api } from '../supabaseService';

export default function useGetTotalCommissionGenerated() {
  const queryKey = ['totalCommisionGenerated'];

  const query = useQuery({
    queryKey,
    queryFn: () => Api.getTotalCommissionGenerated()
  })

  return { query }
}
