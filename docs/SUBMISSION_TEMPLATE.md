# Submission

> Fill every placeholder before submission. Only list functionality that actually works.

The implementation contract is recorded in
[`REQUIREMENTS_LOCK.md`](./REQUIREMENTS_LOCK.md).

## Live Application

**URL:**  
`<LIVE_URL>`

## Source Code

**Repository:**  
`<REPOSITORY_URL>`

## Demo Users

The application intentionally uses simulated/seeded users so reviewers can quickly test ownership and sharing behavior.

### User 1

- Name: Alex
- Email: `alex@example.com`

### User 2

- Name: Sam
- Email: `sam@example.com`

### User 3

- Name: Jordan
- Email: `jordan@example.com`

Use the in-app user switcher to change the active demo user.

## Main Review Flow

Recommended reviewer flow:

1. Open the application as Alex.
2. Create a document.
3. Rename it.
4. Add rich-text formatting.
5. Refresh and confirm persistence.
6. Import a `.txt` file.
7. Share a document with Sam.
8. Switch to Sam.
9. Open the document under `Shared With Me`.
10. Edit it and refresh.
11. Verify the same document is inaccessible to Jordan until shared.

## Included Files

- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/AI_WORKFLOW.md`
- `docs/DELIVERY_WORKFLOW.md`
- `docs/REQUIREMENTS_LOCK.md`
- `docs/SUBMISSION.md`
- `docs/TASKS.md`
- `docs/walkthrough-video.txt`
- source code
- screenshots/demo assets if included

## Implemented

Update this list before submission.

- [ ] Document creation
- [ ] Document rename
- [ ] Rich-text editing
- [ ] Bold
- [ ] Italic
- [ ] Underline
- [ ] Headings
- [ ] Bullet lists
- [ ] Numbered lists
- [ ] Autosave/manual persistence
- [ ] Reopen after refresh
- [ ] TXT import
- [ ] Document ownership
- [ ] Document sharing
- [ ] Owned vs shared distinction
- [ ] Server-side authorization
- [ ] Automated test
- [ ] Production deployment
- [ ] Task records include QA results, branches, and commits

## Intentional Scope Cuts

Examples — keep only those that match the final project:

- production authentication
- real-time concurrent editing
- comments
- suggestion mode
- version history
- DOCX import
- email invitations
- advanced sharing roles
- document deletion
- share revocation

## Known Limitations

List only real limitations.

- `<LIMITATION>`
- `<LIMITATION>`

## If I Had Another 2–4 Hours

Suggested next priorities:

1. Production authentication
2. Viewer/editor sharing roles
3. Lightweight document version history
4. Improved import/export support
5. Real-time presence

Adjust this list based on the final state of the project.

## Walkthrough Video

See:

`walkthrough-video.txt`
