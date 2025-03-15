'use client';

import { useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { products } from '@/api/mock/products';

import ProductVariant from '@/components/products/ProductVariant';
import QuantityIncrementor from '@/components/products/QuantityIncrementor';

import UiIcon from '@/components/ui/UiIcon';
import UiButton from '@/components/ui/UiButton';

import useToggle from '@/hooks/useToggle';
import Image from 'next/image';

export default function Page() {
  const { id } = useParams();

  const product = products.find((product) => product.id === id);

  const [activeVariant, setActiveVariant] = useState<string>('M');
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const router = useRouter();

  const isDescExpanded = useToggle();

  const variants = ['M', 'L', 'XL', '2XL', '3XL'];

  const productDescription =
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur cum voluptate veniam voluptatem itaque, totam   reiciendis impedit! Eveniet ipsa minus labore consectetur sequi, vitae fugiat in, soluta nisi eligendi ullam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur cum voluptate veniam voluptatem itaque, totam   reiciendis impedit! Eveniet ipsa minus labore consectetur sequi, vitae fugiat in, soluta nisi eligendi ullam. Lorem ipsum dolor sit amet consectetur, adipisicing elit.';

  const shouldTruncate = productDescription.length > 160;

  const displayedDesc =
    isDescExpanded.value || !shouldTruncate
      ? productDescription
      : productDescription.slice(0, 160) + '...';
  
  const productDetails = useMemo(()=> {
    return (
      <div className="grid gap-4 mb-6">
        <h2 className="text-secondary-500 font-obitron font-black text-[28px] sm:text-3xl md:text-[40px]">
          Structure logo hat - Blackuyy
        </h2>
        <p className="font-montserrat text-base text-tertiary-700">
          {displayedDesc}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => isDescExpanded.toggle()}
            className="w-fit font-bold font-montserrat text-primary-500 underline"
          >
            {isDescExpanded.value ? 'Show less.' : 'Show more.'}
          </button>
        )}

        <p className="text-lg  md:text-2xl text-secondary-500 font-montserrat font-medium">
          ₦34,000.00
        </p>
      </div>
    );
  }, [displayedDesc, isDescExpanded, shouldTruncate])

  function handleActiveVariant(variant: string) {
    setActiveVariant(variant);
  }

  return (
    <section className="p-4 md:px-6 2xl:px-8 pb-16 md:pb-20 pt-5 md:pt-6">
      <div className="max-w-[1280px] mx-auto">
        <button
          onClick={() => router.back()}
          className="stroke-secondary-500 mb-6 md:flex items-center gap-2 text-secondary-500 text-sm font-montserrat font-bold"
        >
          <UiIcon icon="ArrowLeft" size="24" />
          Back
        </button>
        <div className="flex flex-col gap-6 md:flex-row md:gap-[75px] w-full">
          <div className="max-w-[544px] w-full h-fit">
            <div className="md:hidden">{productDetails}</div>
            <Image
              src={product?.images[activeImgIndex] || ''}
              alt=""
              className="max-h-[350px] md:max-h-[547px] mb-5"
            />
            <div className="flex items-center gap-4 justify-center">
              {product?.images.map((image, index) => (
                <button key={index} onClick={() => setActiveImgIndex(index)}>
                  <Image
                    src={image}
                    alt=""
                    className={`w-14 h-14 md:w-16 md:h-16 object-cover ${activeImgIndex === index && 'outline outline-primary-500 rounded-[8px] transition-all duration-100 ease-in'}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="hidden md:block">{productDetails}</div>
            <div className="grid gap-4 mb-10">
              <div>
                <h3 className="font-black font-obitron capitalize text-secondary-500 text-sm mb-2">
                  quantity:
                </h3>
                <QuantityIncrementor />
              </div>
              <div>
                <h3 className="font-black font-obitron capitalize text-secondary-500 text-sm mb-2">
                  SIZE:
                </h3>
                <div className="flex gap-2">
                  {variants.map((variant, index) => (
                    <ProductVariant
                      key={index}
                      onVariantChange={() => handleActiveVariant(variant)}
                      isActive={activeVariant === variant}
                      variant={variant}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <UiButton rounded="md" variant="secondary-outlined">
                Add To Cart <UiIcon icon="ArrowDiagonal" size="24" />
              </UiButton>
              <UiButton rounded="md">
                Buy It Now <UiIcon icon="ArrowDiagonal" size="24" />
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
