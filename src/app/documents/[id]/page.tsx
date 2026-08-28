import Link from "next/link";
import { notFound } from "next/navigation";
import { renameDocument } from "@/app/actions/documents";
import { getCurrentUser } from "@/lib/current-user";
import { getAccessibleDocument } from "@/lib/documents";

export const dynamic = "force-dynamic";

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, user] = await Promise.all([params, getCurrentUser()]);
  const document = await getAccessibleDocument(id, user.id);
  if (!document) notFound();
  const isOwner = document.ownerId === user.id;
  return <main className="app-shell min-h-screen px-6 py-8 sm:px-10"><Link className="theme-accent" href="/">← Documents</Link><div className="mx-auto mt-12 max-w-3xl">{isOwner ? <form action={renameDocument} className="flex gap-2"><input name="documentId" type="hidden" value={document.id} /><input className="theme-surface flex-1 rounded-lg border px-3 py-2 text-3xl font-semibold" defaultValue={document.title} name="title" /><button className="theme-surface rounded-lg border px-4" type="submit">Rename</button></form> : <><h1 className="text-3xl font-semibold">{document.title}</h1><p className="theme-muted mt-2">Shared by {document.owner.name}</p></>}<p className="theme-muted mt-12">Editing arrives in the next milestone.</p></div></main>;
}
