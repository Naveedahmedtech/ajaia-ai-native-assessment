# Task Register

This file is the local Jira/ClickUp-style task register for the project. Follow
[`DELIVERY_WORKFLOW.md`](./DELIVERY_WORKFLOW.md) for status, branch, commit, QA,
and completion rules.

## Task Index

| ID | Title | Milestone | Status | Branch | External issue |
|---|---|---:|---|---|---|
| AJA-001 | Lock task, Git, and QA delivery workflow | Pre-implementation | Ready for QA | Not available | Not created |
| AJA-002 | Initialize repository baseline | Milestone 0 | Done | task/AJA-002-repository-foundation | Not created |
| AJA-003 | Build Next.js application foundation | Milestone 0 | Done | task/AJA-003-nextjs-foundation | Not created |
| AJA-004 | Add database and demo identity | Milestone 1 | Ready | task/AJA-004-database-demo-identity | Not created |

## AJA-001 — Lock task, Git, and QA delivery workflow

- Milestone: Pre-implementation requirements
- Status: Done
- Owner: AI
- External issue: Not created; no Jira or ClickUp integration was used
- Base branch: Not available; workspace is not currently a Git repository
- Task branch: Not created; workspace is not currently a Git repository
- Pull request: Not created
- Commits: Not committed; workspace is not currently a Git repository
- Created: 2026-08-28
- Updated: 2026-08-28

### Outcome

Every future implementation task has a Jira/ClickUp-style record, a dedicated
Git branch, traceable commits, validation evidence, and a manual QA handoff that
requires user approval before the task is done or merged.

### Scope

- Define the task lifecycle and statuses.
- Define branch, commit, pull-request, and merge rules.
- Define Ready-for-QA and QA-failure handoffs.
- Add a reusable local task template and register.
- Make the workflow mandatory in the requirements and execution instructions.

### Out of Scope

- Initializing the Git repository; that belongs to Milestone 0.
- Creating an external Jira or ClickUp issue without an available integration.
- Implementing application code.

### Dependencies

- None.

### Acceptance Criteria

- [x] A task lifecycle defines Backlog through Done and a QA-failure loop.
- [x] Tasks require acceptance criteria and QA steps before implementation.
- [x] Each implementation task requires a dedicated branch.
- [x] Commit messages require the task ID.
- [x] Ready-for-QA requires validation evidence and Git/PR status.
- [x] Done requires explicit user QA approval.
- [x] The process does not falsely claim external tracker or Git activity.

### Implementation Notes

- Added `DELIVERY_WORKFLOW.md` as the workflow authority.
- Added `TASKS.md` as the local tracker until an external tracker is connected.
- Updated the requirements lock, agent instructions, execution contract, and
  submission templates to reference the workflow.
- Registered this documentation change retroactively because the workflow did
  not exist when work began.

### Validation Evidence

| Command/check | Result | Date |
|---|---|---|
| Local Markdown links | Passed; no missing local targets | 2026-08-28 |
| Markdown code fences | Passed; all fences balanced | 2026-08-28 |
| Stale workflow wording scan | Passed; no conflicting completion language | 2026-08-28 |

### Manual QA

1. Open `docs/DELIVERY_WORKFLOW.md`.
   - Expected: It defines task statuses, task creation, branch and commit rules,
     QA handoff, approval, and merge behavior.
2. Open `docs/TASKS.md`.
   - Expected: AJA-001 appears in the index and includes scope, acceptance
     criteria, validation evidence, and manual QA.
3. Open `AGENTS.md` and `CODEX_EXECUTION.md`.
   - Expected: Both require a task and task branch before implementation and
     user QA approval before Done or merge.
4. Confirm the Git fields for AJA-001.
   - Expected: They state that no branch, commit, or PR exists because the
     workspace is not currently a Git repository.

### QA Result

- Status: Pending
- Tested by: Pending user QA
- Date: Pending
- Actual result: Pending
- Evidence/notes: Pending

### Known Limitations

- External Jira/ClickUp synchronization is unavailable until an integration is
  connected.
- AJA-001 has no branch or commit because the workspace is not yet a Git
  repository.

## AJA-002 — Initialize repository baseline

