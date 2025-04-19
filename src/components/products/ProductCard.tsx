import Image from 'next/image';

import Product from '@/types/Product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="max-w-[302px] hover:shadow p-1 transition-shadow duration-200 ease-in">
      <div className="h-[230px] xs:h-[280px] lg:h-[380px] mb-3">
        <Image
          width={300}
          height={300}
          src={product.images![0] as string}
          alt={product.name}
          className="max-w-full h-full object-cover rounded"
        />
      </div>
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
  );
}
