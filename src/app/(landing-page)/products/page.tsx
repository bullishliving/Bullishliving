import UiIcon from "@/components/ui/UiIcon";

export default function page() {
  return (
    <section className="bg-white p-4 md:px-6 2xl:px-8 pb-16 md:pb-20 pt-5 md:pt-8">
      <div className="max-w-[1280px] mx-auto h-full">
        <h2 className="font-obitron font-black text-2xl mb-6">All Products</h2>
        <div className="flex gap-6 font-montserrat">
          <button className="flex justify-center items-center gap-[10px] h-[52px] px-4 text-grey-700 text-sm border border-grey-300 rounded">
            <UiIcon icon="Filter"/>
            Filter
          </button>
          <input />
        </div>
      </div>
    </section>
  );
}
