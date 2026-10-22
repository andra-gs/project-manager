# Development Status

Last updated: 2026-10-22

This file is the project's memory between sessions. It must be updated before every coding session ends, and it records only what was actually done and checked.

## Current state

- **Phase:** Phase 0 (environment and project setup) is **complete**. Phase 1 (UI foundation) is **in progress**: step 1 (clean the template) is written on branch `phase-1-ui` and **not yet verified** by the developer. `main` is unchanged.
- **Application code on `main`:** only the unmodified Tauri 2 + React + TypeScript template (a sample page and one demo Rust command named `greet`). No project features exist. **Database:** none. **Git repository:** `https://github.com/andra-gs/project-manager` (public, branch `main`).
- The desktop app starts in development mode and builds a Windows release on the developer's computer (details below).
- Nothing from the MVP feature list is Implemented yet. Status labels are explained in [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md).

### Environment note

The documents were drafted in a Claude workspace, which cannot reach the Windows development computer. Results from the development computer are **reported by the developer** (copied from their PowerShell output), not run by Claude. Claude directly verified only the contents of the GitHub repository (by cloning it) and the documentation files.

## Completed

| Item | Date |
|---|---|
| Created the six documentation files: `CLAUDE.md`, `README.md`, `docs/PROJECT_OVERVIEW.md`, `docs/ARCHITECTURE.md`, `docs/DATABASE_SCHEMA.md`, this file | 2026-10-20 |
| Added section 18 "Documentation System" to `CLAUDE.md`. Sections 1 to 17 were carried over from the Project copy | 2026-10-20 |
| Pushed the documentation to GitHub (`main`, commit `e979d69`). Confirmed by comparing the remote and local commit IDs | 2026-10-20 |
| Phase 0, step 1: verified the Windows prerequisites on the development computer (details below) | 2026-10-21 |
| Phase 0, step 2: created the project with `create-tauri-app` 4.7.5 (template `react-ts`, npm) in a temporary folder, renamed it from `tauri-temp` to `project-manager`, and copied it into the repository without overwriting existing files | 2026-10-21 |
| Committed and pushed the scaffold (`e523852`) | 2026-10-21 |
| Phase 0, step 3: `npm install` and `npm run tauri dev` worked | 2026-10-21 |
| Phase 0, step 4: `npm run tauri build` produced a Windows release build and two installers | reported 2026-10-22 |

## Verification performed

### Documentation (2026-10-20, by Claude)

| Check | Method | Result |
|---|---|---|
| Existing repository | Listed the working folder and ran `git status` | Empty workspace, no `.git`, no `docs/` folder. Nothing was overwritten |
| Project copy of `CLAUDE.md` | Read through the Claude Project's file tool | Matched the attached copy |
| `CLAUDE.md` structure | Listed all `## ` headings | Sections 1 to 18 present, in order |
| Links between documents | Script checked local links | First run: 3 of 15 pointed to this file before it existed (expected). Re-run after creating it: 17 links checked, none broken |
| No invented tables | Searched all files for `CREATE TABLE` | None found |
| No false "implemented" claims | Searched for "Implemented" | Appears only in the label definition and in the statement that nothing is implemented |
| Prerequisites and tool commands | Read the official pages: Tauri prerequisites, `create-tauri-app` README, Tauri SQL plugin | Documented in the README and `ARCHITECTURE.md`. These were **read, not executed** |

### Phase 0 prerequisites on the development computer (reported by the developer, 2026-10-21)

| Item | Result | Status |
|---|---|---|
| Operating system | Windows 10 Pro, version 10.0.19045 | OK. The Tauri docs say WebView2 is included from Windows 10 version 1803. WebView2 itself was **not** checked directly, but the app window rendered |
| Git | `git status`: on `main`, up to date with `origin/main`, working tree clean | OK |
| Node.js | `node -v`: v24.22.0 | OK. Worked with Vite 8.3.4 in development and build |
| npm | `npm -v`: 11.19.1 | OK after the fix below |
| Rust | `rustc --version`: 1.99.1 (58cf8f9c3 2026-10-13) | OK. The Tauri SQL plugin docs ask for Rust 1.90 or newer |
| Cargo | `cargo --version`: 1.99.1 | OK |
| Rust toolchain | `rustup show`: `stable-x86_64-pc-windows-msvc`, active and default | OK. This is the MSVC toolchain that Tauri requires |
| Microsoft C++ Build Tools | Visual Studio Build Tools 2026 was installed, but the C++ component was missing. After adding the "Desktop development with C++" workload, `vswhere` (with `-requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64`) returned `C:\Program Files (x86)\Microsoft Visual Studio\18\BuildTools` | OK. Rust and Tauri compiled successfully against it |

