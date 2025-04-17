import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

import { Api } from '@/api/supabaseService';

import useObjectState from '@/hooks/useObjectState';
import useToggle from '@/hooks/useToggle';

import OutOfStockProduct from '@/types/OutOfStockProduct';

import showToast from '../ui/UiToast';
import UiForm from '../ui/UiForm';
import UiIcon from '../ui/UiIcon';
import UiInput from '../ui/UiInput';
import UiModal from '../ui/UiModal';
import UiButton from '../ui/UiButton';

interface Props {
  isOpen: boolean;
  reStockItem: OutOfStockProduct
  onClose: VoidFunction;
  showOutOfStockList: VoidFunction
}

export default function RestockItem({ isOpen, reStockItem, onClose, showOutOfStockList }: Props) {
  const formData = useObjectState({
    stock: ''
  });

  const queryClient = useQueryClient();
  const loading = useToggle();

  async function updateStock() {
    try {
      loading.on()
      await Api.updateStock(
        reStockItem.product_id,
        Number(formData.value.stock),
        reStockItem.variant_type,
        reStockItem.variant_value,
      );
      queryClient.invalidateQueries({ queryKey: ['oosProducts', 'products'] });
      showToast('stock updated', 'success')
      showOutOfStockList()
      onClose();

    } catch (error) {
      console.log(error);
      showToast('error updating stock', 'error');
      
    } finally {
      loading.off()
    }
  }

  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      startNode={
        <button
          onClick={() => {
            showOutOfStockList();
            onClose();
          }}
          className="stroke-secondary-500"
        >
          <UiIcon icon="ArrowLeft" size="24" />
        </button>
      }
      title="Re-Stock Product"
    >
      <div className="font-montserrat">
        <div className="flex items-center gap-4 border border-grey-400 bg-[#F4F4F4] p-3 rounded-lg mb-6">
          <Image
            alt={reStockItem.name}
            src={reStockItem.image}
            width={64}
            height={64}
            className="w-16 h-16 rounded-lg"
          />
          <div>
            <p className="font-bold text-secondary-500 text-sm mb-1">
              {reStockItem.name}
            </p>
            {reStockItem.variant_value && (
              <p className="text-xs text-[#7D7D7D]">
                {reStockItem.variant_value}
              </p>
            )}
          </div>
        </div>
        <UiForm formData={formData.value} onSubmit={() => {}}>
          {({ errors }) => (
            <div className="grid">
              <UiInput
                name="stock"
                value={formData.value.stock}
                onChange={formData.set}
                label="Stock"
                placeholder="Total number in stock"
                type="number"
                roundedVariant="xl"
                error={errors.stock}
              />
              <div className="mt-8">
                <UiButton onClick={updateStock} loading={loading.value}>
                  {' '}
                  Re-Stock Product
                </UiButton>
              </div>
            </div>
          )}
        </UiForm>
      </div>
    </UiModal>
  );
}
