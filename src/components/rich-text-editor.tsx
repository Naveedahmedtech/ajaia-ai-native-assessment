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
  const button = (label: string, action: () => void) => <button aria-label={label} className="editor-button" onClick={action} type="button">{label}</button>;
  return <section className="editor-shell mt-8" aria-label="Document editor"><div className="editor-toolbar" role="toolbar" aria-label="Text formatting"><span className="editor-group-label">Format</span>{button("Bold", () => editor.chain().focus().toggleBold().run())}{button("Italic", () => editor.chain().focus().toggleItalic().run())}{button("Underline", () => editor.chain().focus().toggleUnderline().run())}<span className="editor-group-label">Heading</span>{button("H1", () => editor.chain().focus().toggleHeading({ level: 1 }).run())}{button("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run())}{button("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run())}<span className="editor-group-label">Lists</span>{button("Bullets", () => editor.chain().focus().toggleBulletList().run())}{button("Numbered", () => editor.chain().focus().toggleOrderedList().run())}</div><EditorContent className="editor-canvas" editor={editor} /><div className="editor-footer"><p className="theme-muted text-sm" aria-live="polite">{status}</p>{status === "Save failed" && button("Retry save", () => { const current = ++version.current; setStatus("Saving..."); void save(lastContent.current, current); })}</div></section>;
}
