import { OrderStatus } from "@/types/enums/OrderStatus";

export type Filter = {
  label: string;
  count: number;
  status: OrderStatus;
};

interface Props {
  filters: Filter[]
  activeStatus: OrderStatus;
  handleActiveStatus: (status: OrderStatus) => void
}

export default function OrderStatusFilter({
  activeStatus,
  filters,
  handleActiveStatus,
}: Props) {
  return (
    <div className="flex gap-6 items-center border-b border-grey-400 pb-1">
      {filters.map((filter) => (
        <button
          onClick={() => handleActiveStatus(filter.status)}
          className={`font-montserrat pb-2 ${activeStatus === filter.status ? 'text-primary-500 text-base font-bold border-b-[4px] border-primary-500' : 'text-sm text-tertiary-700 hover:text-primary-500'}`}
          key={filter.status}
        >
          {filter.label}({filter.count})
        </button>
      ))}
    </div>
  );
}
