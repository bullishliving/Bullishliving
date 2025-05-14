import { useQuery } from "@tanstack/react-query";

import { Api } from "../supabaseService";

export default function useGetCouponUsage(props: {
  // page: number;
  // limit: number;
  // total: number;
  // searchQuery?: string;
  // searchColumn?: string;
  // minPrice?: number;
  // maxPrice?: number;
  // categoryIds?: number[];
  filters?: { column: string; value: any }[];
}) {

  const { filters } = props

  const query = useQuery({
    queryKey: ['couponUsage', filters],
    queryFn: () => Api.getCoupnUsage(filters)
  })

  return { query }
  
}