Fixes applied on the development computer:

1. `npm` was blocked in PowerShell: "running scripts is disabled on this system". Fixed with `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`. After that, `npm -v` worked in PowerShell. Before the fix it worked in Git Bash.
2. The C++ workload was added through Visual Studio Installer (Modify, then "Desktop development with C++").

### Phase 0 project checks (reported by the developer unless stated)

| Check | Method | Result |
|---|---|---|
| Scaffold | `npm create tauri-app@latest tauri-temp -- --template react-ts`, identifier `io.github.andra-gs.project-manager`, package manager npm | Project created in `D:\tauri-temp`. No `.git` folder inside it |
| Rename | Searched all files for `tauri[-_]temp` before and after | Six occurrences replaced (package name, Cargo package and library names, `productName`, window title, `main.rs` call). None left. `package.json` and `tauri.conf.json` start with `{`, so no BOM |
| Copy into repository | `robocopy D:\tauri-temp <repo> /E /XF README.md /XC /XN /XO` | 37 files copied, 1 skipped (template `README.md`). `git status` showed only new files and no modified tracked files, so nothing was overwritten |
| Tracked files | Claude cloned `origin/main` (commit `e523852`) and ran `git ls-files` | Layout matches the scaffold. `src-tauri/Cargo.lock` is tracked. `package-lock.json` is not yet tracked |
| Dependencies | `npm install` | 27 packages added, 28 audited, 0 vulnerabilities (about 2 minutes) |
| Development mode | `npm run tauri dev` | Vite v8.3.4 ready at `http://localhost:1420/`. Rust compiled in the `dev` profile in 18m 19s (first build). `project-manager.exe` started. The developer saw the "Project Manager Desktop" window showing the template page |
| Release build | `npm run tauri build` | `tsc && vite build` succeeded (19 modules). Rust `release` profile compiled in 33m 57s. Produced an MSI installer (2.04 MiB) and an NSIS installer (1.39 MiB). The build downloaded the WiX and NSIS tools from GitHub |
| Git hygiene | `git status` after the development run | Only `package-lock.json` listed (untracked). `node_modules`, `dist`, and `src-tauri/target` did not appear |

## Not verified

Phase 1 step 1 (branch `phase-1-ui`), still open after the developer's test on 2026-10-22:

- The Console check for Content Security Policy errors (dev and release) was not reported.
- The minimum window size (960x600) was not reported.
- Whether `src-tauri/Cargo.lock` changed (opener dependencies removed) was not reported.
- Inline style attributes, which the design will need later for dynamic progress bars, are untested.
- Claude's workspace could not run npm, so Claude itself ran no build; all build results below come from the developer.

Earlier items:

- The two installers were built but never installed or run.
- The window content was seen only by the developer. No screenshot has been reviewed.
- Whether a build works without internet access is untested. The first build downloaded the WiX and NSIS tools.
- Claude has not read the contents of `src/App.tsx`, `src/main.tsx`, `src/App.css`, `index.html`, `vite.config.ts`, or `tsconfig*.json`.
- No data is stored yet, so the application data folder location is untested.
- Sections 1 to 17 of `CLAUDE.md` were not compared character by character with the Project copy. Only the headings were checked.
- The Figma design has not been opened.

## Test results

No automated tests exist and no test framework is installed. Commands actually run, with results:

| Date | Command | Result |
|---|---|---|
| 2026-10-21 | `npm install` | Passed, 0 vulnerabilities |
| 2026-10-21 | `npm run tauri dev` | Passed: Vite started, Rust compiled, window opened |
| reported 2026-10-22 | `npm run tauri build` | Passed: TypeScript check and Vite build succeeded, MSI and NSIS installers produced |

| reported 2026-10-22 | `npm run tauri dev` on branch `phase-1-ui` | Passed: Rust compiled, window opened and showed the placeholder heading and text |
| reported 2026-10-22 | `npm run tauri build` on branch `phase-1-ui` | Passed: `tsc` and Vite build succeeded, MSI and NSIS installers produced; the release build showed the same page as dev |

