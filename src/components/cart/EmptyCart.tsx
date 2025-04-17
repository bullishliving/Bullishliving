import CartImg from '@/assets/svg/cart-background.svg';

export default function EmptyCart() {
  return (
    <div className="flex justify-center items-center border border-grey-300 rounded-[8px] h-[332px]">
      <div className="flex flex-col items-center gap-10">
        <CartImg />
        <h2 className="font-black font-obitron text-xl md:text-2xl">
          Your Cart Is Empty
        </h2>
      </div>
    </div>
  );
}
