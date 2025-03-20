import Link from 'next/link';
import { motion } from 'framer-motion';

import Logo from '@/assets/svg/logo.svg';

import CollpasibleWrapper from '../ui/CollpasibleWrapper';
import PriceFilter from './PriceFilter';

import UiIcon from '../ui/UiIcon';
import { categories } from '@/api/mock/categories';
import UiCheckbox from '../ui/UiCheckbox';
import { CategoryValue } from '@/types/Category';
import UiButton from '../ui/UiButton';

interface Props {
  onHideFilter: VoidFunction;
  onCategoryValueChange: (value: CategoryValue) => void;
  categoryValues: CategoryValue[];
  isVisible: boolean;
}

export default function MobileProductsFilter({
  categoryValues,
  onCategoryValueChange,
  onHideFilter,
}: Props) {
  const filterVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1, ease: 'easeIn' },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={filterVariant}
      className={`fixed md:hidden z-40 top-0 left-0 flex flex-col justify-between gap-4 bg-white w-full min-h-screen px-4 pb-8 transition-transform ease-in-out duration-300`}
    >
      <div>
        <div className="flex items-center justify-between py-4 mb-4">
          <Link href="/" className="w-10 h-[27px] md:w-14 md:h-[38px]">
            <Logo />
          </Link>
          <button
            onClick={onHideFilter}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-black stroke-black"
          >
            <UiIcon icon="Close" size="16" />
          </button>
        </div>
        <div className="flex justify-between items-center font-montserrat mb-[26px]">
          <p className="font-bold text-lg text-secondary-500 ">Filters</p>
          <button className="underline font-montserrat text-grey-700 text-sm font-bold ">
            Clear all
          </button>
        </div>
        <div className="grid gap-4">
          <CollpasibleWrapper title="Price" initialOpen>
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
      <div className="shrink-0">
        <UiButton>Apply Filters</UiButton>
      </div>
    </motion.div>
  );
}
