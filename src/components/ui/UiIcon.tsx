import Cart from '@/assets/svg/cart.svg';
import Close from '@/assets/svg/close.svg';
import Hamburger from '@/assets/svg/hamburger.svg';
import Search from '@/assets/svg/search.svg';

// These icons should be arranged alphabetically for easy sorting

const icons = {
  Cart,
  Close,
  Hamburger,
  Search
}

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
