'use client';

import { useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import useSearchProductsQuery from '@/api/query/useSearchProductsQuery';

import UiIcon from '../ui/UiIcon';
import ProductCard from '../products/ProductCard';
import Link from 'next/link';

// --

interface Props {
  onClose: VoidFunction;
}

export default function SearchPanel({ onClose }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const { query: { data: searchedProducts, error, isError } } = useSearchProductsQuery(searchQuery);

  const inputRef = useRef<HTMLInputElement>(null);

  function clearSearchQuery() {
    setSearchQuery('');
    inputRef.current?.focus();
  }

  if (isError) {
    console.error(error);

    return <p>Opps! could not find anything</p>
  }

  return (
    <section className="absolute z-20 w-full top-[50px] md:top-[80px] max-h-[80vh] overflow-y-auto bg-white shadow-search-panel rounded-lg px-6 py-4 md:py-5">
      <OutsideClickHandler onOutsideClick={onClose}>
        <div className="flex items-center gap-[10px]">
          <div className="stroke-tertiary-700">
            <UiIcon icon="Search" size="16" />
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={inputRef}
            placeholder="Search"
            className="font-montserrat flex-1 text-sm text-tertiary-700 placeholder:text-tertiary-700 h-10 outline-none"
          />
          <button
            onClick={clearSearchQuery}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-black stroke-black"
          >
            <UiIcon icon="Close" size="16" />
          </button>
        </div>
        {searchedProducts && (
          <div className="product-grid grid gap-x-6 gap-y-8">
            {searchedProducts.map((product) => (
              <Link
                onClick={onClose}
                key={product.id}
                href={`/products/${product.id}`}
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </OutsideClickHandler>
    </section>
  );
}
