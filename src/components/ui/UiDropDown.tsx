import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import UiIcon from './UiIcon';

export type DropDownData = {
  label: React.ReactNode | ((item?: any) => (React.ReactNode));
  func: (id?: string, item?: any) => void;
  disabled?: boolean;
};

interface Props {
  options: DropDownData[];
  trigger?: React.ReactNode;
  itemId?: string;
  item?: any;
  side?: 'bottom' | 'top' | 'right' | 'left';
  align?: 'center' | 'start' | 'end';
}

export default function UiDropDown({
  options,
  trigger,
  itemId,
  item,
  align = 'start',
  side = 'right',
}: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none">
        {trigger || <UiIcon icon="DropDownMenu" size="24" />}
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
            onClick={() => option.func(itemId, item)}
          >
            {typeof option.label === 'function'
              ? option.label(item)
              : option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
