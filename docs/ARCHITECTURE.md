# Architecture

Last updated: 2026-10-20

> **Status: no application code exists yet.** This document describes the **Agreed** architecture principles and the **Proposed** structure from `CLAUDE.md`. The "Actual implementation" section stays empty until code exists and has been verified. Status labels are explained in [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md).

## Technology (Agreed)

Tauri 2 (desktop shell), React + TypeScript + Vite (interface), Rust (native side), SQLite (local database). Tailwind CSS is a preferred but not mandatory option for styling. Target for the first release: Windows.

**How the pieces fit:** Tauri opens a native window that shows the React interface inside Microsoft Edge WebView2. The React code (the "frontend") cannot freely touch your computer. It can only use what Rust (the "native backend") and Tauri's permission system explicitly allow.

## Layers (Agreed)

`CLAUDE.md` requires these responsibilities to stay separate.

| Layer | Responsibility |
|---|---|
| UI components | Show the interface and react to clicks and typing. |
| Features | Group the screens and logic of one area (projects, tasks, calendar, documents). |
| Services | Business rules and coordination ("a task needs a title"). |
| Repositories | The only code that reads or writes stored data. |
| Local persistence | The SQLite database and an application-managed folder for files. |
| Platform integration | Tauri commands, permissions, notifications, filesystem access. |
| External integrations | GitHub API and any future remote backend (Future). |

Intended direction of calls:

```
UI component (React)
      │  user action
      ▼
Feature  ── screen logic for one area
      │
      ▼
Service  ── business rules, validation
      │
      ▼
Repository  ── the only place that touches stored data
      │
      ▼
SQLite file (local)        Platform layer (Tauri/Rust): app data folder,
                           notifications, file access
```

UI components must not talk to the database directly (Agreed: "keep database operations out of UI components").

### Illustrative data flow: moving a task on the Kanban board

This shows the **intended** design. Names are examples, not final.

1. The user drops a task card into the "Review" column.
2. The board feature asks the task service to change the task's status.
3. The service checks the new status is one of To Do, In Progress, Review, Done.
4. The repository saves the new status and a matching activity-history entry **in one transaction**, so both succeed or neither does.
5. The board redraws from the saved data. After a restart, the task is still in "Review".

## Planned folder layout (Proposed)

`CLAUDE.md` suggests the layout below and says to adapt it as the project grows and not to create folders just to follow a template. **None of it exists yet.**

```
src/
  components/   reusable interface pieces
  pages/        one component per screen
  features/     logic grouped by area (projects, tasks, calendar, documents)
  services/     business rules
  repositories/ data access
  types/        TypeScript types
  hooks/        reusable React hooks
  lib/          small helpers
src-tauri/
  src/          Rust code
  capabilities/ Tauri permission files
  migrations/   database migrations
  tauri.conf.json
```

## Local storage (Agreed)

- Structured data goes in a local SQLite database (see [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)).
- Attachments and local documents, if supported, go in an application-managed folder, not inside the database.
- Files live in the operating system's application data directory, not the installation folder.
- Data must survive closing and reopening the application.
- No remote backend is required for core features, and the offline app must not pretend to sync with other users.

## Security principles (Agreed)

- Grant Tauri **capabilities** (the permission files that decide what the frontend may do) with least privilege.
- Never give the frontend unrestricted filesystem, shell, or operating-system access.
- Validate all data that crosses from the frontend to the native side.
- Treat imported backup files as untrusted input.
- Keep secrets (such as GitHub tokens) out of source code and logs.

## Open decisions (need your approval before the related work)

Nothing below is decided. `CLAUDE.md` rule 16 requires options and approval for decisions with long-term consequences.

### D1. How the application accesses SQLite (decide at the start of Phase 2)

`CLAUDE.md` says to use "a Tauri 2-compatible SQLite plugin or another well-maintained compatible solution" and to verify compatibility first. Two options exist.

**Option A: the official Tauri SQL plugin, called from TypeScript.**
Facts from the official plugin documentation (read on 2026-10-20, not yet tried in this project):
- It is added with `npm run tauri add sql`, or manually with `cargo add tauri-plugin-sql --features sqlite`, registration in the Rust builder, and `npm install @tauri-apps/plugin-sql`.
- Migrations are defined in Rust and run in a transaction.
- The default permission (`sql:default`) allows loading, selecting, and closing. Writing needs an extra permission such as `sql:allow-execute`.
- The page states a minimum of Rust 1.90.

Trade-offs: less code to write, and it matches the wording in `CLAUDE.md`. But granting write permission lets frontend code send SQL statements, so validation must be done carefully in the services layer, and the "validate data crossing the frontend/native boundary" rule is harder to enforce.

**Option B: SQLite managed in Rust, exposed through specific Tauri commands.**
Trade-offs: a tighter boundary, because the frontend can only call named commands and Rust validates input. But there is more Rust code to write, which is a steeper learning curve, and a Rust SQLite library would still need to be chosen and verified. The suggested layout puts `repositories/` in the frontend, which would change under this option.

No Phase 0 or Phase 1 work depends on this choice.

### D2. Other open items

| Item | When to decide |
|---|---|
| Tailwind CSS or another styling approach | Start of Phase 1 |
| Routing library (none is named in `CLAUDE.md`; avoid unnecessary libraries) | Start of Phase 1 |
| How the "current local user or profile" is represented | Before the first migration (Phase 2) |
| Date and time storage format ("consistent date handling" is required) | Before the first migration (Phase 2) |
| How to scaffold into a repository folder that already contains documents | Phase 0 |

## Future online integration strategy

Online features are **Future** (Phase 6). Nothing here is built, and `CLAUDE.md` forbids building online features that depend on a nonexistent server.

**Agreed principles that keep the door open:**
- Keep business logic and data access modular, so another platform or data source can be added later.
- Design the data model so the roles Owner, Admin, Member, and Guest can be added later, without building a fake permission system now.
- Phase 6 will define authentication, a backend API, a cloud database, synchronization, conflict handling, and offline-to-online data migration.

**Proposed design considerations (not approved):** to be reviewed when the schema is designed in Phase 2.
- Give records globally unique IDs (instead of simple counting numbers), so data created on separate computers can later be combined without ID clashes.
- Record created and updated timestamps on records, which synchronization would need.
- Keep data access behind the repository layer, so replacing local SQLite with a remote source does not require changing screens.

## Actual implementation

None yet. After Phase 0, this section will record verified facts: the real folder tree, dependency versions from `package.json` and `Cargo.toml`, the settings in `tauri.conf.json`, and the capability files in use.

## Glossary

- **Tauri command**: a Rust function the frontend is allowed to call.
- **Capability**: a Tauri permission file listing what the frontend may do.
- **Repository**: code that is the only gateway to stored data.
- **Migration**: a numbered, versioned change to the database structure, applied in order, so existing user data survives upgrades.
- **Transaction**: a group of database changes that either all succeed or all fail.
