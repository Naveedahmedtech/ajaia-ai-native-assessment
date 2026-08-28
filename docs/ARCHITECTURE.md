# Architecture Note

The project uses one Next.js App Router application with TypeScript and Tailwind
CSS. Server Actions and Route Handlers perform validation, resolve the current
demo user from an HTTP-only cookie, enforce access, and write through Prisma to
Supabase PostgreSQL.

Prisma uses CUID string IDs. `User` owns `Document` rows; `DocumentShare` grants
access with a unique `(documentId, userId)` constraint; `DocumentVersion` stores
content snapshots on successful saves. Document shares and versions cascade when
a document is deleted.

Tiptap JSON is the canonical document content. TXT import converts UTF-8 text to
paragraph nodes, and Markdown export converts authorized structured content to a
downloadable `.md` file. No secrets are committed; `DATABASE_URL` is environment-only.

The system is intentionally asynchronous. It does not implement WebSockets,
CRDT synchronization, presence, or simultaneous conflict resolution.
