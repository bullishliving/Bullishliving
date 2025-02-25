'use client';

import Image from 'next/image';

import ActiveGif from '@/assets/images/active.gif';
import UiIcon from '../ui/UiIcon';
import FadeIn from '../animations/FadeIn';

export default function MoreThanALifestyle() {
  return (
    <section className="px-4 py-16 lg:py-24 md:px-6 2xl:px-8 bg-secondary-500">
      <div className="relative  max-w-[1280px] mx-auto">
        <FadeIn>
          <div className="xl:hidden grid gap-4 mb-8">
            <h3 className="font-obitron text-white font-bold text-[28px] mb-4">
              Move Different, Think Bullish, Share The Energy
            </h3>
            <p className="text-sm text-white font-montserrat font-light">
              Whether you’re running the streets, hitting the gym, or navigating
              your daily hustle, we’re here to make sure you’re always ready for
              whatever.
            </p>
            <button className="group flex items-center gap-3 group">
              <p className="text-primary-500 text-sm font-bold font-montserrat">
                Try Out Custom Lens Now
              </p>
              <div className="stroke-secondary-500 flex justify-center items-center bg-primary-500 rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-[45deg]">
                <UiIcon icon="ArrowDiagonal" size="24" />
              </div>
            </button>
          </div>
        </FadeIn>
        <div className="flex xl:gap-8 justify-between">
          <div className="mt-auto hidden xl:block max-w-[379px]">
            <FadeIn>
              <h3 className="font-obitron text-white font-bold text-[34px]">
                Move Different, Think Bullish, Share The Energy
              </h3>
            </FadeIn>
          </div>

          <Image
            src={ActiveGif}
            alt="guy skating"
            className="max-w-full sm:max-w-[436px] max-h-[509px] md:max-h-[874px] w-fit mx-auto object-contain rounded-xl"
          />
          <FadeIn>
            <div className="hidden xl:block max-w-[341px]">
              <p className=" text-base text-white  font-montserrat font-light">
                Whether you’re running the streets, hitting the gym, or
                navigating your daily hustle, we’re here to make sure you’re
                always ready for whatever.
              </p>
              <button className="group flex items-center gap-3 group mt-4">
                <p className="text-primary-500 text-sm font-bold font-montserrat">
                  Try Out Custom Lens Now
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
