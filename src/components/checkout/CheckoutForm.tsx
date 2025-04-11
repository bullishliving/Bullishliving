'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Country, State, City } from 'country-state-city';

import { Api } from '@/api/supabaseService';

import CheckoutSchema from '@/utils/schemas/CheckoutSchema';

import useObjectState from '@/hooks/useObjectState';
import usePayment from '@/hooks/usePayment';

import { useCartStore } from '@/Store/CartStore';
import CartSummary from '../cart/CartSummary';

import UiInput from '../ui/UiInput';
import UiSelect, { Option } from '../ui/UiSelect';

import UiForm from '../ui/UiForm';
import showToast from '../ui/UiToast';
import CartItem from '@/types/CartItem';
import { CartHandler } from '@/utils/CartHandler';
import useToggle from '@/hooks/useToggle';

export default function CheckoutForm() {
  const [countries] = useState(Country.getAllCountries());
  const [selectedCountryISO, setSelectedCountryISO] = useState<string>('');
  const [selectedStateISO, setSelectedStateISO] = useState<string>('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const loading = useToggle();

  const isBuyNow = searchParams.has('buynow');

  const { cartItems, buyNowItem, refreshBuyNow, refreshCartItems } = useCartStore();

  const itemsToProcess = isBuyNow ? ([buyNowItem || {}] as CartItem[]) : cartItems;
    
  const formData = useObjectState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    address: '',
    apartment: '',
    phone: '',
  });

  const { pay } = usePayment(itemsToProcess, {
    email: formData.value.email,
    first_name: formData.value.firstName,
    last_name: formData.value.firstName,
    phone: formData.value.phone,
  });

  const countryOptions: Option[] = useMemo(() => {
    return countries.map((country) => ({
      label: country.name,
      value: country.name,
    }));
  }, [countries]);

  const stateOptions: Option[] = useMemo(() => {
    return State.getStatesOfCountry(selectedCountryISO).map((state) => ({
      label: state.name,
      value: state.name,
    }));
  }, [selectedCountryISO]);

  const cityOptions: Option[] = useMemo(() => {
    return City.getCitiesOfState(selectedCountryISO, selectedStateISO).map(
      (city) => ({ label: city.name, value: city.name })
    );
  }, [selectedCountryISO, selectedStateISO]);

  function getSelectedCountry(name: string) {
    return countries.find((country) => country.name === name);
  }

  function getSelectedState(name: string) {
    return State.getStatesOfCountry(selectedCountryISO).find(
      (state) => state.name === name
    );
  }

  function clearCart() {
    if(isBuyNow){
      CartHandler.removeBuyNowItem()
      refreshBuyNow()
    } else {
      CartHandler.clearCart()
      refreshCartItems()
    }
  }

  async function handleSubmit() {
    loading.on()
    const [canFulfillResponse] = await Api.canFulfillOrder(itemsToProcess);
    
    if (!canFulfillResponse.can_fulfill) {
      showToast('Not enough stock for at least one item', 'error');
      return;
    }

    const paystackConfig = await pay()
    const formValue = formData.value;

    if(!paystackConfig) return;
    
    const handler = (window as any).PaystackPop?.setup({
      ...paystackConfig,
      key: paystackConfig.publicKey,
      callback: () => {
        try {
            Api.createOrder({
              address: formValue.address,
              amount: paystackConfig.amount / 100,
              apartment:
                formValue.apartment === '' ? null : formValue.apartment,
              customer: `${formValue.lastName} ${formValue.firstName}`,
              email: formValue.email,
              city: formValue.city === '' ? null : formValue.city,
              country: formValue.country,
              is_payment_verified: false,
              items: itemsToProcess,
              paystack_reference: paystackConfig.reference,
              phone: formValue.phone,
              postal_code:
                formValue.postalCode === '' ? null : formValue.postalCode,
              state: formValue.state,
            }).then(() => {
              Api.reduceStock(cartItems);
              showToast('order created!', 'success');
              formData.reset();
              clearCart();
              router.push('/products');
            });
          
        } catch (error) {
          console.log(error);
          showToast('error creating order', 'error');
        } finally {
          loading.off()
        }
        
      },
    });

    if (handler) {
      handler.openIframe()
    } else {
      alert('Paystack SDK not loaded');
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
              <UiSelect
                name="country"
                options={countryOptions}
                onChange={(e) => {
                  formData.set(e);
                  setSelectedCountryISO(
                    getSelectedCountry(e.value as string)?.isoCode || ''
                  );
                }}
                value={formData.value.country}
                label="Country"
                placeholder="Select Region"
                error={errors.country}
                isSearchable
              />
              <div className="grid  md:grid-cols-3 gap-6">
                <UiSelect
                  name="state"
                  options={stateOptions}
                  onChange={(e) => {
                    formData.set(e);
                    setSelectedStateISO(
                      getSelectedState(e.value as string)?.isoCode || ''
                    );
                  }}
                  value={formData.value.state}
                  placeholder="Select state"
                  label="State"
                  disabled={selectedCountryISO === ''}
                  error={errors.state}
                  isSearchable
                />
                <UiSelect
                  name="city"
                  options={cityOptions}
                  onChange={formData.set}
                  value={formData.value.city}
                  label="City(Optional)"
                  placeholder="Select City"
                  disabled={selectedStateISO === ''}
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
          <CartSummary loading={loading.value} cartItems={itemsToProcess}/>
        </div>
      )}
    </UiForm>
  );
}
