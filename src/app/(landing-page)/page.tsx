import Community from '@/components/landing/Community';
import Hero from '@/components/landing/Hero';
import MoreThanALifestyle from '@/components/landing/MoreThanALifestyle';
import NewArrivals from '@/components/landing/NewArrivals';
import TopProducts from '@/components/landing/TopProducts';
import Unstoppable from '@/components/landing/Unstoppable';

export default function Home() {
  return (
    <div className="">
      <Hero />
      <TopProducts />
      <NewArrivals/>
      <MoreThanALifestyle/>
      <Unstoppable />
      <Community/>
    </div>
  );
}
