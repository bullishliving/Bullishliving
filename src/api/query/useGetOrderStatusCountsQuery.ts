import { useQuery } from '@tanstack/react-query';

import { Api } from '../supabaseService';


export default function useGetOrderStatusCountsQuery() {
  const queryKey = ['orderStatusCount'];

  const query = useQuery({
    queryKey,
    queryFn: () => Api.getOrderStatusCounts(),
  })

  return { query };
}
