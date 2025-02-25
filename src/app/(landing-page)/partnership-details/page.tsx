'use client';

import SectionBanner from '@/components/landing/SectionBanner';
import PartnerWithUs from '@/components/layout/PartnerWithUs';
import UiButton from '@/components/ui/UiButton';
import UiIcon from '@/components/ui/UiIcon';
import useToggle from '@/hooks/useToggle';

export default function Page() {
  const isPartnerWithUsVisible = useToggle();

  return (
    <div>
      <SectionBanner
        CTAFunc={() => isPartnerWithUsVisible.on()}
        CTAText="Apply now"
        desc="Are you a trainer, athlete, or content creator passionate about fitness and style? Partner with us to inspire others and amplify the bullish mindset."
        title="Apply to collaborate"
        textAlign="left"
        backBtn
      />
      <PartnerWithUs
        isOpen={isPartnerWithUsVisible.value}
        onClose={() => isPartnerWithUsVisible.off()}
      />
      <div className="bg-secondary-500 pt-14 pb-16 xl:pb-[188px]">
        <div className="max-w-[865px] mx-auto px-4 md:px-6">
          <p className="text-primary-500 text-xs font-black font-obitron mb-2">
            PARTNER WITH US
          </p>
          <h3 className="font-black font-obitron text-[34px] md:text-[40px] text-white mb-4">
            Let’s create something unstoppable
          </h3>
          <div className="text-white">
            <p className="font-montserrat mb-12">
              Since our inception Bullishliving Active has been on a mission to
              empower people to stay “Ready for Whatever”—both in fitness and in
              life. We believe in celebrating individuals who embody this
              mindset
            </p>
            <p className="font-montserrat mb-12">
              As we grow our brand and community, we’re seeking passionate
              individuals like you to join the Bullishliving Active Family as a
              partner. This partnership is designed to create value for both of
              us while celebrating your contribution to the fitness world.
            </p>
            <p className="font-montserrat mb-12">
              What the Partnership Includes:
            </p>
            <h3 className="font-montserrat mb-10 font-black">
              {' '}
              1. Exclusive Benefits for You:
            </h3>
            <ul className="font-montserrat grid gap-4 mb-12">
              <li>
                {' '}
                • Free Bullishliving Active apparel from upcoming collections.
              </li>
              <li> • Early access to new product launches.</li>
              <li>
                {' '}
                • Personalized discount codes for your followers to use,
                allowing them to save on their purchases while linking sales
                directly to your influence.
              </li>
            </ul>
            <h3 className="font-montserrat mb-10 font-black">
              {' '}
              2. Opportunities to Shine:
            </h3>
            <ul className="font-montserrat grid gap-4 mb-12">
              <li>
                {' '}
                • Be featured on our social media platforms and website as a
                Bullishliving Active ambassador.
              </li>
              <li>
                {' '}
                • Collaborate with us on creating fitness content (workouts,
                tips, and motivational posts) for our growing community.
              </li>
              <li>
                {' '}
                • Participate in Bullishliving Active events, such as fitness
                challenges and live workout sessions.
              </li>
            </ul>
            <h3 className="font-montserrat mb-4 font-black"> 3. Earnings:</h3>
            <ul className="font-montserrat grid gap-4 mb-12">
              <li>
                {' '}
                • Earn a percentage of sales generated through your unique
                discount code.
              </li>
              <li>
                {' '}
                • Additional incentives such as personal merch collection for
                top-performing partners{' '}
              </li>
            </ul>
            <p className="font-montserrat mb-12">What We’re Looking For</p>
            <ul className="font-montserrat grid gap-4 mb-12">
              <li>
                {' '}
                • A fitness enthusiast who embodies the Bullishliving spirit:
                grit, positivity, and resilience.
              </li>
              <li>
                {' '}
                • Someone willing to authentically promote our brand by wearing
                our apparel, creating workout content, and encouraging others to
                join the “Ready for Whatever” movement.
              </li>
              <li>
                {' '}
                • A partner who believes in growing together, as we work to make
                fitness accessible and inspirational for our community.
              </li>
            </ul>
            <p className="font-montserrat mb-16 mt-4">Apply to collaborate </p>
            <p className="font-montserrat mb-10">
              If this sounds like an opportunity you’d be interested in, please
              fill the form below and we will reach out to you.
            </p>
          </div>
          <div className="flex justify-end">
            <div className="md:max-w-[157px] flex-1">
              <UiButton onClick={() => isPartnerWithUsVisible.on()}>
                Apply Now
                <UiIcon icon="ArrowDiagonal" size="24" />
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
