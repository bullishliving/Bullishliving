import { useQuery } from "@tanstack/react-query";

import { Api } from "../supabaseService";

export default function useGetCouponUsage(props: {
  page: number;
  limit: number;
  total: number;
  filters?: { column: string; value: any }[];
}) {
  const { filters, limit, page, total } = props;

  const maxPage = Math.ceil(total / limit);
  const safePage = Math.min(page, maxPage);

  const start = (safePage - 1) * limit;
  const end = Math.min(start + limit - 1, total - 1);

  const query = useQuery({
    queryKey: ['couponUsage', filters, limit, page, total],
    queryFn: () => Api.getCoupnUsage(limit, start, end, filters),
    placeholderData: (previousData) => previousData,
  })

  return { query }
  
}
