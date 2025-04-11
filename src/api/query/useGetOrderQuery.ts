import { useQuery } from '@tanstack/react-query';

import { Api } from '../supabaseService';

export default function useGetOrderQuery(orderId: number) {
  const query = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => Api.getOrder(orderId),
    enabled: !!orderId
  })

  return { query }
}
