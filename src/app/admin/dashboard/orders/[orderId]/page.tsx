'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';


import { Api } from '@/api/supabaseService';
import useGetOrderQuery from '@/api/query/useGetOrderQuery';

import showToast from '@/components/ui/UiToast';
import UiButton from '@/components/ui/UiButton';
import UiIcon from '@/components/ui/UiIcon';
import UiLoader from '@/components/ui/UiLoader';
import UiMobileDataList from '@/components/ui/UiMobileDataList';
import UiPill, { PillVariant } from '@/components/ui/UiPill';
import UiTable, { Header } from '@/components/ui/UiTable';

import { OrderStatus } from '@/types/enums/OrderStatus';
import useToggle from '@/hooks/useToggle';

//---

export default function Page() {
  const { orderId } = useParams();

  const router = useRouter();
  const loading = useToggle();
  const queryClient = useQueryClient()

  const {
    query: { data: order, isLoading, error } 
  } = useGetOrderQuery(Number(orderId));

  function getPillVariant(status: OrderStatus) : {variant: PillVariant, label: string} {
    if(status === OrderStatus.INDELIVERY ) {
      return { label: 'in-delivery', variant: 'neutral' };
    } else if (status === OrderStatus.PENDING) {
      return { label: OrderStatus.PENDING, variant: 'warning' };
    }

    return { label: OrderStatus.DELIVERED, variant: 'success' };
  }

  const { label: OrderStatusLabel, variant: OrderPillVariant } = getPillVariant(order?.status || OrderStatus.PENDING)

  const copyToClipboard = async (text: string, message: string) => {
    try {
      
      await navigator.clipboard.writeText(text);
      showToast(message, 'success');
    } catch (error) {
      console.log(error);
    } 
  };

  const OrderStatusTransitions: Record<
    OrderStatus,
    { next?: OrderStatus; label?: string }
  > = {
    pending: {
      label: 'Move to: In delivery',
      next: OrderStatus.INDELIVERY,
    },
    inDelivery: {
      label: 'Move to: Delivered',
      next: OrderStatus.DELIVERED
    },
    delivered: {}
  };

  const activeStatusTransition = OrderStatusTransitions[order?.status || OrderStatus.PENDING];

  async function updateOrderStatus() {
    try {
      loading.on();
      await Api.updateOrderStatus(
        order?.id as number,
        activeStatusTransition.next!
      );
      queryClient.invalidateQueries({ queryKey: ['order', 'orders', orderId] });
      showToast('order status updated', 'success');
    } catch (error) {
      console.log(error);
      showToast('error updating order status', 'error');
    } finally {
      loading.off();
    }
  }

  const itemsHeaders: Header[] = useMemo(() => {
    return [
      {
        title: 'Item',
        query: 'item',
      },
      {
        title: 'Quantity',
        query: 'quantity',
      },
      {
        title: 'Price',
        query: 'price',
      },
    ];
  }, []);

  const mobileItemsHeaders = useMemo(() => {
    return itemsHeaders.filter((header) => header.query !== 'item');
  }, [itemsHeaders]);

  const itemsNode = useMemo(
    () =>
      order?.items.map((item) => (
        {
        id: item.id,
        topNode: (
          <div className="flex items-center gap-3 pb-2 border-b">
            <Image
              width={32}
              height={32}
              alt={item.product_name}
              src={item.product_image}
              className="w-8 h-8 rounded-lg"
            />
            <div>
              <p className="text-sm font-bold text-secondary-500 truncate w-full">
                {item.product_name}
              </p>
              {item.variant_value && (
                <p className="text-xs text-[#7D7D7D] font-normal">
                  {item.variant_value}
                </p>
              )}
            </div>
          </div>
        ),
        item: (
          <div className="flex items-center gap-3">
            <Image
              alt={item.product_name}
              src={item.product_image}
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div>
              <p className="text-secondary-500 font-bold text-sm mb-2">
                {item.product_name}
              </p>
              {item.variant_value && (
                <p className="text-xs text-[#7D7D7D] font-normal">
                  {item.variant_value}
                </p>
              )}
            </div>
          </div>
        ),
        quantity: item.quantity,
        price: `₦${item.product_price.toLocaleString()}`,
      }
    )),
    [order]
  );

  if (error) {
    console.error(error);
  }

  if (isLoading) {
    return <UiLoader />;
  }

  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-[18px] md:pt-10 pb-16 md:pb-32">
      <button
        onClick={() => router.back()}
        className="stroke-secondary-500 flex items-center gap-2 text-sm font-bold font-montserrat"
      >
        <UiIcon icon="ArrowLeft" />
        Back
      </button>
      <div className="my-6 flex flex-col md:flex-row justify-between gap-4 w-full">
        <div className="flex items-center gap-2">
          <h2 className="font-bold font-montserrat text-[40px]">
            #{order?.id}
          </h2>
          <UiPill variant={OrderPillVariant}>{OrderStatusLabel}</UiPill>
        </div>

        {order?.status !== OrderStatus.DELIVERED && (
          <div className="w-full md:w-[169px]">
            <UiButton onClick={updateOrderStatus} loading={loading.value}>
              {activeStatusTransition.label}
            </UiButton>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="p-4 bg-white border border-grey-300 rounded-lg w-full font-montserrat">
          <UiIcon icon="User" size="24" />
          <h3 className="font-bold text-sm text-secondary-500 mt-4">
            Purchased by
          </h3>
          <p className="text-sm text-tertiary-700 mt-2">{order?.customer}</p>
          <div className="text-sm text-tertiary-700 mt-2 flex flex-wrap gap-2">
            <span>{order?.email}</span> |<span>{order?.phone}</span>
            <button
              onClick={() =>
                copyToClipboard(order?.phone as string, 'phone number copied!')
              }
            >
              <UiIcon icon="Copy" size="20" />
            </button>
          </div>
        </div>
        <div className="p-4 rounded-lg w-full font-montserrat bg-secondary-500">
          <UiIcon icon="Location" size="24" />
          <h3 className="font-bold text-sm text-white mt-4">
            Delivery details
          </h3>
          <div className="text-[#BFBFBF] text-sm flex flex-wrap gap-2 mt-2">
            <p>{order?.address}</p>
            <button
              onClick={() =>
                copyToClipboard(order?.address as string, 'Address copied!')
              }
            >
              <UiIcon icon="Copy" size="20" />
            </button>
          </div>
          <div className="text-[#BFBFBF] text-sm mt-1 flex gap-2 items-center">
            <span>
              {order?.city} {order?.state} {order?.country}
            </span>{' '}
            {order?.apartment && (
              <div className="flex items-center gap-2">
                |<span>{order.apartment}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {itemsNode && (
        <div className="sm:bg-white rounded-lg sm:p-4 font-montserrat">
          <div className="w-full flex justify-between mb-4">
            <h3 className="font-bold text-secondary-500">
              Items ({order?.items.length})
            </h3>
            <h3 className="font-bold text-secondary-500">
              Total: ₦{order?.amount.toLocaleString()}
            </h3>
          </div>
          <div>
            <div className="hidden sm:block">
              <UiTable data={itemsNode} headers={itemsHeaders} />
            </div>
            <div className="sm:hidden">
              <UiMobileDataList data={itemsNode} headers={mobileItemsHeaders} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
