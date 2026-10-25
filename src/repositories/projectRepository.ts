import { getDatabase } from "../lib/database";

export async function insertProject(project: {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  now: string;
}): Promise<void> {
  const database = await getDatabase();
  await database.execute(
    "INSERT INTO projects (id, workspace_id, name, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $5)",
    [project.id, project.workspaceId, project.name, project.description, project.now],
  );
}
