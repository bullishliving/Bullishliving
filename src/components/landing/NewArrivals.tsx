import UiIcon from '../ui/UiIcon';
import NewArrivalsList from '../products/NewArrivalsList';
import Link from 'next/link';

export default function NewArrivals() {
  return (
    <section className="px-4 py-16 md:py-24 md:px-6 2xl:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between mb-8 md:mb-10">
          <h3 className="font-obitron text-center md:text-left font-black text-[34px] leading-[44px] md:text-[40px] md:leading-[52px] text-secondary-500">
            New Arrivals
          </h3>

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
        <NewArrivalsList />
        <button className="mt-[34px] mx-auto flex group md:hidden items-center gap-3 group">
          <p className="text-secondary-500 text-sm font-medium font-montserrat">
            View All
          </p>
          <div className="stroke-primary-500 flex justify-center items-center bg-secondary-500 rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-[45deg]">
            <UiIcon icon="ArrowDiagonal" size="24" />
          </div>
        </button>
      </div>
    </section>
  );
}
