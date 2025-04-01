'use client';

import { SetProductProvider } from '@/app/context/SetProductContext';

import AddProductModal from '@/components/inventory/AddProductModal';
import AdminBasePage from '@/components/layout/AdminBasePage';
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
