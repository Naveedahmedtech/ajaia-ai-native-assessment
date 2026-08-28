# Architecture Note

> Update this file to match the final implementation. Remove anything that is not actually true.

The implementation contract is defined in
[`REQUIREMENTS_LOCK.md`](./REQUIREMENTS_LOCK.md).

Delivery history and QA evidence are maintained in
[`TASKS.md`](./TASKS.md) under the rules in
[`DELIVERY_WORKFLOW.md`](./DELIVERY_WORKFLOW.md).

## Overview

This project is a lightweight collaborative document editor built for a 4–6 hour engineering assignment.

The architecture intentionally favors a complete, understandable product slice over distributed-system complexity.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Tiptap
- Prisma
- PostgreSQL / Supabase
- Vercel

## High-Level Architecture

```text
Browser
   |
   v
Next.js Application
   |
   +-- Dashboard
   +-- Tiptap Editor
   +-- TXT Import
   +-- Sharing UI
   |
   v
Server Actions / Route Handlers
   |
   +-- validation
   +-- authorization
   +-- persistence
   |
   v
Prisma
   |
   v
PostgreSQL
```

## Data Model

### User

Represents seeded/demo users used to demonstrate ownership and sharing.

### Document

Stores:

- title
- structured editor content
- owner
- timestamps

### DocumentShare

Represents access granted from a document owner to another user.

A unique `(documentId, userId)` constraint prevents duplicate sharing records.

## Key Decisions

### One Full-Stack Next.js Application

I chose a single Next.js application instead of separate frontend and backend services.

The assignment is time-boxed to 4–6 hours, so a separate API service would add deployment and integration overhead without materially improving the product demonstration.

### PostgreSQL Instead of MongoDB

Ownership and sharing are relational concepts.

The primary relationships are:

```text
users
documents
document_shares
```

PostgreSQL makes these relationships and their constraints explicit.

### Prisma

Prisma provides:

- typed database access
- clear schema definition
- migrations
- readable relational queries

For this assignment it allows database logic to remain explicit without adding unnecessary infrastructure.

### Tiptap

Tiptap provides the required rich-text capabilities without implementing a browser editor from scratch.

The editor supports the required formatting while keeping the project focused on product behavior rather than low-level editor mechanics.

### Structured Editor Content

Tiptap JSON is persisted rather than treating the document purely as an HTML string.

This preserves document structure in a format that can evolve more cleanly over time.

### Seeded Users Instead of Production Authentication

Full production authentication was intentionally deprioritized.

The assignment permits seeded/mock users, and the core requirement is to demonstrate:

- ownership
- sharing
- access boundaries

A simple user switcher makes those behaviors easy for reviewers to test.

Server-side access checks are still required even though identity is simulated.
The selected demo-user ID is stored in an HTTP-only cookie set through
server-side application code. This is a testing convenience, not production
authentication.

### TXT-Only Import

The import workflow intentionally supports `.txt` only.

This allows the product to demonstrate a complete file-to-document workflow reliably instead of partially supporting many formats.

DOCX parsing would add significant complexity unrelated to the core evaluation.

### No Object Storage for TXT Import

The imported TXT file is read and converted into document content.

The original binary file does not need to be preserved for the assignment, so object storage would add infrastructure without improving the demonstrated workflow.

### Server-Side Authorization

Access control is not enforced only in the UI.

A user may access a document when they are:

- the owner, or
- explicitly present in `DocumentShare`

Only the owner may manage sharing.

Shared users may edit content but may not rename documents. Share revocation is
outside the locked core scope.

### Debounced Autosave

Editor changes are persisted through a debounced save flow rather than sending a request for every keystroke.

This reduces unnecessary writes while preserving a responsive editing experience.

## Intentional Scope Cuts

The following were intentionally not included in the core implementation:

- production authentication
- real-time multi-user editing
- CRDT synchronization
- WebSockets
- comments
- suggestion mode
- document version history
- DOCX import
- email invitations
- document deletion
- share revocation

The goal was to deliver the strongest complete core workflow inside the assignment timebox.

## What I Would Build Next

With another 2–4 hours, the next priorities would be:

1. production authentication
2. viewer/editor sharing permissions
3. lightweight version history
4. improved import/export support
5. real-time presence before attempting full CRDT collaboration
