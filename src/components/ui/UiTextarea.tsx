import OnChangeParams from '../../types/OnChangeParams';
import UiField from './UiField';

const variantClasses = {
  dark: 'border bg-secondary-500 !border-grey-500',
  light: '',
};

interface Props {
  label?: string;
  value: string | null | number;
  placeholder?: string;
  variant?: keyof typeof variantClasses;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  disabled?: boolean;
  optional?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: OnChangeParams) => void;
}
export default function UiTextarea({
  value,
  label,
  variant = 'light',
  name,
  placeholder,
  disabled,
  error,
  onChange,
}: Props) {
  function sendValue(e: { target: { name: string; value: string } }) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  return (
    <UiField label={label} error={error} variant={variant}>
      <textarea
        className={`flex text-left text-sm px-4 items-center w-full rounded font-normal font-montserrat ${variantClasses[variant]}`}
        placeholder={placeholder}
        value={value || ''}
        name={name}
        id={name}
        disabled={disabled}
        onChange={sendValue}
      />
    </UiField>
  );
}
