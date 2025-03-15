'use client'

import Link from 'next/link';

import { products } from '@/api/mock/products';

import ProductCard from './ProductCard';

export default function NewArrivalsList() {
  return (
    <div className="product-grid grid gap-x-6 gap-y-8">
      {products?.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
