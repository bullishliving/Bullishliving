'use client';

import Image from 'next/image';

import GuySkating from '@/assets/images/guy-skating.png';
import UiIcon from '../ui/UiIcon';
import AnimatedTitle from '../animations/AnimatedTitle';
import FadeIn from '../animations/FadeIn';

export default function MoreThanALifestyle() {
  return (
    <section className="px-4 py-16 lg:py-24 md:px-6 2xl:px-8 bg-secondary-500">
      <div className="relative  max-w-[1280px] mx-auto">
        <FadeIn>
          <div className=" lg:hidden grid gap-4 mb-8">
            <h3 className="font-obitron text-white font-bold text-[28px] mb-4">
              Fitness is more than a lifestyle
            </h3>
            <p className="text-sm text-white font-montserrat font-light">
              Whether you’re running the streets, hitting the gym, or navigating
              your daily hustle, we’re here to make sure you’re always ready for
              whatever.
            </p>
            <button className="group flex items-center gap-3 group">
              <p className="text-primary-500 text-sm font-bold font-montserrat">
                Shop Now
              </p>
              <div className="stroke-secondary-500 flex justify-center items-center bg-primary-500 rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-[45deg]">
                <UiIcon icon="ArrowDiagonal" size="24" />
              </div>
            </button>
          </div>
        </FadeIn>
        <div className="max-w-[600px] xl:max-w-[685px] h-[257px] sm:h-[480px] md:h-[728px] mx-auto">
          <FadeIn>
            <p className="hidden lg:block absolute top-0 right-0 right  text-base text-white max-w-[336px] font-montserrat font-light">
              Whether you’re running the streets, hitting the gym, or navigating
              your daily hustle, we’re here to make sure you’re always ready for
              whatever.
            </p>
          </FadeIn>

          <h2 className="absolute md:top-[23.1%] left-0 xs:left-[20px] md:left-[80px] text-primary-500 text-[40px] sm:text-7xl lg:text-[112px] leading-[112px] font-obitron font-black">
            <AnimatedTitle text="BullishLiving" straight />
          </h2>
          <h2 className="absolute bottom-0 md:bottom-[23.4%] right-0 xs:right-[20px] md:right-[80px] text-primary-500 text-[40px] sm:text-7xl lg:text-[112px] leading-[112px] font-obitron font-black ">
            <AnimatedTitle text="Essentials" straight />
          </h2>
          <Image
            src={GuySkating}
            alt="guy skating"
            className="max-w-full max-h-full object-contain"
          />
          <FadeIn>
            <div className="hidden lg:block absolute bottom-0 left-0 max-w-[302px]">
              <h3 className="font-obitron text-white font-bold text-[34px] mb-4">
                Fitness is more than a lifestyle
              </h3>
              <button className="group flex items-center gap-3 group">
                <p className="text-primary-500 text-sm font-bold font-montserrat">
                  Shop Now
                </p>
                <div className="stroke-secondary-500 flex justify-center items-center bg-primary-500 rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-[45deg]">
                  <UiIcon icon="ArrowDiagonal" size="24" />
                </div>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
