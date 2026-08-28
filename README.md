# Ajaia Docs

A lightweight collaborative document editor built for the Ajaia AI-Native Full
Stack Developer assessment.

## Prerequisites

- Node.js 20.9 or later
- npm 10 or later

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env` and add the Supabase PostgreSQL connection string
before starting Milestone 1 functionality:

```bash
npm run db:migrate -- --name init
npm run db:seed
```

Do not commit `.env` files or credentials.

## Current scope

The current foundation includes Next.js, TypeScript, App Router, Tailwind CSS,
and a basic application shell. Database access, identity, documents, editing,
and sharing are intentionally scheduled for later milestones.
