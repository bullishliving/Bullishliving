import { MouseEventHandler } from 'react';
import UiLoader from './UiLoader';

const sizeClasses = {
  lg: 'h-[46px]',
  md: 'h-11',
};

const variantClasses = {
  primary:
    'bg-primary-500 hover:bg-primary-600 text-secondary-500 stroke-secondary-500',
    'primary-text': 'text-primary-500 hover:text-primary-600 font-bold stroke-primary-500 hover:stroke-primary-600', 
  secondary: 'bg-secondary-500  text-primary-500',
  'secondary-outlined':
    'bg-white text-secondary-500 border border-secondary-500 stroke-secondary-500 hover:bg-[#f6f6f6]',
  white: 'bg-white text-secondary-500 stroke-secondary-500',
  orange: 'bg-orange-500 hover:bg-orange-600 text-white stroke-white',
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
