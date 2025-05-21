'use client'

import { JSX, useState } from 'react';

import UiModal from '../ui/UiModal';

import MysteryDiscountCoupon from './MysteryDiscountCoupon';
import UnlockMysteryCouponForm from "./UnlockMysteryCouponForm";

//--

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export type View = 'form' | 'coupon';

export default function MysteryDiscountModal({ isOpen, onClose }: Props) {
  const [activeView, setActiveView] = useState<View>('form');

  const components: Record<typeof activeView, JSX.Element> = {
    form: <UnlockMysteryCouponForm setActiveView={handleActiveView} />,
    coupon: <MysteryDiscountCoupon />,
  };

  function handleActiveView(view: View) {
    setActiveView(view);
  }

  return (
    <UiModal title="Congratulations🥳" isOpen={isOpen} onClose={onClose}>
      {components[activeView]}
    </UiModal>
  );
}
