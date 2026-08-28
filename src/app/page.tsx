const foundationItems = [
  "Shared document workspace",
  "Server-enforced access control",
  "Rich-text editing and persistence",
];

export default function Home() {
  return (
    <main className="app-shell min-h-screen px-6 py-8 sm:px-10 sm:py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <header className="flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">Ajaia Docs</span>
          <span className="theme-surface theme-muted rounded-full border px-3 py-1 text-sm">
            Foundation
          </span>
        </header>

        <section className="max-w-3xl">
          <p className="theme-accent mb-4 text-sm font-medium uppercase tracking-[0.18em]">
            Collaborative document editor
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            A focused workspace for documents that move work forward.
          </h1>
          <p className="theme-muted mt-6 max-w-2xl text-lg leading-8">
            The application foundation is ready. Document lifecycle, identity,
            editing, and sharing will be introduced in their planned milestones.
          </p>
        </section>

        <section aria-label="Planned capabilities" className="grid gap-4 sm:grid-cols-3">
          {foundationItems.map((item, index) => (
            <article key={item} className="theme-surface rounded-2xl border p-6 shadow-sm">
              <p className="theme-accent text-sm font-medium">0{index + 1}</p>
              <h2 className="mt-8 text-lg font-semibold">{item}</h2>
              <p className="theme-muted mt-2 text-sm leading-6">Planned for a subsequent scoped milestone.</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
