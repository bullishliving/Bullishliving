import { useQuery } from '@tanstack/react-query';

import { Api } from '../supabaseService';

export default function useGetMonthlyCommission(couponId: number) {
  const queryKey = ['monthlyCommission', couponId];

  const query = useQuery({
    queryKey,
    queryFn: () => Api.getMonthlyCommission(couponId),
    enabled: !!couponId
  })

  return { query }
}
