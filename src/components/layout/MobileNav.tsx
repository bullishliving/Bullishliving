import BullishLogo from '@/assets/svg/logo-dark.svg';
import UiIcon from '../ui/UiIcon';
import Link from 'next/link';

interface Props {
  routes: {
    path: string;
    label: string;
  }[];
}

export default function MobileNav({ routes }:Props) {  
  return (
    <nav className="fixed top-0 left-0 flex flex-col justify-between bg-primary-500 w-full h-screen px-4 pb-8">
      <div>
        <div className='flex justify-between py-[18px] mb-6'>
        <BullishLogo/>
        <button 
          className="w-8 h-8 rounded-full flex items-center justify-center border border-black stroke-black">
          <UiIcon icon="Close" size="16"/>
        </button>
      </div>
      <ul className='text-secondary-500 md:flex gap-3 items-center text-sm font-montserrat '>
        {routes.map((route)=>(
          <li 
            className='relative flex items-center gap-3 border-b border-secondary-500 py-4 text-sm font-semibold' key={route.path}>
            <Link href={route.path}>
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
      </div>
      <button className='bg-secondary-500 p-2 text-primary-500 mt-auto'>View All Products</button>
    </nav>
  )
}
