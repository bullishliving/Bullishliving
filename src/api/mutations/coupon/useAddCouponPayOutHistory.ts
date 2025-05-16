import { useMutation, useQueryClient } from '@tanstack/react-query';

import showToast from '@/components/ui/UiToast';

import CouponPayOutHistory from '@/types/CouponPayOutHistory';

import { Api } from '../../supabaseService';

export default function useAddCouponPayOutHistory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payoutHistory: CouponPayOutHistory) => Api.addCouponPaymentHistory(payoutHistory),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['couponPayoutHistory'] }); 
      showToast('payout successful', 'success');
    },

    onError: (error) => {
      console.error(error);
      showToast('error processing payout', 'error');
    },
  })

  return { mutation }
};
