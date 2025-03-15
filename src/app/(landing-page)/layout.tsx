import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { landingPageRoutes } from '@/utils/constant';

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar routes={landingPageRoutes} />
      {children}
      <Footer />
    </section>
  );
}
