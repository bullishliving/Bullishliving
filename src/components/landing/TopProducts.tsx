import { createClient } from '@/utils/supabase/supabaseServer';
import AnimatedTitle from '../animations/AnimatedTitle';
import FadeIn from '../animations/FadeIn';
import Slider from '../Slider';
import Product from '@/types/Product';
import { SupabaseTables } from '@/types/enums/SupabaseTables';

export default async function TopProducts() {
  const supabase = await createClient();

  const { data } = await supabase.from(SupabaseTables.PRODUCTS).select("*").eq('is_featured', true);
  const topProducts = data as Product[];

  return (
    <section className="bg-primary-500 px-4 py-16 md:py-24 md:px-6 2xl:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row gap-2 items-center md:justify-between mb-10">
          <h3 className="font-obitron text-center md:text-left font-black text-[34px] leading-[44px] md:text-[40px] md:leading-[52px] text-secondary-500">
            <AnimatedTitle
              text="Curated for Your Lifestyle"
              textStyle="mr-[14px] text-center inline-block overflow-hidden"
              containerStyles="justify-center md:justify-start"
            />
          </h3>
          <FadeIn>
            <p className="max-w-[478px]  text-secondary-500 text-center md:text-left font-montserrat text-sm leading-[24px]">
              Discover our handpicked collections – from everyday essentials to
              bold statement pieces. Tailored for the unstoppable you
            </p>
          </FadeIn>
        </div>
        <Slider slides={topProducts} />
      </div>
    </section>
  );
}
