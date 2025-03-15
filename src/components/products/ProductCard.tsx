import Image from 'next/image';

import Product from '@/types/Product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="max-w-[302px]">
      <div className="h-[165px] xs:h-[256px] lg:h-[363px] mb-3">
        <Image
          src={product.images[0]}
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
