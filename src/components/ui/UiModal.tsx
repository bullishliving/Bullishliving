'use client';

import { useEffect } from 'react';
import UiIcon from './UiIcon';

interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
  startNode?: React.ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
}
export default function UiModal({
  children,
  isOpen,
  title,
  startNode,
  onClose,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div>
          <div
            className="fixed w-full h-full inset-0 top-0 left-0 p-96 flex items-center justify-center z-[60] bg-[#05051166] backdrop-blur-sm"
            data-testid="overlay"
            onClick={onClose}
          />
          <div
            className={`bg-white fixed bottom-0 md:top-1/2 left-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[70] rounded-[8px] h-fit w-full  md:w-[567px]`}
          >
            <header className="flex items-center justify-between sticky top-0 left-0 w-full z-50 py-4 px-6 border-b border-grey-400">
              {startNode}
              <h2 className="text-2xl font-black font-obitron text-secondary-500">
                {title}
              </h2>
              <button onClick={onClose} className="stroke-secondary-500">
                <UiIcon icon="Close" size="24" />
              </button>
            </header>
            <div className="px-6 py-4 md:p-6">
              <div className="max-h-[calc(87vh-64px)] overflow-y-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
