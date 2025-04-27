
import { Api } from '@/api/supabaseService';
import { useInventoryStore } from '@/Store/InventoryStore';

import useObjectState from '@/hooks/useObjectState';
import useToggle from '@/hooks/useToggle';

import { getUpdateCostPriceSchema } from '@/utils/schemas/UpdateCostPriceSchema';
import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiInput from '../ui/UiInput';
import UiModal from '../ui/UiModal';
import showToast from '../ui/UiToast';

//---

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  reload: VoidFunction
}

export default function EditCostPrice({ isOpen, onClose, reload }: Props) {
  const { activeProduct } = useInventoryStore();
  const formData = useObjectState({
    costPrice: ''
  });
  const loading = useToggle();

  async function onSubmit() {
    if(!activeProduct) throw new Error('no active product');

    try {
      loading.on();
      await Api.updateCostPrice(activeProduct.id, activeProduct.discounted_price ? 'discounted_price' : 'price', formData.value.costPrice);
      reload()
      showToast('Cost price updated', 'success')
      onClose()
    } catch (error) {
      console.log(error);
      showToast('could not update cost price', 'error');
      
    } finally {
      loading.off()
    }
  };

  return (
    <UiModal title="Edit Cost Price" isOpen={isOpen} onClose={onClose}>
      <UiForm
        formData={formData.value}
        onSubmit={onSubmit}
        schema={getUpdateCostPriceSchema(activeProduct?.discounted_price ? activeProduct.price : undefined)}
      >
        {({ errors }) => (
          <div className="grid gap-4">
            <UiInput
              name="costPrice"
              type="number"
              label="Cost Price"
              roundedVariant="xl"
              placeholder="Enter Cost Price"
              onChange={formData.set}
              value={formData.value.costPrice}
              error={errors.costPrice}
            />
            <p className="mt-2 font-montserrat text-sm text-tertiary-700">
              CP: ₦
              {activeProduct?.discounted_price
                ? activeProduct?.discounted_price
                : activeProduct?.price}
            </p>
            <div className="pt-4 border-t">
              <UiButton loading={loading.value}>Save Changes</UiButton>
            </div>
          </div>
        )}
      </UiForm>
    </UiModal>
  );
}
