import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import { Api } from '@/api/supabaseService';
import { useSetProductContext, initialProductState } from '@/app/context/SetProductContext';
import useDeleteProductMutaion from '@/api/mutations/products/useDeleteProductMutation';
import useGetTotalPayInQuery from '@/api/query/useGetTotalPayInQuery';
import useOutOfStockProductsQuery from '@/api/query/useOutOfStockProductsQuery';
import useProductQuery from '@/api/query/useProductsQuery';


import useToggle from '@/hooks/useToggle';
import { usePagination } from '@/hooks/usePagination';

import OutOfStockProduct from '@/types/OutOfStockProduct';
import Product from '@/types/Product';

import SearchInput from '../ui/SearchInput';
import showToast from '../ui/UiToast';
import UiAdminPaginator from '../ui/UiAdminPaginator';
import UiDropDown, { DropDownData } from '../ui/UiDropDown';
import UiFilter from '../ui/UiFilter';
import UiIcon from '../ui/UiIcon';
import UiLoader from '../ui/UiLoader';
import UiMobileDataList from '../ui/UiMobileDataList';
import UiSwith from '../ui/UiSwitch';
import UiTable, { Header } from '../ui/UiTable';

import AddProductModal from './AddProductModal';
import AnalyticsCard from './AnalyticsCard';
import DeleteConfirmation from '../DeleteConfirmation';
import EditCostPrice from './EditCostPrice';
import OutOfStockList from './OutOfStockList';
import RestockItem from './RestockItem';
import useGetTotalInventoryBalanceQuery from '@/api/query/useGetTotalInventoryBalanceQuery';

//---

