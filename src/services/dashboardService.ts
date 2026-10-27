import { calculateProgress } from "../lib/progress";
import * as repository from "../repositories/dashboardRepository";
import type { DashboardData } from "../types/dashboard";
import { getLocalProfileId } from "./profileService";

// Everything the dashboard shows. Progress is calculated from task counts.
// Activity history arrives in Phase 3, so the list is empty until then.
export async function getDashboardData(): Promise<DashboardData> {
  const rows = await repository.getDashboardRows(await getLocalProfileId());
  return {
    workspaces: rows.workspaces,
    recentProjects: rows.recentProjects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      progressPercent: calculateProgress(project.completedTaskCount, project.taskCount),
    })),
    myTasks: rows.myTasks,
    activity: [],
  };
}
