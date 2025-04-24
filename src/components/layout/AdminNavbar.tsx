'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { logout } from '@/api/actions/auth';

import BullishLogo from '@/assets/svg/logo.svg';
import DummyAvatar from '@/assets/svg/avatar.svg';

import useToggle from '@/hooks/useToggle';

import UiDropDown from '../ui/UiDropDown';

import UiIcon from '../ui/UiIcon';

import MobileNav from './MobileNav';
import UiButton from '../ui/UiButton';


interface Props {
  routes: {
    label: string;
    path: string;
  }[];
}

export default function AdminNavbar({ routes }: Props) {
  const currentRoute = usePathname();
  const router = useRouter();
  const isMobileNavVisible = useToggle();

  function toggleMobileNav() {
    isMobileNavVisible.toggle();
  }
  
  function isActive(href: string) {
    return currentRoute === href;
  }

  const dropDownOptions = [
    {
      func: () => {
        handleLogout()
      },
      label: 'Log out',
    },
  ];

  async function handleLogout() {
    const result = await logout();

    if (result.success) {
      router.refresh();
    }
  }

  return (
    <nav
      className={`bg-grey-100 border-b border-gray-300 py-4 px-4 md:px-6 md:py-6 2xl:p-8`}
    >
      <div className="relative max-w-[1280px] mx-auto flex justify-between items-center ">
        <Link href="/" className="w-10 h-[27px] md:w-14 md:h-[38px]">
          <BullishLogo />
        </Link>
        <ul
          className={`hidden md:flex gap-6 items-center text-sm font-montserrat`}
        >
          {routes.map((route, index) => (
            <li className="relative flex items-center " key={index}>
              <Link
                href={route.path}
                className={` ${isActive(route.path) ? 'text-primary-500 font-bold relative active-indicator' : 'text-tertiary-700 font-medium'} transition-all duration-150 ease-in hover:text-primary-500`}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleMobileNav}
          className="md:hidden stroke-secondary-500"
        >
          <UiIcon icon="Hamburger" size="24" />
        </button>

        <div className="hidden md:block">
          <UiDropDown
            options={dropDownOptions}
            side="bottom"
            trigger={
              <div className={`flex gap-3 items-center font-montserrat `}>
                <DummyAvatar />
                <div className="flex gap-4 items-center stroke-tertiary-700">
                  <div className="text-left">
                    <p className="text-secondary-300 text-xs font-bold mb-1">
                      BullishLiving
                    </p>
                    <p className="text-tertiary-700 text-xs">Admin</p>
                  </div>
                  <UiIcon icon="CaretDown" size="16" />
                </div>
              </div>
            }
          />
        </div>
      </div>
      <MobileNav
        isNavOpen={isMobileNavVisible.value}
        closeNav={() => isMobileNavVisible.off()}
        routes={routes}
        bottomNode={
          <UiButton variant="secondary" onClick={handleLogout}>
            Log out
          </UiButton>
        }
      />
    </nav>
  );
}
