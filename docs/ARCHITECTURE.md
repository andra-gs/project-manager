# Architecture

Last updated: 2026-10-22

> **Status: only the Tauri project template exists.** This document describes the **Agreed** architecture principles and the **Proposed** structure from `CLAUDE.md`. The "Actual implementation" section records only what has been verified; none of the layers below (services, repositories, database) is built yet. Status labels are explained in [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md).

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

`CLAUDE.md` suggests the layout below and says to adapt it as the project grows and not to create folders just to follow a template. **Only part of it exists:** `src/` (holding the template's sample files), `src-tauri/src/`, and `src-tauri/capabilities/`. The folders `components/`, `pages/`, `features/`, `services/`, `repositories/`, `types/`, `hooks/`, `lib/`, and `src-tauri/migrations/` do not exist yet.

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
| Tailwind CSS or another styling approach | Decided: Tailwind CSS 4 (approved 2026-10-22) |
| Routing library (none is named in `CLAUDE.md`; avoid unnecessary libraries) | Proposed: React Router, approved as part of the Phase 1 plan; installed in step 3 |
| How the "current local user or profile" is represented | Before the first migration (Phase 2) |
| Date and time storage format ("consistent date handling" is required) | Before the first migration (Phase 2) |

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

Branch `phase-1-ui`, after Phase 1 steps 1 and 2. Verified from the developer's test results (2026-10-22 and 2026-10-23) and from the tracked files (`git ls-files`). The project began as the `create-tauri-app` template (`react-ts`), renamed to `project-manager`, with the demo code removed. The interface so far is one placeholder page. No services, repositories, database, or SQL plugin exist yet.

### Folder layout (tracked files)

```
index.html, package.json, package-lock.json
tsconfig.json, tsconfig.node.json, vite.config.ts
src/               main.tsx, App.tsx, index.css, vite-env.d.ts
  styles/          tokens.css
src-tauri/
  Cargo.toml, Cargo.lock, build.rs, tauri.conf.json
  capabilities/    default.json
  icons/           application icons
  src/             main.rs, lib.rs
.vscode/           extensions.json
```

Generated and not tracked by Git: `node_modules/`, `dist/`, and `src-tauri/target/`.

### Styling and design tokens (Implemented, Agreed in `CLAUDE.md` section 19)

- Tailwind CSS 4 is used through its Vite plugin (`@tailwindcss/vite`, enabled in `vite.config.ts`). The DM Sans font comes from the package `@fontsource-variable/dm-sans` and is bundled with the app, so it works offline.
- `src/styles/tokens.css` is the single place for colors, text sizes, and corner radius. It switches off Tailwind's built-in palette, text sizes, and radius, so screens can only use token names such as `text-accent`. Values come from the Figma frame "01 Dashboard". Figma is a reference, not a binding specification.
- `src/index.css` loads the font, Tailwind, and the tokens, and sets the page defaults from tokens.
- Verified by the developer on 2026-10-23: changing `--color-accent` in `tokens.css` changed the colored line on the page without editing another file. This is the proof criterion of section 19, tested only on the placeholder page. It must be repeated once real screens exist.
- Not yet defined as tokens: spacing and layout sizes (sidebar width, top bar height). They are decided in step 3.

### How the pieces are wired (from the configuration files)

- `src-tauri/tauri.conf.json`: product name `Project Manager Desktop`, version `0.1.0`, identifier `io.github.andra-gs.project-manager`. In development it runs `npm run dev` and loads `http://localhost:1420`. For a release it runs `npm run build` (`tsc && vite build`) and packages the files from `dist`. One window of 1200x680 (minimum 960x600, centered). `bundle.targets` is `all`.
- `src-tauri/capabilities/default.json`: for the `main` window, only the permission `core:default`.
- `src-tauri/src/main.rs` calls `project_manager_lib::run()`. `src-tauri/src/lib.rs` starts a bare Tauri app with no plugins and no commands.
- `src-tauri/Cargo.toml`: package `project-manager`, library `project_manager_lib`, Rust edition 2024. Dependencies: `tauri` 2, `serde`, `serde_json`.
- `package.json`: dependencies `react` and `react-dom` ^19.1.0, `@tauri-apps/api` ^2, `tailwindcss` and `@tailwindcss/vite` ^4.3.3, `@fontsource-variable/dm-sans` ^5.3.0. Dev dependencies: `vite` ^8.0.16, `@vitejs/plugin-react` ^6.0.2, `typescript` ~6.0.3, `@tauri-apps/cli` ^2, and React type packages.
- Versions that were actually built (from the Phase 0 logs): Vite 8.3.4, `tauri` 2.12.4, `wry` 0.57.0, `tauri-build` 2.7.3.

### Security state

- A Content Security Policy (CSP, rules that limit what the page may load) is set: `csp` for release builds and `devCsp` for development. Both only allow the app's own files, the Tauri connection, and (in development) the Vite dev server. The page loaded without CSP errors in the dev Console and in the release build (reported by the developer, 2026-10-22).
- `style-src` allows inline styles (`'unsafe-inline'`), which weakens the policy slightly. It is kept so dynamic styles such as progress-bar widths work. To be reviewed when the design needs it.
- The `opener` plugin and its permission were removed. Only `core:default` remains.

## Glossary

- **Tauri command**: a Rust function the frontend is allowed to call.
- **Capability**: a Tauri permission file listing what the frontend may do.
- **Repository**: code that is the only gateway to stored data.
- **Migration**: a numbered, versioned change to the database structure, applied in order, so existing user data survives upgrades.
- **Transaction**: a group of database changes that either all succeed or all fail.