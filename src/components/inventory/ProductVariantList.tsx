import { useSetProductContext } from '@/app/context/SetProductContext';

import UiIcon from '../ui/UiIcon';
import { useMemo } from 'react';

interface Props {
  showVariantForm: VoidFunction
}

export default function ProductVariantList({ showVariantForm }:Props ) {
  const { formData, setActiveVariant, setActiveVariantIndex } = useSetProductContext();

  function removeVariant(variantIndex: number) {
    formData.setValue((prevState) => ({
      ...prevState,
      variants: prevState.variants.filter((__, index) => variantIndex !== index),
    }));
  }

  const isVariantEmpty = useMemo(()=> {
    return formData.value.variants.length === 0
  }, [formData]) 

  return (
    <div>
      <p className="font-montserrat font-bold text-secondary-500 mb-4">
        Product variant<span className="text-[#A3A3A3]">(Optional)</span>
      </p>
      <div className="border border-grey-400 rounded-[16px] p-4">
        {!isVariantEmpty && (
          <div className="grid gap-4 mb-4">
            {formData.value.variants.map((variant, index) => (
              <div
                key={index}
                className="p-4 rounded-md bg-[#F4F4F4] flex justify-between items-center"
              >
                <div>
                  <p className="mb-1 font-bold text-secondary-500">
                    {variant.type}
                  </p>
                  <div className="flex gap-2">
                    {variant.values.map((value, index) => (
                      <p key={index} className="text-xs font-montserrat">
                        {value.value}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="stroke-secondary-500 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      showVariantForm();
                      setActiveVariant(variant);
                      setActiveVariantIndex(index);
                    }}
                    className="outline-none"
                  >
                    <UiIcon icon="Edit" size="24" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="outline-none"
                  >
                    <UiIcon icon="Trash" size="24" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={showVariantForm}
          className="flex items-center gap-2 outline-none"
        >
          <UiIcon icon="AddCircle" size="24" />
          <p className="font-bold font-montserrat text-primary-500 text-sm">
            Add Product Variant
          </p>
        </button>
      </div>
    </div>
  );
}
