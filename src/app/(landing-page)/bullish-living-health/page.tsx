'use client'

import Image from "next/image";

import BullishLivingHealthyImage from '@/assets/images/bullishliving-healthy-meal.png';

import UiForm from "@/components/ui/UiForm";
import UiInput from "@/components/ui/UiInput";
import UiButton from "@/components/ui/UiButton";
import UiIcon from "@/components/ui/UiIcon";

import useObjectState from "@/hooks/useObjectState";

export default function Page() {
  const formData = useObjectState({
    email: ''
  })
  return (
    <section className="p-4 md:py-14 md:px-6 2xl:px-8 bg-secondary-500">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-6 md:gap-16 items-center text-white pb-28">
        <div>
          <Image
            height={450}
            width={686}
            alt="healthy meal"
            src={BullishLivingHealthyImage}
            className="rounded-lg h-[343px] md:h-[450px] object-cover"
          />
        </div>
        <div className="lg:max-w-[530px]">
          <h2 className="text-[34px] leading-10 font-obitron font-black mb-4">
            Fuel Your Body Strengthen Your Mind Stay Bullish
          </h2>
          <p className="font-montserrat text-lg mb-8">
            Access Expert-Backed meal plan, nutrition tips and fitness guide,
            designed to keep you performing at your peak.Enter your email below
            to receive your free PDF!
          </p>
          <div className="p-[1.5px] rounded-2xl bg-grey-gradient">
            <div className="bg-secondary-500 py-6 px-4 rounded-[14px]">
              <UiForm formData={formData.value} onSubmit={() => {}}>
                {({}) => (
                  <div className="grid gap-6 ">
                    <UiInput
                      name="email"
                      variant="transparent"
                      onChange={() => {}}
                      value={''}
                      placeholder="Enter your email address"
                    />
                    <UiButton>
                      Send me the meal plan <UiIcon icon="ArrowDiagonal" />
                    </UiButton>
                  </div>
                )}
              </UiForm>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
