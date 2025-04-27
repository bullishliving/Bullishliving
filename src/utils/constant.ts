import { Option } from '@/components/ui/UiSelect';

import Acitve1 from '@/assets/images/active-1.jpeg';
import Acitve2 from '@/assets/images/active-2.jpeg';
import Active3 from '@/assets/images/active-3.png';
import Active4 from '@/assets/images/active-4.jpeg';
import Active5 from '@/assets/images/active-5.jpeg';
import Active6 from '@/assets/images/active-6.jpeg';

export const socials = [
  {
    icon: 'Instagram',
    link: 'https://www.instagram.com/bullishlivingactive?igsh=MXVoczZiOGppaDZ0cg=='
  },
  {
    icon: 'Snapchat',
    link: 'https://snapchat.com/t/6GPrnoYP'
  },
  {
    icon: 'TikTok',
    link: 'https://www.tiktok.com/@bullishliving?_t=ZM-8usJzwYIDaA&_r=1'
  },
  {
    icon: 'Email',
    link: 'mailto:Info@bullishliving.com'
  },
  {
    icon: 'X',
    link: 'https://x.com/bullishactive?s=21'
  },
]

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
    label: 'BullishLiving Health',
    path: '/bullish-living-health',
  },
  {
    label: 'About Us ',
    path: '/about-us',
  },
];

export const adminRoutes = [
  {
    label: 'All Orders',
    path: '/admin/dashboard/orders',
  },
  {
    label: 'Inventory',
    path: '/admin/dashboard',
  },
  {
    label: 'Running Community',
    path: '/admin/dashboard/community',
  },
  {
    label: 'Coupons',
    path: '/admin/dashboard/coupons',
  },
  {
    label: 'Banners',
    path: '/admin/dashboard/banners',
  },
];

export const inputStyles =
  'h-12 outline-none px-4 rounded-[8px] placeholder:text-sm placeholder:text-grey-700 border';

  export const activeImages = [Acitve1, Acitve2, Active3, Active4, Active5, Active6];

export const locationPrices = {
  "Agege": 6000,
  "Ajeromi-Ifelodun": 6000,
  "Alimosho": 6000,
  "Amuwo-Odofin": 6000,
  "Apapa": 6000,
  "Badagry": 6000,
  "Epe": 3000,
  "Eti-Osa": 3000,
  "Ibeju-Lekki": 3000,
  "Ifako-Ijaiye": 6000,
  "Ikeja": 6000,
  "Ikorodu": 6000,
  "Kosofe": 6000,
  "Lagos-Island": 3000,
  "Lagos-Mainland": 6000,
  "Mushin": 6000,
  "Ojo": 6000,
  "Oshodi-Isolo": 6000,
  "Shomolu": 6000,
  "Somolu": 6000,
  "Surulere": 6000,
};
