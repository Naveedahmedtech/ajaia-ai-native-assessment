# Ajaia Collaborative Document Editor — Codex Execution Contract

## Purpose

Build a lightweight collaborative document editor inspired by Google Docs for the Ajaia AI-Native Full Stack Developer assignment.

The project is intentionally time-boxed to 4–6 hours. The goal is not feature volume. The goal is a coherent, testable product slice that demonstrates product judgment, full-stack execution, persistence, sharing, file handling, and disciplined use of AI.

The authoritative implementation requirements are locked in
`docs/REQUIREMENTS_LOCK.md`. If this execution guide is less specific than the
requirements lock, follow the requirements lock. If the two documents conflict,
stop and report the conflict before implementation.

Every implementation task must follow `docs/DELIVERY_WORKFLOW.md` and be
recorded in `docs/TASKS.md`. Create the task and its dedicated branch before
implementation. After implementation and validation, move it to `Ready for QA`
and wait for explicit user approval before marking it `Done` or merging it.

---

## Critical Execution Rule

**DO NOT BUILD THE WHOLE APPLICATION AT ONCE.**

Work through the milestones below sequentially.

For every milestone:

1. Inspect the current repository first.
2. Create or update the task record with acceptance criteria and QA steps.
3. Create the dedicated `task/AJA-###-description` branch.
4. State what you are about to implement.
5. State which files/components are likely to change.
6. Implement **only** the active task in the active milestone.
7. Run appropriate validation.
8. Update the task to `Ready for QA`.
9. Tell me exactly how to manually test it.
10. Report what changed, what works, limitations, branch, commits, and PR state.
11. **STOP and wait for QA approval.**

Do not begin the next milestone until I explicitly say:

- `NEXT`
- `CONTINUE`
- `APPROVED`

or give another direct instruction.

---

# AI Harness Rules

You are an engineering copilot, not an autonomous product manager.

You MUST NOT:

- expand scope independently
- implement future milestones early
- replace the locked stack without approval
- add infrastructure "for later"
- perform giant refactors unless needed for the active milestone
- hide unfinished functionality behind fake UI
- claim something works without verification
- introduce unnecessary abstractions

Prefer the smallest maintainable solution that satisfies the current requirement.

If something is ambiguous, make the smallest reasonable assumption and document it.

---

# Locked Technology Stack

## Application

- Next.js
- TypeScript
- App Router

## UI

- Tailwind CSS

Keep dependencies minimal.

## Rich Text Editor

- Tiptap open source
- `@tiptap/react`
- `@tiptap/starter-kit`
- `@tiptap/extension-underline`
- free Tiptap extensions only when necessary

Required formatting:

- Bold
- Italic
- Underline
- Headings
- Bullet list
- Numbered list

## Database

- PostgreSQL through Supabase
- Prisma ORM

## Users / Authentication

Do not spend significant time implementing production authentication.

Use seeded demo users and a simple current-user switcher.

Seed exactly:

- Alex — owner/demo user
- Sam — sharing demo user
- Jordan — unauthorized-access test user

The assignment allows mocked or seeded authentication.

Store the selected demo-user ID in an HTTP-only cookie set through server-side
application code. Resolve the acting user from that cookie on every server
operation; do not accept an acting-user ID in action payloads. This is simulated
identity for evaluation, not production authentication. Default to Alex when no
valid demo-user cookie exists.

## File Import

Required format:

- `.txt`

Uploading a `.txt` file should create a persisted editable document using the file contents.

Do not implement DOCX during core milestones.

## Deployment

- Vercel
- Supabase Postgres

Do not introduce:

- Redis
- queues
- Docker orchestration
- microservices
- Kafka
- WebSockets
- CRDTs

unless explicitly requested later.

---

# Product Scope

The finished core product should allow a user to:

- view owned documents
- create a document
- rename a document
- open a document
- edit rich text
- save and reopen content
- import a `.txt` file as a document
- share an owned document with another seeded user
- distinguish owned documents from shared documents
- edit a shared document
- prevent unauthorized access

---

# Data Model Direction

Use the model and invariants defined in `docs/REQUIREMENTS_LOCK.md`, beginning
with:

```text
User
----
id
name
email
createdAt

Document
--------
id
title
content
ownerId
createdAt
updatedAt

DocumentShare
-------------
id
documentId
userId
createdAt
```

Requirements:

- primary keys
- foreign keys
- sensible cascade behavior
- unique `(documentId, userId)` sharing constraint
- owner is represented on `Document`
- sharing is represented separately
- unique user email
- required JSON document content
- document deletion cascades to shares
- user deletion is restricted while related records exist
- idempotent seeding by stable user email

