'use client'

import useToggle from '@/hooks/useToggle';

import useObjectState from '@/hooks/useObjectState';
import loginSchema from '@/utils/schemas/loginSchema';
import { login } from '@/api/actions/auth';
import showToast from '@/components/ui/UiToast';
import UiForm from '@/components/ui/UiForm';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import AdminAuthWrapper from '@/components/layout/AdminAuthWrapper';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const loginFormData = useObjectState({
    email: '',
    password: '',
  });

  const loading = useToggle();
  const router = useRouter();

  async function onSubmit() {
    try {
      loading.on();

      const formData = new FormData();
      formData.append('email', loginFormData.value.email);
      formData.append('password', loginFormData.value.password);

      const result = await login(formData);

      if (result.success) {
        showToast('Login successful! 🎉', 'success');

        setTimeout(() => {
          router.push('/admin/dashboard') 
        }, 1500);

      } else {
        showToast(
          result.error || 'Invalid credentials, please try again.',
          'error'
        );
      }
    } catch (error) {
      console.error(error);
      showToast('Oops, something went wrong.', 'error');
    } finally {
      loading.off();
    }
  }


  return (
    <AdminAuthWrapper title="Login">
      <UiForm
        formData={loginFormData.value}
        onSubmit={onSubmit}
        schema={loginSchema}
      >
        {({ errors }) => (
          <div className="grid gap-6">
            <UiInput
              name="email"
              onChange={loginFormData.set}
              value={loginFormData.value.email}
              placeholder="Enter your email"
              error={errors.email}
            />
            <UiInput
              name="password"
              type="password"
              onChange={loginFormData.set}
              value={loginFormData.value.password}
              placeholder="Enter your password"
              error={errors.password}
            />
            <UiButton loading={loading.value}>Login</UiButton>
          </div>
        )}
      </UiForm>
    </AdminAuthWrapper>
  );
}
