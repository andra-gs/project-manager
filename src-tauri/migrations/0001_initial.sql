-- Migration 1: the first tables (Phase 2).
-- IDs are UUID text created by the app. Deadlines are "YYYY-MM-DD" text.
-- Timestamps are UTC ISO 8601 text supplied by the app.

CREATE TABLE profiles (
    id           TEXT PRIMARY KEY NOT NULL,
    display_name TEXT NOT NULL CHECK (length(trim(display_name)) > 0),
    created_at   TEXT NOT NULL
);

CREATE TABLE workspaces (
    id               TEXT PRIMARY KEY NOT NULL,
    name             TEXT NOT NULL CHECK (length(trim(name)) > 0),
    description      TEXT NOT NULL DEFAULT '',
    owner_profile_id TEXT NOT NULL REFERENCES profiles (id) ON DELETE RESTRICT,
    created_at       TEXT NOT NULL,
    updated_at       TEXT NOT NULL
);

-- Roles are stored now so collaboration can be added later. The offline app has no permission system.
CREATE TABLE workspace_members (
    workspace_id TEXT NOT NULL REFERENCES workspaces (id) ON DELETE CASCADE,
    profile_id   TEXT NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    role         TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'guest')),
    PRIMARY KEY (workspace_id, profile_id)
);

CREATE TABLE projects (
    id           TEXT PRIMARY KEY NOT NULL,
    workspace_id TEXT NOT NULL REFERENCES workspaces (id) ON DELETE CASCADE,
    name         TEXT NOT NULL CHECK (length(trim(name)) > 0),
    description  TEXT NOT NULL DEFAULT '',
    status       TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    created_at   TEXT NOT NULL,
    updated_at   TEXT NOT NULL
);

CREATE TABLE tasks (
    id                  TEXT PRIMARY KEY NOT NULL,
    project_id          TEXT NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    title               TEXT NOT NULL CHECK (length(trim(title)) > 0),
    description         TEXT NOT NULL DEFAULT '',
    status              TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done')),
    priority            TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    due_date            TEXT CHECK (due_date IS NULL OR due_date GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
    assignee_profile_id TEXT REFERENCES profiles (id) ON DELETE SET NULL,
    created_at          TEXT NOT NULL,
    updated_at          TEXT NOT NULL,
    completed_at        TEXT
);

CREATE INDEX idx_workspace_members_profile ON workspace_members (profile_id);
CREATE INDEX idx_projects_workspace ON projects (workspace_id);
CREATE INDEX idx_tasks_project ON tasks (project_id);
CREATE INDEX idx_tasks_assignee ON tasks (assignee_profile_id);
CREATE INDEX idx_tasks_due_date ON tasks (due_date);
