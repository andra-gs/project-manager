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
