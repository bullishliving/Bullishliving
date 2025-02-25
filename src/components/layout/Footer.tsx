'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import Logo from '@/assets/svg/logo.svg';
import LogoDark from '@/assets/svg/logo-dark.svg';

export default function Footer() {
  const pathname = usePathname();

  const isYellowRoute = pathname.includes('/partnership-details');

  const footerBg = isYellowRoute ? 'bg-primary-500' : 'bg-secondary-500';

  return (
    <footer className={`py-16 ${footerBg}`}>
      <div className="flex flex-col items-center justify-center">
        <Link href="/" className="w-10 h-[27px]">
          {isYellowRoute ? <LogoDark /> : <Logo />}
        </Link>
        <p
          className={`mt-6 font-montserrat text-sm ${isYellowRoute ? 'text-secondary-500' : 'text-white'}`}
        >
          © 2024, BullishLiving Essentials
        </p>
      </div>
    </footer>
  );
}