export default function ProductInventory() {
  const { activeProduct, setActiveProduct, formData } = useSetProductContext();
  const [limit, setLimit] = useState<number>(5);
  const [totalProducts, setTotalProducts] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [activeRestockItem, setActiveRestockItem] = useState<OutOfStockProduct | null>(null);

  const {
    decreasePage,
    increasePage,
    isNextDisabled,
    isPrevDisabled,
    page,
    totalPages,
  } = usePagination({ dataLimit: limit, totalData: totalProducts || 0 });

  const {
    query: { data: productsData, isLoading: isProductsLoading },
    reloadQuery,
  } = useProductQuery({
    limit,
    page,
    total: totalProducts || 0,
    searchQuery,
    searchColumn: 'products_name_description'
  });

  const {
    mutation: { mutateAsync: deleteProduct },
  } = useDeleteProductMutaion();

  const { query: {data: outOfStockProducts, isLoading: isOutOfStockLoading} } = useOutOfStockProductsQuery();

  const {
    query: {
      data: totalPayIn,
      isLoading: isTotalPayinLoading,
      isError: totalPayInError,
    },
  } = useGetTotalPayInQuery();
  const {
    query: {
      data: totalInventoryBalance,
      isLoading: isTotalInventoryBalanceLoading,
      isError: totalInventoryBalanceError,
    },
  } = useGetTotalInventoryBalanceQuery();

  const isEditProductVisible = useToggle();
  const isDeleteConfirmVisible = useToggle();
  const isEditCostPriceVisible = useToggle();
  const isDeleteLoading = useToggle();
  const isRestockItemVisible = useToggle();
  const isOutOfStockListVisible = useToggle();
  const isLoading =
    isOutOfStockLoading ||
    isProductsLoading ||
    isTotalPayinLoading ||
    isTotalInventoryBalanceLoading;
  const isError = totalInventoryBalanceError || totalPayInError;

  function handleRestockItem(item: OutOfStockProduct) {
    setActiveRestockItem(item)
  }

  function handleSearchQuery(query: string) {
    setSearchQuery(query);
  }

  function handleFilterType(filterType: string) {
    setFilterType(filterType)
  }

  async function toggleOutOfStock(productId: number, value: boolean) {
    try {
      await Api.toggleOutOfStock(productId, value);
      showToast('Stock updated', 'success');
      reloadQuery()
    } catch (error) {
      console.log(error);
      showToast('Error updating out of stock', 'error');
    throw new Error(`An error occured ${error}`)
    }
  }

  async function toggleIsFeatured(productId: number, value: boolean) {
    try {
      await Api.toggleIsFeatured(productId, value);
      showToast(
        `${value ? 'Product added to collections' : 'Product removed from collections'}`,
        'success'
      );
      reloadQuery();
    } catch (error) {
      console.log(error);
      showToast('An error occurred', 'error');
      throw new Error(`An error occured ${error}`);
    }
  }

  async function DeleteProduct() {
    try {
      if (!activeProduct) throw new Error('no active product to delete');
      isDeleteLoading.on();

      await deleteProduct(activeProduct.id);
      isDeleteConfirmVisible.off();
      setActiveProduct(undefined);
      showToast('product deleted', 'success');
    } catch (error) {
      showToast('Error deleting product', 'error');
      throw new Error(`An error occured ${error}`);
    } finally {
      isDeleteLoading.off();
      setActiveProduct(undefined);
    }
  }

  function clearFilter() {
    setFilterType('');
  }

  const filteredProducts = useMemo(() => {
    switch (filterType) {
      case 'Highest price':
        return productsData?.data
          .slice()
          .sort(
            (a, b) =>
              Number(b.discounted_price || b.price) -
              Number(a.discounted_price || a.price)
          );
      case 'Lowest price':
        return productsData?.data
          .slice()
          .sort(
            (a, b) =>
              Number(a.discounted_price || a.price) -
              Number(b.discounted_price || b.price)
          );
      case 'Collections':
        return productsData?.data.filter((product) => product.is_featured)
      case 'Out of stock':
        return productsData?.data.filter((product) => product.is_out_of_stock)

      default: 
          return productsData?.data || []
    }
  }, [filterType, productsData])

  const filterDropDowonData: DropDownData[] = [
    {
      label: (
        <div className="w-[142px] text-tertiary-700 text-sm">Highest price</div>
      ),
      func: () => {
        handleFilterType('Highest price');
      },
    },
    {
      label: (
        <div className="w-[142px] text-tertiary-700 text-sm">Lowest price</div>
      ),
      func: () => {
        handleFilterType('Lowest price');
      },
    },
    {
      label: (
        <div className="w-[142px] text-tertiary-700 text-sm">Collections</div>
      ),
      func: () => {
        handleFilterType('Collections');
      },
    },
    {
      label: (
        <div className="w-[142px] text-tertiary-700 text-sm">Out of stock</div>
      ),
      func: () => {
        handleFilterType('Out of stock');
      },
    },
  ];

  const productDropDownOptions: DropDownData[] = [
    {
      label: (product: Product) => (
        <div
          className={`flex items-center gap-2 ${product.is_featured ? 'stroke-primary-500 fill-primary-500' : 'stroke-tertiary-700 fill-white'}`}
        >
          <UiIcon icon="Star" size="24" />
          <p className="text-sm font-montserrat text-[#4F4F4F]">
            Add to collections
          </p>
        </div>
      ),
      func: (productId, product: Product) => {
        toggleIsFeatured(Number(productId), !product.is_featured);
      },
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <UiIcon icon="Edit" size="24" />
          <p className="text-sm font-montserrat text-[#4F4F4F]">Edit</p>
        </div>
      ),
      func: (__, item) => {
        setActiveProduct(item as Product);
        isEditProductVisible.on();
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
        setActiveProduct(item as Product);
        isDeleteConfirmVisible.on();
      },
    },
  ];

  const productsHeaders: Header[] = useMemo(()=>([
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
      query: 'inStock',
      title: 'In stock',
    },
    {
      query: 'action',
      title: 'Action',
    },
  ]), [])

  const mobileProductHeaders = useMemo(() => {
    return productsHeaders.filter((header) => header.query !== 'name');
  }, [productsHeaders]);

  const productsNodes = filteredProducts?.map((product) => {
    return {
      id: `${product.id}`,
      topNode: (
        <div className="flex items-center gap-3 pb-2 border-b">
          <Image
            width={32}
            height={32}
            alt={product.name}
            src={product.images![0] as string}
            className="w-8 h-8 rounded-lg"
          />
          <div>
            <p className="text-sm font-bold text-secondary-500 truncate w-full">
              {product.name}
            </p>
            {product.variants.length > 0 && (
              <span className="text-orange-400 text-xs rounded-full w-5 h-5 bg-orange-50 flex justify-center items-center">
                V
              </span>
            )}
          </div>
        </div>
      ),
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
          <button
            onClick={() => {
              isEditCostPriceVisible.on();
              setActiveProduct(product);
            }}
          >
            {' '}
            <UiIcon icon="Edit" size="24" />
          </button>
        </div>
      ),
      sold: product.sold,
      left: product.stock_left,
      revenue: `₦${product.revenue.toLocaleString()}`,
      inStock: (
        <UiSwith
          value={!product.is_out_of_stock}
          onChange={() =>
            toggleOutOfStock(product.id, !product.is_out_of_stock)
          }
        />
      ),
      action: (
        <UiDropDown
          align="start"
          side="bottom"
          options={productDropDownOptions}
          itemId={`${product.id}`}
          item={product}
        />
      ),
      bottomNode: (
        <div className="flex justify-center items-center gap-8 pt-6 border-t">
          <button
            onClick={() => {
              setActiveProduct(product);
              isEditProductVisible.on();
            }}
          >
            <UiIcon icon="Edit" size="24" />
          </button>
          <button
            onClick={() => toggleIsFeatured(product.id, !product.is_featured)}
            className={`${product.is_featured ? 'stroke-primary-500 fill-primary-500' : 'stroke-tertiary-700 fill-white'}`}
          >
            <UiIcon icon="Star" size="24" />
          </button>
          <button
            onClick={() => {
              setActiveProduct(product);
              isDeleteConfirmVisible.on();
            }}
            className=" gap-2 stroke-tertiary-700"
          >
            <UiIcon icon="Trash" size="24" />
          </button>
        </div>
      ),
    };
  });

  useEffect(() => {
    if (productsData?.count !== undefined) {
      setTotalProducts(productsData.count);
    }
  }, [productsData?.count]);

  if (isError) {
    console.error('something went wrong')
  }
  
  if (isLoading) {
    return <UiLoader />;
  }

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-4">
        <AnalyticsCard
          figure={`₦${totalInventoryBalance?.toLocaleString()}`}
          title="Total Inventory Balance"
        />
        <AnalyticsCard
          figure={`₦${totalPayIn?.toLocaleString()}`}
          title="Total Pay In"
        />
        <AnalyticsCard
          figure={`${productsData?.count || 0}`}
          title="Total Inventory Number"
        />
        <AnalyticsCard
          figure={`${outOfStockProducts?.outOfStockProducts.length || 0}`}
          title="Out Of Stock Items"
          edgeNode={
            <button
              onClick={() => isOutOfStockListVisible.on()}
              className="stroke-primary-500 font-bold"
            >
              <UiIcon icon="ArrowRight" />
            </button>
          }
        />
      </div>
      <div className="md:bg-white md:p-4 rounded-[8px]">
        <div className="w-full font-montserrat mb-4">
          <div className="w-full font-montserrat mb-6 md:mb-4 flex flex-col sm:flex-row justify-between md:items-center gap-4">
            <h3 className="font-bold text-secondary-500">All Products</h3>
            <div className="flex items-center gap-4">
              <div className="w-full md:max-w-[240px]">
                <SearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={handleSearchQuery}
                />
              </div>

              <UiFilter
                clearFilter={clearFilter}
                filterOptions={filterDropDowonData}
                filterType={filterType}
              />
            </div>
          </div>
          {productsNodes && (
            <div>
              <div className="hidden md:block">
                <UiTable headers={productsHeaders} data={productsNodes} />
              </div>
              <div className="md:hidden">
                <UiMobileDataList
                  data={productsNodes}
                  headers={mobileProductHeaders}
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

        <AddProductModal
          isOpen={isEditProductVisible.value}
          onClose={() => {
            isEditProductVisible.off();
            setActiveProduct(undefined);
          }}
        />
        <DeleteConfirmation
          isDeleteLoading={isDeleteLoading.value}
          isOpen={isDeleteConfirmVisible.value}
          onAction={() => {
            if (activeProduct) {
              DeleteProduct();
            }
          }}
          onClose={() => {
            isDeleteConfirmVisible.off();
            setActiveProduct(undefined);
          }}
        />
        {outOfStockProducts && (
          <OutOfStockList
            showRestockItemModal={() => isRestockItemVisible.on()}
            isOpen={isOutOfStockListVisible.value}
            setActiveRestockItem={handleRestockItem}
            onClose={() => isOutOfStockListVisible.off()}
            outOfStockitems={outOfStockProducts?.outOfStockProducts}
          />
        )}

        {activeRestockItem && (
          <RestockItem
            isOpen={isRestockItemVisible.value}
            onClose={() => isRestockItemVisible.off()}
            reStockItem={activeRestockItem}
            showOutOfStockList={() => isOutOfStockListVisible.on()}
          />
        )}

        <EditCostPrice
          isOpen={isEditCostPriceVisible.value}
          reload={reloadQuery}
          onClose={() => {
            isEditCostPriceVisible.off();
            setActiveProduct(undefined);
            formData.setValue(initialProductState);
          }}
        />
      </div>
    </div>
  );
}
