# Submission Status

## Repository

https://github.com/Naveedahmedtech/ajaia-ai-native-assessment

## Live application

Not deployed yet. Vercel requires `vercel login` and production `DATABASE_URL` configuration.

## Demo users

Alex (`alex@example.com`), Sam (`sam@example.com`), and Jordan (`jordan@example.com`).

## Included functionality

- Document creation, rename, persistence, and owned/shared sections
- Tiptap rich text with autosave and retry
- TXT import with client/server validation
- Server-side ownership and sharing authorization
- Version history timestamps and Markdown export stretch
- Vitest validation and Supabase integration tests

## Verification

`npm run lint`, `npm test` (11 tests), and `npm run build` pass locally.

## Known limitations

- No production URL until Vercel authentication/configuration is completed.
- Demo identity is simulated, not production authentication.
- Manual end-to-end QA and task-status cleanup remain before final submission.
- Real-time concurrent editing, presence, CRDTs, comments, DOCX import, and PDF export are out of scope.

## Reviewer flow

As Alex, create/rename/edit/import/share a document; switch to Sam to edit it;
switch to Jordan to verify unauthorized access; export Markdown and inspect version history.
