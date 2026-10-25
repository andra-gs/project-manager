# Database Schema

Last updated: 2026-10-25

> **Status (2026-10-25): migration 1 is written and awaiting verification.** The tables below exist in `src-tauri/migrations/0001_initial.sql`, but nothing is **Implemented** until the developer has run the app and confirmed them (see [DEVELOPMENT_STATUS.md](DEVELOPMENT_STATUS.md)). Only tables from a migration in the repository are listed here.

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

Conventions (Agreed 2026-10-25): IDs are UUID text created by the app; deadlines are text `YYYY-MM-DD`; timestamps are UTC ISO 8601 text supplied by the app. Project progress is not stored: it is calculated from tasks.

All five tables were created in migration 1.

| Table | Purpose | Key columns |
|---|---|---|
| `profiles` | The local user (one row now; accounts come in a later phase) | `id`, `display_name`, `created_at` |
| `workspaces` | A group of projects | `id`, `name`, `description`, `owner_profile_id` (to `profiles`, RESTRICT), `created_at`, `updated_at` |
| `workspace_members` | Who belongs to a workspace and with which role (`owner`, `admin`, `member`, `guest`); stored for future collaboration, with no permission system | `workspace_id` (CASCADE), `profile_id` (CASCADE), `role`; primary key is the pair |
| `projects` | A project in a workspace | `id`, `workspace_id` (CASCADE), `name`, `description`, `status` (`active`, `archived`), `created_at`, `updated_at` |
| `tasks` | A task in a project | `id`, `project_id` (CASCADE), `title`, `description`, `status` (`todo`, `in_progress`, `review`, `done`), `priority` (`low`, `medium`, `high`), `due_date` (optional), `assignee_profile_id` (optional, SET NULL), `created_at`, `updated_at`, `completed_at` |

Constraints: names and titles must not be empty (checked after trimming spaces); status, priority, and role values are limited by `CHECK`; `due_date` must look like `YYYY-MM-DD`. Indexes: `projects(workspace_id)`, `tasks(project_id)`, `tasks(assignee_profile_id)`, `tasks(due_date)`, `workspace_members(profile_id)`.

Deletion behavior (Agreed 2026-10-25): deleting a workspace deletes its projects and their tasks; deleting a project deletes its tasks; deleting a profile that owns a workspace is blocked; deleting a profile that is only an assignee clears the assignee of its tasks. The screens must ask for confirmation first. This depends on SQLite foreign keys being on for every connection, which the Settings screen reports (to be verified).

Deferred to Phase 3 (no tables yet): labels, checklists and subtasks, comments, documents, activity history, preferences.

## Migrations

| Version | Description | Applied in | Status |
|---|---|---|---|
| 1 | `create_initial_tables` (`src-tauri/migrations/0001_initial.sql`) | on app start, when the database is opened | written, awaiting verification |

Migration files live in `src-tauri/migrations/` and are registered in `src-tauri/src/lib.rs` for the connection `sqlite:avenqor.db`. Each change is a new file with the next version number; existing migrations are never edited. The database file is `%APPDATA%\io.github.andra-gs.avenqor\avenqor.db` (Roaming; see the known issue in DEVELOPMENT_STATUS.md).

## Open questions

Decided on 2026-10-25: ID format (UUID text), date format, local profile (a row in `profiles`), deletion behavior (above), database file location (app config folder, see above).

Still open: whether attachments are supported in the MVP, and how their metadata is stored (Phase 3).
