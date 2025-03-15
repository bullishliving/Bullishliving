import Link from "next/link";

import UiButton from "../ui/UiButton";
import UiIcon from "../ui/UiIcon";

interface Props {
  onAction?: VoidFunction
}

export default function CartSummary({ onAction }: Props) {
  return (
    <aside className="sticky top-6 md:col-span-1 md:border md:border-[#1212121F] rounded-[8px] h-fit md:p-4 pb-6 font-montserrat">
      <h3 className="font-bold  pb-8">SUMMARY</h3>
      <div className="grid gap-6 pb-4 mb-6 border-b border-grey-300">
        <div className="flex justify-between">
          <p className="text-sm text-tertiary-700">Subtotal</p>
          <p className="font-bold test-base">₦34,000.00</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-tertiary-700">Discount</p>
          <p className="font-bold test-base">₦0.00</p>
        </div>
      </div>
      <div className="flex justify-between mb-8">
        <p className="text-sm text-tertiary-700">Grand total</p>
        <p className="font-bold test-base">₦34,000.00</p>
      </div>
      <Link href="/checkout">
        <UiButton rounded="md" onClick={onAction}>
          Checkout Now <UiIcon icon="ArrowDiagonal" size="22" />
        </UiButton>
      </Link>
    </aside>
  );
}
