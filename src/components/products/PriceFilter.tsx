'use client';

import { useState, useEffect, useCallback } from 'react';

import { Slider } from '../ui/slider';

export type PriceRange = [number, number];

interface Props {
  priceRange: PriceRange;
  setPriceRange: (range: PriceRange) => void;
}

export default function PriceFilter({ priceRange, setPriceRange }: Props) {
  const [initalPrice] = useState({ min: 2000, max: 300000 });
  const [priceInputs, setPriceInputs] = useState({
    min: `${priceRange[0].toLocaleString()}`,
    max: `${priceRange[1].toLocaleString()}`,
  });
  const [thumbPositions, setThumbPositions] = useState<[number, number]>([
    0, 100,
  ]);

  const calculateThumbPositions = useCallback(() => {
    const minPercent =
      ((priceRange[0] - initalPrice.min) /
        (initalPrice.max - initalPrice.min)) *
      100;
    const maxPercent =
      ((priceRange[1] - initalPrice.min) /
        (initalPrice.max - initalPrice.min)) *
      100;
    setThumbPositions([minPercent, maxPercent]);
  }, [initalPrice, priceRange]);

  function handlePriceRange(range: PriceRange) {
    const [min, max] = range;

    if (min >= max) {
      return;
    }

    setPriceRange(range);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const numericValue = value.replace(/\D/g, '');
    const parsedValue = numericValue ? parseInt(numericValue, 10) : 0;

    setPriceInputs((prev) => ({
      ...prev,
      [name]: parsedValue.toLocaleString(),
    }));
  }

  function handleInputBlur(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    const parsedValue = numericValue ? parseInt(numericValue, 10) : 0;

    let newMin = priceRange[0];
    let newMax = priceRange[1];

    if (name === 'min') {
      newMin = Math.max(initalPrice.min, Math.min(parsedValue, newMax));
    } else {
      newMax = Math.min(initalPrice.max, Math.max(parsedValue, newMin));
    }

    setPriceRange([newMin, newMax]);

    setPriceInputs({
      min: newMin.toLocaleString(),
      max: newMax.toLocaleString(),
    });
  }

  function formatNumber(num: number) {
    if (num >= 1000) {
      return `₦${(num / 1000).toFixed(0)}k`;
    }
    return `₦${num.toLocaleString()}`;
  }

  useEffect(() => {
    calculateThumbPositions();
    setPriceInputs({
      min: priceRange[0].toLocaleString(),
      max: priceRange[1].toLocaleString(),
    });
  }, [calculateThumbPositions, priceRange]);

  return (
    <div className={`rounded-b-[8px] w-full`}>
      <div className={`font-montserrat pt-8`}>
        <div className="relative">
          <Slider
            defaultValue={[33, 70]}
            value={priceRange}
            min={2000}
            max={300000}
            onValueChange={handlePriceRange}
            step={1}
            rangeClassName="h-[2px] bg-primary-500"
            thumbClassName="h-6 w-6 bg-primary-500 border-2 border-primary-500 shadow-none cursor-pointer"
            trackClassName="h-[2px] bg-grey-200 rounded-none"
          />
          <div
            className="absolute text-sm  text-secondary-300"
            style={{
              left: `calc(${thumbPositions[0]}% - ${thumbPositions[0] > 10 ? '1.5rem' : '0.5rem'})`,
              top: '-2.5rem',
            }}
          >
            {formatNumber(priceRange[0])}{' '}
          </div>
          <div
            className="absolute text-sm text-secondary-300"
            style={{
              left: `calc(${thumbPositions[1]}% - ${thumbPositions[1] < 90 ? '1.5rem' : '2.5rem'})`,
              top: '-2.5rem',
            }}
          >
            {formatNumber(priceRange[1])}
          </div>
        </div>

        <div className="flex justify-between mt-4 text-sm text-grey-700">
          <p>₦{initalPrice.min.toLocaleString()}</p>
          <p>₦{initalPrice.max.toLocaleString()}</p>
        </div>
        <div className=" grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col max-w-full ">
            <label htmlFor="" className="text-sm text-secondary-300">
              Min
            </label>
            <input
              name="min"
              value={priceInputs.min}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="hide-number-spinners h-10 border border-grey-200 outline-none px-3 text-secondary-300"
            />
          </div>
          <div className="flex flex-col max-w-full ">
            <label htmlFor="" className="text-sm text-secondary-300">
              Max
            </label>
            <input
              value={priceInputs.max}
              name="max"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="hide-number-spinners h-10 border w-full border-grey-200 outline-none px-3 text-secondary-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
