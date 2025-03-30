import { Switch } from '@/components/ui/switch';

interface Props {
  label?: string;
  value: boolean;
  onChange: (checked: boolean) => void;
}

export default function UiSwith({ label, value, onChange }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" checked={value} onCheckedChange={onChange} />
      {label && <label htmlFor="airplane-mode">Airplane Mode</label>}
    </div>
  );
}
