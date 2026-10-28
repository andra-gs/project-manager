# Avenqor

<div align="center">

<!-- Replace this placeholder with the Avenqor logo when it is ready. -->
<img src="/Proyek Baru 6 [2DE6581].png/" alt="Avenqor logo" width="180" />

### Bring Every Project Forward.

**One workspace. Clear priorities. Meaningful progress.**

Avenqor is a local-first desktop project management app designed to help students, developers, creators, and small teams organize their work without depending on a cloud account.

**Status: In development · Windows desktop first**

</div>

---

## Why Avenqor?

Projects can quickly become scattered across notes, chat messages, and separate task lists. Avenqor is being built to bring the essentials together in one focused workspace, so it is easier to see what you are working on and keep projects moving.

The first release prioritizes a practical, understandable interface and local data storage. Your project data stays on your computer, and the core app is designed to work without a permanent internet connection.

## Who is it for?

- **Students** organizing assignments, campus activities, and group projects.
- **Programming students and developers** keeping track of software projects and tasks.
- **Content creators** managing ideas and production work.
- **Small teams and independent makers** who want a straightforward way to structure projects.

## Current features

Avenqor is actively being developed. The following core features are implemented on the `phase-1-ui` branch; the project is not yet merged into `main`.

### Dashboard
Get an overview of your workspaces and projects from one place, using locally stored application data.

### Workspace management
Create and manage workspaces to group related projects. For example, keep college assignments separate from personal development projects.

### Project management
Create, edit, archive, restore, and delete projects. Project progress is calculated from stored task data rather than entered as an arbitrary percentage.

### Basic task management
Create and update tasks with essential information such as title, priority, and deadline. Mark tasks as complete, reopen them, or delete them.

### Local profile and storage
The current app stores its data in a local SQLite database. The offline-first approach avoids requiring a cloud account or a hosted server for core use.

> **Development note:** Avenqor is still a work in progress. Features such as a Kanban board, calendar view, project documents, checklists, notifications, and backup/restore are planned or under development and should not be considered available in this version.

## Preview

Screenshots will be added as the interface evolves. Add your images to `assets/screenshots/` and uncomment or update the image references below.

<!--
### Dashboard
![Avenqor dashboard](assets/screenshots/dashboard.png)

### Workspaces and projects
![Avenqor workspaces and projects](assets/screenshots/workspaces-projects.png)

### Task management
![Avenqor task management](assets/screenshots/task-management.png)
-->

## Product direction

Avenqor is being developed in phases, with the aim of making the core project workflow reliable before expanding the feature set.

- **Next:** Kanban board, richer task details, checklists, and notes.
- **Later:** Calendar and deadline views, project documents, activity history, search and filters, and backup/restore.
- **Long-term possibilities:** GitHub integration, online accounts and shared workspaces, synchronization, and expansion to web and mobile platforms.

These are future plans, not features currently available in the app. The project roadmap may change as development and testing continue.

## Built with

- **Tauri 2** — desktop application framework
- **React 19** — user interface
- **TypeScript** — application code
- **Vite** — development and build tooling
- **Rust** — native desktop layer
- **SQLite** — local database
- **Tailwind CSS 4** — styling

## Getting started

Avenqor is currently a development project rather than a stable public release. To explore the source code, visit the repository:

**[andra-gs/project-manager on GitHub](https://github.com/andra-gs/project-manager)**

Build and development instructions may change while the project is evolving. Check the project documentation before setting up a local development environment.

## Project documentation

- [Project overview](docs/PROJECT_OVERVIEW.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Development status](docs/DEVELOPMENT_STATUS.md)
- [Database schema](docs/DATABASE_SCHEMA.md)
- [Brand guidelines](docs/BRAND.md)

## About Avenqor

Avenqor is built around three ideas: **clarity, structure, and progress**. The goal is to make project management feel more manageable by keeping essential information organized and close at hand.

<div align="center">

**Avenqor — Bring Every Project Forward.**

</div>