Do not overengineer permissions during core scope.

---

# Editor Persistence

Prefer storing Tiptap structured JSON.

Conceptually:

```json
{
  "type": "doc",
  "content": []
}
```

Do not implement version history during core milestones.

---

# Authorization Rules

Authorization must be enforced server-side.

A user may read/edit a document if:

```text
user.id === document.ownerId
OR
a DocumentShare exists for documentId + userId
```

Only the owner may manage sharing.

Only the owner may rename a document. Shared users may edit content but not
metadata. Return `404` for missing or inaccessible documents and `403` when an
accessible document action specifically requires ownership.

Never rely only on frontend hiding.

Never trust document IDs, user IDs, or ownership claims supplied by the browser.

---

# Milestones

## MILESTONE 0 — Repository and Foundation

### Goal

Create the minimum project foundation.

### Implement

- Next.js TypeScript project
- Tailwind
- basic app shell
- sensible folder structure
- lint/typecheck/build scripts
- `.env.example`
- minimal README setup instructions

Do not implement documents.

Do not add Tiptap.

Do not build database behavior beyond configuration placeholders if needed.

### Acceptance Criteria

```bash
npm install
npm run dev
npm run lint
npm run build
```

Application shell renders successfully.

### STOP.

---

## MILESTONE 1 — Database and Seeded Users

### Goal

Establish persistence and demo identity.

### Implement

- Prisma
- Supabase/Postgres connection
- `User`
- `Document`
- `DocumentShare`
- migrations
- seed script
- seeded users
- server-backed current-user selector using an HTTP-only cookie

Example UI:

```text
Viewing as: Alex ▼
```

### Acceptance Criteria

- application starts
- seeded users exist
- active demo user can be switched
- selected demo user survives navigation and refresh
- database connection works

Do not build editor functionality yet.

### STOP.

---

## MILESTONE 2 — Dashboard and Document Creation

### Goal

Build the basic document lifecycle.

### Implement

Dashboard sections:

```text
My Documents
Shared With Me
```

Core actions:

- create document
- list owned documents
- open document
- rename document
- persist title
- timestamps
- owned/shared sections ordered by most recently updated

Suggested route:

```text
/documents/[id]
```

### Validation

Document title:

- cannot become empty after normalization
- is trimmed before persistence
- has a maximum length of 120 characters
- does not need to be unique

Server must verify ownership before metadata changes.

### Acceptance Criteria

As Alex:

1. Create `Product Ideas`
2. Rename it
3. Refresh
4. It remains

As Sam:

- Alex's private document must not appear under owned documents.

### STOP.

---

## MILESTONE 3 — Rich Text Editor

### Goal

Make document content actually useful.

### Implement

Tiptap toolbar:

- Bold
- Italic
- Underline
- Heading levels 1–3
- Bullet list
- Numbered list

Persist structured editor content.

Use a 750 ms debounced autosave.

Prevent stale save responses from marking newer content as saved. Preserve
content after a failed save and provide a retry path. Flush pending changes
before intentional in-app navigation or warn the user. Reject serialized editor
JSON larger than 2 MiB without discarding local content.

Provide visible state:

```text
Saving...
Saved
Save failed
```

Avoid saving on every keystroke.

### Acceptance Criteria

1. Create/open document
2. Enter text
3. Apply bold
4. Add heading
5. Add list
6. Refresh
7. Formatting remains

### STOP.

---

## MILESTONE 4 — TXT File Import

### Goal

Satisfy the file-upload workflow.

### Scope

Support only:

```text
.txt
```

### Flow

Dashboard offers:

```text
New Document
Import .txt
```

On upload:

1. validate file extension/type
2. validate size
3. decode valid UTF-8 text
4. derive title from filename
5. convert text to editable Tiptap content
6. persist the new document
7. open it

Accept a case-insensitive `.txt` extension up to 1 MiB. Reject invalid UTF-8,
binary, empty, and whitespace-only content. Validate on both client and server;
do not rely on browser MIME type alone. Preserve paragraphs and line breaks.

Do not add object storage for this core flow.

### Acceptance Criteria

Uploading `notes.txt` creates a persisted editable document containing its text.

### STOP.

---

## MILESTONE 5 — Sharing

### Goal

Implement ownership + shared access.

### Owner Flow

Document page includes a `Share` action.

Owner may grant access to another seeded user.

### Shared User Flow

A shared document appears under:

```text
Shared With Me
```

Shared user can:

- open document
- edit content
- save changes

