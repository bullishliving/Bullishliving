'use client';

import { useEffect, useMemo, useState } from 'react';
import { unparse } from 'papaparse';

import useGetCommunityMembers from '@/api/query/useGetCommunityMembers';

import AdminBasePage from '@/components/layout/AdminBasePage';
import SearchInput from '@/components/ui/SearchInput';
import UiAdminPaginator from '@/components/ui/UiAdminPaginator';
import UiIcon from '@/components/ui/UiIcon';
import UiLoader from '@/components/ui/UiLoader';
import UiMobileDataList from '@/components/ui/UiMobileDataList';
import UiTable, { Header } from '@/components/ui/UiTable';

import { usePagination } from '@/hooks/usePagination';

import { formatDate } from '@/utils/helperFunctions';
import CommunityMember from '@/types/CommunityMember';

//--

export default function Page() {
  const [limit, setLimit] = useState<number>(10);
  const [totalMembers, setTotalMembers] = useState<number | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState('');

  const {
    decreasePage,
    increasePage,
    isNextDisabled,
    isPrevDisabled,
    page,
    totalPages,
  } = usePagination({ dataLimit: limit, totalData: totalMembers || 0 });

  const {
    query: { data: membersData, error, isError, isLoading },
  } = useGetCommunityMembers({
    limit,
    page,
    total: totalMembers || 0,
    searchColumn: 'name',
    searchQuery,
  });
  
  function handleSearchQuery(query: string) {
    setSearchQuery(query);
  }

  function exportAsCSV (data: CommunityMember[], filename = 'community-memebers.csv')  {
    const csv = unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const membersHeaders: Header[] = useMemo(
    () => [
      {
        query: 'name',
        title: 'Name',
      },
      {
        query: 'email',
        title: 'Email',
      },
      {
        query: 'phoneNumber',
        title: 'Phone Number',
      },
      {
        query: 'date',
        title: 'Date',
      },
    ],
    []
  );

  const memberNodes = useMemo(
    () =>
      membersData?.data.map((member) => ({
        id: `${member.id}`,
        name: <div className='h-14 flex items-center'>{member.name}</div>,
        email: member.email,
        phoneNumber: member.phone,
        date: formatDate(member.created_at, 'DD/MM/YYYY'),
      })),
    [membersData?.data]
  );

  useEffect(() => {
    if (membersData?.count !== undefined) {
      setTotalMembers(membersData.count);
    }
  }, [membersData?.count]);
  

  if (isError) {
    console.error(error);
  }

  if (isLoading) {
    return <UiLoader/>
  }

    return (
      <AdminBasePage
        title="Running Community"
        edgeNode={
          membersData?.data &&
          <button
            onClick={() => exportAsCSV(membersData?.data)}
            className="flex gap-2 items-center"
          >
            <UiIcon icon="DirectInbox" size="24" />
            <p className="font-montserrat font-bold text-sm text-[#4F4F4F] underline">
              Export As CSV
            </p>
          </button>
        }
      >
        <div className="md:bg-white md:p-4 rounded-[8px]">
          <div className="w-full font-montserrat mb-4">
            <div className="w-full font-montserrat mb-6 md:mb-4 flex flex-col sm:flex-row justify-between md:items-center gap-4">
              <h3 className="font-bold text-secondary-500">
                All Members({membersData?.count})
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-full md:w-[400px]">
                  <SearchInput
                    placeholder="Customer Name..."
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearchQuery}
                  />
                </div>
              </div>
            </div>
            <div>
              {memberNodes && (
                <div>
                  <div className="hidden md:block">
                    <UiTable data={memberNodes} headers={membersHeaders} />
                  </div>
                  <div className="md:hidden">
                    <UiMobileDataList
                      data={memberNodes}
                      headers={membersHeaders}
                    />
                  </div>
                  <div className="mt-4">
                    <UiAdminPaginator
                      decreasePage={decreasePage}
                      increasePage={increasePage}
                      isNextDisabled={isNextDisabled}
                      isPrevDisabled={isPrevDisabled}
                      limit={limit}
                      page={page}
                      setLimit={setLimit}
                      totalPages={totalPages}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminBasePage>
    );
}
