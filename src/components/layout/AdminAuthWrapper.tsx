interface Props {
  children: React.ReactNode;
  title: string;
}

export default function AdminAuthWrapper({ children, title }: Props) {
  return (
    <div className="border border-grey-300 rounded-[8px] p-5 w-full sm:max-w-[530px]">
      <h2 className="font-montserrat font-bold text-secondary-500 text-xl mb-4">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
