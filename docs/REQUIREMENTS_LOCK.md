# Collaborative Document Editor — Locked Requirements

## Status

This document is the authoritative product and engineering contract for the
implementation.

- Status: **Locked for implementation**
- Locked on: **2026-08-28**
- Applies to: Milestones 0–9 in `CODEX_EXECUTION.md`

If another project document conflicts with this file, this file takes
precedence. Changing a locked decision requires explicit user approval and a
corresponding update to this document before implementation.

Task creation, Git branch and commit rules, QA handoff, and completion status
are governed by [`DELIVERY_WORKFLOW.md`](./DELIVERY_WORKFLOW.md). Every
implementation task must also have a current record in
[`TASKS.md`](./TASKS.md).

## Product Definition

Build a lightweight shared document editor. Collaboration is asynchronous:
users can edit documents shared with them, but simultaneous real-time editing,
presence, WebSockets, and CRDT synchronization are not part of the product.

The implementation is time-boxed and should favor a complete, understandable,
and testable core workflow over feature volume.

## Locked Technology Stack

- Next.js with the App Router
- TypeScript
- Tailwind CSS
- Tiptap using `@tiptap/react`, `@tiptap/starter-kit`, and
  `@tiptap/extension-underline`
- Prisma ORM
- PostgreSQL hosted by Supabase
- Vercel

Do not replace the stack or add infrastructure without explicit approval.

## Demo Identity

The application uses exactly three seeded users:

- Alex — `alex@example.com`
- Sam — `sam@example.com`
- Jordan — `jordan@example.com`

The selected demo user is stored in an HTTP-only cookie set through server-side
application code. Every server operation resolves the current user from that
cookie; action payloads must not be trusted to assert the acting user.

This mechanism simulates identity for evaluation convenience. It is not
production authentication and must not be described as protection against a
malicious person who deliberately manipulates the demo identity mechanism.

The user switcher must preserve the selected user across navigation and page
refreshes. Alex is the default when no valid demo-user cookie exists. A cookie
value that does not resolve to one of the three seeded users must not be treated
as an authenticated arbitrary user.

## Roles and Permissions

### Owner

The document owner may:

- view the document
- edit its content
- rename it
- grant access to another seeded user

### Shared user

A user with a `DocumentShare` record may:

- view the document
- edit its content

A shared user may not:

- rename the document
- change its owner
- manage sharing

### Unshared user

An unshared, non-owner user may not discover, view, or mutate the document.

Authorization must be checked on the server for every list, read, rename,
content-save, and sharing operation. It must be rechecked for every autosave.
Frontend visibility is not an authorization control.

Return `404` when a document is missing or inaccessible so private document
existence is not disclosed. Return `403` when the current user may access the
document but the requested action requires ownership.

## Dashboard and Document Lifecycle

The dashboard has two mutually exclusive sections:

- `My Documents` — documents owned by the current user
- `Shared With Me` — documents shared with, but not owned by, the current user

Documents are ordered by `updatedAt` descending in each section.

Users can:

- create a document
- open an accessible document
- rename an owned document
- edit and persist accessible document content
- import a TXT file as a new owned document

New documents use `Untitled Document` as the initial title. Document titles do
not need to be unique. Document deletion is out of scope.

Renaming a document must:

- trim leading and trailing whitespace
- reject a title that is empty after trimming
- reject a title longer than 120 characters
- preserve the previous title when saving fails

Content saves update `updatedAt`. Dates are stored in UTC and displayed in a
consistent, locale-friendly format.

## Rich-Text Editor

The editor stores structured Tiptap JSON in the database. A new or empty
document uses:

```json
{
  "type": "doc",
  "content": []
}
```

Required formatting:

- bold
- italic
- underline
- headings levels 1–3
- bullet lists
- numbered lists

The editor uses a 750 ms debounced autosave and displays one of:

- `Saving...`
- `Saved`
- `Save failed`

The save flow must ensure that an older response cannot mark newer unsaved
content as saved. Failed saves must leave the editor content intact and offer a
clear retry path. Pending changes must be flushed before intentional in-app
navigation or the user must receive a warning that changes are still pending.

Serialized editor JSON may not exceed 2 MiB (2,097,152 bytes). Oversized saves
must be rejected without discarding the editor's local content.

Malformed stored editor content must fail safely with a human-readable error;
it must not be executed or silently interpreted as arbitrary HTML.

## TXT Import

TXT import accepts files with a case-insensitive `.txt` extension and a maximum
size of 1 MiB (1,048,576 bytes).

Validation is required on both the client and server. Browser-reported MIME type
may be used as a hint, but it is not sufficient by itself.

The import flow must:

1. validate the filename extension and size
2. decode the file as UTF-8 text
3. reject invalid UTF-8, content containing a NUL byte, and empty or
   whitespace-only content
4. remove only the final `.txt` suffix to derive the title
5. normalize the derived title using the standard title rules
6. use `Untitled Document` if no valid filename stem remains
7. preserve paragraphs and line breaks in valid Tiptap JSON
8. persist the document with the current user as owner
9. open the persisted document

Duplicate filenames and duplicate document titles are allowed. The original
file is not retained, and object storage is not used.

## Sharing

Only an owner may grant access. The target must be another seeded user.

- Sharing with the owner is invalid.
- Repeating an existing share is an idempotent success and must not create a
  duplicate row.
