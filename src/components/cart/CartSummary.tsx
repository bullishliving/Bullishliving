
import CartItem from '@/types/CartItem';

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';

interface Props {
  onAction?: VoidFunction;
  label: string;
  cartItems: CartItem[]
  loading?: boolean;
  deliveryFee?: number;
}

export default function CartSummary({ onAction, loading, cartItems, label, deliveryFee }: Props) {
  console.log(cartItems);

  const { totalDiscount, totalDiscountedPrice, totalPrice } = cartItems.reduce(
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

  return (
    <aside className="sticky top-6 md:col-span-1 md:border md:border-[#1212121F] rounded-[8px] h-fit md:p-4 pb-6 font-montserrat">
      <h3 className="font-bold  pb-8">SUMMARY</h3>
      <div className="grid gap-6 pb-4 mb-6 border-b border-grey-300">
        <div className="flex justify-between">
          <p className="text-sm text-tertiary-700">Subtotal</p>
          <p className="font-bold test-base">₦{totalPrice.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-tertiary-700">Discount</p>
          <p className="font-bold test-base">
            ₦{totalDiscount.toLocaleString()}
          </p>
        </div>
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
          ₦{(totalDiscountedPrice + (deliveryFee ?? 0)).toLocaleString()}
        </p>
      </div>
      <UiButton rounded="md" type="submit" loading={loading} onClick={onAction}>
        {label}
        <UiIcon icon="ArrowDiagonal" size="22" />
      </UiButton>
    </aside>
  );
}
