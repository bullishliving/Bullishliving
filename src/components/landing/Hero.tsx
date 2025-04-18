'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import HeroImg from '@/assets/images/active-image.jpg';

import AnimatedTitle from '../animations/AnimatedTitle';
import FadeIn from '../animations/FadeIn';
import UiIcon from '../ui/UiIcon';

// ---

export default function Hero() {
  return (
    <section className="bg-secondary-500 p-4 md:px-6 2xl:px-8 pb-16 md:pb-20 pt-[80px] md:pt-[125px]">
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
          <h2 className="relative block text-primary-500 text-[40px] leading-[48px] sm:text-6xl md:text-6xl xl:text-[100px] font-obitron font-black md:leading-[72px] xl:leading-[100px]">
            <AnimatedTitle
              text="Designed to stay active"
              textStyle="mr-4 sm:mr-5 md:mr-8 lg:mr-10 inline-block pb-[.3rem]"
            />
          </h2>
          <FadeIn>
            <p className="text-white text-base md:text-lg mb-4 md:mb-6 font-montserrat">
              Inspiring strength & style to stay Ready for Whatever
            </p>
            <Link
              href="/products"
              className="group flex items-center gap-3 group"
            >
              <p className="text-primary-500 text-sm font-bold font-montserrat">
                Shop Now
              </p>
              <div className="stroke-secondary-500 flex justify-center items-center bg-primary-500 rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-[45deg]">
                <UiIcon icon="ArrowDiagonal" size="24" />
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
