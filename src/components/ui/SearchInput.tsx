import UiIcon from "./UiIcon";

const sizeClasses = {
  md: 'h-10',
  lg: 'h-14',
};

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
  size?: keyof typeof sizeClasses;
}

export default function SearchInput({ placeholder = 'Search', size ='md',  searchQuery, setSearchQuery }: Props) {
  return (
    <div className="relative w-full">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className={`pl-10 pr-4 w-full bg-transparent  outline-none border border-grey-400  font-montserratbg-transparent rounded-lg placeholder:text-sm placeholder:text-[#4F4F4F] ${sizeClasses[size]}`}
      />
      <div className="absolute left-4 top-[0.7rem] stroke-secondary-500">
        <UiIcon icon="Search" />
      </div>
    </div>
  );
}
