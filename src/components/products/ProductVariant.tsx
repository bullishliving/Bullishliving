interface Props {
  variant: string;
  isActive: boolean;
  onVariantChange: VoidFunction;
}

export default function ProductVariant({
  isActive,
  variant,
  onVariantChange,
}: Props) {
  return (
    <button
      onClick={onVariantChange}
      className={`text-tertiary-700 font-bold text-sm flex items-center w-10 h-10 justify-center font-montserrat capitalize transition-all duration-100 ease-in ${isActive ? 'bg-secondary-500 !text-primary-500 rounded-[8px]' : ''}`}
    >
      {variant}
    </button>
  );
}
