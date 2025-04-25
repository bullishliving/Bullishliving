import JoinCommunity from '@/components/landing/JoinCommunity';
import Hero from '@/components/landing/Hero';
import BestBuys from '@/components/landing/BestBuys';
import Banners from '@/components/landing/Banners';
import Unstoppable from '@/components/landing/Unstoppable';
import MoreThanALifestyle from '@/components/landing/MoreThanALifestyle';

export default function Home() {
  return (
    <div>
      <Hero />
      <BestBuys />
      <Banners />
      <MoreThanALifestyle />
      <Unstoppable />
      <JoinCommunity />
    </div>
  );
}
