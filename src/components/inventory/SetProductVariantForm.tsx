'use client';

import { useState } from 'react';

import UiButton from '../ui/UiButton';

import ProductVariantFormItem from './ProductVariantFormItem';
import { useSetProductContext } from '@/app/context/SetProductContext';
import showToast from '../ui/UiToast';

export type ProductVariant = {
  type: string;
  values: { value: string; stock: string | number }[];
};

export default function SetProductVariantForm() {
  const { formData, activeVariant, activeVariantIndex } = useSetProductContext();
  const [variants, setVariants] = useState<ProductVariant[]>([
    (activeVariantIndex !== null && formData.value.variants[activeVariantIndex]) || {
      type: '',
      values: [{ value: '', stock: '' }],
    },
  ]);
  
  function editVariant() {
    if(activeVariantIndex === null) return;

    formData.setValue((prevState) => ({
      ...prevState,
      variants: prevState.variants.map(
        (variant, index) => index === activeVariantIndex ? variants[0] : variant
      ),
    }));

  }

  function saveVariant() {
    if(activeVariantIndex !== null){
      editVariant()
    } else{
      formData.setValue((prevState) => ({
        ...prevState,
        variants: [...prevState.variants, ...variants],
      }));
    }
    showToast('variants saved', 'success');
  }



  function handleTypeChange(
    variantIndex: number,
    typeValue: string
  ) {

    setVariants((prevVariants) => {
      return prevVariants.map((variant, index) =>
        index === variantIndex ? { ...variant, type: typeValue } : variant
      );
    });
  }

  function addVariant() {
    setVariants((prevVariants) => [
      ...prevVariants,
      { type: '', values: [{ value: '', stock: '' }] },
    ]);
  }

  function removeVariant(variantIndex: number) {
    setVariants((prevVariants) => {
      return prevVariants.filter((__, index) => index !== variantIndex);
    });
  }

  function handleValueChange(
    variantIndex: number,
    valueIndex: number,
    value: string
  ) {
    setVariants((prevVariants) => {
      return prevVariants.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              values: variant.values.map((val, i) =>
                i === valueIndex ? { ...val, value: value} : val
              ),
            }
          : variant
      );
    });
  }

  function handleStockChange(
    variantIndex: number,
    valueIndex: number,
    stockValue: string
  ) {
    setVariants((prevVariants) => {
      return prevVariants.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              values: variant.values.map((val, i) =>
                i === valueIndex ? { ...val, stock: stockValue } : val
              ),
            }
          : variant
      );
    });
  }

  function addValue(variantIndex: number) {
    setVariants((prevVariants) => {
      return prevVariants.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              values: [...variant.values, { value: '', stock: '' }],
            }
          : variant
      );
    });
  }

  function removeValue(variantIndex: number, valueIndex: number) {
    setVariants((prevVariant) => {
      return prevVariant.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              values: variant.values.filter((__, i) => i !== valueIndex),
            }
          : variant
      );
    });
  }

  return (
    <div>
      <div className="bg-grey-100 rounded-lg p-4 mb-8">
        <div className="grid gap-6">
          {variants.map((variant, index) => (
            <ProductVariantFormItem
              key={index}
              removeVariant={removeVariant}
              addValue={addValue}
              onValueChange={handleValueChange}
              onTypeChange={handleTypeChange}
              onStockChange={handleStockChange}
              removeValue={removeValue}
              variant={variant}
              variantIndex={index}
            />
          ))}
        </div>
        {!activeVariant && (
          <button
            onClick={addVariant}
            className="font-montserrat font-bold text-base text-primary-500 w-fit text-left mt-4"
          >
            + Another Variant type
          </button>
        )}
      </div>
      <UiButton onClick={saveVariant}>Save Product Variant</UiButton>
    </div>
  );
}
