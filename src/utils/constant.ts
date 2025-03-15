import { Option } from '@/components/ui/UiSelect';
import Acitve1 from '@/assets/images/active-1.jpeg';
import Acitve2 from '@/assets/images/active-2.jpeg';
import Active3 from '@/assets/images/active-3.png';
import Active4 from '@/assets/images/active-4.jpeg';
import Active5 from '@/assets/images/active-5.jpeg';
import Active6 from '@/assets/images/active-6.jpeg';

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

export const activeImages = [Acitve1, Acitve2, Active3, Active4, Active5, Active6];
