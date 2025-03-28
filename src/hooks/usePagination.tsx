'use client';

import { useMemo, useState } from 'react';

interface PaginationData {
  dataLimit: number;
  totalData: number;
}

export function usePagination({ dataLimit, totalData }: PaginationData) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(totalData / dataLimit);
  }, [totalData, dataLimit]);

  function onPageChange(page: number) {
    setPage(page);
  }

  const isNextDisabled = useMemo(() => {
    return page >= totalPages;
  }, [page, totalPages]);

  const isPrevDisabled = useMemo(() => {
    return page <= 1;
  }, [page]);

  function increasePage() {
    setPage((page) => Math.min(page + 1, totalPages));
  }

  function decreasePage() {
    setPage((page) => Math.max(page - 1, 1));
  }

  return {
    page,
    totalPages,
    isNextDisabled,
    isPrevDisabled,
    increasePage,
    decreasePage,
    onPageChange,
  };
}
