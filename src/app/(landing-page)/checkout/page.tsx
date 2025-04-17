'use client';

import { Suspense } from 'react';

import CheckoutForm from '@/components/checkout/CheckoutForm';

import UiLoader from '@/components/ui/UiLoader';

export default function Page() {
  return (
    <section className="p-4 md:py-14 md:px-6 2xl:px-8">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-obitron font-black text-secondary-500 text-2xl mb-6">
          Checkout
        </h2>
        <Suspense fallback={<UiLoader/>}>
          <CheckoutForm />
        </Suspense>
      </div>
    </section>
  );
}
