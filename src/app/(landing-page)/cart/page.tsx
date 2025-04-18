'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import MobileCartItem from '@/components/cart/MobileCartItem';
import QuantityIncrementor from '@/components/products/QuantityIncrementor';
import UiIcon from '@/components/ui/UiIcon';
import UiTable, { Header } from '@/components/ui/UiTable';

import { useCartStore } from '@/Store/CartStore';

//---

export default function Page() {
  const { cartItems, updateQuantity, removeItem } = useCartStore();
  const router = useRouter();

  const cartHeaders: Header[] = [
    {
      query: 'products',
      title: 'PRODUCTS(S)',
    },
    {
      query: 'quantity',
      title: 'QUANTITY',
    },
    {
      query: 'price',
      title: 'PRICE',
    },
    {
      query: 'action',
      title: 'ACTION',
    },
  ];

  const cartData = cartItems.map((item) => {
    return {
      id: item.id,
      products: (
        <div className="flex gap-3">
          <Image
            src={item.product_image}
            alt="product image"
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <p className="text-sm text-secondary-500 font-bold mb-2">
              {item.product_name}
            </p>
            {item.variant_value && <p>{item.variant_value}</p>}
          </div>
        </div>
      ),
      quantity: (
        <QuantityIncrementor
          decreaseQuantity={() => {
            if (item.quantity > 1) {
              updateQuantity(item.id, item.quantity - 1);
            }
          }}
          increaseQuantity={() => {
            updateQuantity(item.id, item.quantity + 1);
          }}
          quantity={item.quantity}
        />
      ),
      price: (
        <p>
          ₦
          {(
            item.product_discounted_price ?? item.product_price
          ).toLocaleString()}
        </p>
      ),
      action: (
        <button onClick={() => removeItem(item.id)} className="stroke-tertiary-700">
          {' '}
          <UiIcon icon="Trash" size="24" />
        </button>
      ),
    };
  });


  return (
    <section className="p-4 md:py-14 md:px-6 2xl:px-8">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-obitron font-black text-secondary-500 text-2xl mb-4">
          Your Cart
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <main className=" md:col-span-2">
            {cartItems.length < 1 ? (
              <EmptyCart />
            ) : (
              <div>
                <div className="hidden md:block">
                  <UiTable size="lg" data={cartData} headers={cartHeaders} />
                </div>
                <div className="md:hidden grid gap-4">
                  {cartItems.map((item) => (
                    <MobileCartItem cartItem={item} key={item.id} />
                  ))}
                </div>
              </div>
            )}
          </main>
          <CartSummary
            label="Checkout Now"
            onAction={() => {
              router.push('/checkout');
            }}
            cartItems={cartItems}
          />
        </div>
      </div>
    </section>
  );
}
