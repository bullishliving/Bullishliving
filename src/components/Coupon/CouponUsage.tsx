import { useEffect, useState } from 'react';

import useGetCouponUsage from "@/api/query/useGetCouponUsage";

import { usePagination } from "@/hooks/usePagination";

import { formatDate } from '@/utils/helperFunctions';

import UiAdminPaginator from '../ui/UiAdminPaginator';
import UiTable, { Header } from '../ui/UiTable';
import UiMobileDataList from '../ui/UiMobileDataList';
import UiLoader from '../ui/UiLoader';

interface Props {
  couponId: number;
}

export default function CouponUsage({ couponId }: Props) {
  const [limit, setLimit] = useState<number>(5);
  const [totalCouponUsageCount, setTotalCouponUsageCount] = useState<number | undefined>(undefined);
  
  const {
    decreasePage,
    increasePage,
    isNextDisabled,
    isPrevDisabled,
    page,
    totalPages,
  } = usePagination({
    dataLimit: limit,
    totalData: totalCouponUsageCount || 0,
  });

  const {
    query: { data: couponUsage, isLoading },
  } = useGetCouponUsage({
    filters: [{ column: 'discount_code_id', value: Number(couponId)}],
    limit,
    page,
    total: totalCouponUsageCount || 0, 
  });

  const headers: Header[] = [
    {
      query: 'customer',
      title: 'Customer',
    },
    {
      query: 'dateUsed',
      title: 'Date used',
    },
    {
      query: 'order',
      title: 'Order',
    },
    {
      query: 'commission',
      title: 'Commission',
    },
  ];

  const tableNodes = couponUsage?.data.map((usage) => ({
    id: `${usage.id}`,
    customer: <div className="h-14 flex items-center">{usage.customer}</div>,
    dateUsed: formatDate(usage.created_at, 'MMMM D, YYYY'),
    order: usage.order_id,
    commission: `₦${Math.ceil(usage.commission).toLocaleString()}`,
  }));

  useEffect(() => {
    if (couponUsage?.count !== undefined) {
      setTotalCouponUsageCount(couponUsage.count);
    }
  }, [couponUsage?.count]);

  if (isLoading) {
    return <UiLoader/>
  };
  
    return (
      <>
        {tableNodes && (
          <>
            <>
              <div className="hidden md:block">
                <UiTable data={tableNodes} headers={headers} />
              </div>
              <div className="md:hidden">
                <UiMobileDataList data={tableNodes} headers={headers} />
              </div>
            </>
            <div className="mt-4">
              <UiAdminPaginator
                decreasePage={decreasePage}
                increasePage={increasePage}
                isNextDisabled={isNextDisabled}
                isPrevDisabled={isPrevDisabled}
                limit={limit}
                page={page}
                setLimit={setLimit}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </>
    );
}


