'use client'

import { useEffect } from "react";

import useAddCouponMutation from "@/api/mutations/coupon/useAddCouponMutaion";
import useUpdateCouponMutation from "@/api/mutations/coupon/useUpdateCouponMutation";

import useObjectState from "@/hooks/useObjectState";

import Coupon from "@/types/Coupon";

import SetCouponSchema from '@/utils/schemas/SetCouponSchema';

import UiModal from "../ui/UiModal";
import UiForm from "../ui/UiForm";
import UiInput from "../ui/UiInput";
import UiButton from "../ui/UiButton";

//---

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  coupon?: Coupon;
  clearActiveCoupon: VoidFunction
}

export default function SetCoupon({ isOpen, onClose, clearActiveCoupon, coupon }: Props) {
  const formData = useObjectState(
    coupon || {
      name: '',
      amount: '',
    }
  );
  
  const {
    mutation: { mutateAsync: createCoupon, isPending: isCreatePending },
  } = useAddCouponMutation();

  const { mutation: { mutateAsync: updateCoupon, isPending: isUpdatePending} } = useUpdateCouponMutation();

  const isPending = isCreatePending || isUpdatePending;

  function closeModal() {
    clearActiveCoupon()    
    formData.reset();
    onClose();
  }

  async function onSubmit() {
    try {
      if(coupon) {
        await updateCoupon({
          couponId: coupon.id,
          coupon: formData.value as Coupon
        })
      } else {
        await createCoupon(formData.value as Coupon);
      }
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (coupon) {
      formData.setValue(coupon);
    } else {
      formData.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupon]);

  return (
    <UiModal
      title={`${coupon ? 'Edit' : 'Create'} Coupon`}
      isOpen={isOpen}
      onClose={closeModal}
    >
      <UiForm
        formData={formData.value}
        onSubmit={onSubmit}
        schema={SetCouponSchema}
      >
        {({ errors }) => (
          <div className="grid gap-3">
            <UiInput
              name="name"
              roundedVariant="xl"
              onChange={formData.set}
              value={formData.value.name}
              placeholder="Enter coupon name"
              label="Name"
              error={errors.name}
            />
            <UiInput
              name="amount"
              onChange={formData.set}
              value={formData.value.amount}
              placeholder="Enter coupon amount"
              roundedVariant="xl"
              type="number"
              label="Amount"
              error={errors.amount}
            />
            <div className="mt-3">
              <UiButton loading={isPending}>
                {coupon ? 'Edit' : 'Create'} coupon
              </UiButton>
            </div>
          </div>
        )}
      </UiForm>
    </UiModal>
  );
}
