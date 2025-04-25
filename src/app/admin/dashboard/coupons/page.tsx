'use client';

import { useMemo } from 'react';
import { useState } from 'react';

import useGetCouponsQuery from '@/api/query/useGetCouponsQuery';
import useDeleteCouponMutation from '@/api/mutations/coupon/useDeleteCouponMutation';

import AdminBasePage from '@/components/layout/AdminBasePage';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import SetCoupon from '@/components/Coupon/SetCoupon';
import UiButton from '@/components/ui/UiButton';
import UiDropDown, { DropDownData } from '@/components/ui/UiDropDown';
import UiIcon from '@/components/ui/UiIcon';
import UiLoader from '@/components/ui/UiLoader';
import UiMobileDataList from '@/components/ui/UiMobileDataList';
import UiTable,  { Header } from '@/components/ui/UiTable';

import useToggle from '@/hooks/useToggle';

import Coupon from '@/types/Coupon';

import { formatDate } from '@/utils/helperFunctions';

//---

export default function Page() {
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  const { query: { data: coupons, isLoading, refetch: refetchCoupons } } = useGetCouponsQuery();

  const { mutation: { mutateAsync: deleteCoupon, isPending: isCouponDeletePending } } = useDeleteCouponMutation();

  const isSetCouponVisible = useToggle();
  const isDeleteConfirmationVisible = useToggle();
  
  const couponTableHeaders: Header[] = useMemo(() => {
    return [
      {
        query: 'name',
        title: 'Name',
      },
      {
        query: 'amount',
        title: 'Amount',
      },
      {
        query: 'date',
        title: 'Date',
      },
      {
        query: 'actions',
        title: 'Actions',
      },
    ];
  }, []);

  function clearActiveCoupon(){
    setActiveCoupon(null)
  }

  async function DeleteCoupon() {
    if(!activeCoupon) throw new Error('no active coupon');
    
    await deleteCoupon(activeCoupon!.id);
    refetchCoupons()
    isDeleteConfirmationVisible.off()
  }

  const couponsDropdownOptions: DropDownData[] = useMemo(() => {
    return [
      {
        label: (
          <div className="flex items-center gap-2">
            <UiIcon icon="Edit" size="24" />
            <p className="text-sm font-montserrat text-[#4F4F4F]">Edit</p>
          </div>
        ),
        func: (__, item) => {
          setActiveCoupon(item as Coupon);
          isSetCouponVisible.on();
        },
      },
      {
        label: (
          <div className="flex items-center gap-2 stroke-[#E41C11]">
            <UiIcon icon="Trash" size="24" />
            <p className="text-sm font-montserrat text-[#E41C11]">Delete</p>
          </div>
        ),
        func: (__, item) => {
          setActiveCoupon(item as Coupon);
          isDeleteConfirmationVisible.on();
        },
      },
    ];
  }, [isSetCouponVisible, isDeleteConfirmationVisible]);

  const couponsTableNodes = useMemo(() => {
    return coupons?.map((coupon) => ({
      id: `${coupon.id}`,
      name: coupon.name,
      amount: `${coupon.amount}%`,
      date: formatDate(coupon.created_at, 'DD/MM/YYYY'),
      actions: (
        <UiDropDown
          options={couponsDropdownOptions}
          item={coupon}
          itemId={`${coupon.id}`}
          side="bottom"
        />
      ),
    }));
  }, [coupons, couponsDropdownOptions]);

  if(isLoading) {
    return <UiLoader/>
  }

  return (
    <AdminBasePage
      title="Coupons"
      edgeNode={
        <div className="min-w-[158px] fill-secondary-500">
          <UiButton onClick={() => isSetCouponVisible.on()}>
            <UiIcon icon="Coupon" size="20" />
            <p>Add Coupon</p>
          </UiButton>
        </div>
      }
    >
      <div className="md:bg-white md:p-4 rounded-[8px]">
        <div className="w-full font-montserrat mb-4">
          <div className="w-full font-montserrat mb-6 md:mb-4 flex flex-col sm:flex-row justify-between md:items-center gap-4">
            <h3 className="font-bold text-secondary-500">All Coupons</h3>
          </div>
          {couponsTableNodes && (
            <div>
              <div className="hidden sm:block">
                <UiTable
                  data={couponsTableNodes}
                  headers={couponTableHeaders}
                />
              </div>
              <div className='sm:hidden'>
                <UiMobileDataList data={couponsTableNodes} headers={couponTableHeaders} />
              </div>
            </div>
          )}
        </div>
      </div>
      <SetCoupon
        isOpen={isSetCouponVisible.value}
        onClose={() => isSetCouponVisible.off()}
        coupon={activeCoupon!}
        clearActiveCoupon={clearActiveCoupon}
      />
      <DeleteConfirmation
        isDeleteLoading={isCouponDeletePending}
        isOpen={isDeleteConfirmationVisible.value}
        onAction={DeleteCoupon}
        onClose={() => {
          setActiveCoupon(null);
          isDeleteConfirmationVisible.off();
        }}
      />
    </AdminBasePage>
  );
}
