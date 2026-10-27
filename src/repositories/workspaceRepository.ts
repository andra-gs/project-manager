import { getDatabase } from "../lib/database";
import type { WorkspaceSummary } from "../types/workspace";

interface WorkspaceRow {
  id: string;
  name: string;
  member_count: number;
}

export async function listWorkspaces(): Promise<WorkspaceSummary[]> {
  const database = await getDatabase();
  const rows = await database.select<WorkspaceRow[]>(
    `SELECT w.id, w.name,
            (SELECT COUNT(*) FROM workspace_members m WHERE m.workspace_id = w.id) AS member_count
       FROM workspaces w
      ORDER BY w.created_at, w.id`,
  );
  return rows.map((row) => ({ id: row.id, name: row.name, memberCount: row.member_count }));
}

// The owner is added to workspace_members by a database trigger (migration 2).
export async function insertWorkspace(workspace: {
  id: string;
  name: string;
  ownerProfileId: string;
  now: string;
}): Promise<void> {
  const database = await getDatabase();
  await database.execute(
    "INSERT INTO workspaces (id, name, owner_profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $4)",
    [workspace.id, workspace.name, workspace.ownerProfileId, workspace.now],
  );
}

// Returns true when a workspace with this id existed and was changed.
export async function updateWorkspaceName(id: string, name: string, now: string): Promise<boolean> {
  const database = await getDatabase();
  const result = await database.execute("UPDATE workspaces SET name = $1, updated_at = $2 WHERE id = $3", [name, now, id]);
  return result.rowsAffected > 0;
}

// Projects and tasks inside the workspace are deleted with it (foreign key CASCADE).
export async function deleteWorkspace(id: string): Promise<boolean> {
  const database = await getDatabase();
  const result = await database.execute("DELETE FROM workspaces WHERE id = $1", [id]);
  return result.rowsAffected > 0;
}

export interface WorkspaceDetailData {
  id: string;
  name: string;
  memberCount: number;
  projects: {
    id: string;
    name: string;
    description: string;
    status: "active" | "archived";
    taskCount: number;
    completedTaskCount: number;
  }[];
  // Open (not done) tasks of active projects that have a deadline, split by `today`.
  upcomingDeadlineCount: number;
  overdueTaskCount: number;
}

// `today` is a date text "YYYY-MM-DD". Returns undefined when the workspace does not exist.
export async function getWorkspaceDetail(id: string, today: string): Promise<WorkspaceDetailData | undefined> {
  const database = await getDatabase();

  const workspaces = await database.select<WorkspaceRow[]>(
    `SELECT w.id, w.name,
            (SELECT COUNT(*) FROM workspace_members m WHERE m.workspace_id = w.id) AS member_count
       FROM workspaces w
      WHERE w.id = $1`,
    [id],
  );
  const workspace = workspaces[0];
  if (!workspace) return undefined;

  const projects = await database.select<
    {
      id: string;
      name: string;
      description: string;
      status: "active" | "archived";
      task_count: number;
      completed_count: number;
    }[]
  >(
    `SELECT p.id, p.name, p.description, p.status,
            (SELECT COUNT(*) FROM tasks t WHERE t.project_id = p.id) AS task_count,
            (SELECT COUNT(*) FROM tasks t WHERE t.project_id = p.id AND t.status = 'done') AS completed_count
       FROM projects p
      WHERE p.workspace_id = $1
      ORDER BY p.created_at, p.id`,
    [id],
  );

  const deadlines = await database.select<{ upcoming: number; overdue: number }[]>(
    `SELECT COALESCE(SUM(CASE WHEN t.due_date >= $2 THEN 1 ELSE 0 END), 0) AS upcoming,
            COALESCE(SUM(CASE WHEN t.due_date < $2 THEN 1 ELSE 0 END), 0) AS overdue
       FROM tasks t
       JOIN projects p ON p.id = t.project_id
      WHERE p.workspace_id = $1 AND p.status = 'active' AND t.status <> 'done' AND t.due_date IS NOT NULL`,
    [id, today],
  );

  return {
    id: workspace.id,
    name: workspace.name,
    memberCount: workspace.member_count,
    projects: projects.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      status: row.status,
      taskCount: row.task_count,
      completedTaskCount: row.completed_count,
    })),
    upcomingDeadlineCount: deadlines[0]?.upcoming ?? 0,
    overdueTaskCount: deadlines[0]?.overdue ?? 0,
  };
}
