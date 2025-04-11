import { useQuery } from '@tanstack/react-query';

import { Api } from '../supabaseService';

export default function useGetOrdersQuery(props: {
  page: number;
  limit: number;
  total: number;
  searchQuery?: string;
  searchColumn?: string;
  filters?: { column: string; value: any }[];
}) {
  const { limit, page, total, filters, searchColumn, searchQuery } = props;

  const queryKey = ['orders', limit, page, total, filters, searchColumn, searchQuery];

  const maxPage = Math.ceil(total / limit);
  const safePage = Math.min(page, maxPage);

  const start = (safePage - 1) * limit;
  const end = Math.min(start + limit - 1, total - 1);
  
  const query = useQuery({
    queryKey,
    queryFn: () => Api.getOrders(
      limit,
      start,
      end,
      searchQuery,
      searchColumn,
      filters
    )
  });

  return { query };
}
