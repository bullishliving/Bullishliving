import Image from 'next/image';
import AboutImg1 from '@/assets/images/about-image-1.png';
import AboutImg2 from '@/assets/images/about-image-2.png';
import AboutImg3 from '@/assets/images/about-image-3.png';
import AboutImg4 from '@/assets/images/about-image-4.png';

import Community from '@/components/landing/JoinCommunity';
import Unstoppable from '@/components/landing/Unstoppable';

export default function AboutUs() {
  const aboutSections = [
    {
      preTitle: 'Our Vision',
      title: 'Where Fashion Meets Fitness',
      image: AboutImg1,
      node: (
        <p className="font-montserrat">
          Bold. Resilient. Unstoppable. Discover the story behind BullishLiving
          Essentials, a fitness and activewear brand that empowers you to
          embrace every challenge.
        </p>
      ),
    },
    {
      preTitle: 'Our story',
      title: 'Empowering Confidence, One Step at a Time',
      image: AboutImg2,

      node: (
        <div className="flex flex-col gap-12 font-montserrat">
          <p>
            BullishLiving Essentials is more than a brand—it’s a movement.
            Inspired by the grit and energy of Lagos, Nigeria, we set out to
            redefine the activewear game. Our mission? To create gear that not
            only performs but inspires.
          </p>
          <p>
            Every piece we design reflects a story of resilience, confidence,
            and boldness, empowering you to tackle challenges head-on. From the
            gym to the streets, we’re here to ensure you’re always ready for
            whatever.
          </p>
        </div>
      ),
    },
    {
      preTitle: 'What We Stand For',
      title: 'Driven by Resilience, Confidence, and Community',
      image: AboutImg3,

      node: (
        <div className="flex flex-col gap-8 font-montserrat">
          <p>At BullishLiving, we believe in:</p>
          <div>
            <ul className="mb-4 list-disc pl-6">
              <li>Resilience: Every challenge is an opportunity to grow.</li>
              <li>Confidence: Look good, feel good, perform better.</li>
              <li>
                Community: Together, we push boundaries and achieve greatness.
              </li>
            </ul>
            <p>
              Our designs fuse style with functionality to ensure you feel
              empowered wherever your journey takes you.
            </p>
          </div>
        </div>
      ),
    },
    {
      preTitle: ' What Drives Us',
      title: 'Our Values, Your Inspiration',
      image: AboutImg4,

      node: (
        <div className="flex flex-col gap-8 font-montserrat">
          <p>
            At BullishLiving, every stitch, design, and detail is driven by our
            core values:
          </p>
          <div>
            <ul className="mb-6 list-disc pl-6">
              <li>Functionality: Activewear that keeps up with you.</li>
              <li>
                Innovation: Cutting-edge designs that blend fashion and fitness.
              </li>
              <li>
                Sustainability: Building a better tomorrow with every piece we
                create.
              </li>
            </ul>
            <p>
              Our promise is simple: to deliver gear that inspires you to
              perform your best, every day.
            </p>
          </div>
        </div>
      ),
    },
  ];

  function isEvenSection(index: number) {
    return index % 2 === 0;
  }
  return (
    <div>
      {aboutSections.map((section, index) => (
        <section
          key={index}
          className={`px-4 py-16 md:py-24 md:px-6 2xl:px-8 ${isEvenSection(index) ? 'bg-secondary-500' : 'bg-primary-500'}`}
        >
          <div
            className={`max-w-[1280px] mx-auto flex flex-col md:flex-row gap-4 ${!isEvenSection(index) && '!flex-row-reverse'}  md:justify-between md:items-center`}
          >
            <Image
              src={section.image}
              alt=""
              className={`w-full sm:w-[343px] lg:w-[461px] h-[364px] md:h-[420px] lg:h-[490px] object-contain`}
            />
            <div className="max-w-[661px]">
              <h2
                className={`font-obitron font-black text-sm mb-2 ${isEvenSection(index) ? 'text-primary-500' : 'text-secondary-500'}`}
              >
                {section.preTitle}
              </h2>
              <h2
                className={`font-obitron font-black text-[40px] leading-[52px] mb-4 ${isEvenSection(index) ? 'text-white' : 'text-secondary-500'}`}
              >
                {section.title}
              </h2>
              <div
                className={`${isEvenSection(index) ? 'text-white' : 'text-secondary-500'}`}
              >
                {section.node}
              </div>
            </div>
          </div>
        </section>
      ))}
      <Unstoppable />
      <Community />
    </div>
  );
}
