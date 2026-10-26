import { getDatabase } from "../lib/database";

export interface DashboardRows {
  workspaces: { id: string; name: string; memberCount: number; activeProjectCount: number }[];
  recentProjects: {
    id: string;
    name: string;
    description: string;
    status: "active" | "archived";
    taskCount: number;
    completedTaskCount: number;
  }[];
  myTasks: { id: string; title: string; projectName: string; dueDate: string | undefined }[];
}

const RECENT_PROJECT_LIMIT = 3;
const MY_TASK_LIMIT = 5;

// Read-only. "Recent" means the most recently created or changed active projects.
// "My tasks" are the open tasks of active projects that are assigned to this profile, soonest deadline first.
export async function getDashboardRows(profileId: string): Promise<DashboardRows> {
  const database = await getDatabase();

  const workspaces = await database.select<
    { id: string; name: string; member_count: number; project_count: number }[]
  >(
    `SELECT w.id, w.name,
            (SELECT COUNT(*) FROM workspace_members m WHERE m.workspace_id = w.id) AS member_count,
            (SELECT COUNT(*) FROM projects p WHERE p.workspace_id = w.id AND p.status = 'active') AS project_count
       FROM workspaces w
      ORDER BY w.created_at, w.id`,
  );

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
      WHERE p.status = 'active'
      ORDER BY p.updated_at DESC, p.id
      LIMIT $1`,
    [RECENT_PROJECT_LIMIT],
  );

  const tasks = await database.select<{ id: string; title: string; project_name: string; due_date: string | null }[]>(
    `SELECT t.id, t.title, p.name AS project_name, t.due_date
       FROM tasks t
       JOIN projects p ON p.id = t.project_id
      WHERE t.assignee_profile_id = $1 AND t.status <> 'done' AND p.status = 'active'
      ORDER BY (t.due_date IS NULL), t.due_date, t.created_at, t.id
      LIMIT $2`,
    [profileId, MY_TASK_LIMIT],
  );

  return {
    workspaces: workspaces.map((row) => ({
      id: row.id,
      name: row.name,
      memberCount: row.member_count,
      activeProjectCount: row.project_count,
    })),
    recentProjects: projects.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      status: row.status,
      taskCount: row.task_count,
      completedTaskCount: row.completed_count,
    })),
    myTasks: tasks.map((row) => ({
      id: row.id,
      title: row.title,
      projectName: row.project_name,
      dueDate: row.due_date ?? undefined,
    })),
  };
}