- Milestone: MILESTONE 0 — Repository and Foundation
- Status: Done
- Owner: AI
- External issue: Not created; no Jira or ClickUp integration was used
- Base branch: main
- Task branch: task/AJA-002-repository-foundation
- Pull request: Not created
- Commits: `480b444` — `AJA-002: establish repository baseline`; `3faa551` —
  `AJA-002: record baseline QA handoff`; `372e473` — `AJA-002: add repository
  ignore rules`
- Created: 2026-08-28
- Updated: 2026-08-28

### Outcome

The repository has a traceable `main` baseline and a dedicated Milestone 0
task branch before application foundation work begins.

### Scope

- Initialize Git with `main` as the base branch.
- Add the user-provided GitHub remote.
- Create and push a focused, traceable baseline commit.
- Record baseline repository status for the Milestone 0 task.
- Add repository ignore rules for generated files, local dependencies, and
  environment files while retaining `.env.example` for future setup guidance.

### Out of Scope

- Creating the Next.js application foundation.
- Installing dependencies or implementing application functionality.
- Opening a pull request or merging task work.

### Dependencies

- The GitHub repository at `https://github.com/Naveedahmedtech/ajaia-ai-native-assessment.git` must accept pushes from the configured local Git identity.

### Acceptance Criteria

- [x] Git is initialized with `main` as its base branch.
- [x] The supplied `origin` remote is configured.
- [x] A baseline commit contains the existing repository materials and task record.
- [x] The baseline is pushed to `origin/main`.
- [x] A `.gitignore` protects generated files and local environment values from
  accidental commits.

### Implementation Notes

- The delivery workflow requires `main` for the initial baseline; the supplied
  `master` push command is therefore normalized to `main`.
- Baseline commit `480b444` was pushed to `origin/main`. The dedicated task
  branch was then created locally, as required before Milestone 0 application
  foundation work begins.
- The user requested `.gitignore` after the initial QA handoff, so this task
  returned to In Progress before the requested scoped addition.

### Validation Evidence

| Command/check | Result | Date |
|---|---|---|
| `git status --short --branch` after push | Passed; `main` tracks `origin/main` | 2026-08-28 |
| `git remote -v` | Passed; fetch and push URLs match the supplied repository | 2026-08-28 |
| `git log -1 --oneline` | Passed; `480b444 AJA-002: establish repository baseline` | 2026-08-28 |
| `git diff --check` | Passed; no whitespace errors | 2026-08-28 |
| `git check-ignore -v --no-index node_modules .next .env .env.example` | Passed; generated files and `.env` are ignored, while the negated `.env.example` rule remains trackable | 2026-08-28 |

### Manual QA

1. Open the GitHub repository and select the `main` branch.
   - Expected: The baseline commit and repository documentation are visible.
2. Inspect the repository remotes locally with `git remote -v`.
   - Expected: `origin` points to the supplied GitHub repository for fetch and push.
3. Review `.gitignore`.
   - Expected: Next.js output, dependencies, local `.env*` files, Vercel state,
     logs, and OS files are ignored; `.env.example` is explicitly retained.

### QA Result

- Status: Passed
- Tested by: User
- Date: 2026-08-28
- Actual result: User approved the Git baseline and ignore rules.
- Evidence/notes: Approval received in the assessment session.

### Known Limitations

- This task only establishes the Git baseline. The Next.js foundation remains
  pending as AJA-003.

## AJA-003 — Build Next.js application foundation

- Milestone: MILESTONE 0 — Repository and Foundation
- Status: Ready for QA
- Owner: AI
- External issue: Not created; no Jira or ClickUp integration was used
- Base branch: task/AJA-002-repository-foundation (contains the approved local
  bootstrap work; it has not been merged because no merge authorization was requested)
- Task branch: task/AJA-003-nextjs-foundation
- Pull request: Not created
- Commits: `6964e54` — `AJA-003: build Next.js application foundation`;
  `2b5c2d6` — `AJA-003: record foundation validation`; `5eebc49` —
  `AJA-003: add system color themes`; `4d7e491` — `AJA-003: record theme validation`
- Created: 2026-08-28
- Updated: 2026-08-28

### Outcome

A runnable Next.js App Router application with TypeScript and Tailwind CSS,
including a basic product shell and documented local setup.

