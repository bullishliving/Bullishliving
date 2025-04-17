import Image from 'next/image';

import Product from '@/types/Product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="max-w-[302px] hover:shadow p-2 transition-shadow duration-200 ease-in">
      <div className="h-[165px] xs:h-[256px] lg:h-[363px] mb-3">
        <Image
          width={300}
          height={300}
          src={product.images![0] as string}
          alt={product.name}
          className="max-w-full h-full object-contain"
        />
      </div>
      <p className="font-montserrat text-sm sm:text-xl text-secondary-500 font-bold mb-2">
        {product.name}
      </p>
      <p className="font-montserrat text-xs sm:text-lg text-secondary-500 font-medium">
        ₦{product.price.toLocaleString()}
      </p>
    </div>
  );
}
