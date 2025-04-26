
import CartItem from '@/types/CartItem';

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';
import { useMemo } from 'react';

interface Props {
  onAction?: VoidFunction;
  label: string;
  cartItems: CartItem[]
  loading?: boolean;
  deliveryFee?: number;
  discountPercent?: number;
}

export default function CartSummary({ onAction, loading, cartItems, label, deliveryFee, discountPercent }: Props) {
  const { totalDiscount, totalDiscountedPrice, totalPrice } = useMemo(() => {
    return cartItems.reduce(
      (total, item) => {
        const discountedPrice = item?.product_discounted_price || 0;
        const price = item?.product_price || 0;
        const quantity = item?.quantity || 0;

        if (discountedPrice) {
          total.totalDiscount += (price - discountedPrice) * quantity;
        }

        total.totalPrice += price * quantity;

        if (discountedPrice) {
          total.totalDiscountedPrice += discountedPrice * quantity;
        } else {
          total.totalDiscountedPrice += price * quantity;
        }

        return total;
      },
      {
        totalPrice: 0,
        totalDiscount: 0,
        totalDiscountedPrice: 0,
      }
    );
  }, [cartItems]);

  console.log(discountPercent);

  const couponDiscountAmount = useMemo(() => {
    if (!discountPercent) return 0;
      
    return (discountPercent / 100) * totalDiscountedPrice;
  }, [discountPercent, totalDiscountedPrice]);
  
  const priceAfterCoupon = useMemo(() => {
    if (!discountPercent) return totalDiscountedPrice;
    return totalDiscountedPrice * ((100 - discountPercent) / 100);
  }, [totalDiscountedPrice, discountPercent]);

  const isAnyItemDiscounted = useMemo(()=> {
    return cartItems.some((item) => !!item.product_discounted_price)
  }, [cartItems])

  return (
    <aside className="md:col-span-1 md:border md:border-[#1212121F] rounded-[8px] h-fit md:p-4 pb-6 font-montserrat">
      <h3 className="font-bold  pb-8">SUMMARY</h3>
      <div className="grid gap-6 pb-4 mb-6 border-b border-grey-300">
        <div className="flex justify-between">
          <p className="text-sm text-tertiary-700">Subtotal</p>
          <div className="flex gap-2 items-center">
            <p className="font-bold test-base">
              ₦{totalDiscountedPrice.toLocaleString()}
            </p>
            {isAnyItemDiscounted && (
              <p className="font-medium text-tertiary-700 text-sm line-through">
                ₦{totalPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-tertiary-700">Discount</p>
          <p className="font-bold test-base text-danger-500">
            -₦{totalDiscount.toLocaleString()}
          </p>
        </div>
        {typeof discountPercent === 'number' && discountPercent > 0 && (
          <div className="flex justify-between">
            <p className="text-sm text-tertiary-700">Coupon Discount</p>
            <p className="font-bold text-base text-danger-500">
              -₦{couponDiscountAmount.toLocaleString()}
            </p>
          </div>
        )}

        {deliveryFee && (
          <div className="flex justify-between">
            <p className="text-sm text-tertiary-700">Delivery fee</p>
            <p className="font-bold test-base">
              ₦{deliveryFee.toLocaleString()}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between mb-8">
        <p className="text-sm text-tertiary-700">Grand total</p>
        <p className="font-bold test-base">
          ₦{(priceAfterCoupon + (deliveryFee ?? 0)).toLocaleString()}
        </p>
      </div>
      <UiButton
        disabled={cartItems.length === 0}
        rounded="md"
        type="submit"
        loading={loading}
        onClick={onAction}
      >
        {label}
        <UiIcon icon="ArrowDiagonal" size="22" />
      </UiButton>
    </aside>
  );
}
