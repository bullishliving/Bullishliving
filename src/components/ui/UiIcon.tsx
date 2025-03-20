import Add from '@/assets/svg/add.svg';
import AddCircle from '@/assets/svg/add-circle.svg';
import ArrowDiagonal from '@/assets/svg/arrow-diagonal.svg';
import ArrowLeft from '@/assets/svg/arrow-left.svg';
import ArrowRight from '@/assets/svg/arrow-right.svg';
import Bold from '@/assets/svg/bold.svg';
import BuilletList from '@/assets/svg/bullet-list.svg';
import CaretDown from '@/assets/svg/caret-down.svg';
import CaretLeftBig from '@/assets/svg/caret-left-big.svg';
import CaretRightBig from '@/assets/svg/caret-right-big.svg';
import Cart from '@/assets/svg/cart.svg';
import Close from '@/assets/svg/close.svg';
import Email from '@/assets/svg/email.svg';
import Filter from '@/assets/svg/filter.svg';
import Hamburger from '@/assets/svg/hamburger.svg';
import Instagram from '@/assets/svg/instagram.svg';
import Itallic from '@/assets/svg/italic.svg';
import Link from '@/assets/svg/link.svg';
import Minus from '@/assets/svg/minus.svg';
import NumberedList from '@/assets/svg/numbered-list.svg';
import Search from '@/assets/svg/search.svg';
import Snapchat from '@/assets/svg/snapchat.svg';
import TikTok from '@/assets/svg/tiktok.svg';
import Trash from '@/assets/svg/trash.svg';

// These icons should be arranged alphabetically for easy sorting

const icons = {
  Add,
  AddCircle,
  ArrowDiagonal,
  ArrowLeft,
  ArrowRight,
  Bold,
  BuilletList,
  CaretDown,
  CaretLeftBig,
  CaretRightBig,
  Cart,
  Close,
  Email,
  Filter,
  Hamburger,
  Instagram,
  Itallic,
  Link,
  Minus,
  NumberedList,
  Search,
  Snapchat,
  TikTok,
  Trash,
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
