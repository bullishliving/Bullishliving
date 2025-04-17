'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import BulletList from '@tiptap/extension-bullet-list';
import TextAlign from '@tiptap/extension-text-align';

import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';

import UiField from './UiField';

import UiRichTextEditorToolBar from './UiRichTextEditorToolBar';

interface Props {
  name: string;
  value: string;
  onChange: (event: { name: string; value: string }) => void;
  error?: string;
  label: string
}

export default function UiRichTextEditor({ name, onChange, value, error, label }: Props) {
  const editor = useEditor({
    content: value,
    onUpdate:({ editor } ) => {
      onChange({name: name, value: editor.getHTML()})
    },
    editorProps: {
      attributes: {
        class:
          'ProseMirror min-h-[200px] outline-none font-montserrat text-secondary-500 text-wrap',
      },
    },
    extensions: [
      BulletList,
      ListItem,
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
  });

  if (!editor) return null;

  return (
    <UiField label={label} error={error}>
      <div
        className={`border rounded-2xl  p-4 max-w-full ${error ? 'border-danger-400' : 'border-grey-400 '}`}
      >
        <UiRichTextEditorToolBar editor={editor} />
        <div className="h-[200px] overflow-y-auto !outline-none">
          <EditorContent
            editor={editor}
            className="!outline-none min-h-[200px]"
          />
        </div>
      </div>
    </UiField>
  );
}
