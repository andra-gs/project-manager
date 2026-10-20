# Database Schema

Last updated: 2026-10-20

> **Status: no database exists yet.** There are no tables, no migrations, and no database library has been chosen (see decision D1 in [ARCHITECTURE.md](ARCHITECTURE.md)). This file must **not** list a table until a migration that creates it exists in the repository.

## Rules for the schema (Agreed)

From `CLAUDE.md`:

- Every schema change is made through a **migration**. The schema is never edited by hand.
- Use foreign keys, constraints, and indexes where appropriate, and choose deletion behavior deliberately.
- Use transactions when several changes must succeed together.
- User data must survive upgrades and schema changes.
- Database operations stay out of UI components.
- Large binary files (attachments) are not stored in the database unless there is a clear reason.
- The backup file includes a format or schema version.

## What the database must be able to hold (Agreed categories)

These are the kinds of information `CLAUDE.md` says belong in SQLite. They are **categories**, not table designs. How they map to tables is not decided.

- Workspaces
- Projects, with descriptions and status
- Tasks, with status, priority, and deadline
- Labels, checklists, subtasks, and task comments or notes
- Project members (a data model for future collaboration)
- Activity history
- Document metadata (the files themselves live in an application-managed folder)
- Preferences

**Project progress** must be derived from real stored task data, so whether it needs a stored column at all is undecided.

## Conceptual relationships (Agreed)

This is the product hierarchy from `CLAUDE.md`. It is **not** a table design.

```
Workspace ──< Project ──< Task
```

A workspace contains projects, and a project contains tasks and related resources (deadlines, documents, activity).

## Constraints already fixed by requirements

- Kanban status values start as: To Do, In Progress, Review, Done.
- The model must allow the roles Owner, Admin, Member, and Guest in future, without an offline permission system.

## Tables

None yet.

When a table is added, document it in this format:

```
### table_name
Purpose: one sentence.
Created in migration: <version>

| Column | Type | Null? | Default | Notes |
|---|---|---|---|---|

Primary key:
Foreign keys:
Constraints:
Indexes:
Deletion behavior:
```

## Migrations

| Version | Description | Applied in | Status |
|---|---|---|---|
| (none) | No migrations exist yet. | n/a | n/a |

Migration files are suggested to live in `src-tauri/migrations/` (Proposed in `CLAUDE.md`). The exact mechanism depends on decision D1.

## Open questions

Decide these before the first migration is written (Phase 2). None is decided.

1. **ID format:** simple counting numbers or globally unique IDs? See the proposed design considerations in [ARCHITECTURE.md](ARCHITECTURE.md).
2. **Date and time format** used for deadlines and timestamps, so date handling stays consistent.
3. **How the current local user or profile is stored** in a single-user offline application.
4. **Deletion behavior:** what happens to tasks when a project is deleted, and to projects when a workspace is deleted (remove them, block the delete, or archive).
5. **Whether attachments are supported** in the MVP, and if so, how their metadata is stored.
6. **Where the database file is stored** inside the operating system's application data directory.
