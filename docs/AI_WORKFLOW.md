# AI Workflow Note

Codex was used for scaffolding, implementation, test generation, debugging, and
documentation. Work was constrained to sequential task branches recorded in
`docs/TASKS.md`, with lint, builds, tests, database checks, and manual QA steps
used to verify changes.

Material iterations included replacing direct editor-object Server Action
arguments with serialized JSON after a Next.js temporary-client-reference error,
fixing duplicate Tiptap underline registration, adding explicit SSR-safe editor
initialization, and replacing default heading/list reset styles with semantic UI
styles after visual review.

Human-controlled decisions included the locked stack, seeded demo identity,
server-side authorization, TXT-only import, asynchronous collaboration, and the
narrowly approved version-history and Markdown-export stretches.
