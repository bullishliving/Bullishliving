interface Props {
  label: string;
  name: string;
  /** formValue value in the form */
  formValue: string;
  value: string;
  onChange: ({name, value}: {name: string, value: string}) => void;
}
export default function UiRadio({
  label,
  value,
  formValue,
  name,
  onChange,
}: Props) {
  return (
    <button
      id={name}
      className="flex items-center gap-2"
      type="button"
      onClick={() => onChange({ name, value })}
    >
      <div
        className={`rounded-full border-[2px] transition-all duration-75 ease-in w-[20px] h-[20px] flex items-center justify-center ${
          value === formValue
            ? 'stroke-primary-500 border-primary-500'
            : 'border-[#4F4F4F]'
        }`}
      >
        {value === formValue && (
          <div className="w-[12px] h-[12px] border-[2px] border-primary-500 rounded-full"></div>
        )}
      </div>
      <label
        htmlFor={value}
        className="text-sm text-[#433d3d] font-montserrat font-bold cursor-pointer"
      >
        {label}
      </label>
    </button>
  );
}
