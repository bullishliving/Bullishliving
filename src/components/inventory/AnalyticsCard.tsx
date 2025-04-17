interface Props {
  title: string;
  figure: string;
  edgeNode?: React.ReactNode;
}

export default function AnalyticsCard({ figure, title, edgeNode }: Props) {
  return (
    <div className="bg-white p-4 font-montserrat rounded-[8px]">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-tertiary-700">{title}</p>
        <div>{edgeNode}</div>
      </div>
      <h2 className="font-bold text-2xl text-secondary-500">{figure}</h2>
    </div>
  );
}
