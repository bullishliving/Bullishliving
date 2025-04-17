import JoinCommunity from '@/components/landing/JoinCommunity';
import Hero from '@/components/landing/Hero';
import NewArrivals from '@/components/landing/NewArrivals';
import TopProducts from '@/components/landing/TopProducts';
import Unstoppable from '@/components/landing/Unstoppable';
import MoreThanALifestyle from '@/components/landing/MoreThanALifestyle';

export default function Home() {
  return (
    <div className="">
      <Hero />
      <TopProducts />
      <NewArrivals />
      <MoreThanALifestyle/>
      <Unstoppable />
      <JoinCommunity />
    </div>
  );
}
