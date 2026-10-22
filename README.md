# Project Manager Desktop

A local-first desktop application for organizing workspaces, projects, tasks, deadlines, documents, and progress in one place.

> **Status: Phase 0 complete. The project is still the unmodified Tauri template.** The desktop app starts in development mode and builds a Windows release on the developer's computer (verified 2026-10-21 and 2026-10-22). No project features exist yet. See [docs/DEVELOPMENT_STATUS.md](docs/DEVELOPMENT_STATUS.md) for the current state.

The working product name is **Project Collaboration App**. The final public name has not been decided.

## What this project is

An application for students, programmers, content creators, and small teams who need a simple way to manage projects. The first release targets **Windows** and works **fully offline**: your data is stored on your own computer, and no server or cloud account is needed.

Later phases may add GitHub integration, online collaboration, and more platforms (web, Android, iOS). Those are plans, not features. See [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md).

## Documentation

| File | What it covers |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Project instructions and development rules |
| [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) | Goals, target users, MVP scope, roadmap |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the application is (and will be) structured |
| [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) | SQLite tables and migrations |
| [docs/DEVELOPMENT_STATUS.md](docs/DEVELOPMENT_STATUS.md) | What is done, what is broken, what is next |

## Technology stack (Agreed)

| Layer | Choice |
|---|---|
| Desktop framework | Tauri 2 |
| Frontend | React, TypeScript, Vite |
| Native backend | Rust (Tauri commands) |
| Database | SQLite (local file) |
| Styling | Tailwind CSS is the preferred option if it fits the design |
| Version control | Git |
| First release target | Windows |

## Prerequisites (Windows)

These come from the official Tauri 2 documentation: <https://v2.tauri.app/start/prerequisites/> (read on 2026-10-20). They were checked on the development computer on 2026-10-21; see [docs/DEVELOPMENT_STATUS.md](docs/DEVELOPMENT_STATUS.md) for the results.

Two problems came up on that computer, and may affect you too:

- **Build Tools installed, but the C++ part missing.** Installing "Build Tools for Visual Studio" is not enough. Open Visual Studio Installer, choose Modify, and tick the **"Desktop development with C++"** workload.
- **`npm` blocked in PowerShell** with "running scripts is disabled on this system". Run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once, then try again.

1. **Microsoft C++ Build Tools** with the **"Desktop development with C++"** workload. Rust on Windows needs these to compile.
2. **Microsoft Edge WebView2.** Tauri uses it to display the interface. It is already included in Windows 10 (version 1803 and later) and in Windows 11.
3. **Rust**, installed with `rustup`, using the **MSVC toolchain** as the default. If Rust is already installed, the Tauri docs say to run `rustup default stable-msvc`.
4. **Node.js** (the LTS version). It runs the frontend tooling and provides `npm`. Verified with Node.js v24.22.0 and npm 11.19.1.
5. *Only if building MSI installers:* the Windows optional feature **VBSCRIPT** must be enabled.

Later, from Phase 2, the official Tauri SQL plugin documentation lists Rust 1.90 or newer as a requirement. This is not yet confirmed for this project because the database approach is still open (see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)).

### Check what is installed

Run these in Windows PowerShell. Each command prints a version number if the tool is installed, and an error if it is not.

```powershell
node -v
npm -v
rustc --version
cargo --version
rustup show
```

`rustup show` also reports the active toolchain. It should mention `msvc`.

## Setup

Get the code and install the frontend dependencies:

```powershell
git clone https://github.com/andra-gs/project-manager.git
cd project-manager
npm install
```

`npm install` was run on the developer's computer on 2026-10-21: 27 packages added, no reported vulnerabilities, about 2 minutes.

How the project was created: with `create-tauri-app` 4.7.5 (template `react-ts`, package manager npm) in a temporary folder outside the repository, then renamed and copied in. You do not need to repeat this.

## Development

Start the desktop app in development mode:

```powershell
npm run tauri dev
```

- The first run compiles all Rust dependencies and took about 18 minutes on the developer's computer. Later runs are expected to be faster because compiled dependencies are cached, but this has not been timed.
- A window titled "Project Manager Desktop" opens. It currently shows the template's sample page.
- To stop: close the window, then press `Ctrl+C` in the terminal.

## Build

Produce a Windows release build and installers:

```powershell
npm run tauri build
```

- The first build took about 34 minutes on the developer's computer and downloaded the WiX and NSIS packaging tools from GitHub, so it needs internet access the first time.
- Output goes to `src-tauri\target\release\`: the program `project-manager.exe`, an MSI installer in `bundle\msi\`, and an NSIS installer in `bundle\nsis\`. These files are not committed to Git.
- The installers were built but have not yet been installed or run.

## Where data will be stored

The application will keep structured data (workspaces, projects, tasks, and so on) in a local SQLite database inside the application's data directory, not in its installation folder. Data on one computer is not shared with other computers. Backup and restore (JSON export and import) is planned for Phase 4.

## Known limitations

- The application is still the unmodified Tauri template. No project, task, or database features exist yet.
- Online features (accounts, sync, shared workspaces, real-time editing) are not part of the first release.