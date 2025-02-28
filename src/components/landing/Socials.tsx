import Link from 'next/link';
import { motion } from 'framer-motion';

import { socials } from '@/utils/constant';

import UiIcon, { Icons } from '../ui/UiIcon';

export default function Socials() {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="flex justify-center gap-10 mt-10"
    >
      {socials.map((social) => (
        <motion.div variants={childVariants} key={social}>
          <Link href="" className="flex items-center gap-3">
            <UiIcon icon={social as Icons} size="33" />
            <p className="hidden md:block font-obitron font-black text-xl text-white">
              {social}
            </p>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
