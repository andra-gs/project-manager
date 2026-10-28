// Task values shared by screens. They match the values stored in the database (migration 1).
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in_progress" | "review" | "done";
// The board columns, in order from left to right.
export const TASK_STATUSES: TaskStatus[] = ["todo", "in_progress", "review", "done"];

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  // Calendar date "YYYY-MM-DD", or undefined when the task has no deadline.
  dueDate: string | undefined;
}

// Everything the task page shows: the task, the project and workspace it belongs to, and its dates.
export interface TaskDetail extends TaskItem {
  projectId: string;
  projectName: string;
  workspaceId: string;
  workspaceName: string;
  // Name of the profile the task is assigned to, or undefined when it is assigned to nobody.
  assigneeName: string | undefined;
  // UTC ISO 8601 timestamps.
  createdAt: string;
  updatedAt: string;
  completedAt: string | undefined;
}