Only owner may:

- grant access

Shared users may edit content but may not rename or manage sharing. Prevent
self-sharing. Treat an existing share as an idempotent success without creating
a duplicate row. Share revocation is out of scope.

Unauthorized users must be rejected even if they manually enter the URL.

### Acceptance Criteria

```text
Alex
→ creates document
→ shares with Sam
→ switch to Sam
→ Shared With Me
→ open
→ edit
→ refresh
→ changes persist
```

Use Jordan to verify unauthorized access rejection.

### STOP.

---

## MILESTONE 6 — Automated Test

### Goal

Add a small number of high-value tests.

Prioritize authorization behavior.

Test at least:

```text
owner → allowed
shared user → allowed
unshared user → rejected
non-owner → cannot manage shares
shared user → cannot rename
self-share and duplicate share → handled safely
invalid title and TXT input → rejected
```

Use the testing style that best matches the implementation.

Do not mock away the behavior being tested.

Provide one clear command:

```bash
npm test
```

### Acceptance Criteria

Tests pass and the report explains what behavior they protect.

### STOP.

---

## MILESTONE 7 — UX and Reliability Pass

### Goal

Polish existing behavior without expanding scope.

Review:

- loading states
- empty states
- save states
- error states
- validation
- unauthorized behavior
- 404 behavior
- button labels
- responsive layout
- obvious accessibility issues
- accidental duplicate actions

Do not add major new features.

### STOP.

---

## MILESTONE 8 — Deployment

### Goal

Deploy a reviewer-accessible build.

Use:

- Vercel
- Supabase

Verify production:

- create
- rename
- rich editing
- persistence
- import
- sharing
- user switching
- unauthorized access

Never expose secrets.

### Deliver

- production URL
- demo-user instructions

### STOP.

---

## MILESTONE 9 — Submission Documentation

Create/update:

- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/AI_WORKFLOW.md`
- `docs/SUBMISSION.md`
- `docs/walkthrough-video.txt`

Everything must reflect the actual implementation.

Do not invent completed features.

### STOP.

---

# Scope Guard

Before adding anything outside the active milestone, ask:

> Does the current assignment require this now?

If no, do not implement it.

Especially avoid:

- Redis
- microservices
- queues
- Kafka
- Docker orchestration
- WebSockets
- CRDT collaboration
- complex authentication
- AI writing features
- comments
- notifications
- email invitations
- analytics
- elaborate design systems
- DOCX parsing
- PDF export

These can be reasonable products features, but they are not core requirements.

---

# Coding Standards

## TypeScript

Avoid unnecessary `any`.

## Components

Keep them reasonably focused.

Do not create abstractions purely for theoretical reuse.

## Server Logic

Authorization checks should be centralized enough that forgetting them is difficult.

## Errors

Do not silently swallow failures.

Show human-readable UI errors.

## Database

Use database constraints for important invariants.

Avoid obviously wasteful queries.

## Security

Never trust:

- document IDs
- user IDs
- ownership claims
- sharing claims

supplied by the browser.

## Secrets

Never commit:

- `.env`
- database passwords
- Supabase service secrets
- private API keys

---

# Product Quality Standard

Do not optimize for:

> The feature technically exists.

Optimize for:

> A reviewer can understand and successfully use the feature immediately.

Every important flow should have:

```text
Action
↓
Feedback
↓
Persisted result
↓
Predictable error behavior
```

---

# Mandatory Ready-for-QA Report

After implementation and validation, respond using this structure:

```text
AJA-### / MILESTONE X READY FOR QA

Task status
- Ready for QA

Branch
- task/AJA-###-description

Commits
- <hash> <subject>, or Not committed with reason

Pull request
- <URL>, or Not created

Implemented
- ...

Files changed
- ...

Engineering decisions
- ...

Validation performed
- ...

Manual test
1. ...
2. ...

Expected result
...

Known issues / limitations
- ...

I have NOT started Milestone X+1.

Waiting for your QA result.
```

Do not continue coding afterward.

The task remains `Ready for QA` until the user explicitly confirms QA passed.
Only then may it be marked `Done` and merged as authorized.

After explicit QA approval, update the task record and report
`AJA-### / MILESTONE X DONE`. Do not call the task or milestone complete before
that approval.

---

# Initial Instruction

Start with:

`MILESTONE 0 — Repository and Foundation`

Before editing:

1. inspect the repository
2. tell me its current state
3. tell me what you intend to change
4. implement Milestone 0 only
5. validate it
6. provide manual testing instructions
7. STOP

Do not start Milestone 1 without explicit approval.
