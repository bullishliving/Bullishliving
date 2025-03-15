'use client'

import { useMemo, useState } from "react";
import UiIcon from "./UiIcon";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function UiPaginator({ currentPage, totalPages, onPageChange }: Props) {
  const [startPage, setStartPage] = useState(1);
  
  
  const pageLimit = 5;

  function handlePageChange(page: number) {
    onPageChange(page);

    if (page === totalPages) {
      setStartPage(Math.max(1, totalPages - pageLimit + 1));
    } else if (page >= startPage + pageLimit) {
      setStartPage(page);
    } else if (page < startPage) {
      setStartPage(Math.max(1, page - pageLimit + 1));
    }
  }

  function handleNext (){
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      handlePageChange(nextPage);
    }
  };

  function handlePrev() {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      handlePageChange(prevPage);
    }
  };

  function isPrevDisabled() {
    return currentPage === 1
  }

  function isNextDisabled() {
    return currentPage >= totalPages
  }

  const endPage = Math.min(startPage + pageLimit - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const baseClass = useMemo(() => {
    return 'font-bold text-sm text-tertiary-700 font-montserrat';
  }, []);

  return (
    <div className="flex gap-9 xs:gap-11 md:gap-14 items-center justify-between max-w-[451px] mx-auto">
      <button
        onClick={handlePrev}
        disabled={isPrevDisabled()}
        className={`${baseClass} flex gap-2 items-center ${isPrevDisabled() && 'opacity-40 cursor-not-allowed'}`}
      >
        <UiIcon icon="CaretLeftBig" size="24" />
        <p className="hidden sm:block">Prev</p>
      </button>
      <div className="flex gap-4 items-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${baseClass} ${currentPage === page ? '!text-primary-500 bg-secondary-500 w-8 h-8 rounded-full' : ''}`}
          >
            {page}
          </button>
        ))}
        {endPage < totalPages - 1 && <span className={baseClass}>...</span>}
        {endPage < totalPages && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`${baseClass} ${currentPage === totalPages ? '!text-primary-500 bg-secondary-500 w-8 h-8 rounded-full' : ''}`}
          >
            {totalPages}
          </button>
        )}
      </div>
      <button
        disabled={isNextDisabled()}
        className={`${baseClass} flex gap-2 items-center ${isNextDisabled() && 'opacity-40 cursor-not-allowed'}`}
        onClick={handleNext}
      >
        <p className="hidden sm:block">Next</p>
        <UiIcon icon="CaretRightBig" size="24" />
      </button>
    </div>
  );
}
