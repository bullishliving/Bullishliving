import { useQuery } from '@tanstack/react-query';

import { Api } from '../supabaseService';

export default function useGetCommunityMembers(props: {
  page: number;
  limit: number;
  total: number;
  searchQuery?: string;
  searchColumn?: string;
}) {
  const { limit, page, total, searchColumn, searchQuery} = props;

  const queryKey = ['community', limit, page, total, searchColumn, searchQuery];

  const maxPage = Math.ceil(total / limit);
  const safePage = Math.min(page, maxPage);

  const start = (safePage - 1) * limit;
  const end = Math.min(start + limit - 1, total - 1);
  
  const query = useQuery({
    queryKey,
    queryFn: () =>
      Api.getCommunityMembers(limit, start, end, searchQuery, searchColumn),
    placeholderData: (previousData) => previousData,
  });

  return { query };
}
