'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import NaijaStates from 'naija-state-local-government';

import { Api } from '@/api/supabaseService';

import { locationPrices } from '@/utils/constant';

import useObjectState from '@/hooks/useObjectState';
import usePayment from '@/hooks/usePayment';
import useToggle from '@/hooks/useToggle';

import { useCartStore } from '@/Store/CartStore';

import CartItem from '@/types/CartItem';

import { CartHandler } from '@/utils/CartHandler';
import CheckoutSchema from '@/utils/schemas/CheckoutSchema';

import CartSummary from '../cart/CartSummary';

import UiInput from '../ui/UiInput';
import UiSelect, { Option } from '../ui/UiSelect';

import UiForm from '../ui/UiForm';
import showToast from '../ui/UiToast';
import UiButton from '../ui/UiButton';


export default function CheckoutForm() {
  const [selectedState, setSelectedState] = useState<string>('');
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState('');
  const [storedDiscountCode, setStoredDiscountCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const loading = useToggle();
  const isCouponLoading = useToggle();

  const isBuyNow = searchParams.has('buynow');

  const { cartItems, buyNowItem, refreshBuyNow, refreshCartItems } = useCartStore();

  const itemsToProcess = isBuyNow ? ([buyNowItem || {}] as CartItem[]) : cartItems;

  console.log(itemsToProcess);
  
    
  const formData = useObjectState({
    email: '',
    firstName: '',
    lastName: '',
    state: '',
    city: '',
    postalCode: '',
    address: '',
    apartment: '',
    phone: '',
  });

  function handleDiscountCodeChange(value: string) {
    setDiscountCode(value)
  };

  const { pay } = usePayment(itemsToProcess, {
    email: formData.value.email,
    first_name: formData.value.firstName,
    last_name: formData.value.firstName,
    phone: formData.value.phone,
  }, deliveryFee, discountPercentage);

  const stateOptions: Option[] = useMemo(() => {
    return NaijaStates.states().map((state: string) => ({
      label: state,
      value: state,
    }));
  }, []);

  const cityOptions : Option[] | null = useMemo(() => {
    if(selectedState === '') return null
    return NaijaStates.lgas(selectedState).lgas.map((lga: string) => ({
      label: lga,
      value: lga,
    }));

  }, [selectedState]);

  function clearCart() {
    if(isBuyNow){
      CartHandler.removeBuyNowItem()
      refreshBuyNow()
    } else {
      CartHandler.clearCart()
      refreshCartItems()
    }
  }
  
  async function sendMail() {
   await fetch('/api/mail/order-creation', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       cartItems: itemsToProcess,
       customerDetails: {
         name: `${formData.value.lastName} ${formData.value.firstName}`,
         email: formData.value.email,
         address: `${formData.value.address} ${formData.value.state} ${formData.value.city}`,
       },
     }),
   });    
  }

  async function getCoupon() {
    try {
      isCouponLoading.on()
      const { amount } =  await Api.getCoupon(discountCode);
      setDiscountPercentage(Number(amount))
      setStoredDiscountCode(discountCode);
      showToast('discount applied', 'success')
      setDiscountCode('')
    } catch (error) {
      console.error(error);
      showToast('error applying discount', 'error');
    } finally {
      isCouponLoading.off();
    }
  }

  async function handleSubmit() {
    try {
      loading.on();
      const [canFulfillResponse] = await Api.canFulfillOrder(itemsToProcess);

      if (!canFulfillResponse.can_fulfill) {
        showToast('Not enough stock for at least one item', 'error');
        return;
      }

      const paystackConfig = await pay();
      const formValue = formData.value;

      if (!paystackConfig) return;
      
      const handler = (window as any).PaystackPop?.setup({
        ...paystackConfig,
        key: paystackConfig.publicKey,
        callback: () => {
          
        Api.createOrder({
          address: formValue.address,
          amount: paystackConfig.orderAmount,
          delivery_fee: deliveryFee,
          apartment: formValue.apartment || null,
          customer: `${formValue.lastName} ${formValue.firstName}`,
          email: formValue.email,
          city: formValue.city || null,
          is_payment_verified: false,
          items: itemsToProcess,
          paystack_reference: paystackConfig.reference,
          phone: formValue.phone,
          postal_code: formValue.postalCode || null,
          state: formValue.state,
          discount_code: storedDiscountCode || null,
        }).then(() => {
          Api.reduceStock(cartItems);

          sendMail();

          showToast('order created!', 'success');

          formData.reset();

          clearCart();

          router.push('/products');
        });
        },
        onClose: () => {
          loading.off();
        },
      });

      if (handler) {
        handler.openIframe();
      } else {
        alert('Paystack SDK not loaded');
      }
    } catch (error) {
      console.log(error);
      showToast('error creating order', 'error');
      
    } finally {
      loading.off()
    }
  }

  useEffect(() => {
    const scriptId = 'paystack-js';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (formData.value.state.toLocaleLowerCase() !== 'lagos') {
      setDeliveryFee(9000);
    } else if (formData.value.city !== '') {
      setDeliveryFee(
        locationPrices[
          formData.value.city as keyof typeof locationPrices
        ]
      );
    }
  }, [formData.value.city, formData.value.state]);

  useEffect(() => {
    refreshBuyNow();
  }, [refreshBuyNow]);

  return (
    <UiForm
      formData={formData.value}
      onSubmit={handleSubmit}
      schema={CheckoutSchema}
    >
      {({ errors }) => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <main className="md:col-span-2">
            <div className="grid gap-4 md:gap-6">
              <UiInput
                name="email"
                onChange={formData.set}
                value={formData.value.email}
                label="Email Address"
                placeholder="Enter email address"
                error={errors.email}
              />
              <div className="grid sm:grid-cols-2 gap-6">
                <UiInput
                  name="firstName"
                  onChange={formData.set}
                  value={formData.value.firstName}
                  label="First Name"
                  placeholder="Enter first name"
                  error={errors.firstName}
                />
                <UiInput
                  name="lastName"
                  onChange={formData.set}
                  value={formData.value.lastName}
                  label="Last Name"
                  placeholder="Enter Last name"
                  error={errors.lastName}
                />
              </div>
              <div className="grid  md:grid-cols-3 gap-6">
                <UiSelect
                  name="state"
                  options={stateOptions}
                  onChange={(e) => {
                    formData.set(e);
                    setSelectedState(e.value as string);
                  }}
                  value={formData.value.state}
                  placeholder="Select state"
                  label="State"
                  error={errors.state}
                  isSearchable
                />
                <UiSelect
                  name="city"
                  options={cityOptions || []}
                  onChange={formData.set}
                  value={formData.value.city}
                  label="City"
                  placeholder="Select City"
                  disabled={selectedState === ''}
                  error={errors.city}
                  isSearchable
                />
                <UiInput
                  name="postalCode"
                  onChange={formData.set}
                  value={formData.value.postalCode}
                  label="Postal code(Optional)"
                  placeholder="Enter postal code"
                />
              </div>
              <UiInput
                name="address"
                onChange={formData.set}
                value={formData.value.address}
                label="Shipping Address"
                placeholder="Enter Shipping address"
                error={errors.address}
              />
              <UiInput
                name="apartment"
                onChange={formData.set}
                value={formData.value.apartment}
                label="Apartment(Optional)"
                placeholder="E.g Apartment /Suite"
              />
              <UiInput
                name="phone"
                type="phone"
                onChange={formData.set}
                value={formData.value.phone}
                label="Phone Number"
                error={errors.phone}
              />
            </div>
          </main>
          <div className="sticky top-28">
            <CartSummary
              deliveryFee={deliveryFee}
              label="Proceed to Pay"
              loading={loading.value}
              discountPercent={discountPercentage}
              cartItems={itemsToProcess}
            />
            <div className="md:border md:border-[#1212121F] mt-4 font-montserrat md:p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-sm">DISCOUNT CODE?</h3>
              <div className="flex gap-2 items-center">
                <input
                  value={discountCode}
                  onChange={(e) => handleDiscountCodeChange(e.target.value)}
                  placeholder="Enter discount code"
                  className="border border-grey-300 rounded-lg px-4 h-10 outline-none w-full placeholder:text-tertiary-700 placeholder:text-sm"
                />
                <div className="w-[130px]">
                  <UiButton
                    onClick={getCoupon}
                    loading={isCouponLoading.value}
                    size="sm"
                    rounded="md"
                    variant="primary-outlined"
                  >
                    Apply
                  </UiButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </UiForm>
  );
}
