'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  path: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ path, label }) => {
  const currentRoute = usePathname();

  const whiteRoutes = ['/products', '/cart', '/checkout'];
  const isWhite = whiteRoutes.some((route) => currentRoute.startsWith(route));

  function isActive(href: string) {
    return currentRoute === href;
  };

  const AnimatedLabel = (label: string) => {
    
    return (
      <motion.div
        initial="initial"
        whileHover="hovered"
        className={`relative overflow-hidden ${isWhite ? 'font-medium' : 'font-bold'}  ${isActive(path) && '!font-bold'}`}
      >
        <motion.div
          variants={{
            initial: { y: 0 },
            hovered: { y: '-100%' },
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.2,
          }}
        >
          {label}
        </motion.div>
        <motion.div
          variants={{
            initial: { y: '100%' },
            hovered: { y: 0 },
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.2,
          }}
          className={`absolute inset-0 !text-primary-500`}
        >
          {label}
        </motion.div>
      </motion.div>
    );
  };

  return path.startsWith('#') ? (
    <a href={path} className={`${isActive(path) && 'text-primary-500'}`}>
      {AnimatedLabel(label)}
    </a>
  ) : (
    <Link
      href={path}
      className={`${isActive(path) && 'text-primary-500'} `}
    >
      {AnimatedLabel(label)}
    </Link>
  );
};

export default NavItem;
