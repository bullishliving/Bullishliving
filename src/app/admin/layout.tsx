'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <section className="bg-grey-100 overflow-x-hidden">{children}</section>
    </QueryClientProvider>
  );
}
