import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Api } from '../supabaseService';

export default function useGetOrderQuery(orderId: number) {
const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => Api.getOrder(orderId),
    enabled: !!orderId
  })

  function reloadQuery() {
    return queryClient.invalidateQueries({ queryKey: ['order', orderId] })
  }

  return { query, reloadQuery }
}
