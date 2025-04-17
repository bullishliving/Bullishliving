import Image from "next/image";
import { useMemo, useState } from "react";

import OutOfStockProduct from "@/types/OutOfStockProduct";
import UiButton from "../ui/UiButton";
import UiModal from "../ui/UiModal";
import UiIcon from "../ui/UiIcon";

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  outOfStockitems: OutOfStockProduct[];
  setActiveRestockItem: (item: OutOfStockProduct) => void
  showRestockItemModal: VoidFunction;
}

export default function OutOfStockList({
  outOfStockitems,
  isOpen,
  onClose,
  setActiveRestockItem,
  showRestockItemModal,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return outOfStockitems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [outOfStockitems, searchQuery]);

  return (
    <UiModal title="Out Of Stock Items" isOpen={isOpen} onClose={onClose}>
      <div className="stroke-secondary-500 max-w-full font-montserrat">
        <div className="relative w-full">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={'Search for products'}
            className={`pl-12 pr-4 w-full h-14 rounded-2xl  outline-none border border-grey-400  font-montserratbg-transparent placeholder:text-sm placeholder:text-[#4F4F4F]`}
          />
          <div className="absolute left-4 top-[1rem] stroke-secondary-500">
            <UiIcon icon="Search" size="24" />
          </div>
        </div>
        <div className="grid gap-6 mt-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between md:items-center gap-3 font-montserrat"
            >
              <div className="flex items-center gap-6">
                <Image
                  alt={item.name}
                  src={item.image}
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
                <div>
                  <p className="text-secondary-500 font-bold text-sm">
                    {item.name}
                  </p>
                  {item.variant_value && (
                    <p className="text-xs text-[#7D7D7D]">
                      {item.variant_value}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full md:w-[98px]">
                <UiButton
                  onClick={() => {
                    setActiveRestockItem(item);
                    showRestockItemModal();
                    onClose()
                  }}
                  variant="primary-outlined"
                  rounded="md"
                >
                  Re-Stock
                </UiButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UiModal>
  );
}
