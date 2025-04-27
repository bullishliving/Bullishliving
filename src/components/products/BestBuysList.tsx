'use client'

import { useRouter } from 'next/navigation';

import ProductCard from './ProductCard';

import Product from '@/types/Product';

interface Props {
  products: Product[];
}

export default function BestBuysList({ products }:Props) {
  const router = useRouter();
  return (
    <div className="product-grid grid gap-x-2 md:gap-x-4 gap-y-6 md:gap-y-8">
      {products.map((product) => {
        const isOutOfStock =
          product.stock_left === 0 || product.is_out_of_stock;
        return (
          <button
            className={`text-left ${isOutOfStock && 'cursor-not-allowed'}`}
            key={product.id}
            onClick={() => router.push(`/products/${product.id}`)}
            disabled={isOutOfStock}
          >
            <ProductCard product={product} />
          </button>
        );
      })}
    </div>
  );
}
