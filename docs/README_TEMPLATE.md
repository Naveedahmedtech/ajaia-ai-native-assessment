# Collaborative Document Editor

A lightweight collaborative document editor built for the Ajaia AI-Native Full Stack Developer assignment.

> Update this README to match the actual implementation before submission.

Implementation requirements are locked in `docs/REQUIREMENTS_LOCK.md`.
Task, Git, and QA delivery rules are defined in
`docs/DELIVERY_WORKFLOW.md`, with task history in `docs/TASKS.md`.

## Live Demo

**URL:** `<LIVE_URL>`

## Demo Users

The app uses seeded/demo users to make ownership and sharing easy to evaluate.

- Alex — `alex@example.com`
- Sam — `sam@example.com`
- Jordan — `jordan@example.com`

Use the user switcher in the application header.

## Features

Update this list after implementation.

- Create documents
- Rename documents
- Rich-text editing
- Bold / italic / underline
- Headings
- Bullet lists
- Numbered lists
- Save and reopen documents
- Import `.txt` files
- Share documents with another seeded user
- Distinguish owned and shared documents
- Server-side access control

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Tiptap
- Prisma
- PostgreSQL / Supabase
- Vercel

## Local Setup

### 1. Clone

```bash
git clone <REPOSITORY_URL>
cd <PROJECT_DIRECTORY>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Fill in the required values.

## Environment Variables

Document the final variables here.

Example:

```env
DATABASE_URL=
DIRECT_URL=
```

Do not commit secrets.

### 4. Database

Adjust these commands to the final Prisma setup.

```bash
npx prisma migrate dev
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## File Import

Supported import format:

```text
.txt
```

The file is converted into an editable document.

```text
Maximum size: 1 MiB (1,048,576 bytes)
```

Files must contain valid UTF-8 text and may not be empty or whitespace-only.

## Testing

```bash
npm test
```

Explain what the test suite protects.

Example:

- owner access
- shared-user access
- unauthorized-user rejection
- sharing-management permissions
- owner-only rename
- title and TXT validation

## Validation

Useful project checks:

```bash
npm run lint
npm run build
npm test
```

Add a typecheck command if the final project has one.

## Architecture

See:

`docs/ARCHITECTURE.md`

## AI Workflow

See:

`docs/AI_WORKFLOW.md`

## Submission

See:

`docs/SUBMISSION.md`

## Delivery and QA Workflow

See:

- `docs/DELIVERY_WORKFLOW.md`
- `docs/TASKS.md`

## Known Limitations

Add real limitations only.

- `<LIMITATION>`

## Next Steps

With another 2–4 hours I would prioritize:

1. Production authentication
2. Sharing roles
3. Lightweight version history
4. Better import/export support
5. Real-time presence
