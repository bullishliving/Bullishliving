import UiIcon from "./UiIcon";

interface Props {
  searchQuery: string
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

export default function SearchInput({ placeholder = 'Search', searchQuery, setSearchQuery }: Props) {
  return (
    <div className="relative">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="h-10 pl-10 pr-4 max-w-[240px] outline-none border border-grey-400 rounded-lg placeholder:text-sm placeholder:text-[#4F4F4F]"
      />
      <div className="absolute left-4 top-[0.7rem] stroke-secondary-500">
        <UiIcon icon="Search" />
      </div>
    </div>
  );
}
