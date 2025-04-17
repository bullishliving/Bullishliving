import { useQuery } from '@tanstack/react-query';
import { Api } from '../supabaseService';

export default function useGetTotalPayInQuery() {
  const queryKey = ['totalPayIn'];

  const query = useQuery({
    queryKey,
    queryFn: () => Api.getTotalPayIn()
  })

  return { query }
}
