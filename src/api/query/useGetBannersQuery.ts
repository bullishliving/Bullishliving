import { useQuery } from '@tanstack/react-query';

import { Api } from '../supabaseService';

export default function useGetBannersQuery() {
  const queryKey = ['banners'];

  const query = useQuery({
    queryKey,
    queryFn : () =>  Api.getBanners(),
  })

  return { query }
}
