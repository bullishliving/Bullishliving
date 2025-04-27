'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import Logo from '@/assets/svg/logo.svg';
import LogoDark from '@/assets/svg/logo-dark.svg';

export default function Footer() {
  const pathname = usePathname();

  const blackRoutes = ['/products', '/cart', '/checkout'];

  const isBlackRoute = blackRoutes.some((route) => pathname.startsWith(route));

  const footerBg = isBlackRoute ? 'bg-secondary-500' : 'bg-primary-500';

  return (
    <footer className={`py-10 ${footerBg}`}>
      <div className="flex flex-col items-center justify-center">
        <Link href="/" className="w-10 h-[27px]">
          {isBlackRoute ? <Logo /> : <LogoDark />}
        </Link>
        <p
          className={`mt-6 font-montserrat text-sm ${isBlackRoute ? 'text-white' : 'text-secondary-500'}`}
        >
          © 2024, BullishLiving Essentials
        </p>
      </div>
    </footer>
  );
}
