import { categories } from '@/api/mock/categories';
import { CategoryValue } from '@/types/Category';

import CollpasibleWrapper from '../ui/CollpasibleWrapper';
import UiIcon from '../ui/UiIcon';

import PriceFilter from './PriceFilter';
import UiCheckbox from '../ui/UiCheckbox';

interface Props {
  onHideFilter: VoidFunction;
  categoryValues: CategoryValue[];
  onCategoryValueChange: (value: CategoryValue) => void;
}

export default function ProductsFilter({
  onHideFilter,
  categoryValues,
  onCategoryValueChange,
}: Props) {
  return (
    <div>
      <div className="flex justify-between border border-[#1212121F] rounded-t-[8px] border-b-0 py-6 px-4">
        <div className="flex items-center gap-2 stroke-grey-700 ">
          <button onClick={onHideFilter}>
            <UiIcon icon="Close" size="24" />
          </button>
          <p className="font-montserrat font-bold text-secondary-500 text-sm">
            Filters
          </p>
        </div>
        <button className="underline font-montserrat text-grey-700 text-sm font-bold ">
          Clear all
        </button>
      </div>
      <div className="grid gap-1">
        <CollpasibleWrapper initialOpen hideBorderTop title="Price">
          <PriceFilter />
        </CollpasibleWrapper>
        {categories.map((category) => (
          <CollpasibleWrapper key={category.id} title={category.name}>
            <div className="grid gap-4">
              {category.values.map((value) => (
                <div key={value.id}>
                  <UiCheckbox
                    label={value.value}
                    isChecked={categoryValues.some(
                      (categoryValue) => categoryValue.id === value.id
                    )}
                    onCheckChange={() => onCategoryValueChange(value)}
                  />
                </div>
              ))}
            </div>
          </CollpasibleWrapper>
        ))}
      </div>
    </div>
  );
}
