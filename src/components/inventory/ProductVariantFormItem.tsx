import { ProductVariant } from './SetProductVariantForm';

import UiIcon from '../ui/UiIcon';
import UiInput from '../ui/UiInput';

interface Props {
  variant: ProductVariant;
  variantIndex: number;
  onTypeChange: (variantIndex: number, value: string) => void;
  onValueChange: (
    variantIndex: number,
    valueIndex: number,
    value: string
  ) => void;
  onStockChange: (variantIndex: number,
    valueIndex: number,
    value: string) => void;
  removeValue: (variantIndex: number, valueIndex: number) => void;
  addValue: (variantIndex: number) => void;
  removeVariant: (variantIndex: number) => void;
}

export default function ProductVariantFormItem({
  variant,
  variantIndex,
  onTypeChange,
  onValueChange,
  onStockChange,
  removeValue,
  addValue,
  removeVariant,
}: Props) {  
  
  return (
    <div className="relative bg-white rounded-lg p-4 grid gap-4">
      {variantIndex > 0 && (
        <button
          type='button'
          className="absolute z-10 top-3 right-4 stroke-tertiary-700 cursor-pointer"
          onClick={() => removeVariant(variantIndex)}
        >
          <UiIcon icon="Trash" size="24" />
        </button>
      )}
      <UiInput
        name="type"
        onChange={(e) => onTypeChange(variantIndex, e.value as string)}
        value={variant.type}
        label="Variant Type"
        placeholder="e.g Size"
        roundedVariant="xl"
      />
      <div className="relative grid gap-4">
        {variant.values.map((value, index) => (
          <div
            className="relative border rounded-[8px] px-3 py-4 grid grid-cols-2 gap-4"
            key={index}
          >
            <UiInput
              name="value"
              value={value.value}
              
              type="text"
              onChange={(e) =>
                onValueChange(variantIndex, index, e.value as string)
              }
              label={'Variant Value'}
              placeholder="e.g XXL"
              roundedVariant="xl"
            />
            <UiInput
              name="stock"
              onChange={(e) =>
                onStockChange(variantIndex, index, e.value as string)
              }
              value={value.stock}
              label="Stock"
              type="number"
              placeholder="Total Number In Stock"
              roundedVariant="xl"
            />
            {index > 0 && (
              <button
                type='button'
                className="stroke-tertiary-700 cursor-pointer text-sm text-secondary-500 w-fit font-montserrat flex gap-2 items-center"
                onClick={() => removeValue(variantIndex, index)}
              >
                <UiIcon icon="Trash" size="24" />{' '}
                <p className="mt-[2px]">Delete</p>
              </button>
            )}
          </div>
        ))}
        <button
          type='button'
          onClick={() => addValue(variantIndex)}
          className="font-montserrat font-bold text-sm text-primary-500 w-fit text-left "
        >
          + More Values
        </button>
      </div>
    </div>
  );
}
