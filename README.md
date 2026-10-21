# Project Manager Desktop

A local-first desktop application for organizing workspaces, projects, tasks, deadlines, documents, and progress in one place.

> **Status: documentation and planning only.** No application code exists yet. Nothing described under "Setup" or "Development" below has been run or verified. See [docs/DEVELOPMENT_STATUS.md](docs/DEVELOPMENT_STATUS.md) for the current state.

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
4. **Node.js** (the LTS version). It runs the frontend tooling and provides `npm`.
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

## Setup (Planned, not yet run)

Phase 0 will create the project with the official `create-tauri-app` tool and its React + TypeScript template. According to the tool's documentation, the command has this form:

```powershell
npm create tauri-app@latest project-manager-desktop -- --template react-ts
```

Open decision: this repository folder already contains documentation files. Whether to scaffold directly into it or to scaffold in a temporary folder and merge is decided during Phase 0, after checking how the tool behaves with a non-empty folder. The exact steps will be recorded here once they have been run successfully.

## Development (Planned, not yet run)

After scaffolding, Tauri projects normally provide these commands. They must be confirmed against the generated `package.json` before being relied on.

```powershell
npm install          # install frontend dependencies
npm run tauri dev    # start the desktop app in development mode
npm run tauri build  # produce a release build and Windows installer
```

## Where data will be stored

The application will keep structured data (workspaces, projects, tasks, and so on) in a local SQLite database inside the application's data directory, not in its installation folder. Data on one computer is not shared with other computers. Backup and restore (JSON export and import) is planned for Phase 4.

## Known limitations

- No application code exists yet.
- Online features (accounts, sync, shared workspaces, real-time editing) are not part of the first release.
