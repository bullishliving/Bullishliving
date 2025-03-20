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

  return {
    page,
    totalPages,
    onPageChange,
  };
}
