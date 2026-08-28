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
    const result = await saveDocumentContent(documentId, JSON.stringify(content));
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
  const button = (label: string, glyph: string, active: boolean, action: () => void) => <button aria-label={label} aria-pressed={active} className={`editor-button ${active ? "editor-button-active" : ""}`} onClick={action} title={label} type="button">{glyph}</button>;
  return <section className="editor-shell mt-8" aria-label="Document editor"><div className="editor-toolbar" role="toolbar" aria-label="Text formatting"><div className="editor-toolset">{button("Bold", "B", editor.isActive("bold"), () => editor.chain().focus().toggleBold().run())}{button("Italic", "I", editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run())}{button("Underline", "U", editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run())}</div><div className="editor-divider" /><div className="editor-toolset">{button("Heading 1", "H1", editor.isActive("heading", { level: 1 }), () => editor.chain().focus().toggleHeading({ level: 1 }).run())}{button("Heading 2", "H2", editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run())}{button("Heading 3", "H3", editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run())}</div><div className="editor-divider" /><div className="editor-toolset">{button("Bullet list", "•", editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run())}{button("Numbered list", "1.", editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run())}</div></div><EditorContent className="editor-canvas" editor={editor} /><div className="editor-footer"><p className="theme-muted text-sm" aria-live="polite"><span className="save-dot" />{status}</p>{status === "Save failed" && button("Retry save", "Retry", false, () => { const current = ++version.current; setStatus("Saving..."); void save(lastContent.current, current); })}</div></section>;
}
