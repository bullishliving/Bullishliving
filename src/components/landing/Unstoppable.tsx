'use client';

import { useRouter } from 'next/navigation';
import SectionBanner from './SectionBanner';

export default function Unstoppable() {
  const router = useRouter();
  return (
    <SectionBanner
      CTAFunc={() => router.push('/partnership-details')}
      CTAText="Join the movement"
      desc="Are you a trainer, athlete, or content creator passionate about
            fitness and style? Partner with us to inspire others and amplify the
            bullish mindset."
      title="Let’s create something unstoppable"
    />
  );
}
