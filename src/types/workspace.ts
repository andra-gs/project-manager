import type { ActivityEntry } from "./activity";
import type { ProjectSummary } from "./project";

// Minimal shape of a workspace for navigation. The full model is designed in Phase 2 (database).
export interface WorkspaceSummary {
  id: string;
  name: string;
  memberCount: number;
}

export interface WorkspaceDetail extends WorkspaceSummary {
  // Active projects. Archived ones are listed separately.
  projects: ProjectSummary[];
  archivedProjects: ProjectSummary[];
  taskCount: number;
  completedTaskCount: number;
  upcomingDeadlineCount: number;
  overdueTaskCount: number;
  activity: ActivityEntry[];
}
