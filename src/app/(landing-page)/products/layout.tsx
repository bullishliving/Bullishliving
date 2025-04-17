import QueryProvider from "@/components/QueryProvider";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
