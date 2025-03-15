'use client';

import Link from 'next/link';

import BullishLogo from '@/assets/svg/logo-dark.svg';

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';
import { usePathname } from 'next/navigation';

interface Props {
  routes: {
    path?: string;
    label: string;
    func?: VoidFunction;
  }[];
  isNavOpen: boolean;
  closeNav: VoidFunction;
}

export default function MobileNav({ routes, isNavOpen, closeNav }: Props) {
  const currentRoute = usePathname();

  function isActive(href: string) {
    return currentRoute === href;
  }

  return (
    <nav
      className={`fixed z-40 md:hidden top-0 left-0 flex flex-col justify-between bg-primary-500 w-full h-screen px-4 pb-8 transition-transform ease-in-out duration-300 ${
        isNavOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div>
        <div className="flex items-center justify-between py-[18px] mb-6">
          <BullishLogo />
          <button
            onClick={closeNav}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-black stroke-black"
          >
            <UiIcon icon="Close" size="16" />
          </button>
        </div>
        <ul className="text-secondary-500 md:flex gap-3 items-center text-sm font-montserrat ">
          {routes.map((route, index) => (
            <li
              onClick={() => {
                route?.func?.();
                closeNav();
              }}
              className={`relative flex items-center gap-3 border-b border-secondary-500 py-4 text-sm  ${isActive(route.path || '') ? 'font-black' : 'font-semibold'}`}
              key={index}
            >
              <Link href={route.path || currentRoute}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <UiButton variant="secondary">View All Products</UiButton>
    </nav>
  );
}
