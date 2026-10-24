# Project Overview

Last updated: 2026-10-20

This document describes **what** the product is meant to be. For **how** it is built, see [ARCHITECTURE.md](ARCHITECTURE.md). For **where the work stands**, see [DEVELOPMENT_STATUS.md](DEVELOPMENT_STATUS.md).

## Status labels used in this documentation

| Label | Meaning |
|---|---|
| **Agreed** | Confirmed requirement or decision (from `CLAUDE.md`). |
| **Proposed** | Suggested but not yet approved. |
| **Implemented** | Exists in the repository and has been verified to work. |
| **Future** | Planned for a later phase; not part of the current work. |

Today, every feature below is **Agreed** or **Future**. Nothing is **Implemented** yet.

## Identity

- Project name: **Project Manager Desktop**
- Repository and folder name: `project-manager-desktop`
- Working product name: **Avenqor** (**Proposed** on 2026-10-23, pending trademark checks; earlier name: Project Collaboration App). The final public name is **not decided**, so the working name must not be treated as final branding. Brand notes are in [BRAND.md](BRAND.md).

## Product goals (Agreed)

Build a practical project management application where users organize workspaces, projects, tasks, deadlines, documents, and progress in one place.

- The first release targets **Windows desktop** users.
- Core features work **locally**, with no rented server, cloud account, or permanent internet connection.
- The first version prioritizes **usability, data integrity, a clean interface, and a maintainable architecture** over the number of features.
- Long term, the product may become cross-platform (Windows, web, Android, iOS) and support collaboration between people on the same projects.

## Target users (Agreed)

- University students managing assignments and group projects.
- Programming students and software development teams.
- Independent programmers and developers.
- Content creators managing production workflows.
- Small teams that need a simple way to organize projects and tasks.

The application should be easy for beginners to understand while still being useful for people managing several projects.

## Core structure (Agreed)

```
Account → Workspace → Project → Tasks and related resources
```

A workspace groups related projects. Each project contains its own tasks, deadlines, documents, and activity.

Example: the workspace "Informatics Group" could contain the projects "Final Semester Project" and "Portfolio Website".

**Roles.** The eventual role model is Owner, Admin, Member, and Guest. The data model should be designed so these roles can be added when multi-user collaboration arrives. The offline MVP does **not** include a permission system, and must not pretend to have one.

## MVP scope (Agreed, none implemented)

The roadmap in `CLAUDE.md` places the MVP features in these phases.

| ID | Feature | Planned phase | Status |
|---|---|---|---|
| A | **Dashboard**: workspace summary, recent projects, my tasks, upcoming deadlines, project progress, recent activity | Phase 1 (interface, mock data), Phase 2 (real data) | Agreed, not started |
| B | **Workspace management**: create, view, edit, delete; list projects in a workspace | Phase 2 | Agreed, not started |
| C | **Project management**: create, view, edit, archive or delete; description, status, progress; members as a data model only | Phase 2 | Agreed, not started |
| D | **Task management**: title, description, status, priority, deadline, labels, assignee or local responsibility field, subtasks, checklists, notes | Phase 2 (create and edit), Phase 3 (details, checklists) | Agreed, not started |
| E | **Kanban board**: columns To Do, In Progress, Review, Done; move tasks; changes saved to SQLite | Phase 3 | Agreed, not started |
| F | **Calendar and deadlines**: calendar view, upcoming list, overdue versus upcoming | Phase 3 | Agreed, not started |
| G | **Project documents**: notes, requirements, meeting notes, API references, UI/UX decisions | Phase 3 | Agreed, not started |
| H | **Progress and activity**: completion statistics computed from stored data, local activity history | Phase 3 | Agreed, not started |
| I | **Templates**: reusable project or task templates, where practical | Not scheduled in the roadmap | Agreed, not started |
| J | **Backup and restore**: JSON export and validated import, format version, no silent overwrite | Phase 4 | Agreed, not started |
| K | **Local notifications**: deadline reminders once the core is stable | Phase 4 ("where appropriate") | Agreed, not started |

Search and filters, error handling and validation, and testing are also listed for Phase 4.

### Rules that shape the MVP

- Progress must be **derived from stored data**, not arbitrary percentages.
- There is **no real-time collaborative editing** in the offline version.
- Local data on one computer is **not shared** with other computers.
- Attachments are only supported "if" needed. Whether the MVP includes them is **not decided**.

## Deferred (Agreed: do not prioritize)

Real-time cross-device sync, cloud accounts and authentication, online chat and live presence, full multi-user collaboration, AI assistant integration, complex enterprise permissions, large-scale analytics, and anything requiring paid infrastructure.

## Future roadmap (Future)

| Phase | Goal |
|---|---|
| 5 | **GitHub integration**: connect a repository to a project; show repository information, commits, pull requests, and review status where the API allows. Needs internet access and secure authentication. Tokens must never be committed. |
| 6 | **Online architecture**: authentication, backend API, cloud database, synchronization, conflict handling, offline-to-online data migration, shared workspaces. |
| 7 | **Platform expansion and AI**: evaluate web, Android, and iOS options; add AI-assisted features only when justified. |

Tauri does not automatically produce a complete mobile application. Mobile options will be evaluated when that phase begins.

## Design reference (Agreed)

Figma concept: <https://www.figma.com/design/K22NNL2AkbZKjRDMzPXn7c>

Direction: clean, modern desktop interface; light theme; DM Sans typography; indigo accent; sidebar navigation; clear spacing and hierarchy.

Screens in the Figma file: Dashboard, Workspace, Project Board, Project Overview and GitHub, Mobile Dashboard, Calendar and Deadlines, Task Details, Project Documents, Local Data and Backup. The GitHub and Mobile screens are references for **future** phases, not MVP work.

**Note:** the Figma file has not been inspected for this documentation. Exact visual details must be checked in Figma before each screen is built.

## Open questions (Proposed or undecided)

These come directly from wording in `CLAUDE.md` and need a decision before the related work starts.

- The final public product name.
- Whether Tailwind CSS is used (it is an "acceptable preferred option", not a requirement).
- How the database is accessed (see [ARCHITECTURE.md](ARCHITECTURE.md)).
- How the "current local user or profile" is represented in a single-user offline app.
- Whether the MVP supports file attachments, and the scope of templates.

## MVP success criteria (Agreed)

The MVP is successful when it runs as a Windows desktop application; core project and task features work offline; data persists locally in SQLite; the interface follows the Figma direction; users can organize workspaces, projects, tasks, deadlines, and documents; data can be exported and restored safely; no rented server is required; the code is understandable and maintainable; and future online features can be added without rewriting the whole application.
