'use client'

import QueryProvider from '@/components/QueryProvider';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <QueryProvider>
      <section className="bg-grey-100 overflow-x-hidden">{children}</section>
    </QueryProvider>
  );
}
