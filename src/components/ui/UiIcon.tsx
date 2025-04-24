import Add from '@/assets/svg/add.svg';
import AddCircle from '@/assets/svg/add-circle.svg';
import ArrowDiagonal from '@/assets/svg/arrow-diagonal.svg';
import ArrowLeft from '@/assets/svg/arrow-left.svg';
import ArrowRight from '@/assets/svg/arrow-right.svg';
import Bold from '@/assets/svg/bold.svg';
import BuilletList from '@/assets/svg/bullet-list.svg';
import CaretDown from '@/assets/svg/caret-down.svg';
import CaretLeft from '@/assets/svg/caret-left.svg';
import CaretLeftBig from '@/assets/svg/caret-left-big.svg';
import CaretRight from '@/assets/svg/caret-right.svg';
import CaretRightBig from '@/assets/svg/caret-right-big.svg';
import Cart from '@/assets/svg/cart.svg';
import Close from '@/assets/svg/close.svg';
import Copy from '@/assets/svg/copy.svg';
import Coupon from '@/assets/svg/coupon.svg';
import DirectInbox from '@/assets/svg/direct-inbox.svg';
import DropDownMenu from '@/assets/svg/drop-down-menu.svg';
import Edit from '@/assets/svg/edit.svg';
import Email from '@/assets/svg/email.svg';
import Filter from '@/assets/svg/filter.svg';
import Hamburger from '@/assets/svg/hamburger.svg';
import Instagram from '@/assets/svg/instagram.svg';
import Itallic from '@/assets/svg/italic.svg';
import Link from '@/assets/svg/link.svg';
import Location from '@/assets/svg/location.svg';
import Minus from '@/assets/svg/minus.svg';
import NumberedList from '@/assets/svg/numbered-list.svg';
import Search from '@/assets/svg/search.svg';
import Snapchat from '@/assets/svg/snapchat.svg';
import Sort from '@/assets/svg/sort.svg';
import Star from '@/assets/svg/star.svg';
import TikTok from '@/assets/svg/tiktok.svg';
import X from '@/assets/svg/twitter.svg';
import Trash from '@/assets/svg/trash.svg';
import User from '@/assets/svg/user.svg';

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
  CaretLeft,
  CaretRight,
  CaretLeftBig,
  CaretRightBig,
  Cart,
  Close,
  Copy,
  Coupon,
  DirectInbox,
  DropDownMenu,
  Edit,
  Email,
  Filter,
  Hamburger,
  Instagram,
  Itallic,
  Link,
  Location,
  Minus,
  NumberedList,
  Search,
  Snapchat,
  Sort,
  Star,
  TikTok,
  Trash,
  User,
  X,
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
