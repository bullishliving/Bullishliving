import Link from 'next/link';

import ProductCard from './ProductCard';
import Product from '@/types/Product';

interface Props {
  products: Product[];
}

export default async function BestBuysList({ products }:Props) {
  return (
    <div className="product-grid grid gap-x-2 md:gap-x-4 gap-y-6 md:gap-y-8">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
