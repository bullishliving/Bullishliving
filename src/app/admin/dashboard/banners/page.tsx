'use client'

import { useMemo, useState } from 'react';

import useGetBannersQuery from '@/api/query/useGetBannersQuery';
import useDeleteBannerMutation from '@/api/mutations/banner/useDeleteBannerMutation';

import AdminBasePage from '@/components/layout/AdminBasePage';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import SetBanner from '@/components/Banner/SetBanner';
import UiButton from '@/components/ui/UiButton';
import UiIcon from '@/components/ui/UiIcon';
import UiTable, { Header } from '@/components/ui/UiTable';


import useToggle from '@/hooks/useToggle';
import UiLoader from '@/components/ui/UiLoader';
import Image from 'next/image';
import UiDropDown, { DropDownData } from '@/components/ui/UiDropDown';
import Banner from '@/types/Banner';

//---

export default function Page() {
  const [activeBanner, setActiveBanner] = useState<Banner | null>(null);

  const { query: { data: banners, isLoading, isError, error, refetch } } = useGetBannersQuery();
  const { mutation: { mutateAsync: deleteBanner, isPending: isBannerDeletePending } } = useDeleteBannerMutation();

  const isSetBannerVisible = useToggle();
  const isDeleteConfirmationVisible = useToggle();

  function clearActiveBanner() {
    setActiveBanner(null);
  }

  async function DeleteBanner() {
    if(!activeBanner) throw new Error('no active banner')
    
    await deleteBanner(activeBanner.id);
    refetch();
    isDeleteConfirmationVisible.off()
  }

  const bannerTableHeaders: Header[] = [
    {
      query: 'image',
      title: 'Image',
    },
    {
      query: 'link',
      title: 'Link',
    },
    {
      query: 'actions',
      title: 'Actions',
    },
  ];

  const couponsDropdownOptions: DropDownData[] = useMemo(() => {
    return [
      {
        label: (
          <div className="flex items-center gap-2">
            <UiIcon icon="Edit" size="24" />
            <p className="text-sm font-montserrat text-[#4F4F4F]">Edit</p>
          </div>
        ),
        func: (__, item) => {
          setActiveBanner(item as Banner);
          isSetBannerVisible.on();
        },
      },
      {
        label: (
          <div className="flex items-center gap-2 stroke-[#E41C11]">
            <UiIcon icon="Trash" size="24" />
            <p className="text-sm font-montserrat text-[#E41C11]">Delete</p>
          </div>
        ),
        func: (__, item) => {
          setActiveBanner(item as Banner);
          isDeleteConfirmationVisible.on();
        },
      },
    ];
  }, [isSetBannerVisible, isDeleteConfirmationVisible]);


  const bannerTableNodes = banners?.map((banner) => ({
    id: `${banner.id}`,
    image: (
      <Image
        width={48}
        height={32}
        alt="banner image"
        src={banner.image![0] as string}
        className="w-12 h-8 rounded-lg object-cover"
      />
    ),
    link: banner.link || '---',
    actions: (
      <UiDropDown
        options={couponsDropdownOptions}
        item={banner}
        itemId={`${banner.id}`}
        side="bottom"
      />
    ),
  }));

  if(isError) {
    console.error(error)
  }

  if(isLoading) {
    return <UiLoader />
  }

  return (
    <AdminBasePage
      title="Banners"
      edgeNode={
        <div className="min-w-[158px] fill-secondary-500 stroke-secondary-500">
          <UiButton onClick={() => isSetBannerVisible.on()}>
            <UiIcon icon="SliderVertical" size="20" />
            <p>Add Banner</p>
          </UiButton>
        </div>
      }
    >
      {bannerTableNodes && (
        <div>
          <div>
            <UiTable data={bannerTableNodes} headers={bannerTableHeaders} />
          </div>
        </div>
      )}
      <SetBanner
        isOpen={isSetBannerVisible.value}
        onClose={() => isSetBannerVisible.off()}
        banner={activeBanner!}
        clearActiveBanner={clearActiveBanner}
      />
      <DeleteConfirmation
        isDeleteLoading={isBannerDeletePending}
        isOpen={isDeleteConfirmationVisible.value}
        onAction={DeleteBanner}
        onClose={() => {
          setActiveBanner(null)
          isDeleteConfirmationVisible.off()
        }}
      />
    </AdminBasePage>
  );
}
