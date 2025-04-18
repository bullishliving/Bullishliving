'use client'

import Image from 'next/image';

import CartItem from '@/types/CartItem';

import QuantityIncrementor from '../products/QuantityIncrementor';
import UiIcon from '../ui/UiIcon';
import { useCartStore } from '@/Store/CartStore';

interface Props { 
  cartItem: CartItem;
}

export default function MobileCartItem({ cartItem }: Props) {
    const { updateQuantity, removeItem } = useCartStore();
  
  return (
    <div className="border border-grey-300 rounded-[8px] p-4 font-montserrat">
      <div className="flex gap-3 pb-2 border-b mb-6 h-[60px]">
        <Image
          width={32}
          height={32}
          alt="product image"
          src={cartItem.product_image}
          className="w-8 h-8 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <p className="text-sm text-secondary-500 font-bold mb-2">
            {cartItem.product_name}
          </p>
          {cartItem.variant_value && (
            <p className="text-sm text-tertiary-700">
              {cartItem.variant_value}
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-tertiary-700">Quantity</p>
          <QuantityIncrementor
            decreaseQuantity={() => {
              if (cartItem.quantity > 1) {
                updateQuantity(cartItem.id, cartItem.quantity - 1);
              }
            }}
            increaseQuantity={() => {
              updateQuantity(cartItem.id, cartItem.quantity + 1);
            }}
            quantity={cartItem.quantity}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-tertiary-700">Price</p>
          <p className="text-base font-bold text-secondary-500">
            {cartItem.product_discounted_price ??
              cartItem.product_discounted_price}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm  text-tertiary-700">Action</p>
          <button
            onClick={() => removeItem(cartItem.id)}
            className="flex items-center gap-2 stroke-danger-400"
          >
            <UiIcon icon="Trash" size="24" />
            <p className="font-bold text-sm text-danger-400">Remove</p>
          </button>
        </div>
      </div>
    </div>
  );
}
