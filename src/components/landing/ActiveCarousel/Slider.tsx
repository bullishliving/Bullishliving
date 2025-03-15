import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from '@/components/SliderArrowButtons';

import useEmblaCarousel from 'embla-carousel-react';
import Image, { StaticImageData } from 'next/image';
import { DotButton, useDotButton } from '@/components/SliderDots';

type PropType = {
  slides: StaticImageData[];
  options?: EmblaOptionsType;
};

const ActiveSlider: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    ...options,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <section className="w-full relative">
      {/* Embla Container */}
      <div className=" active-carousel-div" ref={emblaRef}>
        <div className="flex gap-2">
          {slides.map((img, index) => (
            <div
              key={index}
              className="min-w-[193px] max-w-[193px] flex-shrink-0"
            >
              <Image
                src={img}
                alt="fitness image"
                className="w-full h-[326px] rounded-[8px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1 mt-6 ">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={'embla__dot w-2 h-2 rounded-full border transition-colors ease-in duration-200 border-white'.concat(
              index === selectedIndex ? ' bg-white' : ''
            )}
          />
        ))}
      </div>
      <PrevButton
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className="hidden md:flex absolute z-50 top-[40%] left-[-2%] w-14 h-14 rounded-full bg-primary-500  justify-center items-center stroke-secondary-500"
      />

      <NextButton
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className="hidden md:flex absolute z-30 top-[40%] right-[-2%] w-14 h-14 rounded-full bg-primary-500  justify-center items-center stroke-secondary-500"
      />
    </section>
  );
};

export default ActiveSlider;
