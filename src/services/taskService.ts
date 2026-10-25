import { ValidationError } from "../lib/errors";
import * as repository from "../repositories/taskRepository";
import type { TaskPriority } from "../types/task";

export const TASK_TITLE_MAX_LENGTH = 120;
const PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

// A deadline is empty (no deadline) or a real calendar date written "YYYY-MM-DD".
function parseDueDate(input: string): string | null {
  const value = input.trim();
  if (value === "") return null;
  const invalid = new ValidationError("Enter a valid deadline date.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw invalid;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) throw invalid;
  return value;
}

export async function createTask(
  projectId: string,
  titleInput: string,
  priority: TaskPriority,
  dueDateInput: string,
): Promise<void> {
  const title = titleInput.trim();
  if (title.length === 0) throw new ValidationError("Enter a task title.");
  if (title.length > TASK_TITLE_MAX_LENGTH) {
    throw new ValidationError(`The title can have at most ${TASK_TITLE_MAX_LENGTH} characters.`);
  }
  if (!PRIORITIES.includes(priority)) throw new ValidationError("Choose a priority.");
  const dueDate = parseDueDate(dueDateInput);

  await repository.insertTask({ id: crypto.randomUUID(), projectId, title, priority, dueDate, now: new Date().toISOString() });
}

export async function setTaskDone(id: string, done: boolean): Promise<void> {
  const changed = await repository.updateTaskDone(id, done, new Date().toISOString());
  if (!changed) throw new ValidationError("This task no longer exists.");
}

export async function deleteTask(id: string): Promise<void> {
  const deleted = await repository.deleteTask(id);
  if (!deleted) throw new ValidationError("This task no longer exists.");
}
