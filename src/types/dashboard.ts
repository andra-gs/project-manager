// What the dashboard needs. The database model is designed in Phase 2 and may refine these shapes.
export interface WorkspaceOverview {
  id: string;
  name: string;
  memberCount: number;
  activeProjectCount: number;
  status: "active" | "archived";
}

export interface RecentProject {
  id: string;
  name: string;
  description: string;
  progressPercent: number;
}

export interface DashboardTask {
  id: string;
  title: string;
  projectName: string;
  // Calendar date "YYYY-MM-DD".
  dueDate: string;
}

export interface ActivityEntry {
  id: string;
  actorName: string;
  action: string;
  // ISO date-time text.
  occurredAt: string;
}

export interface DashboardData {
  workspaces: WorkspaceOverview[];
  recentProjects: RecentProject[];
  myTasks: DashboardTask[];
  activity: ActivityEntry[];
}
