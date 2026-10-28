# Database Schema

Last updated: 2026-10-28

> **Status (2026-10-27): migrations 1 and 2 are applied** (schema version 2, 5 tables, foreign keys on, reported by the developer; also on a fresh database in the release program). Screens read and write these tables (workspaces, projects, tasks, local profile). The delete behavior was verified with data (see below). Only tables from a migration in the repository are listed here. **Migration 4 (labels) is applied** (schema version 4, 9 tables, reported 2026-10-29). **Migration 3 (checklist items and notes) is applied** (the developer reported `schema version 3`, 7 tables on 2026-10-28).

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

All five tables above were created in migration 1. Two more tables were created in migration 3 (applied, reported by the developer 2026-10-28): `task_checklist_items` (`id`, `task_id` to `tasks` with CASCADE, `text` not empty, `is_done` 0 or 1, `created_at`, `updated_at`; index on `task_id`; listed by `created_at`, then the row's own number) and `task_notes` (`id`, `task_id` to `tasks` with CASCADE, `author_profile_id` to `profiles` with SET NULL, `body` not empty, `created_at`, `updated_at`; index on `task_id`). Claude ran migrations 1 to 3 in an in-memory SQLite database (Python, 2026-10-28): the empty-text CHECKs and the foreign key reject bad rows, deleting a task removes its items and notes, deleting a note's author profile clears `author_profile_id` and keeps the note, and notes list newest first.

| Table | Purpose | Key columns |
|---|---|---|
| `profiles` | The local user (one row now; accounts come in a later phase) | `id`, `display_name`, `created_at` |
| `workspaces` | A group of projects | `id`, `name`, `description`, `owner_profile_id` (to `profiles`, RESTRICT), `created_at`, `updated_at` |
| `workspace_members` | Who belongs to a workspace and with which role (`owner`, `admin`, `member`, `guest`); stored for future collaboration, with no permission system | `workspace_id` (CASCADE), `profile_id` (CASCADE), `role`; primary key is the pair |
| `projects` | A project in a workspace | `id`, `workspace_id` (CASCADE), `name`, `description`, `status` (`active`, `archived`), `created_at`, `updated_at` |
| `tasks` | A task in a project | `id`, `project_id` (CASCADE), `title`, `description`, `status` (`todo`, `in_progress`, `review`, `done`), `priority` (`low`, `medium`, `high`), `due_date` (optional), `assignee_profile_id` (optional, SET NULL), `created_at`, `updated_at`, `completed_at` |

Constraints: names and titles must not be empty (checked after trimming spaces); status, priority, and role values are limited by `CHECK`; `due_date` must look like `YYYY-MM-DD`. Indexes: `projects(workspace_id)`, `tasks(project_id)`, `tasks(assignee_profile_id)`, `tasks(due_date)`, `workspace_members(profile_id)`.

Deletion behavior (Agreed 2026-10-25): deleting a workspace deletes its projects and their tasks; deleting a project deletes its tasks; deleting a profile that owns a workspace is blocked; deleting a profile that is only an assignee clears the assignee of its tasks. The screens must ask for confirmation first. Verified 2026-10-25 for workspace to projects (the Settings page showed 2 projects, then 0 after the workspace was deleted); project to tasks verified 2026-10-26 the same way (the counts went to 0 after deleting a project). This depends on SQLite foreign keys being on for every connection, which the Settings screen reports (foreign keys reported on 2026-10-25; the cascade was verified with row counts on 2026-10-25 and 2026-10-26).

Trigger (migration 2, verified 2026-10-25 by a new workspace showing 1 member): `trg_workspaces_add_owner_member` runs after a row is inserted into `workspaces` and adds the owner to `workspace_members` with the role `owner`. It replaces a manual transaction: the workspace and its owner membership are saved by one statement, so both rows exist or neither does.

Migration 4 (written 2026-10-28, applied: the developer reported `schema version 4`, 9 tables on 2026-10-29) adds `labels` (`id`, `project_id` to `projects` with CASCADE, `name` not empty after trimming, `color` limited by `CHECK` to `neutral`, `accent`, `success`, `danger`, `info`, `warning`, `created_at`, `updated_at`; the name is unique per project ignoring upper and lower case) and `task_labels` (`task_id` to `tasks` with CASCADE, `label_id` to `labels` with CASCADE; primary key is the pair; index on `label_id`). A label belongs to one project; the rule that a task only carries labels of its own project is kept in `labelService` and in the SQL that links them (a label of another project is not linked). Claude ran migrations 1 to 4 and the repository's SQL in an in-memory SQLite database (Python, 2026-10-28): "Bug" and "bug" are rejected in one project but allowed in two projects, a color outside the list is rejected, linking twice or to a task of another project adds nothing, deleting a label, a task, or a project removes the links or labels that depend on it.

Migration 5 (written 2026-10-29, not yet run by the developer) adds `documents` (`id`, `project_id` to `projects` with CASCADE, `title` not empty after trimming, `kind` limited by `CHECK` to `notes`, `requirements`, `meeting`, `api`, `design`, `body` plain text with default empty, `created_at`, `updated_at`; indexes on `project_id` and `updated_at`). Claude ran migrations 1 to 5 and the repository's SQL in an in-memory SQLite database (Python, 2026-10-29): an empty title, an unknown type, and a missing project are rejected; the list is newest first and has no body; the project choices list only active projects; update and delete report whether the row existed; deleting a project deletes its documents.

Deferred to Phase 3 (no tables yet): activity history, preferences. Checklists and notes are in migration 3 (see above). Nested subtasks are not planned for the MVP.

## Migrations

| Version | Description | Applied in | Status |
|---|---|---|---|
| 5 | `documents` (`src-tauri/migrations/0005_documents.sql`) | on app start, after migration 4 | written 2026-10-29, **not yet run by the developer** (expected: schema version 5, 10 tables) |
| 4 | `labels` (`src-tauri/migrations/0004_labels.sql`) | on app start, after migration 3 | applied (reported by the developer 2026-10-29: schema version 4, 9 tables) |
| 3 | `task_checklist_and_notes` (`src-tauri/migrations/0003_task_checklist_and_notes.sql`) | on app start, after migration 2 | applied (reported by the developer 2026-10-28: schema version 3, 7 tables) |
| 2 | `workspace_owner_member_trigger` (`src-tauri/migrations/0002_workspace_owner_member.sql`) | on app start, after migration 1 | applied (reported by the developer 2026-10-25: schema version 2, a new workspace shows 1 member) |
| 1 | `create_initial_tables` (`src-tauri/migrations/0001_initial.sql`) | on app start, when the database is opened | applied (reported by the developer 2026-10-25) |

Migration files live in `src-tauri/migrations/` and are registered in `src-tauri/src/lib.rs` for the connection `sqlite:avenqor.db`. Each change is a new file with the next version number; existing migrations are never edited. The database file is `%APPDATA%\io.github.andra-gs.avenqor\avenqor.db` (Roaming; see the known issue in DEVELOPMENT_STATUS.md).

## Open questions

Decided on 2026-10-25: ID format (UUID text), date format, local profile (a row in `profiles`), deletion behavior (above), database file location (app config folder, see above).

Still open: whether attachments are supported in the MVP, and how their metadata is stored (Phase 3).
