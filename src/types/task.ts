// Task values shared by screens. They match the values stored in the database (migration 1).
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in_progress" | "review" | "done";
// The board columns, in order from left to right.
export const TASK_STATUSES: TaskStatus[] = ["todo", "in_progress", "review", "done"];

export interface TaskItem {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  // Calendar date "YYYY-MM-DD", or undefined when the task has no deadline.
  dueDate: string | undefined;
}
