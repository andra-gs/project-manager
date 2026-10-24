// What the dashboard needs. The database model is designed in Phase 2 and may refine these shapes.
import type { ActivityEntry } from "./activity";
import type { ProjectSummary } from "./project";

export interface WorkspaceOverview {
  id: string;
  name: string;
  memberCount: number;
  activeProjectCount: number;
  status: "active" | "archived";
}

export interface DashboardTask {
  id: string;
  title: string;
  projectName: string;
  // Calendar date "YYYY-MM-DD".
  dueDate: string;
}

export interface DashboardData {
  workspaces: WorkspaceOverview[];
  recentProjects: ProjectSummary[];
  myTasks: DashboardTask[];
  activity: ActivityEntry[];
}
