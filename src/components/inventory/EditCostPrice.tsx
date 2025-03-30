import {
  useSetProductContext,
} from '@/app/context/SetProductContext';

import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiInput from '../ui/UiInput';
import UiModal from '../ui/UiModal';
import Product from '@/types/Product';

//---

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function EditCostPrice({ isOpen, onClose }: Props) {
  const { activeProduct } = useSetProductContext();
  return (
    <UiModal title="Edit Cost Price" isOpen={isOpen} onClose={onClose}>
      <UiForm formData={{}} onSubmit={() => {}}>
        {({ errors }) => (
          <div className="grid gap-4">
            <UiInput
              name=""
              type="number"
              label="Cost Price"
              roundedVariant="xl"
              placeholder="Enter Cost Price"
              onChange={() => {}}
              value={''}
            />
            <p className="mt-2 font-montserrat text-sm text-tertiary-700">
              CP: ₦
              {activeProduct?.discounted_price
                ? activeProduct?.discounted_price
                : activeProduct?.price}
            </p>
            <div className="pt-4 border-t">
              <UiButton>Save Changes</UiButton>
            </div>
          </div>
        )}
      </UiForm>
    </UiModal>
  );
}
