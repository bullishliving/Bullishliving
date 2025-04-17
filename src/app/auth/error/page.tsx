'use client';

import { Suspense } from 'react';

import UiLoader from '@/components/ui/UiLoader';
import ErrorClient from './ErrorClient';

export default function AuthErrorPage() {

  return (
    <Suspense fallback={<UiLoader/>}>
      <ErrorClient/>
    </Suspense>
  );
}
