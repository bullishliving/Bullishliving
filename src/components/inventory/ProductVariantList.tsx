import UiIcon from '../ui/UiIcon';

export default function ProductVariantList() {
  return (
    <div>
      <p className="font-montserrat font-bold text-secondary-500 mb-4">
        Product variant<span className="text-[#A3A3A3]">(Optional)</span>
      </p>
      <div className="border border-grey-400 rounded-[16px] p-4">
        <button className="flex items-center gap-2 outline-none">
          <UiIcon icon="AddCircle" size="24" />
          <p className="font-bold font-montserrat text-primary-500 text-sm">
            Add Product Variant
          </p>
        </button>
      </div>
    </div>
  );
}
