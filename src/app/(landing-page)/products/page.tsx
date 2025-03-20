'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { products } from '@/api/mock/products';

import UiIcon from '@/components/ui/UiIcon';
import UiPaginator from '@/components/ui/UiPaginator';
import ProductCard from '@/components/products/ProductCard';
import ProductsFilter from '@/components/products/ProductsFilter';
import MobileProductsFilter from '@/components/products/MobileProductsFilter';

import useToggle from '@/hooks/useToggle';
import { usePagination } from '@/hooks/usePagination';

import { CategoryValue } from '@/types/Category';

export default function Page() {
  const [categoryValues, setCategoryValues] = useState<CategoryValue[]>([]);
  const { onPageChange, page, totalPages } = usePagination({
    dataLimit: 10,
    totalData: 500,
  });

  function handleCategoryValueChange(checkedValue: CategoryValue) {
    setCategoryValues((prevValues) => {
      const isChecked = prevValues.some(
        (prevValue) => prevValue.id === checkedValue.id
      );

      return isChecked
        ? prevValues.filter((value) => value.id !== checkedValue.id)
        : [...prevValues, checkedValue];
    });
  }

  const isFilterVisible = useToggle();
  const isMobile = useToggle();

  function hideFilter() {
    isFilterVisible.off();
  }

  const webFilterVariant = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1, ease: 'easeIn' },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.1, ease: 'easeOut' },
    },
  };

  useEffect(() => {
    function checkScreenSize() {
      if (window.innerWidth < 768) {
        isMobile.on();
      }
    }

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isMobile]);

  return (
    <section className="bg-white p-4 md:px-6 2xl:px-8 pb-16 md:pb-20 pt-5 md:pt-8">
      <div className="max-w-[1280px] mx-auto h-full  font">
        <h2 className="font-obitron font-black  text-2xl mb-6">All Products</h2>
        <div className="flex gap-6">
          {isFilterVisible.value && !isMobile.value && (
            <AnimatePresence>
              <motion.aside
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={webFilterVariant}
                className="w-[302px]"
              >
                <ProductsFilter
                  categoryValues={categoryValues}
                  onCategoryValueChange={handleCategoryValueChange}
                  onHideFilter={hideFilter}
                />
              </motion.aside>
            </AnimatePresence>
          )}
          <main>
            <div className="flex gap-6 font-montserrat">
              {!isFilterVisible.value && (
                <button
                  onClick={() => isFilterVisible.on()}
                  className="flex justify-center items-center gap-[10px] h-[52px] px-4 text-grey-700 text-sm border border-grey-300 rounded hover:bg-gray-50 transition-colors duration-100 ease-in"
                >
                  <UiIcon icon="Filter" />
                  Filter
                </button>
              )}
              <div className="relative border border-grey-300 w-full h-[52px] rounded flex justify-center items-center">
                <div className="absolute top-4 left-4 stroke-tertiary-700">
                  <UiIcon icon="Search" size="20" />
                </div>
                <input
                  placeholder="Search"
                  className="w-full pl-[46px] text-tertiary-700 placeholder:text-tertiary-700 outline-none h-fit p-2"
                />
              </div>
            </div>
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-6 gap-x-6 gap-y-8 mb-8 ${isFilterVisible.value && 'md:grid-cols-2 lg:grid-cols-3'}`}
            >
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
            <UiPaginator
              onPageChange={onPageChange}
              currentPage={page}
              totalPages={totalPages}
            />
          </main>
        </div>
      </div>
      {isMobile.value && isFilterVisible.value && (
        <AnimatePresence>
          <MobileProductsFilter
            isVisible={isFilterVisible.value}
            categoryValues={categoryValues}
            onCategoryValueChange={handleCategoryValueChange}
            onHideFilter={hideFilter}
          />
        </AnimatePresence>
      )}
    </section>
  );
}