### Scope

- Scaffold the locked Next.js, TypeScript, App Router, and Tailwind stack.
- Add a minimal responsive application shell for the future document editor.
- Add `.env.example` with configuration placeholders only.
- Add README instructions for install, development, linting, and production build.
- Support light and dark color schemes from the system preference, using
  semantic CSS theme tokens rather than component-level color values.
- Verify the required foundation commands.

### Out of Scope

- Prisma, database connections, authentication, seeded users, and documents.
- Tiptap, rich-text editing, file import, sharing, and deployment.

### Dependencies

- AJA-002 approved Git baseline and ignore rules.
- npm registry access to install scaffold dependencies.

### Acceptance Criteria

- [x] `npm install` succeeds from a clean checkout.
- [x] `npm run dev` starts the application.
- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [x] The application shell renders successfully.
- [x] No document, database, or editor behavior is implemented.
- [x] The application shell supports system light and dark color schemes.
- [x] Component markup uses semantic theme classes rather than direct color utilities.

### Implementation Notes

- Added the Next.js 16.3.3 App Router foundation with TypeScript, Tailwind CSS,
  ESLint, and a static responsive landing shell.
- Added `.env.example` as a non-secret future database configuration placeholder
  and README instructions for setup and validation.
- Next.js automatically appended a compatibility note to `AGENTS.md` when the
  development server first ran; it is retained because the framework will
  otherwise regenerate it.
- No database, identity, document, editor, import, or sharing behavior was
  added.
- The user requested light/dark support after the first QA handoff, returning
  the task to In Progress. The finished implementation uses system-aware CSS
  custom properties for semantic canvas, surface, foreground, muted, border,
  and accent roles; component markup no longer uses direct color utilities.

### Files Changed

- `.env.example`, `README.md`, `package.json`, and `package-lock.json`
- Next.js, TypeScript, ESLint, and PostCSS configuration files
- `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css`
- `AGENTS.md` and this task register

### Validation Evidence

| Command/check | Result | Date |
|---|---|---|
| `npm install` | Passed; 359 packages added, audit reported 0 vulnerabilities | 2026-08-28 |
| `npm run lint` | Passed | 2026-08-28 |
| `npm run build` | Passed; static `/` route compiled and prerendered | 2026-08-28 |
| `npm run dev` + local HTTP request | Passed; `GET /` returned 200 with expected shell content | 2026-08-28 |
| `npm test` | Not run; no test script exists in the foundation task | 2026-08-28 |
| Theme update: `npm run lint` | Passed | 2026-08-28 |
| Theme update: `npm run build` | Passed; static `/` route compiled and prerendered | 2026-08-28 |
| Direct component color utility scan | Passed; no slate, indigo, or white color utilities remain in `src/app` | 2026-08-28 |

### Manual QA

