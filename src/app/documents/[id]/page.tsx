import Link from "next/link";
import { notFound } from "next/navigation";
import { renameDocument } from "@/app/actions/documents";
import { getCurrentUser } from "@/lib/current-user";
import { getAccessibleDocument } from "@/lib/documents";
import { RichTextEditor } from "@/components/rich-text-editor";
import { shareDocument } from "@/app/actions/sharing";
import { getDemoUsers } from "@/lib/current-user";

export const dynamic = "force-dynamic";

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, user] = await Promise.all([params, getCurrentUser()]);
  const document = await getAccessibleDocument(id, user.id);
  if (!document) notFound();
  const isOwner = document.ownerId === user.id;
  const sharedUserIds = new Set(document.shares.map((share) => share.userId));
  const recipients = isOwner ? (await getDemoUsers()).filter((candidate) => candidate.id !== user.id && !sharedUserIds.has(candidate.id)) : [];
  return <main className="app-shell min-h-screen px-6 py-8 sm:px-10"><div className="mx-auto max-w-4xl"><Link className="theme-accent text-sm font-medium" href="/">← All documents</Link><div className="mt-8 rounded-2xl border border-[var(--border)] p-5 sm:p-8">{isOwner ? <><form action={renameDocument} className="flex flex-col gap-3 sm:flex-row"><input name="documentId" type="hidden" value={document.id} /><input className="theme-surface flex-1 rounded-xl border px-4 py-3 text-2xl font-semibold" defaultValue={document.title} name="title" /><button className="editor-button" type="submit">Rename</button></form>{recipients.length > 0 && <form action={shareDocument} className="mt-4 flex gap-2"><input name="documentId" type="hidden" value={document.id} /><select className="theme-surface rounded-lg border px-3" name="userId">{recipients.map((recipient) => <option key={recipient.id} value={recipient.id}>{recipient.name}</option>)}</select><button className="editor-button" type="submit">Share</button></form>}</> : <><h1 className="text-3xl font-semibold">{document.title}</h1><p className="theme-muted mt-2">Shared by {document.owner.name}</p></>}<p className="theme-muted mt-4 text-sm">{document.lastSavedBy ? `Last saved by ${document.lastSavedBy.name}` : "Not yet saved"}</p><RichTextEditor documentId={document.id} initialContent={document.content as object} /></div></div></main>;
}
