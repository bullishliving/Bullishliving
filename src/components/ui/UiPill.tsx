const variantClasses = {
  success: 'bg-success-50 text-success-500',
  neutral: 'bg-blue-50 text-blue-500',
  warning: 'bg-warning-50 text-warning-500',
};

interface Props {
  variant: keyof typeof variantClasses;
  children: React.ReactNode
}

export default function UiPill({ variant, children }: Props) {
  return (
    <div
      className={`h-5 px-[10px] flex items-center justify-center rounded-2xl font-bold font-montserrat text-xs ${variantClasses[variant]}`}
    >
      {children}
    </div>
  );
}
