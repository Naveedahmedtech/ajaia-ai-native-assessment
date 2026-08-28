# Ajaia AI-Native Collaborative Document Editor

A lightweight collaborative document editor built for the Ajaia AI-Native Full Stack Developer assessment.

## Current status

The core workflow is implemented and deployed on Vercel. The deployment URL is https://ajaia-ai-native-assessment.vercel.app/; it requires the production Supabase pooler `DATABASE_URL` to be configured in Vercel.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS
- Tiptap rich-text editor
- Prisma with PostgreSQL/Supabase
- Vitest for automated tests

## Run locally

```bash
npm install
cp .env.example .env
# Set DATABASE_URL in .env
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

Open http://localhost:3000. The seeded demo users are:

- Alex — `alex@example.com`
- Sam — `sam@example.com`
- Jordan — `jordan@example.com`

The demo identity switcher is intentionally used for this assessment and is not production authentication.

## Included functionality

- Create, rename, edit, and persist documents
- Owned and shared document sections
- Rich-text formatting with autosave and retry feedback
- TXT import with client- and server-side validation
- Server-side document and sharing authorization
- Document sharing for the seeded users
- Version-history timestamps and Markdown export (approved stretch work)
- Light/dark theme foundation and responsive editor UX

## Validation

```bash
npm run lint
npm test
npm run build
```

## Documentation

- [Assignment](docs/ASSIGNMENT.md)
- [Requirements lock](docs/REQUIREMENTS_LOCK.md)
- [Task tracker](docs/TASKS.md)
- [Submission status](docs/SUBMISSION.md)
- [Architecture](docs/ARCHITECTURE.md)
- [AI workflow](docs/AI_WORKFLOW.md)

## Scope and limitations

The app is intentionally asynchronous. WebSockets, CRDTs, presence indicators, comments, DOCX parsing, and PDF export are not implemented. See [docs/SUBMISSION.md](docs/SUBMISSION.md) for the review flow and remaining deployment/QA work.
