# Development Status

Last updated: 2026-10-21

This file is the project's memory between sessions. It must be updated before every coding session ends, and it records only what was actually done and checked.

## Current state

- **Phase:** Phase 0 (environment and project setup) **in progress**. Windows prerequisites are verified (see below). The Tauri project has **not** been created yet.
- **Application code:** none. **Database:** none. **Git repository:** `https://github.com/andra-gs/project-manager` (public, branch `main`). It was empty when the documentation was added on 2026-10-20.
- Nothing is Implemented yet. Status labels are explained in [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md).

### Environment note

The documents were drafted in a Claude workspace, which cannot reach the Windows development computer. Results from the development computer are **reported by the developer** (copied from their PowerShell output), not run by Claude. The developer's local clone of the repository was reported clean and up to date with `origin/main` on 2026-10-21.

## Completed

| Item | Date |
|---|---|
| Created the six documentation files: `CLAUDE.md`, `README.md`, `docs/PROJECT_OVERVIEW.md`, `docs/ARCHITECTURE.md`, `docs/DATABASE_SCHEMA.md`, this file | 2026-10-20 |
| Added section 18 "Documentation System" to `CLAUDE.md`. Sections 1 to 17 were carried over from the Project copy | 2026-10-20 |
| Pushed the documentation to GitHub (`main`, commit `e979d69`). Confirmed by comparing the remote and local commit IDs | 2026-10-20 |
| Phase 0, step 1: verified the Windows prerequisites on the development computer (details below) | 2026-10-21 |

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

## Phase 0 prerequisites on the development computer (reported by the developer, 2026-10-21)

| Item | Result | Status |
|---|---|---|
| Operating system | Windows 10 Pro, version 10.0.19045 | OK. The Tauri docs say WebView2 is included from Windows 10 version 1803. WebView2 itself was **not** checked directly |
| Git | `git status`: on `main`, up to date with `origin/main`, working tree clean | OK |
| Node.js | `node -v`: v24.22.0 | Installed. Compatibility with the Vite version in the Tauri template not yet checked |
| npm | `npm -v`: 11.19.1 | OK after the fix below |
| Rust | `rustc --version`: 1.99.1 (58cf8f9c3 2026-10-13) | OK. The Tauri SQL plugin docs ask for Rust 1.90 or newer |
| Cargo | `cargo --version`: 1.99.1 | OK |
| Rust toolchain | `rustup show`: `stable-x86_64-pc-windows-msvc`, active and default | OK. This is the MSVC toolchain that Tauri requires |
| Microsoft C++ Build Tools | Visual Studio Build Tools 2026 was installed, but the C++ component was missing. After adding the "Desktop development with C++" workload, `vswhere` (with `-requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64`) returned `C:\Program Files (x86)\Microsoft Visual Studio\18\BuildTools` | OK. Whether Rust and Tauri compile against this newer Build Tools version is **not yet proven**; the first build will show |

Fixes applied on the development computer:

1. `npm` was blocked in PowerShell: "running scripts is disabled on this system". Fixed with `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`. After that, `npm -v` worked in PowerShell. Before the fix it worked in Git Bash.
2. The C++ workload was added through Visual Studio Installer (Modify, then "Desktop development with C++").

## Not verified

- The Tauri project does not exist yet, so no project command has been run.
- `npm run tauri dev` and `npm run tauri build` are the usual Tauri commands but have not been confirmed against a generated `package.json`.
- Node.js v24 against the template's Vite version, and Rust against Build Tools 2026, are unproven until the first install and build.
- Sections 1 to 17 of `CLAUDE.md` were not compared character by character with the Project copy. Only the headings were checked.
- The Figma design has not been opened.
- The Tauri prerequisites page gives no minimum Node.js version. The Node.js version required by the Vite version that the template installs must be checked at scaffold time.

## Test results

None. There is no code to test. Record here only tests that were actually run, with the date and the command used.

## Known issues and limitations

1. **Two copies of `CLAUDE.md`.** The Claude Project's copy does not contain section 18. The repository copy does. Decide which copy is the source of truth, and keep the other in sync.
2. **Name mismatch.** The GitHub repository is named `project-manager`, but `CLAUDE.md` says the repository and folder name is `project-manager-desktop`. Decide whether to rename the repository or update `CLAUDE.md`. Folders with spaces in the path can cause problems in build scripts, so the local folder name should avoid spaces.
3. **Open decisions** are listed in [ARCHITECTURE.md](ARCHITECTURE.md): database access approach (D1), styling, routing, local user or profile, date format, and how to scaffold into a non-empty folder.

## Roadmap checklist

- [x] Documentation system
- [ ] **Phase 0:** (in progress)
  - [x] Verify Windows prerequisites
  - [ ] Create the Tauri 2 + React + TypeScript project
  - [ ] Confirm it starts in development mode
  - [ ] Confirm it builds
- [ ] Phase 1: UI foundation (layout, sidebar, dashboard and basic screens with temporary mock data)
- [ ] Phase 2: SQLite, schema and migrations, workspace, project, and task CRUD
- [ ] Phase 3: Kanban, calendar, task details, documents, progress, activity
- [ ] Phase 4: backup and restore, search, validation, notifications, testing
- [ ] Phases 5 to 7: GitHub integration, online architecture, platform expansion and AI (Future)

## Next task (exact)

**Phase 0, step 2: create the Tauri project (Proposed approach, needs your approval).**

Why a temporary folder: it is not yet known how `create-tauri-app` behaves in a folder that already contains files, and `CLAUDE.md` forbids silently overwriting existing files. The repository already has `README.md` and `CLAUDE.md`, and the tool generates its own `README.md`.

1. Create the project in a temporary folder **outside** the repository, so nothing in the repository can be overwritten:

```powershell
cd D:\
npm create tauri-app@latest tauri-temp -- --template react-ts
```

   The tool may ask questions (for example the app identifier). Send the questions you see before answering any that are unclear.

2. Do not run `npm install` yet. List what was generated and send the output:

```powershell
Get-ChildItem -Recurse -Name D:\tauri-temp -Exclude node_modules
```

3. Claude reviews the generated files, explains what each part does, and proposes exactly which files to copy into the repository and how to merge the two `README.md` files.

Later steps (not started): `npm install`, `npm run tauri dev`, `npm run tauri build`, then record the results here.
