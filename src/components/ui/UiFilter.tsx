import UiButton from "./UiButton";
import UiDropDown, { DropDownData } from "./UiDropDown";
import UiIcon from "./UiIcon";


interface Props {
  filterOptions: DropDownData[];
  filterType: string;
  clearFilter: () => void;
}

export default function UiFilter({ filterOptions, filterType, clearFilter }: Props) {
  return (
    <div>
      {filterType === '' ? (
        <UiDropDown
          options={filterOptions}
          align="start"
          side="bottom"
          trigger={
            <div className="w-[86px] bg-transparent border border-grey-300 hover:bg-grey-100 h-10 rounded-lg flex gap-2 items-center justify-center font-bold text-sm">
              Filter
              <UiIcon icon="Sort" size="16" />
            </div>
          }
        />
      ) : (
        <div className="w-20 stroke-secondary-500">
          <UiButton variant="tertiary-outlined" size="sm" rounded="md" onClick={clearFilter}>
            Clear
            <UiIcon icon="Close" size="16"/>
          </UiButton>
        </div>
      )}
    </div>
  );
}
