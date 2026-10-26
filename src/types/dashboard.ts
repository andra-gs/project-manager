// What the dashboard needs. It is built from the database by dashboardService.
import type { ActivityEntry } from "./activity";
import type { ProjectSummary } from "./project";

export interface WorkspaceOverview {
  id: string;
  name: string;
  memberCount: number;
  activeProjectCount: number;
}

export interface DashboardTask {
  id: string;
  title: string;
  projectName: string;
  // Calendar date "YYYY-MM-DD", or undefined when the task has no deadline.
  dueDate: string | undefined;
}

export interface DashboardData {
  workspaces: WorkspaceOverview[];
  recentProjects: ProjectSummary[];
  myTasks: DashboardTask[];
  activity: ActivityEntry[];
}
