import { useMutation, useQueryClient } from '@tanstack/react-query';

import showToast from '@/components/ui/UiToast';

import { Api } from '../../supabaseService';

export default function useDeleteCouponMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (couponId: number) => Api.deleteCoupon(couponId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] }); 
      showToast('coupon deleted', 'success');
    },

    onError: (error) => {
      console.error(error);
      showToast('error occured when deleting coupon', 'error');
    },
  })

  return { mutation }
}
