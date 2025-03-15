import { useMemo, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import OnChangeParams from '@/types/OnChangeParams';

import UiField from './UiField';
import UiIcon from './UiIcon';

const variantClasses = {
  dark: 'border bg-secondary-500 !border-grey-500',
  light: 'border !border-grey-300 bg-white',
  transparent: 'border-b border-grey-500 text-white pb-4',
};

export interface Option {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

interface Props {
  label?: string;
  value: string ;
  placeholder?: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  disabled?: boolean;
  options: Option[];
  variant?: keyof typeof variantClasses;
  inputRef?: React.RefObject<HTMLInputElement>;
  isSearchable?: boolean;
  onChange: (event: OnChangeParams) => void;
}
export default function UiSelect({
  value,
  variant = 'light',
  label,
  disabled,
  placeholder = 'Select from the options',
  name,
  options,
  error,
  isSearchable,
  onChange,
}: Props) {
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = options.filter((option) => option.value.toLowerCase().includes(searchQuery.toLocaleLowerCase()));

  const displayText = useMemo(() => {
    if (value === null) return placeholder;

    const foundOptionLabel = options.find(
      (option) => value === option.value
    )?.label;

    if (!foundOptionLabel) return placeholder;

    return foundOptionLabel;
  }, [value, options, placeholder]);

  const validationStyle = useMemo(() => {
    return !!error ? 'border-danger-200' : `border-tertiary-700`;
  }, [error]);

  const placeholderStyle = useMemo(() => {
    return variant === 'dark' ? 'text-grey-600' : 'text-grey-700';
  }, [variant]);

  function selectOption(value: string | boolean) {
    if (disabled) return;

    onChange({ name, value });
    setOptionsAreVisible(false);
    setSearchQuery('')
  }

  function toggleOptions() {
    if (disabled) return;

    setOptionsAreVisible(!optionsAreVisible);
    setSearchQuery('');
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setOptionsAreVisible(false)}>
      <UiField error={error} label={label} variant={variant}>
        <button
          type="button"
          data-testid="ui-select-trigger"
          style={{ minHeight: '52px' }}
          className={`flex text-left text-sm px-4 items-center w-full rounded font-normal font-montserrat ${disabled && 'cursor-not-allowed'} ${variantClasses[variant]} ${validationStyle}`}
          onClick={toggleOptions}
        >
          <div
            className={`w-full text-typography-disabled text-sm ${placeholderStyle} ${
              value &&
              ` ${variant === 'light' ? 'text-secondary-500' : 'text-white'} font-medium`
            }`}
          >
            {displayText}
          </div>
          <div
            className={`transition-transform ease-in-out duration-300 stroke-black ${variant === 'light' ? 'stroke-secondary-500' : 'stroke-[#717171]'}  ${optionsAreVisible ? 'rotate-180' : 'rotate-0'} `}
          >
            <UiIcon icon="CaretDown" size="16" />
          </div>
        </button>
        {optionsAreVisible && (
          <ul
            data-testid="ui-select-options"
            className={`absolute ${variantClasses[variant]} rounded-[8px]  mt-2 z-20 w-full px-6 ${variant === 'dark' ? 'py-6 ' : 'py-4 shadow-select-options'}`}
          >
            <div className="overflow-auto max-h-72 custom-sidebar">
              {isSearchable && (
                <div className="sticky top-0 bg-white flex gap-[10px] items-center h-14 border-b border-grey-300 stroke-[#717171]">
                  <div className="transform scale-x-[-1]">
                    <UiIcon icon="Search" size="16" />
                  </div>
                  <input
                    value={searchQuery}
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-full w-full outline-none placeholder:text-[#717171] placeholder:text-sm font-montserrat"
                  />
                </div>
              )}

              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => selectOption(option.value)}
                  className={`py-4 text-sm font-montserrat font-semibold cursor-pointer ${variant === 'dark' ? 'hover:bg-secondary-400' : 'hover:bg-gray-50'} ${index < options.length - 1 && (variant === 'dark' ? 'border-b border-grey-500' : 'border-b border-grey-300')}`}
                >
                  {option.label}
                </li>
              ))}
            </div>
          </ul>
        )}
      </UiField>
    </OutsideClickHandler>
  );
}
