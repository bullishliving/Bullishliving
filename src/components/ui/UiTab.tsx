interface Props {
  tabs: {
    label: string;
    value: string;
  }[];
  activeTab: string;
  onActiveTabChange: (tab: string) => void;
}

export default function UiTab ({ tabs, activeTab, onActiveTabChange }: Props)  {
  return (
    <div className="flex gap-6 items-center border-b border-grey-400 pb-1">
      {tabs?.map((tab, index) => (
        <button
          key={index}
          className={`font-montserrat pb-2 ${activeTab === tab.value ? 'text-primary-500 text-base font-bold border-b-[4px] border-primary-500' : 'text-sm text-tertiary-700 hover:text-primary-500'}`}
          onClick={() => {
            onActiveTabChange(tab.label);
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
