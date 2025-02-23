import { useState, useMemo } from 'react';
import UiField from './UiField';
// import UiIcon from './UiIcon';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';

const variantClasses = {
  dark: 'border border-grey-500',
  light: '',
  transparent: 'border-b border-grey-500 text-white pb-4',
};

type Variant = keyof typeof variantClasses;

interface Props {
  label?: string;
  type?: InputType;
  value: string | null | number;
  placeholder?: string;
  name: string;
  error?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: { name: string; value: string | null }) => void;
  variant?: Variant;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
}
export default function UiInput({
  type = 'text',
  value,
  label,
  name,
  placeholder,
  disabled,
  error,
  variant = 'light',
  onChange,
  prefixNode,
  suffixNode,
}: Props) {
  const [inputType, setInputType] = useState(type);

  function sendValue(e: React.ChangeEvent<HTMLInputElement>) {
    if (disabled) return;

    onChange({ name: e.target.name, value: e.target.value });
  }

  function handlePhoneChange(value: string | undefined) {
    if (disabled) return;

    onChange({ name, value: value! });
  }

  function togglePassword() {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  }

  const placeholderStyle = useMemo(() => {
    return variant === 'dark'
      ? 'placeholder:text-grey-600'
      : variant === 'light'
        ? 'placeholder:text-grey-700'
        : 'placeholder:text-white';
  }, [variant]);

  const phoneCodeStyle = useMemo(() => {
    return variant === 'dark'
      ? 'text-grey-600 border-grey-500'
      : variant === 'light'
        ? 'text-grey-700 border-grey-300'
        : 'text-white border-[#bab8b8a5]';
  }, [variant]);

  const validationStyle = useMemo(() => {
    return error && 'border-danger-200';
  }, [error]);

  return (
    <UiField label={label} error={error}>
      <div
        className={`relative flex items-center w-full !bg-transparent text-sm font-normal font-montserrat ${variant !== 'transparent' && 'h-[52px] px-4 rounded'} ${variantClasses[variant]} ${validationStyle}`}
      >
        {prefixNode && (
          <div className="pl-2  text-gray-500 text-sm flex items-center">
            {prefixNode}
          </div>
        )}

        {type === 'phone' ? (
          <div className="flex items-center w-full">
            <span className={`pr-2 border-r ${phoneCodeStyle}`}>+234</span>
            <PhoneInput
              country="NG"
              defaultCountry="NG"
              placeholder="Enter phone number"
              className={`phone-input ${variant} flex-1`}
              disabled={disabled}
              value={`${value || ''}`}
              onChange={handlePhoneChange}
            />
          </div>
        ) : (
          <input
            className={`flex-1 outline-none text-white placeholder:text-sm placeholder:font-normal text-xs font-semibold h-full bg-transparent ${prefixNode ? 'pl-0' : ''}  ${placeholderStyle}`}
            placeholder={placeholder}
            type={inputType}
            value={value || ''}
            name={name}
            id={name}
            disabled={disabled}
            onChange={sendValue}
          />
        )}

        {/* Suffix Node */}
        {suffixNode && (
          <div className="pl-2 pr-4 text-gray-500 text-sm flex items-center">
            {suffixNode}
          </div>
        )}

        {type === 'password' && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-0 top-[25%] mx-3 bg-white"
          >
            {/* <UiIcon
              size="20"
              icon={inputType === 'password' ? 'EyeSlash' : 'Eye'}
            /> */}
          </button>
        )}
      </div>
    </UiField>
  );
}
