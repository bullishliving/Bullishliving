'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

import BullishLogo from '@/assets/svg/logo.svg';

import MobileNav from './MobileNav';

import useToggle from '@/hooks/useToggle';

import UiIcon from '../ui/UiIcon';
import SearchPanel from './SearchPanel';

// --

export default function Navbar() {
  const isSearchPanelVisible = useToggle();

  const routes = [
    {
      label: 'All Products', 
      path: 'all-products'
    },
    {
      label: 'Running Community', 
      path: 'running-community'
    },
    {
      label: 'Partner With Us', 
      path: 'partner-with-us'
    },
    {
      label: 'About Us', 
      path: 'about-us'
    },
  ];

  const AnimatedLabel = (label: string) => {
    return (
      <motion.div
          initial='initial'
          whileHover='hovered'
          className='relative overflow-hidden'
        >
          <motion.div
            variants={{
              initial: {y: 0},
              hovered: {y: '-100%'}
            }}
            transition={{
              ease:'easeInOut',
              duration: .2
            }}
          >
            {label}
          </motion.div>
          <motion.div
            variants={{
              initial: {y: '100%'},
              hovered: {y: 0}
            }}
              transition={{
              ease:'easeInOut',
              duration: .2
            }}
            className='absolute inset-0 text-primary-500'
          >
            {label}
          </motion.div>
      </motion.div>
    )
  }

  return (
    <nav className='bg-secondary-500 py-8 px-4 md:px-6 lg:px-8 2xl:px-20 border border-red-400'>
      <div className='relative max-w-[1280px] mx-auto flex justify-between items-center '>
        <div className='w-10 h-[27px] md:w-14 md:h-[38px] fill-primary-500 stroke-primary-500'>
          <BullishLogo/>
        </div>
        <ul className='hidden text-white md:flex gap-3 items-center text-sm font-montserrat font-bold'>
          {routes.map((route, index)=>(
            <li 
              className='relative flex items-center gap-3' key={route.path}>
              <Link href={route.path}>
                {AnimatedLabel(route.label)}
              </Link>
              {index < routes.length - 1 && <div className='w-1 h-1 rounded-full bg-white'></div>}
            </li>
          ))}
        </ul>
        <div className='stroke-white flex gap-6 items-center'>
          <button onClick={() => isSearchPanelVisible.toggle()}>
            <UiIcon icon='Search' size='24'/>
          </button>
          <button className='relative'>
            <div className='absolute -top-[21.3%] -right-[28.3%] w-5 h-5 rounded-full flex justify-center items-center text-white text-xs font-montserrat font-medium bg-danger-500 '>
              2
            </div>
            <UiIcon icon='Cart' size='24'/>
          </button>
          <button className='md:hidden'>
            <UiIcon icon="Hamburger" size='24'/>
          </button>
        </div>
        {isSearchPanelVisible.value && <SearchPanel onClose={() => isSearchPanelVisible.off()} />}
      </div>
      <MobileNav routes={routes}/>
    </nav>
  )
}
