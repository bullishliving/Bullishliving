'use client'

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';
import AnimatedTitle from '../animations/AnimatedTitle';
import FadeIn from '../animations/FadeIn';

export default function Unstoppable() {
  return (
    <section className="unstoppable lg:h-screen flex justify-center items-center px-4 py-16 md:py-24 md:px-6 2xl:px-8">
      <div className="text-center">
        <h2 className=" text-[40px] leading-[48px] md:text-7xl lg:text-[88px] md:leading-[96px] text-white font-obitron font-black  max-w-[1200px] mx-auto">
          <AnimatedTitle
            text="Let’s create something unstoppable"
            textStyle="mr-4 sm:mr-5 md:mr-8 inline-block overflow-hidden"
            containerStyles="justify-center"
          />
        </h2>
        <FadeIn>
          <p className="max-w-[538px] mx-auto text-white font-montserrat font-medium mt-2">
            Are you a trainer, athlete, or content creator passionate about
            fitness and style? Partner with us to inspire others and amplify the
            bullish mindset.
          </p>
        </FadeIn>
        <div className="sm:max-w-[228px] mx-auto mt-[35px]">
          <UiButton>
            Apply to Collaborate
            <UiIcon icon="ArrowDiagonal" size="20" />
          </UiButton>
        </div>
      </div>
    </section>
  );
}
