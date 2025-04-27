import DOMPurify from "dompurify";

import useAddProductMutation from "@/api/mutations/products/useAddProductMutation";
import useUpdateProductMutation from "@/api/mutations/products/useUpdateProductMutation";

import useToggle from "@/hooks/useToggle";

import Category from '@/types/Category';
import Product from '@/types/Product';
import UseObjectStateReturn from "@/types/UseObjectStateReturn";
import cloudinaryInstance from '@/utils/Cloudinary';
import getAddProductSchema from "@/utils/schemas/AddProductSchema";

import showToast from "../ui/UiToast";
import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiIcon from '../ui/UiIcon';
import UiImageUploader from '../ui/UiImageUploader';
import UiInput from '../ui/UiInput';
// import UiRichTextEditor from '../ui/UiRichTextEditor';
import UiTextarea from "../ui/UiTextarea";
import UiSelect, { Option } from '../ui/UiSelect';

import ProductVariantList from './ProductVariantList';
import ProductRequest from "@/types/ProductRequest";
import { useInventoryStore } from "@/Store/InventoryStore";

//---

interface Props {
  categories: Category[];
  productFormData: UseObjectStateReturn<ProductRequest | Product>;
  onSetActiveView: (index: number) => void;
  closeModal: VoidFunction;
}

export default function SetProductForm({ categories, productFormData, onSetActiveView, closeModal }: Props) {
  const { mutation: {mutateAsync: addProduct, isPending: isAddProductPening} } = useAddProductMutation();
  const { mutation: {mutateAsync: updateProduct, isPending: isUpdateProductPending}, setProduct } = useUpdateProductMutation();
  const { activeProduct } = useInventoryStore();

  const loading = useToggle();

  const isAddProductLoading = loading.value || isAddProductPening || isUpdateProductPending;  
  
  const formattedCategories: Option[] = categories?.map((category) => ({
    label: category.name,
    value: `${category.id}`
  })) || [];
  
  async function onSubmit() {
    try {
      loading.on();

      const formattedVariants = productFormData.value?.variants.map(
        (variant) => ({
          ...variant,
          values: variant.values.map((value) => ({
            ...value,
            stock: Number(value.stock) || 0,
          })),
        })
      );

      let formarttedProduct = {
        ...productFormData.value,
        description: DOMPurify.sanitize(productFormData.value.description),
        price: Number(productFormData.value.price),
        discounted_price: productFormData.value.discounted_price
          ? Number(productFormData.value.discounted_price)
          : null,
        stock:
          productFormData.value.variants.length > 0
            ? null
            : Number(productFormData.value.stock),
        variants: formattedVariants,
      };

      if (
        productFormData.value.images &&
        productFormData.value.images?.every((image) => image instanceof File)
      ) {
        const urls = await cloudinaryInstance.uploadMultiple(
          productFormData.value.images
        );
        formarttedProduct = {
          ...formarttedProduct,
          images: urls,
        };
      }
      if (!productFormData.value?.id) {
        await addProduct(formarttedProduct as Product);
      } else {
        await updateProduct({
          ...formarttedProduct,
          id: productFormData.value.id,
        } as Product);
        setProduct({
          ...formarttedProduct,
          id: productFormData.value.id,
        } as Product);
      }
      showToast('done!', 'success');
      
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
      formData={productFormData.value}
      schema={getAddProductSchema()}
      onSubmit={onSubmit}
    >
      {({ errors }) => (
        <div className="grid gap-4">
          {errors.stock}
          <UiImageUploader
            name="images"
            onChange={productFormData.set}
            value={productFormData.value.images}
            error={errors.images}
          />
          <UiInput
            name="name"
            label="Product Name"
            placeholder="Enter name"
            onChange={productFormData.set}
            value={productFormData.value.name}
            roundedVariant="xl"
            error={errors.name}
          />
          <UiTextarea
            name="description"
            onChange={productFormData.set}
            value={productFormData.value.description}
            variant="light"
            roundedVariant="xl"
            label="Description"
            placeholder="enter product description"
            error={errors.description}
          />
          {/* <UiRichTextEditor
            name="description"
            onChange={productFormData.set}
            value={productFormData.value.description}
            label="Description"
            error={errors.description}
          /> */}
          <UiSelect
            name="category_id"
            placeholder="Select Category"
            label="Category"
            roundedVariant="lg"
            onChange={productFormData.set}
            options={formattedCategories}
            value={productFormData.value.category_id}
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
            onChange={productFormData.set}
            value={productFormData.value.price}
            roundedVariant="xl"
            error={errors.price}
          />
          <UiInput
            name="discounted_price"
            label="Discount price(Optional)"
            placeholder="Enter discounted price"
            onChange={productFormData.set}
            value={productFormData.value.discounted_price}
            roundedVariant="xl"
            error={errors.discounted_price}
          />
          {productFormData.value.variants.length < 1 && (
            <UiInput
              name="stock"
              label="Stock"
              placeholder="Total Number In Stock"
              onChange={productFormData.set}
              value={productFormData.value.stock}
              roundedVariant="xl"
              error={errors.stock}
            />
          )}

          <ProductVariantList
            productFormData={productFormData}
            showVariantForm={() => onSetActiveView(1)}
          />
          <div className="mt-4">
            <UiButton loading={isAddProductLoading}>
              {activeProduct ? 'Save' : 'Create'} product
            </UiButton>
          </div>
        </div>
      )}
    </UiForm>
  );
}
