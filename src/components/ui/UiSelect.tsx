// import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import OnChangeParams from '@/types/OnChangeParams';

import UiField from './UiField';

const variantClasses = {
  dark: 'border bg-secondary-500 !border-grey-500',
  light: '',
  transparent: 'border-b border-grey-500 text-white pb-4',
};

export interface Option {
  label: React.ReactNode;
  value: string | boolean;
  disabled?: boolean;
}

interface Props {
  label?: string;
  value: string | null | number | boolean;
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
  onChange,
}: Props) {
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);

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
  }

  function toggleOptions() {
    if (disabled) return;

    setOptionsAreVisible(!optionsAreVisible);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setOptionsAreVisible(false)}>
      <UiField error={error} label={label}>
        <button
          type="button"
          data-testid="ui-select-trigger"
          style={{ minHeight: '52px' }}
          className={`flex text-left text-sm px-4 items-center w-full rounded font-normal font-montserrat ${variantClasses[variant]} ${validationStyle}`}
          onClick={toggleOptions}
        >
          <div
            className={`w-full text-typography-disabled text-sm ${placeholderStyle} ${
              value && ' text-white font-medium'
            }`}
          >
            {displayText}
          </div>
          {/* {optionsAreVisible ? <CaretUp /> : <CaretDown />} */}
        </button>
        {optionsAreVisible && (
          <ul
            data-testid="ui-select-options"
            className={`absolute ${variantClasses[variant]} rounded-[8px] px-6 pt-6 mt-2 z-20 w-full`}
          >
            <div className="overflow-auto max-h-72 custom-sidebar">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => selectOption(option.value)}
                  className={`py-4 text-sm font-montserrat font-semibold cursor-pointer ${variant === 'dark' ? 'hover:bg-secondary-400' : ''} ${index < options.length - 1 && (variant === 'dark' ? 'border-b border-grey-500' : '')}`}
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
