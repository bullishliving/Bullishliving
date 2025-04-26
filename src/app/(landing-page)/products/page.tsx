'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import useProductQuery from '@/api/query/useProductsQuery';
import useCategoriesQuery from '@/api/query/useCategoriesQuery';
import NoSearchResult from '@/assets/svg/no-search-result.svg';

import MobileProductsFilter from '@/components/products/MobileProductsFilter';
import ProductCard from '@/components/products/ProductCard';
import ProductListSkeleton from '@/components/ui/skeletons/ProductListSkeleton';
import ProductsFilter from '@/components/products/ProductsFilter';
import UiIcon from '@/components/ui/UiIcon';
import UiPaginator from '@/components/ui/UiPaginator';

import useToggle from '@/hooks/useToggle';
import { usePagination } from '@/hooks/usePagination';
import { PriceRange } from '@/components/products/PriceFilter';
import { SupabaseTables } from '@/types/enums/SupabaseTables';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(
    []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    2000, 300000,
  ]);
  const [totalData, setTotalData] = useState<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);

  const { onPageChange, page, totalPages,  } = usePagination({
    dataLimit: 12,
    totalData: totalData || 0,
  });

  const {
    query: { data: productsData, isLoading: isProductsLoading },
  } = useProductQuery({
    limit: 12,
    table: SupabaseTables.AVAILABLE_PRODUCTS,
    page,
    total: totalData || 0,
    categoryIds: selectedCategoryIds,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    filters: [{ column: 'is_out_of_stock', value: false }],
    searchColumn: 'products_name_description',
    searchQuery,
  });

  const { query: { data: categories, isLoading: isCategoryLoading } } = useCategoriesQuery();

  const isLoading = isProductsLoading || isCategoryLoading;

  function clearFilter() {
    setSelectedCategoryIds([])
    setPriceRange([2000, 300000]);
  }

  function handleSearchQuery(query: string) {
    setSearchQuery(query);
  }

  function handlePriceRangeChange(range: PriceRange) {
    setPriceRange(range);
  }
  function handleCategoryValueChange(categoryId: number) {
    setSelectedCategoryIds((prevValues) => {
      const isChecked = prevValues.some(
        (prevValue) => prevValue === categoryId
      );

      return isChecked
        ? prevValues.filter((value) => value !== categoryId)
        : [...prevValues, categoryId];
    });
  }

  const isFilterVisible = useToggle();

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

  console.log(selectedCategoryIds);
  

  useEffect(() => {
    function checkScreenSize() {
      if (window.innerWidth < 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isMobile]);

    useEffect(() => {
        if (productsData?.count !== undefined) {
        setTotalData(productsData.count);
      }
    }, [productsData?.count]);

    if(isLoading) {
      return <ProductListSkeleton />;
    }

  return (
    <section className="bg-white p-4 md:px-6 2xl:px-8 pb-16 md:pb-20 pt-[80px] md:pt-[125px]">
      <div className="max-w-[1280px] mx-auto h-full  font">
        <h2 className="font-obitron font-black text-2xl mb-6">All Products</h2>
        <div className="flex gap-6">
          {isFilterVisible.value && !isMobile && (
            <AnimatePresence>
              <motion.aside
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={webFilterVariant}
                className="w-[302px]"
              >
                {categories && (
                  <ProductsFilter
                    priceRange={priceRange}
                    setPriceRange={handlePriceRangeChange}
                    selectedCategories={selectedCategoryIds}
                    categories={categories}
                    onCategoryValueChange={handleCategoryValueChange}
                    onHideFilter={hideFilter}
                    clearFilter={clearFilter}
                  />
                )}
              </motion.aside>
            </AnimatePresence>
          )}
          <main className={`min-h-screen w-full flex-1`}>
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
              <div className="relative border border-grey-300 h-[52px] rounded flex justify-center items-center w-full">
                <div className="absolute top-4 left-4 stroke-tertiary-700">
                  <UiIcon icon="Search" size="20" />
                </div>
                <input
                  value={searchQuery}
                  onChange={(e) => handleSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full pl-[46px] text-tertiary-700 placeholder:text-tertiary-700 outline-none h-fit p-2"
                />
              </div>
            </div>
            {productsData?.data && productsData?.data.length < 1 ? (
              <div className=" border rounded-lg mt-6 flex justify-center items-center h-[400px]">
                <div className="flex justify-center flex-col text-center">
                  <div className="mx-auto">
                    <NoSearchResult />
                  </div>
                  <h3 className="font-black font-obitron text-2xl">
                    No Search Result Found
                  </h3>
                  <p className="text-sm text-tertiary-700 font-montserrat mt-2">
                    Your current search result is not available
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-6 product-grid gap-x-2 md:gap-x-4 gap-y-6 md:gap-y-8 mb-8 ${isFilterVisible.value && 'md:grid-cols-2 lg:!grid-cols-3'}`}
                >
                  {productsData?.data.map((product) => (
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
              </div>
            )}
          </main>
        </div>
      </div>
      {isMobile && isFilterVisible.value && (
        <AnimatePresence>
          <MobileProductsFilter
            isVisible={isFilterVisible.value}
            categories={categories || []}
            selectedCategories={selectedCategoryIds}
            priceRange={priceRange}
            setPriceRnage={handlePriceRangeChange}
            onCategoryValueChange={handleCategoryValueChange}
            onHideFilter={hideFilter}
          />
        </AnimatePresence>
      )}
    </section>
  );
}
