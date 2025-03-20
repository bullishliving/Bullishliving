'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/supabaseServer';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.log(error);

      return { error: `Invalid email or password.` };
    }

    revalidatePath('/', 'layout');

    return { success: true };
  } catch {
    return { errors: { form: 'Something went wrong.' } };
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    const { error } = await supabase.auth.signUp(data);

    if (error) {
      console.log(error);
      return { error: `Sign up failed please try again ` };
    }

    revalidatePath('/', 'layout');

    return { success: true };
  } catch {
    return { errors: { form: 'Something went wrong.' } };
  }
}

export async function logout() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      return { error: `logout failed please try again ` };
    }

    revalidatePath('/', 'layout');

    return { success: true };
  } catch {
    return { errors: { form: 'Something went wrong.' } };
  }
}
