import UiIcon from '../ui/UiIcon';
import BestBuysList from '../products/BestBuysList';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/supabaseServer';
import { SupabaseTables } from '@/types/enums/SupabaseTables';
import Product from '@/types/Product';

export default async function BestBuys() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from(SupabaseTables.AVAILABLE_PRODUCTS)
      .select('*')
      .eq('is_top_product', true);

    if (error || !data || data.length === 0) {
      console.error('Error fetching new arrivals:', error);
      console.log(error);

      return null;
    }

    const products = data as Product[];

    return (
      <section className="px-4 py-10 md:py-24 md:px-6 2xl:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex justify-between mb-8 md:mb-10">
            <div>
              {' '}
              <h3 className="font-obitron md:text-left  font-black text-[34px] leading-[44px] md:text-[40px] md:leading-[52px] text-secondary-500">
                Must haves
              </h3>
              <p className="font-obitron font-black text-sm text-primary-500 mt-2 md:text-left">
                Pairs well with every routine, it’s your go-to
              </p>
            </div>

            <Link
              href="/products"
              className="hidden group md:flex items-center gap-3 group"
            >
              <p className="text-secondary-500 text-sm font-medium font-montserrat">
                View All
              </p>
              <div className="stroke-primary-500 flex justify-center items-center bg-secondary-500 rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-[45deg]">
                <UiIcon icon="ArrowDiagonal" size="24" />
              </div>
            </Link>
          </div>
          <BestBuysList products={products} />
          <Link
            href="/products"
            className="mt-[34px] mx-auto w-fit flex justify-center group md:hidden items-center gap-3 group"
          >
            <p className="text-secondary-500 text-sm font-medium font-montserrat">
              View All
            </p>
            <div className="stroke-primary-500 flex justify-center items-center bg-secondary-500 rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-[45deg]">
              <UiIcon icon="ArrowDiagonal" size="24" />
            </div>
          </Link>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Failed to load new arrivals:', error);
    return null;
  }
}
