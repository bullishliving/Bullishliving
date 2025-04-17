'use client';

import { activeImages } from '@/utils/constant';

import UiIcon from '../ui/UiIcon';
import FadeIn from '../animations/FadeIn';
import ActiveSlider from './ActiveCarousel/Slider';

export default function MoreThanALifestyle() {
  const duplicatedImages = [...activeImages, ...activeImages];
  return (
    <section className="px-4 py-16 lg:py-24 md:px-6 2xl:px-8 bg-secondary-500">
      <div className="max-w-[1280px] overflow-visible mx-auto">
        <div className=" flex flex-col lg:flex-row  gap-4 justify-between mb-6 md:mb-8">
          <div className="mt-auto lg:max-w-[638px]">
            <FadeIn>
              <p className="font-obitron font-black text-primary-500 text-xs mb-4">
                Get Featured in the BullishLiving Community!
              </p>
              <h3 className="font-obitron text-white font-bold text-[28px] md:text-[34px]">
                Move Different, Think Bullish, Share The Energy
              </h3>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="lg:max-w-[410px]">
              <p className=" text-sm text-white font-montserrat font-light mb-4">
                Show us how you stay ready for whatever whether you’re running
                the streets, hitting the gym, or owning your daily hustle.
                Capture the moment, tag us on social media, and get featured!
                💪🔥 #BullishLiving
              </p>
              <button className="hidden group md:flex items-center gap-3 group mt-4">
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
        <ActiveSlider slides={duplicatedImages} />
        <button className="group flex justify-center w-full md:hidden items-center gap-3 group mt-10">
          <p className="text-primary-500 text-sm font-bold font-montserrat">
            Try Out Custom Lens Now
          </p>
          <div className="stroke-secondary-500 flex justify-center items-center bg-primary-500 rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-[45deg]">
            <UiIcon icon="ArrowDiagonal" size="24" />
          </div>
        </button>
      </div>
    </section>
  );
}
