import ArrowDiagonal from '@/assets/svg/arrow-diagonal.svg';
import ArrowLeft from '@/assets/svg/arrow-left.svg';
import ArrowRight from '@/assets/svg/arrow-right.svg';
import Cart from '@/assets/svg/cart.svg';
import Close from '@/assets/svg/close.svg';
import Email from '@/assets/svg/email.svg';
import Hamburger from '@/assets/svg/hamburger.svg';
import Instagram from '@/assets/svg/instagram.svg';
import Search from '@/assets/svg/search.svg';
import Snapchat from '@/assets/svg/snapchat.svg';
import TikTok from '@/assets/svg/tiktok.svg';

// These icons should be arranged alphabetically for easy sorting

const icons = {
  ArrowDiagonal,
  ArrowLeft,
  ArrowRight,
  Cart,
  Close,
  Email,
  Hamburger,
  Instagram,
  Search,
  Snapchat,
  TikTok,
};

export type Icons = keyof typeof icons;
interface Props {
  /** Name of the icon as stored in the icons object */
  icon: Icons;
  size?: string;
}

export default function UiIcon({ icon, size = '18' }: Props) {
  const LazyLoadedIcon = icons[icon];
  return (
    <>
      {LazyLoadedIcon && (
        <LazyLoadedIcon style={{ width: size, height: size }} />
      )}
    </>
  );
}
