import React from 'react';

interface Props {
  error?: string;
  label?: React.ReactNode;
  hint?: string;
  isOptional?: boolean;
  children: React.ReactNode;
}
export default function UiField({
  error,
  label,
  isOptional,
  hint,
  children,
}: Props) {
  return (
    <div className="text-left relative">
      <label className="text-sm leading-7 font-montserrat">
        {label}{' '}
        {isOptional && <span className="text-gray-600">(optional)</span>}
      </label>
      {children}
      <div data-testid="error-text" className=" text-danger-500 text-xs">
        {error}
      </div>
      <div className="text-xs text-gray-900">{hint}</div>
    </div>
  );
}
