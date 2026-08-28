const foundationItems = [
  "Shared document workspace",
  "Server-enforced access control",
  "Rich-text editing and persistence",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-950 sm:px-10 sm:py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <header className="flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">Ajaia Docs</span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
            Foundation
          </span>
        </header>

        <section className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-indigo-600">
            Collaborative document editor
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            A focused workspace for documents that move work forward.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            The application foundation is ready. Document lifecycle, identity,
            editing, and sharing will be introduced in their planned milestones.
          </p>
        </section>

        <section aria-label="Planned capabilities" className="grid gap-4 sm:grid-cols-3">
          {foundationItems.map((item, index) => (
            <article key={item} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-indigo-600">0{index + 1}</p>
              <h2 className="mt-8 text-lg font-semibold">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Planned for a subsequent scoped milestone.</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
