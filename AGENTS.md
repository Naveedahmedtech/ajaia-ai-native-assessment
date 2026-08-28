## Project

This repository contains the Ajaia AI-Native Full Stack Developer
take-home assignment: a lightweight collaborative document editor.

Read these before making significant changes:

1. `docs/ASSIGNMENT.md`
2. `docs/REQUIREMENTS_LOCK.md`
3. `docs/DELIVERY_WORKFLOW.md`
4. `docs/TASKS.md`
5. `CODEX_EXECUTION.md`
6. `docs/ARCHITECTURE.md` when it exists

`docs/REQUIREMENTS_LOCK.md` is the authoritative implementation contract. If
another project document conflicts with it, follow the requirements lock and
report the inconsistency.

`docs/DELIVERY_WORKFLOW.md` governs task creation, branches, commits, QA
handoff, and completion. Every implementation task must be represented in
`docs/TASKS.md` before implementation begins.

## Critical Workflow

Do not build multiple milestones at once.

Work only on the milestone explicitly requested by the user.

Work on one task branch at a time. A task is not complete when implementation
ends; move it to `Ready for QA`, provide the documented QA handoff, and wait for
explicit user approval before marking it `Done` or merging it.

After completing a milestone:

1. Run validation.
2. Explain what changed.
3. List changed files.
4. Give manual verification steps.
5. State known limitations.
6. STOP.

Also record the task branch, commit hashes, pull-request status, validation
evidence, and QA status as required by `docs/DELIVERY_WORKFLOW.md`.

Never start the next milestone without explicit approval.

## Locked Stack

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- Tiptap
- Prisma
- PostgreSQL / Supabase
- Vercel

Do not replace these technologies without approval.

## Scope

Core features:

- document creation
- document rename
- rich-text editing
- persistence
- TXT import
- ownership
- document sharing
- owned/shared distinction
- server-side authorization
- automated testing
- deployment

Do not add speculative features.

Specifically avoid unless requested:

- Redis
- queues
- microservices
- WebSockets
- CRDTs
- comments
- AI writing
- DOCX parsing
- version history

## Engineering Rules

Authorization must be enforced server-side.

A user may access a document only when:

- they own it, or
- the document is explicitly shared with them.

Only the owner may manage sharing.

Shared users may edit document content but may not rename documents.

The three seeded demo users, identity mechanism, validation limits, error
semantics, and other permission details are locked in
`docs/REQUIREMENTS_LOCK.md`.

Never rely solely on frontend checks.

Prefer simple, explicit code over speculative abstractions.

Avoid unnecessary `any`.

Do not commit secrets.

Do not claim functionality works unless you have verified it.

## AI Workflow Record

When an AI-generated implementation is materially changed or rejected,
mention it in the milestone report.

This may later be used in `docs/AI_WORKFLOW.md`.

## Validation

Where applicable run:

npm run lint
npm run build
npm test

Do not silently ignore failures.

## Timebox

This is a 4–6 hour assignment.

Optimize for a complete and polished core workflow rather than maximum
feature count.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
