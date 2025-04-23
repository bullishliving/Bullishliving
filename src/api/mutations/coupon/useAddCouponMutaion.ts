'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';

import showToast from '@/components/ui/UiToast';

import Coupon from '@/types/Coupon';

import { Api } from '../../supabaseService';

export default function useAddCouponMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (coupon: Coupon) => Api.createCoupon(coupon),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] }); 
      showToast('coupon created successfully', 'success');
    },

    onError: (error) => {
      console.error(error);
      showToast('error creating coupon', 'error');
    },
  })

  return { mutation }
};
