import { useMemo } from 'react';

interface Props {
  variant?: 'primary' | 'light';
  size?: 'sm' | 'md' | 'lg';
}
export default function UiLoader({ variant, size }: Props) {
  const color = useMemo(() => {
    if (variant === 'light') return 'border-[#fff]';

    return 'border-secondary-500';
  }, [variant]);

  const sizeClasses = useMemo(() => {
    if (size === 'sm') return 'w-5 h-5';

    return 'w-12 h-12';
  }, [size]);

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses} border-4 ${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}
