'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// import { Api } from '@/api/supabaseService';

import Logo from '@/assets/svg/logo.svg';

import useObjectState from '@/hooks/useObjectState';
import useToggle from '@/hooks/useToggle';

import { roleOptions } from '@/utils/constant';
import PartnerWithUsSchema from '@/utils/schemas/PartnerWithUsSchema';

import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiIcon from '../ui/UiIcon';
import UiInput from '../ui/UiInput';
import UiSelect from '../ui/UiSelect';
import UiTextarea from '../ui/UiTextarea';
import showToast from '../ui/UiToast';

// ---

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnerWithUs({ isOpen, onClose }: Props) {
  const [socials, setSocials] = useState(['']);

  const formData = useObjectState({
    name: '',
    email: '',
    phone: '',
    role: '',
    socials: [...socials],
    why_collaborate: '',
  });

  const loading = useToggle();

  const socialInputVariant = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1, ease: 'easeIn' },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.1, ease: 'easeOut' },
    },
  };

  function handleSocialsChange(index: number, value: string) {
    const updatedSocials = [...socials];
    updatedSocials[index] = value;
    setSocials(updatedSocials);
    formData.set({ name: 'socials', value: updatedSocials });
  }

  function addSocial() {
    const updatedSocials = [...socials, ''];
    setSocials(updatedSocials);
  }

  function removeSocial(index: number) {
    const updatedSocials = [...socials];
    updatedSocials.splice(index, 1);
    console.log(updatedSocials);

    setSocials(updatedSocials);
  }

  function resetState() {
    formData.reset();
    setSocials(['']);
  }

  async function onSubmit() {
    try {
      loading.on();
      await fetch('/api/mail/partnership-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.value.name,
          email: formData.value.email,
          phone: formData.value.phone,
          socialLinks: formData.value.socials,
          role: formData.value.role,
          reason: formData.value.why_collaborate,
        }),
      });  
      showToast('Application successful! 🎉', 'success');
      resetState();
    } catch (error) {
      showToast('oops, an error occured', 'error');
      throw new Error(`An error occured when sending partnership request ${error}`);
    } finally {
      loading.off();
    }
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed z-50  w-full h-full top-0 left-0 bg-secondary-500 text-white overflow-y-auto pb-8  md:px-6">
          <header className="flex justify-between items-center py-4 px-4 md:px-6 md:py-8 2xl:p-8 max-w-[1280px] mx-auto">
            <div className="w-10 h-[27px] md:w-14 md:h-[38px] fill-primary-500 stroke-primary-500">
              <Logo />
            </div>
            <button onClick={onClose} className="stroke-white">
              <UiIcon icon="Close" size="32" />
            </button>
          </header>
          <main className="max-w-[845px] mx-auto px-4">
            <h2 className="font-obitron font-black text-white text-2xl mb-4">
              Partner with Us
            </h2>
            <p className="font-montserrat text-sm mb-6">
              Whether you’re a trainer, athlete, or content creator, let’s
              collaborate to inspire others and amplify the BullishLiving
              mindset. Fill out the form to get started!
            </p>
            <UiForm
              formData={formData.value}
              onSubmit={onSubmit}
              schema={PartnerWithUsSchema}
            >
              {({ errors }) => (
                <div className="grid gap-6">
                  <UiInput
                    name="name"
                    onChange={formData.set}
                    value={formData.value.name}
                    placeholder="Enter full name"
                    label="Full name"
                    variant="dark"
                    error={errors.name}
                  />
                  <UiInput
                    name="email"
                    onChange={formData.set}
                    value={formData.value.email}
                    placeholder="Enter email address"
                    label="Email Address"
                    variant="dark"
                    error={errors.email}
                  />
                  <UiInput
                    name="phone"
                    type="phone"
                    onChange={formData.set}
                    value={formData.value.phone}
                    error={errors.phone}
                    label="Phone Number"
                    variant="dark"
                  />
                  <div>
                    <div>
                      <label className="leading-7 font-montserrat text-sm">
                        Social Media Handle(s)
                      </label>
                      <AnimatePresence>
                        <div className="grid gap-2">
                          {socials.map((__, index) => (
                            <motion.div
                              key={index}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={socialInputVariant}
                              className="relative stroke-white"
                            >
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
                            </motion.div>
                          ))}
                        </div>
                      </AnimatePresence>
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
                    label="Role"
                    variant="dark"
                    onChange={formData.set}
                    options={roleOptions}
                    value={formData.value.role}
                    error={errors.role}
                  />
                  <UiTextarea
                    name="why_collaborate"
                    label="Why You Want to Collaborate with BullishLiving"
                    placeholder="Type here..."
                    variant="dark"
                    value={formData.value.why_collaborate}
                    onChange={formData.set}
                  />

                  <div className="flex justify-end">
                    <div className="max-w-32 flex-1">
                      <UiButton loading={loading.value}>Apply Now</UiButton>
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
