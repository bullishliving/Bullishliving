import UiIcon from '../ui/UiIcon';

interface Props {
  quantity: number;
  increaseQuantity: VoidFunction;
  decreaseQuantity: VoidFunction;
}

export default function QuantityIncrementor({ decreaseQuantity, increaseQuantity, quantity }:Props) {
  return (
    <div className="border border-grey-300 w-fit h-12 flex items-center gap-6 px-6 font-montserrat font-bold text-sm text-secondary-500  rounded-[8px]">
      <button onClick={decreaseQuantity}>
        <UiIcon icon="Minus" size="24" />
      </button>
      <p>{quantity}</p>
      <button onClick={increaseQuantity}>
        <UiIcon icon="Add" size="24" />
      </button>
    </div>
  );
}
