# Task, Git, and QA Delivery Workflow

## Status

This workflow is part of the locked implementation contract. It applies to
every implementation task and milestone.

The goal is to make each change reviewable in the same way as work tracked in
Jira or ClickUp: one explicit task, one focused branch, traceable commits, a QA
handoff, and user approval before completion.

## Source of Truth

Until an external Jira or ClickUp workspace is connected, `docs/TASKS.md` is
the task register. If an external task is later created, record its URL in the
matching local task and keep the status synchronized.

Creating a local task does not claim that a Jira or ClickUp issue exists. The AI
must not claim to have created or updated an external issue unless the relevant
integration was actually used and verified.

## Required Task Lifecycle

Use these statuses:

```text
Backlog
  ↓
Ready
  ↓
In Progress
  ↓
Ready for QA
  ↓
Done
```

If QA fails:

```text
Ready for QA → QA Failed → In Progress → Ready for QA
```

Status meanings:

- `Backlog` — identified but not approved for implementation
- `Ready` — scope and acceptance criteria are clear and implementation is
  approved
- `In Progress` — implementation has started on its task branch
- `Ready for QA` — implementation and automated validation are complete; the
  user can perform the documented QA steps
- `QA Failed` — QA found a reproducible issue that must be corrected on the
  same task branch
- `Done` — QA passed and the user explicitly approved completion

The AI must never move a task to `Done` solely because code compiles, tests
pass, or implementation is complete. `Done` requires explicit user QA approval.

## Before Implementation

For every implementation unit, the AI must:

1. create or update a task in `docs/TASKS.md`
2. assign a stable task ID using `AJA-###`
3. define the problem, scope, exclusions, acceptance criteria, dependencies,
   and QA steps
4. set the task to `Ready`
5. confirm the current repository and base branch
6. create a dedicated branch from the approved base branch
7. set the task to `In Progress`
8. implement only that task

Do not combine unrelated requirements in one task. Do not implement work that
is missing acceptance criteria.

## Task Size and Milestones

A milestone may contain one or more tasks, but only tasks belonging to the
active milestone may be implemented. Tasks should be small enough to review and
QA independently while still delivering a coherent behavior.

If a milestone is already a small, cohesive unit, one milestone may map to one
task. If it contains independently testable behaviors, split it into multiple
tasks and complete them sequentially unless the user explicitly approves
parallel work.

## Branch Rules

Use one branch per task:

```text
task/AJA-###-short-kebab-case-description
```

Example:

```text
task/AJA-003-document-creation
```

Rules:

- The default base branch is `main` unless the repository defines another
  protected integration branch.
- Create the task branch before implementation changes.
- Keep all task changes on its task branch.
- Do not mix another task into the branch.
- Do not rewrite shared branch history or force-push without explicit approval.
- Do not merge before QA passes and the user approves the task.
- If the workspace is not a Git repository, repository initialization belongs
  to the foundation task and must occur before feature branches are created.

For the first foundation task only, when no Git repository exists, record the
planned branch in the task, initialize `main`, create a traceable repository
baseline commit, and then create the task branch before making application
changes. Record both the baseline and task commits. This bootstrap exception
does not permit feature work directly on `main`.

## Commit Rules

Commits must be focused, buildable where practical, and traceable to the task.

Use this subject format:

```text
AJA-###: imperative summary
```

Examples:

```text
AJA-003: add owned document creation
AJA-003: validate document titles on the server
AJA-003: add document creation tests
```

Commit requirements:

- Include the task ID in every commit subject.
- Use an imperative, specific summary.
- Keep formatting-only or unrelated cleanup out of feature commits.
- Do not commit secrets, generated environment files, build outputs, or
  unrelated user changes.
- Run validation appropriate to the change before the final task commit.
- Do not create empty, misleading, or catch-all commits such as `updates` or
  `fix stuff`.
- Approval to implement a task authorizes its local task branch and local
  commits under this workflow. Pushing, opening a pull request, or merging
  changes remote state and requires user authorization and an available remote.
  Report the resulting commit hashes and remote status accurately.

## Ready-for-QA Handoff

After implementation, the AI must update the task to `Ready for QA` and record:

- implementation summary
- files changed
- engineering decisions and deviations
- validation commands and actual results
- exact manual QA steps
- expected result for each step
- known limitations
- branch name
- commit hashes, or `Not committed` with the reason
- pull request URL, or `Not created`

The AI must then stop and wait for user QA. Passing automated validation does
not replace manual QA.

## QA Outcomes

### QA passes

When the user explicitly confirms QA passed:

1. record the QA result and date
2. set the task to `Done`
3. merge or prepare the branch for merge only as authorized by the user
4. record the merge commit or pull request result when one exists
5. do not start another milestone without explicit approval

### QA fails

When the user reports a failure:

1. set the task to `QA Failed`
2. record the actual result and reproduction steps
3. return the same task to `In Progress`
4. fix only the failed task on the same branch
5. rerun relevant automated validation
6. return the task to `Ready for QA` with updated QA steps

Do not create a separate task for a defect found during QA of unfinished work
unless the defect is materially outside the original acceptance criteria.

## Pull Requests and Merging

When a remote repository and pull-request workflow are available, use:

```text
Title: AJA-###: task title
```

The pull-request description must include:

- linked task or task ID
- summary
- acceptance-criteria checklist
- validation evidence
- manual QA steps
- screenshots for material UI changes when useful
- known limitations

The preferred merge strategy is squash merge unless the repository establishes
another convention. Deleting the merged remote branch is allowed only when
consistent with repository policy and user authorization.

## Definition of Ready

A task is `Ready` only when it has:

- a clear user or reviewer outcome
- bounded scope and explicit exclusions
- testable acceptance criteria
- dependencies identified
- a QA plan
- no unresolved decision that could materially change implementation

## Definition of Done

A task is `Done` only when:

- all acceptance criteria are satisfied
- appropriate lint, type, build, and automated tests pass
- manual QA passes
- documentation is updated
- no secrets or unrelated changes are included
- branch and commit information is recorded
- the user explicitly approves the QA result
- merge status is recorded, if merging was requested

## Change Control

If implementation reveals that the task scope or acceptance criteria must
change, update the task and, when applicable, `REQUIREMENTS_LOCK.md` before
continuing. Material scope changes require explicit user approval.
