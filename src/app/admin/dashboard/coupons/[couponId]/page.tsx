'use client'

import { useParams, useRouter } from 'next/navigation';

import useGetCouponQuery from '@/api/query/useGetCouponQuery';
import useGetMonthlyCommission from '@/api/query/useGetMonthlyCommission';
import useGetCouponUsage from '@/api/query/useGetCouponUsage';

import AnalyticsCard from '@/components/inventory/AnalyticsCard';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import SetCoupon from '@/components/Coupon/SetCoupon';
import UiDropDown from '@/components/ui/UiDropDown';
import UiIcon from '@/components/ui/UiIcon';
import UiLoader from '@/components/ui/UiLoader';
import UiButton from '@/components/ui/UiButton';

import useToggle from '@/hooks/useToggle';

export default function Page() {
  const { couponId } = useParams();

  const router = useRouter();

  const isSetCouponVisible = useToggle();
  const isDeleteConfirmationVisible = useToggle();
  
  const { query: { data: coupon, error, isError, isLoading: isCouponLoading }, reloadQuery } = useGetCouponQuery(Number(couponId));
  const { query: { data: monthlyEarnings, isLoading: isMonthlyEarningsLoading } } = useGetMonthlyCommission(Number(couponId));
  const { query: couponUsage } = useGetCouponUsage({
    filters: [{ column: 'discount_code_id', value: Number(couponId) }],
  });

  // const dropDownOptions = 

  const isLoading = isMonthlyEarningsLoading || isCouponLoading;
    
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
          <UiDropDown options={[]} />
        </div>
      </div>
      <div className="p-4 bg-white border border-grey-300 rounded-lg w-full flex flex-col sm:flex-row justify-between sm:items-center gap-4 font-montserrat mb-6">
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
          <UiButton disabled={coupon?.available_payout === 0}>
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
      <SetCoupon
        isOpen={isSetCouponVisible.value}
        onClose={() => isSetCouponVisible.off()}
        coupon={coupon}
      />
      <DeleteConfirmation
        isDeleteLoading={false}
        isOpen={isDeleteConfirmationVisible.value}
        onAction={() => {}}
        onClose={() => {
          isDeleteConfirmationVisible.off();
        }}
      />
    </section>
  );
}
