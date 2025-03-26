import React from 'react';

const variantClasses = {
  dark: 'text-white',
  light: 'text-secondary-300',
  transparent: 'border-b border-grey-500 text-white pb-4',
};
interface Props {
  error?: string;
  label?: React.ReactNode;
  hint?: string;
  variant?: keyof typeof variantClasses;
  isOptional?: boolean;
  children: React.ReactNode;
}
export default function UiField({
  error,
  label,
  isOptional,
  variant='light',
  hint,
  children,
}: Props) {
  return (
    <div className="text-left relative">
      <label
        className={`text-sm leading-7 font-montserrat ${variantClasses[variant]}`}
      >
        {label}{' '}
        {isOptional && <span className="text-gray-600">(optional)</span>}
      </label>
      {children}
      <div
        data-testid="error-text"
        className=" text-danger-500 text-sm font-montserrat leading-7"
      >
        {error}
      </div>
      <div className="text-xs text-gray-900">{hint}</div>
    </div>
  );
}
