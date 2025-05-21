import { useState, useEffect } from 'react'

import { Api } from '@/api/supabaseService';
import { SupabaseTables } from '@/types/enums/SupabaseTables';
import Coupon from '@/types/Coupon';

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';
import showToast from '../ui/UiToast';
import useToggle from '@/hooks/useToggle';
import UiLoader from '../ui/UiLoader';

export default function MysteryDiscountCoupon() {
  const [ coupon, setCoupon] = useState<Coupon | null>(null);
  const [isError, setIsError] = useState(false);
  const loading = useToggle()

  const copyCouponCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      showToast('coupon code copied', 'success');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchCoupon() {
      try {
        loading.on();
        const coupon = await Api.selectRow<Coupon>(
          SupabaseTables.DISCOUNT_CODES,
          21
        );
        setCoupon(coupon);
      } catch (error) {
        console.log(error);
        setIsError(true)
      } finally{
        loading.off()
      }
    
    }
    fetchCoupon();
  }, [])

  if (isError) {
    return 'opps, an error occured!';
  }

  if(loading.value ) {
    return <UiLoader/>
  }

  return (
    <>
      <p className="text-center text-sm font-bold font-montserrat mb-6">
        You’ve <span className="text-danger-400">unlocked</span> :{' '}
        {coupon?.amount}% Discount
      </p>
      <div className="bg-[#F4F4F4] rounded-lg text-center font-montserrat py-4 mb-8">
        <p className="mb-2 text-sm text-grey-900">Discount code</p>
        <h3 className="font-bold text-secondary-500">{coupon?.name}</h3>
      </div>
      <UiButton onClick={() => copyCouponCode(coupon?.name || '')}>
        {' '}
        <UiIcon icon="Copy" size="24" /> Copy code
      </UiButton>
    </>
  );
}
