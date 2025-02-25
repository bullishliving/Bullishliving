export default function OrSeperator() {
  return (
    <div className="flex items-center gap-4">
      <div className=" h-[1px] flex-1 or-border"></div>
      <p className="text-white font-montserrat">OR</p>
      <div className="h-[1px] flex-1 or-border"></div>
    </div>
  );
}
