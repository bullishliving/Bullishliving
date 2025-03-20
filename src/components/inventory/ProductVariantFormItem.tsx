import { ProductVariant } from './SetProductVariantForm';

import UiIcon from '../ui/UiIcon';
import UiInput from '../ui/UiInput';

interface Props {
  variant: ProductVariant;
  variantIndex: number;
  onVariantChange: (variantIndex: number, name: string, value: string) => void;
  onValueChange: (
    variantIndex: number,
    valueIndex: number,
    value: string
  ) => void;
  removeValue: (variantIndex: number, valueIndex: number) => void;
  addValue: (variantIndex: number) => void;
  removeVariant: (variantIndex: number) => void;
}

export default function ProductVariantFormItem({
  variant,
  variantIndex,
  onVariantChange,
  onValueChange,
  removeValue,
  addValue,
  removeVariant,
}: Props) {
  return (
    <div className="relative bg-white rounded-lg p-4 grid gap-4">
      {variantIndex > 0 && (
        <button
          className="absolute z-10 top-3 right-4 stroke-tertiary-700 cursor-pointer"
          onClick={() => removeVariant(variantIndex)}
        >
          <UiIcon icon="Trash" size="24" />
        </button>
      )}
      <UiInput
        name="type"
        onChange={(e) =>
          onVariantChange(variantIndex, e.name, e.value as string)
        }
        value={variant.type}
        label="Variant Type"
        placeholder="e.g Size"
        roundedVariant="lg"
      />
      <div className="relative grid gap-4">
        {variant.value.map((value, index) => (
          <UiInput
            key={index}
            name="value"
            value={value}
            onChange={(e) =>
              onValueChange(variantIndex, index, e.value as string)
            }
            label={index < 1 ? 'Variant Value' : ''}
            placeholder="e.g XXL"
            roundedVariant="lg"
            suffixNode={
              index > 0 && (
                <button
                  onClick={() => removeValue(variantIndex, index)}
                  className=" stroke-secondary-500"
                >
                  <UiIcon icon="Close" size="24" />
                </button>
              )
            }
          />
        ))}
        <button
          onClick={() => addValue(variantIndex)}
          className=" absolute top-0 right-0 font-montserrat font-bold text-sm text-primary-500 w-fit text-left "
        >
          + More Values
        </button>
      </div>

      <UiInput
        name="stock"
        onChange={(e) =>
          onVariantChange(variantIndex, e.name, e.value as string)
        }
        value={variant.stock}
        label="Stock"
        placeholder="Total Number In Stock"
        roundedVariant="lg"
      />
    </div>
  );
}
