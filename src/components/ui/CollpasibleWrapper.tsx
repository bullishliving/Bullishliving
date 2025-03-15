import { useState } from "react";
import UiIcon from "./UiIcon";

interface Props {
  title: string;
  children: React.ReactNode
  initialOpen?: boolean
  hideBorderTop?: boolean
}

export default function CollpasibleWrapper({
  children,
  title,
  initialOpen,
  hideBorderTop,
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false);

  function toggleIsOpen() {
    setIsOpen((prevState) => {
      return !prevState;
    });
  }

  return (
    <div
      className={`border ${hideBorderTop ? 'border-t-0 rounded-t-none' : ''} rounded-[8px] overflow-hidden px-4 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-12'}`}
    >
      <button
        onClick={toggleIsOpen}
        className="h-12 w-full flex justify-between items-center"
      >
        <p className="font-black font-obitron text-sm text-secondary-500">
          {title}
        </p>
        <div
          className={`stroke-secondary-500 transition-transform ease-in-out duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <UiIcon icon="CaretDown" size="16" />
        </div>
      </button>
      <div className="pb-6 mt-5">{children}</div>
    </div>
  );
}
