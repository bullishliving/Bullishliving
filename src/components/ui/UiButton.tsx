import { MouseEventHandler } from 'react';
import UiLoader from './UiLoader';

const sizeClasses = {
  lg: 'h-[46px]',
  md: 'h-11',
  sm: 'h-10'
};

const variantClasses = {
  primary:
    'bg-primary-500 hover:bg-primary-600 text-secondary-500 stroke-secondary-500',
  'primary-text':
    'text-primary-500 hover:text-primary-600 font-bold stroke-primary-500 hover:stroke-primary-600',
  secondary: 'bg-secondary-500  text-primary-500',
  'secondary-outlined':
    'bg-white text-secondary-500 border border-secondary-500 stroke-secondary-500 hover:bg-[#f6f6f6]',
  'tertiary-outlined': 'bg-transparent border border-grey-300 hover:bg-grey-100',
  white: 'bg-white text-secondary-500 stroke-secondary-500',
  orange: 'bg-orange-500 hover:bg-orange-600 text-white stroke-white',
  danger: 'bg-danger-400 text-white hover:bg-danger-500',
  grey: 'bg-grey-200 hover:bg-grey-300 text-tertiary-700',
};

export type BtnVariants = keyof typeof variantClasses;

const roundedClasses = {
  sm: 'rounded',
  md: 'rounded-[8px]',
  full: 'rounded-full',
};

interface Props {
  children: React.ReactNode;
  variant?: BtnVariants;
  disabled?: boolean;
  loading?: boolean;
  rounded?: keyof typeof roundedClasses;
  size?: keyof typeof sizeClasses;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function UiButton({
  children,
  variant = 'primary',
  disabled,
  loading,
  size = 'md',
  rounded = 'sm',
  type = 'submit',
  onClick,
}: Props) {
  return (
    <button
      className={`outline-none  whitespace-nowrap w-full text-sm flex gap-2 items-center justify-center font-bold font-montserrat transition-colors duration-150 ease-in rounded  ${variantClasses[variant]} ${sizeClasses[size]} ${
        roundedClasses[rounded]
      } ${disabled && 'cursor-not-allowed opacity-75'}`}
      disabled={disabled}
      type={type}
      data-testid="ui-button"
      onClick={onClick}
    >
      {loading ? <UiLoader size="sm" /> : children}
    </button>
  );
}
