'use client';

import { signup } from '@/api/actions/auth';

import AdminAuthWrapper from '@/components/layout/AdminAuthWrapper';
import UiForm from '@/components/ui/UiForm';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import useObjectState from '@/hooks/useObjectState';
import showToast from '@/components/ui/UiToast';

import signUpSchema from '@/utils/schemas/signUpSchema';
import useToggle from '@/hooks/useToggle';

export default function Page() {
  const signInFormData = useObjectState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const loading = useToggle();

  async function onSubmit() {
    try {
      loading.on();

      const formData = new FormData();
      formData.append('email', signInFormData.value.email);
      formData.append('password', signInFormData.value.password);

      const result = await signup(formData);

      if (result.success) {
        showToast(
          'Signup successful! please click the confirmation link in your mail',
          'success'
        );
      } else {
        showToast(result.error || 'error signing up', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Oops, something went wrong.', 'error');
    } finally {
      loading.off();
    }
  }

  return (
    <AdminAuthWrapper title="Sign up">
      <UiForm
        onSubmit={onSubmit}
        formData={signInFormData.value}
        schema={signUpSchema}
      >
        {({ errors }) => (
          <div className="grid gap-6">
            <UiInput
              name="email"
              onChange={signInFormData.set}
              value={signInFormData.value.email}
              placeholder="Enter your email"
              error={errors.email}
            />
            <UiInput
              name="password"
              type="password"
              onChange={signInFormData.set}
              value={signInFormData.value.password}
              placeholder="Enter your password"
              error={errors.password}
            />
            <UiInput
              name="confirmPassword"
              type="password"
              onChange={signInFormData.set}
              value={signInFormData.value.confirmPassword}
              placeholder="Enter your password"
              error={errors.confirmPassword}
            />
            <UiButton loading={loading.value}>Sign up</UiButton>
          </div>
        )}
      </UiForm>
    </AdminAuthWrapper>
  );
}
