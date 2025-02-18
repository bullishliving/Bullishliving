'use client'
import { useEffect, useState } from 'react';

import Logo from '@/assets/svg/logo.svg';

import useObjectState from '@/hooks/useObjectState';

import { roleOptions } from '@/utils/constant';

import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiIcon from '../ui/UiIcon';
import UiInput from '../ui/UiInput';
import UiSelect from '../ui/UiSelect';
import UiTextarea from '../ui/UiTextArea';

// --

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnerWithUs({ isOpen, onClose }: Props) {
  const [socials, setSocials] = useState(['']);

  const formData = useObjectState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    socials: socials,
    whyCollaborate: ''
  });

  function handleSocialsChange(index: number, value: string) {
    const updatedSocials = [...socials]
    updatedSocials[index] = value
    setSocials(updatedSocials);
  }

  function addSocial() {
    const updatedSocials = [...socials, ''];
    setSocials(updatedSocials)
  }

  function removeSocial(index: number) {
    
    const updatedSocials = [...socials];
    updatedSocials.splice(index, 1);
    console.log(updatedSocials);
    
    setSocials(updatedSocials)
  }
  
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed z-50  w-full h-full top-0 left-0 bg-secondary-500 text-white overflow-y-auto">
          <header className="flex justify-between items-center py-4 px-4 md:px-6 md:py-8 2xl:p-8 max-w-[1280px] mx-auto">
            <div className="w-10 h-[27px] md:w-14 md:h-[38px] fill-primary-500 stroke-primary-500">
              <Logo />
            </div>
            <button onClick={onClose} className="stroke-white">
              <UiIcon icon="Close" size="32" />
            </button>
          </header>
          <main className="max-w-[845px] mx-auto">
            <h2 className="font-obitron font-black text-white text-2xl mb-4">
              Partner with Us
            </h2>
            <p className="font-montserrat text-sm mb-6">
              Whether you’re a trainer, athlete, or content creator, let’s
              collaborate to inspire others and amplify the BullishLiving
              mindset. Fill out the form to get started!
            </p>

            <UiForm formData={formData.value} onSubmit={() => {}}>
              {({}) => (
                <div className="grid gap-6">
                  <UiInput
                    name="fullName"
                    onChange={formData.set}
                    value={formData.value.fullName}
                    placeholder="Enter full name"
                    label="Full name"
                    variant="dark"
                  />
                  <UiInput
                    name="email"
                    onChange={formData.set}
                    value={formData.value.email}
                    placeholder="Enter email address"
                    label="Email Address"
                    variant="dark"
                  />
                  <UiInput
                    name="phone"
                    type="phone"
                    onChange={formData.set}
                    value={formData.value.phone}
                    label="Phone Number"
                    variant="dark"
                  />
                  <div>
                    <div>
                      <label className="leading-7 font-montserrat text-sm">
                        Social Media Handle(s)
                      </label>
                      <div className="grid gap-2">
                        {socials.map((__, index) => (
                          <div key={index} className="relative stroke-white">
                            <input
                              value={socials[index]}
                              onChange={(e) =>
                                handleSocialsChange(index, e.target.value)
                              }
                              placeholder={
                                index > 0
                                  ? 'Enter Social Media handle'
                                  : 'E.g @twitter.com/JohnDoe'
                              }
                              className="flex items-center h-[52px] w-full px-4 rounded bg-transparent outline-none border border-grey-500 placeholder:text-grey-600"
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeSocial(index)}
                                className="absolute right-4 top-[18px]"
                              >
                                <UiIcon icon="Close" size="16" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addSocial}
                      className="text-primary-500 text-sm mt-3 font-montserrat font-bold"
                    >
                      + Add Another Social Media Handle
                    </button>
                  </div>
                  <UiSelect
                    name="role"
                    variant="dark"
                    onChange={formData.set}
                    options={roleOptions}
                    value={formData.value.role}
                  />
                  <UiTextarea
                    name="whyCollaborate"
                    placeholder="Type here..."
                    variant='dark'
                    value={formData.value.whyCollaborate}
                    onChange={formData.set}
                  />

                  <div className="flex justify-end">
                    <div className="max-w-32 flex-1">
                      <UiButton>Apply Now</UiButton>
                    </div>
                  </div>
                </div>
              )}
            </UiForm>
          </main>
        </div>
      )}
    </>
  );
}
