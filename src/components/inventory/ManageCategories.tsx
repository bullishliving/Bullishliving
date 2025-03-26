'use client'

import { useState } from 'react';

import { useSetProductContext } from '@/app/context/SetProductContext';
import useAddCategoryMutation from "@/api/mutations/categories/useAddCategoryMutation";
import useDeleteCategoryMutation from "@/api/mutations/categories/useDeleteCategoryMutation";

import useObjectState from "@/hooks/useObjectState";
import CreateCategorySchema from '@/utils/schemas/CreateCategorySchema';
import showToast from "../ui/UiToast";
import UiForm from "../ui/UiForm";
import UiInput from "../ui/UiInput";
import UiButton from "../ui/UiButton";
import UiIcon from "../ui/UiIcon";
import UiRadio from "../ui/UiRadio";

import Category from "@/types/Category";
import UiDropDown, { DropDownData } from "../ui/UiDropDown";

interface Props {
  categories: Category[];
  handleActiveView: (index: number) => void;
  setActiveCategoryId: (categoryId: string) => void;
}

export default function ManageCategories({ categories,  handleActiveView, setActiveCategoryId }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const { mutation: {mutateAsync: addCategory, isPending: isAddCategoryLoading } } = useAddCategoryMutation();
  const { mutation: {mutateAsync: deleteCategory } } = useDeleteCategoryMutation();

  const { formData: setProductData } = useSetProductContext();
  
  const formData = useObjectState({
    name: ''
  });


  const categoryActionsOptions: DropDownData[] = [
    {
      label: (
        <div className="flex justify-between items-center gap-2 text-sm text-[#4F4F4F]">
          <UiIcon icon="Edit" size="24" />
          Edit
        </div>
      ),
      func: (id) => {
        setActiveCategoryId(id || '');
        handleActiveView(3)
      },
    },
    {
      label: (
        <div className="flex justify-between items-center gap-2 text-sm text-[#E41C11] stroke-[#E41C11]">
          <UiIcon icon="Trash" size="24" />
          Delete
        </div>
      ),
      func: (id) => {
        removeCategory(id || '') 
      },
    },
  ];

  async function removeCategory(id: string) {
    try {
      await deleteCategory(id);
      showToast('Category successfully deleted!', 'success');
    } catch (error) {
      console.log(error);
      showToast('Error deleting category', 'error');
      throw new Error(`An error occured ${error}`);
    }
  }

  async function handleSubmit() {
    try {
      await addCategory(formData.value);
      showToast('Category successfully added!', 'success');
      formData.reset()

    } catch (error) {
      console.log(error);
        showToast('Error adding category', 'error');
      throw new Error(`An error occured ${error}`)
    }    
  }

  return (
    <div>
      <div className="">
        {categories?.map((category, index) => (
          <div
            key={index}
            className={`h-14 flex justify-between items-center  ${index < categories.length - 1 && 'border-b border-grey-400'}`}
          >
            <UiRadio
              formValue={selectedCategoryId}
              label={category.name}
              name=""
              onChange={(param) => setSelectedCategoryId(param.value)}
              value={category.id}
            />
            <UiDropDown options={categoryActionsOptions} itemId={category.id} />
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-white">
        <div className="px-4 py-6 border-y mt-6 mb-4">
          <UiForm
            formData={formData.value}
            onSubmit={handleSubmit}
            schema={CreateCategorySchema}
          >
            {({ errors }) => (
              <div className="flex gap-3 sm:gap-4 items-center">
                <div className=" shrink flex-1">
                  <UiInput
                    name="name"
                    placeholder="Enter Category name"
                    onChange={formData.set}
                    value={formData.value.name}
                    roundedVariant="lg"
                    error={errors.name}
                  />
                </div>
                <button className=" min-w-14 h-14 xs:hidden rounded-full bg-primary-500 stroke-secondary-500 flex justify-center items-center">
                  <UiIcon icon="Add" size="32" />
                </button>

                <div className="max-w-[138px] w-full hidden xs:block">
                  <UiButton size="md" loading={isAddCategoryLoading}>
                    Save Category
                  </UiButton>
                </div>
              </div>
            )}
          </UiForm>
        </div>
        <UiButton
          type='button'
          disabled={selectedCategoryId === ''}
          onClick={() =>
            setProductData.set({ name: 'category_id', value: selectedCategoryId })
          }
        >
          Save Changes
        </UiButton>
      </div>
    </div>
  );
}
