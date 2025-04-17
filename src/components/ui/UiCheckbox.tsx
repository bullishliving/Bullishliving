'use client';
import { useId } from 'react';

import { Checkbox } from '@/components/ui/checkbox';

interface Props {
  label: string;
  isChecked: boolean;
  onCheckChange: VoidFunction;
}

export default function UiCheckbox({ label, isChecked, onCheckChange }: Props) {
  const id = useId();

  return (
    <div className="flex gap-3 items-center">
      <Checkbox
        id={id}
        checked={isChecked}
        onClick={onCheckChange}
        className="custom-checkbox flex justify-center items-center  stroke-black fill-black border-2 border-grey-800 shadow-none rounded transition-all ease-in duration-75"
      />
      <label
        htmlFor={id}
        className="font-montserrat text-secondary-300 capitalize"
      >
        {label}
      </label>
    </div>
  );
}