1. Run `npm install`, then `npm run dev`, and open [http://localhost:3000](http://localhost:3000).
   - Expected: A responsive Ajaia Docs foundation shell loads without console or runtime errors.
2. Run `npm run lint` and `npm run build`.
   - Expected: Both commands exit successfully.
3. Inspect the shell.
   - Expected: It adapts to the operating system's light/dark preference and contains no document creation, editor, database, or sharing functionality.
4. Change the operating system or browser emulation preference between light and dark mode, then refresh the page.
   - Expected: The shell uses the corresponding canvas, surface, text, border, and accent colors without a component-level theme toggle.

### QA Result

- Status: Passed
- Tested by: User
- Date: 2026-08-28
- Actual result: User approved the foundation and instructed work to move to the next milestone.
- Evidence/notes: Approval received in the assessment session.

### Known Limitations

- The foundation intentionally contains no persistence, identity, document,
  editor, import, or sharing functionality; those are planned for later milestones.
- `npm install` reported a non-blocking pending optional postinstall approval for
  `unrs-resolver`; lint, build, and runtime validation all passed.

## AJA-004 — Add database and demo identity

- Milestone: MILESTONE 1 — Database and Seeded Users
- Status: Ready
- Owner: AI
- External issue: Not created; no Jira or ClickUp integration was used
- Base branch: task/AJA-003-nextjs-foundation (contains approved local Milestone 0 work; it has not been merged because no merge authorization was requested)
- Task branch: task/AJA-004-database-demo-identity
- Pull request: Not created
- Commits: Not committed
- Created: 2026-08-28
- Updated: 2026-08-28

### Outcome

The application has its locked Prisma/PostgreSQL data model, an idempotent seed
for Alex, Sam, and Jordan, and a server-backed demo-user switcher using an
HTTP-only cookie.

### Scope

- Configure Prisma for PostgreSQL/Supabase and add the User, Document, and
  DocumentShare models with locked relations and constraints.
- Add a migration and idempotent seed script for the three fixed demo users.
- Add server-only current-user resolution with a safe Alex fallback.
- Add a server action and accessible UI to select a seeded demo user.
- Add setup documentation and scripts for generation, migration, and seeding.

### Out of Scope

- Document dashboard, creation, rename, content editing, importing, and sharing UI.
- Production authentication or authorization beyond resolving the demo identity.
- Connecting to, modifying, or exposing any database credentials in source control.

### Dependencies

- A Supabase PostgreSQL `DATABASE_URL` in local `.env` is required to apply the
  migration, run the seed, and verify live connectivity. No local URL is currently configured.

### Acceptance Criteria

- [ ] Prisma schema has CUID string IDs, PostgreSQL datasource, locked relations,
  cascade/restrict behavior, and a unique document-share pair.
- [ ] A migration and idempotent seed define exactly Alex, Sam, and Jordan by stable email.
- [ ] The selected seeded user is written only by server-side code to an HTTP-only cookie.
- [ ] The switcher preserves a valid selection across refresh and defaults invalid or absent cookies to Alex.
- [ ] Generated client, lint, and build validation pass.
- [ ] With a supplied local Supabase connection, migration, seed, and connectivity verification pass.
- [ ] No document/editor behavior is implemented.

### Implementation Notes

- Pending implementation.

### Validation Evidence

| Command/check | Result | Date |
|---|---|---|
| Not run | Pending | 2026-08-28 |

### Manual QA

1. Configure `DATABASE_URL` in an uncommitted `.env`, then run the documented migration and seed commands.
   - Expected: The three demo users exist once; rerunning the seed does not duplicate them.
2. Run the app and switch between Alex, Sam, and Jordan.
   - Expected: The selected user is shown and remains selected after a refresh.
3. Replace the cookie with an invalid value, then refresh.
   - Expected: The app safely falls back to Alex.

### QA Result

- Status: Pending
- Tested by: Pending user QA
- Date: Pending
- Actual result: Pending
- Evidence/notes: Pending

### Known Limitations

- Live database validation is blocked until a Supabase PostgreSQL connection string is provided in local `.env`.

## Task Template

Copy this section for each task and keep all fields current.

```markdown
## AJA-### — Task title

- Milestone: MILESTONE X
- Status: Backlog | Ready | In Progress | Ready for QA | QA Failed | Done
- Owner: AI / user name
- External issue: Not created | Jira/ClickUp URL
- Base branch: main
- Task branch: task/AJA-###-short-description
- Pull request: Not created | URL
- Commits: Not committed | commit hash(es)
- Created: YYYY-MM-DD
- Updated: YYYY-MM-DD

### Outcome

State the reviewer-visible result.

### Scope

- Included behavior

### Out of Scope

- Explicit exclusion

### Dependencies

- None, or list task IDs and external dependencies

### Acceptance Criteria

- [ ] Testable outcome

### Implementation Notes

- Record important decisions, changes, and deviations.

### Validation Evidence

| Command/check | Result | Date |
|---|---|---|
| Not run | Pending | YYYY-MM-DD |

### Manual QA

1. Exact user action.
   - Expected: Exact observable result.

### QA Result

- Status: Pending | Passed | Failed
- Tested by: Pending
- Date: Pending
- Actual result: Pending
- Evidence/notes: Pending

### Known Limitations

- None, or list real limitations.
```

## Task History Rules

- Do not delete completed or failed task records.
- Update status and evidence in place.
- Record material scope changes in the task notes.
- Never mark a task `Done` before explicit user QA approval.
- A task ID is never reused, even if the task is cancelled.
