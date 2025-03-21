'use client';

import Link from 'next/link';

import BullishLogo from '@/assets/svg/logo.svg';

import useToggle from '@/hooks/useToggle';

import UiIcon from '../ui/UiIcon';
import SearchPanel from './SearchPanel';

import MobileNav from './MobileNav';
import NavItem from './NavItem';

// --

export default function Navbar() {
  const isSearchPanelVisible = useToggle();
  const isMobileNavVisible = useToggle();

  const routes = [
    {
      label: 'All Products',
      path: '',
    },
    {
      label: 'Running Community',
      path: '/#community',
    },
    {
      label: 'Partner With Us',
      path: '/partnership-details',
    },
    {
      label: 'About Us',
      path: '/about-us',
    },
  ];

  function closeNav() {
    isMobileNavVisible.off();
  }

  function toggleMobileNav() {
    isMobileNavVisible.toggle();
  }

  return (
    <nav className="bg-secondary-500 py-4 px-4 md:px-6 md:py-8 2xl:p-8">
      <div className="relative max-w-[1280px] mx-auto flex justify-between items-center ">
        <Link href="/" className="w-10 h-[27px] md:w-14 md:h-[38px]">
          <BullishLogo />
        </Link>
        <ul className="hidden text-white md:flex gap-3 items-center text-sm font-montserrat font-bold">
          {routes.map((route, index) => (
            <li className="relative flex items-center gap-3" key={index}>
              <NavItem {...route} />
              {index < routes.length - 1 && (
                <div className="w-1 h-1 rounded-full bg-white"></div>
              )}
            </li>
          ))}
        </ul>
        <div className="stroke-white flex gap-6 items-center">
          <button onClick={() => isSearchPanelVisible.toggle()}>
            <UiIcon icon="Search" size="24" />
          </button>
          <button className="relative">
            <div className="absolute hidden -top-[21.3%] -right-[28.3%] w-5 h-5 rounded-full  justify-center items-center text-white text-xs font-montserrat font-medium bg-danger-500 ">
              2
            </div>
            <UiIcon icon="Cart" size="24" />
          </button>
          <button onClick={toggleMobileNav} className="md:hidden">
            <UiIcon icon="Hamburger" size="24" />
          </button>
        </div>
        {isSearchPanelVisible.value && (
          <SearchPanel onClose={() => isSearchPanelVisible.off()} />
        )}
      </div>
      <MobileNav
        routes={routes}
        isNavOpen={isMobileNavVisible.value}
        closeNav={closeNav}
      />
    </nav>
  );
}
