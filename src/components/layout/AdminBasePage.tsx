interface Props {
  title: string;
  edgeNode?: React.ReactNode;
  children: React.ReactNode;
}

export default function AdminBasePage({ edgeNode, title, children }: Props) {
  return (
    <div className="max-w-[1280px] mx-auto pt-[18px] md:pt-10">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center pb-6">
        <h2 className="font-obitron font-black text-2xl text-[#141414]">{title}</h2>
        <div>{edgeNode}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
