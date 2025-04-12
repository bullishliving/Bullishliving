'use client'

import { motion } from 'framer-motion';

interface Props {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export default function FadeIn({
  children,
  delay = 0.6,
  duration = 0.4,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 100 }}
      viewport={{ once: true }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeIn',
      }}
    >
      {children}
    </motion.div>
  );
}
