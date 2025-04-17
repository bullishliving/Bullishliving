import Category from '@/types/Category';

import CollpasibleWrapper from '../ui/CollpasibleWrapper';
import UiIcon from '../ui/UiIcon';

import PriceFilter, { PriceRange } from './PriceFilter';
import UiCheckbox from '../ui/UiCheckbox';

interface Props {
  onHideFilter: VoidFunction;
  selectedCategories: number[];
  categories: Category[];
  priceRange: PriceRange;
  setPriceRange:(priceRange:PriceRange) => void
  onCategoryValueChange: (categoryId: number) => void;
  clearFilter: VoidFunction

}

export default function ProductsFilter({
  onHideFilter,
  categories,
  selectedCategories,
  priceRange,
  setPriceRange,
  onCategoryValueChange,
  clearFilter,
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
        <button
          onClick={clearFilter}
          className="underline font-montserrat text-grey-700 text-sm font-bold "
        >
          Clear all
        </button>
      </div>
      <div className="grid gap-1">
        <CollpasibleWrapper initialOpen hideBorderTop title="Price">
          <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange}/>
        </CollpasibleWrapper>
        <CollpasibleWrapper title="Category">
          <div className="grid gap-4">
            {categories.map((category) => (
              <div key={category.id}>
                <UiCheckbox
                  label={category.name}
                  isChecked={selectedCategories?.some(
                    (selectedCategory) => selectedCategory === category.id
                  )}
                  onCheckChange={() =>
                    onCategoryValueChange(category.id as number)
                  }
                />
              </div>
            ))}
          </div>
        </CollpasibleWrapper>
      </div>
    </div>
  );
}
