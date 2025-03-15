import { Option } from '@/components/ui/UiSelect';

export const socials = ['Instagram', 'Snapchat', 'TikTok', 'Email'];

export const roleOptions: Option[] = [
  {
    label: 'Trainer',
    value: 'trainer',
  },
  {
    label: 'Athlete',
    value: 'athlete',
  },
  {
    label: 'Content Ceator',
    value: 'contentCeator',
  },
  {
    label: 'Others',
    value: 'others',
  },
];

export const landingPageRoutes = [
  {
    label: 'All Products',
    path: '/products',
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
    label: 'About Us ',
    path: '/about-us',
  },
];

export const adminRoutes = [
  {
    label: 'Transactions',
    path: '/admin/dashboard',
  },
  {
    label: 'All Orders',
    path: '/admin/dashboard/orders',
  },
  {
    label: 'Inventory',
    path: '/admin/dashboard/inventory',
  },
  {
    label: 'Running Community',
    path: '/admin/dashboard/community',
  },
]

export const inputStyles = 'h-12 outline-none px-4 rounded-[8px] placeholder:text-sm placeholder:text-grey-700 border'
