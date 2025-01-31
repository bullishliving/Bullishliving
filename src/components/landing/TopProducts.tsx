import { topProducts } from "@/api/mock/topProducts";

import Slider from "../Slider/Slider";


export default function TopProducts() {
  return (
    <section className="bg-primary-500  px-4 py-24 md:px-6 2xl:px-8 border border-red-600">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row gap-2 items-center md:justify-between mb-10">
          <h3 className="font-obitron text-center md:text-left font-black text-[34px] leading-[44px] md:text-[40px] md:leading-[52px] text-secondary-500">
            Curated for Your Lifestyle
          </h3>
          <p className="max-w-[478px] text-secondary-500 text-center md:text-left font-montserrat text-sm leading-[24px]">
            Discover our handpicked collections – from everyday essentials to
            bold statement pieces. Tailored for the unstoppable you
          </p>
        </div>
        <Slider slides={topProducts} />
      </div>
    </section>
  );
}
