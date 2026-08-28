# Task Register

This file is the local Jira/ClickUp-style task register for the project. Follow
[`DELIVERY_WORKFLOW.md`](./DELIVERY_WORKFLOW.md) for status, branch, commit, QA,
and completion rules.

## Task Index

| ID | Title | Milestone | Status | Branch | External issue |
|---|---|---:|---|---|---|
| AJA-001 | Lock task, Git, and QA delivery workflow | Pre-implementation | Ready for QA | Not available | Not created |
| AJA-002 | Initialize repository baseline | Milestone 0 | Ready | task/AJA-002-repository-foundation | Not created |

## AJA-001 — Lock task, Git, and QA delivery workflow

- Milestone: Pre-implementation requirements
- Status: Ready for QA
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
- Status: Ready
- Owner: AI
- External issue: Not created; no Jira or ClickUp integration was used
- Base branch: main (to be initialized)
- Task branch: task/AJA-002-repository-foundation
- Pull request: Not created
- Commits: Not committed; repository initialization pending
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

### Out of Scope

- Creating the Next.js application foundation.
- Installing dependencies or implementing application functionality.
- Opening a pull request or merging task work.

### Dependencies

- The GitHub repository at `https://github.com/Naveedahmedtech/ajaia-ai-native-assessment.git` must accept pushes from the configured local Git identity.

### Acceptance Criteria

- [ ] Git is initialized with `main` as its base branch.
- [ ] The supplied `origin` remote is configured.
- [ ] A baseline commit contains the existing repository materials and task record.
- [ ] The baseline is pushed to `origin/main`.

### Implementation Notes

- The delivery workflow requires `main` for the initial baseline; the supplied
  `master` push command is therefore normalized to `main`.

### Validation Evidence

| Command/check | Result | Date |
|---|---|---|
| Not run | Pending | 2026-08-28 |

### Manual QA

1. Open the GitHub repository and select the `main` branch.
   - Expected: The baseline commit and repository documentation are visible.
2. Inspect the repository remotes locally with `git remote -v`.
   - Expected: `origin` points to the supplied GitHub repository for fetch and push.

### QA Result

- Status: Pending
- Tested by: Pending
- Date: Pending
- Actual result: Pending
- Evidence/notes: Pending

### Known Limitations

- This task only establishes the Git baseline. The Next.js foundation remains
  pending on the dedicated task branch.

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