- The sharing UI excludes the owner and users who already have access.
- Share revocation is out of scope.
- Sharing roles such as viewer/editor are out of scope; every shared user can
  edit document content.

## Data Model and Invariants

Use Prisma CUID string IDs consistently across all models and document the
choice in the final architecture note.

### User

- `id` — primary key
- `name` — required
- `email` — required and unique
- `createdAt` — UTC timestamp

### Document

- `id` — primary key
- `title` — required, maximum 120 characters at the application boundary
- `content` — required Prisma `Json`
- `ownerId` — required foreign key to `User`
- `createdAt` — UTC timestamp
- `updatedAt` — UTC timestamp, updated by metadata and content changes

### DocumentShare

- `id` — primary key
- `documentId` — required foreign key to `Document`
- `userId` — required foreign key to `User`
- `createdAt` — UTC timestamp
- unique constraint on `(documentId, userId)`

Deleting a document must cascade to its shares at the database level even
though document deletion has no core UI. User deletion should be restricted
while the user owns documents or participates in shares. The seed operation
must be idempotent and identify demo users by stable unique email addresses.

## Security and Validation

- Never accept `ownerId` or acting-user claims from the browser.
- Validate all identifiers and mutation payloads on the server.
- Never expose private document data before authorization succeeds.
- Do not use mass assignment for database writes.
- Imported text is document content and must never be executed as HTML.
- State-changing requests must use the framework's server-side protections and
  same-origin behavior.
- Secrets must remain server-only and must not appear in source control, client
  bundles, error messages, screenshots, or logs.
- Database errors must be converted to safe, human-readable UI errors.

## Required Automated Tests

The test suite must cover at least:

1. an owner can read and edit a document
2. a shared user can read and edit a document
3. an unshared user cannot read or edit a document
4. a shared user cannot rename a document
5. a shared user cannot manage shares
6. an owner can grant access
7. self-sharing and duplicate sharing are handled safely
8. empty and overlong titles are rejected
9. invalid and oversized TXT imports are rejected

Tests must exercise the real authorization and validation behavior rather than
mocking it away. The chosen database test strategy and setup must be documented,
and the full suite must run through:

```bash
npm test
```

## UX and Reliability Acceptance Criteria

- Create, rename, import, share, and save actions show pending and failure
  feedback.
- Duplicate submissions are prevented or handled idempotently.
- Empty dashboard sections explain the relevant next action.
- Missing and unauthorized documents have deliberate UI states.
- Toolbar controls have accessible names, visible focus, and active state.
- Save status is exposed to assistive technology.
- The core dashboard and editor remain usable at a 320 px viewport width.
- Failures never display a false success state.
- Switching demo users handles pending editor changes using the same rule as
  other in-app navigation.

## Deployment Requirements

Production uses Vercel and Supabase PostgreSQL.

Before declaring deployment complete:

- document every required environment variable by name and purpose
- document pooled and direct database connection usage if both are required
- run production migrations using a non-interactive deployment command
- seed the three demo users safely and idempotently
- verify the production build and Prisma runtime compatibility
- manually verify create, rename, rich editing, persistence, TXT import,
  sharing, user switching, and unauthorized access
- confirm that no secret is visible in the client bundle, logs, or repository

## Final Documentation Layout

Use this repository layout:

```text
README.md
docs/
  ARCHITECTURE.md
  AI_WORKFLOW.md
  DELIVERY_WORKFLOW.md
  REQUIREMENTS_LOCK.md
  SUBMISSION.md
  TASKS.md
  WALKTHROUGH_PLAN.md
  walkthrough-video.txt
```

The final README links to supporting documents under `docs/`. Final documents
must describe only implemented and verified behavior. Template instructions,
unchecked claims, and placeholders must be removed before submission.

## Task, Git, and QA Governance

Every implementation unit must follow `DELIVERY_WORKFLOW.md`:

- create a Jira/ClickUp-style local task before implementation
- use one `task/AJA-###-description` branch per task
- include the task ID in focused commit subjects
- record validation evidence and exact manual QA steps
- move completed implementation to `Ready for QA`
- wait for explicit user QA approval before `Done` or merge

The local task register is authoritative until an external Jira or ClickUp issue
is actually created and linked. The AI must not claim external tracker, Git,
commit, push, pull-request, or merge activity that was not performed and
verified.

## Explicitly Out of Scope

- production authentication
- document deletion
- share revocation
- viewer/editor sharing roles
- simultaneous real-time editing
- presence
- live real-time collaboration indicators
- WebSockets
- CRDTs
- comments and suggestion mode
- document version history
- DOCX import
- export
- object storage
- email invitations and notifications
- analytics

## Approved Optional Stretch Exception

Approved on 2026-08-28: show a document's accurate, persisted **last saved by**
name and timestamp. This is not presence, does not imply simultaneous editing,
and must not use WebSockets, polling, CRDTs, or simulated collaborators.
- AI writing features
- Redis, queues, Kafka, microservices, or Docker orchestration

## Change Control

Implementation must follow this document. If a locked requirement proves
impractical or conflicts with verified platform behavior:

1. stop before implementing a materially different behavior
2. describe the conflict and the smallest viable alternatives
3. obtain explicit approval
4. update this document
5. continue implementation under the revised lock
