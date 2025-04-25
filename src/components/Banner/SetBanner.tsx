import useAddBannerMutation from "@/api/mutations/banner/useAddBannerMutation";

import useObjectState from "@/hooks/useObjectState";
import useToggle from "@/hooks/useToggle";

import Banner from "@/types/Banner";

import AddBannerSchema from "@/utils/schemas/AddBannerSchema";
import cloudinaryInstance from "@/utils/Cloudinary";

import UiButton from "../ui/UiButton";
import UiImageUploader from "../ui/UiImageUploader";
import UiModal from "../ui/UiModal";
import UiForm from "../ui/UiForm";
import UiInput from "../ui/UiInput";
import useUpdateBannerMutation from "@/api/mutations/banner/useUpdateBannerMutation";
import { useEffect } from "react";

//---

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  banner?: Banner;
  clearActiveBanner: VoidFunction
}

export default function SetBanner({ isOpen, banner, clearActiveBanner, onClose }: Props) {
  const { mutation: { mutateAsync: addBanner } } = useAddBannerMutation();
  const { mutaion: { mutateAsync: updateBanner } } = useUpdateBannerMutation();

  const loading = useToggle();

  const formData = useObjectState<Banner>(banner || {
    link: '',
    image: null
  } as Banner);

  function closeModal() {
    formData.reset()
    clearActiveBanner()
    onClose()
  }

  async function setBanner() {
    try {
      loading.on()
      let formattedData = {
        ...formData.value,
        link: formData.value.link === '' ? null : formData.value.link,
      };

      if (
        formData.value.image &&
        formData.value.image?.every((image) => image instanceof File)
      ) {
        const url = await cloudinaryInstance.upload(formData.value.image[0]);

        formattedData = {
          ...formattedData,
          image: [url]
        };
      }

      if (banner) {
        await updateBanner({ bannerId: banner.id, banner: formattedData as Banner })
      } else {
        await addBanner(formattedData as Banner);
      }
      closeModal()
    } catch (error) {
      console.error(error)
    } finally {
      loading.off()
    }
  }

  useEffect(() => {
    if (banner) {
      formData.setValue(banner);
    } else {
      formData.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner]);

  return (
    <UiModal
      title={`${banner ? 'Edit' : 'Create '} banner`}
      isOpen={isOpen}
      onClose={closeModal}
    >
      <UiForm
        formData={formData.value}
        onSubmit={setBanner}
        schema={AddBannerSchema}
      >
        {({ errors }) => (
          <div className="grid gap-3">
            <UiImageUploader
              name="image"
              onChange={formData.set}
              value={formData.value.image}
              acceptMultile={false}
              error={errors.image}
            />
            <UiInput
              label="Link (Optional)"
              name="link"
              onChange={formData.set}
              placeholder="Enter Link"
              roundedVariant="xl"
              value={formData.value.link}
            />
            <div className="mt-3">
              <UiButton loading={loading.value}>
                {banner ? 'Edit' : 'Create'} banner
              </UiButton>
            </div>
          </div>
        )}
      </UiForm>
    </UiModal>
  );
}
