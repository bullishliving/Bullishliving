'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import BulletList from '@tiptap/extension-bullet-list';
import TextAlign from '@tiptap/extension-text-align';

import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';

import UiRichTextEditorToolBar from './UiRichTextEditorToolBar';

interface Props {
  content: string;
}

export default function UiRichTextEditor({ content }: Props) {
  const editor = useEditor({
    content,
    editorProps: {
      attributes: {
        class:
          'ProseMirror min-h-[200px] outline-none font-montserrat text-secondary-500 ',
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
    <div className="border border-grey-400 rounded-2xl p-4 max-w-full">
      <UiRichTextEditorToolBar editor={editor} />
      <div className="h-[200px] overflow-y-auto !outline-none">
        <EditorContent
          editor={editor}
          className="!outline-none min-h-[200px]"
        />
      </div>
    </div>
  );
}
