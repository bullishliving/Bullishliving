'use client'

import { useRef, useState } from "react";
import OutsideClickHandler from 'react-outside-click-handler';

import UiIcon from "../ui/UiIcon";

// --

interface Props {
  onClose: VoidFunction
}

export default function SearchPanel({ onClose }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  function clearSearchQuery() {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <section className="absolute -bottom-[103px] md:-bottom-[112px] w-full bg-white shadow-search-panel rounded-lg px-6 py-4 md:py-5">
      <OutsideClickHandler  onOutsideClick={onClose}>
        <div className="flex items-center gap-[10px]">
        <div className="stroke-tertiary-700">
          <UiIcon icon="Search" size="16"/>
        </div>
        <input  
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          ref={inputRef}
          placeholder="Search"
          className="font-montserrat flex-1 text-sm text-tertiary-700 placeholder:text-tertiary-700 h-10 outline-none"/>
        <button 
          onClick={clearSearchQuery}
          className="w-8 h-8 rounded-full flex items-center justify-center border border-black stroke-black">
          <UiIcon icon="Close" size="16"/>
        </button>
      </div>
      </OutsideClickHandler>
    </section>
  )
}
