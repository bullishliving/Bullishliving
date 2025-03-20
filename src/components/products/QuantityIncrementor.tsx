import { useState } from 'react';
import UiIcon from '../ui/UiIcon';

export default function QuantityIncrementor() {
  const [quantity, setQuantity] = useState(1);

  function increaseQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

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
