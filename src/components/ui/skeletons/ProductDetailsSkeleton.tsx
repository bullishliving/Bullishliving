import { Skeleton } from "../skeleton";


export default function ProductDetailsSkeleton() {
  return (
    <section className="p-4 md:px-6 2xl:px-8 pb-16 md:pb-20 pt-[80px] md:pt-[125px]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:gap-[75px] w-full">
          <div className="max-w-[544px] w-full h-fit">
            <Skeleton className="h-[350px] md:h-[470px] mb-5 rounded " />
            <div className="flex items-center gap-4 justify-center">
              <Skeleton className={`w-14 h-14 md:w-16 md:h-16 rounded`} />
              <Skeleton className={`w-14 h-14 md:w-16 md:h-16 rounded`} />
              <Skeleton className={`w-14 h-14 md:w-16 md:h-16 rounded`} />
              <Skeleton className={`w-14 h-14 md:w-16 md:h-16 rounded`} />
            </div>
          </div>
          <div className="w-full">
            <Skeleton className="h-[251px] rounded mb-6" />
            <div className="grid gap-4 mb-10">
              <Skeleton className="w-[154px] h-[72px] rounded" />
              <Skeleton className="w-[258px] h-[64px] rounded" />
            </div>
            <div className="grid gap-4">
              <Skeleton className="w-full h-[46px] rounded" />
              <Skeleton className="w-full h-[46px] rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
