'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import HeroImg from '@/assets/images/hero-image.jpg';

import UiIcon from '../ui/UiIcon';

// ---

export default function Hero() {
  const heroTitle = 'Where fitness meets fashion';

  const heroSplitText = useMemo(() => {
    const heroTextVatiants = {
      initial: {
        y: '128%',
        rotate: 5,
      },
      animate: {
        y: 0,
        rotate: 0,
      },
    };

    return (
      <motion.h2
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-wrap text-primary-500 text-[40px] leading-[52px] sm:text-6xl md:text-6xl xl:text-[100px] font-obitron font-black md:leading-[72px] lg:leading-[100px]"
      >
        {heroTitle.split(' ').map((word, index) => (
          <div
            key={index}
            className="mr-4 sm:mr-5 md:mr-8 lg:mr-10 inline-block overflow-hidden"
          >
            <motion.span
              variants={heroTextVatiants}
              transition={{
                ease: 'easeInOut',
                duration: 0.65,
                delay: 0.025 * index,
              }}
              className="overflow-hidden inline-block"
            >
              {word}
            </motion.span>
          </div>
        ))}
      </motion.h2>
    );
  }, []);

  return (
    <section className="bg-secondary-500 px-4  md:px-6 2xl:px-8 pb-16 md:pb-20 pt-5 md:pt-6">
      <div className="text-white max-w-[1280px] mx-auto h-full">
        <motion.div
          initial={{
            opacity: 0,
            y: '1%',
          }}
          animate={{
            opacity: 100,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            ease: 'easeIn',
          }}
        >
          <Image
            alt="man in long sleeve gym top"
            src={HeroImg}
            className="rounded-2xl h-[265px] sm:h-[426px] md:h-[626px] object-cover opacity-65"
          />
        </motion.div>
        <div className="relative flex flex-col md:flex-row gap-2 md:items-end -mt-8 sm:-mt-9 md:-mt-[3.7rem] z-10">
          <div className="relative blockoverflow-hidden">{heroSplitText}</div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 100 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.6,
              ease: 'easeIn',
            }}
          >
            <p className="text-white text-base md:text-lg mb-6 font-montserrat">
              Inspiring strength & style to stay Ready for Whatever
            </p>
            <button className="group flex items-center gap-3 group">
              <p className="text-primary-500 text-sm font-bold">Shop Now</p>
              <div className="stroke-secondary-500 flex justify-center items-center bg-primary-500 rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-[45deg]">
                <UiIcon icon="ArrowDiagonal" size="24" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
