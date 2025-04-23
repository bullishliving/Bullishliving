import { useQuery } from '@tanstack/react-query';

import { Api } from '../supabaseService';

export default function useGetCouponsQuery() {
  const queryKey = ['coupons'];

  const query = useQuery({
    queryKey,
    queryFn : () =>  Api.getCoupons(),
  })

  return { query }
}
