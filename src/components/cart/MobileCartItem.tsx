import Image, { StaticImageData } from 'next/image';
import QuantityIncrementor from '../products/QuantityIncrementor';
import UiIcon from '../ui/UiIcon';

interface Props {
  cartItem: {
    id: string;
    name: string;
    price: string;
    image: StaticImageData;
    variant?: string;
  };
}

export default function MobileCartItem({ cartItem }: Props) {
  return (
    <div className="border border-grey-300 rounded-[8px] p-4 font-montserrat">
      <div className="flex gap-3 pb-2 border-b mb-6 h-[60px]">
        <Image alt="product image" src={cartItem.image} className="w-8 h-8" />
        <div className="flex flex-col gap-2">
          <p className="text-sm text-secondary-500 font-bold mb-2">
            {cartItem.name}
          </p>
          {cartItem.variant && (
            <p className="text-sm text-tertiary-700">{cartItem.variant}</p>
          )}
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-tertiary-700">Quantity</p>
          <QuantityIncrementor />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-tertiary-700">Price</p>
          <p className="text-base font-bold text-secondary-500">
            {cartItem.price}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm  text-tertiary-700">Action</p>
          <button className='flex items-center gap-2 stroke-danger-400'>
            <UiIcon icon="Trash" size="24" />
            <p className='font-bold text-sm text-danger-400'>Remove</p>
          </button>
        </div>
      </div>
    </div>
  );
}
