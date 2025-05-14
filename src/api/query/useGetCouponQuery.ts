import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Api } from '../supabaseService';


export default function useGetCouponQuery(couponId: number) {
  const queryClient = useQueryClient();
  const queryKey = ['coupon', couponId];

  const query = useQuery({
    queryKey,
    queryFn: () => Api.getCoupon(couponId),
    enabled: !!couponId
  })

  function reloadQuery() {
    queryClient.invalidateQueries({ queryKey })
  }

  return { query, reloadQuery }
}
