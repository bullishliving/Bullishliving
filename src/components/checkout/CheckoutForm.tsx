'use client'

import { useMemo, useState } from 'react';
import { Country, State, City } from 'country-state-city';


import useObjectState from '@/hooks/useObjectState';

import CartSummary from '../cart/CartSummary';

import UiInput from '../ui/UiInput';
import UiSelect, { Option } from '../ui/UiSelect';


import UiForm from '../ui/UiForm';

export default function CheckoutForm() {
  const [countries] = useState(Country.getAllCountries());
  const [selectedCountryISO, setSelectedCountryISO] = useState<string>('');
  const [selectedStateISO, setSelectedStateISO] = useState<string>('');

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

  function handleSubmit() {
    console.log(formData.value);
  }

  const countryOptions: Option[] = useMemo(()=>{
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
  return countries.find((country) => country.name === name )
 }

 function getSelectedState(name: string) {
  return State.getStatesOfCountry(selectedCountryISO).find((state)=> state.name === name)
 }

 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <main className="md:col-span-2">
        <UiForm formData={formData.value} onSubmit={handleSubmit}>
          {({}) => (
            <div className="grid gap-4 md:gap-6">
              <UiInput
                name="email"
                onChange={formData.set}
                value={formData.value.email}
                label="Email Address"
                placeholder="Enter email address"
              />
              <div className="grid sm:grid-cols-2 gap-6">
                <UiInput
                  name="firstName"
                  onChange={formData.set}
                  value={formData.value.firstName}
                  label="First Name"
                  placeholder="Enter first name"
                />
                <UiInput
                  name="lastName"
                  onChange={formData.set}
                  value={formData.value.lastName}
                  label="Last Name"
                  placeholder="Enter Last name"
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
                  isSearchable
                />
                <UiSelect
                  name="city"
                  options={cityOptions}
                  onChange={formData.set}
                  value={formData.value.city}
                  label="City"
                  placeholder="Select City"
                  disabled={selectedStateISO === ''}
                  isSearchable
                />
                <UiInput
                  name="postalCode"
                  onChange={formData.set}
                  value={formData.value.postalCode}
                  label="Postal code"
                  placeholder="Enter postal code"
                />
              </div>
              <UiInput
                name="address"
                onChange={formData.set}
                value={formData.value.address}
                label="Shipping Address"
                placeholder="Enter Shipping address"
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
              />
            </div>
          )}
        </UiForm>
      </main>
      <CartSummary onAction={handleSubmit} />
    </div>
  );
}
