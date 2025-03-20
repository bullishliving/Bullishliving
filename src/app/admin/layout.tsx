export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="bg-grey-100">{children}</section>;
}
