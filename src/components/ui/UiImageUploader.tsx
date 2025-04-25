'use client';

import { useEffect, useRef, useState } from 'react';

import ImageSvg from '@/assets/svg/image.svg';
import Image from 'next/image';
import UiIcon from './UiIcon';

//---

interface Props {
  name: string;
  value: File[] | string[] | null;
  onChange: (event: { name: string; value: File[] | string[] }) => void;
  error?: string; 
  acceptMultile?: boolean
}

export default function UiImageUploader({
  name,
  value,
  onChange,
  acceptMultile= true,
  error
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgPreviewSrc, setImgPreviewSrc] = useState<string[] | null>(null);

  function openFilePicker() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    
    if (!files || !files.length) return;

    onChange({ name, value: [...files] });
  }

  function removeImage(index: number) {
    if (!value ) return;

    const newValue = value.filter((__, i) => i !== index);

    onChange({ name, value: newValue as string[] | File[] });
  }

  function setPreviewImage() {
    if (value?.every((file) => file instanceof File)) {
      const imgUrls = value.map((file) => URL.createObjectURL(file));
      setImgPreviewSrc(imgUrls);
    } else {
      setImgPreviewSrc(value as string[])
    }
    
  }

  useEffect(setPreviewImage, [value]);

  return (
    <div>
      <p className="text-sm font-montserrat leading-7">Upload Image</p>
      <div
        className={`py-8 px-6 flex flex-col font-montserrat rounded-[8px] justify-center items-center border border-dashed ${error ? 'border-danger-400' : 'border-grey-400'}`}
      >
        <ImageSvg />
        <p className="text-center text-secondary-500 text-sm max-w-[441px] mx-auto mt-2">
          <button
            type="button"
            onClick={openFilePicker}
            className="font-bold text-primary-500 outline-none"
          >
            Click to upload
          </button>{' '}
          or drag & drop your files here (Image size 500 x 500)
        </p>
      </div>
      {error && (
        <p className="font-montserrat text-sm text-danger-500 mt-1">{error}</p>
      )}
      <div className="flex gap-4 flex-wrap mt-4">
        {imgPreviewSrc?.map((src, index) => (
          <div key={index} className="relative">
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute z-50 -top-[10px] right-0 w-8 h-8 rounded-full outline-none border border-grey-300 flex justify-center items-center stroke-secondary-500 bg-[#EEE6F080] backdrop-blur-sm"
            >
              <UiIcon icon="Close" size="20" />
            </button>
            <Image
              src={src}
              alt="product image"
              width={152}
              height={152}
              className={`object-cover !relative  h-full !w-16 max-h-16 sm:min-w-[152px] sm:min-h-[152px] ${index === 0 && 'border border-grey-400'}`}
            />
            {index === 0 && (
              <div className="absolute bottom-0 w-full bg-[#EEE6F080] backdrop-blur-sm font-montserrat text-xs text-secondary-300 py-1 text-center">
                Thumbnail
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        ref={fileInputRef}
        multiple={acceptMultile}
        className="hidden"
        onChange={handleChange}
        accept="image/*"
        type="file"
      />
    </div>
  );
}
