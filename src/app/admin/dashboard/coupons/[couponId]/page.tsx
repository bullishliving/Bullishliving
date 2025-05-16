'use client'

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Api } from '@/api/supabaseService'; 
import useGetCouponQuery from '@/api/query/useGetCouponQuery';
import useGetMonthlyCommission from '@/api/query/useGetMonthlyCommission';
import useAddCouponPayOutHistory from '@/api/mutations/coupon/useAddCouponPayOutHistory';
import useDeleteCouponMutation from '@/api/mutations/coupon/useDeleteCouponMutation';

import AnalyticsCard from '@/components/inventory/AnalyticsCard';
import CouponPayout from '@/components/Coupon/CouponPayOut';
import CouponUsage from '@/components/Coupon/CouponUsage';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import SetCoupon from '@/components/Coupon/SetCoupon';
import UiDropDown from '@/components/ui/UiDropDown';
import UiIcon from '@/components/ui/UiIcon';
import UiLoader from '@/components/ui/UiLoader';
import UiButton from '@/components/ui/UiButton';
import UiTab from '@/components/ui/UiTab';

import useToggle from '@/hooks/useToggle';
import CouponPayOutHistory from '@/types/CouponPayOutHistory';

export default function Page() {
  const [activeTab, setActiveTab] = useState('Usage history');
  const { couponId } = useParams();
  const numberCouponId = Number(couponId);

  const router = useRouter();

  const isSetCouponVisible = useToggle();
  const isDeleteConfirmationVisible = useToggle();
  
  const {
    query: {
      data: coupon,
      error,
      isError,
      isLoading: isCouponLoading,
      refetch: refetchCoupons,
    },
  } = useGetCouponQuery(numberCouponId);

  const {
    query: { data: monthlyEarnings, isLoading: isMonthlyEarningsLoading },
  } = useGetMonthlyCommission(numberCouponId);

  const {
    mutation: { mutateAsync: processPayout, isPending: isPayoutPending },
  } = useAddCouponPayOutHistory();

  const {
      mutation: { mutateAsync: deleteCoupon, isPending: isCouponDeletePending },
    } = useDeleteCouponMutation();

  const tabs = [
    {
      label: 'Usage history',
      value: 'Usage history',
    },
    {
      label: 'Payout history',
      value: 'Payout history',
    },
  ];
  
  const couponsDropdownOptions = useMemo(() => {
    return [
      {
        label: (
          <div className="flex items-center gap-2 w-[170px]">
            <UiIcon icon="Edit" size="24" />
            <p className="text-sm font-montserrat text-[#4F4F4F]">Edit</p>
          </div>
        ),
        func: () => {
          isSetCouponVisible.on()
        },
      },
      {
        label: (
          <div className="flex items-center gap-2 stroke-[#E41C11]">
            <UiIcon icon="Trash" size="24" />
            <p className="text-sm font-montserrat text-[#E41C11]">Delete</p>
          </div>
        ),
        func: () => {
          isDeleteConfirmationVisible.on();
        },
      },
    ];
    }, [isSetCouponVisible, isDeleteConfirmationVisible]);
  
  const isLoading = isMonthlyEarningsLoading || isCouponLoading;

  async function restPayout() {
    if(!coupon) return;

    processPayout({
      amount: coupon.available_payout || 0,
      coupon_id: coupon.id
    } as CouponPayOutHistory).then(()=>{
      Api.updateCoupon(coupon.id, {
        available_payout: 0
      }).then(() => {
        refetchCoupons();
      })
    })
  }

  async function DeleteCoupon() {
    await deleteCoupon(numberCouponId);
    refetchCoupons();
    isDeleteConfirmationVisible.off();
  }
    
  if (isError) {
    console.error(error);
  }

  if (isLoading) {
    return <UiLoader />;
  }

  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-[18px] md:pt-10 pb-16 md:pb-32 font-montserrat">
      <button
        onClick={() => router.back()}
        className="stroke-secondary-500 flex items-center gap-2 text-sm font-bold font-montserrat mb-6"
      >
        <UiIcon icon="ArrowLeft" />
        Back
      </button>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-secondary-500 font-bold text-2xl md:text-4xl">
          Coupon: {coupon?.name}
        </h2>
        <div className="hidden md:flex gap-6">
          <button onClick={() => isSetCouponVisible.on()}>
            <UiIcon icon="Edit" size="32" />
          </button>
          <button
            onClick={() => isDeleteConfirmationVisible.on()}
            className="stroke-danger-400"
          >
            <UiIcon icon="Trash" size="32" />
          </button>
        </div>
        <div className="md:hidden">
          <UiDropDown
            options={couponsDropdownOptions}
            align="end"
            side="bottom"
          />
        </div>
      </div>
      <div className="p-4 bg-white border border-grey-300 rounded-lg w-full flex flex-col md:flex-row justify-between ms:items-center gap-4 font-montserrat mb-6">
        <div>
          <UiIcon icon="User" size="24" />
          <h3 className="font-bold text-sm text-secondary-500 mt-4">
            Influencer
          </h3>
          <p className="text-sm text-tertiary-700 mt-2">
            {coupon?.assignee_name}
          </p>
        </div>
        <div className="md:w-[169px]">
          <UiButton
            onClick={restPayout}
            loading={isPayoutPending}
            disabled={coupon?.available_payout === 0}
          >
            Paid: Reset payout
          </UiButton>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-4">
        <AnalyticsCard
          figure={`₦${monthlyEarnings?.toLocaleString() || 0}`}
          title="This month earnings"
        />
        <AnalyticsCard
          figure={`₦${coupon?.commission.toLocaleString() || 0}`}
          title="Total earnings"
        />
        <AnalyticsCard
          figure={`₦${coupon?.available_payout.toLocaleString() || 0}`}
          title="Available payout"
        />
      </div>
      <div className="mt-8">
        <UiTab
          activeTab={activeTab}
          onActiveTabChange={(tab) => setActiveTab(tab)}
          tabs={tabs}
        />
        <div className="mt-4">
          {activeTab === 'Payout history' && (
            <CouponPayout couponId={numberCouponId} />
          )}
          {activeTab === 'Usage history' && (
            <CouponUsage couponId={numberCouponId} />
          )}
        </div>
      </div>
      <SetCoupon
        isOpen={isSetCouponVisible.value}
        onClose={() => isSetCouponVisible.off()}
        coupon={coupon}
      />
      <DeleteConfirmation
        isDeleteLoading={isCouponDeletePending}
        isOpen={isDeleteConfirmationVisible.value}
        onAction={DeleteCoupon}
        onClose={() => {
          isDeleteConfirmationVisible.off();
        }}
      />
    </section>
  );
}
