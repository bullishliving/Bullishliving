interface Props {
  title: string;
  edgeNode?: React.ReactNode;
  children: React.ReactNode;
}

export default function AdminBasePage({ edgeNode, title, children }: Props) {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-[18px] md:pt-10 pb-16 md:pb-20">
      <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center pb-6">
        <h2 className="font-obitron font-black text-2xl text-[#141414]">
          {title}
        </h2>
        <div>{edgeNode}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
