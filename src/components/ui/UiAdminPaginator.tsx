import UiIcon from "./UiIcon";

import DataLimitDropdown from "./DataLimitDropdown";

interface Props {
  limit: number;
  page: number;
  totalPages: number;
  setLimit: (limit: number) => void;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
  decreasePage: VoidFunction;
  increasePage: VoidFunction;
}

export default function UiAdminPaginator({ decreasePage, increasePage, isNextDisabled, isPrevDisabled, limit, page, setLimit, totalPages }:Props) {
  return (
    <div className="py-1 px-4 font-montserrat flex justify-between items-center">
      <div className="flex items-center gap-2">
        <p className="text-sm text-secondary-500">Rows per page:</p>
        <DataLimitDropdown limit={limit} setLimit={setLimit} />
      </div>
      <div className="text-sm flex items-center gap-4">
        <p className="text-secondary-500">
          Pages {page} of {totalPages}
        </p>
        <div className="flex gap-4">
          <button
            onClick={decreasePage}
            className={`border w-8 h-8 rounded-full flex justify-center items-center ${isPrevDisabled ? 'border-[#A3A3A3] stroke-[#A3A3A3]' : 'stroke-secondary-500 border-secondary-500'}`}
          >
            <UiIcon icon="CaretLeft" />
          </button>
          <button
            onClick={increasePage}
            className={`border w-8 h-8 rounded-full flex justify-center items-center ${isNextDisabled ? 'border-[#A3A3A3] stroke-[#A3A3A3]' : 'stroke-secondary-500 border-secondary-500'}`}
          >
            <UiIcon icon="CaretRight" />
          </button>
        </div>
      </div>
    </div>
  );
}
