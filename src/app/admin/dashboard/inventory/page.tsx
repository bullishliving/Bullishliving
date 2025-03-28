'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import useDeleteProductMutaion from '@/api/mutations/products/useDeleteProductCategory';
import useProductQuery from '@/api/query/useProductsQuery';
import { SetProductProvider } from '@/app/context/SetProductContext';
import { usePagination } from '@/hooks/usePagination';

import AddProductModal from '@/components/inventory/AddProductModal';
import AdminBasePage from '@/components/layout/AdminBasePage';
import AnalyticsCard from '@/components/inventory/AnalyticsCard';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import showToast from '@/components/ui/UiToast';
import UiAdminPaginator from '@/components/ui/UiAdminPaginator';
import UiButton from '@/components/ui/UiButton';
import UiDropDown, { DropDownData } from '@/components/ui/UiDropDown';
import UiIcon from '@/components/ui/UiIcon';
import UiLoader from '@/components/ui/UiLoader';
import UiTable, { Header } from '@/components/ui/UiTable';

import useToggle from '@/hooks/useToggle';

import Product from '@/types/Product';
import SearchInput from '@/components/ui/SearchInput';

//---

export default function Page() {
  const [limit, setLimit] = useState<number>(5);
  const [totalData, setTotalData] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    decreasePage,
    increasePage,
    isNextDisabled,
    isPrevDisabled,
    page,
    totalPages,
  } = usePagination({ dataLimit: limit, totalData: totalData || 0 });

  const {
    query: { data: productsData, isLoading: isProductsLoading },
    getProduct,
  } = useProductQuery(page, limit, searchQuery, 'products_name_description');

  const {
    mutation: { mutateAsync: deleteProduct },
  } = useDeleteProductMutaion();

  const [activeProduct, setActiveProduct] = useState<Product | undefined>(
    undefined
  );

  const isAddProductVisible = useToggle();
  const isDeleteConfirmVisible = useToggle();
  const isDeleteLoading = useToggle();

  function handleSearchQuery(query: string) {
    setSearchQuery(query)
  }

  function showAddProduct() {
    isAddProductVisible.on();
    setActiveProduct(undefined);
  }

  function hideAddProduct() {
    isAddProductVisible.off();
    setActiveProduct(undefined);
  }

  async function DeleteProduct() {
    try {
      if (!activeProduct) throw new Error('no active product to delete');
      isDeleteLoading.on();

      await deleteProduct(activeProduct.id);
      isDeleteConfirmVisible.off();
      showToast('product deleted', 'success');
    } catch (error) {
      showToast('Error deleting product', 'error');
      throw new Error(`An error occured ${error}`);
    } finally {
      isDeleteLoading.off();
    }
  }

  // const filterDropDowonData

  const productDropDownOptions: DropDownData[] = [
    {
      label: (
        <div className="flex items-center gap-2 stroke-tertiary-700 fill-white">
          <UiIcon icon="Star" size="24" />
          <p className="text-sm font-montserrat text-[#4F4F4F]">
            Add to collections
          </p>
        </div>
      ),
      func: () => {},
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <UiIcon icon="Edit" size="24" />
          <p className="text-sm font-montserrat text-[#4F4F4F]">Edit</p>
        </div>
      ),
      func: (id) => {
        const product = getProduct(Number(id));
        console.log(product, id);

        setActiveProduct(product!);
        isAddProductVisible.on();
      },
    },
    {
      label: (
        <div className="flex items-center gap-2 stroke-[#E41C11]">
          <UiIcon icon="Trash" size="24" />
          <p className="text-sm font-montserrat text-[#E41C11]">Delete</p>
        </div>
      ),
      func: (id) => {
        const product = getProduct(Number(id));

        setActiveProduct(product);
        isDeleteConfirmVisible.on();
      },
    },
  ];

  const productsHeaders: Header[] = [
    {
      query: 'name',
      title: 'Name',
    },
    {
      query: 'sellingPrice',
      title: 'Selling Price',
    },
    {
      query: 'sold',
      title: 'Sold',
    },
    {
      query: 'left',
      title: 'Left',
    },
    {
      query: 'revenue',
      title: 'Revenue',
    },
    {
      query: 'In stock',
      title: 'inStock',
    },
    {
      query: 'action',
      title: 'Action',
    },
  ];

  const productsNodes = productsData?.data?.map((product) => {
    return {
      id: `${product.id}`,
      name: (
        <div className="flex gap-4 items-center">
          <Image
            width={40}
            height={40}
            alt={product.name}
            src={product.images![0] as string}
            className="w-10 h-10 rounded-lg "
          />
          <div className="flex gap-2 items-center">
            <p>{product.name}</p>{' '}
            {product.variants.length > 0 && (
              <span className="text-orange-400 text-xs rounded-full w-[25px] h-6 bg-orange-50 flex justify-center items-center">
                V
              </span>
            )}
          </div>
        </div>
      ),
      sellingPrice: (
        <div className="flex gap-3 items-start">
          <div>
            <p>
              ₦
              {Number(
                product.discounted_price
                  ? product.discounted_price
                  : product.price
              ).toLocaleString()}
            </p>
            {product.discounted_price && (
              <p className="font-normal text-tertiary-700 line-through">
                ₦{Number(product.price).toLocaleString()}
              </p>
            )}
          </div>
          <button>
            {' '}
            <UiIcon icon="Edit" size="24" />
          </button>
        </div>
      ),
      sold: '20',
      left: '40',
      revenue: '₦10,000,200',
      inStock: '',
      action: (
        <UiDropDown
          align="start"
          side="bottom"
          options={productDropDownOptions}
          itemId={`${product.id}`}
        />
      ),
    };
  });  

  useEffect(() => {
    if (productsData?.count !== undefined) {
      setTotalData(productsData.count);
    }
  }, [productsData?.count]);

  if (isProductsLoading) {
    return <UiLoader />;
  }

  return (
    <AdminBasePage
      title="Inventory"
      edgeNode={
        <div className="min-w-[153px]">
          <UiButton onClick={showAddProduct}>
            <UiIcon icon="Add" size="18" />
            <p>New Product</p>
          </UiButton>
        </div>
      }
    >
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-4">
        <AnalyticsCard figure="₦1,200,980" title="Total Inventory Balance" />
        <AnalyticsCard figure="7" title="Total Inventory Number" />
        <AnalyticsCard
          figure="40"
          title="Out Of Stock Items"
          edgeNode={
            <button className="stroke-primary-500 font-bold">
              <UiIcon icon="ArrowRight" />
            </button>
          }
        />
      </div>
      {productsNodes && (
        <div className="bg-white p-4 rounded-[8px]">
          <div className="w-full font-montserrat mb-4 flex justify-between items-center">
            <h3 className="font-bold text-secondary-500">All Products</h3>
            <div className="flex items-center gap-4">
              <SearchInput
                searchQuery={searchQuery}
                setSearchQuery={handleSearchQuery}
              />
              <UiDropDown
                options={[]}
                align='start' 
                side='bottom'
                trigger={
                  <div className="md:w-[86px] bg-transparent border border-grey-300 hover:bg-grey-100 h-10 rounded-lg flex gap-2 items-center justify-center font-bold text-sm">
                    Filter
                    <UiIcon icon="Sort" size="16" />
                  </div>
                }
              />
            </div>
          </div>
          <UiTable headers={productsHeaders} data={productsNodes} />
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

      <SetProductProvider defaultProduct={activeProduct}>
        <AddProductModal
          isOpen={isAddProductVisible.value}
          onClose={hideAddProduct}
        />
      </SetProductProvider>

      <DeleteConfirmation
        isOpen={isDeleteConfirmVisible.value}
        onAction={() => {
          if (activeProduct) {
            DeleteProduct();
          }
        }}
        onClose={() => isDeleteConfirmVisible.off()}
      />
    </AdminBasePage>
  );
}
