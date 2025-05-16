'use client';

import { useMemo } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import useGetCouponsQuery from '@/api/query/useGetCouponsQuery';
import useDeleteCouponMutation from '@/api/mutations/coupon/useDeleteCouponMutation';
import useGetTotalCommissionGenerated from '@/api/query/useGetTotalCommisionGenerated';

import AdminBasePage from '@/components/layout/AdminBasePage';
import AnalyticsCard from '@/components/inventory/AnalyticsCard';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import SetCoupon from '@/components/Coupon/SetCoupon';
import showToast from '@/components/ui/UiToast';
import UiButton from '@/components/ui/UiButton';
import UiDropDown, { DropDownData } from '@/components/ui/UiDropDown';
import UiIcon from '@/components/ui/UiIcon';
import UiLoader from '@/components/ui/UiLoader';
import UiMobileDataList from '@/components/ui/UiMobileDataList';
import UiSwith from '@/components/ui/UiSwitch';
import UiTable, { Header } from '@/components/ui/UiTable';

import useToggle from '@/hooks/useToggle';

import Coupon from '@/types/Coupon';
import { Api } from '@/api/supabaseService';

//---

export default function Page() {
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  const {
    query: { data: coupons, isLoading: isCouponsLoading, refetch: refetchCoupons },
  } = useGetCouponsQuery();

  const {
    mutation: { mutateAsync: deleteCoupon, isPending: isCouponDeletePending },
  } = useDeleteCouponMutation();

  const { query: { data: totalCommission, isLoading: isTotalCommissionLoading } } = useGetTotalCommissionGenerated();

  const isSetCouponVisible = useToggle();
  const isDeleteConfirmationVisible = useToggle();

  const router = useRouter();

  const isLoading = isCouponsLoading || isTotalCommissionLoading;

  const couponTableHeaders: Header[] = useMemo(() => {
    return [
      {
        query: 'code',
        title: 'Code',
      },
      {
        query: 'assignedTo',
        title: 'Assigned to',
      },
      {
        query: 'discount',
        title: 'Discount',
      },
      {
        query: 'commission',
        title: 'Commission',
      },
      {
        query: 'used',
        title: 'Used',
      },
      {
        query: 'status',
        title: 'Status',
      },
      {
        query: 'actions',
        title: 'Actions',
      },
    ];
  }, []);

  const mobileCouponHeaders = useMemo(() => {
    return couponTableHeaders.filter((header) => header.query !== 'actions');
  }, [couponTableHeaders]);


  function clearActiveCoupon() {
    setActiveCoupon(null);
  }

  async function DeleteCoupon() {
    if (!activeCoupon) throw new Error('no active coupon');

    await deleteCoupon(activeCoupon!.id);
    refetchCoupons();
    isDeleteConfirmationVisible.off();
  }

  const copyCouponCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      showToast('coupon code copied', 'success');
    } catch (error) {
      console.log(error);
    }
  };

  const couponsDropdownOptions: DropDownData[] = useMemo(() => {
    return [
      {
        label: (
          <div className="flex items-center gap-2">
            <UiIcon icon="Eye" size="24" />
            <p className="text-sm font-montserrat text-[#4F4F4F]">
              See details
            </p>
          </div>
        ),
        func: (itemId) => {
          router.push(`./coupons/${itemId}`)
        },
      },
      {
        label: (
          <div className="flex items-center gap-2 w-[170px]">
            <UiIcon icon="Edit" size="24" />
            <p className="text-sm font-montserrat text-[#4F4F4F]">Edit</p>
          </div>
        ),
        func: (__, item: any) => {
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
        func: (__, item: any) => {
          setActiveCoupon(item as Coupon);
          isDeleteConfirmationVisible.on();
        },
      },
    ];
  }, [isSetCouponVisible, isDeleteConfirmationVisible, router]);

  const couponsTableNodes = useMemo(() => {
    async function toggleActiveStatus(couponId: number, status: boolean) {
      try {
        await Api.toggleCouponStatus(couponId, status);
        refetchCoupons();
        showToast('Coupon Status Updated!', 'success');
      } catch (error) {
        console.log(error);
        showToast('Error updating coupon status', 'error');
        throw new Error(`An error occured ${error}`);
      }
    }

    return coupons?.map((coupon) => ({
      id: `${coupon.id}`,
      code: (
        <button
          onClick={() => copyCouponCode(coupon.name)}
          className="outline-none stroke-secondary-500 hover:!stroke-primary-500 text-secondary-500 hover:text-primary-500 transition-colors duration-75 ease-in flex items-center gap-2"
        >
          <UiIcon icon="Copy" size="20" />
          {coupon.name}
        </button>
      ),
      assignedTo: coupon.assignee_name,
      discount: `${coupon.amount}%`,
      commission: `₦${coupon.commission.toLocaleString()}`,
      used: coupon.times_used,
      status: (
        <UiSwith
          onChange={() => toggleActiveStatus(coupon.id, !coupon.is_active)}
          value={coupon.is_active}
        />
      ),
      actions: (
        <UiDropDown
          options={couponsDropdownOptions}
          item={coupon}
          itemId={`${coupon.id}`}
          side="bottom"
        />
      ),
      bottomNode: (
        <div className="flex justify-center items-center gap-8 pt-6 border-t">
          <Link href={`./coupons/${coupon.id}`}>
            <UiIcon icon="Eye" size="24" />
          </Link>
          <button onClick={() => {
            setActiveCoupon(coupon);
            isSetCouponVisible.on();
          }} className={`stroke-tertiary-700`}>
            <UiIcon icon="Edit" size="24" />
          </button>
          <button onClick={() => {
            setActiveCoupon(coupon);
            isDeleteConfirmationVisible.on();
          }} className=" gap-2 stroke-tertiary-700">
            <UiIcon icon="Trash" size="24" />
          </button>
        </div>
      ),
    }));
  }, [coupons, couponsDropdownOptions, isDeleteConfirmationVisible, isSetCouponVisible, refetchCoupons]);

  if (isLoading) {
    return <UiLoader />;
  }

  return (
    <AdminBasePage
      title="Coupons"
      edgeNode={
        <div className="min-w-[190px] fill-secondary-500">
          <UiButton onClick={() => isSetCouponVisible.on()}>
            <UiIcon icon="Add" size="18" />
            <p>New Coupon Code</p>
          </UiButton>
        </div>
      }
    >
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4">
        <AnalyticsCard
          title="Active coupons"
          figure={`${coupons?.length || 0}`}
        />
        <AnalyticsCard
          title="Commission generated"
          figure={`₦${Math.ceil(totalCommission || 0).toLocaleString()}`}
        />
      </div>
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
              <div className="sm:hidden">
                <UiMobileDataList
                  data={couponsTableNodes}
                  headers={mobileCouponHeaders}
                />
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
