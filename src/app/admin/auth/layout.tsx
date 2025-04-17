import BullishLogo from '@/assets/svg/logo.svg';
import Link from 'next/link';

export default function AdminAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="relative flex justify-center items-center h-screen">
      <Link
        href="/"
        className="absolute top-6 left-6 w-10 h-[27px] md:w-14 md:h-[38px]"
      >
        <BullishLogo />
      </Link>
      {children}
    </section>
  );
}
