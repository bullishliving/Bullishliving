import { MouseEventHandler } from 'react';

const sizeClasses = {
  lg: 'h-[46px]',
  md: 'h-11',
};

const variantClasses = {
  primary:
    'bg-primary-500 hover:bg-primary-600 text-secondary-500 stroke-secondary-500',
  secondary: 'bg-secondary-500  text-primary-500',
  white: 'bg-white text-secondary-500 stroke-secondary-500',
};

export type BtnVariants = keyof typeof variantClasses;

const roundedClasses = {
  sm: 'rounded-[4px]',
  full: 'rounded-full',
};

interface Props {
  children: React.ReactNode;
  variant?: BtnVariants;
  block?: boolean;
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
  block,
  onClick,
}: Props) {
  return (
    <button
      className={`outline-none whitespace-nowrap w-full text-sm flex gap-2 items-center justify-center font-bold font-montserrat transition-colors duration-150 ease-in rounded ${
        block && 'w-full'
      } ${variantClasses[variant]} ${sizeClasses[size]} ${
        roundedClasses[rounded]
      } ${disabled && 'cursor-not-allowed opacity-75'}`}
      disabled={disabled}
      type={type}
      data-testid="ui-button"
      onClick={onClick}
    >
      {loading ? 'loading...' : children}
    </button>
  );
}
