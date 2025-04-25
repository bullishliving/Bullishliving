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
      className="flex justify-center gap-10 flex-wrap mt-10"
    >
      {socials.map((social) => (
        <motion.div variants={childVariants} key={social.link}>
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <UiIcon icon={social.icon as Icons} size="33" />
            <p className="hidden md:block font-obitron font-black text-xl text-white">
              {social.icon}
            </p>
          </a>
        </motion.div>
      ))}
      <motion.div variants={childVariants}>
        <a href="tel:08168828810" className="flex items-center gap-3">
          <UiIcon icon="Phone" size="33" />
          <p className="hidden md:block font-obitron font-black text-xl text-white">
            Phone
          </p>
        </a>
      </motion.div>
    </motion.div>
  );
}
