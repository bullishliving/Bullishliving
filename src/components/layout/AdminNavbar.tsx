'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

import BullishLogo from '@/assets/svg/logo.svg';
import DummyAvatar from '@/assets/svg/avatar.svg';
import UiIcon from "../ui/UiIcon";

interface Props {
  routes: {
    label: string;
    path: string;
  }[];
}

export default function AdminNavbar({ routes }: Props) {
  const currentRoute = usePathname();
    
  function isActive(href: string) {
    return currentRoute === href;
  };

  return (
    <nav
      className={`bg-white border-b border-gray-300 py-4 px-4 md:px-6 md:py-6 2xl:p-8`}
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
        <button className={`flex gap-3 items-center font-montserrat `}>
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
        </button>
      </div>
    </nav>
  );
}
