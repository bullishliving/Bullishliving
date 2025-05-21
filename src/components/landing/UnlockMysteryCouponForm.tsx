'use client'

import useToggle from "@/hooks/useToggle";
import UiButton from "../ui/UiButton";
import UiForm from "../ui/UiForm";
import UiInput from "../ui/UiInput";
import useObjectState from "@/hooks/useObjectState";
import { Api } from "@/api/supabaseService";
import showToast from "../ui/UiToast";
import CommunityMember from "@/types/CommunityMember";
import JoinCommunitySchema from "@/utils/schemas/JoinCommunitySchema";
import { View } from "./MysteryDiscountModal";

interface Props {
  setActiveView: (view: View) => void;
}

export default function UnlockMysteryCouponForm({ setActiveView }: Props) {
  const formData = useObjectState({
    name: '',
    email: '',
  });
  
  const loading = useToggle();

  async function onSubmit() {
    try {
      loading.on();
      await Api.addCommunityMember(formData.value as CommunityMember);
      setActiveView('coupon');
    } catch (error) {
      console.log(error);
      showToast('oops, an error occured', 'error');
      throw new Error(`An error occured when adding memeber ${error}`);
    } finally {
      loading.off();
    }
  }

  return (
    <>
      <p className="text-center text-sm font-bold font-montserrat mb-6">
        You’ve <span className="text-danger-400">unlocked</span> a mystery
        discount
      </p>
      <UiForm
        formData={formData.value}
        onSubmit={onSubmit}
        schema={JoinCommunitySchema}
      >
        {({ errors }) => (
          <div className="grid gap-6">
            <UiInput
              name="name"
              label="Full Name"
              placeholder="Enter Full Name"
              roundedVariant="xl"
              onChange={formData.set}
              value={formData.value.name}
              error={errors.name}
            />
            <UiInput
              name="email"
              label="Email Address"
              placeholder="Enter Email Address"
              roundedVariant="xl"
              onChange={formData.set}
              value={formData.value.email}
              error={errors.email}
            />
            <UiButton loading={loading.value} >Reveal my discount</UiButton>
          </div>
        )}
      </UiForm>
    </>
  );
}
