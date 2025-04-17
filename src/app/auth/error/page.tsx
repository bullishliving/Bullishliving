'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';
import UiLoader from '@/components/ui/UiLoader';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'An unknown error occurred.';

  return (
    <Suspense fallback={<UiLoader/>}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          Authentication Error
        </h1>
        <p className="mt-2 text-gray-700">{message}</p>
      </div>
    </Suspense>
  );
}
