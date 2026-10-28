# Development Status

Last updated: 2026-10-27

This file is the project's memory between sessions. It must be updated before every coding session ends, and it records only what was actually done and checked.

## Current state

- **Phase:** Phases 0, 1, and 2 are **complete** (verified by the developer; Phase 2 closing check reported 2026-10-27). All work is on branch `phase-1-ui`, not yet merged into `main`. `main` still holds the Phase 0 template. Next: Phase 3.
- **Application code:** on `main`, the unmodified template; on `phase-3-kanban` (contains `phase-1-ui`), the app frame, design tokens, and working workspace, project, task, Kanban board, Calendar, and My Tasks features on a local SQLite database (`avenqor.db`, schema version 2, five tables). Documents is still a placeholder page. **Git repository:** `https://github.com/andra-gs/project-manager` (public).
- The desktop app starts in development mode and builds a Windows release on the developer's computer (details below).
- Implemented (verified by the developer): workspaces, projects, basic tasks, Dashboard on real data, local profile. See the MVP table in [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md). Status labels are explained there too.

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
| Decisions 2026-10-23: working product name **Avenqor** (later Agreed, 2026-10-25; trademark checks not recorded); brand notes saved as `docs/BRAND.md` (identity only); color palette and logo not applied while the logo is being reconsidered; app `identifier` change postponed until before Phase 2 | 2026-10-23 |
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

Phase 1, steps 1 to 3 (branch `phase-1-ui`):

- Inline style attributes, which the design will need later for dynamic progress bars, are untested.
- Scrolling was verified on the Dashboard (2026-10-24). The layout on 1366x768 and 1920x1080 screens was not reported.
- The accent-token proof was repeated on the Dashboard and the step 6 screens (2026-10-24). It is still to be done once on the remaining screens built in step 7.
- The empty states (no projects, no activity, unknown workspace or project) exist, but only the workspace "Content Creator" (no projects) shows one.
- Claude's workspace cannot run npm or reach the npm registry, so Claude itself ran no build; all build results come from the developer.
- Production (release) rendering of Tailwind styles and the bundled font was not reported separately; only the dev run after step 2 was.

Earlier items:

- The two installers were built but never installed or run.
- The window content was seen only by the developer. No screenshot has been reviewed.
- Whether a build works without internet access is untested. The first build downloaded the WiX and NSIS tools.
- Claude has not read `tsconfig*.json`.
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

