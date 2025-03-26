'use client';

import {  useState } from 'react';
import Image from 'next/image';

import useDeleteProductMutaion from '@/api/mutations/products/useDeleteProductCategory';
import useProductQuery from '@/api/query/useProductsQuery';
import {
  SetProductProvider,
} from '@/app/context/SetProductContext';

import AddProductModal from '@/components/inventory/AddProductModal';
import AdminBasePage from '@/components/layout/AdminBasePage';
import AnalyticsCard from '@/components/inventory/AnalyticsCard';
import UiButton from '@/components/ui/UiButton';
import UiDropDown, { DropDownData } from '@/components/ui/UiDropDown';
import UiIcon from '@/components/ui/UiIcon';
import UiLoader from '@/components/ui/UiLoader';
import UiTable, { Header } from '@/components/ui/UiTable';

import useToggle from '@/hooks/useToggle';

import Product from '@/types/Product';
import showToast from '@/components/ui/UiToast';

export default function Page() {
  const { query: {data: products, isLoading: isProductsLoading}, getProduct } = useProductQuery();
  const { mutation: { mutateAsync: deleteProduct }, removeProduct } = useDeleteProductMutaion();
  const [activeProduct, setActiveProduct] = useState<Product | undefined>(
    undefined
  );
  const isAddProductVisible = useToggle();
    
  function showAddProduct() {
    isAddProductVisible.on();
    setActiveProduct(undefined);
  }

  function hideAddProduct() {
    isAddProductVisible.off();
    setActiveProduct(undefined)
  };

  async function DeleteProduct(id: number) {
    try {
      await deleteProduct(id);
      showToast('product deleted', 'success')
    } catch (error) {
        showToast('Error deleting category', 'error');
        throw new Error(`An error occured ${error}`);
    }
  }

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
      func: () => {

      },
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
        isAddProductVisible.on()
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
        DeleteProduct(Number(id));
        removeProduct(Number(id));
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

  const productsData = products?.map((product) => {    
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
          <div className='flex gap-2 items-center'>
            <p>{product.name}</p>{' '}
            {product.variants.length > 0 && <span className='text-orange-400 text-xs rounded-full w-[25px] h-6 bg-orange-50 flex justify-center items-center'>V</span>}
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
      action: <UiDropDown align='start' side='bottom' options={productDropDownOptions} itemId={`${product.id}`}/>,
    };
  })

  if(isProductsLoading) {
    return <UiLoader/>
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
      {productsData && (
        <div className="bg-white p-4 rounded-[8px]">
          <div className="w-full font-montserrat mb-4">
            <h3 className="font-bold text-secondary-500">All Products</h3>
          </div>
          <UiTable headers={productsHeaders} data={productsData} />
        </div>
      )}
      <SetProductProvider defaultProduct={activeProduct}>
        <AddProductModal
          isOpen={isAddProductVisible.value}
          onClose={hideAddProduct}
        />
      </SetProductProvider>
    </AdminBasePage>
  );
}
