# Walkthrough Video Plan

Target duration: **3–5 minutes**

Do not overproduce the video. The goal is to make evaluation fast and clear.

## 0:00–0:30 — Problem and Scope

Explain briefly:

- lightweight collaborative document editor
- intentionally scoped for the assignment timebox
- core focus: editing, persistence, file import, sharing, access control

Example talking points:

> I focused on completing a coherent document workflow rather than recreating Google Docs. The core product supports rich-text editing, persistence, TXT import, ownership, sharing, and server-side access control.

## 0:30–1:30 — Document Creation and Editing

Demonstrate:

1. Create a document.
2. Rename it.
3. Add text.
4. Bold text.
5. Italicize or underline text.
6. Create a heading.
7. Add a list.
8. Show save status.

## 1:30–1:50 — Persistence

Refresh the browser.

Show that:

- title remains
- content remains
- formatting remains

## 1:50–2:20 — File Import

Upload a `.txt` file.

Show:

- file accepted
- document created
- filename/title behavior
- imported text is editable
- document is persisted

Mention that `.txt` support is an intentional scope choice.

## 2:20–3:20 — Sharing

Start as Alex.

1. Open an owned document.
2. Share it with Sam.
3. Switch to Sam.
4. Open `Shared With Me`.
5. Open the shared document.
6. Edit it.
7. Refresh and show persistence.

Use Jordan to demonstrate unauthorized access rejection.

## 3:20–4:00 — Architecture

Explain:

- Next.js full-stack
- Tiptap
- Prisma
- PostgreSQL/Supabase
- Vercel
- server-side authorization

Important sentence:

> Even though authentication is intentionally simulated with seeded users, access control is still enforced on the server rather than only through the UI.

## 4:00–4:30 — Scope Cuts

Mention intentional deprioritization:

- production authentication
- real-time CRDT collaboration
- DOCX import
- comments/version history if not built

Tie cuts back to the 4–6 hour constraint.

## 4:30–5:00 — AI Workflow

Explain:

- Codex/ChatGPT accelerated implementation
- work was divided into milestones
- each implementation unit had a tracked task, dedicated branch, and traceable
  commits
- each task was handed to the user in `Ready for QA`
- AI stopped after every milestone
- you manually reviewed and tested before continuing
- mention one real AI output you changed or rejected

Do not claim AI mistakes that did not actually happen.

## Recording Checklist

Before recording:

- [ ] production deployment works
- [ ] demo users are seeded
- [ ] test document exists if useful
- [ ] TXT sample file is ready
- [ ] sharing flow has been tested
- [ ] browser has no irrelevant tabs
- [ ] no secrets are visible
- [ ] recording resolution is readable
- [ ] walkthrough stays under 5 minutes

## Final File

After recording, place the URL in:

`walkthrough-video.txt`

Format:

```text
Walkthrough Video
https://...
```
