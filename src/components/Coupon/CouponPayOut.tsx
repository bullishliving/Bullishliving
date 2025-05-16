import { useEffect, useState } from 'react';

import useGetCouponPayOutHistory from '@/api/query/useGetCouponPayOutHistory';

import { usePagination } from "@/hooks/usePagination";

import { formatDate } from '@/utils/helperFunctions';

import UiMobileDataList from '../ui/UiMobileDataList';
import UiAdminPaginator from '../ui/UiAdminPaginator';
import UiTable, { Header } from '../ui/UiTable';
import UiLoader from '../ui/UiLoader';

interface Props {
  couponId: number;
}

export default function CouponPayout({ couponId }: Props) {
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
    query: { data: couponPayOutHistory, isLoading },
  } = useGetCouponPayOutHistory({
    filters: [{ column: 'coupon_id', value: Number(couponId) }],
    limit,
    page,
    total: totalCouponUsageCount || 0,
  });

  const headers: Header[] = [
    {
      query: 'date',
      title: 'Date',
    },
    {
      query: 'amount',
      title: 'Amount',
    },
  ];

  const tableNodes = couponPayOutHistory?.data.map((history) => ({
    id: `${history.id}`,
    date: (
      <div className="h-14 flex items-center">
        {formatDate(history.created_at, 'MMMM D, YYYY')}
      </div>
    ),
    amount: `₦${Math.ceil(history.amount).toLocaleString()}`,
  }));

  useEffect(() => {
    if (couponPayOutHistory?.count !== undefined) {
      setTotalCouponUsageCount(couponPayOutHistory.count);
    }
  }, [couponPayOutHistory?.count]);

  if (isLoading) {
    return <UiLoader/>
  }
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


