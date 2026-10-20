# Development Status

Last updated: 2026-10-20

This file is the project's memory between sessions. It must be updated before every coding session ends, and it records only what was actually done and checked.

## Current state

- **Phase:** documentation system established. **Phase 0 (environment and project setup) has not started.**
- **Application code:** none. **Database:** none. **Git repository:** `https://github.com/andra-gs/project-manager` (public, branch `main`). It was empty when the documentation was added on 2026-10-20.
- Nothing is Implemented yet. Status labels are explained in [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md).

### Environment note

These documents were drafted in a Claude workspace, not on the Windows development computer. The Windows environment (Node.js, npm, Rust, Cargo, build tools, Windows version) has **not been inspected**, and the real local repository has not been checked.

## Completed

| Item | Date |
|---|---|
| Created the six documentation files: `CLAUDE.md`, `README.md`, `docs/PROJECT_OVERVIEW.md`, `docs/ARCHITECTURE.md`, `docs/DATABASE_SCHEMA.md`, this file | 2026-10-20 |
| Added section 18 "Documentation System" to `CLAUDE.md`. Sections 1 to 17 were carried over from the Project copy | 2026-10-20 |

## Verification performed (2026-10-20)

| Check | Method | Result |
|---|---|---|
| Existing repository | Listed the working folder and ran `git status` | Empty workspace, no `.git`, no `docs/` folder. Nothing was overwritten |
| Project copy of `CLAUDE.md` | Read through the Claude Project's file tool | Matched the attached copy |
| `CLAUDE.md` structure | Listed all `## ` headings | Sections 1 to 18 present, in order |
| Links between documents | Script checked local links | First run: 3 of 15 pointed to this file before it existed (expected). Re-run after creating it: 17 links checked, none broken |
| No invented tables | Searched all files for `CREATE TABLE` | None found |
| No false "implemented" claims | Searched for "Implemented" | Appears only in the label definition and in the statement that nothing is implemented |
| Prerequisites and tool commands | Read the official pages: Tauri prerequisites, `create-tauri-app` README, Tauri SQL plugin | Documented in the README and `ARCHITECTURE.md`. These were **read, not executed** |

## Not verified

- No command in the README has been run.
- `npm run tauri dev` and `npm run tauri build` are the usual Tauri commands but have not been confirmed against a generated `package.json`.
- Sections 1 to 17 of `CLAUDE.md` were not compared character by character with the Project copy. Only the headings were checked.
- The Figma design has not been opened.
- The Tauri prerequisites page gives no minimum Node.js version. The Node.js version required by the Vite version that the template installs must be checked at scaffold time.

## Test results

None. There is no code to test. Record here only tests that were actually run, with the date and the command used.

## Known issues and limitations

1. **Two copies of `CLAUDE.md`.** The Claude Project's copy does not contain section 18. The repository copy does. Decide which copy is the source of truth, and keep the other in sync.
2. **Local folder not yet linked.** The local folder on drive D: (`D:\project manager`, suggested rename: `project-manager-desktop`) must be connected to the GitHub repository, either by cloning the repository or by `git init` plus adding the remote. The repository name (`project-manager`) differs from the folder name in `CLAUDE.md` (`project-manager-desktop`); decide whether to rename one.
3. **Open decisions** are listed in [ARCHITECTURE.md](ARCHITECTURE.md): database access approach (D1), styling, routing, local user or profile, date format, and how to scaffold into a non-empty folder.

## Roadmap checklist

- [x] Documentation system
- [ ] **Phase 0:** verify Windows prerequisites, create the Tauri 2 + React + TypeScript project, confirm it starts in development mode, confirm it builds
- [ ] Phase 1: UI foundation (layout, sidebar, dashboard and basic screens with temporary mock data)
- [ ] Phase 2: SQLite, schema and migrations, workspace, project, and task CRUD
- [ ] Phase 3: Kanban, calendar, task details, documents, progress, activity
- [ ] Phase 4: backup and restore, search, validation, notifications, testing
- [ ] Phases 5 to 7: GitHub integration, online architecture, platform expansion and AI (Future)

## Next task (exact)

**Phase 0, step 1: inspect the real environment.**

1. Get the six files into your local folder, keeping the `docs` folder: clone the GitHub repository (if the push succeeded) or copy the downloaded files. If a `CLAUDE.md` or `README.md` already exists there, compare before replacing, and keep anything worth keeping.
2. In Windows PowerShell, open that folder and run:

```powershell
git status
node -v
npm -v
rustc --version
cargo --version
rustup show
(Get-CimInstance Win32_OperatingSystem).Caption
```

3. Send the full output, including any error messages. Missing tools are expected and fine.

The next session will use that output to list missing prerequisites, give the exact PowerShell install commands, and only then scaffold the project.
