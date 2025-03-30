'use client';

import { SetProductProvider } from '@/app/context/SetProductContext';

import AddProductModal from '@/components/inventory/AddProductModal';
import AdminBasePage from '@/components/layout/AdminBasePage';
import AnalyticsCard from '@/components/inventory/AnalyticsCard';
import ProductInventory from '@/components/inventory/ProductInventory';
import UiButton from '@/components/ui/UiButton';
import UiIcon from '@/components/ui/UiIcon';

import useToggle from '@/hooks/useToggle';

//---

export default function Page() {
  const isAddProductVisible = useToggle();

  function showAddProduct() {
    isAddProductVisible.on();
  }

  function hideAddProduct() {
    isAddProductVisible.off();
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
      <SetProductProvider>
        <ProductInventory />

        <AddProductModal
          isOpen={isAddProductVisible.value}
          onClose={hideAddProduct}
        />
      </SetProductProvider>

      
    </AdminBasePage>
  );
}
