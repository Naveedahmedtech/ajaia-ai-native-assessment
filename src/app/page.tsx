import { UserSwitcher } from "@/components/user-switcher";
import { getCurrentUser, getDemoUsers } from "@/lib/current-user";
import { createDocument } from "@/app/actions/documents";
import { importTextDocument } from "@/app/actions/import";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [currentUser, users] = await Promise.all([getCurrentUser(), getDemoUsers()]);
  const [owned, shared] = await Promise.all([
    (await import("@/lib/prisma")).prisma.document.findMany({ where: { ownerId: currentUser.id }, orderBy: { updatedAt: "desc" } }),
    (await import("@/lib/prisma")).prisma.document.findMany({ where: { ownerId: { not: currentUser.id }, shares: { some: { userId: currentUser.id } } }, orderBy: { updatedAt: "desc" } }),
  ]);

  return (
    <main className="app-shell min-h-screen px-6 py-8 sm:px-10 sm:py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <header className="flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">Ajaia Docs</span>
          <UserSwitcher currentUserId={currentUser.id} users={users} />
        </header>

        <section className="max-w-3xl">
          <p className="theme-accent mb-4 text-sm font-medium uppercase tracking-[0.18em]">
            Collaborative document editor
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Your documents.</h1>
          <p className="theme-muted mt-6 max-w-2xl text-lg leading-8">
            Viewing as {currentUser.name}.
          </p>
        </section>
        <div className="flex flex-wrap gap-3"><form action={createDocument}><button className="theme-surface rounded-lg border px-4 py-2 font-medium">New document</button></form><form action={importTextDocument} className="flex gap-2"><label className="theme-surface cursor-pointer rounded-lg border px-4 py-2 font-medium">Import .txt<input accept=".txt,text/plain" className="sr-only" name="file" type="file" /></label><button className="editor-button" type="submit">Import</button></form></div>
        <section><h2 className="text-2xl font-semibold">My Documents</h2><div className="mt-4 grid gap-3">{owned.length ? owned.map((d) => <Link className="theme-surface rounded-lg border p-4" href={`/documents/${d.id}`} key={d.id}>{d.title}</Link>) : <p className="theme-muted">Create your first document.</p>}</div></section>
        <section><h2 className="text-2xl font-semibold">Shared With Me</h2><div className="mt-4 grid gap-3">{shared.length ? shared.map((d) => <Link className="theme-surface rounded-lg border p-4" href={`/documents/${d.id}`} key={d.id}>{d.title}</Link>) : <p className="theme-muted">No documents have been shared with you.</p>}</div></section>
      </div>
    </main>
  );
}
