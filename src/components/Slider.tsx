'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

import UiIcon from './ui/UiIcon';
import Notch from './Notch';
import NotchMobile from './NotchMobile';

import { DotButton, useDotButton } from './SliderDots';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './SliderArrowButtons';
import Product from '@/types/Product';

type PropType = {
  slides: Product[];
};

const Slider: React.FC<PropType> = (props) => {
  const { slides } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="relative text-secondary-500">
      <div className="relative">
        <div className="xs:max-h-[373px] sm:max-h-[480px] md:h-screen md:max-h-[658px] w-full rounded-md sm:rounded-3xl overflow-hidden bg-black">
          <Notch />
          <NotchMobile />
          <button className="z-20 absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group flex items-center gap-3 group">
            <p className="text-secondary-500 text-sm font-bold font-montserrat">
              Buy Now
            </p>
            <div className="stroke-primary-500 flex justify-center items-center bg-secondary-500 rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-[45deg]">
              <UiIcon icon="ArrowDiagonal" size="24" />
            </div>
          </button>
          <section className="embla  h-full">
            <div className="embla__viewport h-full" ref={emblaRef}>
              <div className="embla__container h-full">
                {slides.map((slide, index) => (
                  <div className="embla__slide h-full" key={index}>
                    <Image
                      src={slide.images![0] as string}
                      alt={slide.name}
                      width={1000}
                      height={658}
                      className="object-cover h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="hidden md:flex absolute z-20 top-1/2 left-[-2%] w-16 h-16 rounded-full bg-secondary-500  justify-center items-center stroke-primary-500"
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="hidden md:flex absolute z-30 top-1/2 right-[-2%] w-16 h-16 rounded-full bg-secondary-500  justify-center items-center stroke-primary-500"
        />
      </div>
      <div className="w-full mx-auto mt-4 text-center">
        <h4 className="font-obitron font-black text-xl mb-2">
          {slides[selectedIndex].name}
        </h4>
        <p className="font-montserrat font-medium text-sm mb-4">
          ₦{slides[selectedIndex].price.toLocaleString()}
        </p>
        <div className="flex justify-center gap-1">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot w-2 h-2 rounded-full border transition-colors ease-in duration-200 border-black'.concat(
                index === selectedIndex ? ' bg-black' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
