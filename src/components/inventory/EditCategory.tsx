import useUpdateCategoryMutation from "@/api/mutations/categories/useUpdateCategoryMutation";


import useObjectState from "@/hooks/useObjectState";
import CreateCategorySchema from "@/utils/schemas/CreateCategorySchema";

import UiInput from "../ui/UiInput";
import UiForm from "../ui/UiForm";
import UiButton from "../ui/UiButton";
import showToast from "../ui/UiToast";


interface Props {
  categoryId: string
}

export default function EditCategory({ categoryId }: Props) {
  const { mutation: {mutateAsync: updateCategory, isPending} } = useUpdateCategoryMutation();
  const formData = useObjectState({
    name: '',
  });

  async function handleSubmit() {
    try {
      await updateCategory({ id: categoryId, data: formData.value});
      showToast('Category successfully edited', 'success');
      formData.reset()
    } catch (error) {
      console.log(error);
      showToast('Error editing category', 'error');
      throw new Error(`An error occured ${error}`)
    }
  }

  return (
    <UiForm
      formData={formData.value}
      onSubmit={handleSubmit}
      schema={CreateCategorySchema}
    >
      {({ errors }) => (
        <div>
          <UiInput
            name="name"
            onChange={formData.set}
            value={formData.value.name}
            placeholder="Enter Category name"
            roundedVariant="lg"
            error={errors.name}
          />
          <div className="mt-8 border-t pt-4">
            <UiButton loading={isPending}>Save Changes</UiButton>
          </div>
        </div>
      )}
    </UiForm>
  );
}
