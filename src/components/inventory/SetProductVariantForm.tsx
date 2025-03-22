'use client';

import { useState } from 'react';

import ProductVariantFormItem from './ProductVariantFormItem';

export type ProductVariant = {
  type: string;
  value: string[];
  stock: string;
};



export default function SetProductVariantForm() {
  const [variants, setVariants] = useState<ProductVariant[]>([
    { type: '', value: [''], stock: '' },
  ]);

  function handleVariantChange(
    variantIndex: number,
    name: string,
    value: string
  ) {
    console.log('this ran');

    setVariants((prevVariants) => {
      return prevVariants.map((variant, index) =>
        index === variantIndex ? { ...variant, [name]: value } : variant
      );
    });
  }

  function addVariant() {
    setVariants((prevVariants) => [
      ...prevVariants,
      { type: '', value: [''], stock: '' },
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
              value: variant.value.map((val, i) =>
                i === valueIndex ? value : val
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
          ? { ...variant, value: [...variant.value, ''] }
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
              value: variant.value.filter((__, i) => i !== valueIndex),
            }
          : variant
      );
    });
  }

  return (
    <div className="bg-grey-100 rounded-lg p-4">
      <div className="grid gap-6">
        {variants.map((variant, index) => (
          <ProductVariantFormItem
            key={index}
            removeVariant={removeVariant}
            addValue={addValue}
            onValueChange={handleValueChange}
            onVariantChange={handleVariantChange}
            removeValue={removeValue}
            variant={variant}
            variantIndex={index}
          />
        ))}
      </div>
      <button
        onClick={addVariant}
        className="font-montserrat font-bold text-base text-primary-500 w-fit text-left mt-4"
      >
        + Another Variant type
      </button>
    </div>
  );
}
