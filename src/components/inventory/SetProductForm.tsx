import useObjectState from '@/hooks/useObjectState';

import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiImageUploader from '../ui/UiImageUploader';
import UiInput from '../ui/UiInput';
import UiRichTextEditor from '../ui/UiRichTextEditor';
import UiSelect from '../ui/UiSelect';

import ProductVariantList from './ProductVariantList';

//---

export default function SetProductForm() {
  const formData = useObjectState({
    name: '',
    images: null,
    category: '',
    price: '',
    discountedPrice: '',
    stock: '',
  });

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
            roundedVariant="lg"
          />
          <UiRichTextEditor content="" />
          <UiSelect
            name="category"
            placeholder="Select Category"
            label="Category"
            roundedVariant="lg"
            onChange={formData.set}
            options={[]}
            value={formData.value.category}
          />
          <UiInput
            name="price"
            label="Amount"
            placeholder="Enter Amount"
            onChange={formData.set}
            value={formData.value.price}
            roundedVariant="lg"
          />
          <UiInput
            name="discountedPrice"
            label="Discount price(Optional)"
            placeholder="Enter discounted price"
            onChange={formData.set}
            value={formData.value.discountedPrice}
            roundedVariant="lg"
          />
          <UiInput
            name="stock"
            label="Stock"
            placeholder="Total Number In Stock"
            onChange={formData.set}
            value={formData.value.stock}
            roundedVariant="lg"
          />
          <ProductVariantList />
          <div className="mt-4">
            <UiButton>Create product</UiButton>
          </div>
        </div>
      )}
    </UiForm>
  );
}
