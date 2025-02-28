'use client';
import AnimatedTitle from '../animations/AnimatedTitle';
import FadeIn from '../animations/FadeIn';

import JoinCommunityForm from './JoinCommunityForm';
import Socials from './Socials';

// ---

export default function JoinCommunity() {
  return (
    <section
      id="community"
      className="bg-secondary-500 px-4 py-16 md:py-24 md:px-6 2xl:px-8"
    >
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-obitron font-black text-center text-[34px] leading-[40px] md:text-[40px] md:leading-[52px] text-primary-500 mb-2 md:mb-4">
          <AnimatedTitle
            text="Join Our Running Community"
            textStyle="mr-2 sm:mr-4 inline-block overflow-hidden"
            containerStyles="justify-center"
          />
        </h2>
        <FadeIn>
          <p className="font-montserrat  text-white  max-w-[738px] mx-auto text-center text-sm md:text-base">
            {' '}
            Whether you’re a seasoned runner or just starting out, join a
            vibrant community that inspires, supports, and moves with purpose
          </p>
        </FadeIn>
        <div className="community-bg-image flex justify-center items-center rounded-2xl h-[432px] md:h-[537px] px-4 py-[30px] mt-10"></div>
        <JoinCommunityForm />
        <Socials />
      </div>
    </section>
  );
}
