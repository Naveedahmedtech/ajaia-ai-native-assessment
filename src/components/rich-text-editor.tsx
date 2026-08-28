"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { saveDocumentContent } from "@/app/actions/content";

export function RichTextEditor({ documentId, initialContent }: { documentId: string; initialContent: object }) {
  const [status, setStatus] = useState("Saved");
  const version = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const lastContent = useRef<object>(initialContent);
  const save = async (content: object, current: number) => {
    const result = await saveDocumentContent(documentId, content);
    if (current === version.current) setStatus(result.ok ? "Saved" : "Save failed");
  };
  const editor = useEditor({ extensions: [StarterKit, Underline], content: initialContent, onUpdate: ({ editor }) => {
    const current = ++version.current;
    const content = editor.getJSON();
    lastContent.current = content;
    setStatus("Saving...");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => void save(content, current), 750);
  } });
  useEffect(() => () => editor?.destroy(), [editor]);
  if (!editor) return null;
  const button = (label: string, action: () => void) => <button className="theme-surface rounded border px-2 py-1" onClick={action} type="button">{label}</button>;
  return <div className="mt-8"><div className="flex flex-wrap gap-2">{button("Bold", () => editor.chain().focus().toggleBold().run())}{button("Italic", () => editor.chain().focus().toggleItalic().run())}{button("Underline", () => editor.chain().focus().toggleUnderline().run())}{button("H1", () => editor.chain().focus().toggleHeading({ level: 1 }).run())}{button("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run())}{button("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run())}{button("Bullets", () => editor.chain().focus().toggleBulletList().run())}{button("Numbered", () => editor.chain().focus().toggleOrderedList().run())}</div><EditorContent className="theme-surface mt-4 min-h-80 rounded-lg border p-4" editor={editor} /><div className="mt-2 flex gap-3"><p className="theme-muted text-sm">{status}</p>{status === "Save failed" && button("Retry save", () => { const current = ++version.current; setStatus("Saving..."); void save(lastContent.current, current); })}</div></div>;
}
