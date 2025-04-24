import { useMutation, useQueryClient } from '@tanstack/react-query';

import showToast from '@/components/ui/UiToast';

import Coupon from '@/types/Coupon';

import { Api } from '../../supabaseService';

export default function useUpdateCouponMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn : (prop: {couponId: number, coupon: Coupon}) => Api.updateCoupon(prop.couponId, prop.coupon),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] }); 
      showToast('coupon updated successfully', 'success');
    },

    onError: (error) => {
      console.error(error);
      showToast('error updated coupon', 'error');
    },
  })



  return { mutation }
}
