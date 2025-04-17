import AdminNavbar from '@/components/layout/AdminNavbar';

import { adminRoutes } from '@/utils/constant';

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <AdminNavbar routes={adminRoutes} />
      {children}
    </section>
  );
}
