import Logo from '@/assets/svg/logo.svg';

export default function Footer() {
  return (
    <footer className="py-16 bg-secondary-500">
      <div className="flex flex-col items-center justify-center">
        <div className="w-10 h-[27px]">
          <Logo />
        </div>
        <p className="mt-6 text-white font-montserrat text-sm">© 2024, BullishLiving Essentials</p>
      </div>
    </footer>
  );
}
