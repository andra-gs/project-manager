import { getDatabase } from "../lib/database";

export async function insertTask(task: {
  id: string;
  projectId: string;
  title: string;
  priority: "low" | "medium" | "high";
  dueDate: string | null;
  assigneeProfileId: string;
  now: string;
}): Promise<void> {
  const database = await getDatabase();
  await database.execute(
    "INSERT INTO tasks (id, project_id, title, priority, due_date, assignee_profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $7)",
    [task.id, task.projectId, task.title, task.priority, task.dueDate, task.assigneeProfileId, task.now],
  );
}

// Marks a task done (with the time it was finished) or back to "todo". Returns true when it existed.
export async function updateTaskDone(id: string, done: boolean, now: string): Promise<boolean> {
  const database = await getDatabase();
  const result = await database.execute(
    "UPDATE tasks SET status = $1, completed_at = $2, updated_at = $3 WHERE id = $4",
    [done ? "done" : "todo", done ? now : null, now, id],
  );
  return result.rowsAffected > 0;
}

export async function deleteTask(id: string): Promise<boolean> {
  const database = await getDatabase();
  const result = await database.execute("DELETE FROM tasks WHERE id = $1", [id]);
  return result.rowsAffected > 0;
}
