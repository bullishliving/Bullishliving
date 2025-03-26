import DOMPurify from "dompurify";

import useAddProductMutation from "@/api/mutations/products/useAddProductMutation";
import useUpdateProductMutation from "@/api/mutations/products/useUpdateProductMutation";

import { useSetProductContext } from '@/app/context/SetProductContext';

import Category from '@/types/Category';
import cloudinaryInstance from '@/utils/Cloudinary';
import useToggle from "@/hooks/useToggle";
import AddProductSchema from "@/utils/schemas/AddProductSchema";

import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiIcon from '../ui/UiIcon';
import UiImageUploader from '../ui/UiImageUploader';
import UiInput from '../ui/UiInput';
import UiRichTextEditor from '../ui/UiRichTextEditor';
import UiSelect, { Option } from '../ui/UiSelect';

import ProductVariantList from './ProductVariantList';
import showToast from "../ui/UiToast";

//---

interface Props {
  categories: Category[];
  onSetActiveView: (index: number) => void;
  closeModal: VoidFunction;
}

export default function SetProductForm({ categories, onSetActiveView, closeModal }: Props) {
  const { formData,  } = useSetProductContext();
  const { mutation: {mutateAsync: addProduct, isPending: isAddProductPening} } = useAddProductMutation();
  const { mutation: {mutateAsync: updateProduct, isPending: isUpdateProductPending}, setProduct } = useUpdateProductMutation();
  const loading = useToggle();
  const isAddProductLoading = loading.value || isAddProductPening || isUpdateProductPending;
  
  const formattedCategories: Option[] = categories?.map((category) => ({
    label: category.name,
    value: category.id
  })) || [];

  async function onSubmit() {
    try {
      loading.on();
      let formarttedProduct = {
        ...formData.value,
        description: DOMPurify.sanitize(formData.value.description),
      };

      if (
        formData.value.images &&
        formData.value.images?.every((image) => image instanceof File)
      ) {
        const urls = await cloudinaryInstance.uploadMultiple(formData.value.images)
        formarttedProduct = {
          ...formarttedProduct,
          images: urls
        }
      }
      if (!formData.value?.id) {
        await addProduct(formarttedProduct);
        showToast('product successfully added!', 'success');
      } else {
        console.log({ ...formarttedProduct, id: formData.value.id });
        showToast('product successfully updated!', 'success');
        await updateProduct({...formarttedProduct, id: formData.value.id})
        setProduct({ ...formarttedProduct, id: formData.value.id });
      }
      
      closeModal()

    } catch (error) {
      console.log(error);
      showToast('error adding product', 'error');
    } finally {
      loading.off()
    }
    
  }

  return (
    <UiForm
      formData={formData.value}
      schema={AddProductSchema}
      onSubmit={onSubmit}
    >
      {({ errors }) => (
        <div className="grid gap-4">
          <UiImageUploader
            name="images"
            onChange={formData.set}
            value={formData.value.images}
            error={errors.images}
          />
          <UiInput
            name="name"
            label="Product Name"
            placeholder="Enter name"
            onChange={formData.set}
            value={formData.value.name}
            roundedVariant="xl"
            error={errors.name}
          />
          <UiRichTextEditor
            name="description"
            onChange={formData.set}
            value={formData.value.description}
            label="Description"
            error={errors.description}
          />
          <UiSelect
            name="category_id"
            placeholder="Select Category"
            label="Category"
            roundedVariant="lg"
            onChange={formData.set}
            options={formattedCategories}
            value={formData.value.category_id}
            error={errors.category_id}
            isSearchable
            bottomNode={
              <div className="border-t bg-white">
                <UiButton
                  type="button"
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
            error={errors.price}
          />
          <UiInput
            name="discounted_price"
            label="Discount price(Optional)"
            placeholder="Enter discounted price"
            onChange={formData.set}
            value={formData.value.discounted_price}
            roundedVariant="xl"
          />
          {formData.value.variants.length < 1 && (
            <UiInput
              name="stock"
              label="Stock"
              placeholder="Total Number In Stock"
              onChange={formData.set}
              value={formData.value.stock}
              roundedVariant="xl"
            />
          )}

          <ProductVariantList showVariantForm={() => onSetActiveView(1)} />
          <div className="mt-4">
            <UiButton loading={isAddProductLoading}>Create product</UiButton>
          </div>
        </div>
      )}
    </UiForm>
  );
}
