'use client';

import { useRouter } from 'next/navigation';

import UiButton from '../ui/UiButton';
import UiIcon from '../ui/UiIcon';
import AnimatedTitle from '../animations/AnimatedTitle';
import FadeIn from '../animations/FadeIn';

interface Props {
  title: string;
  desc: string;
  CTAText: string;
  CTAFunc: VoidFunction;
  textAlign?: 'center' | 'left';
  backBtn?: boolean;
}

export default function SectionBanner({
  CTAText,
  desc,
  title,
  textAlign = 'center',
  CTAFunc,
  backBtn,
}: Props) {
  const router = useRouter();
  return (
    <section className=" unstoppable">
      <div className="relative max-w-[1280px] h-[80vh] lg:h-screen px-4 py-16 md:py-24 md:px-6 2xl:px-8 mx-auto flex justify-center items-center">
        {backBtn && (
          <button
            onClick={() => router.back()}
            className="absolute hidden  top-10 stroke-white left-4 md:flex items-center gap-2 text-white text-sm font-montserrat font-bold"
          >
            <UiIcon icon="ArrowLeft" size="24" />
            Back
          </button>
        )}

        <div
          className={`${textAlign === 'center' ? 'text-center' : 'text-left md:text-center'}`}
        >
          <h2 className=" text-[40px] leading-[48px] md:text-7xl lg:text-[88px] md:leading-[96px] text-white font-obitron font-black  max-w-[1200px] mx-auto">
            <AnimatedTitle
              text={title}
              textStyle="mr-4 sm:mr-5 md:mr-8 inline-block overflow-hidden"
              containerStyles={`${textAlign === 'center' ? 'justify-center' : 'justify-start md:justify-center'}`}
            />
          </h2>
          <FadeIn>
            <p className="max-w-[538px] mx-auto text-white font-montserrat font-medium mt-2">
              {desc}
            </p>
          </FadeIn>
          <div className="sm:max-w-[228px] mx-auto mt-[35px]">
            <UiButton onClick={CTAFunc}>
              {CTAText}
              <UiIcon icon="ArrowDiagonal" size="20" />
            </UiButton>
          </div>
        </div>
      </div>
    </section>
  );
}