| reported 2026-10-23 | `npm install tailwindcss @tailwindcss/vite @fontsource-variable/dm-sans`, then `npm run tauri dev` | Passed without errors; the accent line showed the token color |
| reported 2026-10-23 | change `--color-accent` in `src/styles/tokens.css` | Passed: the colored line changed without editing another file; value restored afterwards |
| reported 2026-10-23 | `npm run build` | Reported as successful without errors |
| reported 2026-10-23 | `npm install react-router@7`, `npm run tauri dev` | Passed: sidebar, top bar, all menu items and workspaces clickable, title changes, active item uses the accent color |
| reported 2026-10-23 | change `--color-accent` again | Passed: name, active item, and avatar changed together; restored afterwards |
| reported 2026-10-23 | resize window to minimum and full screen | Passed: no problem reported. Scrolling was not tested |
| reported 2026-10-23 | `npm run build`, `npm run tauri build`, run `project-manager.exe` | Passed: every page opens in the release build |
| reported 2026-10-23 | `npm run tauri dev` (step 4) | Passed: buttons, badges, three progress bars shown; hover and focus outline work; changing `--color-accent` changed the button, badge, first progress bar, and sidebar highlight |
| reported 2026-10-23 | `npm run build` (step 4) | Passed: `tsc` and Vite build (50 modules) without errors |
| reported 2026-10-23 | `npm run tauri dev` (step 4b) | Passed: toggle button, tooltips, drag left and right, automatic collapse and expand when resizing, keyboard toggle with Tab and Enter |
| reported 2026-10-23 | `npm run build` (step 4b) | Passed without errors |
| reported 2026-10-24 | `npm run tauri dev` (step 5) | Passed: five Dashboard sections shown; workspace card opens the workspace page; the sidebar closes when the window is made small, and page content scrolls; changing the accent color changed the Dashboard together with the sidebar; no errors |
| reported 2026-10-24 | `npm run build` (step 5) | Reported without errors |
| reported 2026-10-24 | `npm run tauri dev` (step 6) | Passed: workspace stats (4 projects, 103 tasks, 54 completed, 4 members), project cards, activity; project page (72%, 18 of 25); empty workspace message; 960x600 with sidebar open and collapsed; accent change on all three pages; no errors |
| reported 2026-10-24 | `npm run build` (step 6) | **Failed**: `src/pages/WorkspacePage.tsx:25:9 - error TS6133: 'activeProjects' is declared but its value is never read.` Fixed by showing `activeProjects` in the "Projects" stat |
| reported 2026-10-24 | `npm run tauri build` (after step 6) | Passed: `tsc` and Vite build, release profile compiled in 15m 00s, MSI (2.05 MiB) and NSIS (1.42 MiB) installers produced. Whether the release program was started and the pages checked was not reported |
| reported 2026-10-24 | `npm run tauri dev` (step 7) | Passed: Settings and Help open and are readable at the minimum size; accent change shows on the sidebar; no problems reported |
| reported 2026-10-24 | `npm run build` (step 7) | Passed: `tsc` and Vite build (74 modules) without errors. The JavaScript file name differs from the earlier build (`index-CN5xRskZ.js`), so it contains the step 7 code |
| reported 2026-10-24 | release program `project-manager.exe` | All pages opened and the layout was fine, but Settings and Help still showed the old placeholder text. Likely cause (Claude's reading, not confirmed): the installers had been built before step 7 was pulled, so the program was older code. To be confirmed by rebuilding |
| reported 2026-10-24 | `npm run tauri build`, then `project-manager.exe` (closing check) | Passed: Settings and Help show their real content in the release program |
| reported 2026-10-25 | `npm run tauri dev` after the Avenqor rename (step 1a) | Passed: no errors |
| reported 2026-10-25 | `npm run tauri dev` after adding the SQL plugin (step 1b) | Passed: compiled, all pages look the same, no errors |
| reported 2026-10-25 | `Get-ChildItem -Recurse -Filter avenqor.db $env:APPDATA` | Found `C:\Users\<user>\AppData\Roaming\io.github.andra-gs.avenqor\avenqor.db`, 4096 bytes, created 2026-10-25 06:08. The empty database file is created at startup, as expected |
| reported 2026-10-25 | `npm install`, `npm run tauri dev` (Phase 2 step 2a), Settings page | Passed: the Database line read `Connected · schema version 1 · 5 tables · foreign keys on` |
| reported 2026-10-25 | `npm run build` (Phase 2 step 2a) | Passed: `tsc` and Vite build (80 modules) without errors |
| reported 2026-10-25 | `npm run tauri dev` (Phase 2 step 2b), Settings | Passed: Database line `Connected · schema version 2 · 5 tables · foreign keys on`; created workspace "Test A" (1 member, shown in the sidebar); empty and spaces-only names rejected with a red message and not saved; field stops at 60 characters; rename updated list and sidebar; the workspace was still there after restarting the app; delete showed a confirmation, Cancel kept it, Delete removed it from the list and the sidebar |
| reported 2026-10-25 | `npm run build` (Phase 2 step 2b) | Passed: `tsc` and Vite build (88 modules) without errors |
| reported 2026-10-25 | `npm run tauri dev` (Phase 2 step 2c-1) | Passed: empty workspace page (0 projects, tasks, deadlines, 1 member); New Project with an empty name rejected; projects saved, shown as cards, and still there after restarting; Escape closes the New Project window and the delete confirmation. Finding: names and descriptions were cut to one line on the cards (fixed, see below) |
| reported 2026-10-25 | `sqlite3 "$env:APPDATA\io.github.andra-gs.avenqor\avenqor.db" "SELECT COUNT(*) FROM projects;"` | Not run: `sqlite3` is not installed on the development computer. The cascade delete (workspace to projects) is therefore not yet verified |
| reported 2026-10-25 | `npm run build` (Phase 2 step 2c-1) | Passed: `tsc` and Vite build (93 modules) without errors |
| reported 2026-10-25 | `npm run tauri dev` (step 2c-1b), Settings | Passed: project names and descriptions wrap onto more lines without breaking the layout. Database line with a workspace and 2 projects: `stored: 1 workspace, 2 projects, 0 tasks`; after deleting the workspace: `stored: 0 workspaces, 0 projects, 0 tasks`. This verifies that deleting a workspace deletes its projects (cascade) |
| reported 2026-10-25 | `npm run build` (step 2c-1b) | Passed: `tsc` and Vite build (93 modules) without errors |
| reported 2026-10-26 | `npm run tauri dev` (Phase 2 step 2c-2a) | Passed: the project page with no tasks (0%); empty-title task rejected; `Task 1` showed "Overdue · Oct 25", `Task 2` "Tomorrow", `Task 3` no badge; mark done, reopen, progress 33% and 67%; data still there after restarting; task delete with confirmation; workspace page card and stats; archive and restore; the Database line counts, the cascade project to tasks, and workspace deletion all as expected |
| reported 2026-10-26 | `npm run build` (Phase 2 step 2c-2a) | Passed: `tsc` and Vite build (101 modules) without errors |
| reported 2026-10-26 | `npm run tauri dev` (Phase 2 step 2c-2b) | Passed, all items as expected: renaming the local profile (shown in the top bar and greeting, validation, kept after restart); empty Dashboard with "New Project" disabled; two workspaces with a project each created from the Dashboard; real cards and links; "My Tasks" order and badges, done tasks leave the list; archive and restore of a project on the Dashboard; Archive and Delete buttons at the bottom left of the project page; Help page text |
| reported 2026-10-26 | `npm run build` (Phase 2 step 2c-2b) | Passed: `tsc` and Vite build (99 modules) without errors |
| reported 2026-10-26 | `npm run tauri dev` (Phase 2 step 2d) | Passed: edit project (name, description, validation, Cancel and Escape), edit task (title, priority, deadline, clearing and past deadlines, validation), a done task stays done, creating projects and tasks still works, edits kept after restarting |
| reported 2026-10-26 | `npm run build` (Phase 2 step 2d) | Passed: `tsc` and Vite build (99 modules) without errors |
| reported 2026-10-27 | Phase 2 closing check: `npm run tauri build`, release `project-manager.exe` with the existing database and with a renamed (fresh) `avenqor.db`, then restore of the backup | Reported by the developer as "all fine" (no details of individual items were given; the optional installer test was not confirmed separately) |
| reported 2026-10-27 | `npm run tauri dev` (Phase 3 step 3a, branch `phase-3-kanban`), board checks 1 to 8 | Passed, all as expected: Open board button, four columns with counts and empty messages, arrow buttons (disabled at the ends), positions kept after restart, progress follows Done, New Task adds to To Do, top bar title, deadline badges |
| reported 2026-10-27 | `npm run build` (Phase 3 step 3a) | Passed: `tsc` and Vite build (103 modules) without errors |
| reported 2026-10-28 | `npm run tauri dev` (Phase 3 step 3c, branch `phase-3-kanban`), Calendar checks 1 to 10 | Passed, all as expected: current month, Monday first, month arrows, Today, red/accent/grey deadline colors, "+N more", clicking a task opens its project, upcoming list contents and order, updates after changes, empty message, 960x600 layout, deadline badge on the right of the task row |
| reported 2026-10-28 | `npm run build` (Phase 3 step 3c) | Passed: `tsc` and Vite build (109 modules) without errors |
| reported 2026-10-28 | `npm run tauri dev` (Phase 3 step 3d, branch `phase-3-kanban`), My Tasks checks 1 to 9 | Passed, all as expected: Open filter default and order, row contents, all filter buttons, empty messages, row opens the project, archived project excluded, list updates after board changes, 960x600 layout |
| reported 2026-10-28 | `npm run build` (Phase 3 step 3d) | Passed: `tsc` and Vite build (113 modules) without errors |
| reported 2026-10-28 | `npm run tauri dev` (custom title bar, branch `phase-3-kanban`), checks 1 to 6, 8, 9 | Passed, all as expected: native bar gone, app-colored strip, path text and links, minimize/maximize/restore/close, dragging, double-click maximize, resizing from edges and minimum size, strip not responding while a dialog is open (expected), layout below unchanged. Check 7 (Windows 11 snap layout popup) could not be judged: the developer uses Windows 10 Pro |
| reported 2026-10-28 | `npm run build` (custom title bar) | Passed: `tsc` and Vite build (121 modules) without errors. The output pasted was from `npm run build`; the release program `project-manager.exe` check (item 10) was not reported separately |
| reported 2026-10-28 | `npm run tauri dev` (Phase 3 step 3e-1, task page), checks 1 to 11 | Passed except: (a) a very long description without spaces stretched the page to the right at the smallest window instead of wrapping (checks 2 and 9); (b) the developer asked for form messages to appear under the input with a highlight (check 3), for all forms. Both corrected the same day, see ARCHITECTURE.md; not yet re-tested. Other checks as expected, data kept after restart |
| reported 2026-10-28 | `npm run build` (Phase 3 step 3e-1) | Passed: `tsc` and Vite build (124 modules) without errors |
| reported 2026-10-28 | `npm run tauri dev` (corrections to step 3e-1), checks 1 to 5 | Passed: long title and description wrap at the smallest window; the empty-title message appears under the box with a red border in the task and project forms; workspace and display-name forms unchanged; sidebar changes as wanted. Developer's change request: descriptions need no message (a character counter at the lower left and a hard limit instead) and the deadline needs no message (auto-correct instead); implemented the same day, not yet re-tested |
| reported 2026-10-28 | `npm run build` (corrections to step 3e-1) | Passed: `tsc` and Vite build (124 modules) without errors |
| reported 2026-10-28 | `npm run tauri dev` (second round of corrections), checks 1 to 3 | Passed: description counters, empty-title message, deadline auto-correct. Developer's change request: counters on every name and description box (new and edit), at the lower right, shown only after 10 percent of the limit is typed; implemented the same day, not yet re-tested |
| reported 2026-10-28 | `npm run build` (second round of corrections) | Passed without errors (output not pasted) |
| reported 2026-10-28 | `npm run tauri dev` (counter change, then step 3e-2 with migration 3), checks 1 to 8 | Passed, all as expected: Database line `Connected · schema version 3 · 7 tables`; existing data intact; checklist (add, tick, edit, delete, order, limit and counter) and notes (add, newest first, edit, delete with confirmation, line breaks, long words) work; data kept after restart; deleting a task with items and notes causes no error; checklist progress does not change project progress; counters at the lower right of every limited box. Developer's change request: delete a checklist item with a small cross icon instead of a Delete button (too many Delete buttons on the page); done the same day, not yet re-tested |
| reported 2026-10-28 | `npm run build` (step 3e-2) | Passed: `tsc` and Vite build (134 modules) without errors |
| run by Claude 2026-10-28 | Python `sqlite3` in memory against migrations 1 to 4 and the SQL of `labelRepository.ts`; partial `tsc --noEmit` | SQL: duplicate names (any letter case) rejected in one project, allowed across projects, bad color rejected, linking is idempotent and refuses a label of another project, deletes of label, task, and project cascade correctly. `tsc`: no errors except missing-package noise and the known `database.ts(17,3)`. The app was not built or run in the Claude workspace (no npm registry), so the label screens are untested until the developer's run |
| reported 2026-10-24 | `npm run build` (step 6, after the fix) | Passed: `tsc` and Vite build (74 modules) without errors |

The TypeScript check (`tsc`) is part of `npm run build`, so it passed as part of the release build.

## Known issues and limitations

1. **Two copies of `CLAUDE.md`.** The Claude Project's copy does not contain section 18. The repository copy does. Decide which copy is the source of truth, and keep the other in sync.
2. **Name mismatch.** (The product name Avenqor was Agreed on 2026-10-25. The repository and folder names are separate and were not changed.) The GitHub repository is named `project-manager`, but `CLAUDE.md` says the repository and folder name is `project-manager-desktop`. Decide whether to rename the repository or update `CLAUDE.md`.
3. **Commit author email.** Commit `e523852` records the author email as `andranooryanto@gmail.con` (typo: `.con`), so GitHub does not link it to the account `andra-gs`. The developer was advised to change `user.email` for future commits and to leave the old commit unchanged, because rewriting history is not worth the risk. Whether the setting was changed is not confirmed.
4. **Template defaults (approved 2026-10-22, changed on branch `phase-1-ui`, verified by the developer 2026-10-22).** The `opener` plugin and its permission were removed. A strict `csp` and a development-only `devCsp` were added. The window is 1200x680, minimum 960x600, centered, so that it fits 1366x768 laptop screens. The sample page, the `greet` command, and the demo assets were removed and replaced by a placeholder page. `bundle.targets` stays `all` until release. The `style-src` policy allows inline styles (`'unsafe-inline'`), following the Tauri documentation example. This weakens the policy slightly and is to be reviewed when the design needs it.
5. **Focus outline cut off in the sidebar (found 2026-10-23, fix verified by the developer on 2026-10-23).** In icon-only mode the focus outline of the first menu item looked cut off at the top. Cause (Claude's diagnosis, not confirmed): the menu area scrolls, and a scrolling box hides anything drawn outside its edge, such as the outline. Fix: a small top padding inside that area (`pt-1.5` in `Sidebar.tsx`).
6. **Branch not merged.** All Phase 1 work is on `phase-1-ui`. `main` changes only when the developer merges.
7. **Database folder is Roaming (found 2026-10-25; keeping it for now was Agreed 2026-10-27, revisit before a public release).** The plugin puts `avenqor.db` in `%APPDATA%` (Roaming), the app config folder. On a company or school computer with roaming profiles, Windows may copy that folder to a server at logon. For a personal computer this is harmless. Moving it to the Local folder would need a Rust-side path setting; decide before release.
8. **Open decisions** are listed in [ARCHITECTURE.md](ARCHITECTURE.md): database access approach (D1), styling, routing, local user or profile, and date format.

## Roadmap checklist

- [x] Documentation system
- [x] **Phase 0:** environment and project setup
  - [x] Verify Windows prerequisites
  - [x] Create the Tauri 2 + React + TypeScript project
  - [x] Confirm it starts in development mode
  - [x] Confirm it builds
- [x] **Phase 1:** UI foundation (complete 2026-10-24, on branch `phase-1-ui`, not yet merged into `main`)
  - [x] Step 1: clean the template and apply the approved defaults (verified by the developer 2026-10-22: dev and release builds load the page, minimum window size correct, no CSP error in the dev Console, `Cargo.lock` updated and pushed)
  - [x] Step 2: styling with Tailwind CSS, DM Sans font stored locally, design tokens (verified by the developer 2026-10-23: dev run without errors, accent token change took effect, packages committed)
  - [x] Step 3: layout, sidebar, and routing with placeholder pages (verified by the developer 2026-10-23, except scroll behavior at small sizes and the 1366x768 and 1920x1080 screens)
  - [x] Step 4: base components (button, card, badge, progress bar) (verified by the developer 2026-10-23 in development mode and with `npm run build`; not tested in a release build)
  - [x] Step 4b: collapsible sidebar (verified by the developer 2026-10-23 in development mode and with `npm run build`; one focus-outline problem found and fixed, see Known issues)
  - [x] Step 5: Dashboard with temporary mock data (verified by the developer 2026-10-24 in development mode and with `npm run build`)
  - [x] Step 6: Workspace and project overview screens with temporary mock data (verified by the developer 2026-10-24 in development mode and with `npm run build`)
  - [x] Step 7: Settings and Help screens (verified by the developer 2026-10-24 in development mode, with `npm run build`, and in a rebuilt release program)
  - [x] Proof: changing the accent color in the token file changes every screen (see `CLAUDE.md` section 19)
- [x] **Phase 2:** SQLite, schema and migrations, workspace, project, and task CRUD (complete 2026-10-27, on branch `phase-1-ui`, not yet merged into `main`)
  - [x] SQL plugin installed, database file created (verified 2026-10-25)
  - [x] Migrations 1 and 2, five tables, owner trigger (verified 2026-10-25)
  - [x] Workspaces: create, rename, delete (verified 2026-10-25)
  - [x] Projects: create, edit, archive, restore, delete (verified 2026-10-25 and 2026-10-26)
  - [x] Tasks: create, edit, mark done, reopen, delete (verified 2026-10-26)
  - [x] Dashboard, local profile, and progress on real data; mock data removed (verified 2026-10-26)
  - [x] Closing check: release build with the existing and with a fresh database file (reported by the developer 2026-10-27), documentation review (2026-10-27)
  - [x] Database location decision: Roaming folder kept for now, to be revisited before a public release (Agreed by the developer 2026-10-27; see Known issues 7)
- [ ] Phase 3: Kanban, calendar, task details, documents, progress, activity
- [ ] Phase 4: backup and restore, search, validation, notifications, testing
- [ ] Phases 5 to 7: GitHub integration, online architecture, platform expansion and AI (Future)

## Next task (exact)

**1. Developer: test the cross button and step 3e-3 (labels).** `git pull origin phase-3-kanban`, then `npm run tauri dev` (migration 4 runs on start), then:

1. Settings, Database line: `Connected · schema version 4 · 9 tables`. Existing projects, tasks, checklists, and notes are still there.
2. Task page: a checklist item has a small cross (tooltip "Delete item") that removes it at once; Edit still works.
3. Task page, Properties card, "Labels": it says "No labels yet." Click "Create label", enter a name and pick a color, create it: the label appears as a colored badge on the task.
4. Create a label with the same name in other letter case (for example "bug" after "Bug"): a message appears under the name box. An empty name and a name over 30 characters (counter at the lower right) are also refused.
5. Create a second label, remove the first with its cross: it disappears from the task. "Add label" now offers it again; choose it to put it back.
6. Open another task of the same project: the "Add label" list offers the project's labels. Open a task of another project: it does not offer them.
7. Project page: a "Labels" section lists the labels with the number of tasks that use each. Edit a label (new name and color): the badge on the task page and the project task list change. Create a label here with "New Label".
8. The project task list and the board cards show the label badges of each task.
9. Delete a label that is on tasks: the confirmation names the number of tasks; after confirming, the badges are gone but the tasks remain.
10. Close and reopen the app: labels and their links are kept. Delete a task and a project that have labels: no error, and the Settings counts still make sense.
11. `npm run build` passes.

**2. Next after that:** project documents (Phase 3), then local activity history; drag and drop for the board (3b) is still postponed; filtering by label comes in Phase 4.

Also open: check the release program `project-manager.exe` once with the custom title bar before merging. Merging `phase-3-kanban` into `main` is the developer's to do later.
