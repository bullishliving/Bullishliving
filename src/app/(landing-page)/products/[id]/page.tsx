'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify';

import useGetProductQuery from '@/api/query/useGetProductQuery';

import ProductDetailsSkeleton from '@/components/ui/skeletons/ProductDetailsSkeleton';
import ProductVariant from '@/components/products/ProductVariant';
import QuantityIncrementor from '@/components/products/QuantityIncrementor';
import showToast from '@/components/ui/UiToast';
import UiButton from '@/components/ui/UiButton';
import UiIcon from '@/components/ui/UiIcon';

import useToggle from '@/hooks/useToggle';

import { useCartStore } from '@/Store/CartStore';

import Product from '@/types/Product';

import { CartHandler } from '@/utils/CartHandler';

//--

export default function Page() {
  const { id } = useParams();

  const { data: product, isLoading } = useGetProductQuery(Number(id));

  const [activeVariant, setActiveVariant] = useState<string | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const { refreshCartItems, refreshBuyNow } = useCartStore();

  const isDescExpanded = useToggle();

  const shouldTruncate = product && product?.description.length > 160;

  const displayedDesc =
    isDescExpanded.value || !shouldTruncate
      ? product?.description
      : product?.description.slice(0, 160) + '...';

  function buildCartItem(
    product: Product,
    quantity: number,
    activeVariant: string | null
  ) {
    return {
      id: uuidv4(),
      product_id: product.id,
      quantity,
      variant_type: product.variants[0]?.type || null,
      variant_value: activeVariant,
      product_image: product.images?.[0] as string,
      product_discounted_price: product.discounted_price,
      product_name: product.name,
      product_price: product.price,
    };
  }

  const productDetails = useMemo(() => {
    return (
      <div className="grid gap-4 mb-6">
        <h2 className="text-secondary-500 font-obitron font-black text-[28px] capitalize sm:text-3xl md:text-[40px]">
          {product?.name}
        </h2>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(displayedDesc!),
          }}
          className="font-montserrat text-base text-tertiary-700"
        />

        {shouldTruncate && (
          <button
            onClick={() => isDescExpanded.toggle()}
            className="w-fit font-bold font-montserrat text-primary-500 underline"
          >
            {isDescExpanded.value ? 'Show less.' : 'Show more.'}
          </button>
        )}

        <div className="flex gap-2 items-center font-montserrat">
          <p className="text-lg md:text-2xl text-danger-400 font-montserrat font-medium ">
            ₦
            {(product?.discounted_price
              ? product.discounted_price
              : product?.price
            )?.toLocaleString()}
          </p>
          {product?.discounted_price && (
            <p className="line-through text-grey-800 ">
              ₦{product.price.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    );
  }, [isDescExpanded, shouldTruncate, product, displayedDesc]);

  function handleActiveVariant(variant: string) {
    setActiveVariant(variant);
  }

  function increaseQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  useEffect(()=>{
    if(product?.variants) {
      setActiveVariant(product?.variants[0]?.values[0]?.value);
    }
  },[product?.variants])

  if(isLoading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <section className="p-4 md:px-6 2xl:px-8 pb-16 md:pb-20 pt-[80px] md:pt-[125px]">
      <div className="max-w-[1280px] mx-auto">
        <button
          onClick={() => router.back()}
          className="stroke-secondary-500 mb-8 md:flex items-center gap-2 text-secondary-500 text-sm font-montserrat font-bold"
        >
          <UiIcon icon="ArrowLeft" size="24" />
          Back
        </button>
        <div className="flex flex-col gap-6 md:flex-row md:gap-[75px] w-full">
          <div className="max-w-[544px] w-full h-fit">
            <Image
              src={product?.images![activeImgIndex] as string}
              width={544}
              height={547}
              alt="product main image"
              className="max-h-[450px] md:max-h-[630px] mb-5 object-center rounded-lg object-cover"
            />
            <div className="flex items-center gap-4 justify-center">
              {product?.images!.map((image, index) => (
                <button key={index} onClick={() => setActiveImgIndex(index)}>
                  <Image
                    src={image as string}
                    width={64}
                    height={64}
                    alt="product image"
                    className={`w-14 h-14 md:w-16 md:h-16 object-cover rounded-[8px] ${activeImgIndex === index && 'outline outline-primary-500  transition-all duration-100 ease-in'}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="">{productDetails}</div>
            <div className="grid gap-4 mb-10">
              <div>
                <h3 className="font-black font-obitron capitalize text-secondary-500 text-sm mb-2">
                  quantity:
                </h3>
                <QuantityIncrementor
                  quantity={quantity}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              </div>
              {product &&
                product.variants.length > 0 &&
                product.variants.map((variant, index) => (
                  <div key={index}>
                    <h3 className="font-black font-obitron capitalize text-secondary-500 text-sm mb-2">
                      {variant.type}
                    </h3>
                    <div className="flex gap-2">
                      {variant.values
                        .filter((value) => value.stock > 0)
                        .map((value, index) => (
                          <ProductVariant
                            key={index}
                            onVariantChange={() =>
                              handleActiveVariant(value.value)
                            }
                            isActive={activeVariant === value.value}
                            variantValue={value.value}
                          />
                        ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className="grid gap-4">
              <UiButton
                rounded="md"
                variant="secondary-outlined"
                onClick={() => {
                  if (!product) return;

                  CartHandler.addItem(
                    buildCartItem(product, quantity, activeVariant)
                  );

                  refreshCartItems();

                  showToast('item added to cart!', 'success');
                }}
              >
                Add To Cart <UiIcon icon="ArrowDiagonal" size="24" />
              </UiButton>
              <UiButton
                onClick={() => {
                  if (!product) return;

                  CartHandler.addBuyNowItem(
                    buildCartItem(product, quantity, activeVariant)
                  );

                  refreshBuyNow();

                  router.push('/checkout?buynow');
                }}
                rounded="md"
              >
                Buy It Now <UiIcon icon="ArrowDiagonal" size="24" />
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