The TypeScript check (`tsc`) is part of `npm run build`, so it passed as part of the release build.

## Known issues and limitations

1. **Two copies of `CLAUDE.md`.** The Claude Project's copy does not contain section 18. The repository copy does. Decide which copy is the source of truth, and keep the other in sync.
2. **Name mismatch.** The GitHub repository is named `project-manager`, but `CLAUDE.md` says the repository and folder name is `project-manager-desktop`. Decide whether to rename the repository or update `CLAUDE.md`.
3. **Commit author email.** Commit `e523852` records the author email as `andranooryanto@gmail.con` (typo: `.con`), so GitHub does not link it to the account `andra-gs`. The developer was advised to change `user.email` for future commits and to leave the old commit unchanged, because rewriting history is not worth the risk. Whether the setting was changed is not confirmed.
4. **Template defaults (approved 2026-10-22, changed on branch `phase-1-ui`, not yet verified).** The `opener` plugin and its permission were removed. A strict `csp` and a development-only `devCsp` were added. The window is 1200x680, minimum 960x600, centered, so that it fits 1366x768 laptop screens. The sample page, the `greet` command, and the demo assets were removed and replaced by a placeholder page. `bundle.targets` stays `all` until release. The `style-src` policy allows inline styles (`'unsafe-inline'`), following the Tauri documentation example. This weakens the policy slightly and is to be reviewed when the design needs it.
5. **Pending commit.** `package-lock.json` and the documentation updates from 2026-10-22 are not yet committed.
6. **Open decisions** are listed in [ARCHITECTURE.md](ARCHITECTURE.md): database access approach (D1), styling, routing, local user or profile, and date format.

## Roadmap checklist

- [x] Documentation system
- [x] **Phase 0:** environment and project setup
  - [x] Verify Windows prerequisites
  - [x] Create the Tauri 2 + React + TypeScript project
  - [x] Confirm it starts in development mode
  - [x] Confirm it builds
- [ ] **Phase 1:** UI foundation (in progress)
  - [ ] Step 1: clean the template and apply the approved defaults (verified by the developer 2026-10-22: dev and release builds load the page, minimum window size correct, no CSP error in the dev Console, `Cargo.lock` updated and pushed)
  - [ ] Step 2: styling with Tailwind CSS, DM Sans font stored locally, design tokens (written on branch, awaiting verification)
  - [ ] Step 3: layout, sidebar, and routing with placeholder pages
  - [ ] Step 4: base components (button, card, badge, progress bar)
  - [ ] Step 5: Dashboard with temporary mock data
  - [ ] Step 6: Workspace and project overview screens with temporary mock data
  - [ ] Proof: changing the accent color in the token file changes every screen (see `CLAUDE.md` section 19)
- [ ] Phase 2: SQLite, schema and migrations, workspace, project, and task CRUD
- [ ] Phase 3: Kanban, calendar, task details, documents, progress, activity
- [ ] Phase 4: backup and restore, search, validation, notifications, testing
- [ ] Phases 5 to 7: GitHub integration, online architecture, platform expansion and AI (Future)

## Next task (exact)

**Phase 1, step 2: verify styling and design tokens (developer, on Windows).** Written on branch `phase-1-ui`, not yet built by anyone. Claude's workspace has no access to the npm registry, so the packages must be installed on your computer.

1. Get the branch and install the three new packages (Tailwind CSS, its Vite plugin, and the DM Sans font):

```powershell
cd D:\project-manager
git pull origin phase-1-ui
npm install tailwindcss @tailwindcss/vite @fontsource-variable/dm-sans
npm run tauri dev
```

2. Check: the window shows the heading in DM Sans, a gray line, and a **colored (indigo) line** "Token check". No red messages in the Console (F12) about "Content Security Policy" or "font".
3. Proof of the token system: open `src/styles/tokens.css`, change `--color-accent: #4a3de0;` to `#e03d3d;`, save. The colored line must turn red without editing any other file. Then change it back.
4. Run `npm run build`, then commit `package.json` and `package-lock.json` (they changed when installing) and push.

Claude then updates `README.md` and `docs/ARCHITECTURE.md` for the verified state of steps 1 and 2 and continues with step 3 (layout, sidebar, routing).
