import Image from 'next/image';

import Product from '@/types/Product';
import { useMemo } from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const isOutOfStock = useMemo(() => {
    return product.stock_left === 0 || product.is_out_of_stock;
  }, [product]);

  return (
    <div className="max-w-[302px] hover:shadow p-1 transition-shadow duration-200 ease-in">
      <div className=" relative h-[230px] xs:h-[280px] lg:h-[380px] mb-3">
        <Image
          width={300}
          height={300}
          src={product.images![0] as string}
          alt={product.name}
          className="max-w-full h-full object-cover rounded"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
            <p className="text-white text-2xl font-bold font-montserrat">
              out of stock
            </p>
          </div>
        )}
      </div>
      <div className={`${isOutOfStock ? 'opacity-60' : ''}`}>
        <p className="font-montserrat text-sm sm:text-xl text-secondary-500 font-bold mb-2">
          {product.name}
        </p>
        <div className="flex items-center gap-2 font-montserrat">
          <p className="text-sm sm:text-base text-danger-400 font-semibold">
            ₦
            {(product?.discounted_price
              ? product.discounted_price
              : product?.price
            )?.toLocaleString()}
          </p>
          {product?.discounted_price && (
            <p className="line-through text-grey-800 text-xs sm:text-sm">
              ₦{product.price.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
