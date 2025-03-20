import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type DropDownData = {
  label: React.ReactNode;
  func: (id?: string) => void;
  disabled?: boolean;
};

interface Props {
  options: DropDownData[];
  trigger?: React.ReactNode;
  itemId?: string;
  side?: 'bottom' | 'top' | 'right' | 'left';
  align?: 'center' | 'start' | 'end';
}

export default function UiDropDown({
  options,
  trigger,
  itemId,
  align = 'start',
  side = 'right',
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {trigger || (
          <div>trigger</div>
          // <UiIcon
          //   icon="ThreeDotsVertical"
          //   size={triggerSizeClasses[triggerSize]}
          // />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align={align}
        className="bg-white rounded py-2 shadow-dropdown-options border-none font-montserrat"
      >
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer py-2 px-4"
            disabled={option.disabled}
            onClick={() => option.func(itemId)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
