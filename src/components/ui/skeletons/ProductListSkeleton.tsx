import { Skeleton } from "../skeleton";

export default function ProductListSkeleton() {
  return (
    <section className="bg-white p-4 md:px-6 2xl:px-8 pb-16 md:pb-20 pt-5 md:pt-8">
      <div className="max-w-[1280px] mx-auto h-full ">
        <Skeleton className="w-[150px] h-[32px] rounded mb-6" />
        <div className="flex gap-6 ">
          <Skeleton className="h-[52px] w-[94px] rounded" />
          <Skeleton className="w-full h-[52px] rounded" />
        </div>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-6 gap-x-6 gap-y-8 mb-8 `}
        >
          <div>
            <Skeleton className="h-[165px] xs:h-[256px] lg:h-[300px] mb-3" />
            <Skeleton className="w-full h-7 mb-2" />
            <Skeleton className="w-5/6 h-7" />
          </div>
          <div>
            <Skeleton className="h-[165px] xs:h-[256px] lg:h-[300px] mb-3" />
            <Skeleton className="w-full h-7 mb-2" />
            <Skeleton className="w-5/6 h-7" />
          </div>
          <div>
            <Skeleton className="h-[165px] xs:h-[256px] lg:h-[300px] mb-3" />
            <Skeleton className="w-full h-7 mb-2" />
            <Skeleton className="w-5/6 h-7" />
          </div>
          <div>
            <Skeleton className="h-[165px] xs:h-[256px] lg:h-[300px] mb-3" />
            <Skeleton className="w-full h-7 mb-2" />
            <Skeleton className="w-5/6 h-7" />
          </div>
          <div>
            <Skeleton className="h-[165px] xs:h-[256px] lg:h-[300px] mb-3" />
            <Skeleton className="w-full h-7 mb-2" />
            <Skeleton className="w-5/6 h-7" />
          </div>
          <div>
            <Skeleton className="h-[165px] xs:h-[256px] lg:h-[300px] mb-3" />
            <Skeleton className="w-full h-7 mb-2" />
            <Skeleton className="w-5/6 h-7" />
          </div>
          <div>
            <Skeleton className="h-[165px] xs:h-[256px] lg:h-[300px] mb-3" />
            <Skeleton className="w-full h-7 mb-2" />
            <Skeleton className="w-5/6 h-7" />
          </div>
          <div>
            <Skeleton className="h-[165px] xs:h-[256px] lg:h-[300px] mb-3" />
            <Skeleton className="w-full h-7 mb-2" />
            <Skeleton className="w-5/6 h-7" />
          </div>
        </div>
      </div>
    </section>
  );
}
