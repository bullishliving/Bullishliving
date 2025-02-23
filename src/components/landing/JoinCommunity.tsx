'use client'
import Link from "next/link";
import { motion } from 'framer-motion';

import { Api } from '@/api/supabaseService';

import useObjectState from "@/hooks/useObjectState";

import CommunityMember from '@/types/CommunityMember';

import useToggle from "@/hooks/useToggle";
import JoinCommunitySchema from "@/utils/schemas/JoinCommunitySchema";
import { socials } from "@/utils/constant";

import AnimatedTitle from "../animations/AnimatedTitle";
import FadeIn from "../animations/FadeIn";

import UiForm from "../ui/UiForm";
import UiInput from "../ui/UiInput";
import UiButton from "../ui/UiButton";
import UiIcon, { Icons } from "../ui/UiIcon";
import showToast from "../ui/UiToast";


export default function JoinCommunity() {
  const formData = useObjectState({
    name: '',
    email: '',
    phone: '',
  });

  const loading = useToggle();

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  async function onSubmit() {    
    try {
      loading.on()
      await Api.addCommunityMember(formData.value as CommunityMember);
      showToast('You’ve successfully joined the community! 🎉', 'success');
    } catch (error) {
      console.log(error);
        showToast('oops, an error occured', 'error');
        throw new Error(`An error occured when adding memeber ${error}`)
    } finally {
      loading.off()
    }
  }

  return (
    <section className="bg-primary-500 px-4 py-16 md:py-24 md:px-6 2xl:px-8">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-obitron font-black text-center text-[34px] leading-[40px] md:text-[40px] md:leading-[52px] text-secondary-500 mb-2 md:mb-4">
          <AnimatedTitle
            text="Join Our Running Community"
            textStyle="mr-2 sm:mr-4 inline-block overflow-hidden"
            containerStyles="justify-center"
          />
        </h2>
        <FadeIn>
          <p className="font-montserrat text-secondary-500  max-w-[738px] mx-auto text-center text-sm md:text-base">
            {' '}
            Whether you’re a seasoned runner or just starting out, join a
            vibrant community that inspires, supports, and moves with purpose
          </p>
        </FadeIn>
        <div className="community-bg-image flex justify-center items-center rounded-2xl h-[537px] px-4 mt-10">
          <div className="w-full max-w-[459px] px-6 py-8 md:p-10 bg-[#FFFFFF0D] backdrop-blur-[20px] border border-[#bab8b871] rounded-2xl">
            <h3 className="text-white font-obitron font-black text-xl mb-6">
              Run Together. Grow Stronger
            </h3>
            <UiForm
              formData={formData.value}
              onSubmit={onSubmit}
              schema={JoinCommunitySchema}
            >
              {({ errors }) => (
                <div className="grid gap-6">
                  <UiInput
                    name="name"
                    onChange={formData.set}
                    value={formData.value.name}
                    placeholder="Enter Fullname"
                    error={errors.name}
                    variant="transparent"
                  />
                  <UiInput
                    name="email"
                    onChange={formData.set}
                    value={formData.value.email}
                    placeholder="Enter your email address"
                    error={errors.email}
                    variant="transparent"
                  />
                  <UiInput
                    name="phone"
                    type="phone"
                    onChange={formData.set}
                    value={formData.value.phone}
                    placeholder="Enter your email address"
                    error={errors.phone}
                    variant="transparent"
                  />
                  <UiButton variant="white" loading={loading.value}>
                    Subscribe
                    <UiIcon icon="ArrowDiagonal" size="24" />
                  </UiButton>
                </div>
              )}
            </UiForm>
          </div>
        </div>
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex justify-center gap-10 mt-10"
        >
          {socials.map((social) => (
            <motion.div variants={childVariants} key={social}>
              <Link href="" className="flex items-center gap-3">
                <UiIcon icon={social as Icons} size="33" />
                <p className="hidden md:block font-obitron font-black text-xl text-secondary-500">
                  {social}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
