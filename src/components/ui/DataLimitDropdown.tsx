import { useState } from "react";

import UiIcon from "./UiIcon";
import OutsideClickHandler from "react-outside-click-handler";

//---

interface Props {
  limit: number;
  setLimit: (limit: number) => void;
}

export default function DataLimitDropdown({ limit, setLimit }: Props) {
  const [areNumbersVisible, setAreNumbersVisible] = useState(false);

  const numbers = Array.from({ length: 20 }, (_, i) => i * 5 + 5);

  function toggleVisibility() {
    setAreNumbersVisible((prevState) => !prevState);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setAreNumbersVisible(false)}>
      <div className="relative">
        <button
          onClick={toggleVisibility}
          className=" outline-none flex gap-2 items-center stroke-secondary-500"
        >
          <p className="font-bold text-secondary-500">{limit}</p>
          <div
            className={`transition-transform ease-in-out duration-300 stroke-secondary-500 ${areNumbersVisible ? 'rotate-180' : 'rotate-0'} `}
          >
            <UiIcon icon="CaretDown" size="16" />
          </div>
        </button>
        {areNumbersVisible && (
          <div className="absolute top-6 bg-white rounded-sm grid gap-1 shadow-dropdown-options max-h-[120px] overflow-y-scroll">
            {numbers.map((number) => (
              <button
                onClick={() => {
                  setLimit(number);
                  setAreNumbersVisible(false);
                }}
                key={number}
                className="px-6 hover:bg-grey-300"
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}
