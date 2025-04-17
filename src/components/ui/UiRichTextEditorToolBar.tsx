import UiIcon from './UiIcon';
import UiDropDown, { DropDownData } from './UiDropDown';

import { Editor, useEditorState } from '@tiptap/react';

interface Props {
  editor: Editor;
}

interface ButtonProps {
  isActive: boolean;
  action: VoidFunction;
  children: React.ReactNode;
}

export default function UiRichTextEditorToolBar({ editor }: Props) {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }: { editor: Editor }) => ({
      isBold: editor.isActive('bold'),
      isItalic: editor.isActive('italic'),
      isLink: editor.isActive('link'),
      isBulletList: editor.isActive('bulletList'),
      isNumberedList: editor.isActive('orderedList'),
      isHeading1: editor.isActive('heading', { level: 1 }),
      isHeading2: editor.isActive('heading', { level: 2 }),
      isHeading3: editor.isActive('heading', { level: 3 }),
      isHeading4: editor.isActive('heading', { level: 4 }),
      isNormalText: editor.isActive('paragraph'),
    }),
  });

  function ToolbarButton({ action, children, isActive }: ButtonProps) {
    return (
      <button
        type="button"
        onClick={action}
        className={`w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-gray-100 ${isActive && 'bg-gray-100'}`}
      >
        {children}
      </button>
    );
  }

  const textStyleOptions: DropDownData[] = [
    {
      label: <div className="w-[150px] font-bold text-lg">Heading 1</div>,
      func: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: <div className="font-bold text-base">Heading 2</div>,
      func: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: <div className="font-bold text-sm">Heading 3</div>,
      func: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: <div className="w-[150px] font-xs">Normal</div>,
      func: () => editor.chain().focus().setParagraph().run(),
    },
  ];

  function getActiveTextStyle(editor: Editor) {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1';
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3';
    if (editor.isActive('heading', { level: 4 })) return 'Heading 4';

    return 'Normal';
  }

  return (
    <div className="mb-4 border-b border-grey-400 pb-4 flex flex-wrap items-center gap-1 xs:gap-2 sm:gap-6">
      <ToolbarButton
        action={() => editor.chain().focus().toggleBold().run()}
        isActive={editorState.isBold}
      >
        <UiIcon icon="Bold" size="24" />
      </ToolbarButton>
      <ToolbarButton
        action={() => editor.chain().focus().toggleItalic().run()}
        isActive={editorState.isItalic}
      >
        <UiIcon icon="Itallic" size="24" />
      </ToolbarButton>
      <ToolbarButton action={() => {}} isActive={editorState.isLink}>
        <UiIcon icon="Link" size="24" />
      </ToolbarButton>
      <ToolbarButton
        action={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editorState.isBulletList}
      >
        <UiIcon icon="BuilletList" size="24" />
      </ToolbarButton>
      <ToolbarButton
        action={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editorState.isNumberedList}
      >
        <UiIcon icon="NumberedList" size="24" />
      </ToolbarButton>

      <UiDropDown
        options={textStyleOptions}
        side="bottom"
        align="end"
        trigger={
          <div className="flex gap-1 items-center border rounded-[16px] h-7 px-2 hover:bg-grey-100">
            <p className="font-montserrat font-bold text-sm text-secondary-500">
              {getActiveTextStyle(editor)}
            </p>
            <div className="stroke-secondary-500  mb-[2px]">
              <UiIcon icon="CaretDown" size="16" />
            </div>
          </div>
        }
      />
    </div>
  );
}
