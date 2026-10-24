// TEMPORARY MOCK DATA for building the interface (Phase 1). Replaced by database data in Phase 2.
import type { DashboardData } from "../types/dashboard";
import { dateFromToday, minutesAgo } from "./helpers";
import { createMockProjects, toProjectSummary } from "./projects";
import { MOCK_WORKSPACES } from "./workspaces";

export function createMockDashboardData(): DashboardData {
  const projects = createMockProjects();
  return {
    workspaces: MOCK_WORKSPACES.map((workspace) => ({
      id: workspace.id,
      name: workspace.name,
      memberCount: workspace.memberCount,
      activeProjectCount: projects.filter((project) => project.workspaceId === workspace.id && project.status === "active").length,
      status: "active",
    })),
    recentProjects: projects.slice(0, 3).map(toProjectSummary),
    myTasks: [
      { id: "task-1", title: "Write game design document", projectName: "Campus Game", dueDate: dateFromToday(-2) },
      { id: "task-2", title: "Implement login API", projectName: "Website Perpustakaan", dueDate: dateFromToday(0) },
      { id: "task-3", title: "Review project requirements", projectName: "Website Perpustakaan", dueDate: dateFromToday(1) },
    ],
    activity: [
      { id: "activity-1", actorName: "Raka", action: "created a task", occurredAt: minutesAgo(8) },
      { id: "activity-2", actorName: "Sinta", action: "completed a task", occurredAt: minutesAgo(65) },
      { id: "activity-3", actorName: "Andra", action: "updated the project notes", occurredAt: minutesAgo(190) },
    ],
  };
}
