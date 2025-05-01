import Link from 'next/link';

import LogoFull from '@/assets/svg/logo-full.svg';

import { footerSocials } from '@/utils/constant';
import UiIcon, { Icons } from '../ui/UiIcon';

export default function Footer() {
  const date = new Date();

  return (
    <footer className={`py-10 md:py-16 p-4 md:px-6 2xl:px-8 bg-primary-500`}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-16 pb-8 border-b border-secondary-500">
          <div>
            <Link  href="/">
              <LogoFull />
            </Link>
            <p className="font-montserrat text-sm test-second mt-3 md:mt-4">
              Ready for whatever
            </p>
            <div className="flex gap-10 mt-6">
              {footerSocials.map((social) => (
                <a
                  key={social.icon}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <UiIcon icon={social.icon as Icons} size="32" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-16 sm:gap-24">
            <div>
              <h3 className="font-montserrat font-bold mb-6">Company</h3>
              <div className="flex flex-col gap-6 text-base font-montserrat">
                <Link href="/about-us">About us</Link>
                <a href="#community">Running community</a>
                <Link href="/partnership-details">Partner with us</Link>
                <Link href="/bullishliving-health">BullishLiving Health</Link>
              </div>
            </div>
            <div>
              <h3 className="font-montserrat font-bold mb-6">Contact us</h3>
              <div className="flex flex-col gap-6 text-base font-montserrat">
                <a href="mailto:Info@bullishliving.com">
                  Info@bullishliving.com
                </a>
                <a href="tel:08168828810">+234 8046573833</a>
              </div>
            </div>
          </div>
        </div>

        <p className={`mt-6 font-montserrat text-sm text-secondary-500`}>
          © {date.getFullYear()}, BullishLiving Essentials
        </p>
      </div>
    </footer>
  );
}
