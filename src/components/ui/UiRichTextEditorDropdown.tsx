import UiIcon from './UiIcon';

export default function UiRichTextEditorDropdown() {
  return (
    <div>
      <button className="flex gap-1 items-center border rounded-[16px] h-7 px-2 hover:bg-grey-100">
        <p className="font-montserrat font-bold text-sm text-secondary-500">
          Normal
        </p>
        <div className="stroke-secondary-500  mb-[2px]">
          <UiIcon icon="CaretDown" size="16" />
        </div>
      </button>
    </div>
  );
}
