# AI Workflow

> This file must be updated using events that actually happened during development. Do not submit fabricated examples.

The implementation contract and change-control process are recorded in
[`REQUIREMENTS_LOCK.md`](./REQUIREMENTS_LOCK.md).

## Tools Used

- Codex
- ChatGPT

Remove or add tools so this list matches actual usage.

## How AI Accelerated the Work

AI was primarily used as an engineering accelerator rather than as an autonomous decision-maker.

Useful areas included:

- scaffolding repetitive implementation
- reviewing Prisma/schema decisions
- accelerating Tiptap integration
- generating first-pass validation code
- suggesting test cases
- reviewing authorization paths
- identifying edge cases
- cleaning up documentation

## How I Controlled the AI Workflow

I deliberately split development into sequential milestones.

Each implementation unit was recorded as a Jira/ClickUp-style task in
`TASKS.md`, developed on a dedicated branch, and handed back for manual QA
before being marked done. Keep this statement only if the recorded task history
verifies it.

The AI was instructed to implement only one milestone at a time and stop after:

- implementation
- validation
- manual testing instructions
- a change report
- branch and commit traceability
- a Ready-for-QA handoff

I reviewed each milestone before allowing it to continue.

This prevented the AI from expanding scope or building large sections of the application before I had verified the engineering direction.

## Decisions I Kept Human-Controlled

Examples:

- choosing a single Next.js application
- choosing PostgreSQL for ownership/sharing relationships
- using seeded users instead of building full authentication
- limiting file import to `.txt`
- not introducing object storage for simple text import
- not implementing real-time collaboration
- prioritizing server-side authorization
- choosing where to spend the remaining assignment time

These choices were made based on the product requirements and the 4–6 hour delivery constraint.

## AI-Generated Output I Changed or Rejected

Replace this section with real examples from development.

Possible format:

### Example 1

**AI suggestion/output:**  
Describe what Codex generated or suggested.

**What I changed/rejected:**  
Describe your change.

**Why:**  
Explain the engineering/product reason.

### Example 2

**AI suggestion/output:**  
...

**What I changed/rejected:**  
...

**Why:**  
...

Do not include an example unless it actually occurred.

## Verification

AI-generated code was not accepted purely because it compiled.

Keep only checks that were actually completed. Verification may include:

- TypeScript checks
- linting
- production build
- automated tests
- manual end-to-end flows
- refresh/persistence testing
- sharing tests
- unauthorized-access tests
- production deployment verification

## Reliability Checks

Before submission, record the important workflows that were actually manually
verified:

1. create document
2. rename document
3. edit rich text
4. refresh and preserve formatting
5. import TXT
6. share document
7. switch users
8. open shared document
9. edit shared document
10. reject unauthorized access

## Reflection

AI materially reduced implementation and iteration time, especially for repetitive code and integration work.

The main value, however, came from combining AI speed with explicit scope control, code review, manual testing, and engineering judgment.
