
import { useSetProductContext } from '@/app/context/SetProductContext';

import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiImageUploader from '../ui/UiImageUploader';
import UiInput from '../ui/UiInput';
import UiRichTextEditor from '../ui/UiRichTextEditor';
import UiSelect, { Option } from '../ui/UiSelect';

import ProductVariantList from './ProductVariantList';
import UiIcon from '../ui/UiIcon';
import Category from '@/types/Category';

//---

interface Props {
  categories: Category[];
  onSetActiveView: (index: number) => void;
}

export default function SetProductForm({ categories, onSetActiveView }: Props) {
  const { formData } = useSetProductContext()
  
  const formattedCategories: Option[] = categories?.map((category) => ({
    label: category.name,
    value: category.id
  })) || [];

  function onSubmit() {
    console.log(formData.value);
  }


  return (
    <UiForm formData={formData.value} onSubmit={onSubmit}>
      {({}) => (
        <div className="grid gap-4">
          <UiImageUploader
            name="images"
            onChange={formData.set}
            onSetPreviewUrl={() => {}}
            value={formData.value.images}
          />
          <UiInput
            name="name"
            label="Product Name"
            placeholder="Enter name"
            onChange={formData.set}
            value={formData.value.name}
            roundedVariant="xl"
          />
          <UiRichTextEditor content="" />
          <UiSelect
            name="category"
            placeholder="Select Category"
            label="Category"
            roundedVariant="lg"
            onChange={formData.set}
            options={formattedCategories}
            value={formData.value.category}
            isSearchable
            bottomNode={
              <div className="border-t bg-white">
                <UiButton
                  variant="primary-text"
                  onClick={() => onSetActiveView(2)}
                >
                  {' '}
                  <p className="texto-sm">Manage Categories</p>
                  <UiIcon icon="ArrowRight" size="24" />
                </UiButton>
              </div>
            }
          />
          <UiInput
            name="price"
            label="Amount"
            placeholder="Enter Amount"
            onChange={formData.set}
            value={formData.value.price}
            roundedVariant="xl"
          />
          <UiInput
            name="discountedPrice"
            label="Discount price(Optional)"
            placeholder="Enter discounted price"
            onChange={formData.set}
            value={formData.value.discountedPrice}
            roundedVariant="xl"
          />
          <UiInput
            name="stock"
            label="Stock"
            placeholder="Total Number In Stock"
            onChange={formData.set}
            value={formData.value.stock}
            roundedVariant="xl"
          />
          <ProductVariantList showVariantForm={() => onSetActiveView(1)} />
          <div className="mt-4">
            <UiButton>Create product</UiButton>
          </div>
        </div>
      )}
    </UiForm>
  );
}
