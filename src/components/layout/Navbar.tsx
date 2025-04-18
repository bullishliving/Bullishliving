'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import BullishLogo from '@/assets/svg/logo.svg';

import QueryProvider from '@/components/QueryProvider';

import { useCartStore } from '@/Store/CartStore';

import useToggle from '@/hooks/useToggle';

import UiIcon from '../ui/UiIcon';
import UiButton from '../ui/UiButton';

import SearchPanel from './SearchPanel';
import MobileNav from './MobileNav';
import NavItem from './NavItem';

// --

interface Props {
  routes: {
    label: string;
    path: string;
  }[];
}

export default function Navbar({ routes }: Props) {
  const isSearchPanelVisible = useToggle();
  const isMobileNavVisible = useToggle();

  const pathname = usePathname();

  const whiteRoutes = ['/products', '/cart', '/checkout'];
  const isWhite = whiteRoutes.some((route) => pathname.startsWith(route));
  const cartCount = useCartStore((state) => state.cartItems.length);
  const refreshCartItems = useCartStore((state) => state.refreshCartItems);

  function closeNav() {
    isMobileNavVisible.off();
  }

  function toggleMobileNav() {
    isMobileNavVisible.toggle();
  }

  useEffect(() => {
    refreshCartItems();
  }, [refreshCartItems]);

  return (
    <nav
      className={`${isWhite ? 'bg-white border-b border-gray-300' : 'bg-secondary-500'} fixed z-50 w-full top-0 py-4 px-4 md:px-6 md:py-8 2xl:p-8`}
    >
      <div className="relative max-w-[1280px] mx-auto flex justify-between items-center ">
        <Link href="/" className="w-10 h-[27px] md:w-14 md:h-[38px]">
          <BullishLogo />
        </Link>
        <ul
          className={`hidden lg:flex gap-3 items-center text-sm font-montserrat ${isWhite ? 'text-secondary-500' : 'text-white'} `}
        >
          {routes.map((route, index) => (
            <li className="relative flex items-center gap-3" key={index}>
              <NavItem {...route} />
              {index < routes.length - 1 && (
                <div
                  className={`w-1 h-1 rounded-full ${isWhite ? 'bg-secondary-500' : 'bg-white'}`}
                ></div>
              )}
            </li>
          ))}
        </ul>
        <div
          className={`flex gap-6 items-center ${isWhite ? 'stroke-secondary-500' : 'stroke-white'}`}
        >
          <button onClick={() => isSearchPanelVisible.toggle()}>
            <UiIcon icon="Search" size="24" />
          </button>
          <Link href="/cart" className="relative">
            {cartCount > 0 && (
              <div className="absolute -top-[21.3%] -right-[28.3%] w-5 h-5 rounded-full flex justify-center items-center text-white text-xs font-montserrat font-medium bg-danger-500 ">
                {cartCount}
              </div>
            )}
            <UiIcon icon="Cart" size="24" />
          </Link>
          <button onClick={toggleMobileNav} className="lg:hidden">
            <UiIcon icon="Hamburger" size="24" />
          </button>
        </div>
        {isSearchPanelVisible.value && (
          <QueryProvider>
            <SearchPanel onClose={() => isSearchPanelVisible.off()} />
          </QueryProvider>
        )}
      </div>
      <MobileNav
        routes={routes}
        isNavOpen={isMobileNavVisible.value}
        closeNav={closeNav}
        bottomNode={<UiButton variant="secondary">View All Products</UiButton>}
      />
    </nav>
  );
}
