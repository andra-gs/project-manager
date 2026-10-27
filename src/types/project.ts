import type { ActivityEntry } from "./activity";
import type { TaskItem } from "./task";

export type ProjectStatus = "active" | "archived";

// The database model is designed in Phase 2 and may refine these shapes.
export interface ProjectSummary {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progressPercent: number;
}

export interface ProjectDetail extends ProjectSummary {
  workspaceId: string;
  workspaceName: string;
  taskCount: number;
  completedTaskCount: number;
  tasks: TaskItem[];
  activity: ActivityEntry[];
}
