'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import useGetOrderStatusCountsQuery from '@/api/query/useGetOrderStatusCountsQuery';
import useGetOrdersQuery from '@/api/query/useGetOrdersQuery';

import AdminBasePage from '@/components/layout/AdminBasePage';
import OrderStatusFilter from '@/components/OrderStatusFilter';
import SearchInput from '@/components/ui/SearchInput';
import UiAdminPaginator from '@/components/ui/UiAdminPaginator';
import UiButton from '@/components/ui/UiButton';
import UiLoader from '@/components/ui/UiLoader';
import UiTable, { Header } from '@/components/ui/UiTable';
import UiMobileDataList from '@/components/ui/UiMobileDataList';

import { usePagination } from '@/hooks/usePagination';

import { OrderStatus } from '@/types/enums/OrderStatus';

import { formatDate } from '@/utils/helperFunctions';
import UiDropDown from '@/components/ui/UiDropDown';
import UiIcon from '@/components/ui/UiIcon';

//---

export default function Page() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus>(
    OrderStatus.PENDING
  );
  const [limit, setLimit] = useState<number>(10);
  const [totalOrders, setTotalOrders] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    query: {
      data: orderStatusCounts,
      error: orderStatusError,
      isLoading: isOrderStatusLoading,
    },
  } = useGetOrderStatusCountsQuery();

  const {
    decreasePage,
    increasePage,
    isNextDisabled,
    isPrevDisabled,
    page,
    totalPages,
  } = usePagination({ dataLimit: limit, totalData: totalOrders || 0 });

  const {
    query: { data: orderdData, error: ordersError,},
  } = useGetOrdersQuery({
    page,
    limit,
    total: totalOrders || 0,
    filters: [{ column: 'status', value: activeStatus }],
    searchColumn: 'orders_id_customer',
    searchQuery,
  });

  const isLoading = isOrderStatusLoading ;
  const isError = orderStatusError || ordersError;

  function getStatusLabel(status: OrderStatus) {
    if (status === OrderStatus.PENDING) {
      return 'Received';
    } else if (status === OrderStatus.INDELIVERY) {
      return 'In-Delivery';
    }
    return 'Delivered';
  }

  function handleActiveStatus(status: OrderStatus) {
    setActiveStatus(status);
  }

  function handleSearchQuery(query: string) {
    setSearchQuery(query);
  }

  const filters = orderStatusCounts?.map((status) => ({
    count: status.count,
    label: getStatusLabel(status.status),
    status: status.status,
  }));

  const ordersHeaders: Header[] = useMemo(() => [
    {
      title: 'ID',
      query: 'orderId',
    },
    {
      title: 'Customer',
      query: 'customer',
    },
    {
      title: 'Amount',
      query: 'amount',
    },
    {
      title: 'Order date',
      query: 'orderDate',
    },
    {
      title: 'Action',
      query: 'action',
    },
  ], []);

  const mobileOrdersHeaders = useMemo(() => {
    return ordersHeaders.filter((header) => header.query !== 'action');
  }, [ordersHeaders]);

  const orderTableNode = useMemo(
    () =>
      orderdData?.data.map((order) => ({
        id: `${order.id}`,
        orderId: <p>{`#${order.id}`}</p>,
        customer: <p className="capitalize">{order.customer}</p>,
        amount: <p>{order.amount.toLocaleString()}</p>,
        orderDate: formatDate(order.created_at, 'DD-MM-YY, hh:mmA'),
        action: (
          <div className="max-w-28">
            <Link href={`./orders/${order.id}`}>
              <UiButton size="md" rounded="md" variant="tertiary-outlined">
                View details
              </UiButton>
            </Link>
          </div>
        ),
        bottomNode: (
          <Link href={`./orders/${order.id}`}>
            <UiButton size="md" rounded="md" variant="tertiary-outlined">
              View details
            </UiButton>
          </Link>
        ),
      })),
    [orderdData]
  );

  
  useEffect(() => {
    if (orderdData?.count !== undefined) {
      setTotalOrders(orderdData.count);
    }
  }, [orderdData?.count]);

  if (isError) {
    console.error({ orderStatusError });
  }

  if (isLoading) {
    return <UiLoader />;
  }

  return (
    <AdminBasePage title="All Orders">
      <div className="mb-6">
        <OrderStatusFilter
          activeStatus={activeStatus}
          handleActiveStatus={handleActiveStatus}
          filters={filters || []}
        />
      </div>

      <div className="md:bg-white md:p-4 rounded-[8px]">
        <div className="w-full font-montserrat mb-4">
          <div className="w-full font-montserrat mb-6 md:mb-4 flex flex-col sm:flex-row justify-between md:items-center gap-4">
            <h3 className="font-bold text-secondary-500">All Orders</h3>
            <div className="flex items-center gap-4">
              <div className="w-full md:max-w-[240px]">
                <SearchInput
                  placeholder="Customer or ID..."
                  searchQuery={searchQuery}
                  setSearchQuery={handleSearchQuery}
                />
              </div>
              <UiDropDown
                options={[]}
                align="start"
                side="bottom"
                trigger={
                  <div className="w-[116px] bg-transparent border border-grey-300 hover:bg-grey-100 h-10 rounded-lg flex gap-2 items-center justify-center font-bold text-sm">
                    <div className="flex gap-1 items-center stroke-secondary-500 px-2">
                      <p className="text-xs"> This week</p>
                      <UiIcon icon="CaretDown" size="16" />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
          <div>
            {orderTableNode && (
              <div>
                <div className="hidden md:block">
                  <UiTable data={orderTableNode} headers={ordersHeaders} />
                </div>
                <div className="md:hidden">
                  <UiMobileDataList
                    data={orderTableNode}
                    headers={mobileOrdersHeaders}
                  />
                </div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminBasePage>
  );
}
